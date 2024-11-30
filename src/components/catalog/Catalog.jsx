import React, {useEffect, useState} from 'react';
import PermitCard from './PermitCard';
import './Catalog.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SortSection from './Select';
import Filters from './Filters';
import Loader from "../Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import transportationReducer, {getTransportations} from "../../store/TransportationSlice";
import { setSearchOptions } from "../../store/TransportationSlice";

const options = [["Choose one...", ""], ["Duration (Low - High)", "duration:ASC"], ["Duration (High - Low)", "duration:DESC"], ["Price (Low - High)", "price:ASC"], ["Price (High - Low)", "price:DESC"], ["Name (A - Z)", "location:ASC"], ["Name (Z - A)", "location:DESC"]];

const Catalog = () => {
  const { transportation, searchOptions, status } = useSelector(state => state.transportationReducer);
  const dispatch = useDispatch();

  const [sort, setSort] = useState("");
  const [minDuration, setMinDuration] = useState();
  const [maxDuration, setMaxDuration] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [searchInput, setSearchInput] = useState('');


  const handleSearchOptionChange = (searchOptionName, searchOptionValue) => {
    dispatch(setSearchOptions({
        ...searchOptions,
        [searchOptionName]: searchOptionValue
    }));
  };


  useEffect(() => {
    dispatch(getTransportations(searchOptions));
  }, [dispatch, searchOptions]);

  return (
      <>
        <Header />

        <div className="catalog-container">
          <div className="catalog-header">
            <form className="search-bar" onSubmit={(e) => {
                e.preventDefault();
                dispatch(setSearchOptions({...searchOptions, search: searchInput}));
            }}>
              <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={event => {setSearchInput(event.target.value)}}
              />
              <button type={"submit"}>Search</button>
            </form>
          </div>

          <h2>Manage Permits</h2>

          <SortSection
              options={options}
              sortOption={sort}
              handleSort={e => {
                  handleSearchOptionChange('sort', e.target.value);
                  setSort(e.target.value);
              }}
          />

          <Filters
              minDuration={minDuration}
              maxDuration={maxDuration}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onDurationMinChange={e => {
                  handleSearchOptionChange('min_duration', e.target.value);
                  setMinDuration(e.target.value);
              }}
              onDurationMaxChange={e => {
                  handleSearchOptionChange('max_duration', e.target.value);
                  setMaxDuration(e.target.value);
              }}
              onPriceMinChange={e => {
                  handleSearchOptionChange('min_price', e.target.value);
                  setMinPrice(e.target.value);
              }}
              onPriceMaxChange={e => {
                  handleSearchOptionChange('max_price', e.target.value);
                  setMaxPrice(e.target.value);
              }}
          />
          {status === "loading" && <Loader />}
          <div className="product-list">
            {status === "success"  && transportation && transportation.map(permit => (
                <PermitCard key={permit.id} permit={permit} />
            ))}
          </div>
        </div>
        <Footer />
      </>
  );
};

export default Catalog;