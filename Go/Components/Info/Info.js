var GO;
(function (GO) {
    var Compnents;
    (function (Compnents) {
        class InfoViewModel {
            constructor(params, componentInfo) {
                this.Show = ko.observable(false);
                this.Title = params.Title;
            }
            //GetHtmlFrommNodes(nodes: Array<any>): any {
            //    let html: string = '';
            //    for (var i = 1, j = nodes.length; i < j; i++) {
            //        html += nodes[i].outerHTML ? nodes[i].outerHTML : nodes[i].data;
            //    }
            //    return html;
            //}
            ShowHide() {
                this.Show(!this.Show());
            }
        }
        Compnents.InfoViewModel = InfoViewModel;
    })(Compnents = GO.Compnents || (GO.Compnents = {}));
})(GO || (GO = {}));
