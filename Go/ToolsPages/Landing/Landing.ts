namespace GO.Tools {

    export interface iToolsHistoryState extends iHistoryState<iHistoryKeyValues, iHistoryKeyValues> {
        Parameters: {
            page?: string;
        }
    }

    export class LandingViewModel {

        ImageLinks: KnockoutObservableArray<GO.ImageLink> = ko.observableArray<GO.ImageLink>([]);

        NavChangedSubscription: KnockoutSubscription;

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            //console.log('Tools Landing...')
            this.SetupImageLinks();
            this.NavChanged();
            
        }

        SetupImageLinks() {
            this.ImageLinks.push(new GO.ImageLink('Incest Laws', 'Helps to visually show the how the Torah affects a family tree.<br/><i>(Does not work on mobile)</i>', '/tools/incest-laws', 'IncestLaws.jpg'));
            this.ImageLinks.push(new GO.ImageLink('Prophecy Legend', '<p>The Prophesy Legend is a list of words that has been found in Scripture that can have other meanings in prophesy. One of the functions of this site is to share what has been found and to make it easier to see in the context of Scripture. When reading Scripture on this site, the words from the Prophesy Legend will be displayed when matches are found.</p>', '/tools/legend', 'MapCompass.jpg'));
            this.ImageLinks.push(new GO.ImageLink('Revelation Timeline', '', '/tools/revelation-timeline', 'RevTimeline.jpg'));
            //this.ImageLinks.push(new GO.ImageLink('Timeline', '', '/tools/timeline'));
        }

        //****************************************************************************
        //#region Functions
        //****************************************************************************

        public NavChanged = () => {
            let state: iToolsHistoryState = history.state;
            if (this.NavChangedSubscription != null) { this.NavChangedSubscription.dispose(); }

            if (state && state.Parameters.page) {

                //console.log(state.Parameters.page);
                switch (state.Parameters.page) {
                    case 'legend':
                        //console.log('3.1');
                        go.ActivePage('go-tools-legend');
                        return;

                    case 'incest-laws':
                        go.ActivePage('go-tools-incestLaws');
                        return;

                    case 'revelation-timeline':
                        go.ActivePage('go-tools-revelationTimeline');
                        return;

                    case 'texttohtml':
                        go.ActivePage('go-tools-textToHtml');
                        return;

                    case 'timeline':
                        go.ActivePage('go-tools-timeline');
                        return;
                }

                //Show the page.
                go.Navigate(`tools/${state.Parameters.page}`);
            }
            else {
                this.NavChangedSubscription = ko.postbox.subscribe('NavChanged', this.NavChanged);
            }
        }

        //#endregion
    }

}