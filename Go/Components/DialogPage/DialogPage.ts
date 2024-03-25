namespace GO.Compnents {

    interface iDialogPageParams {
        Title: string;
        Page: string;
        Show?: KnockoutObservable<boolean> | boolean;
    }

    export class DialogPageViewModel {
        Title: KnockoutObservable<string>;
        Page: KnockoutObservable<string>;
        Show: KnockoutObservable<boolean> = ko.observable(false);

        constructor(params: iDialogPageParams) {
            this.Title = ko.observable(params.Title);
            this.Page = ko.observable(params.Page);

            if (params.Show != undefined) {
                this.Show = ko.isObservable(params.Show) ? params.Show : ko.observable(params.Show as boolean);
            }
        }

        ShowHide = () => {
            this.Show(!this.Show());
        }
    }

}