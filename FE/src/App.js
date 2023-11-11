import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Homepage';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import OrderPage from './Orderpage';
import LoginCpn from './LoginCpn';
import NotificationComponent from './Notification';
import Shop from './Shop';
import Detail from './Detail';
import DefaultLayout from './Layout/defaultLayOut';
import Admin from './Admin';
import NotFoundPage from './NotfoundPage';
import Info from './Info';
function App() {
    const [show, setShow] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [uid, setUid] = useState(localStorage.getItem('uid'));
    const [refreshToken, setRefreshToken] = useState(null);
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        // Lấy giá trị cookies
        const refreshToken = Cookies.get('refreshToken');
        const authData = Cookies.get('auth');
        // Lưu trữ giá trị cookies vào state
        if (refreshToken) {
            setRefreshToken(refreshToken);
        }

        if (authData) {
            setAuthData(authData);
        }
    }, [refreshToken, authData]);
    return (
        <Router>
            <div className="App" onClick={() => setShowCart(false)}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <DefaultLayout
                                Page={<Home show={show} setShow={setShow} uid={uid} setUid={setUid} />}
                                setShow={setShow}
                                showCart={showCart}
                                setShowCart={setShowCart}
                                setUid={setUid}
                            />
                        }
                    />
                    <Route
                        path="/order"
                        element={
                            <DefaultLayout
                                Page={<OrderPage />}
                                setShow={setShow}
                                showCart={showCart}
                                setShowCart={setShowCart}
                                setUid={setUid}
                            />
                        }
                    />
                    <Route path="/notify" element={<NotificationComponent></NotificationComponent>} />
                    <Route
                        path="/info"
                        element={
                            <DefaultLayout
                                Page={<Info />}
                                setShow={setShow}
                                showCart={showCart}
                                setShowCart={setShowCart}
                                setUid={setUid}
                            />
                        }
                    />
                    <Route
                        path="/admin/*"
                        element={localStorage.getItem('account') === 'admin' ? <Admin /> : <NotFoundPage />}
                    />
                    <Route
                        path="/shop"
                        element={
                            <DefaultLayout
                                Page={<Shop />}
                                setShow={setShow}
                                showCart={showCart}
                                setShowCart={setShowCart}
                                setUid={setUid}
                            />
                        }
                    />
                    <Route
                        path="/detail/:id"
                        element={
                            <DefaultLayout
                                Page={<Detail />}
                                setShow={setShow}
                                showCart={showCart}
                                setShowCart={setShowCart}
                                setUid={setUid}
                            />
                        }
                    />
                    <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
                </Routes>
            </div>
            {show && <LoginCpn setShow={setShow} setUid={setUid} />}
        </Router>
    );
}

export default App;
