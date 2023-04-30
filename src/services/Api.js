import axios from 'axios';
const API_KEY = '34264605-ab9e7d425567024b4a0749b95';
const BASE_URL = 'https://pixabay.com/api/';


 export const getImages = async (query, page = 1) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return await axios.get(url)
    .then(response => {
    return response.data})
}


