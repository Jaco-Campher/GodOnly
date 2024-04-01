namespace GO {

    export interface iBibleRef {
        BookAbbr: string;
        Chapter: number;
        Verses?: Array<number> | null;
        VersesString: string;
    }

    export const enum BookType {
        OldTestament = 'old',
        Apocrypha = 'apo',
        NewTestament = 'new',
        Other = 'other'
    }

    export const enum Who {
        God,
        Jesus
    }

    export interface iBookNamesArrayDetails {
        Type: BookType
        Abbr: string;
        Title: string;
        Full: string;
        SortOrder: number;
    }

    interface iBookAbbreviations {
        [index: string]: string;
    }

    /**
     * Main bible class.
     */
    export class Bible {

        public books: { [key in string]: Book } = {};
        public BookNamesArray: Array<iBookNamesArrayDetails> = [];

        //Books
        OldTestamentBookNames: Array<iBookNamesArrayDetails> = [];
        ApocryphaBookNames: Array<iBookNamesArrayDetails> = [];
        NewTestamentBookNames: Array<iBookNamesArrayDetails> = [];
        OtherBookNames: Array<iBookNamesArrayDetails> = [];

        BookAbbreviations: iBookAbbreviations = {};

        //LogDetails: boolean = false;

        constructor() {
            
        }
        
        //****************************************************************************
        //#region Load
        //****************************************************************************

        public async LoadBible(bibleFileUrl: string): Promise<void> {
            //go.Logger.LogStart('Func LoadBible');

            let zip: JSZip = new JSZip();
            let bibleZipFileData: Blob = await GO.LoadFileDataArrayBuffer(bibleFileUrl);

            zip = await zip.loadAsync(bibleZipFileData);

            let files: Array<string> = Object.keys(zip.files);

            let promises: Array<Promise<void>> = [];

            for (let relativePath of files) {
                //let bookFile: string = await zip.file(relativePath).async("string");
                promises.push(this.LoadBook(zip, relativePath));
            }

            await Promise.all(promises);

            //zip.forEach(async (path: string, file: JSZipObject) => {
            //    //go.Logger.LogStart('Load Book');
            //    this.LoadBook(await file.async('string'), file.name);
            //    //go.Logger.LogEnd('Load Book');
            //});

            //Sort the books
            this.OldTestamentBookNames.sort((a: iBookNamesArrayDetails, b: iBookNamesArrayDetails): number => {
                return a.SortOrder > b.SortOrder ? 1 : -1;
            });

            this.ApocryphaBookNames.sort((a: iBookNamesArrayDetails, b: iBookNamesArrayDetails): number => {
                return a.SortOrder > b.SortOrder ? 1 : -1;
            });

            this.NewTestamentBookNames.sort((a: iBookNamesArrayDetails, b: iBookNamesArrayDetails): number => {
                return a.SortOrder > b.SortOrder ? 1 : -1;
            });

            this.OtherBookNames.sort((a: iBookNamesArrayDetails, b: iBookNamesArrayDetails): number => {
                return a.SortOrder > b.SortOrder ? 1 : -1;
            });

            //go.Logger.LogEnd('Func LoadBible');
        }

        //private async LoadBook(bookFile: string, fileName: string) {
        private async LoadBook(zip: JSZip, fileName: string) {
            let bookFile: string = await zip.file(fileName).async("string");
            let fileLines: Array<string> = bookFile.split(/\r\n|\n/);

            let book: Book = new Book();
            book.SortOrder = Number(fileName.substr(0, 2));

            let currentChapter: Chapter = new Chapter();
            let currentVerse: Verse | null = null;

            let firstChapterNo: number = 0;
            let chapterNo: number = 0;

            let verseNo: number = 0;

            if (!fileLines[0].startsWith('\\id')) { return; } //Skip the file

            for (let line of fileLines) {
                let lineSplit: Array<string> = line.split(' ', 2);

                switch (lineSplit[0]) {
                    case '\\id': //First line of the file.
                        if (lineSplit[1].trim() == 'FRT') { return } //Skip this file.
                        book.ID = line.split(' ')[1].trim();
                        break;

                    case '\\toc1': //Title
                        book.Title = line.substr(line.indexOf(' ') + 1).trim();
                        break;

                    case '\\toc2': //Name
                        book.Name = line.substr(line.indexOf(' ') + 1).trim();
                        break;

                    case '\\toc3': //Abbr
                        book.Abbr = line.substr(line.indexOf(' ') + 1).trim();  //lineSplit[1].trim();
                        book.Type = this.GetBookType(book.Abbr);

                        //this.LogDetails = book.Abbr == 'Ezk';
                        break;

                    case '\\c': //Chapter number. Start of a new chapter.
                        currentChapter.VerseCount = verseNo;
                        if (chapterNo == 0) { firstChapterNo = Number(lineSplit[1].trim()); }
                        chapterNo = Number(lineSplit[1].trim());
                        currentChapter = new Chapter();
                        verseNo = 0;
                        currentChapter.N = chapterNo;
                        book[chapterNo] = currentChapter;
                        break;

                    case '\\p': //Paragraph break.
                        if (currentVerse != null) { currentVerse.ParagraphBreak = true; }
                        break;

                    case '\\v': //Verse number and text. Start of a new verse.
                        verseNo = Number(lineSplit[1].trim());
                        if (verseNo > currentChapter.VerseCount + 1) {
                            this.PadVerses(currentChapter, verseNo);
                        }

                        currentVerse = new Verse();
                        currentVerse.N = verseNo;
                        currentChapter[verseNo] = currentVerse;
                        currentChapter.VerseCount += 1;
                        this.ProcessVerse(currentChapter[verseNo], line);
                        break;



                    //Not currently used.
                    case '\\ide':   //Encoding
                    case '\\mt1':   //Title
                    case '\\mt2':
                    case '\\ms1':   //Major section heading
                    case '\\ms2':
                    case '\\s1':    //Section heading
                    case '\\s2':
                    case '\\s3':
                    case '\\is1':   //Introduction section heading
                    case '\\is2':
                    case '\\is3':
                    case '\\d':     //Descriptive title
                    case '\\b':     //Poetry
                    case '\\q1':    //Poetry
                    case '\\q2':
                    case '\\q3':

                    case '\\periph':
                    case '\\im':
                    case '\\ip':

                    case '\\iot':   //Introduction outline title.
                    case '\\io1':   //Introduction outline entry.
                    case '\\io2':
                    case '\\io3':
                    //case '\\io4':
                    //case '\\io5':
                    //case '\\io6':
                    //case '\\io7':
                    //case '\\io8':
                    //case '\\io9':
                    case '':
                        break;

                    //Deprecated.
                    case '\\h':
                        break;

                    default:
                        console.log('Not handled', currentChapter.N, lineSplit, line);
                }
            }

            if (firstChapterNo != 0) { book.FirstChapterNo = firstChapterNo; }
            book.ChapterCount = chapterNo;// - firstChapterNo;

            //if (book.Name == "Ezekiel") { console.log(book); ]}
            
            go.Bible.books[book.Abbr.toLowerCase()] = book;

            //Add the book name details to their category.
            let bookNameDetails: iBookNamesArrayDetails = {
                Type: book.Type,
                Title: book.Title,
                Abbr: book.Abbr,
                Full: book.Name,
                SortOrder: book.SortOrder
            }
            go.Bible.BookNamesArray.push(bookNameDetails);
            
            switch (book.Type) {
                case BookType.OldTestament:
                    this.OldTestamentBookNames.push(bookNameDetails);
                    break;

                case BookType.Apocrypha:
                    this.ApocryphaBookNames.push(bookNameDetails);
                    break;

                case BookType.NewTestament:
                    this.NewTestamentBookNames.push(bookNameDetails);
                    break;

                //case BookType.Other:
                default:
                    this.OtherBookNames.push(bookNameDetails);
            }

            this.BookAbbreviations[book.ID.toLowerCase()] = book.Abbr;
            this.BookAbbreviations[book.Name.toLowerCase()] = book.Abbr;
            this.BookAbbreviations[book.Abbr.toLowerCase()] = book.Abbr;
        }

        private PadVerses(currentChapter: Chapter, verseNo: number) {
            for (let i = currentChapter.VerseCount + 1; i < verseNo; i++) {
                let currentVerse = new Verse();
                currentVerse.N = i;
                currentChapter[i] = currentVerse;
                currentChapter.VerseCount += 1;
                currentVerse.Words.push({ Text:'Missing text.', Added: true });
            }
        }

        private ProcessVerse(verse: Verse, verseLine: string) {
            let wordSplit: Array<string> = verseLine.replace('¶ ', '').trim().split(/\\([\w\d\+]+[ *])/);
            let word: Word = { Text: '' };

            //Line 66
            //if (this.LogDetails && verse.N == 5) { console.log('................................', wordSplit); }
            //if (wordSplit[3] == undefined) { console.log(wordSplit); }

            if (verseLine.search(/\\/) == -1) {
                word.Text = wordSplit[2].substr(wordSplit[2].indexOf(' ') + 1).trim();
                verse.Words.push(word);
                return;
            }


            let isYashua: boolean = false;
            let isFootnote: boolean = false;

            if (wordSplit[2].search('  ') == -1) {
                //Exception: Might contain words as part of the vers number.
                word.Text = wordSplit[2].replace(/[0-9]* /, '').trim() + ' ';
                //console.log('wordtext', word.Text)
                if (word.Text != '') { verse.Words.push(word); }
                word = { Text: '' };
            }

            for (let i = 3; i < wordSplit.length; i++) { //Skip the first 3 as it is not part of the verse words.
                switch (wordSplit[i]) {
                    case '+add ':
                    case 'add ':    //Added word start.
                        word = { Text: '', Added: true };
                        break;

                    case 'nd ':     //Name divine start.
                        if (word.Text.endsWith(' ')) { word.Text = word.Text.trimEnd(); } //Remove double spaces.

                        word = { Text: '', DevineName: true };
                        break;

                    case 'w ':      //Wordlist start.
                    case '+w ':
                        word = { Text: '' };
                        break;

                    case '+add*':
                    case 'add*':    //Added words close.
                        word = { Text: '' };
                        break;

                    case 'nd*':     //Name devine end.
                        word = { Text: '' };
                        break;

                    case 'w*':      //Wordlist end.
                    case '+w*':
                        word = { Text: '' };
                        break;


                    case 'wj ':
                        isYashua = true;
                        word = { Text: '' };
                        break;
                    case 'wj*':
                        isYashua = false;
                        break;


                    case 'f ':      //Footnotes strart.
                        isFootnote = true;
                        break;

                    case 'f*':      //Footnotes end.
                        isFootnote = false;

                        //case '+ ':
                        //case 'fr ':
                        //case 'ft ':
                        break;


                    default: //Actual text or data.
                        if (isFootnote) { continue; }

                        let wordAttributes: Array<string> = wordSplit[i].split('|');

                        if (wordAttributes[0] != '') {
                            word.Text = wordAttributes[0];
                            if (isYashua) { word.RedLetter = Who.Jesus; }

                            if (wordAttributes.length = 2) {
                                word.Strongs = this.GetStrongs(wordAttributes[1]);
                            }

                            verse.Words.push(word);
                        }

                    //if (wordAttributes.length == 1) {
                    //    //No attributes seperators, so add the entire verse as is.

                    //}
                    //else {

                    //}
                }


            }
        }

        private GetStrongs(text: string): Array<string> | undefined {
            if (text == undefined) { return undefined; }

            let endIndex: number = text.indexOf('" x-morph');
            if (endIndex == -1) { endIndex = text.length - 1; }

            return text.substring(8, endIndex).split(' ');
        }

        //#endregion

        //****************************************************************************
        //#region Helper Functions
        //****************************************************************************

        private GetBookType(abbr: string): BookType {
            switch (abbr) {
                case 'Gen':
                case 'Exo':
                case 'Lev':
                case 'Num':
                case 'Deu':
                case 'Jos':
                case 'Jdg':
                case 'Rut':
                case '1Sa':
                case '2Sa':
                case '1Ki':
                case '2Ki':
                case '1Ch':
                case '2Ch':
                case 'Ezr':
                case 'Neh':
                case 'Est':
                case 'Job':
                case 'Psa':
                case 'Pro':
                case 'Ecc':
                case 'Sng':
                case 'Isa':
                case 'Jer':
                case 'Lam':
                case 'Ezk':
                case 'Dan':
                case 'Hos':
                case 'Jol':
                case 'Amo':
                case 'Oba':
                case 'Jon':
                case 'Mic':
                case 'Nam':
                case 'Hab':
                case 'Zep':
                case 'Hag':
                case 'Zec':
                case 'Mal':
                    return BookType.OldTestament;

                case 'Tob':
                case 'Jdt':
                case 'EsG':
                case 'Wis':
                case 'Sir':
                case 'Bar':
                case 'S3Y':
                case 'Sus':
                case 'Bel':
                case '1Ma':
                case '2Ma':
                case '1Es':
                case 'Man':
                case '2Es':
                    return BookType.Apocrypha;

                case 'Mat':
                case 'Mrk':
                case 'Luk':
                case 'Jhn':
                case 'Act':
                case 'Rom':
                case '1Co':
                case '2Co':
                case 'Gal':
                case 'Eph':
                case 'Php':
                case 'Col':
                case '1Th':
                case '2Th':
                case '1Ti':
                case '2Ti':
                case 'Tit':
                case 'Phm':
                case 'Heb':
                case 'Jas':
                case '1Pe':
                case '2Pe':
                case '1Jn':
                case '2Jn':
                case '3Jn':
                case 'Jud':
                case 'Rev':
                    return BookType.NewTestament;

                default:
                    return BookType.Other;
            }
        }

        //#endregion



        /**
         * Returns a book of the bible.
         * @param abbr The abbreviation for the book to return.
         */
        public Book(abbr: string): Book {
            //let book: Book | undefined = this.books[abbr.toLowerCase()];
            //return book == undefined ? null : book;

            return this.books[abbr.toLowerCase()];
        }

        public ForEachBook(callbackFn: (book: Book) => any) {
            this.BookNamesArray.forEach((bookDetails: iBookNamesArrayDetails) => {
                callbackFn(this.Book(bookDetails.Abbr) as Book);
            });
        }




        //public IsBetween(sourceAbbr: string, fromAbbr: string, toAbbr: string): boolean {
        //    let sourceNumber: number = this.GetBookNumber(sourceAbbr);

        //    return sourceNumber >= this.GetBookNumber(fromAbbr) && sourceNumber <= this.GetBookNumber(toAbbr);
        //}

        //private GetBookNumber(abbr: string): number {
        //    let count: number = 0;

        //    for (let bookDetails of this.BookNamesArray) {
        //        if (bookDetails.Abbr == abbr) { return count; }
        //        count++;
        //    }

        //    return -1;
        //}

        //****************************************************************************
        //#region References
        //****************************************************************************

        //Rev 1:1
        //Rev 1:1,3
        //Rev 1:3-5
        //Rev 1:3-5,7
        //Rev 1:3-5,7-8
        GetBibleReference(reference: string): iBibleRef | null {
            //console.log('RefString', reference);

            const bibleReferenceRegex: RegExp = /^(\d? ?[a-z\d]{2,30}) ?(\d{1,3})(:((?:\d{1,3}–?-?,?){1,100}))?/g;
            let results: RegExpExecArray | null = bibleReferenceRegex.exec(reference.toLowerCase());

            if (!results || results.length == 0) { return null; } //Not a valid reference.

            //results[1] == Book
            //results[2] == Chapter
            //results[3] == :Verses
            //results[4] == Verses
            
            let bookAbbr: string = this.BookAbbreviations[(results[1] as string).trim()];
            //console.log('111', results, bookAbbr)

            if (bookAbbr == undefined) { return null; }

            return {
                BookAbbr: bookAbbr,
                Chapter: Number(results[2]),
                Verses: results.length > 3 ? GO.Bible.GetVerseNumbers(results[4]) : null,
                VersesString: results[3] == undefined ? '' : results[3]
            }
        }

        /**
         * Change the verses string notation to a number array.
         * @param versesString
         */
        static GetVerseNumbers(versesString: string): Array<number> | null {
            if (!versesString) { return null; }

            let verses: Array<number> = [];
            let sections: Array<string> = versesString.split(',');

            for (let section of sections) {
                if (section.indexOf('-') == -1) {
                    //Normal number.
                    verses.push(Number(section));
                }
                else {
                    //Number range.
                    let range: Array<string> = section.split('-');
                    let startNumber: number = Number(range[0]);
                    let endNumber: number = Number(range[1])

                    for (let count = startNumber; count <= endNumber; count++) {
                        verses.push(count);
                    }
                }
            }

            return verses;
        }

        //#endregion
    }


}