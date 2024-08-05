var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class DialogPageViewModel {
            constructor(params) {
                this.Show = ko.observable(false);
                this.ShowHide = () => {
                    this.Show(!this.Show());
                };
                this.Title = ko.isObservable(params.Title) ? params.Title : ko.observable(params.Title);
                this.Page = ko.isObservable(params.Page) ? params.Page : ko.observable(params.Page);
                if (params.Show != undefined) {
                    this.Show = ko.isObservable(params.Show) ? params.Show : ko.observable(params.Show);
                }
            }
        }
        Compnents.DialogPageViewModel = DialogPageViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
