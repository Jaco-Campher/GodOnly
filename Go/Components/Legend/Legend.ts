namespace GO.Compnents {

    interface iLegendParams {
        Type?: eRefTypeShow;
        Original: string;
        Meaning: string;
        Refs?: Array<iRef>;
    }

    export class LegendViewModel {
        Type: eRefTypeShow;
        Title: string;
        Html: string;
        Refs?: Array<iRef>;

        Show: KnockoutObservable<boolean> = ko.observable(false);
        TypeClass: string;

        constructor(private params: iLegendParams) {
            this.Type = params.Type ?? eRefTypeShow.Prophesy;
            
            switch (this.Type) {
                case eRefTypeShow.NamesPlaces:
                    this.Title = 'Names / Places';
                    this.TypeClass = 'names';
                    break;

                case eRefTypeShow.Dictionary:
                    this.Title = 'Dictionary';
                    this.TypeClass = 'dictionary';
                    break;

                //case eRefTypeShow.Prophesy:
                default:
                    this.Title = 'Prophecy Legend';
                    this.TypeClass = 'leg';
            }

            this.Html = `${params.Original} <span class="div ${this.TypeClass}"></span> ${params.Meaning}`;
            this.Refs = params.Refs;
        }

        OpenClose() {
            this.Show(!this.Show());
        }
    }
}