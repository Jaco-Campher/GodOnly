namespace GO.Compnents {

    interface iDialogParams {
        Title: string;
        Show?: KnockoutObservable<boolean> | boolean;
    }

    export class DialogViewModel {
        Title: KnockoutObservable<string>;
        Show: KnockoutObservable<boolean> = ko.observable(false);

        constructor(params: iDialogParams) {
            this.Title = ko.observable(params.Title);
            if (params.Show != undefined) {
                this.Show = ko.isObservable(params.Show) ? params.Show : ko.observable(params.Show as boolean);
            }
        }

        ShowHide = () => {
            this.Show(!this.Show());
        }
    }

}