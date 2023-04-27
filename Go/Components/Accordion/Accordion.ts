namespace GO.Compnents {

    interface iAccordionParams {
        Title: string;
        Show?: boolean;
    }

    export class AccordionViewModel {
        ID: string;
        Title: string;
        Show: KnockoutObservable<boolean> = ko.observable(false);

        constructor(params: iAccordionParams) {
            this.ID = params.Title.replace(/ /g, '-');
            this.Title = params.Title;
            if (params.Show != undefined) { this.Show(params.Show); }
        }

        ShowHide = () => {
            this.Show(!this.Show());
        }

    }
}