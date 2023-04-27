var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class RefsViewModel {
            constructor(params) {
                this.Refs = ko.isObservable(params.Refs) ? params.Refs : ko.observableArray(params.Refs);
            }
        }
        Compnents.RefsViewModel = RefsViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
