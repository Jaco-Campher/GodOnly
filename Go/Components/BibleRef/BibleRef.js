var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class BibleRefViewModel {
            constructor(params, componentInfo) {
                this.params = params;
                this.Verses = ko.observableArray([]);
                this.RefString = ko.observable();
                this.RefDisplay = ko.observable('');
                this.AllStrongs = ko.observable(false);
                this.BookType = ko.observable('');
                this.Bold = [];
                this.BoldOffset = 0; //The index to process from.
                this.Strongs = [];
                this.StrongsObject = {};
                this.StrongsManual = false;
                this.FullChapter = ko.observable(false); //Set to true to hide the context controls.
                this.DisplayContext = ko.observable('SelectedOnly');
                this.TemplateType = (section) => {
                    return `T${section.Type}`;
                };
                //****************************************************************************
                //#region Load
                //****************************************************************************
                this.LoadVerses = () => {
                    let ref = go.Bible.GetBibleReference(this.RefString().trim());
                    //console.log('ref', ref);
                    if (ref == null) {
                        this.AddNotFound();
                        return;
                    } //Not a valid reference.
                    let book = go.Bible.Book(ref.BookAbbr);
                    if (book == null) {
                        this.AddNotFound();
                        return;
                    } //Not a valid reference.
                    this.BookType(book.Type.toString());
                    let chapter = book[ref.Chapter];
                    let newVerses = [];
                    this.BoldOffset = 0;
                    //console.log('ref', ref);
                    //console.log('book', book);
                    //console.log('chapter', chapter);
                    if (ref.Verses) {
                        //Show selected verses.
                        if (this.DisplayContext() != 'SelectedOnly' && ref.Verses[0] != 1) {
                            let first = this.DisplayContext() == 'All' ? 1 : ref.Verses[0] - 3;
                            if (first < 1) {
                                first = 1;
                            }
                            for (let verseNo = first; verseNo < ref.Verses[0]; verseNo++) {
                                newVerses.push(this.AddBasicOrStrongs(chapter[verseNo], true, false));
                            }
                        }
                        for (let verseNo of ref.Verses) {
                            newVerses.push(this.AddBasicOrStrongs(chapter[verseNo], false, true));
                        }
                        if (this.DisplayContext() != 'SelectedOnly') {
                            let first = ref.Verses[ref.Verses.length - 1] + 1;
                            if (first < chapter.VerseCount) {
                                let last = this.DisplayContext() == 'All' ? chapter.VerseCount : first + 3;
                                if (last > chapter.VerseCount) {
                                    last = chapter.VerseCount;
                                }
                                for (let verseNo = first; verseNo <= last; verseNo++) {
                                    newVerses.push(this.AddBasicOrStrongs(chapter[verseNo], true, false));
                                }
                            }
                        }
                    }
                    else {
                        //Show all verses.
                        for (let verseNo = 1; verseNo <= chapter.VerseCount; verseNo++) {
                            newVerses.push(this.AddBasicOrStrongs(chapter[verseNo], false, true));
                        }
                        this.FullChapter(true);
                    }
                    this.RefDisplay(`${book.Name} ${chapter.N}${ref.VersesString}`);
                    this.AddRefShow(newVerses, this.params.Show());
                };
                this.SetDisplayContext = (displayContext) => {
                    this.DisplayContext(displayContext);
                    this.LoadVerses();
                };
                this.ToggleAllStrongs = () => {
                    this.AllStrongs(!this.AllStrongs());
                    this.LoadVerses();
                };
                //********************************
                //#region Basic Functions
                this.AddNotFound = () => {
                    let verseHolder = new VerseHolder();
                    verseHolder.Sections.push(new GO.Section('Not Found', GO.eRefTypeShow.None));
                    this.RefDisplay(this.RefString().trim());
                    this.Verses([verseHolder]);
                };
                if (params.Data != undefined) {
                    params = params.Data;
                }
                if (params.Bold != undefined) {
                    this.Bold = params.Bold;
                }
                if (params.Show == undefined) {
                    params.Show = ko.observable(GO.eRefTypeShow.None);
                }
                else if (!ko.isObservable(params.Show)) {
                    params.Show = ko.observable(params.Show);
                }
                else {
                    params.Show.subscribe(this.LoadVerses);
                }
                if (params.Strongs == undefined) {
                    this.StrongsObject = go.StrongsObject;
                }
                else {
                    for (let strong of params.Strongs) {
                        this.StrongsObject[strong.Strong] = { Meaning: strong.Meaning };
                    }
                    this.StrongsManual = true;
                    this.Strongs = params.Strongs; //Needed for Knockout bindings.
                }
                this.RefString = ko.isObservable(params.Ref) ? params.Ref : ko.observable(params.Ref);
                this.LoadVerses();
                this.RefString.subscribe(this.LoadVerses);
            }
            //#endregion
            //****************************************************************************
            //#region Legend Functions
            //****************************************************************************
            AddRefShow(verses, show) {
                //if (show & eRefTypeShow.Prophesy) { verses = this.AddVerseLegend(verses); }
                for (let verseHolder of verses) {
                    if (show & GO.eRefTypeShow.Prophesy) {
                        verseHolder.Sections(go.AddLegend(verseHolder.Sections(), go.LegendsObject, GO.eRefTypeShow.Prophesy));
                    }
                    if (show & GO.eRefTypeShow.NamesPlaces) {
                        verseHolder.Sections(go.AddLegend(verseHolder.Sections(), go.NamesPlacesObject, GO.eRefTypeShow.NamesPlaces));
                    }
                }
                this.Verses(verses);
            }
            //#endregion
            //********************************
            //#region Strongs Functions
            AddBasicOrStrongs(verse, dim, useBold) {
                let verseHolder = new VerseHolder(dim);
                if (verse == undefined) {
                    return verseHolder;
                }
                verseHolder.VerseNo(`${verse.N}.`);
                let strongLegend;
                let html = '';
                for (let word of verse.Words) {
                    //console.log(word);
                    let wordText = word.Text;
                    let wordClasses = word.Added ? 'a' : '';
                    let strongNo = '';
                    let strongMeaning = '?';
                    ////Check for words to make bold if needed.
                    if (useBold && this.Bold.length > 0) {
                        let boldOutput = go.AddBoldAtIndex(wordText, this.Bold, this.BoldOffset);
                        this.BoldOffset = boldOutput.Offset;
                        wordText = boldOutput.Html;
                    }
                    if (word.Strongs != null) { //Check for Strongs processing if there are Strongs
                        if (this.StrongsManual || this.params.Show() & GO.eRefTypeShow.Strongs) {
                            for (let i = 0; i < word.Strongs.length; i++) {
                                strongLegend = this.StrongsObject[word.Strongs[i]];
                                if (strongLegend == undefined) {
                                    continue;
                                }
                                strongNo += word.Strongs[i];
                                strongMeaning = go.GetMeaning(strongLegend, wordText);
                                break;
                            }
                        }
                        if (strongMeaning == '?') {
                            if (this.params.Show() & GO.eRefTypeShow.AllStrongs || this.AllStrongs()) {
                                for (let strong of word.Strongs) {
                                    strongNo += strong;
                                    wordText += `<sup><a href="https://www.blueletterbible.org/lexicon/${strong}/kjv" target="blank">${strong}</a> </sup>`;
                                }
                            }
                        }
                    }
                    if (strongNo == '') {
                        html += wordClasses == '' ? wordText : `<span class="${wordClasses}">${wordText}</span>`;
                    }
                    else {
                        //Add strongs section if valid.
                        if (strongMeaning == '?') {
                            html += wordText;
                        }
                        else {
                            if (html != '') { //Add existing none strongs section.
                                verseHolder.Sections.push(new GO.Section(html, GO.eRefTypeShow.None));
                                html = '';
                            }
                            let section = new GO.Section(strongNo, GO.eRefTypeShow.Strongs);
                            section.Original = wordText;
                            section.Meaning = strongMeaning;
                            verseHolder.Sections.push(section);
                        }
                    }
                }
                if (html != '') {
                    verseHolder.Sections.push(new GO.Section(html, GO.eRefTypeShow.None));
                }
                return verseHolder;
            }
        }
        Compnents.BibleRefViewModel = BibleRefViewModel;
        class VerseHolder {
            constructor(dim = false) {
                this.VerseNo = ko.observable();
                this.Sections = ko.observableArray([]);
                this.Dim = dim;
            }
        }
        //class Section {
        //    Html: string;
        //    Type: eRefTypeShow;
        //    Original?: string;
        //    Meaning?: string;
        //    Refs?: Array<iRef>;
        //    Show: KnockoutObservable<boolean> = ko.observable(false);
        //    constructor(html: string, type: eRefTypeShow = eRefTypeShow.None) {
        //        this.Html = html;
        //        this.Type = type;
        //        //switch (this.Type) {
        //        //    case eRefTypeShow.Prophesy:
        //        //        break;
        //        //    case eRefTypeShow.Strongs:
        //        //        break;
        //        //    //case eRefTypeShow.WordMeaning:
        //        //    default: 
        //        //}
        //    }
        //    OpenClose() {
        //        this.Show(!this.Show());
        //    }
        //}
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
