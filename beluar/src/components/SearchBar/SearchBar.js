import React from 'react';
import './searchBar.css';
import lupa from '../../assets/search-icon.png'; 

function SearchBar() {
    return (
        <div className="searchbar-container">
            <input type="text" placeholder="Buscar..." className="searchbar-input" />
            <button className="searchbar-button">
                <img src={lupa} alt="Buscar" className="searchbar-icon" />
            </button>
        </div>
    );
}

export default SearchBar;
