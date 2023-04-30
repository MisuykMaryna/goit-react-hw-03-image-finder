import PropTypes from 'prop-types';
import css from './LoadButton.module.css';

export const LoadButton = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.button} onClick={onLoadMore}>
      Load more
    </button>
  );
};


LoadButton.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};