namespace GO {

    export class Book {
        [index: number]: Chapter;

        ChapterCount: number = 0;
        FirstChapterNo: number = 1; //Used for books that do not start at chapter 1 like EsG.
        ID: string = '';      //id
        Title: string = '';   //toc1
        Name: string = '';    //toc2
        Abbr: string = '';    //toc3
        Type: GO.BookType = GO.BookType.Other;
        SortOrder: number = 0;

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {


        }

        public ForEachChapter(callBackFn: (chapter: Chapter, no: number) => any) {
            let lastChapterNo: number = this.ChapterCount + this.FirstChapterNo

            for (let i = this.FirstChapterNo; i <= lastChapterNo; i++) {
                callBackFn(this[i], i);
            }
        }

    }

}