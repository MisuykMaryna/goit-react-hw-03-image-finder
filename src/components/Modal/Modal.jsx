import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component { 
 componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown );
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

    render() {
         const { largeImageURL } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
            <div className={css.modal}><img className={css.imageModal} src={largeImageURL} alt={largeImageURL}/></div>
      </div>,
      modalRoot,
    );
  }

}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};