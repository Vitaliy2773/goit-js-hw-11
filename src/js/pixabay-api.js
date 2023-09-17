import axios from "axios";


export class PixabaiAPI {
    #BASE_URL = 'https://pixabay.com/api';
    #API_KEY = '39459893-bedb370270db67e1c0c9a6273';
    // #q = '';

    constructor(perPage) {
        this.per_page = perPage;
        this.page = 1;
        this.q = '';
    }

    getPhotos() {

       return axios.get(`${this.#BASE_URL}`, {
    params: {
        q: this.q,
            page: this.page,
            per_page: this.per_page,
            key: this.#API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true'
    }
       })
        .then(resp => resp.data)
    }

}



