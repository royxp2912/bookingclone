import React from 'react';
import { Link } from 'react-router-dom';
import './searchItem.scss';

const SearchItem = ({ item }) => {
    return (
        <div className="search-item">
            <img src={item.photos[0]} alt="" className="search-img" />
            <div className="search-desc">
                <h1 className="search-title">{item.name}</h1>
                <span className="search-distance">Cách trung tâm {item.distance}km</span>
                <span className="search-taxi">Free Airport Taxi</span>
                <span className="search-subtitle">Studio Apartment with Air Conditioning</span>
                <span className="search-features">{item.desc}</span>
                <span className="search-cancel">Free cancellation</span>
                <span className="search-cancelTitles">You can cancel later, so lock in this great price today!</span>
            </div>
            <div className="search-Detail">
                <div className="search-rate">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>
                <div className="search-detailtext">
                    <span className="search-price">{item.cheapestPrice} VNĐ</span>
                    <span className="search-fees">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="search-buttonOP">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
