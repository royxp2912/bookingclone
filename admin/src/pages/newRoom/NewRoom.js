import './newRoom.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const NewRoom = ({ inputs, title }) => {
    const [info, setInfo] = useState({});

    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(',').map((room) => ({ number: room }));
        try {
            await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });

            alert("Tạo mới Room Thành công!")
        } catch (err) {
            console.log(err);
        }
    };

    const { data, loading, error } = useFetch('hotels/all');

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Rooms</label>
                                <textarea
                                    onChange={(e) => setRooms(e.target.value)}
                                    placeholder="Đặt dấu , ở giữa mỗi phòng"
                                />
                            </div>
                            <div className="formInput">
                                <label>Choose Hotel</label>
                                <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                                    {loading
                                        ? 'loading'
                                        : data &&
                                          data.map((hotel) => (
                                              <option key={hotel._id} value={hotel._id}>
                                                  {hotel.name}
                                              </option>
                                          ))}
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewRoom;
