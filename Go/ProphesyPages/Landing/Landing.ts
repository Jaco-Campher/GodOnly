﻿namespace GO.Prophesy {

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
            this.Studies.push(new StudyLink('Tribulation', '/prophesy-study/tribulation'));

            //Revelation Timeline Studies
            this.RevelationTimelineStudies.push(new StudyLink('Dates Explanation', '/prophesy-study/timelinedatesexplanation'));
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