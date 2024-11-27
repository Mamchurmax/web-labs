import React, {useEffect, useState} from 'react';
import PermitCard from './PermitCard';
import PrimaryButton from './PrimaryButton';
import './Catalog.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SortSection from './Select';
import Filters from './Filters';
import TransportationService from "../../services/TransportationService";
import Loader from "../Loader/Loader";

const options = [["Choose one...", ""], ["Duration (Low - High)", "duration:ASC"], ["Duration (High - Low)", "duration:DESC"], ["Price (Low - High)", "price:ASC"], ["Price (High - Low)", "price:DESC"], ["Name (A - Z)", "location:ASC"], ["Name (Z - A)", "location:DESC"]];

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [minDuration, setMinDuration] = useState();
  const [maxDuration, setMaxDuration] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [searchOptions, setSearchOptions] = useState({});
  const [transportation, setTransportation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const fetchOptions = async () => {
    return await TransportationService.getTransportations(searchOptions);
  }

  useEffect(() => {
    setSearchOptions({
      search: search,
      sort: sort,
      min_duration: minDuration,
      max_duration: maxDuration,
      min_price: minPrice,
      max_price: maxPrice,
    })
  }, [search, sort, minPrice, maxPrice, minDuration, maxDuration]);

  useEffect(() => {
    setLoading(true);
    fetchOptions().then(value => {
        setTransportation(value.data);
      }
    );
    setLoading(false);
  }, [searchOptions]);

  return (
      <>
        <Header />

        <div className="catalog-container">
          <div className="catalog-header">
            <form className="search-bar" onSubmit={(e) => {
                e.preventDefault();
                setSearch(searchInput);
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
              handleSort={event => {setSort(event.target.value)}}
          />

          <Filters
              minDuration={minDuration}
              maxDuration={maxDuration}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onDurationMinChange={event => setMinDuration(event.target.value)}
              onDurationMaxChange={event => setMaxDuration(event.target.value)}
              onPriceMinChange={event => setMinPrice(event.target.value)}
              onPriceMaxChange={event => setMaxPrice(event.target.value)}
          />
          {loading && <Loader />}
          <div className="product-list">
            {!loading && transportation && transportation.map(permit => (
                <PermitCard key={permit.id} permit={permit} />
            ))}
          </div>
        </div>
        <Footer />
      </>
  );
};

export default Catalog;