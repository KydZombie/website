import * as jsonLoader from "./json-loader.js";

let translationJson;
let keys = [];

export async function registerAllTranslations(jsonUrl) {
    if (!jsonUrl) {
        let lang = navigator.language.substring(0, 2); // let user change this too.
        jsonUrl = `lang/${lang}.json`;
    }
    translationJson = await jsonLoader.getJson(jsonUrl)
    Object.assign(keys, translationJson);
    console.log("Loaded all translation keys");

    Array.from(document.getElementsByClassName("autotranslate")).forEach(element => {
        asyncTranslate(element.innerHTML).then(result => {
            element.innerHTML = result;
        })
    });
}

export function addTranslation(key, value) {
    keys[key] = value;
}

export async function asyncTranslate(key) {
    let json = await translationJson;
    if (key.includes('.')) {
        return await jsonLoader.traverseJson(json, key);
    }
}

export async function translateElement(element, ...args) {
    for (let i = 0; i < args.length; i++) {
        args[i] = await args[i];
    }
    element.innerHTML = args.join("");
}