"use strict";
var GO;
(function (GO) {
    var Tools;
    (function (Tools) {
        class TimelineViewModel {
            //****************************************************************************
            // Constructor
            //****************************************************************************
            constructor() {
                this.Events = ko.observableArray([]);
                this.LoadEvents();
            }
            async LoadEvents() {
                let eventsObject = JSON.parse(await GO.LoadFileData('../../data/events.json'));
                let events = [];
                for (let eventName in eventsObject) {
                    let year;
                    let eventObject = eventsObject[eventName];
                    if (eventObject.AddFrom != undefined) {
                        year = (eventsObject[eventObject.AddFrom].CurrentYear || 0) + eventObject.AddYears;
                    }
                    //else if (eventObject.SubtractFrom != undefined) {
                    //    year = (eventsObject[eventObject.SubtractFrom].CurrentYear || 0) - eventObject.AddYears;
                    //}
                    else {
                        year = eventObject.AddYears;
                    }
                    eventObject.CurrentYear = year;
                    events.push(new EventObject(year, eventObject.YearsSpan == undefined ? `${year}` : `${year} - ${year + eventObject.YearsSpan}`, eventName, eventObject.Refs));
                }
                this.Events(events.sort((a, b) => {
                    if (a.Year > b.Year) {
                        return 1;
                    }
                    if (a.Year < b.Year) {
                        return -1;
                    }
                    return 0;
                }));
            }
        }
        Tools.TimelineViewModel = TimelineViewModel;
        class EventObject {
            constructor(year, yearsDisplay, title, refs) {
                this.Show = ko.observable(false);
                this.ShowHide = () => {
                    this.Show(!this.Show());
                };
                this.ID = title.replace(/ /g, '-');
                this.Refs = refs;
                this.Year = year;
                this.YearsDisplay = yearsDisplay;
                this.Title = title;
            }
        }
    })(Tools = GO.Tools || (GO.Tools = {}));
})(GO || (GO = {}));
