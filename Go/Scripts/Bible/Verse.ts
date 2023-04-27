namespace GO {

    export class Verse {
        /**
         * Verse number.
         */
        public N: number = 0;

        /**
         * Paragraph break.
         */
        public ParagraphBreak?: boolean;

        /**
         * The words of the verse.
         */
        public Words: Array<Word> = new Array();

        /**
         * Returns true if the verse contains the strongs number supplied.
         * @param strongsNo The strongs number to find.
         */
        public ContainsStrongsNo(strongsNo: string): boolean {
            for (let word of this.Words) {
                if (!word.Strongs) { continue; }

                let strongs: Array<string> = Array.isArray(word.Strongs) ? word.Strongs : [word.Strongs]

                for (let strong of strongs) {
                    if (strong == strongsNo) { return true; }
                }
            }

            return false;
        }

        public ForEachWord(callBackFn: (word: Word) => any) {
            for (let word of this.Words) {
                callBackFn(word);
            }
        }

        //public ForEachStrongsNo(callBackFn: (strongsNo: number) => any) {
        //    for (let word of this.W) {
        //        if (!word.S) { continue; }

        //        let strongs: Array<number> = Array.isArray(word.S) ? word.S : [word.S]

        //        for (let strong of strongs) {
        //            callBackFn(strong);
        //        }
        //    }
        //}

        //public ForEachUniqueStrongsNo(callBackFn: (strongsNo: number) => any) {
        //    let strongs: Array<number> = [];

        //    for (let word of this.W) {
        //        if (!word.S) { continue; }

        //        if (Array.isArray(word.S)) {
        //            for (let strong of word.S) {
        //                if (strongs.indexOf(strong) == -1) { strongs.push(strong); }
        //            }
        //        }
        //        else {
        //            if (strongs.indexOf(word.S) == -1) { strongs.push(word.S); }
        //        }
        //    }

        //    for (let strong of strongs) {
        //        callBackFn(strong);
        //    }
        //}


        /**
         * Returns the plain text for the verse.
         */
        public Text(): string {
            let text: string = '';

            for (let i = 0; i < this.Words.length; i++) {
                text += this.Words[i].Text;
            }

            //for (let word of this.Words) {
            //    //let postText: string = (word.PostText == undefined ? ' ' : word.PostText + ' ')
            //    text += word.Text; // + postText;
            //}

            return text;
        }

        public TextCopy(): string {
            let text: string = '';

            for (let word of this.Words) {
                //let postText: string = (word.P == undefined ? ' ' : word.P + ' ')

                if (word.Added) {
                    text += `<i>${word.Text}</i>`; //${word.PostText ? word.PostText : ''} `;
                }
                else {
                    text += word.Text; // `${word.Text}${word.PostText ? word.PostText : ''} `;
                }
            }

            return text;
        }

        //TODO: Show missing words.
        public Html(): string {
            let html: string = '';

            for (let word of this.Words) {
                let wordClasses: string = word.Added ? 'a' : '';

                if (wordClasses == '') {
                    html += word.Text;
                }
                else {
                    html += `<span class="${wordClasses}">${word.Text}</span>`;
                }
            }

            return html;
        }

        public HtmlWithStrongs(boldWords?: Array<string>): string {
            let html: string = '';

            for (let word of this.Words) {
                let wordClasses: string = word.RedLetter != undefined ? 'r' : '';
                wordClasses += word.Added ? ' a' : '';

                let wordString: string = word.Text;

                //if (boldWords != undefined) {
                //    for (let boldWord of boldWords) {
                //        let regex: RegExp = new RegExp(`\\b${boldWord}\\b`, 'g');
                //        wordString = wordString.replace(regex, `<b>${boldWord}</b>`);
                //    }
                //}

                let strongHtml: string = '';

                if (word.Strongs != null) {
                    strongHtml += '<sup>';
                    //let strongs: Array<string> = Array.isArray(word.Strongs) ? word.Strongs : [word.Strongs]

                    for (let i = 0; i < word.Strongs.length; i++) {
                        strongHtml += `<a href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?t=kjv&strongs=${word.Strongs[i]}">${word.Strongs[i]}</a>`;
                        if (word.Strongs.length - 1 != i) { strongHtml += ', '; }
                    }
                    strongHtml += '</sup>';
                }

                if (wordClasses == '') {
                    html += wordString + strongHtml;
                }
                else {
                    html += `<span class="${wordClasses}">${wordString}${strongHtml}</span>`;
                }

                //html += `<span class="${wordClasses}">${wordString}${strongHtml}</span>`;

            }

            return html;
        }

    }

    export interface Word {
        /**
         * True if added and not part of the original.
         */
        Added?: boolean;

        /**
         * True if this is a devine name.
         */
        DevineName?: boolean;

        /**
         * Red Letter
         */
        RedLetter?: Who;

        /**
         * Text: The actual word or words.
         */
        Text: string;
        //DivineName <b>Lord</b>

        /**
         * PostText: Text following the actual word.
         */
        //PostText?: string;

        /**
         * Strongs greek or hebrew number.
         */
        Strongs?: Array<string>;// | string;
    }

}