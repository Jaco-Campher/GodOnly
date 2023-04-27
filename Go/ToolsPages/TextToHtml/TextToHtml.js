var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        class TextToHtmlViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Output = ko.observable('USFM');
                this.Book = ko.observable('');
                this.Chapter = ko.observable('');
                this.Text = ko.observable('');
                this.OutputText1 = ko.observable('');
                this.OutputText2 = ko.observable('');
                this.Parse = () => {
                    switch (this.Output()) {
                        case 'Html':
                            this.ParseHtml();
                            break;
                        case 'USFM':
                            this.ParseUSFM();
                            break;
                        case 'USFM Verses Only':
                            this.ParseUSFMVersesOnly();
                            break;
                        default:
                    }
                };
                this.FindFromTo = () => {
                    let find = window.getSelection().toString().trim();
                    console.log('find', find, find.length);
                    console.log('text', this.Text());
                    let index = this.Text().replace(/(\n|\r)/g, '').replace(/[0-9]{1,3}\./g, '').indexOf(find);
                    console.log('index', index);
                    if (index == -1) {
                        this.OutputText1('Not Found');
                        return;
                    }
                    //let firstPart: string = this.Text().substring(0, index);
                    //let from: number = firstPart.split(' ').length;
                    //let to: number = (find.split(' ').length + from) - 1;
                    let to = index + find.length - 1;
                    this.OutputText1(`${this.OutputText1()}, {From:${index}, To:${to}}`);
                    this.OutputText2(`${this.OutputText2()}, {"From":${index}, "To":${to}}`);
                };
                this.ClearFromTo = () => {
                    this.OutputText1('');
                    this.OutputText2('');
                };
                //*************************************************************
                //#region  Parse Html
                //*************************************************************
                this.ParseHtml = () => {
                    let input = this.Text().replace(/(?:\r\n|\r|\n)/g, ' ');
                    let verses = input.split(/(\d{1,5})\.?/g); ///\d{0,3}\.(\d{1,5})/g
                    let verseNo = 1;
                    let text = '<table>';
                    for (let verse of verses) {
                        if (!isNaN(Number(verse))) {
                            verseNo = Number(verse);
                            continue;
                        }
                        text += `<tr><td style="background: #BFBFBF;">${this.Book()} ${this.Chapter()}:${verseNo}</td></tr>`;
                        const splitRegex = /(?<=[\.,:;!\?])/gmi;
                        let splitResultsPost = verse.trim().split(splitRegex);
                        let splitResults = [];
                        for (let section of splitResultsPost) {
                            section = section.trim();
                            if (section == '' || section == ' ') {
                                continue;
                            }
                            if (section.split(' ').length > 3) {
                                splitResults.push(section);
                            }
                            else {
                                if (splitResults.length > 0) {
                                    splitResults[splitResults.length - 1] = splitResults[splitResults.length - 1] + ' ' + section;
                                }
                                else {
                                    splitResults.push(section);
                                }
                            }
                        }
                        for (let section of splitResults) {
                            text += `<tr><td>${section.replace('  ', ' ')}</td></tr>`;
                        }
                    }
                    text += '</table>';
                    this.CopyToClipboard(text);
                };
                //#endregion
                //*************************************************************
                //#region  Parse USFM
                //*************************************************************
                this.ParseUSFM = () => {
                    let input = this.Text().replace(/(?:\r\n|\r|\n)/g, ' ');
                    let chapters = input.trim().split(/CHAPTER (\d{1,3})/g); // /(\d{1,3}) 1/g
                    console.log('chapters', chapters);
                    let text = '';
                    let chapterNo = 1;
                    for (let chapter of chapters) {
                        if (chapter == '') {
                            continue;
                        }
                        if (!isNaN(Number(chapter))) {
                            chapterNo = Number(chapter);
                            continue;
                        }
                        let verses = chapter.replace(/\s+/g, ' ').trim().split(/(\d{1,5})\.?/g); ///\d{0,3}\.(\d{1,5})/g
                        let verseNo = 1;
                        text += `\\c ${chapterNo}
`;
                        console.log(verses);
                        for (let verse of verses) {
                            if (!isNaN(Number(verse))) {
                                verseNo = Number(verse);
                                continue;
                            }
                            text += `\\v ${verseNo} ${verse.trim()}
`;
                        }
                    }
                    this.CopyToClipboard(text);
                };
                this.ParseUSFMVersesOnly = () => {
                    let input = this.Text().replace(/(?:\r\n|\r|\n)/g, ' ');
                    let text = '';
                    let verses = input.replace(/\s+/g, ' ').trim().split(/(\d{1,5})\./g); ///(\d{1,5})\.?/g
                    let verseNo = 1;
                    text += `\\c ${this.Chapter()}
`;
                    //console.log(verses);
                    for (let verse of verses) {
                        if (!isNaN(Number(verse))) {
                            verseNo = Number(verse);
                            continue;
                        }
                        let ver = verse.trim();
                        //Enoch
                        //() Indicated added words.
                        ver = ver.replace(/\(/g, '\\add (').replace(/\)/g, ')\\add*');
                        text += `\\v ${verseNo} ${ver}
`;
                    }
                    this.CopyToClipboard(text);
                };
            }
            //#endregion
            CopyToClipboard(str) {
                function listener(e) {
                    e.clipboardData.setData("text/html", str);
                    e.clipboardData.setData("text/plain", str);
                    e.preventDefault();
                }
                document.addEventListener("copy", listener);
                document.execCommand("copy");
                document.removeEventListener("copy", listener);
            }
            ;
        }
        Tools.TextToHtmlViewModel = TextToHtmlViewModel;
    })(Tools = GO.Tools || (GO.Tools = {}));
})(GO || (GO = {}));
