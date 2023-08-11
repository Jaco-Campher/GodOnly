"use strict";
var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class BibleNumberSelectViewModel {
            constructor(params) {
                this.StartNumber = ko.observable();
                this.Select = params.SelectedFunc;
                if (params.StartNumber == undefined) {
                    this.StartNumber = ko.observable(1);
                }
                else {
                    this.StartNumber = ko.isObservable(params.StartNumber) ? params.StartNumber : ko.observable(params.StartNumber);
                }
                this.EndNumber = ko.isObservable(params.EndNumber) ? params.EndNumber : ko.observable(params.EndNumber);
                this.Numbers = ko.computed(() => {
                    let numbers = [];
                    for (let i = this.StartNumber(); i <= this.EndNumber(); i++) {
                        numbers.push(i);
                    }
                    return numbers;
                }, this);
            }
        }
        Compnents.BibleNumberSelectViewModel = BibleNumberSelectViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
