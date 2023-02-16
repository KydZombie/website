import * as jsonLoader from "./json-loader.js";

let translationJson;
let keys = [];

export async function registerAllTranslations(jsonUrl) {
    if (!jsonUrl) {
        jsonUrl = "translation.json";
    }
    translationJson = await jsonLoader.getJson(jsonUrl)
    Object.assign(keys, translationJson);
    console.log("Loaded all translation keys");
}

export function addTranslation(key, value) {
    keys[key] = value;
}

export function translate(key) {
    if (keys[key]) {
        return keys[key];
    }
    else {
        return key;
    }
}


async function asyncTranslate(key) {
    let json = await translationJson;
    if (key.includes('.')) {
        return await jsonLoader.traverseJson(json, key);
    }
}

export async function translateElement(element, key, append) {
    if (!append) {
        append = "";
    }
    element.innerHTML = await asyncTranslate(key) + append;
}