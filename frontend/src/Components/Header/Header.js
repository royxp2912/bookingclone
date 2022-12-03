import {
    faBed,
    faCalendarDay,
    faCar,
    faGlobe,
    faPlaceOfWorship,
    faPlane,
    faTaxi,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import './header.scss';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
const Header = ({ type }) => {
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const [openOption, setOpenOption] = useState(false);
    const [destination, setDestination] = useState('');
    const [option, setOption] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });
    const navigate = useNavigate();
    const handleOption = (name, operation) => {
        setOption((prev) => {
            return {
                ...prev,
                [name]: operation === 'i' ? option[name] + 1 : option[name] - 1,
            };
        });
    };

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({ type: 'NEW_SEARCH', payload: { destination, date, option } });
        navigate('/hotels', { state: { destination, date, option } });
    };
    return (
        <div className="header">
            <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
                <ul className="header-list">
                    <li className="header-list__item active">
                        <FontAwesomeIcon className="header-list__item-logo" icon={faBed} />
                        <span className="header-list__item-name">Lưu trú</span>
                    </li>
                    <li className="header-list__item">
                        <FontAwesomeIcon className="header-list__item-logo" icon={faPlane} />
                        <span className="header-list__item-name">Chuyến bay</span>
                    </li>
                    <li className="header-list__item">
                        <FontAwesomeIcon className="header-list__item-logo" icon={faGlobe} />
                        <span className="header-list__item-name">Chuyến bay + Khách sạn</span>
                    </li>
                    <li className="header-list__item">
                        <FontAwesomeIcon className="header-list__item-logo" icon={faCar} />
                        <span className="header-list__item-name">Thuê xe</span>
                    </li>
                    <li className="header-list__item">
                        <FontAwesomeIcon className="header-list__item-logo" icon={faPlaceOfWorship} />
                        <span className="header-list__item-name">Địa điểm tham quan</span>
                    </li>
                    <li className="header-list__item">
                        <FontAwesomeIcon className="header-list__item-logo" icon={faTaxi} />
                        <span className="header-list__item-name">Taxi Sân bay</span>
                    </li>
                </ul>
                {type !== 'list' && (
                    <>
                        <h1 className="header-title">Tìm chỗ nghỉ tiếp theo</h1>
                        <p className="header-desc">Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...</p>
                        <div className="header-search">
                            <div className="header-search__item">
                                <FontAwesomeIcon className="header-search__logo" icon={faBed} />
                                <input
                                    type="text"
                                    className="header-search__input"
                                    placeholder="Bạn muốn đến đâu"
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="header-search__item">
                                <FontAwesomeIcon icon={faCalendarDay} className="header-search__logo" />
                                <span onClick={() => setOpenDate(!openDate)} className="header-search__text">{`${format(
                                    date[0].startDate,
                                    'MM/dd/yyyy',
                                )} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
                                {openDate && (
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className="header-search__date"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>
                            <div className="header-search__item">
                                <FontAwesomeIcon className="header-search__logo" icon={faUser} />
                                <span
                                    onClick={() => setOpenOption(!openOption)}
                                    className="header-search__text"
                                >{`${option.adult} người lớn, ${option.children} trẻ em, ${option.room} phòng`}</span>
                                {openOption && (
                                    <div className="header-search-option">
                                        <div className="header-search-option__item">
                                            <span className="header-search-option__text">Người lớn</span>
                                            <div className="header-search-option__counter">
                                                <button
                                                    disabled={option.adult <= 1}
                                                    className="header-search-option__button"
                                                    onClick={() => handleOption('adult', 'd')}
                                                >
                                                    -
                                                </button>
                                                <span className="header-search-option__text">{option.adult}</span>
                                                <button
                                                    className="header-search-option__button"
                                                    onClick={() => handleOption('adult', 'i')}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="header-search-option__item">
                                            <span className="header-search-option__text">Trẻ em</span>
                                            <div className="header-search-option__counter">
                                                <button
                                                    disabled={option.children <= 0}
                                                    className="header-search-option__button"
                                                    onClick={() => handleOption('children', 'd')}
                                                >
                                                    -
                                                </button>
                                                <span className="header-search-option__text">{option.children}</span>
                                                <button
                                                    className="header-search-option__button"
                                                    onClick={() => handleOption('children', 'i')}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="header-search-option__item">
                                            <span className="header-search-option__text">Phòng</span>
                                            <div className="header-search-option__counter">
                                                <button
                                                    disabled={option.room <= 1}
                                                    className="header-search-option__button"
                                                    onClick={() => handleOption('room', 'd')}
                                                >
                                                    -
                                                </button>
                                                <span className="header-search-option__text">{option.room}</span>
                                                <button
                                                    className="header-search-option__button"
                                                    onClick={() => handleOption('room', 'i')}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="header-search__item">
                                <button className="header-search__button" onClick={handleSearch}>
                                    Tìm
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
