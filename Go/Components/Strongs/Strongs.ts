namespace GO.Compnents {

    interface iStrongsParams {
        Strongs: string;
        Alt: string;
    }

    export class StrongsViewModel {
        Strongs: string;
        Alt: string;

        constructor(private params: iStrongsParams, componentInfo: KnockoutComponentTypes.ComponentInfo) {
            this.Strongs = `<a href="https://www.blueletterbible.org/lexicon/${params.Strongs}/kjv" target="blank">${params.Strongs}</a>`;
            this.Alt = params.Alt;
        }
    }
}