var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        class Paging {
            constructor() {
                this.PageSize = ko.observable(20);
                this.CurrentPageIndex = ko.observable(0);
                this.Items = ko.observableArray([]);
                this.Pages = ko.observableArray([]);
                this.CurrentItems = ko.computed(() => {
                    let maxPageIndex = Math.ceil(ko.unwrap(this.Items).length / this.PageSize()) - 1;
                    if (this.CurrentPageIndex() > maxPageIndex) {
                        this.CurrentPageIndex(0);
                    }
                    let startIndex = this.PageSize() * this.CurrentPageIndex();
                    return ko.unwrap(this.Items).slice(startIndex, startIndex + Number(this.PageSize()));
                }, this);
                this.PrevPage = () => {
                    if (this.CurrentPageIndex() == 0) {
                        return;
                    } //Already on the first page.
                    this.CurrentPageIndex(this.CurrentPageIndex() - 1);
                    GO.ScrollToTop();
                };
                this.NextPage = () => {
                    let maxPageIndex = Math.ceil(ko.unwrap(this.Items).length / this.PageSize()) - 1;
                    if (this.CurrentPageIndex() == maxPageIndex) {
                        return;
                    } //Already on the last page.
                    this.CurrentPageIndex(this.CurrentPageIndex() + 1);
                    GO.ScrollToTop();
                };
                this.UpdatePageIndex = (index) => {
                    this.CurrentPageIndex(index);
                    GO.ScrollToTop();
                };
                this.UpdatePageNames = () => {
                    let pageButtons = [];
                    let maxPageIndex = Math.ceil(ko.unwrap(this.Items).length / this.PageSize()) - 1;
                    for (let pageIndex = 0; pageIndex <= maxPageIndex; pageIndex++) {
                        let first = pageIndex * this.PageSize();
                        let last = (first + this.PageSize()) - 1;
                        if (last >= this.Items().length) {
                            last = this.Items().length - 1;
                        }
                        pageButtons.push(new PageButton(`${this.Items()[first].PageTitle} - ${this.Items()[last].PageTitle}`, pageIndex));
                    }
                    this.Pages(pageButtons);
                };
            }
        }
        Tools.Paging = Paging;
        class PageItem {
            constructor() {
                this.PageTitle = '';
            }
        }
        Tools.PageItem = PageItem;
        class PageButton {
            constructor(Title, Index) {
                this.Title = Title;
                this.Index = Index;
            }
        }
        Tools.PageButton = PageButton;
        class LegendViewModel extends Paging {
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
                    let legend = go.LegendsObject[legendName];
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
        Tools.LegendViewModel = LegendViewModel;
    })(Tools = GO.Tools || (GO.Tools = {}));
})(GO || (GO = {}));
