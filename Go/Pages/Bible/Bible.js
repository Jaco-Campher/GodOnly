var GO;
(function (GO) {
    var Pages;
    (function (Pages) {
        class BibleViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Sections = ko.observableArray([]);
                this.SearchRefs = ko.observable('').syncWith('BibleRefs');
                this.ShowSettings = ko.observable(false);
                this.ShowStrongs = ko.observable(true);
                this.ShowProphecy = ko.observable(true);
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
                //****************************************************************************
                //#region Functions
                //****************************************************************************
                this.NavChanged = () => {
                    let state = history.state;
                    //console.log('state', state);
                    if (state && state.Hashes && state.Hashes['ref']) {
                        let refsString = this.GetFromHash(state.Hashes['ref']);
                        this.SearchChanged(refsString, false);
                        this.SearchRefs(refsString);
                        //ko.postbox.publish('BibleRefs', refsString);
                    }
                };
                this.AddSection = () => {
                    this.Sections.push(new Section());
                };
                this.ClearSection = (section) => {
                    this.Sections.remove(section);
                    this.RefsSectionsChanged();
                };
                this.SearchChanged = (refsString, updateHash = true) => {
                    if (refsString == '') {
                        this.Sections([new Section()]);
                    } //Show default view.
                    this.Sections([]);
                    if (refsString.indexOf(',') == -1) {
                        this.Sections.push(new Section(refsString.trim()));
                    }
                    else {
                        let refs = refsString.split(',');
                        for (let ref of refs) {
                            this.Sections.push(new Section(ref.trim()));
                        }
                    }
                    if (updateHash) {
                        go.UpdateHash([{ Key: 'ref', Value: this.MakeHash(refsString) }]);
                    }
                };
                this.RefsSectionsChanged = () => {
                    let refsString = '';
                    for (let section of this.Sections()) {
                        if (section.ShowComponent() != 'Content') {
                            continue;
                        }
                        refsString += refsString == '' ? section.Ref() : `, ${section.Ref()}`;
                    }
                    this.SearchRefs(refsString);
                    go.UpdateHash([{ Key: 'ref', Value: this.MakeHash(refsString) }]);
                };
                this.MakeHash = (refsString) => {
                    return refsString.replace(/ /g, '_').replace(/:/g, '|').replace(/,/g, '+');
                };
                this.GetFromHash = (hashString) => {
                    return hashString.replace(/_/g, ' ').replace(/\|/g, ':').replace(/\+/g, ',');
                };
                this.ShowHideSettings = () => {
                    this.ShowSettings(!this.ShowSettings());
                };
                this.ShowHideProphecyLegendInfo = () => {
                    this.ShowProphecyLegendInfo(!this.ShowProphecyLegendInfo());
                };
                this.Sections.push(new Section());
                this.NavChanged();
                ko.postbox.subscribe('NavChanged', this.NavChanged, this);
                ko.postbox.subscribe('RefsSectionsChanged', this.RefsSectionsChanged);
            }
        }
        Pages.BibleViewModel = BibleViewModel;
        class Section {
            constructor(ref) {
                this.TotalChapters = ko.observable(0);
                this.FirstChapterNo = ko.observable(0);
                this.ShowComponent = ko.observable('');
                this.Ref = ko.observable('');
                this.Book = ko.observable();
                this.ChapterNo = ko.observable(-1);
                this.ShowPrev = ko.computed(() => {
                    return this.ChapterNo() > 1;
                }, this);
                this.ShowNext = ko.computed(() => {
                    return this.ChapterNo() < this.TotalChapters();
                }, this);
                this.SelectBook = () => {
                    this.Book(null);
                    this.ChapterNo(-1);
                    this.ShowComponent('BookSelect');
                };
                this.BookSelected = (bookDetails) => {
                    this.Ref(bookDetails.Abbr);
                    //Show chapter selection.
                    this.ChapterNo(-1);
                    this.Book(go.Bible.Book(bookDetails.Abbr));
                    this.FirstChapterNo(this.Book().FirstChapterNo);
                    this.TotalChapters(this.Book().ChapterCount + this.FirstChapterNo());
                    this.ShowComponent('ChapterSelect');
                };
                this.SelectChapter = () => {
                    this.ChapterNo(-1);
                    this.FirstChapterNo(this.Book().FirstChapterNo);
                    this.TotalChapters(this.Book().ChapterCount + this.FirstChapterNo());
                    this.ShowComponent('ChapterSelect');
                };
                this.ChapterSelected = (num) => {
                    this.ChapterNo(Number(num));
                    this.Ref(`${this.Book().Abbr} ${num}`);
                    this.ShowComponent('Content');
                    ko.postbox.publish('RefsSectionsChanged', new Date()); //Publish a new random value to trigger the RefsSectionsChanged function.
                };
                this.Prev = () => {
                    this.ChapterSelected(this.ChapterNo() - 1);
                    GO.ScrollToTop();
                };
                this.Next = () => {
                    this.ChapterSelected(this.ChapterNo() + 1);
                    GO.ScrollToTop();
                };
                if (ref == undefined) {
                    this.ShowComponent('BookSelect');
                }
                else {
                    this.Ref(ref);
                    //Needed to show the prev next buttons.
                    let bibleRef = go.Bible.GetBibleReference(ref.trim());
                    if (bibleRef != null && bibleRef.Verses == undefined) {
                        this.Book(go.Bible.Book(bibleRef.BookAbbr));
                        this.ChapterNo(bibleRef.Chapter);
                        this.TotalChapters(this.Book().ChapterCount);
                    }
                    this.ShowComponent('Content');
                }
            }
        }
    })(Pages = GO.Pages || (GO.Pages = {}));
})(GO || (GO = {}));
