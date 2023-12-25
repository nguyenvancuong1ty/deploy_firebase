import { faCircleQuestion, faTruckArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Modal, Space, Spin, Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Billing = ({ product, total, setShowBilling }) => {
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [distance, setDistance] = useState(0);
    const [totalShippingCost, setTotalShippingCost] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const info = sessionStorage.getItem('reduxAuthState');
        setAddress(JSON.parse(info).address);
        setPhoneNumber(JSON.parse(info).phoneNumber);
    }, []);
    const handleAddress = () => {
        if (address.length === 0) {
            ref.current.focus();
        } else {
            const geocodingApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                address,
            )}.json?access_token=pk.eyJ1Ijoia2llbWdvIiwiYSI6ImNscTVobGZjaTBpdW8ybG52aWdwcDNmZGgifQ._OPGMkxjlbcoK1sLv9ql5w`;

            axios
                .get(geocodingApiUrl)
                .then((response) => {
                    const data = response.data;
                    if (data.features.length > 0) {
                        const location = data.features[0].center;
                        console.log({ latitude: location[1], longitude: location[0] });
                        axios({
                            method: 'get',
                            url: `${process.env.REACT_APP_API_URL}/product/distance?&destination=${location[1]},${location[0]}`,
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }).then((res) => {
                            console.log(res);
                            setDistance(res.data);
                        });
                    } else {
                        toast.error('Địa chỉ không hợp lệ', { position: toast.POSITION.BOTTOM_LEFT });
                    }
                })
                .catch((error) => {
                    toast.error('Địa chỉ không hợp lệ', { position: toast.POSITION.BOTTOM_LEFT });
                });
        }
    };

    const getShipCost = (item, distance) => {
        let shipCost = 0;
        if (distance <= 10) {
            if (item.product.weight * item.quantity <= 1.2) {
                shipCost = distance * 2000;
            } else if (item.product.weight * item.quantity > 1.2 && item.product.weight * item.quantity <= 3) {
                shipCost = distance * 3000;
            } else if (item.product.weight * item.quantity > 3 && item.product.weight * item.quantity <= 5) {
                shipCost = distance * 4000;
            } else if (item.product.weight * item.quantity > 5 && item.product.weight * item.quantity <= 10) {
                shipCost = distance * 5000;
            } else {
                shipCost = distance * 6000;
            }
        } else {
            shipCost = item.product.weight * item.quantity * 10000;
        }

        return Math.round(shipCost);
    };
    useEffect(() => {
        const tempTotalShippingCost = product.reduce((accumulator, item) => {
            let itemShippingCost = getShipCost(item, distance);
            return accumulator + itemShippingCost;
        }, 0);
        setTotalShippingCost(tempTotalShippingCost);
    }, [product, distance]);
    const handleClickOrder = () => {
        if (phoneNumber !== '' && distance !== 0) {
            product.length > 0 && handleOrder();
        }
        if (distance === 0) {
            toast.warn('Vui lòng kiểm tra giá ship', { position: toast.POSITION.BOTTOM_LEFT });
        }
        if (phoneNumber === '') {
            toast.warn('Vui lòng thêm số điện thoại !', { position: toast.POSITION.BOTTOM_LEFT });
        } else {
        }
    };

    const handleOrder = () => {
        setLoading(true);
        const promises = product.map((element) => {
            const itemShippingCost = getShipCost(element, distance);
            console.log('element.product.Id', element.cakeID);
            const data = {
                uid: element.uid,
                shipping_address: address,
                phoneNumber: phoneNumber,
                weight: (element.product.weight * element.quantity).toFixed(1) * 1,
                shipping_cost: itemShippingCost,
                total_amount: Math.floor(
                    (element.product.price - (element.product.price * (element.product.sale.percent || 0)) / 100) *
                        element.quantity +
                        itemShippingCost,
                ),
                detail: {
                    product_id: element.cakeID,
                    images: element.product.images,
                    name: element.product.name,
                    price: element.product.price,
                    quantity: element.quantity,
                    modifier: element.modifier || {},
                    sale: element.product.sale.percent || 0,
                },
            };
            return axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/order`,
                data: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        });

        Promise.all(promises)
            .then(() => {
                setLoading(false);
                setShowBilling(false);
                notifySuccess();
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần thiết
                console.error(error);
                setLoading(false);
            });
    };

    const notifySuccess = () => {
        toast.success('Đặt hàng thành công !', { position: toast.POSITION.TOP_CENTER });
    };

    return (
        <div className="billing-wrapper">
            <h2>Hóa đơn</h2>
            <h2
                className="close"
                onClick={() => {
                    setShowBilling(false);
                }}
            >
                X
            </h2>
            <Space direction="horizontal" size="middle">
                <Input
                    className="fw-bold"
                    placeholder="Số điện thoại"
                    value={phoneNumber || ''}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Input
                    style={{ width: 'max-content' }}
                    className="fw-bold"
                    placeholder="Địa chỉ giao hàng"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Button onClick={handleAddress}>Giá ship</Button>
            </Space>
            <table className="billing-table">
                <thead>
                    <tr>
                        <th>Demo</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Cân nặng (kg/1sp)</th>
                        <th>Tiền ship</th>
                        <th>Tổng cộng</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item, index) => {
                        const itemShippingCost = getShipCost(item, distance);

                        return (
                            <tr key={index}>
                                <td>
                                    <img alt="" src={item.product.images} className="images" />
                                </td>
                                <td>{item.product.name}</td>
                                <td>{item.realPrice}</td>
                                <td>{item.quantity}</td>
                                <td>{item.product.weight}</td>
                                <td>{itemShippingCost}</td>
                                <td>{Math.floor(item.realPrice * item.quantity + itemShippingCost)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="billing-total">
                <h3>Ship từ Mỹ Đình 1, Hà Nội: {distance.toFixed(1)}km </h3>
                <h3>Tổng ship: {totalShippingCost.toLocaleString('en-US')}đ</h3>
                <h3>Tổng thanh toán: {(total + totalShippingCost).toLocaleString('en-US')}đ</h3>
            </div>
            <div className="billing-customer-info">
                <h3>Thông tin khách hàng</h3>
                {/* Các trường thông tin khách hàng */}
            </div>
            <div>
                <Button onClick={() => setIsModalOpen(true)}>
                    Thông tin vận chuyển
                    <FontAwesomeIcon icon={faTruckArrowRight} style={{ color: '#11cd0e', marginLeft: 10 }} />
                </Button>
            </div>
            <Tooltip title="Nhập địa chỉ trước khi đặt" placement="top">
                <button className="billing-button" onClick={handleClickOrder}>
                    Đặt hàng
                </button>
            </Tooltip>
            {loading && (
                <Space className="billing-loader">
                    <Spin tip="Loading..." size="large">
                        <div className="content" style={{ marginRight: 50 }} />
                    </Spin>
                </Space>
            )}
            <Modal
                title="Thông tin vận chuyển"
                zIndex={99999}
                open={isModalOpen}
                onOk={() => {
                    setIsModalOpen(false);
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
            >
                <b>Đơn hàng dưới 10km:</b>
                <p>Đơn hàng từ dưới 1,2kg (2,000đ / 1km)</p>
                <p>Đơn hàng từ từ 1,2kg - 3kg (3,000đ / 1km)</p>
                <p>Đơn hàng từ từ 3kg - 5kg (4,000đ / 1km)</p>
                <p>Đơn hàng từ từ 5kg - 10kg (5,000đ / 1km)</p>
                <p>Đơn hàng từ trên 10kg (6,000đ / 1km)</p>
                <b>Đơn hàng trên 10km:</b>
                <p>10,000đ trên mỗi kg</p>
            </Modal>
        </div>
    );
};

export default Billing;
