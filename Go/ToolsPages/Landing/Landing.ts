namespace GO.Tools {

    export interface iToolsHistoryState extends iHistoryState<iHistoryKeyValues, iHistoryKeyValues> {
        Parameters: {
            page?: string;
        }
    }

    export class LandingViewModel {

        ImageLinks: KnockoutObservableArray<GO.ImageLink> = ko.observableArray<GO.ImageLink>([]);

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            console.log('Tools Landing...')
            this.SetupImageLinks();
            this.NavChanged();
            ko.postbox.subscribe('NavChanged', this.NavChanged);
        }

        SetupImageLinks() {
            this.ImageLinks.push(new GO.ImageLink('Prophecy Legend', '',  '/tools/legend', 'MapCompass.jpg'));
            //this.ImageLinks.push(new GO.ImageLink('Sexual Relations Between Family Members', '', '/tools/sexfamily', 'SexFamily.jpg'));
            //this.ImageLinks.push(new GO.ImageLink('Text to HTML', '', '/tools/texttohtml'));
            //this.ImageLinks.push(new GO.ImageLink('Timeline', '', '/tools/timeline'));
        }

        //****************************************************************************
        //#region Functions
        //****************************************************************************

        public NavChanged = () => {
            let state: iToolsHistoryState = history.state;

            console.log('1');

            if (state && state.Parameters.page) {

                console.log('2', state);

                switch (state.Parameters.page) {
                    case 'legend':
                        console.log('3.1');
                        go.ActivePage('go-tools-legend');
                        return;

                    case 'sexfamily':
                        return go.ActivePage('go-tools-sexFamily');

                    case 'texttohtml':
                        return go.ActivePage('go-tools-textToHtml');

                    case 'timeline':
                        return go.ActivePage('go-tools-timeline');

                    default:
                }


                //Show the page.
                go.Navigate(`tools/${state.Parameters.page}`);
            } 
        }

        //#endregion
    }

}