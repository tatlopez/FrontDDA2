import React from 'react';
import './searchBar.css';
import lupa from '../../assets/search-icon.svg';

function SearchBar({ setSearchTerm, style, placeholder }) {
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="searchbar-container" style={style}>
            <input 
                type="text" 
                placeholder={placeholder} 
                className="searchbar-input" 
                onChange={handleInputChange} 
            />
        </div>
    );
}

export default SearchBar;
