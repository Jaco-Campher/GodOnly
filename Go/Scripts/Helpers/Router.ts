interface Window { //Typescript definitions for Google Analytics Tag Manager
    dataLayer?: iGTagData[];
}

interface iGTagData { //Custom tag data
    Event: 'PageView' | 'PageHelp';
    PageUrl: string;
}

namespace GO {

    export interface iHashKeyValue {
        Key: string;
        Value: string;
    }

    export interface iHistoryState<UrlT, HashT> {
        Parameters: UrlT;
        Hashes: HashT;
    }

    export interface iHistoryKeyValues {
        [Key: string]: string;
    }

    export interface iRoute {
        ID: string;
        Keys: Array<string>;
        Title: string;
        Url: RegExp;
    }

    export class Router {
        CurrentUrl: string = '';
        CurrentHash: string = '';
        HistoryValues: iHistoryState<iHistoryKeyValues, iHistoryKeyValues> = { Parameters: {}, Hashes: {} };

        Routes: Array<iRoute> = new Array();

        ActivePage: KnockoutObservable<string> = ko.observable('');

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            //Listen for history navigation.
            window.onpopstate = (event: PopStateEvent) => {
                if (this.CurrentUrl == location.pathname) {
                    //Url is stil the same, so the hash changed.
                    //this.UpdateHash();
                    ko.postbox.publish('HashChanged');
                } else {
                    this.Navigate(location.pathname, false);
                }
            }

            window.dataLayer = window.dataLayer || [];
        }

        //****************************************************************************
        //#region Route Functions
        //****************************************************************************

        /**
         * Adds a new route to the router.
         * @param urlPattern Url pattern.
         * @param title Page title.
         * @param componentID Component ID.
         */
        public AddRoute(urlPattern: string, title: string, componentID: string) {
            //Make the url pattern a regex pattern.
            let pattern: string = urlPattern.replace(/\//g, '\\/'); //Replace / with \/ so we can match them.
            pattern = pattern.replace(/:[\d\w-]+/g, '([\\d\\w-]+?)');   //Replace :var so that we can capture them.

            //Get the key names from the pattern.
            let keys: Array<any> = new Array();
            let keysRegex: RegExp = new RegExp(/(?<=:)[\d\w-]+/g);
            let keysRegexArray: RegExpExecArray | null;

            while ((keysRegexArray = keysRegex.exec(urlPattern)) != null) {
                //This is necessary to avoid infinite loops with zero-width matches
                if (keysRegexArray.index == keysRegex.lastIndex) { keysRegex.lastIndex++; }
                keys.push(keysRegexArray[0]);
            }
            
            this.Routes.push({
                ID: componentID,
                Keys: keys,
                Title: title,
                Url: new RegExp(`^${pattern}$`, 'i')
            });
        }

        /**
         *  Finds the matching route and updated the url and ActivePage.
         *  Automatically called during history navigation.
         *  @param url The url to navigat to. Default 'location.pathName'
         *  @param updateHistory True to update the browser history. Default True;
         **/
        public Navigate = (url: string = location.pathname, updateHistory: boolean = true) => {
            //console.log('url', url, location.hash, this.CurrentUrl);
            //console.log(JSON.stringify(location, undefined, 2));

            if (this.CurrentUrl == url) { //Url is still the same.
                if (this.CurrentHash != location.hash) { this.UpdateHash(undefined, false); } //Hash has changed.
                return;
            }

            for (let route of this.Routes) {
                let urlRegexArray: RegExpExecArray | null = route.Url.exec(url);
                if (urlRegexArray == null) { continue; }

                this.CurrentUrl = url;

                if (updateHistory) {
                    //Update current url and history only if the user is not navigating via the history.

                    //Get the keys and values to pass to the history state object.
                    this.HistoryValues.Parameters = {};
                    for (let i = 1; i < urlRegexArray.length; i++) {
                        this.HistoryValues.Parameters[route.Keys[i - 1]] = urlRegexArray[i].toLowerCase();
                    }

                    //Hash
                    this.GetCurrentHashValues();
                    this.CurrentHash = this.BuildHashPartofUrl();

                    window.history.pushState(this.HistoryValues, '', `${window.location.origin}${url}${this.CurrentHash}`);
                }

                this.ActivePage(route.ID);
                this.PushPageViewTag(url);

                //console.log('Route', route);
                ko.postbox.publish('NavChanged');
                GO.ScrollToTop();

                return;
            }

            console.error('Route not found.', url)
        }

        PushPageViewTag(url: string) {
            if (window.dataLayer == undefined) { window.dataLayer = []; }
            window.dataLayer.push({
                Event: 'PageView',
                PageUrl: url.toLowerCase()
            });
        }

        PushPageHelp() {
            if (window.dataLayer == undefined) { window.dataLayer = []; }
            window.dataLayer.push({
                Event: 'PageHelp',
                PageUrl: this.CurrentUrl.toLowerCase()
            });
        }

        //#endregion

        //****************************************************************************
        //#region Hash Functions
        //****************************************************************************

        /**
         * Build the hash part of the url.
         **/
        private BuildHashPartofUrl(): string {
            let hashPart: string = '#';

            for (let hashKey in this.HistoryValues.Hashes) {
                hashPart += `${hashKey}=${this.HistoryValues.Hashes[hashKey]}&`;
            }

            this.CurrentHash = hashPart == '#' ? '' : hashPart;
            return this.CurrentHash;
        }

        /**
         * Gets all the current hash values and stores it in the historyValues.HashValues object.
         **/
        private GetCurrentHashValues() {
            this.HistoryValues.Hashes = {};
            if (!location.hash) { return; } //No hash present.

            let hashPairs: Array<string> = location.hash.replace('#', '').split('&');

            for (let hashPairString of hashPairs) {
                let hashPair: Array<string> = hashPairString.split('=');
                if (hashPair[0] == '') { continue; }

                this.HistoryValues.Hashes[hashPair[0]] = hashPair[1];
            }
        }

        public RemoveHashKeys(keys: Array<string>) {
            this.GetCurrentHashValues();

            for (let key of keys) {
                if (this.HistoryValues.Hashes[key] != undefined) {
                    delete this.HistoryValues.Hashes[key];
                }
            }

            //Build the hash part of the url.
            this.CurrentHash = this.BuildHashPartofUrl();

            //Update the history.
            window.history.pushState(this.HistoryValues, '', `${window.location.origin}${this.CurrentUrl == '/' ? '' : this.CurrentUrl}${this.CurrentHash}`);

            ko.postbox.publish('HashChanged');
        }

        /**
         * Updates the hash part of the url.
         */
        public UpdateHash = (hashKeyValues?: Array<iHashKeyValue>, updateHistory: boolean = true) => {
            this.GetCurrentHashValues();

            if (hashKeyValues) {
                //Update or add the changed values.
                for (let data of hashKeyValues) {
                    this.HistoryValues.Hashes[data.Key.toLowerCase()] = data.Value;
                }
            }

            //Build the hash part of the url.
            this.CurrentHash = this.BuildHashPartofUrl();

            if (updateHistory) {
                //Update the history.
                let url: string = `${window.location.origin}${this.CurrentUrl == '/' ? '' : this.CurrentUrl}${this.CurrentHash}`
                window.history.pushState(this.HistoryValues, '', url);
                this.PushPageViewTag(url);
            }

            ko.postbox.publish('HashChanged');
        }

        //#endregion
    }
}