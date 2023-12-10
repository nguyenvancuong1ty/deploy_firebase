import './Header.css';
import '../Cart/Cart.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import Search from '~/Search';
import { reset, setCurrent, setDataCart, setAuth, setNumberNotify, setTypeProduct } from '~/redux';
import { resetNumberNotify } from '~/Redux/numberNotifySlice';
import { Modal } from 'antd';
import Cart from '~/Cart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NotifyComponent from '~/component/NotifyComponent';
import { resetNotifyData } from '~/Redux/notifyDataSlice';

const { confirm } = Modal;
function Header(props) {
    const dispatch = useDispatch();
    const number = useSelector((state) => state.numberReducer.number);
    const dataCart = useSelector((state) => state.dataCartReducer.dataCart);
    const uid = localStorage.getItem('uid');
    const [notifyData, setNotifyData] = useState([]);
    const [listType, setListType] = useState([]);
    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_API_URL}/type/product`,
            method: 'get',
        })
            .then((res) => {
                setListType(res.data.metadata);
            })
            .catch((e) => alert(e.message));
    }, []);
    let number_product =
        Array.isArray(dataCart) && dataCart.length > 0
            ? dataCart.reduce((init, item) => {
                  return init + item.quantity;
              }, 0)
            : 0;
    useEffect(() => {
        dispatch(setCurrent(number_product));
    }, [number_product]);
    const navigate = useNavigate();
    useEffect(() => {
        uid &&
            axios({
                url: `${process.env.REACT_APP_API_URL}/cart/${uid}`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((res) => {
                    const newData =
                        res.data.metadata &&
                        res.data.metadata.sort((a, b) => {
                            return b.createdDate._seconds - a.createdDate._seconds;
                        });
                    dispatch(setDataCart(newData));
                })
                .catch((e) => alert(e.message));
        // eslint-disable-next-line
    }, [uid, number]);
    const handleLogout = () => {
        confirm({
            zIndex: 9999,
            bodyStyle: { height: 150 },
            centered: true,
            icon: <ExclamationCircleFilled />,
            title: 'Đăng xuất',
            content: 'Bạn có muốn đăng xuất không?',
            onOk() {
                localStorage.clear();
                dispatch(reset());
                dispatch(resetNumberNotify());
                dispatch(resetNotifyData());
                dispatch(setAuth({}));
                props.setUid(null);
                setNotifyData([]);
                toast.success('Đăng xuất thành công', {
                    position: 'bottom-left',
                    autoClose: 2000,
                    hideProgressBar: false,
                    progress: undefined,
                    theme: 'light',
                });
                navigate('/');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const handleClickOption = () => {};
    return (
        <header>
            <div className="container res_header">
                <div className="row header">
                    <div className="col-xl-3">
                        <NavLink to="/" className="res_logo">
                            <img src="/logo.webp" alt="" className="logo" />
                        </NavLink>
                        <div className="opstion" onClick={handleClickOption}>
                            <div className="opstion--icon"></div>
                            <div className="opstion--icon"></div>
                            <div className="opstion--icon"></div>
                        </div>
                    </div>
                    <div className="col-xl-5 res_search">
                        <Search />
                    </div>
                    <div className="col-xl-4 res_option">
                        <ul className="header__opstion">
                            <li className="order header__opstion--item">
                                <NavLink to="/order" className="header__opstion--link">
                                    <img
                                        src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/order-icon.webp"
                                        alt=""
                                        className="header__opstion--img"
                                    />
                                    <p className="header__opstion--title">Đơn hàng</p>
                                </NavLink>
                            </li>
                            <NotifyComponent />
                            <li className="header__opstion--item account">
                                {uid ? (
                                    <>
                                        <NavLink
                                            to={'/info?active=1'}
                                            className="header__opstion--link"
                                            onClick={() => {
                                                props.setActive('');
                                            }}
                                        >
                                            <img
                                                src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/account-icon.webp"
                                                alt=""
                                                className="header__opstion--img"
                                            />
                                            <p className="header__opstion--title">Tài khoản</p>
                                        </NavLink>
                                    </>
                                ) : (
                                    <div className="header__opstion--link" onClick={() => props.setShow(true)}>
                                        <img
                                            src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/account-icon.webp"
                                            alt=""
                                            className="header__opstion--img"
                                        />
                                        <p className="header__opstion--title">Đăng nhập</p>
                                    </div>
                                )}
                            </li>
                            <li
                                className="header__opstion--item product__show"
                                onMouseOver={() => {
                                    props.setShowCart(true);
                                }}
                                onMouseOut={() => props.setShowCart(false)}
                            >
                                <Link to={`/info?active=3`} className="header__opstion--link">
                                    <img
                                        src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/cart-icon.webp"
                                        alt=""
                                        className="header__opstion--img"
                                    />
                                    <p className="header__opstion--title">Giỏ hàng</p>
                                    <div className="number__product">
                                        <span className="number">{number}</span>
                                    </div>
                                </Link>
                                {props.showCart && <Cart uid={uid} dataCart={dataCart} number={number} />}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container__head">
                    <ul className="grid wide container__head--navbar">
                        {listType.length > 0 &&
                            listType.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to="/"
                                        onClick={() => {
                                            dispatch(setTypeProduct(item.name));
                                            props.setActive(item.name);
                                        }}
                                        className={
                                            props.active === item.name
                                                ? 'head__navbar--item active'
                                                : 'head__navbar--item'
                                        }
                                    >
                                        <div className="head__navbar--link">
                                            <b>{item.vnl}</b>
                                        </div>
                                    </Link>
                                );
                            })}
                       
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
