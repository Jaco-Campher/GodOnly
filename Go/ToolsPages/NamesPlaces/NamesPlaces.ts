namespace GO.Tools {

    export class NamesPlacesViewModel {

        Items: KnockoutObservableArray<GO.iLegend> = ko.observableArray<GO.iLegend>([]);

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.LoadLegends();
        }

        LoadLegends() {
            for (let name in go.NamesPlacesObject) {
                let legend: GO.iLegend = go.NamesPlacesObject[name];
                
                if (legend.Lookup == undefined) {
                    legend.Name = name;
                    legend.PageTitle = name;

                    this.Items.push(legend);
                }
            }
        }

    }

    
}