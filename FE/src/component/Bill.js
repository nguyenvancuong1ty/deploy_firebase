import React, { memo, useEffect, useState } from 'react';
import { Button, DatePicker, Empty, Modal, Space, Spin } from 'antd';
import { toast } from 'react-toastify';

import axios from 'axios';
const { RangePicker } = DatePicker;
const { confirm } = Modal;
const Bill = ({ items, setType, type, setDataUser, loading, setLoading, buttonActive, setButtonActive }) => {
    const [data, setData] = useState(items);
    useEffect(() => {
        setData(items);
    }, [items]);
    const calculateTotal = () => {
        return data.reduce((total, item) => {
            return total + item.total_amount;
        }, 0);
    };

    const TotalShippingCost = () => {
        return data.reduce((total, item) => {
            return total + item.shipping_cost;
        }, 0);
    };
    console.log(items, type);
    const handleChangeTimePicker = (value) => {
        const newData = items.filter((item) => {
            if (value) {
                if (type === 'pending')
                    return (
                        item.order_date._seconds * 1000 >= value[0].$d.getTime() &&
                        item.order_date._seconds * 1000 < value[1].$d.getTime()
                    );
                if (type === 'shipping')
                    return (
                        item.start_shipping_date._seconds * 1000 >= value[0].$d.getTime() &&
                        item.start_shipping_date._seconds * 1000 < value[1].$d.getTime()
                    );
                if (type === 'shipped')
                    return (
                        item.shipped_date._seconds * 1000 >= value[0].$d.getTime() &&
                        item.shipped_date._seconds * 1000 < value[1].$d.getTime()
                    );
            } else {
                return item;
            }
            return false;
        });
        setData(newData);
    };

    const handlePickup = (item) => {
        confirm({
            zIndex: 9999,
            title: 'Nhận đơn',
            centered: true,
            content: 'Nhận hàng bạn phải chịu toàn bộ trách nhiệm với đơn hàng này?',
            onOk() {
                setLoading(true);
                axios({
                    url: `${process.env.REACT_APP_API_URL}/order?id=${item.Id}&id_user_shipper=${localStorage.getItem(
                        'uid',
                    )}&status=shipping&type_date=start_shipping_date`,
                    method: 'patch',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                    .then(() => {
                        const newData = items.filter((data) => {
                            return data.Id !== item.Id;
                        });
                        setDataUser(newData);
                        setLoading(false);
                        toast.success('Nhận đơn thành công!', { position: toast.POSITION.TOP_CENTER });
                    })
                    .catch(() => {
                        toast.error('Có người đã nhận đơn này rồi', { position: toast.POSITION.TOP_CENTER });
                        axios({
                            url: `${process.env.REACT_APP_API_URL}/order/new-order`,
                            method: 'get',
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }).then((res) => {
                            setDataUser(res.data.data);
                            setLoading(false);
                        });
                    });
            },
            onCancel() {},
        });
    };
    const handleComplete = (item) => {
        confirm({
            zIndex: 9999,
            title: 'Giao hàng thành công',
            centered: true,
            content: 'Bạn đã giao hành thành công chưa?',
            onOk() {
                setLoading(true);
                axios({
                    url: `${process.env.REACT_APP_API_URL}/order?id=${item.Id}&id_user_shipper=${localStorage.getItem(
                        'uid',
                    )}&status=shipped`,
                    method: 'patch',
                    data: {
                        quantity: item.detail.quantity,
                        product_id: item.detail.product_id,
                        modifier: item.detail.modifier,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                    .then(() => {
                        const newData = items.filter((data) => {
                            return data.Id !== item.Id;
                        });
                        setDataUser(newData);
                        setLoading(false);
                        toast.success('Hoàn thành', { position: toast.POSITION.TOP_CENTER });
                    })
                    .catch(() => {});
            },
            onCancel() {},
        });
    };
    const addLeadingZero = (value) => {
        if (value < 10) {
            return '0' + value;
        }
        return value.toString();
    };
    const getDateFormat = (time) => {
        const year = time.getFullYear();
        const month = addLeadingZero(time.getMonth() + 1); // Tháng bắt đầu từ 0, cộng thêm 1 và thêm số 0 nếu cần.
        const day = addLeadingZero(time.getDate());
        const hour = addLeadingZero(time.getHours());
        const minute = addLeadingZero(time.getMinutes());
        const second = addLeadingZero(time.getSeconds());
        return `${day}/${month}/${year}  ${hour}:${minute}:${second}`;
    };
    const handleCancel = (item) => {
        confirm({
            zIndex: 9999,
            title: 'Hủy đơn hàng',
            centered: true,
            content: 'Bạn muốn hủy giao đơn hàng ?',
            onOk() {
                setLoading(true);
                axios({
                    url: `${process.env.REACT_APP_API_URL}/order?id=${item.Id}&status=pending`,
                    method: 'patch',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                    .then(() => {
                        const newData = items.filter((data) => {
                            return data.Id !== item.Id;
                        });
                        setDataUser(newData);
                        setLoading(false);
                        toast.success('Hủy thành công, hãy chú ý lần sau !', { position: toast.POSITION.TOP_CENTER });
                    })
                    .catch(() => {});
            },
            onCancel() {},
        });
    };

    return (
        <div className="bill-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2>Đơn hàng</h2>
                <div className="bill-total">
                    <b>Tổng đơn: </b>
                    {calculateTotal().toLocaleString('en-US')}đ<b> &nbsp; &nbsp;Tổng ship: </b>
                    {TotalShippingCost().toLocaleString('en-US')}đ
                </div>
            </div>
            <div style={{ display: 'flex', margin: '24px 0 18px', justifyContent: 'space-between' }}>
                <div>
                    <Button
                        onClick={() => {
                            setType('shipping');
                            setButtonActive(1);
                        }}
                        className={buttonActive === 1 && 'button-active'}
                    >
                        Đơn đã nhận
                    </Button>
                    <Button
                        className={buttonActive === 2 && 'button-active'}
                        onClick={() => {
                            setType('pending');
                            setButtonActive(2);
                        }}
                    >
                        Nhận đơn mới
                    </Button>
                    <Button
                        className={buttonActive === 3 && 'button-active'}
                        onClick={() => {
                            setType('shipped');
                            setButtonActive(3);
                        }}
                    >
                        Đơn đã giao
                    </Button>
                </div>
                <Space
                    direction="vertical"
                    size={12}
                    style={{ textAlign: 'center', display: 'flex', marginBottom: 12 }}
                >
                    <RangePicker showTime onChange={(value) => handleChangeTimePicker(value)} />
                </Space>
            </div>
            <table className="bill-table">
                <thead>
                    <tr>
                        <th>Giá</th>
                        <th>Tiền ship</th>
                        <th>Tổng cộng</th>
                        <th>cân nặng</th>
                        <th>Địa chỉ ship</th>
                        <th>Địa chỉ shop</th>
                        {type === 'pending' && <th>Ngày đặt</th>}
                        {type === 'pending' && <th>Sđt</th>}
                        {type === 'shipping' && <th>Ngày ship</th>}
                        {type === 'shipped' && <th>Ngày nhận hàng</th>}
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && Array.isArray(data) && data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.Id}>
                                {/* {console.log(item)} */}
                                <td>{(item.total_amount - item.shipping_cost).toLocaleString('en-US')}đ</td>
                                <td>{item.shipping_cost.toLocaleString('en-US')}đ</td>
                                <td>{item.total_amount.toLocaleString('en-US')}đ</td>
                                <td>{item.weight}kg</td>
                                <td>{item.shipping_address}</td>

                                <td>394 Mỹ Đình 1, Hà Nội</td>
                                {type === 'pending' && (
                                    <>
                                        <td>
                                            {getDateFormat(
                                                new Date(
                                                    item.order_date._seconds * 1000 || item.order_date.seconds * 1000,
                                                ),
                                            )}
                                        </td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            <Button onClick={() => handlePickup(item)}>Nhận</Button>
                                        </td>
                                    </>
                                )}
                                {type === 'shipping' && (
                                    <>
                                        <td>
                                            {getDateFormat(
                                                new Date(
                                                    item.start_shipping_date._seconds * 1000 ||
                                                        item.start_shipping_date.seconds * 1000,
                                                ),
                                            )}
                                        </td>
                                        <td>
                                            <Button onClick={() => handleComplete(item)}>Hoàn thành</Button>
                                            <Button onClick={() => handleCancel(item)}>Hủy</Button>
                                        </td>
                                    </>
                                )}
                                {type === 'shipped' && (
                                    <>
                                        <td>
                                            {getDateFormat(
                                                new Date(
                                                    item.shipped_date._seconds * 1000 ||
                                                        item.shipped_date.seconds * 1000,
                                                ),
                                            )}
                                        </td>

                                        <td>{item.status}</td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>
                                <Empty />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {loading && (
                <Space className="billing-loader" style={{ zIndex: 99 }}>
                    <Spin tip="Loading..." size="large">
                        <span className="content" style={{ marginRight: 50 }} />
                    </Spin>
                </Space>
            )}
        </div>
    );
};

export default memo(Bill);
