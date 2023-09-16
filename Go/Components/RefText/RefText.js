var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class RefTextViewModel {
            constructor(params) {
                this.params = params;
                this.Sections = ko.observableArray([]);
                this.TemplateType = (section) => {
                    return `T${section.Type}`;
                };
                this.Text = params.Text;
                //console.log('Text', this.Text);
                if (params.Show == undefined) {
                    params.Show = ko.observable(GO.eRefTypeShow.Most);
                }
                else if (!ko.isObservable(params.Show)) {
                    params.Show = ko.observable(params.Show);
                }
                else {
                    params.Show.subscribe(this.ProcessText);
                }
                this.ProcessText();
            }
            //****************************************************************************
            //#region Legend Functions
            //****************************************************************************
            ProcessText() {
                let newSections = [];
                newSections.push(new GO.Section(this.Text));
                if (this.params.Show() & GO.eRefTypeShow.Prophesy) {
                    newSections = go.AddLegend(newSections);
                }
                //console.log(newSections);
                this.Sections(newSections);
            }
        }
        Compnents.RefTextViewModel = RefTextViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
