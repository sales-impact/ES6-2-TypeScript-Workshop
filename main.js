import {apiKey, apiUrl} from "./config.js";


const search = async data => {
    if (data.target.value && data.target.value.length > 3) {
        try{
            const result = await getEntities(data.target.value);
            if (result.meta.msg === 'OK') {
                render(result.data);
            }
        }catch (e) {
            console.error(e);
        }

    }
};

const getEntities = search => fetch(`${apiUrl}?q=${search}&api_key=${apiKey}&limit=6`).then(res => res.json()).catch(e => {
    throw e;
});

const render = entities => {
    renderArea.innerHTML = tmplList(entities);
};

const tmplList = entities => `
   <ul>
    ${entities.map(entity => `
        <li>
            <figure>
                <img src="${entity.images.downsized.url}"  />
                <figcaption>${entity.title}</figcaption>
            </figure>
        </li>
    `).join('')}
    </ul>
`;

const searchInput = document.getElementById('search');

const renderArea = document.getElementById('results');

if (searchInput) {
    searchInput.addEventListener('input', search);
}
