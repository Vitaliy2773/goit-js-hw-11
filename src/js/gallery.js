
import galleryCard from "../templates/gallery-card.hbs"


import Notiflix from 'notiflix';
import { PixabaiAPI } from "./pixabay-api";
import { lightbox } from "./lightbox";


import refs from "./refs";


const pixabayApi = new PixabaiAPI(40);
const modalLightboxGallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

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

async function onSubmit(e) {
    e.preventDefault();
    

    const searchQuery = e.currentTarget.elements.searchQuery.value.trim()
    pixabayApi.q = searchQuery;
    pixabayApi.page = 1;
    if (!searchQuery) {
        return Notiflix.Notify.info("Please enter a search keyword!")
    }
     
      
     

    try {
        const response = await pixabayApi.getPhotos();
        const images = response.data.hits;
        totalHits = response.data.totalHits;
       observer.observe(document.querySelector(".target-element"))
        if (images.length === 0) {
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
         
        else if (totalHits === 1) {
            refs.list.innerHTML = galleryCard(images);
            lightbox.refresh();
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
           
        }
        else {
            refs.list.innerHTML = galleryCard(images);
            lightbox.refresh();
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    } catch (error) {
        console.log(error)
    }
}

async function loadMoreData() {
    pixabayApi.page += 1;
    const totalPages = Math.ceil(totalHits / pixabayApi.per_page);
    if (pixabayApi.page > totalPages) {
    return Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    }
    try {
        const response = await pixabayApi.getPhotos();
        const images = response.data.hits;
        refs.list.insertAdjacentHTML('beforeend', galleryCard(images));
        lightbox.refresh();
          if (pixabayApi.page === totalPages) {
              observer.unobserve(document.querySelector(".target-element"));
        }
    } catch {
        error(console.log(error))
    };
    
   
      
        
    
}

