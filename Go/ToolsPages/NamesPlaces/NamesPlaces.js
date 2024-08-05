var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        class NamesPlacesViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Items = ko.observableArray([]);
                this.LoadLegends();
            }
            LoadLegends() {
                for (let name in go.NamesPlacesObject) {
                    let legend = go.NamesPlacesObject[name];
                    if (legend.Lookup == undefined) {
                        legend.Name = name;
                        legend.PageTitle = name;
                        this.Items.push(legend);
                    }
                }
            }
        }
        Tools.NamesPlacesViewModel = NamesPlacesViewModel;
    })(Tools = GO.Tools || (GO.Tools = {}));
})(GO || (GO = {}));
