import './main.scss';
import {parseApiData} from '../src/app/utils/parse-api-data';


const apiUrl = 'https://raw.githubusercontent.com/OpenClassrooms-Student-Center/P11-front-end-search-engine/master/recipes.js';

const myHeaders = new Headers();
const myRequest = new Request( apiUrl, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    'Content-Type': 'text/plain'
});

fetch( myRequest )
    .then(response => response.text()) // get api data as 'text/plain'
    .then(data => { 
        let localData = parseApiData(data);  // convert data to JSON
        console.log(localData);
    })
    .catch(error => console.error(error));
