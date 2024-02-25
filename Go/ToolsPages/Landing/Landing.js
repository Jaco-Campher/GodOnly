var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        class LandingViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.ImageLinks = ko.observableArray([]);
                //****************************************************************************
                //#region Functions
                //****************************************************************************
                this.NavChanged = () => {
                    let state = history.state;
                    if (state && state.Parameters.page) {
                        switch (state.Parameters.page) {
                            case 'legend':
                                console.log('3.1');
                                go.ActivePage('go-tools-legend');
                                return;
                            case 'incestlaws':
                                return go.ActivePage('go-tools-incestLaws');
                            case 'texttohtml':
                                return go.ActivePage('go-tools-textToHtml');
                            case 'timeline':
                                return go.ActivePage('go-tools-timeline');
                            default:
                        }
                        //Show the page.
                        go.Navigate(`tools/${state.Parameters.page}`);
                    }
                };
                console.log('Tools Landing...');
                this.SetupImageLinks();
                this.NavChanged();
                ko.postbox.subscribe('NavChanged', this.NavChanged);
            }
            SetupImageLinks() {
                this.ImageLinks.push(new GO.ImageLink('Incest Laws', 'Helps to visually show the how the Torah affects a family tree.<br/><i>(Does not work on mobile)</i>', '/tools/incestlaws', 'IncestLaws.jpg'));
                this.ImageLinks.push(new GO.ImageLink('Prophecy Legend', '<p>The Prophesy Legend is a list of words that has been found in Scripture that can have other meanings in prophesy. One of the functions of this site is to share what has been found and to make it easier to see in the context of Scripture. When reading Scripture on this site, the words from the Prophesy Legend will be displayed when matches are found.</p>', '/tools/legend', 'MapCompass.jpg'));
                //this.ImageLinks.push(new GO.ImageLink('Text to HTML', '', '/tools/texttohtml'));
                //this.ImageLinks.push(new GO.ImageLink('Timeline', '', '/tools/timeline'));
            }
        }
        Tools.LandingViewModel = LandingViewModel;
    })(Tools = GO.Tools || (GO.Tools = {}));
})(GO || (GO = {}));
