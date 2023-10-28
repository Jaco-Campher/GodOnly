var GO;
(function (GO) {
    var Torah;
    (function (Torah) {
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
                    if (state && state.Parameters.page) {
                        go.ActivePage(`go-torahpage-${state.Parameters.page}`);
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
                this.Studies.push(new StudyLink('Sunday Worship', '/torah-study/sundayworship'));
            }
        }
        Torah.LandingViewModel = LandingViewModel;
        class StudyLink {
            constructor(title, url) {
                this.Title = title;
                this.Url = url;
            }
        }
    })(Torah = GO.Torah || (GO.Torah = {}));
})(GO || (GO = {}));
