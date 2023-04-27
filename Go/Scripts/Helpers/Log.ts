namespace GO {

    interface iActions {
        [index: string]: Array<number>;
    }

    interface iIncompleteLog {
        [index: string]: number;
    }

    export class Logger {

        Actions: iActions = {};
        IncompleteLogs: iIncompleteLog = {};

        constructor() {

        }

        LogStart(name: string) {
            this.IncompleteLogs[name] = performance.now();
        }

        LogEnd(name: string) {
            if (this.IncompleteLogs[name] == undefined) {
                console.error('Log name not found:', name);
                return;
            }

            if (this.Actions[name] == undefined) { this.Actions[name] = []; }
            this.Actions[name].push(performance.now() - this.IncompleteLogs[name]);
        }

        OutputLogs() {
            for (let actionName in this.Actions) {
                console.log(actionName.padEnd(30), this.GetTotal(this.Actions[actionName]).toString().padEnd(25), this.GetAverage(this.Actions[actionName]).toString().padEnd(25), this.Actions[actionName].length.toString().padStart(5));
            }
        }

        GetAverage(numbers: Array<number>): number {
            let total: number = 0;

            for (let num of numbers) {
                total += num;
            }

            return total / numbers.length;
        }

        GetTotal(numbers: Array<number>): number {
            let total: number = 0;

            for (let num of numbers) {
                total += num;
            }

            return total;
        }
    }
}