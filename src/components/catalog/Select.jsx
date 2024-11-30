import React from 'react';
import './Select.css'

const SortSection = ({ sortOption, handleSort, options}) => (
    <div className="sort-section">
        <label>Sort by:</label>
        <select value={sortOption} onChange={handleSort}>
            {options.map(([option, value], index) => (
                <option key={index} value={value}>{option}</option>
            ))}
        </select>
    </div>
);

export default SortSection;