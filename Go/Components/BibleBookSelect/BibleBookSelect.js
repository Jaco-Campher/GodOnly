var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class BibleBookSelectViewModel {
            constructor(params) {
                this.Select = (bookDetails) => {
                    go.Navigate(`/bible/${bookDetails.Abbr.toLowerCase()}`);
                };
                this.SelectedFunc = params.SelectedFunc ? params.SelectedFunc : this.Select;
                this.OldTestamentBookNames = ko.observableArray(go.Bible.OldTestamentBookNames);
                this.ApocryphaBookNames = ko.observableArray(go.Bible.ApocryphaBookNames);
                this.NewTestamentBookNames = ko.observableArray(go.Bible.NewTestamentBookNames);
                this.OtherBookNames = ko.observableArray(go.Bible.OtherBookNames);
            }
        }
        Compnents.BibleBookSelectViewModel = BibleBookSelectViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
