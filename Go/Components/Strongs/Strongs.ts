namespace GO.Compnents {

    interface iStrongsParams {
        Strongs: string;
        Alt: string;
    }

    export class StrongsViewModel {
        Strongs: string;
        Alt: string;

        constructor(private params: iStrongsParams, componentInfo: KnockoutComponentTypes.ComponentInfo) {
            this.Strongs = `<a href="https://www.blueletterbible.org/lang/lexicon/lexicon.cfm?t=kjv&strongs=${params.Strongs}" target="blank">${params.Strongs}</a>`;
            this.Alt = params.Alt;
        }
    }
}