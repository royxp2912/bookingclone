import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './reserve.scss';

const Reserve = ({ setOpen, hotelId }) => {
    const [select, setSelect] = useState([]);
    const { data, loading, error } = useFetch(`rooms/${hotelId}`);
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate();

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    };
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelect(checked ? [...select, value] : select.filter((item) => item !== value));
    };
    const handleClick = async () => {
        try {
            await Promise.all(
                select.map((roomId) => {
                    const res = axios.put(`rooms/available/${roomId}`, {
                        dates: alldates,
                    });
                    alert('Thành công');
                    return res.data;
                }),
            );
            setOpen(false);
            navigate('/');
        } catch (err) {}
    };
    return (
        <div className="reserve">
            <div className="reserve-container">
                <FontAwesomeIcon icon={faCircleXmark} className="reserve-close" onClick={() => setOpen(false)} />
                <span>Chọn phòng của bạn:</span>
                {data.map((item) => (
                    <div className="reserve-item" key={item._id}>
                        <div className="reserve-info">
                            <div className="reserve-title">{item.title}</div>
                            <div className="reserve-desc">{item.desc}</div>
                            <div className="reserve-max">
                                Số người tối đa: <b>{item.maxPeople}</b>
                            </div>
                            <div className="reserve-price">Giá: {item.price} VNĐ</div>
                        </div>
                        <div className="reserve-selectRoom">
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room" key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="reserve-btn">
                    Đặt Ngay!
                </button>
            </div>
        </div>
    );
};

export default Reserve;
