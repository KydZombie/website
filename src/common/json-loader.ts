export interface ParsedJson {
    [key: string]: any;
}

export async function getJson(url: string): Promise<ParsedJson> {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export async function traverseJson(json: Record<string, unknown>, path: string): Promise<any> {
    let directory = path.split(".").reverse();

    let currentObj = json;
    while (directory.length > 0) {
        let thing = directory.pop()!;
        console.log()
        currentObj = currentObj[thing] as any;
    }
    return currentObj;
}