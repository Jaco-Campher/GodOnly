"use strict";
var GO;
(function (GO) {
    var Rev;
    (function (Rev) {
        let Color;
        (function (Color) {
            Color["Rev6"] = "rev6";
            Color["Rev7"] = "rev7";
        })(Color || (Color = {}));
        class RevMainViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Items = ko.observableArray([]);
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
        Rev.RevMainViewModel = RevMainViewModel;
        class Item {
            constructor(location, title, subTitle, ref, line1, line2, color) {
                this.Highlight = ko.observable(false);
                this.CSSClass = ko.computed(() => {
                    let css = this.Color;
                    css += this.Highlight() ? ' highlight' : '';
                    return css;
                }, this);
                this.Title = title;
                this.SubTitle = subTitle;
                this.Ref = ref;
                this.Line1 = line1;
                this.Line2 = line2;
                this.Color = color;
                this.Location = `grid-area: ${location}`;
            }
        }
    })(Rev = GO.Rev || (GO.Rev = {}));
})(GO || (GO = {}));
