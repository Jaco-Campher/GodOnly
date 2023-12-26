"use strict";
var GO;
(function (GO) {
    var Pages;
    (function (Pages) {
        class SearchViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                //Search
                this.SearchText = ko.observable('').syncWith('BibleSearch');
                this.Items = {
                    'Exact': ko.observableArray([]),
                    'Partial': ko.observableArray([])
                };
                //Search Info
                this.ExactMatchesCount = ko.observable(0);
                this.PartialMatchesCount = ko.observable(0);
                //Results Paging
                this.PageSize = ko.observable(20);
                this.CurrentPageType = ko.observable('Exact');
                this.CurrentPageIndex = ko.observable(0);
                //CurrentPageIndexType: KnockoutObservable<IndexType> = ko.observable<IndexType>('Exact'); //??
                //MaxPageIndex: KnockoutComputed<number> = ko.computed((): number => {
                //    return Math.ceil(ko.unwrap(this.Items[this.CurrentPageType()]).length / this.PageSize()) - 1;
                //}, this);
                this.ItemsCurrentPage = ko.computed(() => {
                    let maxPageIndex = Math.ceil(ko.unwrap(this.Items[this.CurrentPageType()]).length / this.PageSize()) - 1;
                    if (this.CurrentPageIndex() > maxPageIndex) {
                        this.CurrentPageIndex(0);
                    }
                    let startIndex = this.PageSize() * this.CurrentPageIndex();
                    return ko.unwrap(this.Items[this.CurrentPageType()]).slice(startIndex, startIndex + Number(this.PageSize()));
                }, this);
                this.ExactPages = ko.observableArray([]);
                this.PartialPages = ko.observableArray([]);
                //Settings
                this.ShowSettings = ko.observable(false);
                //Search In
                this.SearchInOldTestament = ko.observable(true);
                this.SearchInApocrypha = ko.observable(true);
                this.SearchInNewTestament = ko.observable(true);
                this.SearchInOtherBooks = ko.observable(true);
                //Show
                this.ShowStrongs = ko.observable(false);
                this.ShowProphecy = ko.observable(false);
                this.ShowWordMeaning = ko.observable(false);
                this.ShowAllStrongs = ko.observable(false);
                this.ShowLegendType = ko.computed(() => {
                    let show = GO.eRefTypeShow.None;
                    if (this.ShowStrongs()) {
                        show += GO.eRefTypeShow.Strongs;
                    }
                    if (this.ShowProphecy()) {
                        show += GO.eRefTypeShow.Prophesy;
                    }
                    if (this.ShowWordMeaning()) {
                        show += GO.eRefTypeShow.WordMeaning;
                    }
                    if (this.ShowAllStrongs()) {
                        show += GO.eRefTypeShow.AllStrongs;
                    }
                    return show;
                }, this);
                this.ShowProphecyLegendInfo = ko.observable(false);
                //Seacrh Settings
                this.MatchCompleteWordsOnly = ko.observable(true);
                this.MatchPartials = ko.observable(true);
                this.NotFoundText = ko.observable('Enter your search term above.');
                //****************************************************************************
                //#region Functions
                //****************************************************************************
                this.NavChanged = () => {
                    let state = history.state;
                    //console.log('state', state);
                    if (state && state.Hashes && state.Hashes['q']) {
                        let searchText = decodeURI(state.Hashes['q']);
                        if (searchText == ' ') {
                            return;
                        }
                        this.SearchChanged(searchText, false);
                        //ko.postbox.publish('BibleRefs', refsString);
                    }
                };
                //#endregion
                this.SearchChanged = (searchText, updateHash = true) => {
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
                    if (this.MatchPartials()) {
                        this.UpdatePageNames('Partial');
                    }
                    //Reset paging.
                    if (this.ExactMatchesCount() > 0) {
                        this.CurrentPageType('Exact');
                    }
                    else if (this.PartialMatchesCount() > 0) {
                        this.CurrentPageType('Partial');
                    }
                    this.CurrentPageIndex(0);
                    //Update URL hash.
                    if (updateHash) {
                        go.UpdateHash([{ Key: 'q', Value: searchText }]);
                    }
                };
                this.UpdatePageNames = (type) => {
                    let pages = [];
                    let maxPageIndex = Math.ceil(ko.unwrap(this.Items[type]).length / this.PageSize()) - 1;
                    for (let pageIndex = 0; pageIndex <= maxPageIndex; pageIndex++) {
                        let first = pageIndex * this.PageSize();
                        let last = (first + this.PageSize()) - 1;
                        if (last >= this.Items[type]().length) {
                            last = this.Items[type]().length - 1;
                        }
                        //console.log('...', pageIndex, first, last, this.Items[type]().length);
                        //console.log('last', last);
                        let page = new Page(`${this.Items[type]()[first].Ref} - ${this.Items[type]()[last].Ref}`, pageIndex);
                        for (let i = first; i <= last; i++) {
                            switch (this.Items[type]()[i].Type) {
                                case "old" /* BookType.OldTestament */:
                                    page.OldTestament = true;
                                    break;
                                case "apo" /* BookType.Apocrypha */:
                                    page.Apocrypha = true;
                                    break;
                                case "new" /* BookType.NewTestament */:
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
                };
                this.ShowHideSettings = () => {
                    this.ShowSettings(!this.ShowSettings());
                };
                this.ShowHideProphecyLegendInfo = () => {
                    this.ShowProphecyLegendInfo(!this.ShowProphecyLegendInfo());
                };
                this.UpdatePageIndex = (index, type) => {
                    this.CurrentPageType(type);
                    this.CurrentPageIndex(index);
                    GO.ScrollToTop();
                };
                this.PrevPage = () => {
                    switch (this.CurrentPageType()) {
                        case 'Exact':
                            if (this.CurrentPageIndex() == 0) {
                                return;
                            } //Already on the first page.
                            this.CurrentPageIndex(this.CurrentPageIndex() - 1);
                            break;
                        //case 'Partial':
                        default:
                            if (this.CurrentPageIndex() > 0) {
                                this.CurrentPageIndex(this.CurrentPageIndex() - 1);
                            }
                            else {
                                if (this.ExactMatchesCount() > 0) {
                                    let maxPageIndex = Math.ceil(ko.unwrap(this.Items['Exact']).length / this.PageSize()) - 1;
                                    this.CurrentPageType('Exact');
                                    this.CurrentPageIndex(maxPageIndex);
                                }
                            }
                    }
                    GO.ScrollToTop();
                };
                this.NextPage = () => {
                    let maxPageIndex = Math.ceil(ko.unwrap(this.Items[this.CurrentPageType()]).length / this.PageSize()) - 1;
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
                            if (this.CurrentPageIndex() == maxPageIndex) {
                                return;
                            } //Already on the last page.
                            this.CurrentPageIndex(this.CurrentPageIndex() + 1);
                    }
                    GO.ScrollToTop();
                };
                this.NavChanged();
                ko.postbox.subscribe('NavChanged', this.NavChanged, this);
                //ko.postbox.subscribe('RefsSectionsChanged', this.RefsSectionsChanged);
            }
            SearchIn(bookNames) {
                let searchText = this.SearchText().trim();
                //let searchTextLength: number = searchText.length - 1;
                searchText = searchText.replace(/([.*+?^=!:${}()\[\]\/\\])/g, ''); //Remove Regex special characters.
                //let partialSearcPattern: string = `\\b${searchText.replace(/ /g, '\\b|\\b')}\\b`;
                let words = searchText.split(' ');
                let matchPartials = words.length > 1 ? this.MatchPartials() : false; //Don't do partial search for one word.
                //TODO: Remove duplicate word from partial.
                if (this.MatchCompleteWordsOnly()) {
                    searchText = `\\b${searchText.replace(/\|/g, '\\b|\\b')}\\b`;
                    //searchText = `\\b${searchText}\\b`;
                }
                //Search Info
                let exactMatchesCount = this.ExactMatchesCount();
                let partialMatchesCount = this.PartialMatchesCount();
                //Search
                bookNames.forEach((bookDetails) => {
                    let book = go.Bible.Book(bookDetails.Abbr);
                    //if (book.Abbr != 'Amo') { return; }
                    book.ForEachChapter((chapter, no) => {
                        if (chapter == undefined) {
                            return;
                        } //Some books have missing chapters.
                        //if (chapter.N != 5) { return; }
                        chapter.ForEachVerse((verse) => {
                            if (verse == undefined) {
                                return;
                            } //Some books have missing verses.
                            let verseText = verse.Text();
                            //console.log(verse.N, verseText)
                            //Exact
                            let matches = [...verseText.matchAll(new RegExp(searchText, 'gi'))];
                            if (matches.length > 0) {
                                let bold = [];
                                for (let match of matches) {
                                    bold.push({ From: match.index, To: match.index + match[0].length - 1 }); //searchTextLength
                                }
                                this.Items.Exact.push(new Section(`${book.Abbr} ${chapter.N}:${verse.N}`, bold, book.Type));
                                exactMatchesCount++;
                            }
                            else {
                                //Partial
                                if (matchPartials) {
                                    let found = true;
                                    let bold = [];
                                    for (let word of words) {
                                        matches = [...verseText.matchAll(new RegExp(`\\b${word}\\b`, 'gi'))];
                                        if (matches.length == 0) {
                                            found = false;
                                            break;
                                        } //All words must match.
                                        for (let match of matches) {
                                            bold.push({ From: match.index, To: match.index + word.length });
                                        }
                                    }
                                    if (found) {
                                        bold.sort((a, b) => {
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
            }
        }
        Pages.SearchViewModel = SearchViewModel;
        class Section {
            constructor(ref, bold, type) {
                this.Ref = ref;
                this.Bold = bold;
                this.Type = type;
            }
        }
        class Page {
            constructor(Title, Index) {
                this.Title = Title;
                this.Index = Index;
                this.OldTestament = false;
                this.Apocrypha = false;
                this.NewTestament = false;
                this.OtherBooks = false;
                this.TypeHtml = '<div class="types">';
                this.UpdateTypeHtml = () => {
                    if (this.OldTestament) {
                        this.TypeHtml += '<div class="bib old"></div>';
                    }
                    if (this.Apocrypha) {
                        this.TypeHtml += '<div class="bib apo"></div>';
                    }
                    if (this.NewTestament) {
                        this.TypeHtml += '<div class="bib new"></div>';
                    }
                    if (this.OtherBooks) {
                        this.TypeHtml += '<div class="bib other"></div>';
                    }
                    this.TypeHtml += `</div><div>${this.Title}</div>`;
                };
            }
        }
    })(Pages = GO.Pages || (GO.Pages = {}));
})(GO || (GO = {}));
