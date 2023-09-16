var GO;
(function (GO) {
    var Prophesy;
    (function (Prophesy) {
        class LandingViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Studies = ko.observableArray([]);
                //****************************************************************************
                //#region Functions
                //****************************************************************************
                this.NavChanged = () => {
                    let state = history.state;
                    console.log('..', state);
                    if (state && state.Parameters.page) {
                        go.ActivePage(`go-prophesypage-${state.Parameters.page}`);
                        return true;
                    }
                    return false;
                };
                if (this.NavChanged()) {
                    return;
                }
                this.SetupLinks();
                ko.postbox.subscribe('NavChanged', this.NavChanged);
            }
            SetupLinks() {
                this.Studies.push(new StudyLink('Day of the LORD', '/prophesy-study/dayofthelord'));
            }
        }
        Prophesy.LandingViewModel = LandingViewModel;
        class StudyLink {
            constructor(title, url) {
                this.Title = title;
                this.Url = url;
            }
        }
    })(Prophesy = GO.Prophesy || (GO.Prophesy = {}));
})(GO || (GO = {}));
