import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Admin.css';
import { faBars, faBell, faGauge, faHouse, faUsers, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ProductPage from './Product';
import AccountPage from './Account';
import DashboardPage from './Dashboard';
import axios from 'axios';
import NotifyPage from './Notify';

import NotifyComponent from '~/component/NotifyComponent';
import { ExclamationCircleFilled, LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import Info from './Info';
import confirm from 'antd/es/modal/confirm';
import { useDispatch } from 'react-redux';
import HandleLogout from '~/until/handleLogout';

function Admin() {
    const [showNav, setShowNav] = useState(true);
    const [product, setProduct] = useState([]);
    const [account, setAccount] = useState([]);
    const [order, setOrder] = useState([]);
    const [ordered, setOrdered] = useState([]);

    const nav = [
        {
            title: 'Home',
            icon: (
                <FontAwesomeIcon icon={faHouse} style={{ color: '#4daf46' }} size="xl" className="admin__nav--icon" />
            ),
            link: 'dashboard',
        },
        {
            title: 'Dashboard',
            icon: (
                <FontAwesomeIcon icon={faGauge} style={{ color: '#4daf46' }} size="xl" className="admin__nav--icon" />
            ),
            link: 'dashboard',
        },
        {
            title: 'Product',
            icon: (
                <FontAwesomeIcon
                    icon={faWarehouse}
                    style={{ color: '#4daf46' }}
                    size="xl"
                    className="admin__nav--icon"
                />
            ),
            link: 'product',
        },
        {
            title: 'Notify',
            icon: <FontAwesomeIcon icon={faBell} style={{ color: '#4daf46' }} size="xl" className="admin__nav--icon" />,
            link: 'notify',
        },
        {
            title: 'Account',
            icon: (
                <FontAwesomeIcon icon={faUsers} style={{ color: '#4daf46' }} size="xl" className="admin__nav--icon" />
            ),
            link: 'account',
        },
    ];
    const items = [
        {
            key: '1',
            label: <Link to="/admin/info">Thông tin tài khoản</Link>,
        },
        {
            key: '2',
            label: (
                <HandleLogout
                    element={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Đăng xuất</span>
                            <LogoutOutlined></LogoutOutlined>
                        </div>
                    }
                ></HandleLogout>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];
    const navRef = useRef();
    const handleToggleNav = () => {
        setShowNav(!showNav);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/product/search`,
                });
                setProduct(res.data.metadata);
            } catch {}
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/account/`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setAccount(res.data.metadata);
            } catch {}
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/order/all?type=shipped`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setOrder(res.data.metadata);
            } catch {}
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/order/all?type=pending`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setOrdered(res.data.metadata);
            } catch {}
        };
        fetchData();
    }, []);

    return (
        <div className="admin__body">
            <section className={`admin__nav ${showNav ? '' : 'admin__show'}`} ref={navRef}>
                <NavLink to="/" className="admin__nav--logo">
                    <img src="/logo.webp" alt="" className="logo" />
                </NavLink>
                {nav.map((item) => {
                    return (
                        <NavLink key={item.title} to={item.link} className="admin__router">
                            <div className="admin__nav--item">
                                {item.icon}
                                <h5>{item.title}</h5>
                            </div>
                        </NavLink>
                    );
                })}
            </section>

            <section className={`admin__content ${showNav ? '' : 'full__width'}`}>
                <div className={`admin__content--header ${showNav ? '' : 'header__fullwidth'}`}>
                    <FontAwesomeIcon
                        icon={faBars}
                        size="2xl"
                        onClick={handleToggleNav}
                        className="toggle__navbar"
                        style={{ color: '#fff' }}
                    />
                    <div className="admin__content--header--left">
                        <NotifyComponent page="admin" />

                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                        >
                            <div>
                                <img
                                    className="admin__content--header--avatar"
                                    alt=""
                                    src="https://firebasestorage.googleapis.com/v0/b/fir-44abd.appspot.com/o/files%2Flogo.jpg?alt=media&token=d18dbbe5-a533-4ce5-9d35-d59059b825a9"
                                    width={50}
                                />
                                <p className="admin__content--header--text">Admin</p>
                            </div>
                        </Dropdown>
                    </div>
                </div>
                <section style={{ height: 90 }}></section>
                <div className="admin__container">
                    <Routes>
                        <Route path="/product" element={<ProductPage product={product}></ProductPage>} />
                        <Route path="/notify" element={<NotifyPage product={product}></NotifyPage>} />
                        <Route path="/account" element={<AccountPage account={account}></AccountPage>} />
                        <Route path="/info" element={<Info account={account}></Info>} />
                        <Route
                            path="/dashboard"
                            element={
                                <DashboardPage
                                    product={product}
                                    account={account}
                                    order={order}
                                    ordered={ordered}
                                ></DashboardPage>
                            }
                        />{' '}
                        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                    </Routes>
                </div>
            </section>
        </div>
    );
}

export default Admin;
