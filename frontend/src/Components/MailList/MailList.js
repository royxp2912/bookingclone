import React from 'react';
import './mailList.scss';

const MailList = () => {
    return (
        <div className="mail">
            <h1 className="mail-title">Tiết kiệm thời gian và tiền bạc!</h1>
            <span className="mail-des">Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn</span>
            <div className="mail-container">
                <input type="email" placeholder="Địa chỉ e-mail của bạn" />
                <button>Đăng ký</button>
            </div>
            <div className="mail-accept">
                <input type="checkbox" />
                <span>Gửi cho tôi đường dẫn để tải ứng dụng Booking.com MIỄN PHÍ!</span>
            </div>
        </div>
    );
};

export default MailList;
