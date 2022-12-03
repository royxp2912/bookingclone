import React from 'react';
import useFetch from '../../hooks/useFetch';
import './featured.scss';

const Featured = () => {
    const { data, loading, error } = useFetch('hotels/countByCity?cities=Đà%20Lạt,Hà%20Nội,Vũng%20Tàu');
    return (
        <div className="featured">
            {loading ? (
                'Loading please wait'
            ) : (
                <>
                    <div className="featured-item">
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                            alt="Đà Lạt"
                            className="featured-img"
                        />
                        <div className="featured-title">
                            <h1>Đà Lạt</h1>
                            <h2>{data[0]} chỗ nghỉ</h2>
                        </div>
                    </div>
                    <div className="featured-item">
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
                            alt="Hà Nội"
                            className="featured-img"
                        />
                        <div className="featured-title">
                            <h1>Hà Nội</h1>
                            <h2>{data[1]} chỗ nghỉ</h2>
                        </div>
                    </div>
                    <div className="featured-item">
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
                            alt="Vũng Tàu"
                            className="featured-img"
                        />
                        <div className="featured-title">
                            <h1>Vũng Tàu</h1>
                            <h2>{data[2]} chỗ nghỉ</h2>
                        </div>
                    </div>
                    {/* <div className="featured-item">
                <img
                    src="https://t-cf.bstatic.com/xdata/images/city/square250/688893.webp?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o="
                    alt="Vũng Tàu"
                    className="featured-img"
                />
                <div className="featured-title">
                    <h1>TP Hồ Chí Minh</h1>
                    <h2>5,608 chỗ nghỉ</h2>
                </div>
            </div> */}
                </>
            )}
        </div>
    );
};

export default Featured;
