import React from 'react';
import './searchBar.css';
import lupa from '../../assets/search-icon.svg'; 

function SearchBar() {
    return (
        <div className="searchbar-container">
            <button className="searchbar-button">
                <img src={lupa} alt="Buscar" className="searchbar-icon" />
            </button>
            <input type="text" placeholder="Buscar..." className="searchbar-input" />
        </div>
    );
}

export default SearchBar;
