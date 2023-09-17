import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import galleryCard from "../templates/gallery-card.hbs"


import Notiflix from 'notiflix';
import { PixabaiAPI } from "./pixabay-api";
import refs from "./refs";


const pixabayApi = new PixabaiAPI(40);

refs.form.addEventListener("submit", onSubmit)

const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
        loadMoreData();
    }
}, {
    root: null,
    rootMargin: "600px",
    threshold: 1,
})

function onSubmit(e) {
    e.preventDefault();

    const searchQuery = e.currentTarget.elements.searchQuery.value.trim()
    if (!searchQuery) {
     return   Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

    pixabayApi.q = searchQuery;
    pixabayApi.page = 1;

    pixabayApi.getPhotos().then(data => {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

        refs.list.innerHTML = galleryCard(data.hits)
        if (data.page === 1) {
            return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
        }    
        
    observer.observe(document.querySelector(".target-element"))
        
    }).catch(err =>console.log(err))
}

function loadMoreData() {
    pixabayApi.page += 1;
    pixabayApi.getPhotos().then(resp => {
        if (pixabayApi.page === resp.per_page) {
            observer.unobserve(document.querySelector(".target-element"))
        }
        refs.list.insertAdjacentHTML('beforeend',galleryCard(resp.hits))
    }).catch(err => console.log(err))
}

