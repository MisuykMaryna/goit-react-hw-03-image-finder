import React, { Component } from 'react';
import { getImages } from 'services/Api';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoaderSpinner } from 'components/LoaderSpinner/LoaderSpinner';
import { LoadButton } from 'components/LoadButton/LoadButton';
import { Modal } from 'components/Modal/Modal';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   


export class App extends Component {
  state = {
   images: [],
    isLoading: false,
    query: '',
    page: 1,
    largeImageURL: '',
    showModal: false,
    loadMore: false,
    isEmpty: false,
     error: '',
  }
  resetState() {
    this.setState({
      isLoading: false,
      page: 1,
      largeImageURL: '',
      showModal: false,
      loadMore: false,
      isEmpty: false,
      error: '',
      images: '',
    });
  }
 componentDidUpdate(_, prevState) {
   const { query, page } = this.state;
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.handleGetImages(query, page);
    
    }  
  }

   handleGetImages( query, page) {
    this.setState({ isLoading: true });
      getImages(query, page)
        .then(({ hits, totalHits }) => {
          if (totalHits > page * 12) {
        this.setState({ loadMore: true });
          } else {
             toast.info('You have seen all the pictures');
        this.setState({ loadMore: false });
      }
        if (!hits.length) {
          this.setState({
            isEmpty: true,
          });
          return;
          }
        this.setState({
          images: [...this.state.images, ...this.normalaziedData(hits)],
          LoadMore: this.state.page < Math.ceil(totalHits / 12),
        });
      })
      .catch(error => {
        this.setState({ error: `${error}` });
      })
      .finally(() => this.setState({ isLoading: false }));
  }
  normalaziedData(arr) {
    return arr.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
  }

   handleFormSubmit = query => {
    this.setState({ query });
    this.resetState();
  };
   onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
   openModal = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

   closeModal = () => {
    this.setState({ showModal: false });
  };

   toggleOnLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };
  render() {
    const { query, images, isLoading, LoadMore,largeImageURL, showModal,isEmpty, error } = this.state;
    
    return (
      <>
        <ToastContainer autoClose={2000} />
        <SearchForm onSubmit={this.handleFormSubmit} value={query} />
         {isEmpty && (
          <h2 className={css.errorMsg}>
            Sorry, there is no images for {query}!
          </h2>
        )}
        {error && <h2 className={css.errorMsg}>{error}</h2>}
      
        {images && <ImageGallery
          images={images}
          openModal={this.openModal}
          toggleOnLoading={this.toggleOnLoading}
        />}
        {isLoading && <LoaderSpinner />}
        {LoadMore && !isLoading &&<LoadButton onLoadMore={this.onLoadMore} />}
         {showModal && (
          <Modal onClose={this.closeModal}
            onLoad={this.toggleOnLoading}
              largeImageURL={largeImageURL}>
          </Modal>
        )}
        </>
    )
}

}

