"use strict";
var GO;
(function (GO) {
    class Logger {
        constructor() {
            this.Actions = {};
            this.IncompleteLogs = {};
        }
        LogStart(name) {
            this.IncompleteLogs[name] = performance.now();
        }
        LogEnd(name) {
            if (this.IncompleteLogs[name] == undefined) {
                console.error('Log name not found:', name);
                return;
            }
            if (this.Actions[name] == undefined) {
                this.Actions[name] = [];
            }
            this.Actions[name].push(performance.now() - this.IncompleteLogs[name]);
        }
        OutputLogs() {
            for (let actionName in this.Actions) {
                console.log(actionName.padEnd(30), this.GetTotal(this.Actions[actionName]).toString().padEnd(25), this.GetAverage(this.Actions[actionName]).toString().padEnd(25), this.Actions[actionName].length.toString().padStart(5));
            }
        }
        GetAverage(numbers) {
            let total = 0;
            for (let num of numbers) {
                total += num;
            }
            return total / numbers.length;
        }
        GetTotal(numbers) {
            let total = 0;
            for (let num of numbers) {
                total += num;
            }
            return total;
        }
    }
    GO.Logger = Logger;
})(GO || (GO = {}));
