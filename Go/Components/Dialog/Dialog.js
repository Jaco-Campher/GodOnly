var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class DialogViewModel {
            constructor(params) {
                this.Show = ko.observable(false);
                this.ShowHide = () => {
                    this.Show(!this.Show());
                };
                this.Title = ko.observable(params.Title);
                if (params.Show != undefined) {
                    this.Show = ko.isObservable(params.Show) ? params.Show : ko.observable(params.Show);
                }
            }
        }
        Compnents.DialogViewModel = DialogViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
