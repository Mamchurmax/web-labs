import React from 'react';
import "./Filters.css"

const Filters = ({ onDurationChange, onPriceChange }) => {
  return (
    <div className="filters">
      <div className="filter">
        <label htmlFor="duration-min">Duration: from</label>
        <input
          type="number"
          id="duration-min"
          name="duration-min"
          placeholder="min"
          onChange={(e) => onDurationChange(e.target.value, 'min')}
        />
        <label htmlFor="duration-max">to</label>
        <input
          type="number"
          id="duration-max"
          name="duration-max"
          placeholder="max"
          onChange={(e) => onDurationChange(e.target.value, 'max')}
        />
      </div>
      <div className="filter">
        <label htmlFor="price-min">Price: from</label>
        <input
          type="number"
          id="price-min"
          name="price-min"
          placeholder="min"
          onChange={(e) => onPriceChange(e.target.value, 'min')}
        />
        <label htmlFor="price-max">to</label>
        <input
          type="number"
          id="price-max"
          name="price-max"
          placeholder="max"
          onChange={(e) => onPriceChange(e.target.value, 'max')}
        />
      </div>
    </div>
  );
};

export default Filters;