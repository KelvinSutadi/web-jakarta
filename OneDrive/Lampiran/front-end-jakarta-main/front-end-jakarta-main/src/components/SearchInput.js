import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchInput.css';
import { API_URLS } from '../config/api';

const SearchInput = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sightData, setSightData] = useState([]);
  const [culinaryData, setCulinaryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URLS}/sight`)
      .then((response) => response.json())
      .then((data) => {
        setSightData(data.map((item, index) => ({
          id: `sight-${index}`, // Ensure unique keys
          name: item.name,
          imageUrl: item.imageUrl,
          index: index,
          type: 'sight'
        })));
      })
      .catch((error) => console.error("Failed to fetch sight data:", error));

    fetch(`${API_URLS}/culinary`)
      .then((response) => response.json())
      .then((data) => {
        setCulinaryData(data.map((item, index) => ({
          id: `culinary-${index}`, // Ensure unique keys
          name: item.name,
          imageUrl: item.imageUrl,
          index: index,
          type: 'culinary'
        })));
      })
      .catch((error) => console.error("Failed to fetch culinary data:", error));
  }, []);

  useEffect(() => {
    const filteredSight = sightData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredCulinary = culinaryData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData([...filteredSight, ...filteredCulinary]);
  }, [searchQuery, sightData, culinaryData]);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchItemClick = (item) => {
    navigate(`/wisata`, { state: { slideIndex: item.index } });
  };

  return (
    <div className="search-container">
      <div className={`searchBox ${isExpanded ? 'expanded' : ''}`}>
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="searchButton" onClick={toggleSearch}>
          <i className="material-icons">search</i>
        </button>
      </div>
      {isExpanded && searchQuery && (
        <div className="searchResults">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id} // Use unique key
                className="searchItem"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSearchItemClick(item)}
              >
                <img src={item.imageUrl} alt={item.name} />
                <div className="searchItemInfo">
                  <h4>{item.name}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="searchItemInfo">
              <h4>No results found</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;








































