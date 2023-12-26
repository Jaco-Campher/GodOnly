"use strict";
var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class LegendViewModel {
            constructor(params) {
                this.params = params;
                this.Show = ko.observable(false);
                this.Type = params.Type ?? GO.eRefTypeShow.Prophesy;
                switch (this.Type) {
                    //case eRefTypeShow.Prophesy:
                    default:
                        this.Title = 'Prophecy Legend';
                        this.TypeClass = 'leg';
                }
                this.Html = `${params.Original} <span class="div ${this.TypeClass}"></span> ${params.Meaning}`;
                this.Refs = params.Refs;
            }
            OpenClose() {
                this.Show(!this.Show());
            }
        }
        Compnents.LegendViewModel = LegendViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
