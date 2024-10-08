﻿namespace GO.Compnents {

    type tVersesDisplayMode = 'All' | 'Context' | 'SelectedOnly';

    interface iBibleRefParams {
        Html?: KnockoutObservable<string>;
        Ref: KnockoutObservable<string> | string;
        Bold?: Array<iRefBold>;
        Strongs?: Array<iRefStrong>;
        Show: KnockoutObservable<eRefTypeShow>; //Can be 'eRefTypeShow' only.

        Data: iBibleRefParams; //Used to pass Ref data from the go-refs component as you cannot pass it directly to params.
    }

    export class BibleRefViewModel {
        Verses: KnockoutObservableArray<VerseHolder> = ko.observableArray<VerseHolder>([]);
        RefString: KnockoutObservable<string> = ko.observable();
        RefDisplay: KnockoutObservable<string> = ko.observable('');
        AllStrongs: KnockoutObservable<boolean> = ko.observable(false);
        BookType: KnockoutObservable<string> = ko.observable<string>('');

        Bold: Array<iRefBold> = [];
        BoldOffset: number = 0; //The index to process from.

        Strongs: Array<iRefStrong> = [];
        StrongsObject: iStrongsJson = {};
        StrongsManual: boolean = false;

        FullChapter: KnockoutObservable<boolean> = ko.observable(false); //Set to true to hide the context controls.
        DisplayContext: KnockoutObservable<tVersesDisplayMode> = ko.observable<tVersesDisplayMode>('SelectedOnly');

        constructor(private params: iBibleRefParams, componentInfo: KnockoutComponentTypes.ComponentInfo) {
            if (params.Data != undefined) { params = params.Data; }
            if (params.Bold != undefined) { this.Bold = params.Bold; }

            if (params.Show == undefined) {
                params.Show = ko.observable<eRefTypeShow>(eRefTypeShow.None);
            } else if (!ko.isObservable(params.Show)) {
                params.Show = ko.observable<eRefTypeShow>((params.Show as unknown) as eRefTypeShow);
            } else {
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

            this.RefString = ko.isObservable(params.Ref) ? params.Ref : ko.observable(params.Ref as string);
            this.LoadVerses();
            this.RefString.subscribe(this.LoadVerses);
        }

        TemplateType = (section: Section): string => {
            return `T${section.Type}`;
        }

        //****************************************************************************
        //#region Load
        //****************************************************************************

        LoadVerses = () => {
            let ref: iBibleRef | null = go.Bible.GetBibleReference(this.RefString().trim());
            //console.log('ref', ref);
            if (ref == null) { this.AddNotFound(); return; } //Not a valid reference.

            let book: Book = go.Bible.Book(ref.BookAbbr);
            if (book == null) { this.AddNotFound(); return; } //Not a valid reference.

            this.BookType(book.Type.toString());

            let chapter: Chapter = book[ref.Chapter];
            let newVerses: Array<VerseHolder> = [];

            this.BoldOffset = 0;

            //console.log('ref', ref);
            //console.log('book', book);
            //console.log('chapter', chapter);

            if (ref.Verses) {
                //Show selected verses.
                if (this.DisplayContext() != 'SelectedOnly' && ref.Verses[0] != 1) {
                    let first: number = this.DisplayContext() == 'All' ? 1 : ref.Verses[0] - 3;
                    if (first < 1) { first = 1; }

                    for (let verseNo = first; verseNo < ref.Verses[0]; verseNo++) {
                        newVerses.push(this.AddBasicOrStrongs(chapter[verseNo], true, false));
                    }
                }

                for (let verseNo of ref.Verses) {
                    newVerses.push(this.AddBasicOrStrongs(chapter[verseNo], false, true));
                }

                if (this.DisplayContext() != 'SelectedOnly') {
                    let first: number = ref.Verses[ref.Verses.length - 1] + 1;
                    if (first < chapter.VerseCount) {
                        let last: number = this.DisplayContext() == 'All' ? chapter.VerseCount : first + 3;
                        if (last > chapter.VerseCount) { last = chapter.VerseCount; }

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
        }

        SetDisplayContext = (displayContext: tVersesDisplayMode) => {
            this.DisplayContext(displayContext);
            this.LoadVerses();
        }

        ToggleAllStrongs = () => {
            this.AllStrongs(!this.AllStrongs());
            this.LoadVerses();
        }

        //#endregion

        //****************************************************************************
        //#region Legend Functions
        //****************************************************************************

        AddRefShow(verses: Array<VerseHolder>, show: eRefTypeShow) {
            //if (show & eRefTypeShow.Prophesy) { verses = this.AddVerseLegend(verses); }

            for (let verseHolder of verses) {
                if (show & eRefTypeShow.Prophesy) {
                    verseHolder.Sections(go.AddLegend(verseHolder.Sections(), go.LegendsObject, eRefTypeShow.Prophesy));
                }
                if (show & eRefTypeShow.NamesPlaces) {
                    verseHolder.Sections(go.AddLegend(verseHolder.Sections(), go.NamesPlacesObject, eRefTypeShow.NamesPlaces));
                }
            }

            this.Verses(verses);
        }

        //********************************
        //#region Basic Functions

        AddNotFound = () => {
            let verseHolder: VerseHolder = new VerseHolder()
            verseHolder.Sections.push(new Section('Not Found', eRefTypeShow.None));

            this.RefDisplay(this.RefString().trim());

            this.Verses([verseHolder]);
        }

        //#endregion

        //********************************
        //#region Strongs Functions

        AddBasicOrStrongs(verse: Verse, dim: boolean, useBold: boolean ): VerseHolder {
            let verseHolder: VerseHolder = new VerseHolder(dim)
            if (verse == undefined) { return verseHolder; }

            verseHolder.VerseNo(`${verse.N}.`);

            let strongLegend!: GO.iStrong;
            let html: string = '';

            for (let word of verse.Words) {
                //console.log(word);
                let wordText: string = word.Text;
                let wordClasses: string = word.Added ? 'a' : '';
                let strongNo: string = '';
                let strongMeaning: string = '?';


                ////Check for words to make bold if needed.
                if (useBold && this.Bold.length > 0) {
                    let boldOutput: iRefBoldOutput = go.AddBoldAtIndex(wordText, this.Bold, this.BoldOffset);
                    this.BoldOffset = boldOutput.Offset;
                    wordText = boldOutput.Html;
                }


                if (word.Strongs != null) { //Check for Strongs processing if there are Strongs
                    if (this.StrongsManual || this.params.Show() & eRefTypeShow.Strongs) {
                        for (let i = 0; i < word.Strongs.length; i++) {
                            strongLegend = this.StrongsObject[word.Strongs[i]];
                            if (strongLegend == undefined) { continue; }

                            strongNo += word.Strongs[i];
                            strongMeaning = go.GetMeaning(strongLegend, wordText);
                            break;
                        }
                    }

                    if (strongMeaning == '?') {
                        if (this.params.Show() & eRefTypeShow.AllStrongs || this.AllStrongs()) {
                            for (let strong of word.Strongs) {
                                strongNo += strong;
                                wordText += `<sup><a href="https://www.blueletterbible.org/lexicon/${strong}/kjv" target="blank">${strong}</a> </sup>`
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
                            verseHolder.Sections.push(new Section(html, eRefTypeShow.None));
                            html = '';
                        } 

                        let section: Section = new Section(strongNo, eRefTypeShow.Strongs);
                        section.Original = wordText;
                        section.Meaning = strongMeaning
                        verseHolder.Sections.push(section);
                    }
                }
            }

            if (html != '') { verseHolder.Sections.push(new Section(html, eRefTypeShow.None)); }

            return verseHolder;
        }

        //#endregion

        //********************************
        //#region Legend Functions

        //AddVerseLegend(inputVerses: Array<VerseHolder>): Array<VerseHolder> {

        //    for (let verseHolder of inputVerses) {

        //        verseHolder.Sections(go.AddLegend(verseHolder.Sections(), go.LegendsObject, eRefTypeShow.Prophesy));
        //        verseHolder.Sections(go.AddLegend(verseHolder.Sections(), go.NamesPlacesObject, eRefTypeShow.NamesPlaces));

        //        //for (let legendName in go.LegendsObject) {
        //        //    let newSections: Array<Section> = [];

        //        //    for (let inputSection of verseHolder.Sections()) {
        //        //        if (inputSection.Type != eRefTypeShow.None) {
        //        //            newSections.push(inputSection);
        //        //            continue;
        //        //        }

        //        //        let reg: RegExp = new RegExp(`(?<=\\W)(${legendName})(?=\\W)`, 'gi');
        //        //        let htmlSections: Array<string> = inputSection.Html.split(reg);

        //        //        if (htmlSections.length == 1) {
        //        //            newSections.push(inputSection);
        //        //            continue;
        //        //        }

        //        //        for (let htmlSection of htmlSections) {
        //        //            if (htmlSection.toLowerCase() != legendName.toLowerCase()) {
        //        //                newSections.push(new Section(htmlSection));
        //        //                continue;
        //        //            }

        //        //            let legend: GO.iLegend = go.LegendsObject[legendName];

        //        //            let section: Section = new Section('', eRefTypeShow.Prophesy);
        //        //            section.Original = htmlSection;
        //        //            if (legend.Case) {
        //        //                section.Meaning = legend.Meaning;
        //        //            }
        //        //            else {
        //        //                section.Meaning = htmlSection == htmlSection.toLowerCase() ? legend.Meaning.toLowerCase() : legend.Meaning;
        //        //            }
        //        //            section.Refs = legend.Lookup == undefined ? legend.Refs : go.LegendsObject[legend.Lookup].Refs;
        //        //            newSections.push(section);
        //        //        }

        //        //    }

        //        //    verseHolder.Sections(newSections);
        //        //}
        //    }

        //    return inputVerses;
        //}

        //#endregion

        //#endregion

    }

    class VerseHolder {
        VerseNo: KnockoutObservable<string> = ko.observable();
        Sections: KnockoutObservableArray<Section> = ko.observableArray<Section>([]);

        Dim: boolean; //True if this verse is used to show context only and is not part of the actual reference.

        constructor(dim: boolean = false) {
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

}