import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Admin.css';
import { faBars, faBell, faCartPlus, faFilter, faHouse, faMoneyBill, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ProductPage from './Product';
import AccountPage from './Account';
import DashboardPage from './Dashboard';
import axios from 'axios';
import NotifyPage from './Notify';

import NotifyComponent from '~/component/NotifyComponent';
import { LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import Info from './Info';
import HandleLogout from '~/until/handleLogout';
import TypeProduct from './TypeProduct';
import ImportProductPage from './ImportProductPage';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import OrderPage from './Order';

function Admin() {
    const [showNav, setShowNav] = useState(true);
    const [product, setProduct] = useState([]);
    const [account, setAccount] = useState([]);
    const [order, setOrder] = useState([]);
    const [ordered, setOrdered] = useState([]);

    const nav = [
        {
            title: 'Trang chủ',
            icon: (
                <FontAwesomeIcon icon={faHouse} style={{ color: '#4daf46' }} size="xl" className="admin__nav--icon" />
            ),
            link: 'dashboard',
        },
        {
            title: 'Sản phẩm',
            icon: (
                <FontAwesomeIcon
                    icon={faProductHunt}
                    style={{ color: '#4daf46' }}
                    size="xl"
                    className="admin__nav--icon"
                />
            ),
            link: 'product',
        },
        {
            title: 'Thông báo',
            icon: <FontAwesomeIcon icon={faBell} style={{ color: '#4daf46' }} size="xl" className="admin__nav--icon" />,
            link: 'notify',
        },
        {
            title: 'Tài khoản',
            icon: (
                <FontAwesomeIcon icon={faUsers} style={{ color: '#4daf46' }} size="xl" className="admin__nav--icon" />
            ),
            link: 'account',
        },
        {
            title: 'Loại sản phẩm',
            icon: (
                <FontAwesomeIcon icon={faFilter} style={{ color: '#4daf46' }} size="xl" className="admin__nav--icon" />
            ),
            link: 'type',
        },
        {
            title: 'Đơn hàng',
            icon: (
                <FontAwesomeIcon
                    icon={faCartPlus}
                    style={{ color: '#4daf46' }}
                    size="xl"
                    className="admin__nav--icon"
                />
            ),
            link: 'order-manager',
        },
        // {
        //     title: 'Nhập hàng',
        //     icon: (
        //         <FontAwesomeIcon
        //             icon={faMoneyBill}
        //             style={{ color: '#4daf46' }}
        //             size="xl"
        //             className="admin__nav--icon"
        //         />
        //     ),
        //     link: 'import--product',
        // },
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
                        <Route path="/type" element={<TypeProduct account={account}></TypeProduct>} />
                        <Route path="/order-manager" element={<OrderPage account={account}></OrderPage>} />
                        <Route
                            path="/import--product"
                            element={<ImportProductPage account={account}></ImportProductPage>}
                        />
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
