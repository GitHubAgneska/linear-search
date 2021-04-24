import './main.scss';
// import {parseApiData} from './app/utils/parse-api-data';


// const apiUrl = 'https://raw.githubusercontent.com/OpenClassrooms-Student-Center/P11-front-end-search-engine/master/recipes.js';
const localUrl = './assets/data.json';

fetch(localUrl)
    .then(response => {
        const contentType = response.headers.get('content-type');
        // console.log('contentType is==', contentType);
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('no JSON content was found!'); }
            return response.json();
        })
        .then(data => console.log(data));











