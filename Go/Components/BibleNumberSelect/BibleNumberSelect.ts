namespace GO.Compnents {
    interface iBibleNumberSelectOptions {
        StartNumber?: number | KnockoutObservable<number>;
        EndNumber: number | KnockoutObservable<number>;
        SelectedFunc: (num: number) => any;
    }

    export class BibleNumberSelectViewModel {

        //Numbers: KnockoutObservableArray<number> = ko.observableArray<number>([]);
        Select: (num: number) => any;

        StartNumber: KnockoutObservable<number> = ko.observable<number>();
        EndNumber: KnockoutObservable<number>;

        Numbers: KnockoutComputed<Array<number>>;

        constructor(params: iBibleNumberSelectOptions) {
            this.Select = params.SelectedFunc;

            if (params.StartNumber == undefined) {
                this.StartNumber = ko.observable(1);
            }
            else {
                this.StartNumber = ko.isObservable(params.StartNumber) ? params.StartNumber : ko.observable(params.StartNumber as number);
            }

            this.EndNumber = ko.isObservable(params.EndNumber) ? params.EndNumber : ko.observable(params.EndNumber as number);


            this.Numbers = ko.computed((): Array<number> => {
                let numbers: Array<number> = [];

                for (let i = this.StartNumber(); i <= this.EndNumber(); i++) {
                    numbers.push(i);
                }

                return numbers;
            }, this);
        }

    }
}