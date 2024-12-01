import React, { useState, useContext, useEffect } from 'react';
import PermitCard from './PermitCard';
import PrimaryButton from './PrimaryButton';
import './Catalog.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { PermitContext } from './PermitContext';
import SortSection from './Select';
import Filters from './Filters';

const options = ["Choose one...", "Duration (Low - High)", "Duration (High - Low)", "Price (Low - High)", "Price (High - Low)", "Name (A - Z)", "Name (Z - A)"];

const Catalog = () => {
  const { permitsData } = useContext(PermitContext);
  const [searchItem, setSearchItem] = useState("");
  const [filteredPermits, setFilteredPermits] = useState([]);
  const [count, setCount] = useState(0);
  const [sortOption, setSortOption] = useState("Choose one...");
  const [durationFilter, setDurationFilter] = useState({ min: "", max: "" });
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  useEffect(() => {
    if (permitsData) {
      const applyFilters = () => {
        const trimmedSearchItem = searchItem.trim().toLowerCase();

        let updatedPermits = permitsData.filter((permit) =>
            permit.location.toLowerCase().includes(trimmedSearchItem)
        );

        if (durationFilter.min) {
          updatedPermits = updatedPermits.filter((permit) => permit.duration >= durationFilter.min);
        }

        if (durationFilter.max) {
          updatedPermits = updatedPermits.filter((permit) => permit.duration <= durationFilter.max);
        }

        if (priceFilter.min) {
          updatedPermits = updatedPermits.filter((permit) => permit.price >= priceFilter.min);
        }

        if (priceFilter.max) {
          updatedPermits = updatedPermits.filter((permit) => permit.price <= priceFilter.max);
        }

        if (sortOption !== "Choose one...") {
          updatedPermits = sortPermits(updatedPermits, sortOption);
        }

        setFilteredPermits(updatedPermits);
      };

      applyFilters();
    }
  }, [permitsData, searchItem, sortOption, durationFilter, priceFilter]);

  const sortPermits = (permitsList, option) => {
    let sortedPermits = [...permitsList];
    switch (option) {
      case "Duration (Low - High)":
        sortedPermits.sort((a, b) => a.duration - b.duration);
        break;
      case "Duration (High - Low)":
        sortedPermits.sort((a, b) => b.duration - a.duration);
        break;
      case "Price (Low - High)":
        sortedPermits.sort((a, b) => a.price - b.price);
        break;
      case "Price (High - Low)":
        sortedPermits.sort((a, b) => b.price - a.price);
        break;
      case "Name (A - Z)":
        sortedPermits.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case "Name (Z - A)":
        sortedPermits.sort((a, b) => b.location.localeCompare(a.location));
        break;
      default:
        break;
    }
    return sortedPermits;
  };

  const handleSearch = (event) => {
    setSearchItem(event.target.value.toLowerCase());
  };

  const handleClear = () => {
    setSearchItem("");
    setSortOption("Choose one...");
    setFilteredPermits(permitsData || []);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handleCount = () => {
    const total = filteredPermits.reduce((partialSum, permit) => partialSum + permit.price, 0);
    setCount(total);
  };

  const handleDurationChange = (value, type) => {
    setDurationFilter((prev) => ({ ...prev, [type]: value }));
  };

  const handlePriceChange = (value, type) => {
    setPriceFilter((prev) => ({ ...prev, [type]: value }));
  };

  return (
      <>
        <Header />

        <div className="catalog-container">
          <div className="catalog-header">
            <PrimaryButton label="Add a Permit" onClick={() => {}} />

            <div className="search-bar">
              <input
                  type="text"
                  placeholder="Search..."
                  value={searchItem}
                  onChange={handleSearch}
              />
              <PrimaryButton label="Clear" onClick={handleClear} />
            </div>
          </div>

          <h2>Manage Permits</h2>

          <SortSection
              options={options}
              sortOption={sortOption}
              handleSort={handleSort}
          />

          <Filters
              onDurationChange={handleDurationChange}
              onPriceChange={handlePriceChange}
          />

          <div className="total-pets-section">
            <h3>Total Permits Value</h3>
            <div className="total-value">
              <PrimaryButton label="Count" onClick={handleCount} />
              <h4>Total: {count}</h4>
            </div>
          </div>

          <div className="product-list">
            {filteredPermits && filteredPermits.map(permit => (
                <PermitCard key={permit.id} permit={permit} />
            ))}
          </div>
        </div>
        <Footer />
      </>
  );
};

export default Catalog;