var GO;
(function (GO) {
    var Study;
    (function (Study) {
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
                    if (this.NavChangedSubscription != null) {
                        this.NavChangedSubscription.dispose();
                    }
                    if (state && state.Parameters.page) {
                        go.ActivePage(`go-studypage-${state.Parameters.page}`);
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
                this.Studies.push(new StudyLink('Marriage in Heaven', '', '/bible-study/MarriageinHeaven'));
            }
        }
        Study.LandingViewModel = LandingViewModel;
        class StudyLink {
            constructor(title, description, url) {
                this.Title = title;
                this.Description = description;
                this.Url = url;
            }
        }
    })(Study = GO.Study || (GO.Study = {}));
})(GO || (GO = {}));
