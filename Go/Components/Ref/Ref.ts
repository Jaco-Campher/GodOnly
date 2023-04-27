namespace GO.Compnents {

    interface iRefParams {
        Ref: KnockoutObservable<string> | string;
    }

    export class RefViewModel {
        Ref: KnockoutObservable<string> = ko.observable();

        constructor(private params: iRefParams, componentInfo: KnockoutComponentTypes.ComponentInfo) {
            this.Ref = ko.isObservable(params.Ref) ? params.Ref : ko.observable(params.Ref as string);
            //this.Html = ko.observable(go.AddRefShow(this.GetHtmlFromNodes(componentInfo.templateNodes), params.Show));
        }

        //GetHtmlFromNodes(nodes: Array<any>): any {
        //    let html: string = '';
        //    for (var i = 1, j = nodes.length; i < j; i++) {
        //        html += nodes[i].outerHTML ? nodes[i].outerHTML : nodes[i].data;
        //    }
        //    return html;
        //}

    }

}