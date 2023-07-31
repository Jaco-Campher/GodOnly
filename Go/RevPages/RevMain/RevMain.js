var GO;
(function (GO) {
    var Rev;
    (function (Rev) {
        let Color;
        (function (Color) {
            Color["Default"] = "";
            Color["Rev6"] = "rev6";
            Color["Rev7"] = "rev7";
        })(Color || (Color = {}));
        let FirstLast;
        (function (FirstLast) {
            FirstLast["Default"] = "";
            FirstLast["First"] = "first";
            FirstLast["Last"] = "last";
        })(FirstLast || (FirstLast = {}));
        class RevMainViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Items = ko.observableArray([]);
                this.Joins = ko.observableArray([]);
                this.Links = ko.observableArray([]);
                this.LoadItems();
                this.LoadLinks();
            }
            LoadItems() {
                let item;
                //Seals
                item = new Item(Color.Rev6, 'seal-1', 'Seal 1', 'White Horse', 'Rev 6:1-2', 'Rev 6:1-2', 'white horse: and he that sat on him', '', FirstLast.First);
                this.Items.push(item);
                item = new Item(Color.Rev6, 'seal-2', 'Seal 2', 'Red Horse', 'Rev 6:3-4', 'Rev 6:3-4', '', '');
                this.Items.push(item);
                item = new Item(Color.Rev6, 'seal-3', 'Seal 3', 'Black Horse', 'Rev 6:5-6', 'Rev 6:5-6', '', '');
                this.Items.push(item);
                item = new Item(Color.Rev6, 'seal-4', 'Seal 4', 'Green Horse', 'Rev 6:7-8', 'Rev 6:7-8', '', '');
                this.Items.push(item);
                item = new Item(Color.Rev6, 'seal-5', 'Seal 5', '', 'Rev 6:9-11', 'Rev 6:9-11', '', '');
                this.Items.push(item);
                this.Joins.push(new Join(Color.Rev6, 'j-rev6-11'));
                item = new Item(Color.Rev6, 'seal-6-1', 'Seal 6', 'Sun Became Black as Sackcloth of Hair', 'Rev 6:12', 'Rev 6:12', 'and the moon became as blood;', '');
                this.Items.push(item);
                item = new Item(Color.Rev6, 'seal-6-2', 'Seal 6', 'Stars (Angels) of Heaven Fell Unto the Earth', 'Rev 6:13', 'Rev 6:13', 'Even as a fig tree casteth her untimely figs,', ' when she is shaken of a mighty wind.');
                this.Items.push(item);
                item = new Item(Color.Rev6, 'seal-6-3', 'Seal 6', 'Heaven Departed as a Scroll', 'Rev 6:14', 'Rev 6:14', 'every mountain (kingdom) and island', ' were moved out of their places.');
                this.Items.push(item);
                item = new Item(Color.Rev6, 'seal-6-4', 'Seal 6', 'Kings and Men Hid Themselves', 'Rev 6:15', 'Rev 6:15', '', '');
                this.Items.push(item);
                this.Joins.push(new Join(Color.Rev6, 'j-rev6-15'));
                item = new Item(Color.Rev6, 'seal-6-5', 'Seal 6', '', 'Rev 6:16a', 'Rev 6:16', 'And said to the mountains (kingdoms)', ' and rocks, fall on us,');
                this.Items.push(item);
                item = new Item(Color.Rev6, 'seal-6-6', 'Seal 6', '', 'Rev 6:16b', 'Rev 6:16', 'and hide us from the face of him', 'that sitteth on the throne,');
                this.Items.push(item);
                item = new Item(Color.Rev6, 'seal-6-7', 'Seal 6', 'Great Day of His Wrath is Come', 'Rev 6:17', 'Rev 6:17', 'and who shall be able to stand?', '', FirstLast.Last);
                this.Items.push(item);
                //Matt
                //Mark
                //Luke
                //Songs
                //1 Thess
                //Trumpets
                this.Items.push(new Item(Color.Rev6, 'trump-1', 'Trump 1', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2', FirstLast.First));
            }
            LoadLinks() {
                this.Links.push(new Link('|', 'l-1s', 'l-1e'));
            }
        }
        Rev.RevMainViewModel = RevMainViewModel;
        class Item {
            constructor(color, location, title, subTitle, ref, refDisplay, line1, line2, firstLast = FirstLast.Default) {
                this.TitleLink = '';
                this.SubTitleLink = '';
                this.Line1Link = '';
                this.Line2Link = '';
                this.Color = ko.observable(Color.Default);
                this.Highlight = ko.observable(false);
                this.CSSClass = ko.computed(() => {
                    let css = `${this.Color()} ${this.FirstLast}`;
                    css += this.Highlight() ? ' highlight' : '';
                    return css;
                }, this);
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
            constructor(color, location, firstLast = FirstLast.Default) {
                this.Color = ko.observable(Color.Default);
                //FirstLast: FirstLast;
                this.CSSClass = ko.computed(() => {
                    let css = this.Color();
                    //css +=  this.FirstLast == null ? '' : ` ${this.FirstLast}`;
                    return css;
                }, this);
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
            constructor(type, locationStart, locationEnd) {
                this.Top = false;
                this.Left = false;
                this.Right = false;
                this.Bottom = false;
                this.HighlightTop = ko.observable(false);
                this.HighlightLeft = ko.observable(false);
                this.HighlightMiddle = ko.observable(false);
                this.HighlightRight = ko.observable(false);
                this.HighlightBottom = ko.observable(false);
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
            Highlight(type) {
                this.HighlightMiddle(true);
                if (type == 'a') {
                    this.HighlightTop(true);
                    this.HighlightLeft(true);
                    this.HighlightRight(true);
                    this.HighlightBottom(true);
                    return;
                }
                let types = type.split(' ');
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
    })(Rev = GO.Rev || (GO.Rev = {}));
})(GO || (GO = {}));
