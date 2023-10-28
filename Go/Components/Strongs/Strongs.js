"use strict";
var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class StrongsViewModel {
            constructor(params, componentInfo) {
                this.params = params;
                this.Strongs = `<a href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?t=kjv&strongs=${params.Strongs}" target="blank">${params.Strongs}</a>`;
                this.Alt = params.Alt;
            }
        }
        Compnents.StrongsViewModel = StrongsViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
