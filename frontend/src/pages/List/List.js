import './list.scss';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import SearchItem from '../../Components/SearchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

const List = () => {
    const location = useLocation();

    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date);
    const [openDate, setOpenDate] = useState(false);
    const [option, setOption] = useState(location.state.option);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const { data, loading, error, reFetch } = useFetch(
        `hotels/options?city=${destination}&min=${min || 0}&max=${max || 999999999999}`,
    );

    const handleClick = () => {
        reFetch();
    };

    return (
        <div>
            <Navbar /> <Header type="list" />
            <div className="list-container">
                <div className="list-wrapper">
                    <div className="list-search">
                        <h1 className="list-search__title">Tìm</h1>
                        <div className="list-search__item">
                            <label>Điểm đến</label>
                            <input type="text" placeholder={destination} />
                        </div>

                        <div className="list-search__item">
                            <label>Check In</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(
                                date[0].startDate,
                                'MM/dd/yyyy',
                            )} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) => setDate([item.selection])}
                                    minDate={new Date()}
                                    ranges={date}
                                />
                            )}
                        </div>
                        <div className="list-search__item">
                            <label>Option</label>
                            <div className="list-options">
                                <div className="list-option__item">
                                    <span className="list-option__text">
                                        Giá thấp <small>cho 1 đêm</small>
                                    </span>
                                    <input
                                        type="number"
                                        onChange={(e) => setMin(e.target.value)}
                                        className="list-option__input"
                                    />
                                </div>
                                <div className="list-option__item">
                                    <span className="list-option__text">
                                        Giá cao <small>cho 1 đêm</small>
                                    </span>
                                    <input
                                        type="number"
                                        onChange={(e) => setMax(e.target.value)}
                                        className="list-option__input"
                                    />
                                </div>
                                <div className="list-option__item">
                                    <span className="list-option__text">Người lớn</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="list-option__input"
                                        placeholder={option.adult}
                                    />
                                </div>
                                <div className="list-option__item">
                                    <span className="list-option__text">Trẻ em</span>
                                    <input
                                        type="number"
                                        min={0}
                                        className="list-option__input"
                                        placeholder={option.children}
                                    />
                                </div>
                                <div className="list-option__item">
                                    <span className="list-option__text">Phòng</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="list-option__input"
                                        placeholder={option.room}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="list-result">
                        {loading ? (
                            'loading please wait'
                        ) : (
                            <>
                                {data.map((item) => (
                                    <SearchItem item={item} key={item._id} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
