import * as jsonLoader from "./json-loader.js";

let translationJson: jsonLoader.ParsedJson;
let keys: jsonLoader.ParsedJson = [];

export async function registerAllTranslations(jsonUrl?: string) {
    if (!jsonUrl) {
        let lang = navigator.language.substring(0, 2); // let user change this too.
        jsonUrl = `lang/${lang}.json`;
    }
    await jsonLoader.getJson(jsonUrl).then(newJson => translationJson = newJson);
    Object.assign(keys, translationJson);
    console.log("Loaded all translation keys");

    Array.from(document.getElementsByClassName("autotranslate")).forEach(element => {
        asyncTranslate(element.innerHTML).then((result: string) => {
            element.innerHTML = result;
        })
    });
}

export function addTranslation(key: string, value: string) {
    keys[key] = value;
}

export async function asyncTranslate(key: string): Promise<string> {
    if (key.includes('.')) {
        return jsonLoader.traverseJson(translationJson, key);
    }
    else return keys[key];
}

export async function translateElement(element: HTMLElement, ...args: Array<Promise<string> | string>) {
    let awaitedArgs: string[] = [];
    for (let i = 0; i < args.length; i++) {
        awaitedArgs[i] = await args[i];
    }
    element.innerHTML = awaitedArgs.join("");
}