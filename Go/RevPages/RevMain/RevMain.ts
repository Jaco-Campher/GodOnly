namespace GO.Rev {

    enum Color {
        Default = '',
        Rev6 = 'rev6',
        Rev7 = 'rev7'
    }

    enum FirstLast {
        Default = '',
        First = 'first',
        Last = 'last'
    }

    export class RevMainViewModel {

        Items: KnockoutObservableArray<Item> = ko.observableArray<Item>([]);
        Joins: KnockoutObservableArray<Join> = ko.observableArray<Join>([]);
        Links: KnockoutObservableArray<Link> = ko.observableArray<Link>([]);

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.LoadItems();
            this.LoadLinks();
        }

        LoadItems() {
            let item: Item;

            //Seals
            item = new Item(Color.Rev6, 'seal-1', 'Seal 1', 'Subtitle', 'Rev 6:12a', 'Rev 6:12', 'Line 1', 'Line 2', FirstLast.First);
            item.TitleLink = '';
            this.Items.push(item);


            this.Items.push(new Item(Color.Rev6, 'seal-2', 'Seal 2', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Tormented with fire and brimstone warning.', 'Line 2'));
            this.Items.push(new Item(Color.Rev6, 'seal-3', 'Seal 3', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2'));
            this.Items.push(new Item(Color.Rev6, 'seal-4', 'Seal 4', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2'));
            this.Items.push(new Item(Color.Rev6, 'seal-5', 'Seal 5', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2'));
            this.Items.push(new Item(Color.Rev6, 'seal-6', 'Seal 6', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2'));
            this.Joins.push(new Join(Color.Rev6, 'j-1', FirstLast.Last));


            //Trumpets
            this.Items.push(new Item(Color.Rev6, 'trump-1', 'Trump 1', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2', FirstLast.First));


            //Testing
            this.Joins.push(new Join(Color.Rev7, 'j-2', FirstLast.First));
            this.Items.push(new Item(Color.Rev7, 'test-1', 'Test 1', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2'));
            this.Items.push(new Item(Color.Rev7, 'test-2', 'Test 2', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2'));
            this.Joins.push(new Join(Color.Rev7, 'j-3'));
        }

        LoadLinks() {
            this.Links.push(new Link('|', 'l-1s', 'l-1e'));
        }
    }

    class Item {
        Title: string;
        SubTitle: string;
        Ref: string;
        RefDisplay: string;
        Line1: string;
        Line2: string;

        TitleLink: string;
        SubTitleLink: string;
        Line1Link: string;
        Line2Link: string;

        Color: KnockoutObservable<Color> = ko.observable<Color>(Color.Default);
        Location: string;
        FirstLast: FirstLast;

        Highlight: KnockoutObservable<boolean> = ko.observable(false);

        CSSClass: KnockoutComputed<string> = ko.computed((): string => {
            let css: string = `${this.Color()} ${this.FirstLast}`;
            css += this.Highlight() ? ' highlight' : '';
            return css;
        }, this);

        constructor(color: Color, location: string, title: string, subTitle: string, ref: string, refDisplay: string, line1: string, line2: string, firstLast: FirstLast = FirstLast.Default) {
            this.Title = title;
            this.SubTitle = subTitle;
            this.Ref = ref;
            this.Line1 = line1;
            this.Line2 = line2;

            this.Color(color);
            this.Location = `grid-area: ${location}`;
            this.FirstLast = firstLast;
        }
    }

    class Join {
        Color: KnockoutObservable<Color> = ko.observable<Color>(Color.Default);
        Style: string;
        //FirstLast: FirstLast;

        CSSClass: KnockoutComputed<string> = ko.computed((): string => {
            let css: string = this.Color();
            //css +=  this.FirstLast == null ? '' : ` ${this.FirstLast}`;
            return css;
        }, this);

        constructor(color: Color, location: string, firstLast: FirstLast = FirstLast.Default) {
            this.Color(color);
            this.Style = `grid-area: ${location};`;
            //this.FirstLast = firstLast;

            switch (firstLast) {
                case FirstLast.First:
                    this.Style += `background: linear-gradient(90deg, #0000, var(--${color}));`;
                    break;
                case FirstLast.Last:
                    this.Style += `background: linear-gradient(90deg, var(--${color}), #0000);`;
                    break;

                default:
            }
        }
    }

    class Link {
        Location: string;

        Top: boolean = false;
        Left: boolean = false;
        Right: boolean = false;
        Bottom: boolean = false;

        HighlightTop: KnockoutObservable<boolean> = ko.observable(false);
        HighlightLeft: KnockoutObservable<boolean> = ko.observable(false);
        HighlightMiddle: KnockoutObservable<boolean> = ko.observable(false);
        HighlightRight: KnockoutObservable<boolean> = ko.observable(false);
        HighlightBottom: KnockoutObservable<boolean> = ko.observable(false);

        constructor(type: string, locationStart: string, locationEnd: string) {
            if (locationStart == locationEnd) {
                this.Location = `grid-area: ${locationStart}`;
            }
            else {
                this.Location = `grid-area: ${locationStart}-start / ${locationStart}-start / ${locationEnd}-end / ${locationEnd}-end`;
            }
            

            switch (type) {
                case '+':
                    this.Top = true;

                case 'T':
                    this.Bottom = true;

                case '-':
                    this.Left = true;
                    this.Right = true;
                    break;

                case 'u':
                    this.Top = true;
                    this.Left = true;
                    this.Right = true;
                    break;

                case '[':
                    this.Bottom = true;
                    this.Right = true;
                    break;

                case ']':
                    this.Bottom = true;
                    this.Left = true;
                    break;

                case '|':
                    this.Top = true;
                    this.Bottom = true;

                default:
            }
        }

        Highlight(type: string) {
            this.HighlightMiddle(true);

            if (type == 'a') {
                this.HighlightTop(true);
                this.HighlightLeft(true);
                this.HighlightRight(true);
                this.HighlightBottom(true);
                return;
            }

            let types: Array<string> = type.split(' ');

            for (let direction of types) {
                switch (direction) {
                    case 't':
                        this.HighlightTop(true);
                        break;

                    case 'l':
                        this.HighlightLeft(true);
                        break;

                    case 'r':
                        this.HighlightRight(true);
                        break;

                    //case 'b':
                    default:
                        this.HighlightBottom(true);
                }
            }
        }

    }

}