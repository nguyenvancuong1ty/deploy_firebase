import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Descriptions, Input, Modal, Tabs } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import OrderPage from '~/Orderpage';
import { setAuth } from '~/redux';
import HandleLogout from '~/until/handleLogout';
import CartInfo from './CartInfo';
import { useLocation } from 'react-router-dom';

function Info() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const info = useSelector((state) => state.AuthReducer.Auth);
    const [infoChange, setInfoChange] = useState(false);
    const number = useSelector((state) => state.numberReducer.number);
    const dataCart = useSelector((state) => state.dataCartReducer.dataCart);
    const dispatch = useDispatch();
    const { confirm } = Modal;
    const handleInfoChange = (e) => {
        infoChange === false && setInfoChange(true);
        const { name, value } = e.target;
        const newInfo = { ...info, [name]: value };
        dispatch(setAuth(newInfo));
    };
    const updateOk = () =>
        toast.success('Cập nhật thành công', {
            position: 'bottom-left',
            autoClose: 2000,
            progress: undefined,
            theme: 'light',
        });
    const handleUpdateInfo = () => {
        confirm({
            zIndex: 9999,
            // bodyStyle: { height: 150 },
            centered: true,
            icon: <ExclamationCircleFilled />,
            title: 'Cập nhật tài khoản',
            content: 'Bạn chắc chắn muốn cập nhật tài khoản',
            cancelText: 'Hủy',
            onOk() {
                infoChange
                    ? axios({
                          url: `${process.env.REACT_APP_API_URL}/account/${localStorage.getItem('uid')}`,
                          method: 'put',
                          data: info,
                          headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                          },
                      })
                          .then((res) => {
                              sessionStorage.setItem('reduxAuthState', JSON.stringify(info));
                              updateOk();
                          })
                          .catch((e) =>
                              toast.error('Có lỗi sảy ra', {
                                  position: 'bottom-left',
                                  autoClose: 2000,
                                  progress: undefined,
                                  theme: 'light',
                              }),
                          )
                    : updateOk();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const items = info && [
        {
            key: '1',
            label: <span style={{ color: 'rgba(0,0,0,0.77)' }}>Tên</span>,
            children: (
                <Input
                    name="fullName"
                    onChange={handleInfoChange}
                    value={info.fullName || ''}
                    style={{
                        width: 'max-content',
                    }}
                />
            ),
        },
        {
            key: '2',
            label: <span style={{ color: 'rgba(0,0,0,0.77)' }}>Tuổi</span>,
            children: (
                <Input
                    name="age"
                    onChange={handleInfoChange}
                    value={info.age || 0}
                    type="number"
                    style={{
                        width: '50%',
                    }}
                />
            ),
        },
        {
            key: '3',
            label: <span style={{ color: 'rgba(0,0,0,0.77)' }}>Địa chỉ</span>,
            children: (
                <Input
                    name="address"
                    onChange={handleInfoChange}
                    value={info.address || ''}
                    style={{
                        width: '50%',
                    }}
                />
            ),
        },
        {
            key: '4',
            label: <span style={{ color: 'rgba(0,0,0,0.77)' }}>Số điện thoại</span>,
            children: (
                <Input
                    name="phoneNumber"
                    onChange={handleInfoChange}
                    value={info.phoneNumber || ''}
                    style={{
                        width: '50%',
                    }}
                />
            ),
        },
        {
            key: '5',
            label: <span style={{ color: 'rgba(0,0,0,0.77)' }}>Email</span>,
            children: (
                <Input
                    name="email"
                    onChange={handleInfoChange}
                    value={info.email || ''}
                    style={{
                        width: '50%',
                    }}
                />
            ),
        },
        {
            key: '6',
            label: <span style={{ color: 'rgba(0,0,0,0.77)' }}>Tên tài khoản</span>,
            children: (
                <Input
                    name="username"
                    onChange={handleInfoChange}
                    value={info.username || ''}
                    style={{
                        width: 'max-content',
                    }}
                />
            ),
        },
    ];
    const tabItem = [
        {
            label: <span>Thông tin tài khoản</span>,
            key: 1,
            children: (
                <div className="tabs__right">
                    <Descriptions
                        title="Thông tin tài khoản"
                        layout="vertical"
                        items={items}
                        style={{ background: 'rgb(230 230 230)', padding: 12 }}
                    />
                    <div className={'button__left__position'}>
                        <Button onClick={handleUpdateInfo}>Cập nhật tài khoản</Button>
                        <HandleLogout element={<Button>Đăng xuất</Button>}></HandleLogout>
                    </div>
                </div>
            ),
        },
        {
            label: `Đơn hàng`,
            key: 2,
            children: <OrderPage />,
        },
        {
            label: `Giỏ hàng`,
            key: 3,
            children: <CartInfo />,
        },
        {
            label: `Đổi mật khẩu`,
            key: 4,
            children: `vvvvv`,
        },
    ];
    console.log(searchParams.get('active'));
    return (
        <Container>
            <Row>
                <Col>
                    <Tabs tabPosition={'left'} items={tabItem} defaultActiveKey={searchParams.get('active') * 1}></Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default Info;
