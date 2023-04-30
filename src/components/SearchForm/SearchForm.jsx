import { Component } from 'react';
import css from "./SearchForm.module.css"

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineImageSearch } from 'react-icons/md';



export class SearchForm extends Component {
    state = {
        query: "",
    }

    handleChange = (e) => {
        const q = e.target.value.trim().toLowerCase();
        this.setState({query: q})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.query === "") {
            return  toast.warn("Please enter search query");
        }
        this.props.onSubmit(this.state.query);
        this.setState({query: ""})
}
    render() {
        const { query } = this.state;

        return (
            <>
   <header className={css.Searchbar}>
   <form className={css.SearchForm} onSubmit={this.handleSubmit}>
   <button type="submit" className={css.SearchForm_button}>
                            <MdOutlineImageSearch />
    <span className={css.SearchForm_label}>Search</span>
    </button>

    <input
    className={css.SearchForm_input}
    type="text"
    name="search"
    value={query}
    onChange={this.handleChange}
    autocomplete="off"
    autofocus
    placeholder="Search images and photos"
    />
  </form>
</header>
                     
 </>
 )
}
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};