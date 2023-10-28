"use strict";
var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class LinkStudyViewModel {
            constructor(params) {
                this.Navigate = () => {
                    go.Navigate(this.Url);
                };
                this.Title = params.Title;
                this.Url = params.Url;
            }
        }
        Compnents.LinkStudyViewModel = LinkStudyViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
