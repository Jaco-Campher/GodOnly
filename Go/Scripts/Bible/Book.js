"use strict";
var GO;
(function (GO) {
    class Book {
        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.ChapterCount = 0;
            this.FirstChapterNo = 1; //Used for books that do not start at chapter 1 like EsG.
            this.ID = ''; //id
            this.Title = ''; //toc1
            this.Name = ''; //toc2
            this.Abbr = ''; //toc3
            this.Type = "other" /* GO.BookType.Other */;
            this.SortOrder = 0;
        }
        ForEachChapter(callBackFn) {
            let lastChapterNo = this.ChapterCount + this.FirstChapterNo;
            for (let i = this.FirstChapterNo; i <= lastChapterNo; i++) {
                callBackFn(this[i], i);
            }
        }
    }
    GO.Book = Book;
})(GO || (GO = {}));
