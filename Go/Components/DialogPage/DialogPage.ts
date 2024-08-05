namespace GO.Compnents {

    interface iDialogPageParams {
        Title: KnockoutObservable<string> | string;
        Page: KnockoutObservable<string> | string;
        Show?: KnockoutObservable<boolean> | boolean;
    }

    export class DialogPageViewModel {
        Title: KnockoutObservable<string>;
        Page: KnockoutObservable<string>;
        Show: KnockoutObservable<boolean> = ko.observable(false);

        constructor(params: iDialogPageParams) {
            this.Title = ko.isObservable(params.Title) ? params.Title : ko.observable(params.Title as string);
            this.Page = ko.isObservable(params.Page) ? params.Page : ko.observable(params.Page as string);

            if (params.Show != undefined) {
                this.Show = ko.isObservable(params.Show) ? params.Show : ko.observable(params.Show as boolean);
            }
        }

        ShowHide = () => {
            this.Show(!this.Show());
        }
    }

}