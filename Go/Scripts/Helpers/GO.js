"use strict";
var GO;
(function (GO) {
    //#endregion
    //****************************************************************************
    //#region DOM
    //****************************************************************************
    /**
    * Waits for the DOM to be ready before executing the function. This does the same as JQuery $(document).ready, but without the JQuery dependency.
    * @param {function} functionToExecute The function to execute.
    */
    function DomReady(functionToExecute) {
        /in/.test(document.readyState) ? setTimeout(() => { GO.DomReady(functionToExecute); }, 9) : functionToExecute();
    }
    GO.DomReady = DomReady;
    function ScrollToTop() {
        window.scrollTo({ top: 0 });
    }
    GO.ScrollToTop = ScrollToTop;
    let loadedFilePromise = {};
    /**
    * Loads and returns the data contained in a file.
    * @param fileUrl The url to the file.
    */
    function LoadFileData(fileUrl) {
        if (loadedFilePromise[fileUrl] != undefined) {
            //This script is already loading or loaded. Return the existing promise.
            return loadedFilePromise[fileUrl];
        }
        loadedFilePromise[fileUrl] = fetch(fileUrl, { credentials: 'same-origin' }).then((response) => (response.text()));
        return loadedFilePromise[fileUrl];
    }
    GO.LoadFileData = LoadFileData;
    function LoadFileDataArrayBuffer(fileUrl) {
        if (loadedFilePromise[fileUrl] != undefined) {
            //This script is already loading or loaded. Return the existing promise.
            return loadedFilePromise[fileUrl];
        }
        loadedFilePromise[fileUrl] = fetch(fileUrl, { credentials: 'same-origin' }).then((response) => (response.blob()));
        return loadedFilePromise[fileUrl];
    }
    GO.LoadFileDataArrayBuffer = LoadFileDataArrayBuffer;
    /**
     * Loads a JavaScript file asynchronously at run time.
     * @param {string} url The URL for the script to load.
     * @param {any} ObjectToCheck Optional The object to check. If the Object is found, the script will not be loaded.
     */
    function LoadScript(url, objectToCheck) {
        if (loadedFilePromise[url] != undefined) {
            //This script is already loading or loaded. Return the existing promise.
            return loadedFilePromise[url];
        }
        loadedFilePromise[url] = new Promise((complete, failed) => {
            if (objectToCheck) {
                //Already loaded
                complete();
                return;
            }
            let scriptElement = document.createElement('script');
            scriptElement.src = url;
            document.head.appendChild(scriptElement);
            // Attach handlers for all browsers
            scriptElement.onload = function () {
                document.head.removeChild(scriptElement);
                complete();
            };
        });
        return loadedFilePromise[url];
    }
    GO.LoadScript = LoadScript;
    //#endregion
    //****************************************************************************
    //#region Functions
    //****************************************************************************
    function GetFunctionByName(functionName, context = window) {
        let namespaces = functionName.split(".");
        let funcName = namespaces.pop();
        //console.log(functionName, context);
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return funcName == undefined ? undefined : context[funcName];
    }
    GO.GetFunctionByName = GetFunctionByName;
    //#endregion
    //****************************************************************************
    //#region String Functions
    //****************************************************************************
    function InsertStringAtIndex(text, index, value) {
        return text.slice(0, index) + value + text.slice(index);
    }
    GO.InsertStringAtIndex = InsertStringAtIndex;
    //#endregion
})(GO || (GO = {}));
