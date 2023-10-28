"use strict";
var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        class LegendViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Ledgends = ko.observableArray([]);
                this.LoadLegends();
            }
            async LoadLegends() {
                for (let legendName in go.LegendsObject) {
                    let legend = go.LegendsObject[legendName];
                    if (legend.Lookup == undefined) {
                        legend.Name = legendName;
                        this.Ledgends.push(legend);
                    }
                }
            }
        }
        Tools.LegendViewModel = LegendViewModel;
    })(Tools = GO.Tools || (GO.Tools = {}));
})(GO || (GO = {}));
