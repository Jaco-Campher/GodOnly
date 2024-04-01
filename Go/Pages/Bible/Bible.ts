namespace GO.Pages {

    export interface iBibleHistoryState extends iHistoryState<iHistoryKeyValues, iHistoryKeyValues> {
        Parameters: {
            bookName?: string;
            chapterNo?: string;
        }
    }

    type tShowComponent = '' | 'BookSelect' | 'ChapterSelect' | 'Content'

    export class BibleViewModel implements iNavigationChanged {

        Sections: KnockoutObservableArray<Section> = ko.observableArray<Section>([]);

        SearchRefs: KnockoutObservable<string> = ko.observable('').syncWith('BibleRefs');

        ShowSettings: KnockoutObservable<boolean> = ko.observable<boolean>(false);
        
        ShowStrongs: KnockoutObservable<boolean> = ko.observable<boolean>(true);
        ShowProphecy: KnockoutObservable<boolean> = ko.observable<boolean>(true);
        ShowWordMeaning: KnockoutObservable<boolean> = ko.observable<boolean>(false);
        ShowAllStrongs: KnockoutObservable<boolean> = ko.observable<boolean>(false);

        ShowLegendType: KnockoutComputed<eRefTypeShow> = ko.computed((): eRefTypeShow => {
            let show: eRefTypeShow = eRefTypeShow.None;

            if (this.ShowStrongs()) { show += eRefTypeShow.Strongs; }
            if (this.ShowProphecy()) { show += eRefTypeShow.Prophesy; }
            if (this.ShowWordMeaning()) { show += eRefTypeShow.WordMeaning; }

            if (this.ShowAllStrongs()) { show += eRefTypeShow.AllStrongs; }

            return show;
        }, this);

        ShowProphecyLegendInfo: KnockoutObservable<boolean> = ko.observable<boolean>(false);

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.Sections.push(new Section());

            this.NavChanged();
            ko.postbox.subscribe('NavChanged', this.NavChanged, this);
            ko.postbox.subscribe('RefsSectionsChanged', this.RefsSectionsChanged);
        }

        //****************************************************************************
        //#region Functions
        //****************************************************************************

        NavChanged = () => {
            let state: iBibleHistoryState = history.state;
            //console.log('state', state);
            
            if (state && state.Hashes && state.Hashes['ref']) {
                let refsString: string = this.GetFromHash(state.Hashes['ref']);
                
                this.SearchChanged(refsString, false);
                this.SearchRefs(refsString);
                //ko.postbox.publish('BibleRefs', refsString);
            }
        }

        AddSection = () => {
            this.Sections.push(new Section());
        }

        ClearSection = (section: Section) => {
            this.Sections.remove(section);
            this.RefsSectionsChanged();
        }

        SearchChanged = (refsString: string, updateHash: boolean = true) => {
            if (refsString  == '') { this.Sections([new Section()]); } //Show default view.

            this.Sections([]);

            if (refsString.indexOf(',') == -1) {
                this.Sections.push(new Section(refsString.trim()));
            }
            else {
                let refs: Array<string> = refsString.split(',');
                
                for (let ref of refs) {
                    this.Sections.push(new Section(ref.trim()));
                }
            }

            if (updateHash) { go.UpdateHash([{ Key: 'ref', Value: this.MakeHash(refsString) }]); }
        }

        RefsSectionsChanged = () => {
            let refsString: string = '';

            for (let section of this.Sections()) {
                if (section.ShowComponent() != 'Content') { continue; }

                refsString += refsString == '' ? section.Ref() : `, ${section.Ref()}`;
            }

            this.SearchRefs(refsString);
            go.UpdateHash([{ Key: 'ref', Value: this.MakeHash(refsString) }]);
        }

        MakeHash = (refsString: string): string => {
            return refsString.replace(/ /g, '_').replace(/:/g, '|').replace(/,/g, '+');
        }

        GetFromHash = (hashString: string): string => {
            return hashString.replace(/_/g, ' ').replace(/\|/g, ':').replace(/\+/g, ',');
        }

        ShowHideSettings = () => {
            this.ShowSettings(!this.ShowSettings());
        }

        ShowHideProphecyLegendInfo = () => {
            this.ShowProphecyLegendInfo(!this.ShowProphecyLegendInfo());
        }

        //#endregion

    }

    class Section {
        TotalChapters: KnockoutObservable<number> = ko.observable(0);
        FirstChapterNo: KnockoutObservable<number> = ko.observable(0);
        ShowComponent: KnockoutObservable<tShowComponent> = ko.observable<tShowComponent>('');

        Ref: KnockoutObservable<string> = ko.observable('');
        Book: KnockoutObservable<Book | null> = ko.observable();
        ChapterNo: KnockoutObservable<number> = ko.observable(-1);

        ShowPrev: KnockoutComputed<boolean> = ko.computed((): boolean => {
            return this.ChapterNo() > 1;
        }, this);

        ShowNext: KnockoutComputed<boolean> = ko.computed((): boolean => {
            console.log('TotalChapters', this.TotalChapters());
            return this.ChapterNo() < this.TotalChapters();
        }, this);

        constructor(ref?: string) {
            if (ref == undefined) {
                this.ShowComponent('BookSelect');
            }
            else
            {
                this.Ref(ref);

                //Needed to show the prev next buttons.
                let bibleRef: iBibleRef | null = go.Bible.GetBibleReference(ref.trim());
                if (bibleRef != null && bibleRef.Verses == undefined) {
                    this.Book(go.Bible.Book(bibleRef.BookAbbr));
                    this.ChapterNo(bibleRef.Chapter);
                    this.TotalChapters(this.Book()!.ChapterCount);
                    console.log('ChapterCount', this.Book()!.ChapterCount);
                }

                this.ShowComponent('Content');
            }
        }

        SelectBook = () => {
            this.Book(null);
            this.ChapterNo(-1);
            this.ShowComponent('BookSelect');
        }

        BookSelected = (bookDetails: iBookNamesArrayDetails) => {
            this.Ref(bookDetails.Abbr);
            //Show chapter selection.
            this.ChapterNo(-1);
            this.Book(go.Bible.Book(bookDetails.Abbr));
            this.FirstChapterNo(this.Book()!.FirstChapterNo);
            this.TotalChapters(this.Book()!.ChapterCount);
            this.ShowComponent('ChapterSelect');
        }

        SelectChapter = () => {
            this.ChapterNo(-1);
            this.FirstChapterNo(this.Book()!.FirstChapterNo);
            this.TotalChapters(this.Book()!.ChapterCount);
            this.ShowComponent('ChapterSelect');
        }

        ChapterSelected = (num: number) => {
            this.ChapterNo(Number(num));
            this.Ref(`${this.Book()!.Abbr} ${num}`);
            this.ShowComponent('Content');
            
            ko.postbox.publish('RefsSectionsChanged', new Date()); //Publish a new random value to trigger the RefsSectionsChanged function.
        }

        Prev = () => {
            this.ChapterSelected(this.ChapterNo() - 1);
            GO.ScrollToTop();
        }

        Next = () => {
            this.ChapterSelected(this.ChapterNo() + 1);
            GO.ScrollToTop();
        }
    }
}