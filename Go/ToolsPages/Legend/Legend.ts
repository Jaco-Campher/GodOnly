namespace GO.Tools {


    export class Paging<TI extends PageItem> {
        PageSize: KnockoutObservable<number> = ko.observable(20);
        CurrentPageIndex: KnockoutObservable<number> = ko.observable(0);

        Items: KnockoutObservableArray<TI> = ko.observableArray<TI>([]);
        Pages: KnockoutObservableArray<PageButton> = ko.observableArray<PageButton>([]);

        CurrentItems: KnockoutComputed<Array<TI>> = ko.computed((): Array<TI> => {
            let maxPageIndex: number = Math.ceil(ko.unwrap(this.Items).length / this.PageSize()) - 1;

            if (this.CurrentPageIndex() > maxPageIndex) { this.CurrentPageIndex(0); }
            let startIndex: number = this.PageSize() * this.CurrentPageIndex();

            return ko.unwrap<Array<TI>>(this.Items).slice(startIndex, startIndex + Number(this.PageSize()));
        }, this);


        PrevPage = () => {
            if (this.CurrentPageIndex() == 0) { return; } //Already on the first page.
            this.CurrentPageIndex(this.CurrentPageIndex() - 1);

            GO.ScrollToTop();
        }

        NextPage = () => {
            let maxPageIndex: number = Math.ceil(ko.unwrap(this.Items).length / this.PageSize()) - 1;

            if (this.CurrentPageIndex() == maxPageIndex) { return; } //Already on the last page.
            this.CurrentPageIndex(this.CurrentPageIndex() + 1);

            GO.ScrollToTop();
        }

        UpdatePageIndex = (index: number) => {
            this.CurrentPageIndex(index);

            GO.ScrollToTop();
        }

        UpdatePageNames = () => {
            let pageButtons: Array<PageButton> = [];

            let maxPageIndex: number = Math.ceil(ko.unwrap(this.Items).length / this.PageSize()) - 1;

            for (let pageIndex = 0; pageIndex <= maxPageIndex; pageIndex++) {
                let first: number = pageIndex * this.PageSize();
                let last: number = (first + this.PageSize()) - 1;

                if (last >= this.Items().length) { last = this.Items().length - 1 }

                pageButtons.push(new PageButton(`${this.Items()[first].PageTitle} - ${this.Items()[last].PageTitle}`, pageIndex));
            }

            this.Pages(pageButtons);
        }
    }

    export class PageItem {
        PageTitle?: string = '';
    }

    export class PageButton {
        constructor(public Title: string, public Index: number) { }
    }


    export class LegendViewModel extends Paging<GO.iLegend> {

        //Ledgends: KnockoutObservableArray<GO.iLegend> = ko.observableArray<GO.iLegend>([]);

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            super();
            this.LoadLegends();
        }

        LoadLegends() {
            for (let legendName in go.LegendsObject) {
                let legend: GO.iLegend = go.LegendsObject[legendName];
                
                if (legend.Lookup == undefined) {
                    legend.Name = legendName;
                    legend.PageTitle = legendName;

                    //this.Ledgends.push(legend);
                    this.Items.push(legend);
                }
            }

            this.UpdatePageNames();
        }

    }

    
}