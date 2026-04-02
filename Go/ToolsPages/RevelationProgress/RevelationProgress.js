var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        class RevelationProgressViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Years = ko.observableArray([]);
                this.Events = ko.observableArray([]);
                this.Years.push(new Item('year1', 'year-date', 'Apr 2024'));
                this.Years.push(new Item('year2', 'year-date', 'Apr 2025'));
                this.Years.push(new Item('year3', 'year-date', 'Mar 2026'));
                this.Years.push(new Item('year4', 'year-date', 'Mar 2027'));
                this.Years.push(new Item('year5', 'year-date', 'Mar 2028'));
                this.Years.push(new Item('year6', 'year-date', 'Mar 2029'));
                this.Years.push(new Item('year7', 'year-date', 'Mar 2030'));
                this.Years.push(new Item('year8', 'year-date', 'Mar 2031'));
                this.Years.push(new Item('year9', 'year-date', 'Feb 2032'));
                this.Years.push(new Item('year10', 'year-date', 'Feb 2033'));
                this.Years.push(new Item('year11', 'year-date', 'Feb 2034'));
                this.Years.push(new Item('year12', 'year-date', 'Feb 2035'));
                this.Years.push(new Item('year13', 'year-date', 'Feb 2036'));
                this.Events.push(new Item('seal1', 'event-date', 'Apr 2024'));
                this.Events.push(new Item('seal2', 'event-date', 'Nov 2024'));
                this.Events.push(new Item('seal3', 'event-date', 'Jun 2025'));
                this.Events.push(new Item('seal4', 'event-date', 'Dec 2025'));
                this.Events.push(new Item('seal5', 'event-date', 'Jul 2026'));
                this.Events.push(new Item('seal6', 'event-date', 'Feb 2027'));
                this.Events.push(new Item('seal7', 'event-date', 'Sep 2027'));
                this.Events.push(new Item('trumpet1', 'event-date', 'Apr 2028'));
                this.Events.push(new Item('trumpet2', 'event-date', 'Nov 2028'));
                this.Events.push(new Item('trumpet3', 'event-date', 'Jun 2029'));
                this.Events.push(new Item('trumpet4', 'event-date', 'Jan 2030'));
                this.Events.push(new Item('trumpet5', 'event-date', 'Aug 2030'));
                this.Events.push(new Item('trumpet6', 'event-date', 'Mar 2031'));
                this.Events.push(new Item('trumpet7', 'event-date', 'Sep 2031'));
                this.Events.push(new Item('vial1', 'event-date', 'Apr 2032'));
                this.Events.push(new Item('vial2', 'event-date', 'Nov 2032'));
                this.Events.push(new Item('vial3', 'event-date', 'Jun 2033'));
                this.Events.push(new Item('vial4', 'event-date', 'Jan 2034'));
                this.Events.push(new Item('vial5', 'event-date', 'Aug 2034'));
                this.Events.push(new Item('vial6', 'event-date', 'Mar 2035'));
                this.Events.push(new Item('vial7', 'event-date', 'Oct 2035'));
            }
        }
        Tools.RevelationProgressViewModel = RevelationProgressViewModel;
        class Item {
            constructor(location, type, title) {
                this.Title = title;
                //this.Type = type;
                this.DateStyle = `grid-area: ${location}-date`;
                this.DotStyle = `grid-area: ${location}-dot`;
                this.CSSClass = `${type}`;
            }
        }
    })(Tools = GO.Tools || (GO.Tools = {}));
})(GO || (GO = {}));
