"use strict";
var GO;
(function (GO) {
    class Router {
        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.CurrentUrl = '';
            this.CurrentHash = '';
            this.HistoryValues = { Parameters: {}, Hashes: {} };
            this.Routes = new Array();
            this.ActivePage = ko.observable('');
            /**
             *  Finds the matching route and updated the url and ActivePage.
             *  Automatically called during history navigation.
             *  @param url The url to navigat to. Default 'location.pathName'
             *  @param updateHistory True to update the browser history. Default True;
             **/
            this.Navigate = (url = location.pathname, updateHistory = true) => {
                //console.log('url', url, location.hash, this.CurrentUrl);
                //console.log(JSON.stringify(location, undefined, 2));
                if (this.CurrentUrl == url) { //Url is still the same.
                    if (this.CurrentHash != location.hash) {
                        this.UpdateHash(undefined, false);
                    } //Hash has changed.
                    return;
                }
                for (let route of this.Routes) {
                    let urlRegexArray = route.Url.exec(url);
                    if (urlRegexArray == null) {
                        continue;
                    }
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
                console.error('Route not found.', url);
            };
            /**
             * Updates the hash part of the url.
             */
            this.UpdateHash = (hashKeyValues, updateHistory = true) => {
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
                    let url = `${window.location.origin}${this.CurrentUrl == '/' ? '' : this.CurrentUrl}${this.CurrentHash}`;
                    window.history.pushState(this.HistoryValues, '', url);
                    this.PushPageViewTag(url);
                }
                ko.postbox.publish('HashChanged');
            };
            //Listen for history navigation.
            window.onpopstate = (event) => {
                if (this.CurrentUrl == location.pathname) {
                    //Url is stil the same, so the hash changed.
                    //this.UpdateHash();
                    ko.postbox.publish('HashChanged');
                }
                else {
                    this.Navigate(location.pathname, false);
                }
            };
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
        AddRoute(urlPattern, title, componentID) {
            //Make the url pattern a regex pattern.
            let pattern = urlPattern.replace(/\//g, '\\/'); //Replace / with \/ so we can match them.
            pattern = pattern.replace(/:[\d\w-]+/g, '([\\d\\w-]+?)'); //Replace :var so that we can capture them.
            //Get the key names from the pattern.
            let keys = new Array();
            let keysRegex = new RegExp(/(?<=:)[\d\w-]+/g);
            let keysRegexArray;
            while ((keysRegexArray = keysRegex.exec(urlPattern)) != null) {
                //This is necessary to avoid infinite loops with zero-width matches
                if (keysRegexArray.index == keysRegex.lastIndex) {
                    keysRegex.lastIndex++;
                }
                keys.push(keysRegexArray[0]);
            }
            this.Routes.push({
                ID: componentID,
                Keys: keys,
                Title: title,
                Url: new RegExp(`^${pattern}$`, 'i')
            });
        }
        PushPageViewTag(url) {
            if (window.dataLayer == undefined) {
                window.dataLayer = [];
            }
            window.dataLayer.push({
                Event: 'PageView',
                PageUrl: url.toLowerCase()
            });
        }
        PushPageHelp() {
            if (window.dataLayer == undefined) {
                window.dataLayer = [];
            }
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
        BuildHashPartofUrl() {
            let hashPart = '#';
            for (let hashKey in this.HistoryValues.Hashes) {
                hashPart += `${hashKey}=${this.HistoryValues.Hashes[hashKey]}&`;
            }
            this.CurrentHash = hashPart == '#' ? '' : hashPart;
            return this.CurrentHash;
        }
        /**
         * Gets all the current hash values and stores it in the historyValues.HashValues object.
         **/
        GetCurrentHashValues() {
            this.HistoryValues.Hashes = {};
            if (!location.hash) {
                return;
            } //No hash present.
            let hashPairs = location.hash.replace('#', '').split('&');
            for (let hashPairString of hashPairs) {
                let hashPair = hashPairString.split('=');
                if (hashPair[0] == '') {
                    continue;
                }
                this.HistoryValues.Hashes[hashPair[0]] = hashPair[1];
            }
        }
        RemoveHashKeys(keys) {
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
    }
    GO.Router = Router;
})(GO || (GO = {}));
