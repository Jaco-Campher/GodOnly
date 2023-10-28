"use strict";
var GO;
(function (GO) {
    var Rev;
    (function (Rev) {
        let Color;
        (function (Color) {
            Color["Default"] = "";
            Color["Es2"] = "es2";
            Color["Es5"] = "es5";
            Color["Es15"] = "es15";
            Color["Luk21"] = "luk21";
            Color["Mar13"] = "mar13";
            Color["Mat24"] = "mat24";
            Color["Rev6"] = "rev6";
            Color["Rev7"] = "rev7";
            Color["Song2"] = "song2";
            Color["Thess4"] = "thess4";
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
                this.Tabs = ko.observableArray([]);
                this.TabJoins = ko.observableArray([]);
                this.LoadItems();
                this.LoadLinks();
            }
            LoadItems() {
                let tab;
                let item;
                //#region Rev 12 Sign
                //*******************************
                tab = new Tab('rev-12', 'tab-rev-12', 'Rev 12 Sign');
                this.Tabs.push(tab);
                //#endregion
                //#region Rev 12 Another Sign
                //*******************************
                tab = new Tab('rev-12-2', 'tab-rev-12-2', 'Another Sign');
                this.Tabs.push(tab);
                //#endregion
                //Seals
                //************************************************************
                //#region Seal 1
                //*******************************
                tab = new Tab('seal', 'tab-seal-1', 'Seal 1');
                item = new Item(Color.Rev6, 'seal-1', 'Seal 1', 'White Horse', 'Rev 6:1-2', 'Rev 6:1-2', 'White horse: and He that sat on him ', '', FirstLast.First);
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev6, 'tj-seal-1'));
                this.Tabs.push(tab);
                //#endregion
                //#region Seal 2
                //*******************************
                tab = new Tab('seal', 'tab-seal-2', 'Seal 2');
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
                tab = new Tab('seal', 'tab-seal-4', 'Seal 4');
                item = new Item(Color.Rev6, 'seal-4', ' Kill with Sword, Hunger, Death', 'Green Horse', 'Rev 6:7-8', 'Rev 6:7-8', 'Power over the fourth part of the earth.', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev6, 'tj-seal-4'));
                this.Tabs.push(tab);
                //#endregion
                //#region Seal 5
                //*******************************
                tab = new Tab('seal', 'tab-seal-5', 'Seal 5');
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
                tab.Joins.push(new Join(Color.Song2, 'j-song-2-13-s', FirstLast.First));
                item = new Item(Color.Song2, 'song-2-13a', '', '', 'Sng 2:13a', 'Sng 2:13', 'The fig tree putteth forth her green figs,', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Song2, 'j-song-2-13a'));
                this.TabJoins.push(new TabJoin(Color.Song2, 'tj-song-2-13a'));
                //1 Thess 4
                tab.Joins.push(new Join(Color.Thess4, 'j-1thess-4-16a-s', FirstLast.First));
                item = new Item(Color.Thess4, 'thess-4-16a', 'Yah Himself Shall Descend From Heaven', '', '1Th 4:16a', '1Th 4:16', 'with a shout,', ' with the voice of the archangel,');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Thess4, 'j-1thess-4-16a'));
                this.TabJoins.push(new TabJoin(Color.Thess4, 'tj-1thess-4-16a'));
                //2 Esdras 15
                tab.Joins.push(new Join(Color.Es15, 'j-es2-15-8b'));
                this.TabJoins.push(new TabJoin(Color.Es15, 'tj-es2-15-8b'));
                this.Tabs.push(tab);
                //#endregion
                //#region Rapture
                //*******************************
                tab = new Tab('rapture', 'tab-rapture', 'Rapture');
                //Matt
                tab.Joins.push(new Join(Color.Mat24, 'j-mat-24-31a'));
                item = new Item(Color.Mat24, 'mat-24-31a', 'With a Great Sound of a Trumpet', 'He Shall Send His Angels', 'Mat 24:31a', 'Mat 24:31', '', '');
                tab.Items.push(item);
                item = new Item(Color.Mat24, 'mat-24-31b', 'They Shall Gather Together His Elect', '4 Winds', 'Mat 24:31b', 'Mat 24:31', 'shall gather together his elect from the four winds, ', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mat24, 'j-mat-24-31b-e', FirstLast.Last));
                //Mark
                tab.Joins.push(new Join(Color.Mar13, 'j-mark-13-27a'));
                item = new Item(Color.Mar13, 'mark-13-27a', '', 'Then Shall He Send His Angels', 'Mrk 13:27a', 'Mrk 13:27', '', '');
                tab.Items.push(item);
                item = new Item(Color.Mar13, 'mark-13-27b', 'Shall Gather Together His Elect', '4 Winds', 'Mrk 13:27b', 'Mrk 13:27', 'shall gather together his elect from the four winds,', 'from the uttermost part of the earth…');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mar13, 'j-mark-13-27b-e', FirstLast.Last));
                //Song
                tab.Joins.push(new Join(Color.Song2, 'j-song-2-13b'));
                item = new Item(Color.Song2, 'song-2-13b', '', '', 'Sng 2:13b', 'Sng 2:13', 'Arise, my love, my fair one,', '');
                tab.Items.push(item);
                item = new Item(Color.Song2, 'song-2-13c', '', '', 'Sng 2:13c', 'Sng 2:13', ' and come away.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Song2, 'j-song-2-13-e', FirstLast.Last));
                //2 Esdras 5
                item = new Item(Color.Es5, 'es2-5-1', 'Taken in a Great Number', '', '2Es 5:1', '2Es 5:1', 'Way of truth shall be hidden.', 'Land shall be barren of faith.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es5, 'j-es2-5-1'));
                this.TabJoins.push(new TabJoin(Color.Es5, 'tj-es2-5-1'));
                //1 Thess 4
                tab.Joins.push(new Join(Color.Thess4, 'j-thess-4-16b'));
                item = new Item(Color.Thess4, 'thess-4-16b', 'The Dead in Christ Shall Rise First', 'With the Trump of God', '1Th 4:16b', '1Th 4:16', '', '');
                tab.Items.push(item);
                item = new Item(Color.Thess4, 'thess-4-17', 'Caught Up Together', 'We Which are Alive', '1Th 4:16b', '1Th 4:16', 'With them in the clouds,', ' to meet the Lord in the air:');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Thess4, 'j-thess-4-17-e', FirstLast.Last));
                //2 Esdras 2
                tab.Joins.push(new Join(Color.Es2, 'j-es2-2-36-s', FirstLast.First));
                item = new Item(Color.Es2, 'es2-2-36', '', '', '2Es 2:36', '2Es 2:36', 'receive the joyfulness of your glory.', ' I testify my Saviour openly.');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-2-37', '', '', '2Es 2:37', '2Es 2:37', 'O receive the gift that is given you, and be glad,', ' giving thanks unto Him that hath led you to the heavenly kingdom.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-2-37'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-2-37'));
                //2 Esdras 15
                tab.Joins.push(new Join(Color.Es15, 'j-es2-15-9'));
                item = new Item(Color.Es15, 'es2-15-9', '', '', '2Es 15:9', '2Es 15:9', 'And receive unto me all the innocent blood.', '');
                tab.Items.push(item);
                item = new Item(Color.Es15, 'es2-15-10', '', '', '2Es 15:10-11a', '2Es 15:10-11', 'I will not suffer them now to dwell in the land of Egypt:', 'But I will bring them with a mighty hand and a stretched out arm.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es15, 'j-es2-15-11a'));
                this.TabJoins.push(new TabJoin(Color.Es15, 'tj-es2-15-11a'));
                //Dan
                this.Tabs.push(tab);
                //#endregion
                //#region 144K
                //*******************************
                tab = new Tab('k144', 'tab-144', '144 000');
                this.Tabs.push(tab);
                //#endregion
                //#region Seal 7
                //*******************************
                tab = new Tab('seal', 'tab-seal-7', 'Seal 7 Start');
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 1
                //*******************************
                tab = new Tab('trumpet', 'tab-trumpet-1', 'Trumpet 1');
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 2
                //*******************************
                tab = new Tab('trumpet', 'tab-trumpet-2', 'Trumpet 2');
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 3
                //*******************************
                tab = new Tab('trumpet', 'tab-trumpet-3', 'Trumpet 3');
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 4
                //*******************************
                tab = new Tab('trumpet', 'tab-trumpet-4', 'Trumpet 4');
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 5
                //*******************************
                tab = new Tab('trumpet', 'tab-trumpet-5', 'Trumpet-5');
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 6
                //*******************************
                tab = new Tab('trumpet', 'tab-trumpet-6', 'Trumpet 6');
                this.Tabs.push(tab);
                //#endregion
                //#region 2 Witnesses
                //*******************************
                tab = new Tab('witnesses', 'tab-2-wit', '2 Witnesses');
                this.Tabs.push(tab);
                //#endregion
                //#region Ascension
                //*******************************
                tab = new Tab('ascension', 'tab-ascension', 'Ascension');
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 7
                //*******************************
                tab = new Tab('trumpet', 'tab-trumpet-7', 'Trumpet 7');
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 1
                //*******************************
                tab = new Tab('vial', 'tab-vial-1', 'Vial 1');
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 2
                //*******************************
                tab = new Tab('vial', 'tab-vial-2', 'Vial 2');
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 3
                //*******************************
                tab = new Tab('vial', 'tab-vial-3', 'Vial 3');
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 4
                //*******************************
                tab = new Tab('vial', 'tab-vial-4', 'Vial 4');
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 5
                //*******************************
                tab = new Tab('vial', 'tab-vial-5', 'Vial 5');
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 6
                //*******************************
                tab = new Tab('vial', 'tab-vial-6', 'Vial 6');
                this.Tabs.push(tab);
                //#endregion
                //#region Come as a Thief
                //*******************************
                tab = new Tab('thief', 'tab-thief', 'Come as a Thief');
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 7
                //*******************************
                tab = new Tab('vial', 'tab-vial-7', 'Vial 7');
                this.Tabs.push(tab);
                //#endregion
                //#region Pre 1000 Years
                //*******************************
                tab = new Tab('pre-1000', 'tab-pre-1000', 'Pre 1000 Years');
                this.Tabs.push(tab);
                //#endregion
                //#region 1000 Years
                //*******************************
                tab = new Tab('y1000', 'tab-1000', '1000 Years');
                this.Tabs.push(tab);
                //#endregion
                //#region End 1000 Years
                //*******************************
                tab = new Tab('end-1000', 'tab-end-1000', 'End 1000 Years');
                this.Tabs.push(tab);
                //#endregion
                //#region Judgement
                //*******************************
                tab = new Tab('judgement', 'tab-judgement', 'Judgement');
                this.Tabs.push(tab);
                //#endregion
                //Trumpets
                //this.Items.push(new Item(Color.Rev6, 'trump-1', 'Trump 1', 'Subtitle', 'Rev 6:', 'Rev 6:', 'Line 1', 'Line 2', FirstLast.First));
            }
            LoadLinks() {
                //this.Links.push(new Link('|', 'l-1s', 'l-1e'));
            }
        }
        Rev.RevMainViewModel = RevMainViewModel;
        class Tab {
            constructor(cssClass, location, name) {
                this.Expanded = ko.observable(false);
                this.Items = ko.observableArray([]);
                this.Joins = ko.observableArray([]);
                this.Links = ko.observableArray([]);
                this.OpenClose = () => {
                    this.Expanded(!this.Expanded());
                };
                this.BaseCSSClass = cssClass;
                this.Style = `grid-area: ${location}; --tab-image: url(../../Images/Rev/${location}.png)`;
                this.Name = name;
                this.CSSClass = ko.computed(() => {
                    let css = `${this.BaseCSSClass} ${location}`;
                    css += this.Expanded() ? ' expanded' : '';
                    return css;
                }, this);
            }
        }
        class TabJoin {
            constructor(color, location) {
                this.Color = ko.observable(Color.Default);
                this.CSSClass = ko.computed(() => {
                    let css = this.Color();
                    return css;
                }, this);
                this.Color(color);
                this.Style = `grid-area: ${location};`;
            }
        }
        class Item {
            constructor(color, location, title, subTitle, refDisplay, ref, line1, line2, firstLast = FirstLast.Default) {
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
                    return css;
                }, this);
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
