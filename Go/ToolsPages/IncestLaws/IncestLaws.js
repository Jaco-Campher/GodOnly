var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        class IncestLawsViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Links = ko.observableArray([]);
                this.People = ko.observableArray([]);
                this.Verses = ko.observableArray([]);
                this.Dim = ko.observable(false);
                this.Gender = ko.observable('Both');
                this.Highlight = (verse) => {
                    this.ClearHighlight();
                    if (this.CurrentVerse != null) {
                        if (this.CurrentVerse.Ref == verse.Ref) {
                            verse.CSSClass('');
                            this.Dim(false);
                            this.CurrentVerse = undefined;
                            return;
                        }
                        else {
                            this.CurrentVerse.CSSClass('');
                        }
                    }
                    verse.CSSClass('highlight');
                    this.Dim(true);
                    this.CurrentVerse = verse;
                    //People
                    for (let person of this.People()) {
                        this.HighlightLocations(person, verse);
                    }
                    //Links
                    this.HighlightLinks(verse);
                };
                this.LoadPeople();
                this.LoadLinks();
                this.LoadVerses();
                this.SetAllow();
                this.Gender.subscribe(() => {
                    this.HighlightGenderChange();
                }, this);
            }
            ClearHighlight() {
                for (let person of this.People()) {
                    person.Highlight(false);
                }
                for (let link of this.Links()) {
                    link.HighlightTop(false);
                    link.HighlightLeft(false);
                    link.HighlightMiddle(false);
                    link.HighlightRight(false);
                    link.HighlightBottom(false);
                }
            }
            ClearAllow() {
                for (let person of this.People()) {
                    person.IsAllowed(true);
                }
            }
            HighlightGenderChange() {
                this.ClearAllow();
                this.SetAllow();
                if (this.CurrentVerse == undefined) {
                    return;
                }
                this.ClearHighlight();
                //People
                for (let person of this.People()) {
                    this.HighlightLocations(person, this.CurrentVerse);
                }
                //Links
                this.HighlightLinks(this.CurrentVerse);
            }
            HighlightLinks(verse) {
                for (let link of this.Links()) {
                    for (let linkArray of verse.Links) {
                        if (link.Location == `grid-area: ${linkArray[0]}`) {
                            link.Highlight(linkArray[1]);
                        }
                    }
                    //Man
                    if (this.Gender() != 'Woman') {
                        for (let linkArray of verse.ManLinks) {
                            if (link.Location == `grid-area: ${linkArray[0]}`) {
                                link.Highlight(linkArray[1]);
                            }
                        }
                    }
                    //Woman
                    if (this.Gender() != 'Man') {
                        for (let linkArray of verse.WomanLinks) {
                            if (link.Location == `grid-area: ${linkArray[0]}`) {
                                link.Highlight(linkArray[1]);
                            }
                        }
                    }
                }
            }
            //TODO: <T> function
            HighlightLocations(person, verse) {
                for (let location of verse.Locations) {
                    if (person.Location == `grid-area: ${location}`) {
                        person.Highlight(true);
                        return;
                    }
                }
                //Man
                if (this.Gender() != 'Woman') {
                    for (let manLocation of verse.ManLocations) {
                        if (manLocation == 'M') {
                            for (let per of this.People()) {
                                if (per.Gender == 'M') {
                                    per.Highlight(true);
                                }
                            }
                            return;
                        }
                        if (person.Location == `grid-area: ${manLocation}`) {
                            person.Highlight(true);
                            return;
                        }
                    }
                }
                //Woman
                if (this.Gender() != 'Man') {
                    for (let womanLocation of verse.WomanLocations) {
                        if (person.Location == `grid-area: ${womanLocation}`) {
                            person.Highlight(true);
                            return;
                        }
                    }
                }
            }
            SetAllow() {
                for (let person of this.People()) {
                    for (let verse of this.Verses()) {
                        this.SetAllowForVerse(person, verse);
                    }
                }
            }
            SetAllowForVerse(person, verse) {
                for (let location of verse.Locations) {
                    if (person.Location == `grid-area: ${location}`) {
                        person.IsAllowed(false);
                        return;
                    }
                }
                //Man
                if (this.Gender() != 'Woman') {
                    for (let manLocation of verse.ManLocations) {
                        if (manLocation == 'M') {
                            for (let per of this.People()) {
                                if (per.Gender == 'M') {
                                    per.IsAllowed(false);
                                }
                            }
                            return;
                        }
                        if (person.Location == `grid-area: ${manLocation}`) {
                            person.IsAllowed(false);
                            return;
                        }
                    }
                }
                //Woman
                if (this.Gender() != 'Man') {
                    for (let womanLocation of verse.WomanLocations) {
                        if (person.Location == `grid-area: ${womanLocation}`) {
                            person.IsAllowed(false);
                            return;
                        }
                    }
                }
            }
            LoadPeople() {
                //Dad Side
                this.People.push(new Person('Grandad', 'M', 'grandad1', 'Lev 18:10a', ''));
                this.People.push(new Person('Grandmother', 'F', 'grandmother1', 'Lev 18:10a', ''));
                this.People.push(new Person('Aunt', 'F', 'aunt1', 'Lev 18:14b', 'Lev 20:20'));
                this.People.push(new Person('Uncle', 'M', 'uncle1', 'Lev 18:14a', ''));
                this.People.push(new Person('Aunt', 'F', 'aunt2', 'Lev 18:12', 'Lev 20:19b'));
                this.People.push(new Person('Uncle', 'M', 'uncle2', '', ''));
                this.People.push(new Person('Cousin (M)', 'M', 'cousin1m', '', ''));
                this.People.push(new Person('Cousin (F)', 'F', 'cousin1f', '', ''));
                this.People.push(new Person('Cousin (M)', 'M', 'cousin2m', '', ''));
                this.People.push(new Person('Cousin (F)', 'F', 'cousin2f', '', ''));
                //Mother Side
                this.People.push(new Person('Grandad', 'M', 'grandad2', 'Lev 18:10b', ''));
                this.People.push(new Person('Grandmother', 'F', 'grandmother2', 'Lev 18:10b', ''));
                this.People.push(new Person('Aunt', 'F', 'aunt3', '', 'Lev 20:20'));
                this.People.push(new Person('Uncle', 'M', 'uncle3', '', ''));
                this.People.push(new Person('Aunt', 'F', 'aunt4', 'Lev 18:13', 'Lev 20:19a'));
                this.People.push(new Person('Uncle', 'M', 'uncle4', '', ''));
                this.People.push(new Person('Cousin (M)', 'M', 'cousin3m', '', ''));
                this.People.push(new Person('Cousin (F)', 'F', 'cousin3f', '', ''));
                this.People.push(new Person('Cousin (M)', 'M', 'cousin4m', '', ''));
                this.People.push(new Person('Cousin (F)', 'F', 'cousin4f', '', ''));
                this.People.push(new Person('Husband', 'M', 'dad-wife-husband', '', ''));
                this.People.push(new Person(`Dad's Wife`, 'F', 'dad-wife', 'Lev 18:8', 'Lev 20:11'));
                this.People.push(new Person('Dad', 'M', 'dad', 'Lev 18:7a', 'Lev 18:8'));
                this.People.push(new Person('Mother', 'F', 'mother', 'Lev 18:7b', 'Lev 20:11'));
                this.People.push(new Person('Husband', 'M', 'mother-husband', 'Lev 18:17a', ''));
                //Siblings Dad
                this.People.push(new Person('Step Brother', 'M', 'brother3', '', ''));
                this.People.push(new Person('Step Sister', 'F', 'sister3', '', ''));
                this.People.push(new Person('Brother', 'M', 'brother2', 'Lev 18:16b', 'Lev 20:17'));
                let sisterInLaw2 = new Person('Sister In Law', 'F', 'sister-law2', 'Lev 18:16a', '');
                sisterInLaw2.IsConditional(true);
                sisterInLaw2.Refs = [{ Ref: 'Deu 25:5-10' }];
                this.People.push(sisterInLaw2);
                this.People.push(new Person('Brother In Law', 'M', 'brother-law2', '', ''));
                this.People.push(new Person('Sister', 'F', 'sister2', 'Lev 18:9a, 11', 'Lev 20:17'));
                //You
                /*this.People.push(new Person('You', 'Y', 'you', '', ''));*/
                this.People.push(new Person('Spouse', 'S', 'spouse', '', ''));
                let wifeSister = new Person(`Wife's Sister`, 'S', 'wife-sister', 'Lev 18:18', '');
                wifeSister.IsConditional(true);
                this.People.push(wifeSister);
                //Sibling Mother
                this.People.push(new Person('Sister', 'F', 'sister1', 'Lev 18:9', 'Lev 20:17'));
                this.People.push(new Person('Brother In Law', 'M', 'brother-law1', '', ''));
                let sisterInLaw1 = new Person('Sister In Law', 'F', 'sister-law1', 'Lev 18:16a', 'Lev 20:21a');
                sisterInLaw1.IsConditional(true);
                sisterInLaw1.Refs = [{ Ref: 'Deu 25:5-10' }];
                this.People.push(sisterInLaw1);
                this.People.push(new Person('Brother', 'M', 'brother1', 'Lev 18:16b', 'Lev 20:17, 21b'));
                this.People.push(new Person('Sister', 'F', 'sister6', 'Lev 18:9', 'Lev 20:17'));
                this.People.push(new Person('Brother In Law', 'M', 'brother-law6', '', ''));
                let sisterInLaw5 = new Person('Sister In Law', 'F', 'sister-law5', 'Lev 18:16a', '');
                sisterInLaw5.IsConditional(true);
                sisterInLaw5.Refs = [{ Ref: 'Deu 25:5-10' }];
                this.People.push(sisterInLaw5);
                this.People.push(new Person('Brother', 'M', 'brother5', 'Lev 18:9, 16b', 'Lev 20:17'));
                //Nephew - Niece
                this.People.push(new Person('Nephew', 'M', 'nephew1', 'Lev 18:12', 'Lev 18:14'));
                this.People.push(new Person('Niece', 'F', 'niece1', 'Lev 18:12', 'Lev 18:14'));
                this.People.push(new Person('Nephew', 'M', 'nephew2', 'Lev 18:13', ''));
                this.People.push(new Person('Niece', 'F', 'niece2', 'Lev 18:13', ''));
                this.People.push(new Person('Nephew', 'M', 'nephew3', 'Lev 18:13', ''));
                this.People.push(new Person('Niece', 'F', 'niece3', 'Lev 18:13', ''));
                this.People.push(new Person('Nephew', 'M', 'nephew4', 'Lev 18:12', 'Lev 18:14'));
                this.People.push(new Person('Niece', 'F', 'niece4', 'Lev 18:12', 'Lev 18:14'));
                this.People.push(new Person('Nephew', 'M', 'nephew5', 'Lev 18:12', 'Lev 18:14'));
                this.People.push(new Person('Niece', 'F', 'niece5', 'Lev 18:12', 'Lev 18:14'));
                this.People.push(new Person('Nephew', 'M', 'nephew6', 'Lev 18:13', ''));
                this.People.push(new Person('Niece', 'F', 'niece6', 'Lev 18:13', ''));
                //Children
                this.People.push(new Person('Daughter In Law', 'F', 'daughter-law', 'Lev 18:15', 'Lev 20:12'));
                this.People.push(new Person('Son', 'M', 'son', 'Lev 18:7', ''));
                this.People.push(new Person('Daughter', 'F', 'daughter', 'Lev 18:7', ''));
                this.People.push(new Person('Son In Law', 'M', 'son-law', 'Lev 18:17a', 'Lev 20:14'));
                //Grand Children
                this.People.push(new Person('Grand Son', 'M', 'grand-son1', '', ''));
                this.People.push(new Person('Grand Daughter', 'F', 'grand-daughter1', 'Lev 18:10a', ''));
                this.People.push(new Person('Grand Son', 'M', 'grand-son2', '', ''));
                this.People.push(new Person('Grand Daughter', 'F', 'grand-daughter2', 'Lev 18:10b', ''));
            }
            LoadLinks() {
                //Dad Side
                this.Links.push(new Link('T', 'l1'));
                this.Links.push(new Link('[', 'l2'));
                this.Links.push(new Link('+', 'l3'));
                this.Links.push(new Link(']', 'l4'));
                this.Links.push(new Link('T', 'l5'));
                this.Links.push(new Link('|', 'l6'));
                this.Links.push(new Link('T', 'l7'));
                this.Links.push(new Link('[', 'l8'));
                this.Links.push(new Link('u', 'l9'));
                this.Links.push(new Link(']', 'l10'));
                this.Links.push(new Link('-', 'l90'));
                this.Links.push(new Link('T', 'l91'));
                this.Links.push(new Link('-', 'l11'));
                this.Links.push(new Link('[', 'l12'));
                this.Links.push(new Link('u', 'l13'));
                this.Links.push(new Link(']', 'l14'));
                this.Links.push(new Link('T', 'l15'));
                this.Links.push(new Link('T', 'l16'));
                this.Links.push(new Link('T', 'l17'));
                //Mother Side
                this.Links.push(new Link('T', 'l18'));
                this.Links.push(new Link('[', 'l19'));
                this.Links.push(new Link('+', 'l20'));
                this.Links.push(new Link(']', 'l21'));
                this.Links.push(new Link('T', 'l22'));
                this.Links.push(new Link('|', 'l23'));
                this.Links.push(new Link('T', 'l24'));
                this.Links.push(new Link('[', 'l25'));
                this.Links.push(new Link('u', 'l26'));
                this.Links.push(new Link(']', 'l27'));
                this.Links.push(new Link('[', 'l28'));
                this.Links.push(new Link('u', 'l29'));
                this.Links.push(new Link(']', 'l30'));
                this.Links.push(new Link('-', 'l101'));
                //Mother Husband
                this.Links.push(new Link('T', 'l110'));
                this.Links.push(new Link('T', 'l111'));
                this.Links.push(new Link('[', 'l112'));
                this.Links.push(new Link('u', 'l113'));
                this.Links.push(new Link(']', 'l114'));
                this.Links.push(new Link('[', 'l115'));
                this.Links.push(new Link('u', 'l116'));
                this.Links.push(new Link(']', 'l117'));
                //Siblings
                this.Links.push(new Link('[', 'l31'));
                this.Links.push(new Link('u', 'l32'));
                this.Links.push(new Link(']', 'l33'));
                this.Links.push(new Link('[', 'l34'));
                this.Links.push(new Link('u', 'l35'));
                this.Links.push(new Link(']', 'l36'));
                this.Links.push(new Link('[', 'l37'));
                this.Links.push(new Link('-', 'l38'));
                this.Links.push(new Link('T', 'l39'));
                this.Links.push(new Link('-', 'l40'));
                this.Links.push(new Link(']', 'l41'));
                this.Links.push(new Link('T', 'l42'));
                this.Links.push(new Link('T', 'l43'));
                //this.Links.push(new Link('-', 'l47'));
                this.Links.push(new Link('[', 'l80'));
                this.Links.push(new Link('u', 'l81'));
                this.Links.push(new Link(']', 'l82'));
                //Wife
                this.Links.push(new Link('T', 'l44'));
                this.Links.push(new Link('-', 'l120'));
                this.Links.push(new Link('T', 'l45'));
                this.Links.push(new Link('T', 'l46'));
                this.Links.push(new Link('u', 'l100'));
                //Nephew - Niece
                this.Links.push(new Link('[', 'l50'));
                this.Links.push(new Link('u', 'l51'));
                this.Links.push(new Link(']', 'l52'));
                this.Links.push(new Link('[', 'l53'));
                this.Links.push(new Link('u', 'l54'));
                this.Links.push(new Link(']', 'l55'));
                //Children
                this.Links.push(new Link('[', 'l56'));
                this.Links.push(new Link('u', 'l57'));
                this.Links.push(new Link(']', 'l58'));
                //Nephew - Niece
                this.Links.push(new Link('[', 'l60'));
                this.Links.push(new Link('u', 'l61'));
                this.Links.push(new Link(']', 'l62'));
                this.Links.push(new Link('[', 'l63'));
                this.Links.push(new Link('u', 'l64'));
                this.Links.push(new Link(']', 'l65'));
                //Grand Children
                this.Links.push(new Link('T', 'l70'));
                this.Links.push(new Link('T', 'l71'));
                this.Links.push(new Link('[', 'l72'));
                this.Links.push(new Link('u', 'l73'));
                this.Links.push(new Link(']', 'l74'));
                this.Links.push(new Link('[', 'l75'));
                this.Links.push(new Link('u', 'l76'));
                this.Links.push(new Link(']', 'l77'));
            }
            LoadVerses() {
                //Lev 18
                this.Verses.push({
                    Ref: 'Lev 18:7',
                    Locations: ['dad', 'mother', 'son', 'daughter'],
                    Links: [['l37', 'b r'], ['l100', 'l t'], ['l15', 'a'], ['l44', 'a'], ['l56', 'a'], ['l57', 'a'], ['l58', 'a']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:8',
                    Locations: ['dad', 'dad-wife'],
                    Links: [['l37', 'b r'], ['l100', 'l t'], ['l15', 'l b'], ['l11', 'l r'], ['l91', 'l r'], ['l90', 'l r']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:9',
                    Locations: ['sister1', 'sister2', 'sister6'],
                    Links: [['l37', 'a'], ['l100', 'a'], ['l38', 'a'], ['l39', 'l b'], ['l15', 'a'], ['l101', 'a'], ['l17', 'l b'], ['l81', 't r'], ['l82', 'a'], ['l11', 'a'], ['l91', 'r b'], ['l35', 't r'], ['l36', 'a']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:10',
                    Locations: ['grand-daughter1', 'grand-daughter2'],
                    Links: [['l44', 'l b'], ['l56', 'a'], ['l57', 'a'], ['l58', 'a'], ['l70', 'r b'], ['l71', 'l b'], ['l73', 't r'], ['l74', 'a'], ['l76', 't r'], ['l77', 'a']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: ['grandad1', 'grandmother1', 'grandad2', 'grandmother2'],
                    WomanLinks: [['l37', 'a'], ['l100', 't l'], ['l15', 'a'], ['l6', 'a'], ['l3', 't b'], ['l1', 'a'], ['l23', 'a'], ['l20', 't b'], ['l18', 'a']],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:11',
                    Locations: ['sister2'],
                    Links: [['l37', 'b r'], ['l100', 'l t'], ['l15', 'l b'], ['l11', 'a'], ['l91', 'r b'], ['l35', 't r'], ['l36', 'a']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:12',
                    Locations: ['aunt2'],
                    Links: [['l37', 'a'], ['l100', 'l t'], ['l15', 'l b'], ['l6', 'a'], ['l3', 'r b'], ['l4', 'a']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: ['nephew1', 'niece1', 'nephew4', 'niece4', 'nephew5', 'niece5'],
                    WomanLinks: [['l37', 'a'], ['l100', 'a'], ['l15', 'a'], ['l11', 'a'], ['l91', 'r b'], ['l35', 't l'], ['l34', 'a'], ['l42', 'r b'], ['l51', 'a'], ['l50', 'a'], ['l52', 'a'],
                        ['l38', 'a'], ['l39', 'l r'], ['l40', 'a'], ['l41', 'a'], ['l46', 'l b'], ['l64', 'a'], ['l63', 'a'], ['l65', 'a'],
                        ['l101', 'a'], ['l17', 'l b'], ['l81', 't l'], ['l80', 'a'], ['l110', 'r b'], ['l113', 'a'], ['l112', 'a'], ['l114', 'a']],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:13',
                    Locations: ['aunt4'],
                    Links: [['l37', 'b r'], ['l100', 'l t'], ['l15', 'r b'], ['l23', 'a'], ['l20', 'r b'], ['l21', 'a']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: ['nephew2', 'niece2', 'nephew3', 'niece3', 'nephew6', 'niece6'],
                    WomanLinks: [['l37', 'b r'], ['l100', 'a'], ['l15', 'a'], ['l11', 'a'], ['l91', 'r b'], ['l35', 't r'], ['l36', 'a'], ['l43', 'l b'], ['l54', 'a'], ['l53', 'a'], ['l55', 'a'],
                        ['l38', 'a'], ['l39', 'l b'], ['l45', 'r b'], ['l61', 'a'], ['l60', 'a'], ['l62', 'a'], ['l101', 'a'], ['l17', 'l b'],
                        ['l81', 't r'], ['l82', 'a'], ['l111', 'l b'], ['l116', 'a'], ['l115', 'a'], ['l117', 'a']],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:14',
                    Locations: ['aunt1', 'uncle1'],
                    Links: [['l37', 'b r'], ['l100', 'l t'], ['l15', 'l b'], ['l6', 'a'], ['l3', 'l b'], ['l2', 'a'], ['l5', 'l r']],
                    ManLocations: ['nephew1', 'niece1', 'nephew4', 'niece4', 'nephew5', 'niece5'],
                    ManLinks: [['l37', 'a'], ['l100', 'a'], ['l15', 'a'], ['l11', 'a'], ['l91', 'r b'], ['l35', 't l'], ['l34', 'a'], ['l42', 'r b'], ['l51', 'a'], ['l50', 'a'], ['l52', 'a'],
                        ['l38', 'a'], ['l39', 'l r'], ['l40', 'a'], ['l41', 'a'], ['l46', 'l b'], ['l64', 'a'], ['l63', 'a'], ['l65', 'a'],
                        ['l101', 'a'], ['l17', 'l b'], ['l81', 't l'], ['l80', 'a'], ['l110', 'r b'], ['l113', 'a'], ['l112', 'a'], ['l114', 'a']],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:15',
                    Locations: ['daughter-law'],
                    Links: [['l44', 'l b'], ['l57', 't l'], ['l56', 'a'], ['l70', 'l r']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:16',
                    Locations: ['brother1', 'sister-law1', 'brother2', 'sister-law2', 'brother5', 'sister-law5'],
                    Links: [['l37', 'a'], ['l100', 'a'], ['l38', 'a'], ['l39', 'l r'], ['l40', 'a'], ['l41', 'a'], ['l46', 'l r'], ['l15', 'a'], ['l11', 'a'], ['l91', 'r b'],
                        ['l35', 't l'], ['l34', 'a'], ['l42', 'l r'], ['l101', 'a'], ['l17', 'l b'], ['l81', 't l'], ['l80', 'a'], ['l110', 'l r']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:17',
                    Locations: ['daughter', 'grand-daughter1', 'grand-daughter2'],
                    Links: [['l44', 'l b'], ['l57', 'a'], ['l58', 'a'], ['l71', 'l b'], ['l76', 't r'], ['l77', 'a'], ['l56', 'a'], ['l70', 'r b'], ['l73', 't r'], ['l74', 'a']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: ['son-law', 'mother-husband'],
                    WomanLinks: [['l71', 'r'], ['l37', 'a'], ['l100', 't l'], ['l15', 'r b'], ['l101', 'l r'], ['l17', 'l r']],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:18',
                    Locations: ['wife-sister'],
                    Links: [['l120', 'a']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 18:22',
                    Locations: [],
                    Links: [],
                    ManLocations: ['M'],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                //Lev 20
                this.Verses.push({
                    Ref: 'Lev 20:11',
                    Locations: [],
                    Links: [],
                    ManLocations: ['dad', 'dad-wife'],
                    ManLinks: [['l37', 'b r'], ['l100', 'l t'], ['l15', 'l b'], ['l11', 'l r'], ['l91', 'l r'], ['l90', 'l r']],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 20:12',
                    Locations: [],
                    Links: [],
                    ManLocations: ['daughter-law'],
                    ManLinks: [['l44', 'l b'], ['l57', 't l'], ['l56', 'a'], ['l70', 'l r']],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 20:13',
                    Locations: [],
                    Links: [],
                    ManLocations: ['M'],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 20:14',
                    Locations: [],
                    Links: [],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: ['daughter', 'son-law'],
                    WomanLinks: [['l44', 'l b'], ['l57', 't r'], ['l58', 'a'], ['l71', 'l r']],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 20:17',
                    Locations: [],
                    Links: [],
                    ManLocations: ['sister1', 'sister2', 'sister6'],
                    ManLinks: [['l37', 'a'], ['l100', 'a'], ['l38', 'a'], ['l39', 'l b'], ['l15', 'a'], ['l101', 'a'], ['l17', 'l b'], ['l81', 't r'], ['l82', 'a'], ['l11', 'a'], ['l91', 'r b'], ['l35', 't r'], ['l36', 'a']],
                    WomanLocations: ['brother1', 'brother2', 'brother5'],
                    WomanLinks: [['l37', 'a'], ['l100', 'a'], ['l38', 'a'], ['l39', 'l r'], ['l40', 'a'], ['l41', 'a'], ['l39', 'r'], ['l34', 'a'], ['l35', 't l'], ['l15', 'a'], ['l101', 'a'], ['l17', 'l b'], ['l81', 't l'], ['l80', 'a'], ['l11', 'a'], ['l91', 'r b']],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 20:19',
                    Locations: ['aunt2', 'aunt4'],
                    Links: [['l37', 'a'], ['l100', 'l t'], ['l15', 'a'], ['l23', 'a'], ['l20', 'r b'], ['l21', 'a'], ['l6', 'a'], ['l3', 'b r'], ['l4', 'a']],
                    ManLocations: [],
                    ManLinks: [],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 20:20',
                    Locations: [],
                    Links: [],
                    ManLocations: ['aunt1', 'aunt3', 'uncle1', 'uncle3'],
                    ManLinks: [['l37', 'a'], ['l100', 'l t'], ['l15', 'a'], ['l23', 'a'], ['l20', 'l b'], ['l19', 'a'], ['l6', 'a'], ['l3', 'l b'], ['l2', 'a'], ['l5', 'l r'], ['l22', 'l r']],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Lev 20:21',
                    Locations: [],
                    Links: [],
                    ManLocations: ['brother1', 'sister-law1', 'brother2', 'sister-law2', 'brother5', 'sister-law5'],
                    ManLinks: [['l37', 'a'], ['l100', 'a'], ['l38', 'a'], ['l39', 'l r'], ['l40', 'a'], ['l41', 'a'], ['l46', 'l r'], ['l15', 'a'], ['l11', 'a'], ['l91', 'r b'],
                        ['l35', 't l'], ['l34', 'a'], ['l42', 'l r'], ['l101', 'a'], ['l17', 'l b'], ['l81', 't l'], ['l80', 'a'], ['l110', 'l r']],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
                this.Verses.push({
                    Ref: 'Deu 22:30',
                    Locations: [],
                    Links: [],
                    ManLocations: ['dad', 'dad-wife'],
                    ManLinks: [['l37', 'b r'], ['l100', 'l t'], ['l15', 'l b'], ['l11', 'l r'], ['l91', 'l r'], ['l90', 'l r']],
                    WomanLocations: [],
                    WomanLinks: [],
                    CSSClass: ko.observable('')
                });
            }
        }
        Tools.IncestLawsViewModel = IncestLawsViewModel;
        class Link {
            constructor(type, location) {
                this.Top = false;
                this.Left = false;
                this.Right = false;
                this.Bottom = false;
                this.HighlightTop = ko.observable(false);
                this.HighlightLeft = ko.observable(false);
                this.HighlightMiddle = ko.observable(false);
                this.HighlightRight = ko.observable(false);
                this.HighlightBottom = ko.observable(false);
                this.Location = `grid-area: ${location}`;
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
        class Person {
            constructor(name, gender, location, vers1, vers2) {
                this.IsAllowed = ko.observable(true);
                this.IsConditional = ko.observable(false);
                this.Highlight = ko.observable(false);
                //Info: KnockoutObservable<string> = ko.observable('');
                this.Refs = [];
                this.CSSClass = ko.computed(() => {
                    let css = this.IsAllowed() ? '' : 'red';
                    css += this.IsConditional() ? ' conditional' : '';
                    css += this.Highlight() ? ' highlight' : '';
                    return css;
                }, this);
                this.Name = name;
                this.Gender = gender;
                this.Location = `grid-area: ${location}`;
                this.Vers1 = vers1;
                this.Vers2 = vers2;
            }
        }
    })(Tools = GO.Tools || (GO.Tools = {}));
})(GO || (GO = {}));
