namespace GO.Tools {

    interface EventJson {
        AddYears: number;
        YearsSpan?: number;
        Book: string;
        Refs: Array<iRef>;

        AddFrom?: string;
        CSS?: string;

        //Not in JSON
        CurrentYear?: number;
    }

    interface EventsJson {
        [Index: string]: EventJson
    }

    export class TimelineViewModel {

        Events: KnockoutObservableArray<EventObject> = ko.observableArray<EventObject>([]);

        //****************************************************************************
        // Constructor
        //****************************************************************************
        constructor() {
            this.LoadEvents();
        }

        private async LoadEvents() {
            let eventsObject: EventsJson = JSON.parse(await GO.LoadFileData('../../data/events.json'));

            let events: Array<EventObject> = [];

            for (let eventName in eventsObject) {
                let year: number;
                let eventObject: EventJson = eventsObject[eventName];

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

                events.push(new EventObject(
                    year,
                    eventObject.YearsSpan == undefined ? `${year}` : `${year} - ${year + eventObject.YearsSpan}`,
                    eventName,
                    eventObject.Refs
                ));
            }

            this.Events(events.sort((a: EventObject, b: EventObject) => {
                if (a.Year > b.Year) { return 1; }
                if (a.Year < b.Year) { return -1; }
                return 0;
            }));
        }

    }

    class EventObject {
        ID: string;
        Refs: Array<iRef>;
        Year: number;
        YearsDisplay: string;
        Title: string;

        Show: KnockoutObservable<boolean> = ko.observable(false);

        constructor(year: number, yearsDisplay: string, title: string, refs: Array<iRef>) {
            this.ID = title.replace(/ /g, '-');
            this.Refs = refs;
            this.Year = year;
            this.YearsDisplay = yearsDisplay;
            this.Title = title;
        }

        ShowHide = () => {
            this.Show(!this.Show());
        }
    }
}