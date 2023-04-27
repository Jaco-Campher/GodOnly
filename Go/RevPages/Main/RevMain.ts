namespace GO.Rev {

    enum Color {
        Rev6 = 'rev6',
        Rev7 = 'rev7'
    }

    export class RevMainViewModel {

        Items: KnockoutObservableArray<Item> = ko.observableArray<Item>([]);

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.LoadItems();
        }

        LoadItems() {
            //Seals
            this.Items.push(new Item('seal-1', 'Seal 1', '', 'Rev 6:', '', '', Color.Rev6));
            this.Items.push(new Item('seal-2', 'Seal 2', '', 'Rev 6:', '', '', Color.Rev6));
            this.Items.push(new Item('seal-3', 'Seal 3', '', 'Rev 6:', '', '', Color.Rev6));
            this.Items.push(new Item('seal-4', 'Seal 4', '', 'Rev 6:', '', '', Color.Rev6));
            this.Items.push(new Item('seal-5', 'Seal 5', '', 'Rev 6:', '', '', Color.Rev6));
            this.Items.push(new Item('seal-6', 'Seal 6', '', 'Rev 6:', '', '', Color.Rev6));
        }

    }

    class Item {
        Title: string;
        SubTitle: string;
        Ref: string;
        Line1: string;
        Line2: string;

        Color: Color;
        Location: string;

        Highlight: KnockoutObservable<boolean> = ko.observable(false);

        CSSClass: KnockoutComputed<string> = ko.computed((): string => {
            let css: string = this.Color;
            css += this.Highlight() ? ' highlight' : '';
            return css;
        }, this);

        constructor(location: string, title: string, subTitle: string, ref: string, line1: string, line2: string, color: Color) {
            this.Title = title;
            this.SubTitle = subTitle;
            this.Ref = ref;
            this.Line1 = line1;
            this.Line2 = line2;

            this.Color = color;
            this.Location = `grid-area: ${location}`;
        }
    }

}