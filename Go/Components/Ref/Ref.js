"use strict";
var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class RefViewModel {
            constructor(params, componentInfo) {
                this.params = params;
                this.Ref = ko.observable();
                this.Ref = ko.isObservable(params.Ref) ? params.Ref : ko.observable(params.Ref);
                //this.Html = ko.observable(go.AddRefShow(this.GetHtmlFromNodes(componentInfo.templateNodes), params.Show));
            }
        }
        Compnents.RefViewModel = RefViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
