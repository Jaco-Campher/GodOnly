namespace GO.Compnents {

    interface iLinkStudyParams {
        Title: string;
        Url: string;
    }

    export class LinkStudyViewModel {
        Title: string;
        Url: string;

        constructor(params: iLinkStudyParams) {
            this.Title = params.Title;
            this.Url = params.Url;
        }

        Navigate = () => {
            go.Navigate(this.Url);
        }
    }
}