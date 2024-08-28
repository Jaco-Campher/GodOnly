var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        let Color;
        (function (Color) {
            Color["Default"] = "";
            Color["AscIsa"] = "ascisa";
            Color["Ba2"] = "ba2";
            Color["Dan"] = "dan";
            Color["Enoch"] = "enoch";
            Color["Es2"] = "es2";
            Color["Gad"] = "gad";
            Color["Job"] = "job";
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
        let Flag;
        (function (Flag) {
            Flag["None"] = "";
            Flag["NotSureLocation"] = "not-sure-location";
            Flag["Protection"] = "protection";
        })(Flag || (Flag = {}));
        class RevelationTimelineViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Tabs = ko.observableArray([]);
                this.TabJoins = ko.observableArray([]);
                this.Years = ko.observableArray([]);
                this.Months = ko.observableArray([]);
                this.TimelineEvents = ko.observableArray([]);
                this.Ref = ko.observable('').subscribeTo('Rev-Ref', false);
                this.ShowRef = ko.observable(false).subscribeTo('Rev-ShowRef', false);
                // Settings
                //******************************
                this.CompactView = ko.observable(false);
                this.CSSClass = ko.computed(() => {
                    let css = this.CompactView() ? 'compact' : '';
                    return css;
                }, this);
                this.LoadTimeline();
                this.LoadItems();
                this.LoadLinks();
            }
            LoadTimeline() {
                //Years
                this.Years.push(new Year(2023, 'Mar 2023', '2Ba 27:2', 0));
                this.Years.push(new Year(2024, 'Apr 2024', 'go-prophesypage-year2', 7, 'Apr 2024 - Tribulation Year 2'));
                this.Years.push(new Year(2025, 'Mar 2025', '2Ba 27:4', 4));
                this.Years.push(new Year(2026, '??? 2026', '2Ba 27:5', 0));
                this.Years.push(new Year(2027, '??? 2027', '2Ba 27:6', 0));
                this.Years.push(new Year(2028, '??? 2028', '2Ba 27:7', 5));
                this.Years.push(new Year(2029, '??? 2029', '2Ba 27:8', 2));
                this.Years.push(new Year(2030, '??? 2030', '2Ba 27:9', 0));
                this.Years.push(new Year(2031, '??? 2031', '2Ba 27:10', 0));
                this.Years.push(new Year(2032, '??? 2032', '2Ba 27:11', 4));
                this.Years.push(new Year(2033, '??? 2033', '2Ba 27:12', 1));
                this.Years.push(new Year(2034, '??? 2034', '2Ba 27:13', 0));
                //Months
                this.Months.push(new Month('m-tab-seal-1', 'Mar 2023'));
                this.Months.push(new Month('m-tab-seal-2', 'Oct 2023'));
                this.Months.push(new Month('m-tab-seal-3', 'May 2024'));
                this.Months.push(new Month('m-tab-seal-4', 'Dec 2024'));
                this.Months.push(new Month('m-tab-seal-5', 'Jul 2025'));
                this.Months.push(new Month('m-tab-seal-6', 'Feb 2026'));
                this.Months.push(new Month('m-tab-seal-7', 'Sep 2026'));
                this.Months.push(new Month('m-tab-trumpet-1', 'Apr 2027'));
                this.Months.push(new Month('m-tab-trumpet-2', 'Oct 2027'));
                this.Months.push(new Month('m-tab-trumpet-3', 'May 2028'));
                this.Months.push(new Month('m-tab-trumpet-4', 'Dec 2028'));
                this.Months.push(new Month('m-tab-trumpet-5', 'Jul 2029'));
                this.Months.push(new Month('m-tab-trumpet-6', 'Feb 2030'));
                this.Months.push(new Month('m-tab-trumpet-7', 'Sep 2030'));
                this.Months.push(new Month('m-tab-vial-1', 'Apr 2031'));
                this.Months.push(new Month('m-tab-vial-2', 'Nov 2031'));
                this.Months.push(new Month('m-tab-vial-3', 'Jun 2032'));
                this.Months.push(new Month('m-tab-vial-4', 'Dec 2032'));
                this.Months.push(new Month('m-tab-vial-5', 'Jul 2033'));
                this.Months.push(new Month('m-tab-vial-6', 'Feb 2034'));
                this.Months.push(new Month('m-tab-vial-7', 'Sep 2034'));
                //Events
                //this.TimelineEvents.push(new TimelineEvent('tab-seal-3', 'Stock Crash', '/images/rev/stockcrash40.png', 130, 460));
                this.TimelineEvents.push(new TimelineEvent('tab-seal-6', 'Solar Eclipse (17 Feb 2026 / 12 Aug 2026)', '/images/rev/solareclipse40.png', 10, 380));
                this.TimelineEvents.push(new TimelineEvent('tab-seal-6', 'Blood Moon (3 Mar 2026 / 28 Aug 2026)', '/images/rev/bloodmoon40.png', 20, 480)); //410
                //this.TimelineEvents.push(new TimelineEvent('tab-seal-6', 'Solar Eclipse (12 Aug 2026)', '/images/rev/solareclipse40.png', 200, 480));
                //this.TimelineEvents.push(new TimelineEvent('tab-seal-6', 'Blood Moon (27-28 Aug 2026)', '/images/rev/bloodmoon40.png', 210, 510));
            }
            LoadItems() {
                let tab;
                let item;
                //#region Rev 12 Sign
                //*******************************
                tab = new Tab('rev-12', 'tab-rev-12', 'Rev 12 Sign', '23 Sep 2017');
                //Rev 12
                item = new Item(Color.Rev, 'rev-12-1', 'A Woman Clothed with the Sun', 'Great Wonder in Heaven', 'Rev 12:2', 'Rev 12:2', ' and the moon under her feet,', 'upon her head a crown of twelve stars:', FirstLast.First);
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-12-2', 'Travailing in Birth, and Pained to be Delivered', 'And She Being with Child Cried', 'Rev 12:2', 'Rev 12:2', '', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-12-2'));
                this.Tabs.push(tab);
                //#endregion
                //Seals
                //************************************************************
                // Seal 1
                //#region *******************************
                tab = new Tab('seal', 'tab-seal-1', 'Seal 1', 'Yahshua');
                //Rev 6
                item = new Item(Color.Rev, 'rev-6-1', 'I Heard, as it were the Noise of Thunder', 'The Lamb Opened One of the Seals', 'Rev 6:1', 'Rev 6:1', 'One of the four {beasts|G2226} saying,', 'Come and see.', FirstLast.First);
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-2', 'Had a Bow; and a Crown was Given unto Him', 'White Horse: and He that Sat on Him ', 'Rev 6:2', 'Rev 6:2', ' and he went forth conquering, and to conquer.', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-1'));
                this.Tabs.push(tab);
                //#endregion
                // Seal 2
                //#region *******************************
                tab = new Tab('seal', 'tab-seal-2', 'Seal 2', 'Take Peace from the Earth');
                //Rev 6
                item = new Item(Color.Rev, 'rev-6-3', 'Was Given to Him that Sat Thereon to Take Peace From the Earth', 'Red Horse', 'Rev 6:3-4', 'Rev 6:3-4', ' that they should kill one another:', ' and there was given unto him a great sword.');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-2'));
                this.Tabs.push(tab);
                //#endregion
                // Seal 3
                //#region *******************************
                tab = new Tab('seal', 'tab-seal-3', 'Seal 3', 'Recession?');
                //tab.DetailsPage = 'go-prophesypage-year2';
                //Rev 6
                item = new Item(Color.Rev, 'rev-6-5', 'Had a Pair of Balances in His Hand', 'Black Horse', 'Rev 6:5', 'Rev 6:5', '', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-6', 'Three {Measures|G5518} of Barley for a Penny ', 'A {Measure|G5518} of Wheat for a Penny ', 'Rev 6:6', 'Rev 6:6', ' and see thou hurt not the oil and the wine.', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-3'));
                this.Tabs.push(tab);
                //#endregion
                // Seal 4
                //#region *******************************
                tab = new Tab('seal', 'tab-seal-4', 'Seal 4', 'War? Famine?');
                //2 Esdras 15
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-5-s', FirstLast.First));
                item = new Item(Color.Es2, 'es2-15-5', 'Sword, Famine, Death', '', '2Es 15:5', '2Es 15:5', 'Behold, saith the Lord,', ' I will bring plagues upon the world;');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-15-6', '', 'For Wickedness Hath Exceedingly Polluted', '2Es 15:6', '2Es 15:6', 'the whole earth,', 'and their hurtful works are fulfilled.');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-15-6'));
                //Job 5
                this.TabJoins.push(new TabJoin(Color.Job, 'tj-job-5-19-s', FirstLast.First));
                item = new Item(Color.Job, 'job-5-19', 'He Shall Deliver Thee in 6 Troubles', '', 'Job 5:19', 'Job 5:19', 'yea, in 7 there shall no evil touch thee.', '');
                item.Flag(Flag.Protection);
                tab.Items.push(item);
                item = new Item(Color.Job, 'job-5-20', 'In Famine He Shall Redeem Thee from Death', '', 'Job 5:20', 'Job 5:20', 'and in war from the power of the sword.', '');
                item.Flag(Flag.Protection);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Job, 'j-job-5-19-e', FirstLast.Last));
                //Rev 6
                item = new Item(Color.Rev, 'rev-6-7', 'His Name that Sat on Him was Death', '{Pale|G5515} Horse', 'Rev 6:7-8a', 'Rev 6:7-8', 'and Hell followed with him.', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-8b', 'Kill with Sword, {Hunger|G3042|Famine}, Death', 'Power was Given unto Them over the 4th Part of the Earth', 'Rev 6:8b', 'Rev 6:8', ' and with the beasts of the earth.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-6-8b'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-4'));
                this.Tabs.push(tab);
                //#endregion
                // Seal 5
                //#region *******************************
                tab = new Tab('seal', 'tab-seal-5', 'Seal 5');
                //2 Esdras 15
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-15-8b'));
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-7'));
                item = new Item(Color.Es2, 'es2-15-7', 'As Touching Their Wickedness', 'I Will Hold My Tongue No More', '2Es 15:7-8a', '2Es 15:7-8', 'neither will I suffer them in those things,', '  in which they wickedly exercise themselves:');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-15-8b', '', '', '2Es 15:8b', '2Es 15:8', 'The innocent and righteous blood crieth unto me,', ' and the souls of the just complain continually.');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-15-9', 'I Will Surely Avenge Them', 'And Therefore Saith the Lord', '2Es 15:9', '2Es 15:9', ' and receive unto me all the innocent blood.', '');
                tab.Items.push(item);
                //Rev 6
                item = new Item(Color.Rev, 'rev-6-9', 'Under the Altar the Souls', '', 'Rev 6:9', 'Rev 6:9', ' of them that were slain for the word of God,', ' and for the testimony which they held:');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-6-9'));
                item = new Item(Color.Rev, 'rev-6-10', 'Saying, How Long, O Lord, Holy and True', 'They Cried With a Loud Voice', 'Rev 6:10', 'Rev 6:10', 'Dost thou not judge and avenge our blood', ' on them that dwell on the earth?');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-11', 'White Robes were Given Unto Every One of Them', '', 'Rev 6:11', 'Rev 6:11', 'said unto them, that they should rest yet for a little season', 'until their fellowservants also … should be fulfilled.');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-seal-5'));
                this.Tabs.push(tab);
                //#endregion
                // Seal 6
                //#region *******************************
                tab = new Tab('seal', 'tab-seal-6', 'Seal 6');
                //Gad 14
                item = new Item(Color.Gad, 'gad-14-1', '1st Day of the 7th Month', 'I Had a Vision from the LORD', 'Gad 14:1', 'Gad 14:1', '', '', FirstLast.First);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Gad, 'j-gad-14-1'));
                item = new Item(Color.Gad, 'gad-14-2a', 'The Heavens Rolled Back Like a Scroll', '', 'Gad 14:2a', 'Gad 14:2', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Gad, 'j-gad-14-2a'));
                item = new Item(Color.Gad, 'gad-14-2b', 'And I Saw the Glory of the LORD', '', 'Gad 14:2b-4', 'Gad 14:2-4', ' sitting on an extremely high throne.', '12 Stairs');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Gad, 'tj-gad-14-4'));
                //Luk 21
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
                //Mrk 13
                this.TabJoins.push(new TabJoin(Color.Mrk, 'tj-mrk-13-24a-s', FirstLast.First));
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
                //Mat 24
                this.TabJoins.push(new TabJoin(Color.Mat, 'tj-mat-24-29a-s', FirstLast.First));
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
                tab.Joins.push(new Join(Color.Mat, 'j-mat-24-30a'));
                this.TabJoins.push(new TabJoin(Color.Mat, 'tj-mat-24-30b'));
                //Rev 4
                tab.Joins.push(new Join(Color.Rev, 'j-rev-4-2', FirstLast.First));
                item = new Item(Color.Rev, 'rev-4-2a', '', 'And Immediately I was in the Spirit', 'Rev 4:2a', 'Rev 4:2', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-4-2a'));
                item = new Item(Color.Rev, 'rev-4-2b', '', '', 'Rev 4:2b', 'Rev 4:2', ' behold, a throne was set in heaven', ' and one sat on the throne.');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-4-2'));
                //Rev 6
                tab.Joins.push(new Join(Color.Rev, 'j-rev6-11'));
                item = new Item(Color.Rev, 'rev-6-1', 'The Moon Became as Blood', 'Sun Became Black as Sackcloth of Hair', 'Rev 6:12', 'Rev 6:12', '', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-2', 'Stars of Heaven Fell unto the Earth', '', 'Rev 6:13', 'Rev 6:13', 'Even as a fig tree casteth her untimely figs,', ' when she is shaken of a mighty wind.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-3', 'Heaven Departed as a Scroll', '', 'Rev 6:14', 'Rev 6:14', 'every mountain and island', ' were moved out of their places.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-4', 'Kings and Men hid Themselves', '', 'Rev 6:15', 'Rev 6:15', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev6-15'));
                item = new Item(Color.Rev, 'rev-6-16a', 'Seal 6', '', 'Rev 6:16a', 'Rev 6:16', 'And said to the mountains', ' and rocks, fall on us,');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-6-16b', 'Seal 6', '', 'Rev 6:16b', 'Rev 6:16', 'and hide us from the face of him', 'that sitteth on the throne,');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-6-16'));
                //Rev 12
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-3'));
                item = new Item(Color.Rev, 'rev-12-4', 'Stars of Heaven and Did Cast Them to the Earth', 'his tail Drew the 1/3 of the', 'Rev 12:4', 'Rev 12:4', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-4'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-12-4'));
                //Songs
                tab.Joins.push(new Join(Color.Sng, 'j-song-2-13-s', FirstLast.First));
                item = new Item(Color.Sng, 'song-2-13a', '', '', 'Sng 2:13a', 'Sng 2:13', 'The fig tree putteth forth her green figs,', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Sng, 'j-song-2-13a'));
                this.TabJoins.push(new TabJoin(Color.Sng, 'tj-song-2-13a'));
                this.Tabs.push(tab);
                //#endregion
                // Rapture
                //#region *******************************
                tab = new Tab('rapture', 'tab-rapture', 'Rapture');
                //2 Baruk 30
                item = new Item(Color.Ba2, 'ba2-30-1', 'He Shall Return in Glory', '', '2Ba 30:1', '2Ba 30:1', '', '', FirstLast.First);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Ba2, 'j-ba2-30-1'));
                item = new Item(Color.Ba2, 'ba2-30-2a', 'All Who Hope of Him Shall Rise Again', '', '2Ba 30:2a', '2Ba 30:2', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Ba2, 'j-ba2-30-2a'));
                this.TabJoins.push(new TabJoin(Color.Ba2, 'tj-ba2-30-2a'));
                //2 Esdras 2
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-2-34-s', FirstLast.First));
                item = new Item(Color.Es2, 'es2-2-34', 'He Shall Come in the End of the World', 'Look for Your Shepherd', '2Es 2:34-35', '2Es 2:34-35', 'Be ready to the reward of the kingdom, for the everlasting', ' light shall shine upon you for evermore.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-2-35'));
                item = new Item(Color.Es2, 'es2-2-36', '', '', '2Es 2:36', '2Es 2:36', 'receive the joyfulness of your glory.', ' I testify my Saviour openly.');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-2-37', '', '', '2Es 2:37', '2Es 2:37', 'O receive the gift that is given you, and be glad,', ' giving thanks unto Him that hath led you to the heavenly kingdom.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-2-37'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-2-37'));
                //2 Esdras 5
                item = new Item(Color.Es2, 'es2-5-1', 'Taken in a Great Number', '', '2Es 5:1', '2Es 5:1', 'Way of truth shall be hidden.', 'Land shall be barren of faith.', FirstLast.First);
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-5-2', '', 'Iniquity Shall be Increased', '2Es 5:2', '2Es 5:2', 'above that which now thou seest,', 'or that thou hast heard long ago.');
                item.Flag(Flag.NotSureLocation);
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-5-1'));
                //2 Esdras 15
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-9'));
                item = new Item(Color.Es2, 'es2-15-10', '', '', '2Es 15:10-11a', '2Es 15:10-11', 'I will not suffer them now to dwell in the land of Egypt:', 'But I will bring them with a mighty hand and a stretched out arm.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-11a'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-15-11a'));
                //Gad 14
                tab.Joins.push(new Join(Color.Gad, 'j-gad-14-5'));
                item = new Item(Color.Gad, 'gad-14-5', 'And the Glory of the LORD', '', 'Gad 14:5', 'Gad 14:5', ' had the appearance like that of the rainbow,', ' His covenant');
                tab.Items.push(item);
                item = new Item(Color.Gad, 'gad-14-6', '3 Books - Records of Every Man', 'The Host of Heaven were Standing Before Him', 'Gad 14:6-9a', 'Gad 14:6-9', '1st Book - Granted eternal life.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Gad, 'j-gad-14-9a'));
                item = new Item(Color.Gad, 'gad-14-9b', '', '', 'Gad 14:9b-10', 'Gad 14:9-10', 'Silence! This day is holy to our Lord.', '2nd Book - Wait 10 days?');
                item.Flag(Flag.NotSureLocation);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Gad, 'j-gad-14-9b-e', FirstLast.Last));
                //Luk 21
                item = new Item(Color.Luk, 'luke-21-27', 'The Son of Man Coming', 'Then Shall They See', 'Luk 21:27', 'Luk 21:27', 'In a cloud', ' with power and great glory.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Luk, 'j-luke-21-27-e', FirstLast.Last));
                //Mrk 13
                item = new Item(Color.Mrk, 'mark-13-26', 'The Son of Man Coming', 'Then Shall They See', 'Mrk 13:26', 'Mrk 13:26', 'in the clouds', ' with great power and glory.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mrk, 'j-mark-13-26'));
                item = new Item(Color.Mrk, 'mark-13-27a', 'Then Shall He Send His Angels', '', 'Mrk 13:27a', 'Mrk 13:27', '', '');
                tab.Items.push(item);
                item = new Item(Color.Mrk, 'mark-13-27b', 'Shall Gather Together His Elect', '4 Winds', 'Mrk 13:27b', 'Mrk 13:27', 'shall gather together his elect from the four winds,', 'from the uttermost part of the earth…');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mrk, 'j-mark-13-27b-e', FirstLast.Last));
                //Mat 24
                item = new Item(Color.Mat, 'mat-24-30b', 'The Son of Man Coming', 'They Shall See', 'Mat 24:30b', 'Mat 24:30', 'in the clouds of heaven', ' with power and great glory.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mat, 'j-mat-24-30b'));
                item = new Item(Color.Mat, 'mat-24-31a', 'He Shall Send His Angels', 'With a Great Sound of a Trumpet', 'Mat 24:31a', 'Mat 24:31', '', '');
                tab.Items.push(item);
                item = new Item(Color.Mat, 'mat-24-31b', 'They Shall Gather Together His Elect', '4 Winds', 'Mat 24:31b', 'Mat 24:31', 'shall gather together his elect from the four winds, ', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Mat, 'j-mat-24-31b-e', FirstLast.Last));
                //Rev 4
                tab.Joins.push(new Join(Color.Rev, 'j-rev-4-2b'));
                item = new Item(Color.Rev, 'rev-4-3', 'And He that Sat was to Look Upon', '', 'Rev 4:3', 'Rev 4:3', ' like a jasper and a sardine stone: a rainbow round about the throne,', ' in sight like unto an emerald.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-4-3'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-4-3'));
                //Rev 6
                tab.Joins.push(new Join(Color.Rev, 'j-rev-6-16'));
                item = new Item(Color.Rev, 'rev-6-17', 'Seal 6', 'Great Day of His Wrath is Come', 'Rev 6:17', 'Rev 6:17', 'and who shall be able to stand?', '', FirstLast.Last);
                item.Flag(Flag.NotSureLocation);
                tab.Items.push(item);
                //Rev 7
                item = new Item(Color.Rev, 'rev-7-1', '4 Angels', 'Holding 4 Winds', 'Rev 7:1', 'Rev 7:1', '', '', FirstLast.First);
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-7-1'));
                //Rev 11
                item = new Item(Color.Rev, 'rev-11-1', 'Measure the Temple of God, and the Altar', 'Given Me a Reed Like unto a Rod', 'Rev 11:1', 'Rev 11:1', '', '', FirstLast.First);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-11-1'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-11-1'));
                //Rev 12
                item = new Item(Color.Rev, 'rev-12-5a', 'And She Brought Forth a Man {Child|G5207|Son}', '', 'Rev 12:5a', 'Rev 12:5', 'Who was to rule all nations with a rod of iron:', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-5a'));
                item = new Item(Color.Rev, 'rev-12-5b', 'And {Her|G0846|His} {Child|G5043|Children} was Caught up unto God', '', 'Rev 12:5b', 'Rev 12:5', ' and to {His|G0846} throne.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-5b'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-12-5b'));
                //Song
                tab.Joins.push(new Join(Color.Sng, 'j-song-2-13a'));
                item = new Item(Color.Sng, 'song-2-13b', '', '', 'Sng 2:13b', 'Sng 2:13', 'Arise, my love, my fair one,', '');
                tab.Items.push(item);
                item = new Item(Color.Sng, 'song-2-13c', '', '', 'Sng 2:13c', 'Sng 2:13', ' and come away.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Sng, 'j-song-2-13-e', FirstLast.Last));
                //1 Thess 4
                this.TabJoins.push(new TabJoin(Color.Th1, 'tj-1thess-4-16a-s', FirstLast.First));
                item = new Item(Color.Th1, 'thess-4-16a', 'Yah Himself Shall Descend From Heaven', '', '1Th 4:16a', '1Th 4:16', 'with a shout,', ' with the voice of the archangel,');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Th1, 'j-1thess-4-16a'));
                item = new Item(Color.Th1, 'thess-4-16b', 'The Dead in Christ Shall Rise First', 'With the Trump of God', '1Th 4:16b', '1Th 4:16', '', '');
                tab.Items.push(item);
                item = new Item(Color.Th1, 'thess-4-17', 'Caught Up Together', 'We Which are Alive', '1Th 4:16b', '1Th 4:16', 'With them in the clouds,', ' to meet the Lord in the air:');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Th1, 'j-thess-4-17-e', FirstLast.Last));
                this.Tabs.push(tab);
                //#endregion
                // Seal 7
                //#region *******************************
                tab = new Tab('seal', 'tab-seal-7', 'Seal 7', '144K');
                //2 Baruk 30
                tab.Joins.push(new Join(Color.Ba2, 'j-ba2-30-2aa'));
                item = new Item(Color.Ba2, 'ba2-30-2b', 'Number of the Souls of the Righteous', '', '2Ba 30:2b', '2Ba 30:2', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Ba2, 'j-ba2-30-2b'));
                item = new Item(Color.Ba2, 'ba2-30-2c', '', '', '2Ba 30:2c', '2Ba 30:2', 'A multitude of souls shall be seen together', ' in one assemblage of one thought.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Ba2, 'j-ba2-30-2c'));
                this.TabJoins.push(new TabJoin(Color.Ba2, 'tj-ba2-30-2c'));
                //Dan 12
                tab.Joins.push(new Join(Color.Dan, 'j-dan-12-7a-s', FirstLast.First));
                item = new Item(Color.Dan, 'dan-12-7b', 'Which Was Upon the Waters of the River', 'And I Heard the Man Clothed in Linen', 'Dan 12:7b', 'Dan 12:7', ' when he held up his right hand and his left hand unto heaven,', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Dan, 'j-dan-12-7b'));
                this.TabJoins.push(new TabJoin(Color.Dan, 'tj-dan-12-7b'));
                //2 Esdras 2
                tab.Joins.push(new Join(Color.Es2, 'j-es2-2-37a'));
                item = new Item(Color.Es2, 'es2-2-38', 'Number of Those that be Sealed', '', '2Es 2:38', '2Es 2:38', ' in the feast of the Lord.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-2-38'));
                item = new Item(Color.Es2, 'es2-2-39', 'Received Glorious Garments', 'Clothed in White', '2Es 2:39-40', '2Es 2:39-40', 'Departed from the shadow of the world.', 'Which have fulfilled the law of the Lord.');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-2-41', 'They All Praised the Lord with Songs', '', '2Es 2:41-42', '2Es 2:41-42', 'A great people, whom I could not number.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-2-41-e', FirstLast.Last));
                //2 Esdras 15
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-11aa'));
                item = new Item(Color.Es2, 'es2-15-11b', 'Egypt Shall Mourn', 'And Will Destroy All the Land Thereof', '2Es 15:11b-12', '2Es 15:11-12', 'and the foundation of it shall be smitten with the plague', ' and punishment that God shall bring upon it.');
                item.Flag(Flag.NotSureLocation);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-11b'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-15-11b'));
                //2 Esdras 16
                tab.Joins.push(new Join(Color.Es2, 'j-es2-16-9-s', FirstLast.First));
                item = new Item(Color.Es2, 'es2-16-9', 'He Shall Cast Lightnings', 'Fire Shall go Forth From His Wrath', '2Es 16:9-11', '2Es 16:9-11', 'He shall thunder.', ' and who shall not be afraid?');
                tab.Items.push(item);
                item = new Item(Color.Es2, 'es2-16-12a', 'And the Foundations Thereof', 'The Earth Quaketh', '2Es 16:12a', '2Es 16:12', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-16-12a'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-16-12a'));
                //Rev 4
                tab.Joins.push(new Join(Color.Rev, 'j-rev-4-3a'));
                item = new Item(Color.Rev, 'rev-4-4', '', 'Clothed in White Raiment', 'Rev 4:4', 'Rev 4:4', '24 Seats, 24 Elders.', 'Crowns of gold.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-4-4'));
                item = new Item(Color.Rev, 'rev-4-5', '', 'Out of the Throne Proceeded', 'Rev 4:5', 'Rev 4:5', 'Lightnings and Thunderings and Voices', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-4-5'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-4-5'));
                //Rev 5
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-5-5-s', FirstLast.First));
                item = new Item(Color.Rev, 'rev-5-5', 'The Lion of the Tribe of Juda', '', 'Rev 5:5', 'Rev 5:5', ' hath prevailed to open the book,', ' and to loose the 7 seals thereof.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-5-5'));
                item = new Item(Color.Rev, 'rev-5-6', 'Stood a Lamb as It Had Been Slain', 'In the Midst of the Throne', 'Rev 5:6', 'Rev 5:6', '4 Living beings, Elders', '7 Horns and 7 Eyes');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-5-7', 'Out of the Right Hand of Him that Sat Opon the Throne', 'And He Came and Took the Book', 'Rev 5:7', 'Rev 5:7', '', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-5-8', 'Which are the Prayers of Saints', 'Golden Vials Full of Odours', 'Rev 5:8', 'Rev 5:8', '4 Living beings, 24 Elders', 'Having every one of them harps.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-5-9a', '', 'They Sung a New Song', 'Rev 5:9a', 'Rev 5:9', 'Thou art worthy to take the book,', 'and to open the seals thereof:');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-5-9b', 'And Hast Redeemed Us to God by Thy Blood', 'For Thou wast Slain', 'Rev 5:9b', 'Rev 5:9', '', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-5-9c', 'Every Kindred, and Tongue, and People, and Nation', '', 'Rev 5:9c', 'Rev 5:9c', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-5-9c'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-5-9c'));
                //Rev 7
                tab.Joins.push(new Join(Color.Rev, 'j-rev-7-2a'));
                item = new Item(Color.Rev, 'rev-7-2', 'Having the Seal of the Living God', 'I Saw Another Angel Ascending from the East', 'Rev 7:2-3', 'Rev 7:2-3', 'Hurt not earth, sea, trees', 'Till we sealed the servants of our God.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-7-4', 'Number of Them Which Were Sealed', '144K', 'Rev 7:4-8', 'Rev 7:4-8', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-7-4'));
                item = new Item(Color.Rev, 'rev-7-9', 'Clothed with White Robes', 'All Nations, and Kindreds, and People, and Tongues', 'Rev 7:9', 'Rev 7:9', 'A great multitude, which no man could number.', 'Stood before the throne, and before the Lamb…');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-7-9'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-7-9'));
                //Rev 8
                item = new Item(Color.Rev, 'rev-8-1', 'Opened the 7th Seal', '', 'Rev 8:1-2', 'Rev 8:1-2', 'Silence in heaven about the space of half an hour.', '7 Angels given 7 trumpets.', FirstLast.First);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-8-1'));
                item = new Item(Color.Rev, 'rev-8-3a', 'With the Prayers of the Saints', 'Another Angel Came and Stood at the Altar', 'Rev 8:3a', 'Rev 8:3', '', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-8-3b', 'Golden Altar Which Was Before the Throne', '', 'Rev 8:3b', 'Rev 8:3', 'Smoke of incense', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-8-3b'));
                item = new Item(Color.Rev, 'rev-8-5a', 'Cencer Cast to the Earth', 'Filled It With Fire', 'Rev 8:5a', 'Rev 8:5', 'Voices, and Thunderings, and Lightnings', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-8-5b', 'And an Earthquake', '', 'Rev 8:5b', 'Rev 8:5', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-8-5b'));
                item = new Item(Color.Rev, 'rev-8-6', 'Prepared to Sound', '7 Angels', 'Rev 8:6', 'Rev 8:6', '', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-8-6'));
                //Rev 10
                item = new Item(Color.Rev, 'rev-10-1', 'Clothed with a Cloud', 'I Saw Another Mighty Angel Come Down from Heaven', 'Rev 10:1', 'Rev 10:1', ' and a rainbow was upon His Head and His Face as the sun,', ' feet as pillars of fire.', FirstLast.First);
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-10-2', 'Little Book Open', '', 'Rev 10:2', 'Rev 10:2', 'Right foot on the sea.', 'Left foot on the earth.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-10-3', '7 Thunders', '{Loud|G3173} Voice', 'Rev 10:3-4', 'Rev 10:3-4', 'Lion roareth, Voice from heaven,', 'seal what 7 thunders uttered.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-10-3'));
                item = new Item(Color.Rev, 'rev-10-5', 'Angel Stand Upon Sea and Earth', '', 'Rev 10:5', 'Rev 10:5', 'lifted up his hand to heaven,', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-10-5'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-10-5'));
                //Rev 14
                item = new Item(Color.Rev, 'rev-14-1', 'I Looked, a Lamb Stood on Mount Sion', '144K', 'Rev 14:1', 'Rev 14:1', 'Having His Father’s name written', 'in their foreheads.', FirstLast.First);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-14-1'));
                item = new Item(Color.Rev, 'rev-14-2', '', '', 'Rev 14:2', 'Rev 14:2', 'Voice of many waters.', 'Voice of harpers harping with their harps.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-14-3', '144K', 'New Song Before the Throne', 'Rev 14:3', 'Rev 14:3', '4 Living beings, Elders', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-14-4', 'Redeemed from Among {Men|G0444|People}', '', 'Rev 14:4-5', 'Rev 14:4-5', 'Not defiled with women.', 'Firstfruits without fault.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-14-6a', 'Every Nation, and Kindred, and Tongue, and People', 'I Saw Another Angel Fly in the Midst of Heaven', 'Rev 14:6', 'Rev 14:6', 'Having the everlasting gospel to preach unto them that', 'dwell on the earth, and to all people.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-14-6a'));
                item = new Item(Color.Rev, 'rev-14-7a', 'Saying with a {Loud|G3173} Voice', '', 'Rev 14:7a', 'Rev 14:7', 'Fear God, and give glory to Him;', 'for the hour of His judgment is come:');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-14-7a'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-14-7a'));
                //Rev 18
                item = new Item(Color.Rev, 'rev-18-1', '', 'I Saw Another Angel Come Down from Heaven', 'Rev 18:1', 'Rev 18:1', 'Having great power.', 'Earth was lightened with his glory.', FirstLast.First);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-18-1'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-18-1'));
                this.Tabs.push(tab);
                //#endregion
                //Trumpets
                //************************************************************
                //#region Trumpet 1
                //*******************************
                tab = new Tab('trumpet', 'tab-trumpet-1', 'Trumpet 1', '2 Witnesses');
                //Dan 12
                tab.Joins.push(new Join(Color.Dan, 'j-dan-12-7ba'));
                item = new Item(Color.Dan, 'dan-12-7c', 'And Sware by Him that Liveth For Ever', 'Time, Times, and an Half', 'Dan 12:7c', 'Dan 12:7', 'when he shall have accomplished to scatter the power', 'of the holy people, all these shall be finished.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Dan, 'j-dan-12-7c-e', FirstLast.Last));
                //Enoch 80
                tab.Joins.push(new Join(Color.Enoch, 'j-enoch-80-2a', FirstLast.First));
                item = new Item(Color.Enoch, 'enoch-80-2a', '', 'Earth', 'Enoch 80:2a', 'Enoch 80:2', 'Their seed shall be tardy on their lands and fields.', 'All things on the earth shall alter.');
                tab.Items.push(item);
                item = new Item(Color.Enoch, 'enoch-80-2b', 'And the Heaven Shall Withhold', 'The Rain Shall be Kept Back', 'Enoch 80:2b', 'Enoch 80:2', 'And shall not appear in their time.', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Enoch, 'tj-enoch-80-2b'));
                //2 Esdras 5
                tab.Joins.push(new Join(Color.Es2, 'j-es2-5-2a'));
                item = new Item(Color.Es2, 'es2-5-3', 'Wasted Suddenly', 'The Land that Have Root', '2Es 5:3', '2Es 5:3', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-5-3'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-5-3'));
                //2 Esdras 15
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-11ba'));
                item = new Item(Color.Es2, 'es2-15-13a', 'Hail', 'Ground', '2Es 15:13a', '2Es 15:13', 'They that till the ground shall mourn:', ' for their seeds shall fail…');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-15-13a'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-15-13a'));
                //Rev 8
                tab.Joins.push(new Join(Color.Rev, 'j-rev-8-6a'));
                item = new Item(Color.Rev, 'rev-8-7', 'Hail and Fire Mingled with Blood', 'Earth', 'Rev 8:7', 'Rev 8:7', '1/3 Trees burnt', 'All green grass burnt');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-8-7'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-8-7'));
                //Rev 10
                tab.Joins.push(new Join(Color.Rev, 'j-rev-10-5aa'));
                item = new Item(Color.Rev, 'rev-10-6a', 'And Sware by Him that Liveth For Ever and Ever', '', 'Rev 10:6a', 'Rev 10:6', '', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-10-6b', '', 'Earth', 'Rev 10:6b', 'Rev 10:6', 'Who created heaven, and the things that therein are', 'and the earth, and the things that therein are,');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-10-6b'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-10-6b'));
                //Rev 11
                item = new Item(Color.Rev, 'rev-11-2b', '', '42 Months', 'Rev 11:2b', 'Rev 11:2', 'Given unto the gentiles.', 'The holy city shall they tread under foot.');
                item.Flag(Flag.NotSureLocation);
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-11-3', '2 Witnesses and They Shall Prophesy', '1260 Days', 'Rev 11:3', 'Rev 11:3', 'Clothed in sackcloth.', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-11-4', '2 Olive Trees, 2 Candlesticks', 'Standing Before the God of the Earth', 'Rev 11:4-5', 'Rev 11:4-5', 'Fire out of their mouth.', 'Devoureth their enemies.');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-11-6a', 'In the Days of Their Prophecy', 'Power to Shut Heaven that it Rain Not', 'Rev 11:6a', 'Rev 11:6', '', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-11-6a'));
                //Rev 12
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-5aa'));
                item = new Item(Color.Rev, 'rev-12-6', 'Woman Fled into the Wilderness', '1260 Days', 'Rev 12:6', 'Rev 12:6', 'Where she hath a place prepared of God.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-6'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-12-6'));
                //Rev 13
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-13-5a'));
                item = new Item(Color.Rev, 'rev-13-5b', 'Power Was Given Unto him', '42 Months', 'Rev 13:5b', 'Rev 13:5', ' to continue forty and two months.', '');
                item.Flag(Flag.NotSureLocation);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-13-5b'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-13-5b'));
                //Rev 14
                tab.Joins.push(new Join(Color.Rev, 'j-rev-14-7aa'));
                item = new Item(Color.Rev, 'rev-14-7b', '', 'Earth', 'Rev 14:7b', 'Rev 14:7', 'Worship Him that made heaven, and earth.', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-14-7b'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-14-7b'));
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 2
                //*******************************
                tab = new Tab('trumpet', 'tab-trumpet-2', 'Trumpet 2', 'World War 3?');
                //Asc Isa 4
                item = new Item(Color.AscIsa, 'ascisa-4-1', 'Days of the Completion of the World', '', 'AscIsa 4:1', 'AscIsa 4:1', '', '', FirstLast.First);
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.AscIsa, 'j-ascisa-4-1'));
                this.TabJoins.push(new TabJoin(Color.AscIsa, 'tj-ascisa-4-1'));
                //2 Baruk 30
                tab.Joins.push(new Join(Color.Ba2, 'j-ba2-30-2ca'));
                item = new Item(Color.Ba2, 'ba2-30-3', 'It is the Consummation of the Times', 'Time has Come of Which it is Said', '2Ba 30:3', '2Ba 30:3', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Ba2, 'j-ba2-30-3'));
                this.TabJoins.push(new TabJoin(Color.Ba2, 'tj-ba2-30-3'));
                //Enoch 80
                tab.Joins.push(new Join(Color.Enoch, 'j-enoch-80-2b'));
                item = new Item(Color.Enoch, 'enoch-80-3', 'In Those Times', '', 'Enoch 80:3', 'Enoch 80:3', ' the fruits of the earth shall be backward,', ' and shall not grow in their time,');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Enoch, 'j-enoch-80-3'));
                this.TabJoins.push(new TabJoin(Color.Enoch, 'tj-enoch-80-3'));
                //2 Esdras 16
                item = new Item(Color.Es2, 'es2-16-12b', '', '', '2Es 16:12b', '2Es 16:12', 'The sea ariseth up with waves from the deep,', ' and the waves of it are troubled, and the fishes');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Es2, 'j-es2-16-12b'));
                this.TabJoins.push(new TabJoin(Color.Es2, 'tj-es2-16-12b'));
                //Gad 2
                tab.Joins.push(new Join(Color.Gad, 'j-gad-2-26a', FirstLast.First));
                item = new Item(Color.Gad, 'gad-2-26a', 'At the End of Days', '', 'Gad 2:26a', 'Gad 2:26', '', '');
                item.Flag(Flag.NotSureLocation);
                tab.Items.push(item);
                item = new Item(Color.Gad, 'gad-2-26b', 'Michael the Great Prince will Stand Up in War', '', 'Gad 2:26b', 'Gad 2:26', 'like a whirlwind', '');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Gad, 'tj-gad-2-26'));
                //Rev 8
                item = new Item(Color.Rev, 'rev-8-8', 'Great Mountain Burning with Fire', 'Sea', 'Rev 8:8-9', 'Rev 8:8-9', '1/3 Sea Blood, 1/3 Sea die.', '1/3 Ships destroyed.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-8-8'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-8-8'));
                //Rev 10
                item = new Item(Color.Rev, 'rev-10-6b', '', 'Sea', 'Rev 10:6b', 'Rev 10:6', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-10-6b'));
                item = new Item(Color.Rev, 'rev-10-6c', 'Time No Longer', '', 'Rev 10:c', 'Rev 10:6', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-10-6c'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-10-6c'));
                //Rev 11
                item = new Item(Color.Rev, 'rev-11-6b', '', '', 'Rev 11:6b', 'Rev 11:6', 'Power over waters to turn them to blood.', '');
                tab.Items.push(item);
                item = new Item(Color.Rev, 'rev-11-6c', '', '', 'Rev 11:6c', 'Rev 11:6', 'Smite the earth with all plagues,', ' as often as they will.');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-11-6c'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-11-6c'));
                //Rev 12
                tab.Joins.push(new Join(Color.Rev, 'j-rev-12-6a'));
                item = new Item(Color.Rev, 'rev-12-7', 'Michael and His Angels Fought', 'War in Heaven', 'Rev 12:7-8', 'Rev 12:7-8', 'and the dragon fought and his angels,', 'and prevailed not;');
                tab.Items.push(item);
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-12-7'));
                //Rev 14
                item = new Item(Color.Rev, 'rev-14-7c', '', 'Sea', 'Rev 14:7c', 'Rev 14:7', '', '');
                tab.Items.push(item);
                tab.Joins.push(new Join(Color.Rev, 'j-rev-14-7c'));
                this.TabJoins.push(new TabJoin(Color.Rev, 'tj-rev-14-7c'));
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 3
                //*******************************
                tab = new Tab('', 'tab-trumpet-3', 'Trumpet 3'); //trumpet
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 4
                //*******************************
                tab = new Tab('', 'tab-trumpet-4', 'Trumpet 4'); //trumpet
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 5
                //*******************************
                tab = new Tab('', 'tab-trumpet-5', 'Trumpet 5'); //trumpet
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 6
                //*******************************
                tab = new Tab('', 'tab-trumpet-6', 'Trumpet 6'); //trumpet
                this.Tabs.push(tab);
                //#endregion
                //#region 2 Witnesses
                //*******************************
                //tab = new Tab('', 'tab-2-wit', '2 Witnesses'); //witnesses
                //this.Tabs.push(tab);
                //#endregion
                //#region Ascension
                //*******************************
                tab = new Tab('', 'tab-ascension', 'Ascension', '2 Witnesses'); //ascension
                this.Tabs.push(tab);
                //#endregion
                //#region Trumpet 7
                //*******************************
                tab = new Tab('', 'tab-trumpet-7', 'Trumpet 7'); //trumpet
                this.Tabs.push(tab);
                //#endregion
                //Vials
                //************************************************************
                //#region Vial 1
                //*******************************
                tab = new Tab('', 'tab-vial-1', 'Vial 1'); //vial
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 2
                //*******************************
                tab = new Tab('', 'tab-vial-2', 'Vial 2'); //vial
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 3
                //*******************************
                tab = new Tab('', 'tab-vial-3', 'Vial 3'); //vial
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 4
                //*******************************
                tab = new Tab('', 'tab-vial-4', 'Vial 4'); //vial
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 5
                //*******************************
                tab = new Tab('', 'tab-vial-5', 'Vial 5'); //vial
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 6
                //*******************************
                tab = new Tab('', 'tab-vial-6', 'Vial 6'); //vial
                this.Tabs.push(tab);
                //#endregion
                //#region Day of Yah
                //*******************************
                tab = new Tab('', 'tab-thief', 'Day of Yah', 'Come as a Thief'); //thief
                this.Tabs.push(tab);
                //#endregion
                //#region Vial 7
                //*******************************
                tab = new Tab('', 'tab-vial-7', 'Vial 7'); //vial
                this.Tabs.push(tab);
                //#endregion
                //1000 Years
                //************************************************************
                //#region Pre 1000 Years
                //*******************************
                tab = new Tab('', 'tab-pre-1000', 'Pre 1000 Years'); //pre-1000
                this.Tabs.push(tab);
                //#endregion
                //#region 1000 Years
                //*******************************
                tab = new Tab('', 'tab-1000', '1000 Years'); //y1000
                this.Tabs.push(tab);
                //#endregion
                //#region End 1000 Years
                //*******************************
                tab = new Tab('', 'tab-end-1000', 'End 1000 Years'); //end-1000
                this.Tabs.push(tab);
                //#endregion
                //#region Judgement
                //*******************************
                tab = new Tab('', 'tab-judgement', 'Judgement'); //judgement
                this.Tabs.push(tab);
                //#endregion
            }
            LoadLinks() {
                //this.Links.push(new Link('|', 'l-1s', 'l-1e'));
            }
        }
        Tools.RevelationTimelineViewModel = RevelationTimelineViewModel;
        class Year {
            constructor(year, displayYear, ref, offset, dialogTitle = '') {
                this.Ref = '';
                this.ShowVerses = () => {
                    if (this.DialogTitle == '') {
                        ko.postbox.publish('Rev-Ref', this.Ref);
                        ko.postbox.publish('Rev-ShowRef', true);
                    }
                    else {
                        go.ShowPageDialog(null, this.DialogTitle, this.Ref);
                    }
                };
                this.Style = `grid-area: y-${year}`;
                this.DisplayYear = displayYear;
                this.Offset = `width: ${(offset * 25) + 6}px`;
                this.Ref = ref;
                this.DialogTitle = dialogTitle;
            }
        }
        class Month {
            constructor(area, displayYear) {
                this.Style = `grid-area: ${area}`;
                this.DisplayYear = displayYear;
            }
        }
        class TimelineEvent {
            constructor(location, title, imageUrl, offsetClosed, offsetOpen) {
                this.ImageUrl = '';
                this.Style = `grid-area: m-${location}`;
                this.Title = title;
                this.OffsetClosed = offsetClosed;
                this.OffsetOpen = offsetOpen;
                this.ImageUrl = imageUrl;
                this.Expanded = ko.observable(false).subscribeTo(location);
                this.Offset = ko.computed(() => {
                    if (this.Expanded()) {
                        return `width: ${this.OffsetOpen}px;transition: width 300ms`;
                    }
                    else {
                        return `width: ${this.OffsetClosed}px`;
                    }
                }, this);
            }
        }
        class Tab {
            constructor(cssClass, location, name, subHeading = '-') {
                this.DetailsPage = '';
                this.Items = ko.observableArray([]);
                this.Joins = ko.observableArray([]);
                this.Links = ko.observableArray([]);
                this.OpenClose = () => {
                    this.Expanded(!this.Expanded());
                };
                this.ShowDetails = () => {
                    go.ShowPageDialog(null, this.Name, this.DetailsPage);
                };
                this.BaseCSSClass = cssClass;
                this.HeadingStyle = `grid-area: h-${location}`;
                this.Style = `grid-area: ${location} / ${location} / ${location}-end / ${location}-end; --tab-image: url(../../Images/Rev/${location}.png)`;
                this.Name = name;
                this.SubHeading = subHeading;
                this.Expanded = ko.observable(false).publishOn(location);
                this.CSSClass = ko.computed(() => {
                    let css = `${this.BaseCSSClass} ${location}`;
                    css += this.Expanded() ? ' expanded' : '';
                    return css;
                }, this);
            }
        }
        class TabJoin {
            constructor(color, location, firstLast = FirstLast.Default) {
                this.Color = ko.observable(Color.Default);
                this.Color(color);
                this.Style = `grid-area: ${location};`;
                //this.FirstLast = firstLast;
                switch (firstLast) {
                    case FirstLast.First:
                        this.Style += `background:linear-gradient(90deg, #0000 0, #0000 30%, var(--${color}));`;
                        break;
                    case FirstLast.Last:
                        this.Style += `background:linear-gradient(90deg, var(--${color}) 0, #0000 70%);`;
                        break;
                    default:
                }
                this.CSSClass = ko.computed(() => {
                    let css = `${this.Color()} ${firstLast}`;
                    return css;
                }, this);
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
                this.Flag = ko.observable(Flag.None);
                this.CSSClass = ko.computed(() => {
                    let css = `${this.Color()} ${this.FirstLast}`;
                    //css += this.Highlight() ? ' highlight' : '';
                    css += ` ${this.Flag()}`;
                    return css;
                }, this);
                this.ShowVerses = () => {
                    ko.postbox.publish('Rev-Ref', this.Ref);
                    ko.postbox.publish('Rev-ShowRef', true);
                };
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
                        this.Style += `background:linear-gradient(90deg, #0000 0, #0000 30%, var(--${color}));`;
                        break;
                    case FirstLast.Last:
                        this.Style += `background:linear-gradient(90deg, var(--${color}) 0, #0000 70%);`;
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
