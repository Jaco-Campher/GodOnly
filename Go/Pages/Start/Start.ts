namespace GO {

    export enum eRefTypeShow {
        NotFound = -1,
        None = 0,
        Strongs = 1,
        Prophesy = 2,
        WordMeaning = 4,
        NamesPlaces = 8,
        Most = 63,

        AllStrongs = 64,
        All = 255
    }

    //Links or Nav
    interface iNavIcon {
        ID: string,
        Title: string,
        Url: string
        //Icon: string
    }

    export interface iExternalReference {
        Title: string;
        Url: string;
    }


    //Refs
    export interface iRef {
        Ref: string;
        Bold?: Array<iRefBold>;
        Strongs?: Array<iRefStrong>;
        Html?: KnockoutObservable<string> | string;
    }

    export interface iRefBold {
        From: number,
        To: number
    }

    export interface iRefBoldOutput {
        Offset: number,
        Html: string;
    }

    export interface iRefStrong {
        Strong: string,
        Meaning: string;
    }

    //Legend
    export interface iLegend {
        //Used durig runtime.
        Name?: string;
        PageTitle?: string;

        //Json
        Case?: string;
        Meaning: string;
        Lookup?: string;
        Refs: Array<iRef>;
    }

    export interface iLegendsJson {
        [Index: string]: iLegend
    }


    //Strongs
    export interface iStrong {
        //Json
        Meaning?: string;
        Meanings?: Array<iStrongMeaning>
    }

    export interface iStrongMeaning {
        //Json
        Word: string;
        Meaning: string;
        MatchType?: string; //Exact
    }

    export interface iStrongsJson {
        [Index: string]: iStrong
    }

    
    export class Start extends Router {

        Bible: Bible = new Bible();
        LegendsObject!: iLegendsJson;
        NamesPlacesObject!: iLegendsJson;
        StrongsObject!: iStrongsJson;

        componentLoader: KO.ComponentLoader = new KO.ComponentLoader();

        MenuOpen: KnockoutObservable<boolean> = ko.observable(false);

        PageTitle: KnockoutObservable<string> = ko.observable('God Only');

        HasHelp: KnockoutObservable<boolean> = ko.observable(false);
        ShowHelp: KnockoutObservable<boolean> = ko.observable(false);
        HasPageSettings: KnockoutObservable<boolean> = ko.observable(false);
        ShowPageSettings: KnockoutObservable<boolean> = ko.observable(false);

        //Page Dialog
        PageDialogShow: KnockoutObservable<boolean> = ko.observable(false);
        PageDialogTitle: KnockoutObservable<string> = ko.observable('');
        PageDialogPage: KnockoutObservable<string> = ko.observable('');

        //Global Settings
        ShowGlobalSettings: KnockoutObservable<boolean> = ko.observable(false);

        DisableTransparency: KnockoutObservable<boolean> = ko.observable(false);


        //****************************************************************************
        //#region Constructor
        //****************************************************************************
        constructor() {
            super();
            this.Start();

            //Reflective scrolling
            let bodyElement = document.querySelector('body');

            window.onscroll = () => {
                let actualScroll = Math.floor(window.scrollY / 3.5);
                bodyElement!.style.setProperty('--bk-scroll-pos', `-${actualScroll}px`);
            }
        }

        private async Start(): Promise<void> {
            //Setup knockout component loading.
            this.componentLoader.AddPageDetails('go-page-', '/Pages', 'GO.Pages');
            this.componentLoader.AddPageDetails('go-basic-page-', '/Pages');
            this.componentLoader.AddPageDetails('go-prophesy-', '/prophesyPages', 'GO.Prophesy');
            this.componentLoader.AddPageDetails('go-prophesypage-', '/prophesyPages');
            this.componentLoader.AddPageDetails('go-study-', '/StudyPages', 'GO.Study');
            this.componentLoader.AddPageDetails('go-studypage-', '/StudyPages');
            this.componentLoader.AddPageDetails('go-tools-', '/ToolsPages', 'GO.Tools');
            this.componentLoader.AddPageDetails('go-torah-', '/TorahPages', 'GO.Torah');
            this.componentLoader.AddPageDetails('go-torahpage-', '/TorahPages');
            //this.componentLoader.AddPageDetails('go-rev-', '/RevPages', 'GO.Rev');

            this.componentLoader.AddComponentDetails('go-s-', '/components', '');
            this.componentLoader.AddComponentDetails('go-', '/components', 'GO.Compnents');
            this.componentLoader.RegisterAddedComponents();

            //Setup knockout.
            ko.options.deferUpdates = true;
            ko.applyBindings(this, document.getElementById('HtmlTop')); //.getElementById('HtmlTop'));

            this.SetupRoutes();

            //Load the Bible and Data files.
            await Promise.all([
                this.Bible.LoadBible('../../Data/eng-kjv_usfm.zip'),
                this.Bible.LoadBible('../../Data/eng-scripture_usfm.zip'), //Extra biblical scriptures.
                this.LoadDataFiles()
            ]);

            //Load needed page.
            this.Navigate();
        }

        private SetupRoutes() {
            //Home
            this.AddRoute('/', 'God Only', 'go-basic-page-home');

            //Bible
            this.AddRoute('/bible', 'Bible', 'go-page-bible');
            //this.AddRoute('/bible/:bookName', 'Bible', 'go-page-bible');
            //this.AddRoute('/bible/:bookName/:chapterNo', 'Bible', 'go-page-bible');

            //Did you know
            this.AddRoute('/did-you-know', 'Did You Know', 'go-basic-page-didYouKnow');

            //Study
            this.AddRoute('/bible-study', 'Study', 'go-study-landing');
            this.AddRoute('/bible-study/:page', '', 'go-study-landing');

            this.AddRoute('/torah-study', 'Torah', 'go-torah-landing');
            this.AddRoute('/torah-study/:page', 'Torah', 'go-torah-landing');

            this.AddRoute('/prophesy-study', 'Prophesy', 'go-prophesy-landing');
            this.AddRoute('/prophesy-study/:page', 'Prophesy', 'go-prophesy-landing');

            //Tools
            this.AddRoute('/tools', 'Tools', 'go-tools-landing');
            this.AddRoute('/tools/:page', 'Tools', 'go-tools-landing');

            //Search
            this.AddRoute('/search', 'Search', 'go-page-search');

            //About
            this.AddRoute('/about', 'About', 'go-basic-page-about');

            //Other
            this.AddRoute('/introduction', 'Introduction', 'go-basic-page-introduction');
            this.AddRoute('/copyright', 'Copyright', 'go-basic-page-copyright');


            //this.AddRoute('/rev', 'Torah', 'go-rev-rev-main');
            //TODO: Route multi folder level _ > /
        }

        //#endregion

        //*********************************************************
        // Pages and Navigation
        //#region *************************************************

        NavIcons: KnockoutObservableArray<iNavIcon> = ko.observableArray([
            //{ ID: 'go-page-home', Title: 'Home', Url: '/' },
            { ID: 'go-page-bible', Title: 'Bible', Url: '/bible' },
            { ID: 'go-basic-page-didYouKnow', Title: 'Did You Know', Url: '/did-you-know' },
            { ID: 'go-study-landing', Title: 'Study', Url: '/bible-study' },
            { ID: 'go-torah-landing', Title: 'Torah', Url: '/torah-study' },
            { ID: 'go-prophesy-landing', Title: 'Prophesy', Url: '/prophesy-study' },
            { ID: 'go-tools-landing', Title: 'Tools', Url: '/tools' },
            { ID: 'go-page-search', Title: 'Search', Url: '/search' },
            { ID: 'go-basic-page-about', Title: 'About', Url: '/about' }
        ]);

        public GoToPage = (navIcon: iNavIcon) => {
            if (this.MenuOpen()) { this.OpenCloseMenu(); }
            this.Navigate(navIcon.Url);
        }

        public OpenCloseMenu() {
            this.MenuOpen(!this.MenuOpen());
        }

        ImageLinkClicked = (imageLink: ImageLink) => {
            this.Navigate(imageLink.Url);
        }

        NavigateLink = (event: Event) => {
            event.preventDefault();
            this.Navigate((event.srcElement as HTMLAnchorElement).attributes.getNamedItem('href').value);
            this.PageDialogShow(false);
        }

        PageLoadCompleted = () => {
            let pageTitle: HTMLElement = document.getElementById('PageTitle');
            this.PageTitle(pageTitle == null ? 'God Only' : pageTitle.innerHTML);
            
            this.HasHelp(document.getElementById('PageHelp') != null);
            this.HasPageSettings(document.getElementById('PageSettings') != null);
        }

        ShowPageDialog = (event: Event | null, title: string, page: string) => {
            if (event != null) { event.preventDefault(); }
            this.PageDialogTitle(title);
            this.PageDialogPage(page);
            this.PageDialogShow(true);
        }

        //#endregion


        //****************************************************************************
        // Global Functions
        //#region ********************************************************************

        AddBoldAtIndex = (text: string, boldIndexes: Array<iRefBold>, offset: number): iRefBoldOutput => {
            if (text == '') { return { Offset: offset, Html: text } }

            let indexOffset: number = offset + text.length - 1;


            for (let i = boldIndexes.length - 1; i >= 0; i--) {
                let boldIndex: iRefBold = boldIndexes[i];

                if (boldIndex.To >= offset && boldIndex.To <= indexOffset) {
                    let index: number = (boldIndex.To - offset);

                    //console.log('.......End', boldIndex.From, offset, boldIndex.To);
                    //console.log('index to', index);

                    text = GO.InsertStringAtIndex(text, index + 1, '</b>');
                }

                if (boldIndex.From >= offset && boldIndex.From <= indexOffset) {
                    let index: number = (boldIndex.From - offset);

                    //console.log('Start.......', text, boldIndex.From, offset, boldIndex.To);
                    //console.log('index', index);

                    text = GO.InsertStringAtIndex(text, index , '<b>');

                }
            }

            return { Offset: indexOffset + 1, Html: text };
        }

        //#endregion


        //****************************************************************************
        // Load Functions
        //#region ********************************************************************

        private LoadDataFiles = async () => {
            //Load data files.
            this.LegendsObject = JSON.parse(await GO.LoadFileData('../../data/legends.json'));
            this.NamesPlacesObject = JSON.parse(await GO.LoadFileData('../../data/namesplaces.json'));
            this.StrongsObject = JSON.parse(await GO.LoadFileData('../../data/strongs.json'));

            //Ensure propeties exists as Knockout needs them for binding.
            this.EnsureLegendProperties(this.LegendsObject);
            this.EnsureLegendProperties(this.NamesPlacesObject);
        }

        //Ensure propeties exists as Knockout needs them for binding.
        private EnsureLegendProperties = (holderObject: iLegendsJson) => {
            for (let index in holderObject) {
                if (holderObject[index].Refs == undefined) { continue; }

                for (let ref of holderObject[index].Refs) {
                    if (ref.Bold == undefined) { ref.Bold = []; }
                    if (ref.Strongs == undefined) { ref.Strongs = []; }
                    if (ref.Html == undefined) { ref.Html = ''; }
                }
            }
        }

        //#endregion

        //****************************************************************************
        // Functions
        //#region ********************************************************************

        ShowHideHelp = () => {
            this.ShowHelp(!this.ShowHelp());
            //console.log(this.componentLoader.LastPageViewModel);
            go.PushPageHelp();
        }

        ShowHidePageSettings = () => {
            this.ShowPageSettings(!this.ShowPageSettings());
        }

        ShowHideGlobalSettings = () => {
            this.ShowGlobalSettings(!this.ShowGlobalSettings());
        }

        //#endregion


        //****************************************************************************
        // Legend Functions
        //#region ********************************************************************


        //********************************
        //#region Legend Functions

        AddLegend(inputSections: Array<Section>, holderObject: iLegendsJson, refType: eRefTypeShow): Array<Section> {
            let newSections: Array<Section> = [];
            let found: boolean = false;

            for (let inputSection of inputSections) {
                if (inputSection.Type != eRefTypeShow.None) {
                    newSections.push(inputSection);
                    continue;
                }

                for (let legendName in holderObject) {
                    let reg: RegExp = new RegExp(`(^|(?<=\\W))(${legendName})($|(?=\\W))`, 'gi');
                    let htmlSections: Array<string> = inputSection.Html.split(reg);


                    if (htmlSections.length > 1) {
                        found = true;

                        for (let htmlSection of htmlSections) {
                            if (htmlSection.toLowerCase() != legendName.toLowerCase()) {
                                //Other text, search for more matches.
                                newSections.push(...this.AddLegend([new Section(htmlSection)], holderObject, refType));
                                //newSections.push(new Section(htmlSection));
                                continue;
                            }

                            let legend: GO.iLegend = holderObject[legendName];

                            let section: Section = new Section('', refType);
                            section.Original = htmlSection;
                            if (legend.Case) {
                                section.Meaning = legend.Meaning;
                            }
                            else {
                                section.Meaning = htmlSection == htmlSection.toLowerCase() ? legend.Meaning.toLowerCase() : legend.Meaning;
                            }
                            section.Refs = legend.Lookup == undefined ? legend.Refs : holderObject[legend.Lookup].Refs;
                            newSections.push(section);
                        }

                        break;
                    }
                }

                if (found) {
                    found = false;
                }
                else {
                    //No match found, add as is.
                    newSections.push(inputSection);
                }

            }

            return newSections;
        }

        //#endregion

        //********************************
        //#region Strongs Function

        AddStrongs(inputSections: Array<Section>): Array<Section> {
            let newSections: Array<Section> = [];
            let found: boolean = false;

            for (let inputSection of inputSections) {
                if (inputSection.Type != eRefTypeShow.None) {
                    newSections.push(inputSection);
                    continue;
                }

                //Split on: '{Measure|G5518|One Liter}'
                let reg: RegExp = new RegExp(`(\\{\\w+\\|\\w\\d{4}\\|?\\w*\\})`, 'gi'); //(\\{\\w+\\|\\w+\\|.*?\\})
                let htmlSections: Array<string> = inputSection.Html.split(reg);

                if (htmlSections.length > 1) {
                    found = true;

                    for (let htmlSection of htmlSections) {
                        //console.log(htmlSection);
                        if (htmlSection.startsWith('{') == false) {
                            //Other text, search for more matches.
                            newSections.push(...this.AddStrongs([new Section(htmlSection)]));
                            //newSections.push(new Section(htmlSection));
                            continue;
                        }

                        let section: Section = new Section('', eRefTypeShow.Strongs);

                        htmlSection = htmlSection.substr(1, htmlSection.length - 2); //Remove { }
                        let textSections: Array<string> = htmlSection.split('|');

                        section.Original = textSections[0];
                        section.Html = textSections[1]; //Strong No

                        //Meaning
                        if (textSections.length == 2) {
                            let strongLegend: iStrong = this.StrongsObject[textSections[1]];
                            if (strongLegend == undefined) {
                                section.Meaning = '';
                            }
                            else {
                                section.Meaning = go.GetMeaning(strongLegend, textSections[0]);
                            }
                        }
                        else {
                            section.Meaning = textSections[2];
                        }

                        newSections.push(section);
                    }
                }

                if (found) {
                    found = false;
                }
                else {
                    //No match found, add as is.
                    newSections.push(inputSection);
                }
            }

            return newSections;
        }

        GetMeaning(strongLegend: GO.iStrong, word: string): string {
            if (strongLegend.Meanings == undefined) {
                return word == word.toLowerCase() ? strongLegend.Meaning!.toLowerCase() : strongLegend.Meaning!;
            }
            else {
                //Multiple
                //console.log('Word', word);

                for (let meaning of strongLegend.Meanings) {
                    if (word.search(meaning.Word) != -1) { return meaning.Meaning; }
                    if (word.toLowerCase().search(meaning.Word.toLowerCase()) != -1) { return meaning.Meaning.toLowerCase(); }
                }
                return '?';
            }
        }

        //#endregion

        //#endregion
    }


    export class ImageLink {
        Title: string;
        Description: string;
        Url: string;
        ImageFileName: string = '';

        constructor(title: string, description: string, url: string, imageFileName?: string) {
            this.Title = title;
            this.Description = description;
            this.Url = url;
            if (imageFileName != undefined) { this.ImageFileName = `../../Images/ImgLinks/${imageFileName}`; }
        }
    }

    export class Section {
        Html: string;
        Type: eRefTypeShow;

        Original?: string;
        Meaning?: string;

        Refs?: Array<iRef>;

        Show: KnockoutObservable<boolean> = ko.observable(false);

        constructor(html: string, type: eRefTypeShow = eRefTypeShow.None) {
            this.Html = html;
            this.Type = type;
        }

        OpenClose() {
            this.Show(!this.Show());
        }
    }
}

let go: GO.Start;
GO.DomReady(() => {
    go = new GO.Start();
});