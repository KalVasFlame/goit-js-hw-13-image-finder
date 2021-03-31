import ApiService from './js/api-service';
import cardsTpl from './templates/cards-template.hbs'
import './styles.css';
const apiService = new ApiService()

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  showMoreBtn:document.querySelector('.show-more-btn'),
  clearBtn:document.querySelector('.clear-btn'),
}

refs.showMoreBtn.style.display = "none";

const appendCardsMarkup = imgs => {
  refs.gallery.insertAdjacentHTML('beforeend', cardsTpl(imgs))
}
const clearCardsMarkup = () => {
  refs.gallery.innerHTML = '';
}

const onShowMoreBtnClick = () => {
  apiService.fetchImages().then(hits => {
    appendCardsMarkup(hits)
  })
}
const onSearch = e => {
  e.preventDefault()
  apiService.query = e.currentTarget.elements.query.value;
  if (apiService.query.trim() === '') {
    return alert('Please Enter Search Query')
  }
  apiService.resetPage()
  apiService.fetchImages().then(hits => {
    clearCardsMarkup()
    appendCardsMarkup(hits)
    refs.showMoreBtn.style.display = "block";
  })
}
const onClearBtnClick = () => {
  refs.showMoreBtn.style.display = "none";
  refs.gallery.innerHTML = '';

}

refs.searchForm.addEventListener('submit', onSearch)
refs.showMoreBtn.addEventListener('click', onShowMoreBtnClick)
refs.clearBtn.addEventListener('click', onClearBtnClick)