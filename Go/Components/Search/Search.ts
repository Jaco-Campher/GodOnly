namespace GO.Compnents {
    interface iSearchParams {
        SearchMode: 'Auto' | 'Manual' | 'ManualSync',
        SyncWith: string,
        PlaceHolder: string,
        SearchFunc?: (value: string) => any;
    }

    export class SearchViewModel {
        SearchText: KnockoutObservable<string>;


        Params: iSearchParams = {
            SearchMode: 'Auto',
            SyncWith: 'SearchFilter',
            PlaceHolder: ''
        }

        constructor(params: iSearchParams) {
            this.Params = { ...this.Params, ...params }

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

        Clear = () => { this.SearchText('') }

        Search = () => {
            switch (this.Params.SearchMode) {
                case 'Manual':
                    if (this.Params.SearchFunc != undefined) { this.Params.SearchFunc(this.SearchText()); }
                    break;

                case 'ManualSync':
                    ko.postbox.publish(this.Params.SyncWith, this.SearchText());
                    break;

                //case 'Auto':
                default:
            }
        }

        SearchKeyPress = (data: any, event: KeyboardEvent) => {
            event.keyCode == 13 && this.Search();
            event.stopPropagation();
            return true;
        };
    }
}