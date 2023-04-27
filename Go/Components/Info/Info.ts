namespace GO.Compnents {

    interface iInfoParams {
        Title: string;
    }

    export class InfoViewModel {
        Title: string;
        Show: KnockoutObservable<boolean> = ko.observable(false);

        constructor(params: iInfoParams, componentInfo: KnockoutComponentTypes.ComponentInfo) {
            this.Title = params.Title;
        }

        //GetHtmlFrommNodes(nodes: Array<any>): any {
        //    let html: string = '';
        //    for (var i = 1, j = nodes.length; i < j; i++) {
        //        html += nodes[i].outerHTML ? nodes[i].outerHTML : nodes[i].data;
        //    }
        //    return html;
        //}

        public ShowHide() {
            this.Show(!this.Show());
        }
    }

}