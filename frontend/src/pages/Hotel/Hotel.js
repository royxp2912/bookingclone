import { useContext, useState } from 'react';
import './hotel.scss';
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import MailList from '../../Components/MailList/MailList';
import Footer from '../../Components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthenContext';
import Reserve from '../../Components/Reserve/Reserve';

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [sliderNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { data, loading, error } = useFetch(`find/${id}`);

    const { dates, options } = useContext(SearchContext);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    const photos = [
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
        },
    ];

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;
        if (direction === 'l') {
            newSlideNumber = sliderNumber === 0 ? 5 : sliderNumber - 1;
        } else {
            newSlideNumber = sliderNumber === 5 ? 0 : sliderNumber + 1;
        }
        setSlideNumber(newSlideNumber);
    };

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate('/login');
        }
    };
    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? (
                'Loading please wait'
            ) : (
                <div className="hotel-Container">
                    {open && (
                        <div className="sliders">
                            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
                            <FontAwesomeIcon
                                icon={faCircleArrowLeft}
                                className="arrow"
                                onClick={() => handleMove('l')}
                            />
                            <div className="slider-wrapper">
                                <img src={data.photos[sliderNumber]} alt="" className="silder-img" />
                            </div>
                            <FontAwesomeIcon
                                icon={faCircleArrowRight}
                                className="arrow"
                                onClick={() => handleMove('r')}
                            />
                        </div>
                    )}
                    <div className="hotel-wrapper">
                        <button className="hotel-book">Đặt trước hoặc Đặt ngay!</button>
                        <h1 className="hotel-title">{data.name}</h1>
                        <div className="hotel-location">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{data.address}</span>
                        </div>
                        <span className="hotel-distance">Vị trí tuyệt vời – Cách trung tâm {data.distance}km.</span>
                        <div className="hotel-price">
                            Đặt phòng với {data.cheapestPrice} VNĐ tại khách sạn này và nhận dịch vụ taxi ra sân bay miễn phí.
                        </div>
                        <div className="hotel-Images">
                            {data.photos?.map((photo, index) => (
                                <div key={index} className="hotel-imgwapper">
                                    <img onClick={() => handleOpen(index)} src={photo} alt="" className="hotel-Img" />
                                </div>
                            ))}
                        </div>
                        <div className="hotel-detail">
                            <div className="hotel-detail__text">
                                <h1 className="hotel-detail__title">Ở ngay trung tâm Thành phố.</h1>
                                <p className="hotel-detail__desc">{data.desc}</p>
                            </div>
                            <div className="hotel-detail__price">
                                <h1>Hoàn hảo cho kỳ nghỉ {days} đêm!</h1>
                                <span>
                                    Nằm ngay trung tâm {data.city}. Chỗ nghỉ này có một vị trí xuất sắc.
                                </span>
                                <h2>
                                    <b>{days * data.cheapestPrice * options.room} VNĐ</b> ({days} đêm)
                                </h2>
                                <button onClick={handleClick}>Đặt trước hoặc Đặt Ngay!</button>
                            </div>
                        </div>
                    </div>
                    <MailList />
                    <Footer />
                </div>
            )}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
    );
};

export default Hotel;
