namespace GO.Tools {

    export class LegendViewModel {

        Ledgends: KnockoutObservableArray<GO.iLegend> = ko.observableArray<GO.iLegend>([]);

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.LoadLegends();
        }

        async LoadLegends() {
            for (let legendName in go.LegendsObject) {
                let legend: GO.iLegend = go.LegendsObject[legendName];
                
                if (legend.Lookup == undefined) {
                    legend.Name = legendName;

                    this.Ledgends.push(legend);
                }
            }
        }

    }
}