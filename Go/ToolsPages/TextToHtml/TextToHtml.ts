namespace GO.Tools {

    export class TextToHtmlViewModel {

        Output: KnockoutObservable<string> = ko.observable('USFM Verses Only');

        Book: KnockoutObservable<string> = ko.observable('');
        Chapter: KnockoutObservable<string> = ko.observable('');
        Text: KnockoutObservable<string> = ko.observable('');

        OutputText1: KnockoutObservable<string> = ko.observable('');
        OutputText2: KnockoutObservable<string> = ko.observable('');

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {

        }

        Parse = () => {
            switch (this.Output()) {
                case 'Html':
                    this.ParseHtml();
                    break;

                case 'USFM':
                    this.ParseUSFM();
                    break

                case 'USFM Verses Only':
                    this.ParseUSFMVersesOnly();
                    break;

                default:
            }
        }

        FindFromTo = () => {
            let find: string = window!.getSelection()!.toString().trim();
            console.log('find', find, find.length);
            console.log('text', this.Text());
            let index: number = this.Text().replace(/(\n|\r)/g, '').replace(/[0-9]{1,3}\./g, '').indexOf(find);
            console.log('index', index);
            if (index == -1) {
                this.OutputText1('Not Found');
                return;
            }

            //let firstPart: string = this.Text().substring(0, index);

            //let from: number = firstPart.split(' ').length;
            //let to: number = (find.split(' ').length + from) - 1;
            let to: number = index + find.length - 1;

            this.OutputText1(`${this.OutputText1()}, {From:${index}, To:${to}}`);
            this.OutputText2(`${this.OutputText2()}, {"From":${index}, "To":${to}}`);
        }

        ClearFromTo = () => {
            this.OutputText1('');
            this.OutputText2('');
        }

        //*************************************************************
        //#region  Parse Html
        //*************************************************************

        ParseHtml = () => {
            let input: string = this.Text().replace(/(?:\r\n|\r|\n)/g, ' ');
            let verses: Array<string> = input.split(/(\d{1,5})\.?/g); ///\d{0,3}\.(\d{1,5})/g

            let verseNo: number = 1;

            let text: string = '<table>';

            for (let verse of verses) {
                if (!isNaN(Number(verse))) {
                    verseNo = Number(verse);
                    continue;
                }

                text += `<tr><td style="background: #BFBFBF;">${this.Book()} ${this.Chapter()}:${verseNo}</td></tr>`;

                const splitRegex: RegExp = /(?<=[\.,:;!\?])/gmi;
                let splitResultsPost: Array<string> = verse.trim().split(splitRegex);
                let splitResults: Array<string> = [];

                for (let section of splitResultsPost) {
                    section = section.trim();

                    if (section == '' || section == ' ') { continue; }
                    

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

            text += '</table>'

            this.CopyToClipboard(text);
        }

        //#endregion


        //*************************************************************
        //#region  Parse USFM
        //*************************************************************

        ParseUSFM = () => {
            let input: string = this.Text().replace(/(?:\r\n|\r|\n)/g, ' ');

            let chapters: Array<string> = input.trim().split(/CHAPTER (\d{1,3})/g); // /(\d{1,3}) 1/g
            console.log('chapters', chapters);

            let text: string = '';

            let chapterNo: number = 1;

            for (let chapter of chapters) {
                if (chapter == '') { continue; }

                if (!isNaN(Number(chapter))) {
                    chapterNo = Number(chapter);
                    continue;
                }

                let verses: Array<string> = chapter.replace(/\s+/g, ' ').trim().split(/(\d{1,5})\.?/g); ///\d{0,3}\.(\d{1,5})/g
                let verseNo: number = 1;
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
        }

        ParseUSFMVersesOnly = () => {
            let input: string = this.Text().replace(/(?:\r\n|\r|\n)/g, ' ');

            let text: string = '';

            let verses: Array<string> = input.replace(/\s+/g, ' ').trim().split(/(\d{1,3} )/g); ///(\d{1,5})\.?/g
            let verseNo: number = 1;
            text += `\\c ${this.Chapter()}
`;
            //console.log(verses);

            for (let verse of verses) {
                if (!isNaN(Number(verse))) {
                    verseNo = Number(verse);
                    continue;
                }

                let ver: string = verse.trim();

                ver = ver.replace(/“/g, '"').replace(/”/g, '"').replace(/‘/g, "'").replace(/’/g, "'");

                //Enoch
                //() Indicated added words.
                ver = ver.replace(/\(/g, '\\add (').replace(/\)/g, ')\\add*')

                //[] Indicated added words.
                //ver = ver.replace(/\[/g, '\\add [').replace(/\]/g, ']\\add*')


                text += `\\v ${verseNo} ${ver}
`;
            }

            this.CopyToClipboard(text);
        }

        //#endregion


        CopyToClipboard(str: string) {
            function listener(e: any) {
                e.clipboardData.setData("text/html", str);
                e.clipboardData.setData("text/plain", str);
                e.preventDefault();
            }
            document.addEventListener("copy", listener);
            document.execCommand("copy");
            document.removeEventListener("copy", listener);
        };

    }
}