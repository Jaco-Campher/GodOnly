"use strict";
var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        let Color;
        (function (Color) {
            Color["Default"] = "";
            Color["Ba2"] = "ba2";
            Color["Es2"] = "es2";
            Color["Luk"] = "luk";
            Color["Mrk"] = "mrk";
            Color["Mat"] = "mat";
            Color["Rev"] = "rev";
            Color["Sng"] = "sng";
            Color["Th1"] = "th1";
        })(Color || (Color = {}));
        let FirstLast;
        (function (FirstLast) {
            FirstLast["Default"] = "";
            FirstLast["First"] = "first";
            FirstLast["Last"] = "last";
        })(FirstLast || (FirstLast = {}));
        class RevelationTimelineViewModel {
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
                tab = new Tab('rev-12', 'tab-rev-12', 'Rev 12 Sign', '23 Sep 2017');
                item = new Item(Color.Rev, 'rev-12-1', 'A Woman Clothed with the Sun', 'Great Wonder in Heaven', 'Rev 12:2', 'Rev 12:2', ' and the moon under her feet,', 'upon her head a crown of twelve stars:', FirstLast.First);
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-12-2', 'Travailing in Birth, and Pained to be Delivered', 'And She Being with Child Cried', 'Rev 12:2', 'Rev 12:2', '', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-12-2'));
                this.Tabs.push(tab);
                //#endregion
                //#region Rev 12 Another Sign
                //*******************************
                tab = new Tab('rev-12-2', 'tab-rev-12-2', 'Another Sign');
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-12-3'));
                this.Tabs.push(tab);
                //#endregion
                //Seals
                //************************************************************
                //#region Seal 1
                //*******************************
                tab = new Tab('seal', 'tab-seal-1', 'Seal 1');
                item = new Item(Color.Rev, 'rev-6-1', 'I Heard, as it were the Noise of Thunder', 'The Lamb Opened One of the Seals', 'Rev 6:1', 'Rev 6:1', 'One of the four {beasts|G2226} saying,', 'Come and see.', FirstLast.First);
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-2', 'Had a Bow; and a Crown was Given unto Him', 'White Horse: and He that Sat on Him ', 'Rev 6:2', 'Rev 6:2', ' and he went forth conquering, and to conquer.', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-1'));
                this.Tabs.push(tab);
                //#endregion
                //#region Seal 2
                //*******************************
                tab = new Tab('seal', 'tab-seal-2', 'Seal 2');
                item = new Item(Color.Rev, 'rev-6-3', 'Was Given to Him that Sat Thereon to Take Peace From the Earth', 'Red Horse', 'Rev 6:3-4', 'Rev 6:3-4', ' that they should kill one another:', ' and there was given unto him a great sword.');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-2'));
                this.Tabs.push(tab);
                //#endregion
                //#region Seal 3
                //*******************************
                tab = new Tab('seal', 'tab-seal-3', 'Seal 3');
                item = new Item(Color.Rev, 'rev-6-5', 'Had a Pair of Balances in His Hand', 'Black Horse', 'Rev 6:5', 'Rev 6:5', '', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-6', 'Three {Measures|G5518} of Barley for a Penny ', 'A {Measure|G5518} of Wheat for a Penny ', 'Rev 6:6', 'Rev 6:6', ' and see thou hurt not the oil and the wine.', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-3'));
                this.Tabs.push(tab);
                //#endregion
                //#region Seal 4
                //*******************************
                tab = new Tab('seal', 'tab-seal-4', 'Seal 4');
                item = new Item(Color.Rev, 'rev-6-7', 'His Name that Sat on Him was Death', '{Pale|G5515} Horse', 'Rev 6:7-8a', 'Rev 6:7-8', 'and Hell followed with him.', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-8b', 'Kill with Sword, {Hunger|G3042|Famine}, Death', 'Power was Given unto Them over the Fourth Part of the Earth', 'Rev 6:8b', 'Rev 6:8', ' and with the beasts of the earth.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-6-8b'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-4'));
                //2 Esdras 15
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-5-s', FirstLast.First));
                item = new Item(Color.Es2, 'es2-15-5', 'Sword, Famine, Death', '', '2Es 15:5', '2Es 15:5', 'Behold, saith the Lord,', ' I will bring plagues upon the world;');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-15-6', '', 'For Wickedness Hath Exceedingly Polluted', '2Es 15:6', '2Es 15:6', 'the whole earth,', 'and their hurtful works are fulfilled.');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-15-6'));
                this.Tabs.push(tab);
                //#endregion
                //#region Seal 5
                //*******************************
                tab = new Tab('seal', 'tab-seal-5', 'Seal 5');
                //Rev 6
                item = new Item(Color.Rev, 'rev-6-9', 'Under the Altar the Souls', '', 'Rev 6:9', 'Rev 6:9', ' of them that were slain for the word of God,', ' and for the testimony which they held:');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-6-9'));
                item = new Item(Color.Rev, 'rev-6-10', 'Saying, How Long, O Lord, Holy and True', 'They Cried With a Loud Voice', 'Rev 6:10', 'Rev 6:10', 'Dost thou not judge and avenge our blood', ' on them that dwell on the earth?');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-11', 'White Robes were Given Unto Every One of Them', '', 'Rev 6:11', 'Rev 6:11', 'said unto them, that they should rest yet for a little season', 'until their fellowservants also … should be fulfilled.');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-5'));
                //2 Esdras 15
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-15-8b'));
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-7'));
                item = new Item(Color.Es2, 'es2-15-7', 'As Touching Their Wickedness', 'I Will Hold My Tongue No More', '2Es 15:7-8a', '2Es 15:7-8', 'neither will I suffer them in those things,', '  in which they wickedly exercise themselves:');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-15-8b', '', '', '2Es 15:8b', '2Es 15:8', 'The innocent and righteous blood crieth unto me,', ' and the souls of the just complain continually.');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-15-9', 'I Will Surely Avenge Them', 'And Therefore Saith the Lord', '2Es 15:9', '2Es 15:9', ' and receive unto me all the innocent blood.', '');
                tab.Items.push(item);
                this.Tabs.push(tab);
                //#endregion
                //#region Seal 6
                //*******************************
                tab = new Tab('seal', 'tab-seal-6', 'Seal 6');
                //Rev 6
                tab.Joins.push(new Join(Color.Rev, 'j-rev6-11'));
                item = new Item(Color.Rev, 'seal-6-1', 'The Moon Became as Blood', 'Sun Became Black as Sackcloth of Hair', 'Rev 6:12', 'Rev 6:12', '', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'seal-6-2', 'Stars of Heaven Fell unto the Earth', '', 'Rev 6:13', 'Rev 6:13', 'Even as a fig tree casteth her untimely figs,', ' when she is shaken of a mighty wind.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'seal-6-3', 'Heaven Departed as a Scroll', '', 'Rev 6:14', 'Rev 6:14', 'every mountain and island', ' were moved out of their places.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'seal-6-4', 'Kings and Men hid Themselves', '', 'Rev 6:15', 'Rev 6:15', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev6-15'));
                item = new Item(Color.Rev, 'rev-6-16', 'Seal 6', '', 'Rev 6:16a', 'Rev 6:16', 'And said to the mountains', ' and rocks, fall on us,');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-6-16'));
                //Rev 12
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-3'));
                item = new Item(Color.Rev, 'rev-12-4', 'Stars of Heaven and Did Cast Them to the Earth', 'his tail Drew the Third Part of the', 'Rev 12:4', 'Rev 12:4', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-4'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-12-4'));
                //Matt
                tab.Joins.push(new Join(Color.Mat, 'j-mat-24-29a-s', FirstLast.First));
                item = new Item(Color.Mat, 'mat-24-29a', '', '', 'Mat 24:29a', 'Mat 24:29', 'Immediately {after|G3326} the tribulation,', ' of those days.');
                tab.Items.push(item);
                item = new Item(Color.Mat, 'mat-24-29b', 'Moon Shall Not Give Her Light', 'Shall the Sun be Darkened', 'Mat 24:29b', 'Mat 24:29', '', '');
                tab.Items.push(item);
                item = new Item(Color.Mat, 'mat-24-29c', 'Stars Shall Fall from Heaven', '', 'Mat 24:29c', 'Mat 24:29', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mat, 'j-mat-24-29c'));
                item = new Item(Color.Mat, 'mat-24-29d', 'Powers of the Heavens Shall be Shaken', '', 'Mat 24:29d', 'Mat 24:29', '', '');
                tab.Items.push(item);
                item = new Item(Color.Mat, 'mat-24-30a', 'Sign of the Son of Man in Heaven', '', 'Mat 24:30a', 'Mat 24:30', 'then shall all the tribes', ' of the earth mourn,');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Mat, 'tj-mat-24-30b'));
                //Mark
                tab.Joins.push(new Join(Color.Mrk, 'j-mark-13-24a-s', FirstLast.First));
                item = new Item(Color.Mrk, 'mark-13-24a', '', '', 'Mrk 13:24a', 'Mrk 13:24', 'But in those days,', ' {after|G3326} that tribulation.');
                tab.Items.push(item);
                item = new Item(Color.Mrk, 'mark-13-24b', 'Moon Shall Not Give Her Light', 'The Sun Shall be Darkened', 'Mrk 13:24b', 'Mrk 13:24', '', '');
                tab.Items.push(item);
                item = new Item(Color.Mrk, 'mark-13-25a', 'Stars of Heaven Shall Fall', '', 'Mrk 13:25a', 'Mrk 13:25', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mrk, 'j-mark-13-25a'));
                item = new Item(Color.Mrk, 'mark-13-25b', 'Powers of the Heavens Shall be Shaken', '', 'Mrk 13:25b', 'Mrk 13:25', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mrk, 'j-mark-13-25b'));
                this.TabJoins.push(new TabJoin(Color.Mrk, 'tj-mark-13-26'));
                //Luke
                tab.Joins.push(new Join(Color.Luk, 'j-luke-21-25-s', FirstLast.First));
                item = new Item(Color.Luk, 'luke-21-25a', 'And in the Moon', 'Shall be Signs in the Sun', 'Luk 21:25a', 'Luk 21:25', '', '');
                tab.Items.push(item);
                item = new Item(Color.Luk, 'luke-21-25b', 'And in the Stars', '', 'Luk 21:25b', 'Luk 21:25', '', '');
                tab.Items.push(item);
                item = new Item(Color.Luk, 'luke-21-25c', '', '', 'Luk 21:25c', 'Luk 21:25', 'upon the earth distress of nations, with perplexity;', ' the sea and the waves roaring;');
                tab.Items.push(item);
                item = new Item(Color.Luk, 'luke-21-26a', 'Men`s Hearts Failing Them for Fear', '', 'Luk 21:26a', 'Luk 21:26', 'looking after those things which are', ' coming on the earth:');
                tab.Items.push(item);
                item = new Item(Color.Luk, 'luke-21-26b', 'Powers of the Heavens Shall be Shaken', '', 'Luk 21:26b', 'Luk 21:26', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Luk, 'j-luke-21-26b'));
                this.TabJoins.push(new TabJoin(Color.Luk, 'tj-luke-21-26b'));
                //Songs
                tab.Joins.push(new Join(Color.Sng, 'j-song-2-13-s', FirstLast.First));
                item = new Item(Color.Sng, 'song-2-13a', '', '', 'Sng 2:13a', 'Sng 2:13', 'The fig tree putteth forth her green figs,', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Sng, 'j-song-2-13a'));
                this.TabJoins.push(new TabJoin(Color.Sng, 'tj-song-2-13a'));
                this.Tabs.push(tab);
                //#endregion
                //#region Rapture
                //*******************************
                tab = new Tab('rapture', 'tab-rapture', 'Rapture');
                //Rev 6
                tab.Joins.push(new Join(Color.Rev, 'j-rev-6-15'));
                item = new Item(Color.Rev, 'rev-6-16', 'Seal 6', '', 'Rev 6:16b', 'Rev 6:16', 'and hide us from the face of him', 'that sitteth on the throne,');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-17', 'Seal 6', 'Great Day of His Wrath is Come', 'Rev 6:17', 'Rev 6:17', 'and who shall be able to stand?', '', FirstLast.Last);
                tab.Items.push(item);
                //Rev 7
                item = new Item(Color.Rev, 'rev-7-1', '4 Angels', 'Holding 4 Winds', 'Rev 7:1', 'Rev 7:1', '', '', FirstLast.First);
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-7-1'));
                //Rev 12
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-5'));
                item = new Item(Color.Rev, 'rev-12-5a', 'And She Brought Forth a Man {Child|G5207}', '', 'Rev 12:5a', 'Rev 12:5', 'Who was to rule all nations with a rod of iron:', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-5a'));
                item = new Item(Color.Rev, 'rev-12-5b', 'And {Her|G0846|His} {Child|G5043|Children} was Caught up unto God', '', 'Rev 12:5b', 'Rev 12:5', ' and to {His|G0846} throne.', '');
                tab.Items.push(item);
                //Matt
                tab.Joins.push(new Join(Color.Mat, 'j-mat-24-31a'));
                item = new Item(Color.Mat, 'mat-24-30b', 'The Son of Man Coming', 'They Shall See', 'Mat 24:30b', 'Mat 24:30', 'in the clouds of heaven', ' with power and great glory.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mat, 'j-mat-24-30b'));
                item = new Item(Color.Mat, 'mat-24-31a', 'He Shall Send His Angels', 'With a Great Sound of a Trumpet', 'Mat 24:31a', 'Mat 24:31', '', '');
                tab.Items.push(item);
                item = new Item(Color.Mat, 'mat-24-31b', 'They Shall Gather Together His Elect', '4 Winds', 'Mat 24:31b', 'Mat 24:31', 'shall gather together his elect from the four winds, ', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mat, 'j-mat-24-31b-e', FirstLast.Last));
                //Mark
                tab.Joins.push(new Join(Color.Mrk, 'j-mark-13-27a'));
                item = new Item(Color.Mrk, 'mark-13-26', 'The Son of Man Coming', 'Then Shall They See', 'Mrk 13:26', 'Mrk 13:26', 'in the clouds', ' with great power and glory.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mrk, 'j-mark-13-26'));
                item = new Item(Color.Mrk, 'mark-13-27a', '', 'Then Shall He Send His Angels', 'Mrk 13:27a', 'Mrk 13:27', '', '');
                tab.Items.push(item);
                item = new Item(Color.Mrk, 'mark-13-27b', 'Shall Gather Together His Elect', '4 Winds', 'Mrk 13:27b', 'Mrk 13:27', 'shall gather together his elect from the four winds,', 'from the uttermost part of the earth…');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mrk, 'j-mark-13-27b-e', FirstLast.Last));
                //Luke
                tab.Joins.push(new Join(Color.Luk, 'j-luke-21-26'));
                item = new Item(Color.Luk, 'luke-21-27', 'The Son of Man Coming', 'Then Shall They See', 'Luk 21:27', 'Luk 21:27', 'In a cloud', ' with power and great glory.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Luk, 'j-luke-21-27-e', FirstLast.Last));
                //Song
                tab.Joins.push(new Join(Color.Sng, 'j-song-2-13a'));
                item = new Item(Color.Sng, 'song-2-13b', '', '', 'Sng 2:13b', 'Sng 2:13', 'Arise, my love, my fair one,', '');
                tab.Items.push(item);
                item = new Item(Color.Sng, 'song-2-13c', '', '', 'Sng 2:13c', 'Sng 2:13', ' and come away.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Sng, 'j-song-2-13-e', FirstLast.Last));
                //2 Esdras 5
                item = new Item(Color.Es2, 'es2-5-1', 'Taken in a Great Number', '', '2Es 5:1', '2Es 5:1', 'Way of truth shall be hidden.', 'Land shall be barren of faith.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-5-1'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-5-1'));
                //1 Thess 4
                tab.Joins.push(new Join(Color.Th1, 'j-1thess-4-16a-s', FirstLast.First));
                item = new Item(Color.Th1, 'thess-4-16a', 'Yah Himself Shall Descend From Heaven', '', '1Th 4:16a', '1Th 4:16', 'with a shout,', ' with the voice of the archangel,');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Th1, 'j-1thess-4-16a'));
                item = new Item(Color.Th1, 'thess-4-16b', 'The Dead in Christ Shall Rise First', 'With the Trump of God', '1Th 4:16b', '1Th 4:16', '', '');
                tab.Items.push(item);
                item = new Item(Color.Th1, 'thess-4-17', 'Caught Up Together', 'We Which are Alive', '1Th 4:16b', '1Th 4:16', 'With them in the clouds,', ' to meet the Lord in the air:');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Th1, 'j-thess-4-17-e', FirstLast.Last));
                //2 Esdras 2
                tab.Joins.push(new Join(Color.Es2, 'j-es2-2-36-s', FirstLast.First));
                item = new Item(Color.Es2, 'es2-2-36', '', '', '2Es 2:36', '2Es 2:36', 'receive the joyfulness of your glory.', ' I testify my Saviour openly.');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-2-37', '', '', '2Es 2:37', '2Es 2:37', 'O receive the gift that is given you, and be glad,', ' giving thanks unto Him that hath led you to the heavenly kingdom.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-2-37'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-2-37'));
                //2 Baruk 30
                item = new Item(Color.Ba2, 'ba2-30-1', 'He Shall Return in Glory', '', '2Ba 30:1', '2Ba 30:1', '', '', FirstLast.First);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Ba2, 'j-ba2-30-1'));
                item = new Item(Color.Ba2, 'ba2-30-2a', 'All Who Hope of Him Shall Rise Again', '', '2Ba 30:2a', '2Ba 30:2', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Ba2, 'j-ba2-30-2a'));
                this.TabJoins.push(new TabJoin(Color.Ba2, 'tj-ba2-30-2a'));
                //2 Esdras 15
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-9'));
                item = new Item(Color.Es2, 'es2-15-10', '', '', '2Es 15:10-11a', '2Es 15:10-11', 'I will not suffer them now to dwell in the land of Egypt:', 'But I will bring them with a mighty hand and a stretched out arm.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-11a'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-15-11a'));
                //Dan
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
        Tools.RevelationTimelineViewModel = RevelationTimelineViewModel;
        class Tab {
            constructor(cssClass, location, name, time = '-') {
                this.Expanded = ko.observable(false);
                this.Items = ko.observableArray([]);
                this.Joins = ko.observableArray([]);
                this.Links = ko.observableArray([]);
                this.OpenClose = () => {
                    this.Expanded(!this.Expanded());
                };
                this.BaseCSSClass = cssClass;
                this.Style = `grid-area: ${location} / ${location} / ${location}-end / ${location}-end; --tab-image: url(../../Images/Rev/${location}.png)`;
                this.Name = name;
                this.Time = time;
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
                this.Title = '';
                this.SubTitle = '';
                this.Ref = '';
                this.RefDisplay = '';
                this.Line1 = '';
                this.Line2 = '';
                //TitleLink: string = '';
                //SubTitleLink: string = '';
                //Line1Link: string = '';
                //Line2Link: string = '';
                this.Color = ko.observable(Color.Default);
                //Highlight: KnockoutObservable<boolean> = ko.observable(false);
                this.NotSureLocation = ko.observable(false);
                this.CSSClass = ko.computed(() => {
                    let css = `${this.Color()} ${this.FirstLast}`;
                    //css += this.Highlight() ? ' highlight' : '';
                    css += this.NotSureLocation() ? ' not-sure-location' : '';
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
    })(Tools = GO.Tools || (GO.Tools = {}));
})(GO || (GO = {}));