import { Link } from 'react-router-dom';
import './Cake.css';

function Cake({ item, setShow }) {
    return (
        <>
            <Link to={`/detail/${item.Id}`} className="product__content--item">
                <img src={item.sale ? item.sale.url : './10.webp'} alt="" className="product__content--img" />
                <div className="product__content--text">
                    <p className="product__content--name">{item.name}</p>
                    <p className="product__content--price">{item.price.toLocaleString('en-US')}đ</p>
                    <p className="product__content--sale--price">
                        {(item.sale && item.sale.percent
                            ? item.price - (item.price * item.sale.percent) / 100
                            : item.price
                        ).toLocaleString('en-US')}
                        đ
                    </p>

                    <div className="flashsale__content--bought">
                        <div className="bought">
                            <img
                                src="https://nguyenvancuong1ty.github.io/intern_cake/img/fire-icon.svg"
                                alt=""
                                className="bought--img"
                            />
                            <span className="bought__text">Đã bán</span>
                            <span className="bought__quantity"> {item.sold} </span>
                            <span className="bought__text">Sản phẩm</span>
                        </div>
                        <div
                            className="bought__up"
                            style={{
                                width: `${Math.floor((item.sold / (item.quantity + item.sold)) * 100)}%`,
                            }}
                        ></div>{' '}
                    </div>
                </div>

                <img src={item.images} alt="" className="product__content--img--foreign" />
            </Link>

            {/* {contextHolder2} */}
        </>
    );
}

export default Cake;
