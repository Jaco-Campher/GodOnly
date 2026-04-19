namespace GO.Prophesy {

    interface iStudyHistoryState extends iHistoryState<iHistoryKeyValues, iHistoryKeyValues> {
        Parameters: {
            page?: string;
        }
    }

    export class LandingViewModel {
        RevelationTimelineStudies: KnockoutObservableArray<StudyLink> = ko.observableArray<StudyLink>([]);
        Studies: KnockoutObservableArray<StudyLink> = ko.observableArray<StudyLink>([]);

        NavChangedSubscription: KnockoutSubscription;

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            if (this.NavChanged()) { return }
            this.SetupLinks();
        }

        SetupLinks() {
            //Studies
            this.Studies.push(new StudyLink('Day of the LORD', '/prophesy-study/dayofthelord'));
            this.Studies.push(new StudyLink('Iran in Prophecy', '/prophesy-study/iran'));
            this.Studies.push(new StudyLink('No One Knows the Day or the Hour?', '/prophesy-study/NoOneKnowstheDayortheHour'));
            this.Studies.push(new StudyLink('Tribulation', '/prophesy-study/tribulation'));

            //Revelation Timeline Studies
            this.RevelationTimelineStudies.push(new StudyLink('Dates Explanation', '/prophesy-study/timelinedatesexplanation'));
            this.RevelationTimelineStudies.push(new StudyLink('Revelation 12 Sign', '/prophesy-study/rev12sign'));
            this.RevelationTimelineStudies.push(new StudyLink('Seal 1 - Yahshua', '/prophesy-study/seal1'));
            this.RevelationTimelineStudies.push(new StudyLink('Seal 2 - Take Peace from Earth', '/prophesy-study/seal2'));
            this.RevelationTimelineStudies.push(new StudyLink('Seal 3 - Food Inflation?', '/prophesy-study/seal3'));
            this.RevelationTimelineStudies.push(new StudyLink('Rapture', '/prophesy-study/rapture'));
            this.RevelationTimelineStudies.push(new StudyLink('Tribulation Year 1 - Beginning of Commotions', '/prophesy-study/year1'));
            this.RevelationTimelineStudies.push(new StudyLink('Tribulation Year 2 - Slayings of the Great One', '/prophesy-study/year2'));
            this.RevelationTimelineStudies.push(new StudyLink('Tribulation Year 3 - The Fall of Many by Death', '/prophesy-study/year3'));
        }

        //****************************************************************************
        //#region Functions
        //****************************************************************************

        public NavChanged = (): boolean => {
            let state: iStudyHistoryState = history.state;
            if (this.NavChangedSubscription != null) { this.NavChangedSubscription.dispose(); }

            if (state && state.Parameters.page) {
                go.ActivePage(`go-prophesypage-${state.Parameters.page}`);
                return true;
            }

            this.NavChangedSubscription = ko.postbox.subscribe('NavChanged', this.NavChanged);
            return false;
        }

        //#endregion
    }

    class StudyLink {
        Title: string;
        Url: string;

        constructor(title: string, url: string) {
            this.Title = title;
            this.Url = url;
        }
    }

}