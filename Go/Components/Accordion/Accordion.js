var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class AccordionViewModel {
            constructor(params) {
                this.Show = ko.observable(false);
                this.ShowHide = () => {
                    this.Show(!this.Show());
                };
                this.ID = params.Title.replace(/ /g, '-');
                this.Title = params.Title;
                if (params.Show != undefined) {
                    this.Show(params.Show);
                }
            }
        }
        Compnents.AccordionViewModel = AccordionViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
