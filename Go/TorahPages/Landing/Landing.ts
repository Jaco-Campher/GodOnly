namespace GO.Torah {

    interface iStudyHistoryState extends iHistoryState<iHistoryKeyValues, iHistoryKeyValues> {
        Parameters: {
            page?: string;
        }
    }

    type Section = 'Landing' | 'Study';

    export class LandingViewModel {

        NewToTorahStudies: KnockoutObservableArray<StudyLink> = ko.observableArray<StudyLink>([]);
        Studies: KnockoutObservableArray<StudyLink> = ko.observableArray<StudyLink>([]);
        AdvancedStudies: KnockoutObservableArray<StudyLink> = ko.observableArray<StudyLink>([]);

        NavChangedSubscription: KnockoutSubscription;

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            if (this.NavChanged()) { return }
            this.SetupLinks();
        }

        SetupLinks() {
            //New to Torah
            this.NewToTorahStudies.push(new StudyLink('1. Do We Still Need to Keep the Law', '/torah-study/needtokeepthelaw'));
            this.NewToTorahStudies.push(new StudyLink('2. Only for Israel (Double Standards?)', '/torah-study/onlyforisrael'));

            //Studies
            this.Studies.push(new StudyLink('Simple Laws', '/torah-study/simplelaws'));
            this.Studies.push(new StudyLink('Sunday Worship', '/torah-study/sundayworship'));

            //Advanced Studies
            this.AdvancedStudies.push(new StudyLink('Lesbians in the Bible', '/torah-study/lesbians'));
            this.AdvancedStudies.push(new StudyLink('Nudity in the Bible', '/torah-study/nudityinthebible'));
        }

        //****************************************************************************
        //#region Functions
        //****************************************************************************

        public NavChanged = (): boolean => {
            let state: iStudyHistoryState = history.state;
            if (this.NavChangedSubscription != null) { this.NavChangedSubscription.dispose(); }

            if (state && state.Parameters.page) {
                go.ActivePage(`go-torahpage-${state.Parameters.page}`);
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