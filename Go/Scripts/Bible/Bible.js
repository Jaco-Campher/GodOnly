var GO;
(function (GO) {
    /**
     * Main bible class.
     */
    class Bible {
        //LogDetails: boolean = false;
        constructor() {
            this.books = {};
            this.BookNamesArray = [];
            //Books
            this.OldTestamentBookNames = [];
            this.ApocryphaBookNames = [];
            this.NewTestamentBookNames = [];
            this.OtherBookNames = [];
            this.BookAbbreviations = {};
        }
        //****************************************************************************
        //#region Load
        //****************************************************************************
        async LoadBible(bibleFileUrl) {
            //go.Logger.LogStart('Func LoadBible');
            let zip = new JSZip();
            let bibleZipFileData = await GO.LoadFileDataArrayBuffer(bibleFileUrl);
            zip = await zip.loadAsync(bibleZipFileData);
            let files = Object.keys(zip.files);
            let promises = [];
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
            this.OldTestamentBookNames.sort((a, b) => {
                return a.SortOrder > b.SortOrder ? 1 : -1;
            });
            this.ApocryphaBookNames.sort((a, b) => {
                return a.SortOrder > b.SortOrder ? 1 : -1;
            });
            this.NewTestamentBookNames.sort((a, b) => {
                return a.SortOrder > b.SortOrder ? 1 : -1;
            });
            this.OtherBookNames.sort((a, b) => {
                return a.SortOrder > b.SortOrder ? 1 : -1;
            });
            //go.Logger.LogEnd('Func LoadBible');
        }
        //private async LoadBook(bookFile: string, fileName: string) {
        async LoadBook(zip, fileName) {
            let bookFile = await zip.file(fileName).async("string");
            let fileLines = bookFile.split(/\r\n|\n/);
            let book = new GO.Book();
            book.SortOrder = Number(fileName.substr(0, 2));
            let currentChapter = new GO.Chapter();
            let currentVerse = null;
            let firstChapterNo = 0;
            let chapterNo = 0;
            let verseNo = 0;
            if (!fileLines[0].startsWith('\\id')) {
                return;
            } //Skip the file
            for (let line of fileLines) {
                let lineSplit = line.split(' ', 2);
                switch (lineSplit[0]) {
                    case '\\id': //First line of the file.
                        if (lineSplit[1].trim() == 'FRT') {
                            return;
                        } //Skip this file.
                        book.ID = line.split(' ')[1].trim();
                        break;
                    case '\\toc1': //Title
                        book.Title = line.substr(line.indexOf(' ') + 1).trim();
                        break;
                    case '\\toc2': //Name
                        book.Name = line.substr(line.indexOf(' ') + 1).trim();
                        break;
                    case '\\toc3': //Abbr
                        book.Abbr = line.substr(line.indexOf(' ') + 1).trim(); //lineSplit[1].trim();
                        book.Type = this.GetBookType(book.Abbr);
                        //this.LogDetails = book.Abbr == 'Ezk';
                        break;
                    case '\\c': //Chapter number. Start of a new chapter.
                        currentChapter.VerseCount = verseNo;
                        if (chapterNo == 0) {
                            firstChapterNo = Number(lineSplit[1].trim());
                        }
                        chapterNo = Number(lineSplit[1].trim());
                        currentChapter = new GO.Chapter();
                        verseNo = 0;
                        currentChapter.N = chapterNo;
                        book[chapterNo] = currentChapter;
                        break;
                    case '\\p': //Paragraph break.
                        if (currentVerse != null) {
                            currentVerse.ParagraphBreak = true;
                        }
                        break;
                    case '\\v': //Verse number and text. Start of a new verse.
                        verseNo = Number(lineSplit[1].trim());
                        if (verseNo > currentChapter.VerseCount + 1) {
                            this.PadVerses(currentChapter, verseNo);
                        }
                        currentVerse = new GO.Verse();
                        currentVerse.N = verseNo;
                        currentChapter[verseNo] = currentVerse;
                        currentChapter.VerseCount += 1;
                        this.ProcessVerse(currentChapter[verseNo], line);
                        break;
                    //Not currently used.
                    case '\\ide': //Encoding
                    case '\\mt1': //Title
                    case '\\mt2':
                    case '\\ms1': //Major section heading
                    case '\\ms2':
                    case '\\s1': //Section heading
                    case '\\s2':
                    case '\\s3':
                    case '\\is1': //Introduction section heading
                    case '\\is2':
                    case '\\is3':
                    case '\\d': //Descriptive title
                    case '\\b': //Poetry
                    case '\\q1': //Poetry
                    case '\\q2':
                    case '\\q3':
                    case '\\periph':
                    case '\\im':
                    case '\\ip':
                    case '\\iot': //Introduction outline title.
                    case '\\io1': //Introduction outline entry.
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
            if (firstChapterNo != 0) {
                book.FirstChapterNo = firstChapterNo;
            }
            book.ChapterCount = chapterNo; // - firstChapterNo;
            //if (book.Name == "Ezekiel") { console.log(book); ]}
            go.Bible.books[book.Abbr.toLowerCase()] = book;
            //Add the book name details to their category.
            let bookNameDetails = {
                Type: book.Type,
                Title: book.Title,
                Abbr: book.Abbr,
                Full: book.Name,
                SortOrder: book.SortOrder
            };
            go.Bible.BookNamesArray.push(bookNameDetails);
            switch (book.Type) {
                case "old" /* BookType.OldTestament */:
                    this.OldTestamentBookNames.push(bookNameDetails);
                    break;
                case "apo" /* BookType.Apocrypha */:
                    this.ApocryphaBookNames.push(bookNameDetails);
                    break;
                case "new" /* BookType.NewTestament */:
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
        PadVerses(currentChapter, verseNo) {
            for (let i = currentChapter.VerseCount + 1; i < verseNo; i++) {
                let currentVerse = new GO.Verse();
                currentVerse.N = i;
                currentChapter[i] = currentVerse;
                currentChapter.VerseCount += 1;
                currentVerse.Words.push({ Text: 'Missing text.', Added: true });
            }
        }
        ProcessVerse(verse, verseLine) {
            let wordSplit = verseLine.replace('¶ ', '').trim().split(/\\([\w\d\+]+[ *])/);
            let word = { Text: '' };
            //Line 66
            //if (this.LogDetails && verse.N == 5) { console.log('................................', wordSplit); }
            //if (wordSplit[3] == undefined) { console.log(wordSplit); }
            if (verseLine.search(/\\/) == -1) {
                word.Text = wordSplit[2].substr(wordSplit[2].indexOf(' ') + 1).trim();
                verse.Words.push(word);
                return;
            }
            let isYashua = false;
            let isFootnote = false;
            if (wordSplit[2].search('  ') == -1) {
                //Exception: Might contain words as part of the vers number.
                word.Text = wordSplit[2].replace(/[0-9]* /, '').trim() + ' ';
                //console.log('wordtext', word.Text)
                if (word.Text != '') {
                    verse.Words.push(word);
                }
                word = { Text: '' };
            }
            for (let i = 3; i < wordSplit.length; i++) { //Skip the first 3 as it is not part of the verse words.
                switch (wordSplit[i]) {
                    case '+add ':
                    case 'add ': //Added word start.
                        word = { Text: '', Added: true };
                        break;
                    case 'nd ': //Name divine start.
                        if (word.Text.endsWith(' ')) {
                            word.Text = word.Text.trimEnd();
                        } //Remove double spaces.
                        word = { Text: '', DevineName: true };
                        break;
                    case 'w ': //Wordlist start.
                    case '+w ':
                        word = { Text: '' };
                        break;
                    case '+add*':
                    case 'add*': //Added words close.
                        word = { Text: '' };
                        break;
                    case 'nd*': //Name devine end.
                        word = { Text: '' };
                        break;
                    case 'w*': //Wordlist end.
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
                    case 'f ': //Footnotes strart.
                        isFootnote = true;
                        break;
                    case 'f*': //Footnotes end.
                        isFootnote = false;
                        //case '+ ':
                        //case 'fr ':
                        //case 'ft ':
                        break;
                    default: //Actual text or data.
                        if (isFootnote) {
                            continue;
                        }
                        let wordAttributes = wordSplit[i].split('|');
                        if (wordAttributes[0] != '') {
                            word.Text = wordAttributes[0];
                            if (isYashua) {
                                word.RedLetter = 1 /* Who.Jesus */;
                            }
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
        GetStrongs(text) {
            if (text == undefined) {
                return undefined;
            }
            let endIndex = text.indexOf('" x-morph');
            if (endIndex == -1) {
                endIndex = text.length - 1;
            }
            return text.substring(8, endIndex).split(' ');
        }
        //#endregion
        //****************************************************************************
        //#region Helper Functions
        //****************************************************************************
        GetBookType(abbr) {
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
                    return "old" /* BookType.OldTestament */;
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
                    return "apo" /* BookType.Apocrypha */;
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
                    return "new" /* BookType.NewTestament */;
                default:
                    return "other" /* BookType.Other */;
            }
        }
        //#endregion
        /**
         * Returns a book of the bible.
         * @param abbr The abbreviation for the book to return.
         */
        Book(abbr) {
            //let book: Book | undefined = this.books[abbr.toLowerCase()];
            //return book == undefined ? null : book;
            return this.books[abbr.toLowerCase()];
        }
        ForEachBook(callbackFn) {
            this.BookNamesArray.forEach((bookDetails) => {
                callbackFn(this.Book(bookDetails.Abbr));
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
        GetBibleReference(reference) {
            //console.log('RefString', reference);
            const bibleReferenceRegex = /^(\d? ?[a-z\d]{2,30}) ?(\d{1,3})(:((?:\d{1,3}–?-?,?){1,100}))?/g;
            let results = bibleReferenceRegex.exec(reference.toLowerCase());
            if (!results || results.length == 0) {
                return null;
            } //Not a valid reference.
            //results[1] == Book
            //results[2] == Chapter
            //results[3] == :Verses
            //results[4] == Verses
            let bookAbbr = this.BookAbbreviations[results[1].trim()];
            //console.log('111', results, bookAbbr)
            if (bookAbbr == undefined) {
                return null;
            }
            return {
                BookAbbr: bookAbbr,
                Chapter: Number(results[2]),
                Verses: results.length > 3 ? GO.Bible.GetVerseNumbers(results[4]) : null,
                VersesString: results[3] == undefined ? '' : results[3]
            };
        }
        /**
         * Change the verses string notation to a number array.
         * @param versesString
         */
        static GetVerseNumbers(versesString) {
            if (!versesString) {
                return null;
            }
            let verses = [];
            let sections = versesString.split(',');
            for (let section of sections) {
                if (section.indexOf('-') == -1) {
                    //Normal number.
                    verses.push(Number(section));
                }
                else {
                    //Number range.
                    let range = section.split('-');
                    let startNumber = Number(range[0]);
                    let endNumber = Number(range[1]);
                    for (let count = startNumber; count <= endNumber; count++) {
                        verses.push(count);
                    }
                }
            }
            return verses;
        }
    }
    GO.Bible = Bible;
})(GO || (GO = {}));
