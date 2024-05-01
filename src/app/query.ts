export async function api(route: string) {
    return fetch('api/' + route)
    .catch(err => {
        console.error(`Failed to query API_BASE/${route}: ${err}`);
    })
}