namespace GO.Tools {

    interface Verse {
        Ref: string;
        Text: string;

        Locations: Array<string>;
        Links: Array<Array<string>>;

        ManLocations: Array<string>;
        ManLinks: Array<Array<string>>;

        WomanLocations: Array<string>;
        WomanLinks: Array<Array<string>>;

        CSSClass: KnockoutObservable<string>;
    }

    export class SexFamilyViewModel {

        Links: KnockoutObservableArray<Link> = ko.observableArray<Link>([]);
        People: KnockoutObservableArray<Person> = ko.observableArray<Person>([]);

        Verses: KnockoutObservableArray<Verse> = ko.observableArray<Verse>([]);
        CurrentVerse?: Verse;

        Dim: KnockoutObservable<boolean> = ko.observable(false);
        Gender: KnockoutObservable<string> = ko.observable('Both');

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
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

            if (this.CurrentVerse == undefined) { return; }
            this.ClearHighlight();


            //People
            for (let person of this.People()) {
                this.HighlightLocations(person, this.CurrentVerse);
            }

            //Links
            this.HighlightLinks(this.CurrentVerse);
        }

        Highlight = (verse: Verse) => {
            this.ClearHighlight();

            if (this.CurrentVerse != null) {
                if (this.CurrentVerse.Ref == verse.Ref) {
                    verse.CSSClass('');
                    this.Dim(false);
                    this.CurrentVerse = undefined;
                    return;
                } else {
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
        }

        HighlightLinks(verse: Verse) {
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
        HighlightLocations(person: Person, verse: Verse) {
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
                            if (per.Gender == 'M') { per.Highlight(true); }
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

        SetAllowForVerse(person: Person, verse: Verse) {
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
                            if (per.Gender == 'M') { per.IsAllowed(false); }
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

            let sisterInLaw2: Person = new Person('Sister In Law', 'F', 'sister-law2', 'Lev 18:16a', '');
            sisterInLaw2.IsConditional(true);
            this.People.push(sisterInLaw2);
            this.People.push(new Person('Brother In Law', 'M', 'brother-law2', '', ''));
            this.People.push(new Person('Sister', 'F', 'sister2', 'Lev 18:9a, 11', 'Lev 20:17'));

            //You
            /*this.People.push(new Person('You', 'Y', 'you', '', ''));*/
            this.People.push(new Person('Spouse', 'S', 'spouse', '', ''));

            let wifeSister: Person = new Person(`Wife's Sister`, 'S', 'wife-sister', 'Lev 18:18', '');
            wifeSister.IsConditional(true);
            this.People.push(wifeSister);

            //Sibling Mother
            this.People.push(new Person('Sister', 'F', 'sister1', 'Lev 18:9', 'Lev 20:17'));
            this.People.push(new Person('Brother In Law', 'M', 'brother-law1', '', ''));

            let sisterInLaw1: Person = new Person('Sister In Law', 'F', 'sister-law1', 'Lev 18:16a', 'Lev 20:21a');
            sisterInLaw1.IsConditional(true);
            sisterInLaw1.Info(`<h2>Testing</h2>
Some other text goes here.`);
            this.People.push(sisterInLaw1);
            this.People.push(new Person('Brother', 'M', 'brother1', 'Lev 18:16b', 'Lev 20:17, 21b'));

            this.People.push(new Person('Sister', 'F', 'sister6', 'Lev 18:9', 'Lev 20:17'));
            this.People.push(new Person('Brother In Law', 'M', 'brother-law6', '', ''));

            let sisterInLaw5: Person = new Person('Sister In Law', 'F', 'sister-law5', 'Lev 18:16a', '');
            sisterInLaw5.IsConditional(true);
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
                Text: `The nakedness of thy father, or the nakedness of thy mother, shalt thou not uncover: she is thy mother; thou shalt not uncover her nakedness.`,
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
                Text: `The nakedness of thy father's wife shalt thou not uncover: it is thy father's nakedness.`,
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
                Text: `The nakedness of thy sister, the daughter of thy father, or daughter of thy mother, whether she be born at home, or born abroad, even their nakedness thou shalt not uncover.`,
                Locations: ['sister1', 'sister2', 'sister6'],
                Links: [['l37', 'a'], ['l100', 'a'], ['l38', 'a'], ['l39', 'l b'], ['l15', 'a'], ['l101', 'a'], ['l17', 'l b'], ['l81', 't r'], ['l82', 'a'], ['l11', 'a'], ['l91', 'r b'], ['l35', 't r'], ['l36', 'a']],
                ManLocations: [],
                ManLinks: [],
                WomanLocations: ['brother1', 'brother2', 'brother5'],
                WomanLinks: [['l40', 'a'], ['l41', 'a'], ['l39', 'r'], ['l34', 'a'], ['l35', 'l'], ['l80', 'a'], ['l81', 'l']],
                CSSClass: ko.observable('')
            });

            this.Verses.push({
                Ref: 'Lev 18:10',
                Text: `The nakedness of thy son's daughter, or of thy daughter's daughter, even their nakedness thou shalt not uncover: for theirs is thine own nakedness.`,
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
                Text: `The nakedness of thy father's wife's daughter, begotten of thy father, she is thy sister, thou shalt not uncover her nakedness.`,
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
                Text: `Thou shalt not uncover the nakedness of thy father's sister: she is thy father's near kinswoman.`,
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
                Text: `Thou shalt not uncover the nakedness of thy mother's sister: for she is thy mother's near kinswoman.`,
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
                Text: `Thou shalt not uncover the nakedness of thy father's brother, thou shalt not approach to his wife: she is thine aunt.`,
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
                Text: `Thou shalt not uncover the nakedness of thy daughter in law: she is thy son's wife; thou shalt not uncover her nakedness.`,
                Locations: ['daughter-law'],
                Links: [['l44', 'l b'], ['l57', 't l'], ['l56', 'a'], ['l70', 'l r']],
                ManLocations: [],
                ManLinks: [],
                WomanLocations: [],
                WomanLinks: [],
                CSSClass: ko.observable('')
            });

            this.Verses.push({
                Ref: 'Lev 18:16', //TODO: Deut 25:5-10
                Text: `Thou shalt not uncover the nakedness of thy brother's wife: it is thy brother's nakedness.`,
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
                Ref: 'Lev 18:17',
                Text: `Thou shalt not uncover the nakedness of a woman and her daughter, neither shalt thou take her son's daughter, or her daughter's daughter, to uncover her nakedness; for they are her near kinswomen: it is wickedness.`,
                Locations: ['daughter', 'grand-daughter1', 'grand-daughter2'],
                Links: [['l44', 'l b'], ['l57', 'a'], ['l58', 'a'], ['l71', 'l b'], ['l76', 't r'], ['l77', 'a'], ['l56', 'a'], ['l70', 'r b'], ['l73', 't r'], ['l74', 'a']],
                ManLocations: [],
                ManLinks: [],
                WomanLocations: ['son-law', 'mother-husband'],
                WomanLinks: [['l71', 'r'], ['l37', 'a'], ['l100', 't l'], ['l15', 'r b'], ['l101', 'l r'], ['l17', 'l r']],
                CSSClass: ko.observable('')
            });

            this.Verses.push({
                Ref: 'Lev 18:18', //TODO: Vex her. Conditional.
                Text: `Neither shalt thou take a wife to her sister, to vex her, to uncover her nakedness, beside the other in her life time.`,
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
                Text: `Thou shalt not lie with mankind, as with womankind: it is abomination.`,
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
                Text: `And the man that lieth with his father's wife hath uncovered his father's nakedness: both of them shall surely be put to death; their blood shall be upon them.`,
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
                Text: `And if a man lie with his daughter in law, both of them shall surely be put to death: they have wrought confusion; their blood shall be upon them.`,
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
                Text: `If a man also lie with mankind, as he lieth with a woman, both of them have committed an abomination: they shall surely be put to death; their blood shall be upon them.`,
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
                Text: `And if a man take a wife and her mother, it is wickedness: they shall be burnt with fire, both he and they; that there be no wickedness among you.`,
                Locations: [],
                Links: [],
                ManLocations: [],
                ManLinks: [],
                WomanLocations: ['daughter', 'son-law'],
                WomanLinks: [['l44', 'l b'], ['l57', 't r'], ['l58', 'a'], ['l71', 'l r']],
                CSSClass: ko.observable('')
            });

            this.Verses.push({
                Ref: 'Lev 20.17',
                Text: `And if a man shall take his sister, his father's daughter, or his mother's daughter, and see her nakedness, and she see his nakedness; it is a wicked thing; and they shall be cut off in the sight of their people: he hath uncovered his sister's nakedness; he shall bear his iniquity.`,
                Locations: [],
                Links: [],
                ManLocations: ['sister1', 'sister2', 'sister6'],
                ManLinks: [['l37', 'a'], ['l100', 'a'], ['l38', 'a'], ['l39', 'l b'], ['l15', 'a'], ['l101', 'a'], ['l17', 'l b'], ['l81', 't r'], ['l82', 'a'], ['l11', 'a'], ['l91', 'r b'], ['l35', 't r'], ['l36', 'a']],
                WomanLocations: ['brother1', 'brother2', 'brother5'],
                WomanLinks: [['l37', 'a'], ['l100', 'a'], ['l38', 'a'], ['l39', 'l r'], ['l40', 'a'], ['l41', 'a'], ['l39', 'r'], ['l34', 'a'], ['l35', 't l'], ['l15', 'a'], ['l101', 'a'], ['l17', 'l b'], ['l81', 't l'], ['l80', 'a'], ['l11', 'a'], ['l91', 'r b']],
                CSSClass: ko.observable('')
            });

            this.Verses.push({
                Ref: 'Deu 22:30',
                Text: `A man shall not take his father's wife, nor discover his father's skirt.`,
                Locations: [],
                Links: [],
                ManLocations: [],
                ManLinks: [],
                WomanLocations: [],
                WomanLinks: [],
                CSSClass: ko.observable('')
            });
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

        constructor(type: string, location: string) {
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

        Highlight(type: string) {
            this.HighlightMiddle(true);

            if (type == 'a') {
                this.HighlightTop(true);
                this.HighlightLeft(true);
                this.HighlightRight(true);
                this.HighlightBottom(true);
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

    class Person {
        Name: string;
        Gender: string;
        IsAllowed: KnockoutObservable<boolean> = ko.observable(true);
        IsConditional: KnockoutObservable<boolean> = ko.observable(false);
        Highlight: KnockoutObservable<boolean> = ko.observable(false);
        Info: KnockoutObservable<string> = ko.observable('');

        Location: string;

        Vers1: string;
        Vers2: string;

        CSSClass: KnockoutComputed<string> = ko.computed((): string => {
            let css: string = this.IsAllowed() ? '' : 'red';
            css += this.IsConditional() ? ' conditional' : '';
            css += this.Highlight() ? ' highlight' : '';
            return css;
        }, this);

        constructor(name: string, gender: string, location: string, vers1: string, vers2: string) {
            this.Name = name;
            this.Gender = gender;
            this.Location = `grid-area: ${location}`;

            this.Vers1 = vers1;
            this.Vers2 = vers2;
        }
    }

}