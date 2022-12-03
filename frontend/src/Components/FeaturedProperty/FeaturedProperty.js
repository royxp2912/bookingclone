import React from 'react';
import useFetch from '../../hooks/useFetch';
import './featuredProperty.scss';

const FeaturedProperty = () => {
    const { data, loading, error } = useFetch('hotels/options?features=true&limit=4');

    const images = [
        'https://t-cf.bstatic.com/xdata/images/hotel/square200/34405073.webp?k=8ddc5dfb562077f999427ce13fa59ef7de13fcb4bee37b7a4a3acc7ac7830e9a&o=&s=1',
        'https://t-cf.bstatic.com/xdata/images/hotel/square200/64768782.webp?k=6ce8b6ac08f2b54a21b93b7b3416dc0fd8d6b1f4ca409e5ff0819ba07181eb36&o=&s=1',
        'https://t-cf.bstatic.com/xdata/images/hotel/square200/69813393.webp?k=4c2c17bc614b66329fa6c9ed2554d2f89a911933e56b00b94508cfcc183e4d9e&o=&s=1',
        'https://t-cf.bstatic.com/xdata/images/hotel/square200/85257658.webp?k=3b753fffd29f020beb8747f674ce7e721496577dc3e73dc6fb03f97edb86d701&o=&s=1',
    ];

    return (
        <div className="featuredProperty-list">
            {loading ? (
                'Loading please wait'
            ) : (
                <>
                    {data.map((item) => (
                        <div className="featuredProperty-item" key={item._id}>
                            <img src={item.photos[0]} alt="" className="featuredProperty-img" />
                            <span className="featuredProperty-name">{item.name}</span>
                            <span className="featuredProperty-city">{item.city}</span>
                            <span className="featuredProperty-price">Giá từ {item.cheapestPrice} VNĐ</span>
                            <div className="featuredProperty-rated">
                                <button>9.1</button>
                                <span>Tuyệt hảo</span>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default FeaturedProperty;
