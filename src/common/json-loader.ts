export interface ParsedJson {
    [key: string]: any;
}

export async function getJson(url: string): Promise<ParsedJson> {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export async function traverseJson(json: ParsedJson, path: string): Promise<any> {
    let directory = path.split(".").reverse();

    let currentObj = await json;
    while (directory.length > 0) {
        let thing = directory.pop()!;
        currentObj = currentObj[thing];
    }
    return currentObj;
}