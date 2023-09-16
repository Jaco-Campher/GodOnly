namespace GO.Rev {

    enum Color {
        Default = '',

        Luk21 = 'luk21',

        Mar13 = 'mar13',

        Mat24 = 'mat24',

        Rev6 = 'rev6',
        Rev7 = 'rev7'
    }

    enum FirstLast {
        Default = '',
        First = 'first',
        Last = 'last'
    }

    export class RevMainViewModel {

        Tabs: KnockoutObservableArray<Tab> = ko.observableArray<Tab>([]);
        TabJoins: KnockoutObservableArray<TabJoin> = ko.observableArray<TabJoin>([]);

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.LoadItems();
            this.LoadLinks();
        }

        LoadItems() {
            let tab: Tab;
            let item: Item;

            //Seals
            //************************************************************

            //#region Seal 1
            //*******************************
            tab = new Tab('seal dim', 'tab-seal-1', 'Seal 1');
            item = new Item(Color.Rev6, 'seal-1', 'Seal 1', 'White Horse', 'Rev 6:1-2', 'Rev 6:1-2', 'White horse: and He that sat on him ', '', FirstLast.First);
            tab.Items.push(item);
            this.TabJoins.push(new TabJoin(Color.Rev6, 'tj-seal-1'));
            this.Tabs.push(tab);
            //#endregion


            //#region Seal 2
            //*******************************
            tab = new Tab('seal dim', 'tab-seal-2', 'Seal 2');
            item = new Item(Color.Rev6, 'seal-2', 'Seal 2', 'Red Horse', 'Rev 6:3-4', 'Rev 6:3-4', '', '');
            tab.Items.push(item);
            this.TabJoins.push(new TabJoin(Color.Rev6, 'tj-seal-2'));
            this.Tabs.push(tab);
            //#endregion


            //#region Seal 3
            //*******************************
            tab = new Tab('seal', 'tab-seal-3', 'Seal 3');
            item = new Item(Color.Rev6, 'seal-3', 'Seal 3', 'Black Horse', 'Rev 6:5-6', 'Rev 6:5-6', '', '');
            tab.Items.push(item);
            this.TabJoins.push(new TabJoin(Color.Rev6, 'tj-seal-3'));
            this.Tabs.push(tab);
            //#endregion


            //#region Seal 4
            //*******************************
            tab = new Tab('seal dim', 'tab-seal-4', 'Seal 4');
            item = new Item(Color.Rev6, 'seal-4', 'Seal 4', 'Green Horse', 'Rev 6:7-8', 'Rev 6:7-8', '', '');
            tab.Items.push(item);
            this.TabJoins.push(new TabJoin(Color.Rev6, 'tj-seal-4'));
            this.Tabs.push(tab);
            //#endregion


            //#region Seal 5
            //*******************************
            tab = new Tab('seal dim', 'tab-seal-5', 'Seal 5');
            item = new Item(Color.Rev6, 'seal-5', 'Seal 5', '', 'Rev 6:9-11', 'Rev 6:9-11', '', '');
            tab.Items.push(item);
            this.TabJoins.push(new TabJoin(Color.Rev6, 'tj-seal-5'));
            this.Tabs.push(tab);
            //#endregion


            //#region Seal 6
            //*******************************
            tab = new Tab('seal', 'tab-seal-6', 'Seal 6');
            tab.Joins.push(new Join(Color.Rev6, 'j-rev6-11'));
            item = new Item(Color.Rev6, 'seal-6-1', 'Seal 6', 'Sun Became Black as Sackcloth of Hair', 'Rev 6:12', 'Rev 6:12', 'and the moon became as blood;', '');
            tab.Items.push(item);
            item = new Item(Color.Rev6, 'seal-6-2', 'Seal 6', 'Stars of Heaven Fell unto the Earth', 'Rev 6:13', 'Rev 6:13', 'Even as a fig tree casteth her untimely figs,', ' when she is shaken of a mighty wind.');
            tab.Items.push(item);
            item = new Item(Color.Rev6, 'seal-6-3', 'Seal 6', 'Heaven Departed as a Scroll', 'Rev 6:14', 'Rev 6:14', 'every mountain and island', ' were moved out of their places.');
            tab.Items.push(item);
            item = new Item(Color.Rev6, 'seal-6-4', 'Seal 6', 'Kings and Men hid Themselves', 'Rev 6:15', 'Rev 6:15', '', '');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Rev6, 'j-rev6-15'));
            item = new Item(Color.Rev6, 'seal-6-5', 'Seal 6', '', 'Rev 6:16a', 'Rev 6:16', 'And said to the mountains', ' and rocks, fall on us,');
            tab.Items.push(item);
            item = new Item(Color.Rev6, 'seal-6-6', 'Seal 6', '', 'Rev 6:16b', 'Rev 6:16', 'and hide us from the face of him', 'that sitteth on the throne,');
            tab.Items.push(item);
            item = new Item(Color.Rev6, 'seal-6-7', 'Seal 6', 'Great Day of His Wrath is Come', 'Rev 6:17', 'Rev 6:17', 'and who shall be able to stand?', '', FirstLast.Last);
            tab.Items.push(item);

            //Matt
            tab.Joins.push(new Join(Color.Mat24, 'j-mat-24-29a-s', FirstLast.First));
            item = new Item(Color.Mat24, 'mat-24-29a', '', '', 'Mat 24:29a', 'Mat 24:29', 'Immediately after G3326 the tribulation,', ' of those days.');
            tab.Items.push(item);
            item = new Item(Color.Mat24, 'mat-24-29b', 'Moon Shall Not Give Her Light', 'Shall the Sun be Darkened', 'Mat 24:29b', 'Mat 24:29', '', '');
            tab.Items.push(item);
            item = new Item(Color.Mat24, 'mat-24-29c', '', 'Stars Shall Fall from Heaven', 'Mat 24:29c', 'Mat 24:29', '', '');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Mat24, 'j-mat-24-29c'));
            item = new Item(Color.Mat24, 'mat-24-29d', 'Powers of the Heavens Shall be Shaken', '', 'Mat 24:29d', 'Mat 24:29', '', '');
            tab.Items.push(item);
            item = new Item(Color.Mat24, 'mat-24-30a', 'Sign of the Son of Man in Heaven', '', 'Mat 24:30a', 'Mat 24:30', 'then shall all the tribes', ' of the earth mourn,');
            tab.Items.push(item);
            item = new Item(Color.Mat24, 'mat-24-30b', 'The Son of Man Coming', 'They Shall See', 'Mat 24:30b', 'Mat 24:30', 'in the clouds of heaven', ' with power and great glory.');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Mat24, 'j-mat-24-30b'));
            this.TabJoins.push(new TabJoin(Color.Mat24, 'tj-mat-24-30b'));
            
            //Mark
            tab.Joins.push(new Join(Color.Mar13, 'j-mark-13-24a-s', FirstLast.First));
            item = new Item(Color.Mar13, 'mark-13-24a', '', '', 'Mrk 13:24a', 'Mrk 13:24', 'But in those days,', ' after G3326 that tribulation.');
            tab.Items.push(item);
            item = new Item(Color.Mar13, 'mark-13-24b', 'Moon Shall Not Give Her Light', 'The Sun Shall be Darkened', 'Mrk 13:24b', 'Mrk 13:24', '', '');
            tab.Items.push(item);
            item = new Item(Color.Mar13, 'mark-13-25a', '', 'Stars of Heaven Shall Fall', 'Mrk 13:25a', 'Mrk 13:25', '', '');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Mar13, 'j-mark-13-25a'));
            item = new Item(Color.Mar13, 'mark-13-25b', 'Powers of the Heavens Shall be Shaken', '', 'Mrk 13:25b', 'Mrk 13:25', '', '');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Mar13, 'j-mark-13-25b'));
            item = new Item(Color.Mar13, 'mark-13-26', 'The Son of Man Coming', 'Then Shall They See', 'Mrk 13:26', 'Mrk 13:26', 'in the clouds', ' with great power and glory.');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Mar13, 'j-mark-13-26'));
            this.TabJoins.push(new TabJoin(Color.Mar13, 'tj-mark-13-26'));

            //Luke
            tab.Joins.push(new Join(Color.Luk21, 'j-luke-21-25-s', FirstLast.First));
            item = new Item(Color.Luk21, 'luke-21-25a', 'And in the Moon', 'Shall be Signs in the Sun', 'Luk 21:25a', 'Luk 21:25', '', '');
            tab.Items.push(item);
            item = new Item(Color.Luk21, 'luke-21-25b', '', 'And in the Stars', 'Luk 21:25b', 'Luk 21:25', '', '');
            tab.Items.push(item);
            item = new Item(Color.Luk21, 'luke-21-25c', '', '', 'Luk 21:25c', 'Luk 21:25', 'upon the earth distress of nations, with perplexity;', ' the sea and the waves roaring;');
            tab.Items.push(item);
            item = new Item(Color.Luk21, 'luke-21-26a', 'Men`s Hearts Failing Them for Fear', '', 'Luk 21:26a', 'Luk 21:26', 'looking after those things which are', ' coming on the earth:');
            tab.Items.push(item);
            item = new Item(Color.Luk21, 'luke-21-26b', 'Powers of the Heavens Shall be Shaken', '', 'Luk 21:26b', 'Luk 21:26', '', '');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Luk21, 'j-luke-21-26b'));
            item = new Item(Color.Luk21, 'luke-21-27', 'The Son of Man Coming', 'Then Shall They See', 'Luk 21:27', 'Luk 21:27', 'In a cloud', ' with power and great glory.');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Luk21, 'j-luke-21-27-e', FirstLast.Last));

            //Songs

            //1 Thess


            this.Tabs.push(tab);
            //#endregion


            //#region Rapture
            //*******************************
            tab = new Tab('rapture', 'tab-rapture', 'Rapture');
            //Matt
            item = new Item(Color.Mat24, 'mat-24-31a', 'With a Great Sound of a Trumpet', 'He Shall Send His Angels', 'Mat 24:31a', 'Mat 24:31', '', '');
            tab.Items.push(item);
            item = new Item(Color.Mat24, 'mat-24-31b', 'They Shall Gather Together His Elect', '4 Winds', 'Mat 24:31b', 'Mat 24:31', 'shall gather together his elect from the four winds, ', '');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Mat24, 'j-mat-24-31b-e', FirstLast.Last));

            //Mark
            item = new Item(Color.Mar13, 'mark-13-27a', '', 'Then Shall He Send His Angels', 'Mrk 13:27a', 'Mrk 13:27', '', '');
            tab.Items.push(item);
            item = new Item(Color.Mar13, 'mark-13-27b', 'Shall Gather Together His Elect', '4 Winds', 'Mrk 13:27b', 'Mrk 13:27', 'shall gather together his elect from the four winds,', 'from the uttermost part of the earth…');
            tab.Items.push(item);
            tab.Joins.push(new Join(Color.Mar13, 'j-mark-13-27b-e', FirstLast.Last));


            //Luke


            this.Tabs.push(tab);
            //#endregion


            //#region 144K
            //*******************************
            tab = new Tab('k144', 'tab-144', '144 000');

            this.Tabs.push(tab);
            //#endregion



            //Trumpets
            //this.Items.push(new Item(Color.Rev6, 'trump-1', 'Trump 1', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2', FirstLast.First));
        }

        LoadLinks() {
            //this.Links.push(new Link('|', 'l-1s', 'l-1e'));
        }
    }

    class Tab {
        BaseCSSClass: string;
        Location: string;
        Name: string;

        Expanded: KnockoutObservable<boolean> = ko.observable<boolean>(true);

        CSSClass: KnockoutComputed<string>;

        Items: KnockoutObservableArray<Item> = ko.observableArray<Item>([]);
        Joins: KnockoutObservableArray<Join> = ko.observableArray<Join>([]);
        Links: KnockoutObservableArray<Link> = ko.observableArray<Link>([]);

        constructor(cssClass: string, location: string, name: string) {
            this.BaseCSSClass = cssClass;
            this.Location = `grid-area: ${location}`;
            this.Name = name;

            this.CSSClass = ko.computed((): string => {
                let css: string = `${this.BaseCSSClass} ${this.Location}`;
                css += this.Expanded() ? ' expanded' : '';
                return css;
            }, this);
        }

        OpenClose = () => {
            this.Expanded(!this.Expanded());
        }
    }

    class TabJoin {
        Color: KnockoutObservable<Color> = ko.observable<Color>(Color.Default);
        Style: string;

        CSSClass: KnockoutComputed<string> = ko.computed((): string => {
            let css: string = this.Color();
            return css;
        }, this);

        constructor(color: Color, location: string) {
            this.Color(color);
            this.Style = `grid-area: ${location};`;
        }
    }

    class Item {
        Title: string;
        SubTitle: string;
        Ref: string;
        RefDisplay: string;
        Line1: string;
        Line2: string;

        TitleLink: string = '';
        SubTitleLink: string = '';
        Line1Link: string = '';
        Line2Link: string = '';

        Color: KnockoutObservable<Color> = ko.observable<Color>(Color.Default);
        Location: string;
        FirstLast: FirstLast;

        Highlight: KnockoutObservable<boolean> = ko.observable(false);

        CSSClass: KnockoutComputed<string> = ko.computed((): string => {
            let css: string = `${this.Color()} ${this.FirstLast}`;
            css += this.Highlight() ? ' highlight' : '';
            return css;
        }, this);

        constructor(color: Color, location: string, title: string, subTitle: string, refDisplay: string, ref: string, line1: string, line2: string, firstLast: FirstLast = FirstLast.Default) {
            this.Title = title;
            this.SubTitle = subTitle;
            this.Ref = ref;
            this.RefDisplay = refDisplay;
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
            return css;
        }, this);

        constructor(color: Color, location: string, firstLast: FirstLast = FirstLast.Default) {
            this.Color(color);
            this.Style = `grid-area: ${location};`;
            //this.FirstLast = firstLast;

            switch (firstLast) {
                case FirstLast.First:
                    this.Style += `background:linear-gradient(90deg, #0000, var(--${color}));`;
                    break;
                case FirstLast.Last:
                    this.Style += `background:linear-gradient(90deg, var(--${color}), #0000);`;
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