export async function getJson(url: string) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export async function traverseJson(json: Promise<Record<string, unknown>>, path: string) {
    let directory = path.split(".").reverse();

    let currentObj = await json;
    while (directory.length > 0) {
        let thing = directory.pop()!;
        console.log()
        currentObj = currentObj[thing] as any;
    }
    return currentObj;
}