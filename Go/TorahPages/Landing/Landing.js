var GO;
(function (GO) {
    var Torah;
    (function (Torah) {
        class LandingViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.NewToTorahStudies = ko.observableArray([]);
                this.Studies = ko.observableArray([]);
                //****************************************************************************
                //#region Functions
                //****************************************************************************
                this.NavChanged = () => {
                    let state = history.state;
                    if (this.NavChangedSubscription != null) {
                        this.NavChangedSubscription.dispose();
                    }
                    if (state && state.Parameters.page) {
                        go.ActivePage(`go-torahpage-${state.Parameters.page}`);
                        return true;
                    }
                    this.NavChangedSubscription = ko.postbox.subscribe('NavChanged', this.NavChanged);
                    return false;
                };
                if (this.NavChanged()) {
                    return;
                }
                this.SetupLinks();
            }
            SetupLinks() {
                this.NewToTorahStudies.push(new StudyLink('1. Do We Still Need to Keep the Law', '/torah-study/needtokeepthelaw'));
                this.Studies.push(new StudyLink('Lesbians in the Bible', '/torah-study/lesbians'));
                this.Studies.push(new StudyLink('Simple Laws', '/torah-study/simplelaws'));
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
