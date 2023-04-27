namespace GO {

    //****************************************************************************
    //#region Global Interfaces
    //****************************************************************************
    export interface iNavigationChanged {
        NavChanged?: () => any;
    }

    //#endregion

    //****************************************************************************
    //#region DOM
    //****************************************************************************

    /**
    * Waits for the DOM to be ready before executing the function. This does the same as JQuery $(document).ready, but without the JQuery dependency.
    * @param {function} functionToExecute The function to execute.
    */
    export function DomReady(functionToExecute: any) {
        /in/.test(document.readyState) ? setTimeout(() => { GO.DomReady(functionToExecute) }, 9) : functionToExecute();
    }

    //#endregion
    
    //****************************************************************************
    //#region Load Files
    //****************************************************************************

    interface iLoadedFilePromise {
        [index: string]: Promise<Blob | string | void>;
    }

    let loadedFilePromise: iLoadedFilePromise = {};

    /**
    * Loads and returns the data contained in a file.
    * @param fileUrl The url to the file.
    */
    export function LoadFileData(fileUrl: string): Promise<string> {
        if (loadedFilePromise[fileUrl] != undefined) {
            //This script is already loading or loaded. Return the existing promise.
            return loadedFilePromise[fileUrl] as Promise<string>;
        }

        loadedFilePromise[fileUrl] = fetch(fileUrl, { credentials: 'same-origin' }).then((response: Response) => (response.text()));

        return loadedFilePromise[fileUrl] as Promise<string>;
    }

    export function LoadFileDataArrayBuffer(fileUrl: string): Promise<Blob> {
        if (loadedFilePromise[fileUrl] != undefined) {
            //This script is already loading or loaded. Return the existing promise.
            return loadedFilePromise[fileUrl] as Promise<Blob>;
        }

        loadedFilePromise[fileUrl] = fetch(fileUrl, { credentials: 'same-origin' }).then((response: Response) => (response.blob()));

        return loadedFilePromise[fileUrl] as Promise<Blob>;
    }

    /**
     * Loads a JavaScript file asynchronously at run time.
     * @param {string} url The URL for the script to load.
     * @param {any} ObjectToCheck Optional The object to check. If the Object is found, the script will not be loaded.
     */
    export function LoadScript(url: string, objectToCheck?: any): Promise<void> {
        if (loadedFilePromise[url] != undefined) {
            //This script is already loading or loaded. Return the existing promise.
            return loadedFilePromise[url] as Promise<void>;
        }

        loadedFilePromise[url] = new Promise((complete: (args?: any) => any, failed: (error: any) => any) => {
            if (objectToCheck) {
                //Already loaded
                complete();
                return;
            }

            let scriptElement: HTMLScriptElement = document.createElement('script');
            scriptElement.src = url;
            document.head.appendChild(scriptElement);

            // Attach handlers for all browsers
            scriptElement.onload = function () {
                document.head.removeChild(scriptElement);
                complete();
            };
        });

        return loadedFilePromise[url] as Promise<void>;
    }

    //#endregion

    //****************************************************************************
    //#region Functions
    //****************************************************************************
    export function GetFunctionByName(functionName: string, context: any = window) {
        let namespaces: Array<string> = functionName.split(".");
        let funcName: string | undefined = namespaces.pop();
        //console.log(functionName, context);
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }

        return funcName == undefined ? undefined : context[funcName];
    }

    //#endregion

    //****************************************************************************
    //#region String Functions
    //****************************************************************************
    export function InsertStringAtIndex(text: string, index: number, value: string): string {
        return text.slice(0, index) + value + text.slice(index);
    }

    //#endregion
}