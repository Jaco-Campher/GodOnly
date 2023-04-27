var GO;
(function (GO) {
    class Chapter {
        constructor() {
            this.N = 0;
            this.VerseCount = 0;
        }
        ForEachVerse(callBackFn) {
            for (let i = 1; i <= this.VerseCount; i++) {
                callBackFn(this[i], i);
            }
        }
    }
    GO.Chapter = Chapter;
})(GO || (GO = {}));
