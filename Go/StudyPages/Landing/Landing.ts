namespace GO.Study {

    export interface iStudyHistoryState extends iHistoryState<iHistoryKeyValues, iHistoryKeyValues> {
        Parameters: {
            page?: string;
        }
    }

    export class LandingViewModel {

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
            this.Studies.push(new StudyLink('Marriage in Heaven', '', '/bible-study/MarriageinHeaven'));
            this.Studies.push(new StudyLink('Withholding Knowledge', '', '/bible-study/WithholdingKnowledge'));
        }

        //****************************************************************************
        //#region Functions
        //****************************************************************************

        public NavChanged = (): boolean => {
            let state: iStudyHistoryState = history.state;
            if (this.NavChangedSubscription != null) { this.NavChangedSubscription.dispose(); }


            if (state && state.Parameters.page) {
                go.ActivePage(`go-studypage-${state.Parameters.page}`);
                return true;
            }

            this.NavChangedSubscription = ko.postbox.subscribe('NavChanged', this.NavChanged);
            return false;
        }

        //#endregion
    }

    class StudyLink {
        Title: string;
        Description: string;
        Url: string;

        constructor(title: string, description: string, url: string) {
            this.Title = title;
            this.Description = description;
            this.Url = url;
        }
    }

}