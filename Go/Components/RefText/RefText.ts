namespace GO.Compnents {

    interface iRefTextParams {
        Text: string;
        Show: KnockoutObservable<eRefTypeShow>; //Can be 'eRefTypeShow' only.
    }

    export class RefTextViewModel {
        Sections: KnockoutObservableArray<Section> = ko.observableArray<Section>([]);
        Text: string;

        constructor(private params: iRefTextParams) {
            this.Text = params.Text;
            //console.log('Text', this.Text);

            if (params.Show == undefined) {
                params.Show = ko.observable<eRefTypeShow>(eRefTypeShow.Most);
            } else if (!ko.isObservable(params.Show)) {
                params.Show = ko.observable<eRefTypeShow>((params.Show as unknown) as eRefTypeShow);
            } else {
                params.Show.subscribe(this.ProcessText);
            }

            this.ProcessText();
        }

        TemplateType = (section: Section): string => {
            return `T${section.Type}`;
        }


        //****************************************************************************
        //#region Legend Functions
        //****************************************************************************

        ProcessText() {
            let newSections: Array<Section> = [];
            newSections.push(new Section(this.Text));

            if (this.params.Show() & eRefTypeShow.Strongs) { newSections = go.AddStrongs(newSections); }
            if (this.params.Show() & eRefTypeShow.Prophesy) { newSections = go.AddLegend(newSections, go.LegendsObject, eRefTypeShow.Prophesy); }
            if (this.params.Show() & eRefTypeShow.NamesPlaces) { newSections = go.AddLegend(newSections, go.NamesPlacesObject, eRefTypeShow.NamesPlaces); }
            if (this.params.Show() & eRefTypeShow.Dictionary) { newSections = go.AddLegend(newSections, go.DictionaryObject, eRefTypeShow.Dictionary); }

            //console.log(newSections);
            this.Sections(newSections);
        }

        //#endregion
    }


    

}