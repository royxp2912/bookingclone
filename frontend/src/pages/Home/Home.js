import React from 'react';
import Featured from '../../Components/Featured/Featured';
import FeaturedProperty from '../../Components/FeaturedProperty/FeaturedProperty';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MailList from '../../Components/MailList/MailList';
import Navbar from '../../Components/Navbar/Navbar';
import Property from '../../Components/Property/Property';
import './home.scss';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="homeContaier">
                <h1 className="homeTitle">Du lịch như người bản địa</h1>
                <span className="Homep">Sau đây là một số điểm đến phổ biến gần đó mà bạn có thể cân nhắc</span>
                <Featured />
                <h1 className="homeTitle">Tìm theo loại chỗ nghỉ</h1>
                <Property />
                <h1 className="homeTitle">Nhà ở mà khác yêu thích</h1>
                <FeaturedProperty />
                <MailList />
                <Footer />
            </div>
        </div>
    );
};

export default Home;
