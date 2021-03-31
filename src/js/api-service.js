export default class ApiService {
  constructor() {
    this.searchQuery = ''
    this.page = 1
   }
  fetchImages() {
      const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=20823750-0b59b5ef6ebc149bfc71c9c45`
   return fetch(url)
      .then(response => response.json())
     .then(({hits}) => {
        this.incrementPage()
        return hits;
      })
  }
  get query() {
    return this.searchQuery
  }
  set query(newQuery) {
    this.searchQuery = newQuery
  }
  incrementPage() {
    this.page +=1
  }
  resetPage() {
    this.page = 1
  }
}