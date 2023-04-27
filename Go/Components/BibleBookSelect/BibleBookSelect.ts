namespace GO.Compnents {
    interface iBibleBookSelectOptions {
        SelectedFunc?: (bookDetails: iBookNamesArrayDetails) => any;
    }

    export class BibleBookSelectViewModel {

        OldTestamentBookNames: KnockoutObservableArray<iBookNamesArrayDetails>;
        ApocryphaBookNames: KnockoutObservableArray<iBookNamesArrayDetails>;
        NewTestamentBookNames: KnockoutObservableArray<iBookNamesArrayDetails>;
        OtherBookNames: KnockoutObservableArray<iBookNamesArrayDetails>;

        SelectedFunc: (bookDetails: iBookNamesArrayDetails) => any;

        constructor(params: iBibleBookSelectOptions) {
            this.SelectedFunc = params.SelectedFunc ? params.SelectedFunc : this.Select;

            this.OldTestamentBookNames = ko.observableArray<iBookNamesArrayDetails>(go.Bible.OldTestamentBookNames);
            this.ApocryphaBookNames = ko.observableArray<iBookNamesArrayDetails>(go.Bible.ApocryphaBookNames);
            this.NewTestamentBookNames = ko.observableArray<iBookNamesArrayDetails>(go.Bible.NewTestamentBookNames);
            this.OtherBookNames = ko.observableArray<iBookNamesArrayDetails>(go.Bible.OtherBookNames);
        }

        Select = (bookDetails: iBookNamesArrayDetails) => {
            go.Navigate(`/bible/${bookDetails.Abbr.toLowerCase()}`);
        }

    }
}