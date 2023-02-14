export async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}