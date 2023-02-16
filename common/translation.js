import * as jsonLoader from "./json-loader.js";

let translationJson;
let keys = [];

export async function registerAllTranslations(jsonUrl) {
    if (!jsonUrl) {
        jsonUrl = "lang/en.json";
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


export async function asyncTranslate(key) {
    let json = await translationJson;
    if (key.includes('.')) {
        return await jsonLoader.traverseJson(json, key);
    }
    else {
        return translate(key);
    }
}

function format(fmt, ...args) {
    if (!fmt.match(/^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/)) {
        throw new Error('invalid format string.');
    }
    return fmt.replace(/((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g, (m, str, index) => {
        if (str) {
            return str.replace(/(?:{{)|(?:}})/g, m => m[0]);
        } else {
            if (index >= args.length) {
                throw new Error('argument index is out of range in format');
            }
            return args[index];
        }
    });
}

export async function translateElement(element, ...args) {
    for (let i = 0; i < args.length; i++) {
        args[i] = await args[i];
    }
    element.innerHTML = args.join("");
}