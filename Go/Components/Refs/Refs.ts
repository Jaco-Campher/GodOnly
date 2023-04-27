namespace GO.Compnents {

    interface iRefsParams {
        Refs: KnockoutObservableArray<iRef> | Array<iRef>;
    }

    export class RefsViewModel {

        Refs: KnockoutObservableArray<iRef>;

        constructor(params: iRefsParams) {
            this.Refs = ko.isObservable(params.Refs) ? params.Refs : ko.observableArray(params.Refs);
        }

    }
}