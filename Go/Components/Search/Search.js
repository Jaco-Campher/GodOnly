var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class SearchViewModel {
            constructor(params) {
                this.Params = {
                    SearchMode: 'Auto',
                    SyncWith: 'SearchFilter',
                    PlaceHolder: ''
                };
                this.Clear = () => { this.SearchText(''); };
                this.Search = () => {
                    switch (this.Params.SearchMode) {
                        case 'Manual':
                            if (this.Params.SearchFunc != undefined) {
                                this.Params.SearchFunc(this.SearchText());
                            }
                            break;
                        case 'ManualSync':
                            ko.postbox.publish(this.Params.SyncWith, this.SearchText());
                            break;
                        //case 'Auto':
                        default:
                    }
                };
                this.SearchKeyPress = (data, event) => {
                    event.keyCode == 13 && this.Search();
                    event.stopPropagation();
                    return true;
                };
                this.Params = { ...this.Params, ...params };
                switch (this.Params.SearchMode) {
                    case 'Manual':
                        this.SearchText = ko.observable('')
                            .subscribeTo(this.Params.SyncWith, true);
                        break;
                    case 'ManualSync':
                        this.SearchText = ko.observable('')
                            .syncWith(this.Params.SyncWith);
                        break;
                    //case 'Auto':
                    default:
                        this.SearchText = ko.observable('')
                            .extend({ rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' } })
                            .syncWith(this.Params.SyncWith);
                }
            }
        }
        Compnents.SearchViewModel = SearchViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
