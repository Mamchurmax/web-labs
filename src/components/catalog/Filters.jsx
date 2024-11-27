import React from 'react';
import "./Filters.css"

const Filters = ({ onDurationMinChange, onDurationMaxChange, onPriceMinChange, onPriceMaxChange, minPrice, maxPrice, minDuration, maxDuration }) => {
  return (
    <div className="filters">
      <div className="filter">
        <label htmlFor="duration-min">Duration: from</label>
        <input
          type="number"
          id="duration-min"
          name="duration-min"
          placeholder="min"
          value={minDuration}
          onChange={onDurationMinChange}
        />
        <label htmlFor="duration-max">to</label>
        <input
          type="number"
          id="duration-max"
          name="duration-max"
          placeholder="max"
          value={maxDuration}
          onChange={onDurationMaxChange}
        />
      </div>
      <div className="filter">
        <label htmlFor="price-min">Price: from</label>
        <input
          type="number"
          id="price-min"
          name="price-min"
          placeholder="min"
          value={minPrice}
          onChange={onPriceMinChange}
        />
        <label htmlFor="price-max">to</label>
        <input
          type="number"
          id="price-max"
          name="price-max"
          placeholder="max"
          value={maxPrice}
          onChange={onPriceMaxChange}
        />
      </div>
    </div>
  );
};

export default Filters;