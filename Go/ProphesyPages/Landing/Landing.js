var GO;
(function (GO) {
    var Prophesy;
    (function (Prophesy) {
        class LandingViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.RevelationTimelineStudies = ko.observableArray([]);
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
                        go.ActivePage(`go-prophesypage-${state.Parameters.page}`);
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
                //Studies
                this.Studies.push(new StudyLink('Day of the LORD', '/prophesy-study/dayofthelord'));
                this.Studies.push(new StudyLink('Tribulation', '/prophesy-study/tribulation'));
                //Revelation Timeline Studies
                this.RevelationTimelineStudies.push(new StudyLink('Dates Explanation', '/prophesy-study/timelinedatesexplanation'));
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
