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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3RyYW5zbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sa0JBQWtCLENBQUM7QUFFL0MsSUFBSSxlQUFzQyxDQUFDO0FBQzNDLElBQUksSUFBSSxHQUEwQixFQUFFLENBQUM7QUFFckMsTUFBTSxVQUFnQix1QkFBdUIsQ0FBQyxPQUFnQjs7UUFDMUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtZQUMzRSxPQUFPLEdBQUcsUUFBUSxJQUFJLE9BQU8sQ0FBQztTQUNqQztRQUNELE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDN0UsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBRTNDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNFLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7Z0JBQ3RELE9BQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLEdBQVcsRUFBRSxLQUFhO0lBQ3JELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDdEIsQ0FBQztBQUVELE1BQU0sVUFBZ0IsY0FBYyxDQUFDLEdBQVc7O1FBQzVDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQixPQUFPLE1BQU0sVUFBVSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDOUQ7O1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUFBO0FBRUQsTUFBTSxVQUFnQixnQkFBZ0IsQ0FBQyxPQUFvQixFQUFFLEdBQUcsSUFBOEM7O1FBQzFHLElBQUksV0FBVyxHQUFhLEVBQUUsQ0FBQztRQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUFBIn0=