
// const apiUrl = 'https://raw.githubusercontent.com/OpenClassrooms-Student-Center/P11-front-end-search-engine/master/recipes.js';
const localUrl = './assets/data.json';
let localData;
const recipes = [];

export function fetchAllData() {

    fetch(localUrl)
        .then(response => {
            const contentType = response.headers.get('content-type');
            // console.log('contentType is==', contentType);
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError('no JSON content was found!'); }
                return response.json();
            })
            .then(data => {
                localData = data;
                localData.recipes.map(d => {recipes.push(d); });
            })
            .catch(error => console.log(error));
}




