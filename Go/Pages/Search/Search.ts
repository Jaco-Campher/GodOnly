namespace GO.Pages {

    type IndexType = 'Exact' | 'Partial';

    type iSearchItems = {
        [index in IndexType]: KnockoutObservableArray<Section>;
    };

    export interface iSearchHistoryState extends iHistoryState<iHistoryKeyValues, iHistoryKeyValues> {
        Parameters: {
            bookName?: string;
            chapterNo?: string;
        }
    }

    export class SearchViewModel implements iNavigationChanged {

        //Search
        SearchText: KnockoutObservable<string> = ko.observable('').syncWith('BibleSearch');

        Items: iSearchItems = {
            'Exact': ko.observableArray<Section>([]),
            'Partial': ko.observableArray<Section>([])
        };

        //Search Info
        ExactMatchesCount: KnockoutObservable<number> = ko.observable<number>(0);
        PartialMatchesCount: KnockoutObservable<number> = ko.observable<number>(0);

        //Results Paging
        PageSize: KnockoutObservable<number> = ko.observable(20);
        CurrentPageType: KnockoutObservable<IndexType> = ko.observable<IndexType>('Exact');
        CurrentPageIndex: KnockoutObservable<number> = ko.observable(0);
        //CurrentPageIndexType: KnockoutObservable<IndexType> = ko.observable<IndexType>('Exact'); //??

        //MaxPageIndex: KnockoutComputed<number> = ko.computed((): number => {
        //    return Math.ceil(ko.unwrap(this.Items[this.CurrentPageType()]).length / this.PageSize()) - 1;
        //}, this);

        ItemsCurrentPage: KnockoutComputed<Array<Section>> = ko.computed((): Array<Section> => {
            let maxPageIndex: number = Math.ceil(ko.unwrap(this.Items[this.CurrentPageType()]).length / this.PageSize()) - 1;

            if (this.CurrentPageIndex() > maxPageIndex) { this.CurrentPageIndex(0); }
            let startIndex: number = this.PageSize() * this.CurrentPageIndex();

            return ko.unwrap<Array<Section>>(this.Items[this.CurrentPageType()]).slice(startIndex, startIndex + Number(this.PageSize()));
        }, this);

        ExactPages: KnockoutObservableArray<Page> = ko.observableArray<Page>([]);
        PartialPages: KnockoutObservableArray<Page> = ko.observableArray<Page>([]);


        //Settings
        ShowSettings: KnockoutObservable<boolean> = ko.observable<boolean>(false);

        //Search In
        SearchInOldTestament: KnockoutObservable<boolean> = ko.observable<boolean>(true);
        SearchInApocrypha: KnockoutObservable<boolean> = ko.observable<boolean>(true);
        SearchInNewTestament: KnockoutObservable<boolean> = ko.observable<boolean>(true);
        SearchInOtherBooks: KnockoutObservable<boolean> = ko.observable<boolean>(true);

        //Show
        ShowStrongs: KnockoutObservable<boolean> = ko.observable<boolean>(false);
        ShowProphecy: KnockoutObservable<boolean> = ko.observable<boolean>(false);
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

        //Seacrh Settings
        MatchCompleteWordsOnly: KnockoutObservable<boolean> = ko.observable<boolean>(true);
        MatchPartials: KnockoutObservable<boolean> = ko.observable<boolean>(true);

        NotFoundText: KnockoutObservable<string> = ko.observable('Enter your search term above.');

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.NavChanged();
            ko.postbox.subscribe('NavChanged', this.NavChanged, this);
            //ko.postbox.subscribe('RefsSectionsChanged', this.RefsSectionsChanged);
        }

        //****************************************************************************
        //#region Functions
        //****************************************************************************

        public NavChanged = () => {
            let state: iSearchHistoryState = history.state;
            //console.log('state', state);

            if (state && state.Hashes && state.Hashes['q']) {
                let searchText: string = decodeURI(state.Hashes['q']);
                if (searchText == ' ') { return; }

                
                this.SearchChanged(searchText, false);
                //ko.postbox.publish('BibleRefs', refsString);
            }
        }

        //#endregion

        SearchChanged = (searchText:string, updateHash: boolean = true) => {
            this.SearchText(searchText);
            this.Items.Exact([]);
            this.Items.Partial([]);

            //Reset counters for the search info.
            this.ExactMatchesCount(0);
            this.PartialMatchesCount(0);

            if (searchText == '') {
                this.NotFoundText('Enter your search term above.');
                return;
            }

            //Search
            if (this.SearchInOldTestament()) {
                this.SearchIn(go.Bible.OldTestamentBookNames);
            }

            if (this.SearchInApocrypha()) {
                this.SearchIn(go.Bible.ApocryphaBookNames);
            }

            if (this.SearchInNewTestament()) {
                this.SearchIn(go.Bible.NewTestamentBookNames);
            }

            if (this.SearchInOtherBooks()) {
                this.SearchIn(go.Bible.OtherBookNames);
            }

            this.UpdatePageNames('Exact');
            if (this.MatchPartials()) { this.UpdatePageNames('Partial'); }

            //Reset paging.
            if (this.ExactMatchesCount() > 0) {
                this.CurrentPageType('Exact');
            }
            else if(this.PartialMatchesCount() > 0) {
                this.CurrentPageType('Partial');
            }

            this.CurrentPageIndex(0);
            

            //Update URL hash.
            if (updateHash) { go.UpdateHash([{ Key: 'q', Value: searchText }]); }
        }

        SearchIn(bookNames: Array<iBookNamesArrayDetails>) {
            let searchText: string = this.SearchText().trim()
            //let searchTextLength: number = searchText.length - 1;

            searchText = searchText.replace(/([.*+?^=!:${}()\[\]\/\\])/g, ''); //Remove Regex special characters.

            //let partialSearcPattern: string = `\\b${searchText.replace(/ /g, '\\b|\\b')}\\b`;
            let words: Array<string> = searchText.split(' ');
            let matchPartials: boolean = words.length > 1 ? this.MatchPartials() : false; //Don't do partial search for one word.

            //TODO: Remove duplicate word from partial.

            if (this.MatchCompleteWordsOnly()) {
                searchText = `\\b${searchText.replace(/\|/g, '\\b|\\b')}\\b`
                //searchText = `\\b${searchText}\\b`;
            }


            //Search Info
            let exactMatchesCount: number = this.ExactMatchesCount();
            let partialMatchesCount: number = this.PartialMatchesCount();

            //Search
            bookNames.forEach((bookDetails: iBookNamesArrayDetails) => {
                let book: Book = go.Bible.Book(bookDetails.Abbr);

                //if (book.Abbr != 'Amo') { return; }
                
                book.ForEachChapter((chapter: Chapter, no: number) => {
                    if (chapter == undefined) { return; } //Some books have missing chapters.

                    //if (chapter.N != 5) { return; }

                    chapter.ForEachVerse((verse: Verse) => {
                        if (verse == undefined) { return; } //Some books have missing verses.

                        let verseText: string = verse.Text();
                        //console.log(verse.N, verseText)

                        //Exact
                        let matches: Array<RegExpMatchArray> = [...verseText.matchAll(new RegExp(searchText, 'gi'))];

                        if (matches.length > 0) {
                            let bold: Array<iRefBold> = [];

                            for (let match of matches) {
                                bold.push({ From: match.index as number, To: match.index as number + match[0].length - 1 }); //searchTextLength
                            }

                            this.Items.Exact.push(new Section(`${book.Abbr} ${chapter.N}:${verse.N}`, bold, book.Type));
                            exactMatchesCount++;
                        }
                        else {

                            //Partial
                            if (matchPartials) {
                                let found: boolean = true;
                                let bold: Array<iRefBold> = [];

                                for (let word of words) {
                                    matches = [...verseText.matchAll(new RegExp(`\\b${word}\\b`, 'gi'))];
                                    if (matches.length == 0) { found = false; break; } //All words must match.

                                    for (let match of matches) {
                                        bold.push({ From: match.index as number, To: match.index as number + word.length });
                                    }
                                }

                                if (found) {
                                    bold.sort((a: iRefBold, b: iRefBold): number => {
                                        return a.From > b.From ? 1 : -1;
                                    });

                                    this.Items.Partial.push(new Section(`${book.Abbr} ${chapter.N}:${verse.N}`, bold, book.Type));
                                    //console.log(`${book.Abbr} ${chapter.N}:${verse.N}`, bold);
                                    partialMatchesCount++;
                                }
                            }
                        }

                    });
                });
            });

            this.ExactMatchesCount(exactMatchesCount);
            this.PartialMatchesCount(partialMatchesCount);


            //let alphas: Array<string> = ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'sssssss']

            //let start1: number = performance.now();

            //for (var i = 0; i < 10000000; i++) {
            //    let text: string = '';
            //    for (let alpha of alphas) {
            //        text += alpha;
            //    }

            //    text.indexOf('sssssss');
            //}
            //console.log('end 1', performance.now() - start1);


            //let start2: number = performance.now();

            //for (var i = 0; i < 10000000; i++) {
            //    let text2: string = '';
            //    for (let ii = 0; ii < alphas.length; ii++) {
            //        text2 += alphas[ii];
            //    }

            //    text2.indexOf('sssssss');
            //}
            //console.log('end 2', performance.now() - start2);



            //let start3: number = performance.now();

            //for (var i = 0; i < 10000000; i++) {
            //    let text3: string = '';
            //    let len = alphas.length;
            //    for (let i = 0; i < len; i++) {
            //        text3 += alphas[i];
            //    }

            //    text3.indexOf('sssssss');
            //}
            //console.log('end 3', performance.now() - start3);


        }

        UpdatePageNames = (type: IndexType) => {
            let pages: Array<Page> = [];

            let maxPageIndex: number = Math.ceil(ko.unwrap(this.Items[type]).length / this.PageSize()) - 1;

            for (let pageIndex = 0; pageIndex <= maxPageIndex; pageIndex++) {
                let first: number = pageIndex * this.PageSize();
                let last: number = (first + this.PageSize()) - 1;

                if (last >= this.Items[type]().length) { last = this.Items[type]().length - 1 }
                //console.log('...', pageIndex, first, last, this.Items[type]().length);
                //console.log('last', last);

                let page: Page = new Page(`${this.Items[type]()[first].Ref} - ${this.Items[type]()[last].Ref}`, pageIndex)

                for (let i = first; i <= last; i++) {
                    switch (this.Items[type]()[i].Type) {
                        case BookType.OldTestament:
                            page.OldTestament = true;
                            break;

                        case BookType.Apocrypha:
                            page.Apocrypha = true;
                            break;

                        case BookType.NewTestament:
                            page.NewTestament = true;
                            break;

                        //case BookType.Other:
                        default:
                            page.OtherBooks = true;
                    }

                }
                page.UpdateTypeHtml();
                pages.push(page);
            }


            switch (type) {
                case 'Exact':
                    this.ExactPages(pages);
                    break;

                //case 'Partial':
                default:
                    this.PartialPages(pages);
            }

        }

        ShowHideSettings = () => {
            this.ShowSettings(!this.ShowSettings());
        }

        ShowHideProphecyLegendInfo = () => {
            this.ShowProphecyLegendInfo(!this.ShowProphecyLegendInfo());
        }

        UpdatePageIndex = (index: number, type: IndexType) => {
            this.CurrentPageType(type);
            this.CurrentPageIndex(index);
        }

        PrevPage = () => {
            switch (this.CurrentPageType()) {
                case 'Exact':
                    if (this.CurrentPageIndex() == 0) { return; } //Already on the first page.
                    this.CurrentPageIndex(this.CurrentPageIndex() - 1);
                    break;

                //case 'Partial':
                default:
                    if (this.CurrentPageIndex() > 0) {
                        this.CurrentPageIndex(this.CurrentPageIndex() - 1);
                    }
                    else {
                        if (this.ExactMatchesCount() > 0) {
                            let maxPageIndex: number = Math.ceil(ko.unwrap(this.Items['Exact']).length / this.PageSize()) - 1;

                            this.CurrentPageType('Exact');
                            this.CurrentPageIndex(maxPageIndex);
                        }
                    }
            }

            window.scrollTo({ top: 0 });
        }

        NextPage = () => {
            let maxPageIndex: number = Math.ceil(ko.unwrap(this.Items[this.CurrentPageType()]).length / this.PageSize()) - 1;

            switch (this.CurrentPageType()) {
                case 'Exact':
                    if (this.CurrentPageIndex() == maxPageIndex) {
                        this.CurrentPageType('Partial');
                        this.CurrentPageIndex(0);
                        return;
                    }
                    this.CurrentPageIndex(this.CurrentPageIndex() + 1);
                    break;

                //case 'Partial':
                default:
                    if (this.CurrentPageIndex() == maxPageIndex) { return; } //Already on the last page.
                    this.CurrentPageIndex(this.CurrentPageIndex() + 1);
            }

            window.scrollTo({ top: 0 });
        }

    }

    class Section {
        Ref: string;
        Bold: Array<iRefBold>;
        Type: BookType;

        constructor(ref: string, bold: Array<iRefBold>, type: BookType) {
            this.Ref = ref;
            this.Bold = bold;
            this.Type = type;
        }
    }

    class Page {
        OldTestament: boolean = false;
        Apocrypha: boolean = false;
        NewTestament: boolean = false;
        OtherBooks: boolean = false;

        TypeHtml: string = '<div class="types">';

        constructor(public Title: string, public Index: number) { }

        UpdateTypeHtml = () => {
            if (this.OldTestament) { this.TypeHtml += '<div class="bib old"></div>'; }
            if (this.Apocrypha) { this.TypeHtml += '<div class="bib apo"></div>'; }
            if (this.NewTestament) { this.TypeHtml += '<div class="bib new"></div>'; }
            if (this.OtherBooks) { this.TypeHtml += '<div class="bib other"></div>'; }

            this.TypeHtml += `</div><div>${this.Title}</div>`;
        }
    }
}