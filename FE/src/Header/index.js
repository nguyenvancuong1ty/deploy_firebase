import './Header.css';
import '../Cart/Cart.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import Search from '~/Search';
import { reset, setCurrent, setDataCart, setAuth, setNumberNotify, setTypeProduct } from '~/redux';
import { Modal } from 'antd';
import Cart from '~/Cart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Notify from '~/component/Notify';

import { db, messaging } from '~/firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { onMessage } from 'firebase/messaging';

const { confirm } = Modal;
function Header(props) {
    const dispatch = useDispatch();
    const number = useSelector((state) => state.numberReducer.number);
    const numberNotify = useSelector((state) => state.numberNotifyReduce.numberNotify);
    const dataCart = useSelector((state) => state.dataCartReducer.dataCart);
    const isLogin = useSelector((state) => state.AuthReducer.Auth);
    const uid = localStorage.getItem('uid');
    const [showListNotify, setShowListNotify] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notifyData, setNotifyData] = useState([]);
    useEffect(() => {
        onMessage(messaging, (payload) => {
            console.log(payload);
            toast.info('Bạn có 1 thông báo mới', {
                position: 'bottom-left',
                autoClose: 4000,
                hideProgressBar: false,
                progress: undefined,
                theme: 'light',
            });
        });
    }, []);
    useEffect(() => {
        const handleClick = () => {
            showListNotify && setShowListNotify(false);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [showListNotify]);

    useEffect(() => {
        setLoading(true);
        const notifyRef = collection(db, 'notify');
        const queryRef = query(
            notifyRef,
            where('user_id', '==', [localStorage.getItem('uid')]),
            where('deleted', '==', false),
            orderBy('time', 'desc'),
        );

        const queryRefAll = query(notifyRef, where('isAll', '==', true), where('deleted', '==', false));

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            isLogin &&
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        const newNotify = change.doc.data();
                        localStorage.getItem('uid') &&
                            setNotifyData((prev) => [{ id: change.doc.id, ...newNotify }, ...prev]);
                    }
                });

            setLoading(false);
        });

        const unsubscribeAll = onSnapshot(queryRefAll, (snapshot) => {
            isLogin &&
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        const newNotify = change.doc.data();
                        localStorage.getItem('uid') &&
                            setNotifyData((prev) => [{ id: change.doc.id, ...newNotify }, ...prev]);
                    }
                });

            setLoading(false);
        });

        return () => {
            unsubscribe();
            unsubscribeAll();
        };
    }, [isLogin]);
    useEffect(() => {
        const newData =
            notifyData.length > 0 &&
            notifyData.filter((item) => {
                return !item.isRead || !item.user_id.includes(localStorage.getItem('uid'));
            });
        dispatch(setNumberNotify(newData.length));
    }, [notifyData]);
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
                dispatch(setNumberNotify(0));
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
    useEffect(() => {
        const newData = notifyData.sort((a, b) => {
            return b.time.seconds - a.time.seconds;
        });
        setNotifyData(newData);
    }, [notifyData]);
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
                            <li
                                className="shop header__opstion--item"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowListNotify(true);
                                }}
                            >
                                <div className="header__opstion--link">
                                    <FontAwesomeIcon
                                        icon={faBell}
                                        className={`header__opstion--img ${numberNotify > 0 && 'notify__icon'}`}
                                        size="xl"
                                    />
                                    <p className="header__opstion--title">Thông báo</p>{' '}
                                    {numberNotify > 0 && (
                                        <div className="number__product">
                                            <span className="number">{numberNotify}</span>
                                        </div>
                                    )}
                                    {showListNotify && <Notify loading={loading} notifyData={notifyData} />}
                                </div>
                            </li>
                            <li className="header__opstion--item account">
                                {uid ? (
                                    <>
                                        <div className="header__opstion--link" onClick={handleLogout}>
                                            <img
                                                src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/account-icon.webp"
                                                alt=""
                                                className="header__opstion--img"
                                            />
                                            <p className="header__opstion--title">Đăng xuất</p>
                                        </div>
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.setShowCart(true);
                                }}
                            >
                                <div to="/cart" className="header__opstion--link">
                                    <img
                                        src="https://raw.githubusercontent.com/nguyenvancuong1ty/imagas/main/cart-icon.webp"
                                        alt=""
                                        className="header__opstion--img"
                                    />
                                    <p className="header__opstion--title">Giỏ hàng</p>
                                    <div className="number__product">
                                        <span className="number">{number}</span>
                                    </div>
                                </div>
                                {props.showCart && <Cart uid={uid} dataCart={dataCart} number={number} />}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container__head">
                    <ul className="grid wide container__head--navbar">
                        <Link
                            to="/"
                            onClick={() => {
                                dispatch(setTypeProduct('cake'));
                                props.setActive(1);
                            }}
                            className={props.active === 1 ? 'head__navbar--item active' : 'head__navbar--item'}
                            id="intro"
                        >
                            <div className="head__navbar--link">
                                <b>Bánh</b>
                            </div>
                        </Link>
                        <Link
                            to="/"
                            onClick={() => {
                                dispatch(setTypeProduct('candy'));
                                props.setActive(2);
                            }}
                            className={props.active === 2 ? 'head__navbar--item active' : 'head__navbar--item'}
                        >
                            <div className="head__navbar--link">
                                <b>Kẹo</b>
                            </div>
                        </Link>
                        <Link
                            to="/"
                            onClick={() => {
                                dispatch(setTypeProduct('houseware'));
                                props.setActive(3);
                            }}
                            className={props.active === 3 ? 'head__navbar--item active' : 'head__navbar--item'}
                        >
                            <div className="head__navbar--link">
                                <b>Đồ gia dụng </b>
                            </div>
                        </Link>
                        <Link
                            to="/"
                            onClick={() => {
                                dispatch(setTypeProduct('electronic device'));
                                props.setActive(4);
                            }}
                            className={props.active === 4 ? 'head__navbar--item active' : 'head__navbar--item'}
                        >
                            <div className="head__navbar--link">
                                <b>Đồ điện tử</b>
                            </div>
                        </Link>
                        <Link
                            to="/"
                            onClick={() => {
                                dispatch(setTypeProduct('smart device'));
                                props.setActive(5);
                            }}
                            className={props.active === 5 ? 'head__navbar--item active' : 'head__navbar--item'}
                        >
                            <div className="head__navbar--link">
                                <b>Thiết bị thông minh</b>
                            </div>
                        </Link>
                        <Link
                            to="/"
                            onClick={() => {
                                dispatch(setTypeProduct('clothes'));
                                props.setActive(6);
                            }}
                            className={props.active === 6 ? 'head__navbar--item active' : 'head__navbar--item'}
                        >
                            <div className="head__navbar--link">
                                <b>Quần áo</b>
                            </div>
                        </Link>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
