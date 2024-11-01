import React from 'react';
import './searchBar.css';
import searchIcon from '../../assets/search-icon-white.svg';

function SearchBar({ setSearchTerm, style, placeholder }) {
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="buscar">
            <input type="text" placeholder="Buscar" required onChange={handleInputChange}/>
            <div className="btn">
                <img src={searchIcon} alt='Buscar'/>
            </div>
        </div>
    );
}

export default SearchBar;
