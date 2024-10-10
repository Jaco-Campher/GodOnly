var GO;
(function (GO) {
    let eRefTypeShow;
    (function (eRefTypeShow) {
        eRefTypeShow[eRefTypeShow["NotFound"] = -1] = "NotFound";
        eRefTypeShow[eRefTypeShow["None"] = 0] = "None";
        eRefTypeShow[eRefTypeShow["Strongs"] = 1] = "Strongs";
        eRefTypeShow[eRefTypeShow["Prophesy"] = 2] = "Prophesy";
        eRefTypeShow[eRefTypeShow["WordMeaning"] = 4] = "WordMeaning";
        eRefTypeShow[eRefTypeShow["NamesPlaces"] = 8] = "NamesPlaces";
        eRefTypeShow[eRefTypeShow["Most"] = 63] = "Most";
        eRefTypeShow[eRefTypeShow["AllStrongs"] = 64] = "AllStrongs";
        eRefTypeShow[eRefTypeShow["All"] = 255] = "All";
    })(eRefTypeShow = GO.eRefTypeShow || (GO.eRefTypeShow = {}));
    class Start extends GO.Router {
        //****************************************************************************
        //#region Constructor
        //****************************************************************************
        constructor() {
            super();
            this.Bible = new GO.Bible();
            this.componentLoader = new GO.KO.ComponentLoader();
            this.MenuOpen = ko.observable(false);
            this.PageTitle = ko.observable('God Only');
            this.HasHelp = ko.observable(false);
            this.ShowHelp = ko.observable(false);
            this.HasPageSettings = ko.observable(false);
            this.ShowPageSettings = ko.observable(false);
            //Page Dialog
            this.PageDialogShow = ko.observable(false);
            this.PageDialogTitle = ko.observable('');
            this.PageDialogPage = ko.observable('');
            //Global Settings
            this.ShowGlobalSettings = ko.observable(false);
            this.DisableTransparency = ko.observable(false);
            //#endregion
            //*********************************************************
            // Pages and Navigation
            //#region *************************************************
            this.NavIcons = ko.observableArray([
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
            this.GoToPage = (navIcon) => {
                if (this.MenuOpen()) {
                    this.OpenCloseMenu();
                }
                this.Navigate(navIcon.Url);
            };
            this.ImageLinkClicked = (imageLink) => {
                this.Navigate(imageLink.Url);
            };
            this.NavigateLink = (event) => {
                event.preventDefault();
                this.Navigate(event.srcElement.attributes.getNamedItem('href').value);
                this.PageDialogShow(false);
            };
            this.PageLoadCompleted = () => {
                let pageTitle = document.getElementById('PageTitle');
                this.PageTitle(pageTitle == null ? 'God Only' : pageTitle.innerHTML);
                this.HasHelp(document.getElementById('PageHelp') != null);
                this.HasPageSettings(document.getElementById('PageSettings') != null);
            };
            this.ShowPageDialog = (event, title, page) => {
                if (event != null) {
                    event.preventDefault();
                }
                this.PageDialogTitle(title);
                this.PageDialogPage(page);
                this.PageDialogShow(true);
            };
            //#endregion
            //****************************************************************************
            // Global Functions
            //#region ********************************************************************
            this.AddBoldAtIndex = (text, boldIndexes, offset) => {
                if (text == '') {
                    return { Offset: offset, Html: text };
                }
                let indexOffset = offset + text.length - 1;
                for (let i = boldIndexes.length - 1; i >= 0; i--) {
                    let boldIndex = boldIndexes[i];
                    if (boldIndex.To >= offset && boldIndex.To <= indexOffset) {
                        let index = (boldIndex.To - offset);
                        //console.log('.......End', boldIndex.From, offset, boldIndex.To);
                        //console.log('index to', index);
                        text = GO.InsertStringAtIndex(text, index + 1, '</b>');
                    }
                    if (boldIndex.From >= offset && boldIndex.From <= indexOffset) {
                        let index = (boldIndex.From - offset);
                        //console.log('Start.......', text, boldIndex.From, offset, boldIndex.To);
                        //console.log('index', index);
                        text = GO.InsertStringAtIndex(text, index, '<b>');
                    }
                }
                return { Offset: indexOffset + 1, Html: text };
            };
            //#endregion
            //****************************************************************************
            // Load Functions
            //#region ********************************************************************
            this.LoadDataFiles = async () => {
                //Load data files.
                this.LegendsObject = JSON.parse(await GO.LoadFileData('../../data/legends.json'));
                this.NamesPlacesObject = JSON.parse(await GO.LoadFileData('../../data/namesplaces.json'));
                this.StrongsObject = JSON.parse(await GO.LoadFileData('../../data/strongs.json'));
                //Ensure propeties exists as Knockout needs them for binding.
                this.EnsureLegendProperties(this.LegendsObject);
                this.EnsureLegendProperties(this.NamesPlacesObject);
            };
            //Ensure propeties exists as Knockout needs them for binding.
            this.EnsureLegendProperties = (holderObject) => {
                for (let index in holderObject) {
                    if (holderObject[index].Refs == undefined) {
                        continue;
                    }
                    for (let ref of holderObject[index].Refs) {
                        if (ref.Bold == undefined) {
                            ref.Bold = [];
                        }
                        if (ref.Strongs == undefined) {
                            ref.Strongs = [];
                        }
                        if (ref.Html == undefined) {
                            ref.Html = '';
                        }
                    }
                }
            };
            //#endregion
            //****************************************************************************
            // Functions
            //#region ********************************************************************
            this.ShowHideHelp = () => {
                this.ShowHelp(!this.ShowHelp());
                //console.log(this.componentLoader.LastPageViewModel);
                go.PushPageHelp();
            };
            this.ShowHidePageSettings = () => {
                this.ShowPageSettings(!this.ShowPageSettings());
            };
            this.ShowHideGlobalSettings = () => {
                this.ShowGlobalSettings(!this.ShowGlobalSettings());
            };
            this.Start();
            //Reflective scrolling
            let bodyElement = document.querySelector('body');
            window.onscroll = () => {
                let actualScroll = Math.floor(window.scrollY / 3.5);
                bodyElement.style.setProperty('--bk-scroll-pos', `-${actualScroll}px`);
            };
        }
        async Start() {
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
                this.Bible.LoadBible('../../Data/eng-scripture_usfm.zip'),
                this.LoadDataFiles()
            ]);
            //Load needed page.
            this.Navigate();
        }
        SetupRoutes() {
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
        OpenCloseMenu() {
            this.MenuOpen(!this.MenuOpen());
        }
        //#endregion
        //****************************************************************************
        // Legend Functions
        //#region ********************************************************************
        //********************************
        //#region Legend Functions
        AddLegend(inputSections, holderObject, refType) {
            let newSections = [];
            let found = false;
            for (let inputSection of inputSections) {
                if (inputSection.Type != eRefTypeShow.None) {
                    newSections.push(inputSection);
                    continue;
                }
                for (let legendName in holderObject) {
                    let reg = new RegExp(`(^|(?<=\\W))(${legendName})($|(?=\\W))`, 'gi');
                    let htmlSections = inputSection.Html.split(reg);
                    if (htmlSections.length > 1) {
                        found = true;
                        for (let htmlSection of htmlSections) {
                            if (htmlSection.toLowerCase() != legendName.toLowerCase()) {
                                //Other text, search for more matches.
                                newSections.push(...this.AddLegend([new Section(htmlSection)], holderObject, refType));
                                //newSections.push(new Section(htmlSection));
                                continue;
                            }
                            let legend = holderObject[legendName];
                            let section = new Section('', refType);
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
        AddStrongs(inputSections) {
            let newSections = [];
            let found = false;
            for (let inputSection of inputSections) {
                if (inputSection.Type != eRefTypeShow.None) {
                    newSections.push(inputSection);
                    continue;
                }
                //Split on: '{Measure|G5518|One Liter}'
                let reg = new RegExp(`(\\{\\w+\\|\\w\\d{4}\\|?\\w*\\})`, 'gi'); //(\\{\\w+\\|\\w+\\|.*?\\})
                let htmlSections = inputSection.Html.split(reg);
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
                        let section = new Section('', eRefTypeShow.Strongs);
                        htmlSection = htmlSection.substr(1, htmlSection.length - 2); //Remove { }
                        let textSections = htmlSection.split('|');
                        section.Original = textSections[0];
                        section.Html = textSections[1]; //Strong No
                        //Meaning
                        if (textSections.length == 2) {
                            let strongLegend = this.StrongsObject[textSections[1]];
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
        GetMeaning(strongLegend, word) {
            if (strongLegend.Meanings == undefined) {
                return word == word.toLowerCase() ? strongLegend.Meaning.toLowerCase() : strongLegend.Meaning;
            }
            else {
                //Multiple
                //console.log('Word', word);
                for (let meaning of strongLegend.Meanings) {
                    if (word.search(meaning.Word) != -1) {
                        return meaning.Meaning;
                    }
                    if (word.toLowerCase().search(meaning.Word.toLowerCase()) != -1) {
                        return meaning.Meaning.toLowerCase();
                    }
                }
                return '?';
            }
        }
    }
    GO.Start = Start;
    class ImageLink {
        constructor(title, description, url, imageFileName) {
            this.ImageFileName = '';
            this.Title = title;
            this.Description = description;
            this.Url = url;
            if (imageFileName != undefined) {
                this.ImageFileName = `../../Images/ImgLinks/${imageFileName}`;
            }
        }
    }
    GO.ImageLink = ImageLink;
    class Section {
        constructor(html, type = eRefTypeShow.None) {
            this.Show = ko.observable(false);
            this.Html = html;
            this.Type = type;
        }
        OpenClose() {
            this.Show(!this.Show());
        }
    }
    GO.Section = Section;
})(GO || (GO = {}));
let go;
GO.DomReady(() => {
    go = new GO.Start();
});
