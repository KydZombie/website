var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jsonLoader from "./json-loader.js";
let translationJson;
let keys = [];
export function registerAllTranslations(jsonUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!jsonUrl) {
            let lang = navigator.language.substring(0, 2); // let user change this too.
            jsonUrl = `lang/${lang}.json`;
        }
        yield jsonLoader.getJson(jsonUrl).then(newJson => translationJson = newJson);
        Object.assign(keys, translationJson);
        console.log("Loaded all translation keys");
        Array.from(document.getElementsByClassName("autotranslate")).forEach(element => {
            asyncTranslate(element.innerHTML).then((result) => {
                element.innerHTML = result;
            });
        });
    });
}
export function addTranslation(key, value) {
    keys[key] = value;
}
export function asyncTranslate(key) {
    return __awaiter(this, void 0, void 0, function* () {
        if (key.includes('.')) {
            return yield jsonLoader.traverseJson(translationJson, key);
        }
        else
            return keys[key];
    });
}
export function translateElement(element, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        let awaitedArgs = [];
        for (let i = 0; i < args.length; i++) {
            awaitedArgs[i] = yield args[i];
        }
        element.innerHTML = awaitedArgs.join("");
    });
}
