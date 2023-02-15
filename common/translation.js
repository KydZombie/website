let keys = [];

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