namespace GO.Prophesy {

    interface iStudyHistoryState extends iHistoryState<iHistoryKeyValues, iHistoryKeyValues> {
        Parameters: {
            page?: string;
        }
    }

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
            this.Studies.push(new StudyLink('Day of the LORD', '/prophesy-study/dayofthelord'));
        }

        //****************************************************************************
        //#region Functions
        //****************************************************************************

        public NavChanged = (): boolean => {
            let state: iStudyHistoryState = history.state;
            console.log('..', state);
            if (state && state.Parameters.page) {
                go.ActivePage(`go-prophesypage-${state.Parameters.page}`);
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