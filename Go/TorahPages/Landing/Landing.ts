namespace GO.Torah {

    interface iStudyHistoryState extends iHistoryState<iHistoryKeyValues, iHistoryKeyValues> {
        Parameters: {
            page?: string;
        }
    }

    type Section = 'Landing' | 'Study';

    export class LandingViewModel {

        Studies: KnockoutObservableArray<StudyLink> = ko.observableArray<StudyLink>([]);


        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            if (this.NavChanged()) { return }
            this.SetupLinks();
            ko.postbox.subscribe('NavChanged', this.NavChanged);
        }

        SetupLinks() {
            this.Studies.push(new StudyLink('Simple Laws', '/torah-study/simplelaws'));
            this.Studies.push(new StudyLink('Sunday Worship', '/torah-study/sundayworship'));
        }

        //****************************************************************************
        //#region Functions
        //****************************************************************************

        public NavChanged = (): boolean => {
            let state: iStudyHistoryState = history.state;

            if (state && state.Parameters.page) {
                go.ActivePage(`go-torahpage-${state.Parameters.page}`);
                return true;
            }

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