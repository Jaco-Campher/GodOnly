namespace GO {

    export class Chapter {
        [index: number]: Verse;

        N: number = 0;
        VerseCount: number = 0;

        public ForEachVerse(callBackFn: (verse: Verse, no: number) => any) {
            for (let i = 1; i <= this.VerseCount; i++) {
                callBackFn(this[i], i);
            }
        }
    }

}