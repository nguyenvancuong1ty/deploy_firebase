import { ExclamationCircleFilled } from '@ant-design/icons';
import './Cart.scss';
import { Checkbox, Empty, Modal, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Billing from '~/component/Billing';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrent, setDataCart, setTotalCoin } from '~/redux';
import LoadingAntd from '~/Loading/Loading.antd';
function Cart({ dataCart, number }) {
    const { confirm } = Modal;
    const dispatch = useDispatch();
    const totalCoin = useSelector((state) => state.totalCoinReducer.totalCoin);
    const [messageApi, contextHolder2] = message.useMessage();
    const [checkOut, setCheckOut] = useState([]);
    const [showBilling, setShowBilling] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleDelete = (item) => {
        confirm({
            zIndex: 99999,
            bodyStyle: { height: 150 },
            centered: true,
            icon: <ExclamationCircleFilled />,
            title: 'Xóa hàng',
            content: 'Xóa mặt hàng này vào giỏ hàng của bạn?',
            onOk() {
                setLoading(true);
                axios({
                    url: `${process.env.REACT_APP_API_URL}/cart/${item.id}`,
                    method: 'delete',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                    .then(() => {
                        setLoading(false);
                        toast.success('Xóa thành công', {
                            position: 'bottom-left',
                            autoClose: 2000,
                            progress: undefined,
                            theme: 'light',
                        });
                        const newDataCart = dataCart.filter((data) => data.id !== item.id);
                        dispatch(setDataCart(newDataCart));
                        dispatch(setCurrent(number - item.quantity));
                    })
                    .catch((e) => {
                        toast.warn('Xóa thất bại', {
                            position: 'bottom-left',
                            autoClose: 2000,
                            progress: undefined,
                            theme: 'light',
                        });
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
        localStorage.setItem('number_product', localStorage.getItem('number_product') - item.total_quantity);
    };
    const onChange = async (e, data) => {
        if (e.target.checked) {
            setCheckOut([...checkOut, data]);
        } else {
            const newItem = checkOut.filter((item) => {
                return item.cakeID !== data.cakeID;
            });
            setCheckOut(newItem);
        }
    };
    console.log(checkOut);
    useEffect(() => {
        const total =
            Array.isArray(checkOut) && checkOut.length > 0
                ? checkOut.reduce((init, item) => {
                      return init + item.realPrice * item.quantity;
                  }, 0)
                : 0;
        dispatch(setTotalCoin(total));
        // eslint-disable-next-line
    }, [checkOut]);
    return (
        <div
            className="wrap_cart"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            {contextHolder2}
            {loading && <LoadingAntd subClass="subLoading" />}
            {!loading && Array.isArray(dataCart) && dataCart.length > 0 ? (
                <>
                    {dataCart.map((item, index) => (
                        <div
                            className="items"
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <Checkbox onChange={(e) => onChange(e, item)}></Checkbox>
                            <img className="images" src={item.product.images} alt="" />
                            <div className="content">
                                <b>{item.product.name}</b>
                                <div>
                                    <div className="price">Giá: {item.realPrice.toLocaleString('en-US')}</div>
                                    <b className="b">{item.quantity}</b>
                                    {/* <Quantity item={item} checkOut={checkOut} /> */}
                                </div>
                            </div>
                            <button className="delete" onClick={() => handleDelete(item)}>
                                X
                            </button>
                        </div>
                    ))}

                    <footer>
                        <b className="total_price">
                            Tổng tiền tạm tính: <b>{totalCoin.toLocaleString('en-US')}đ</b>
                        </b>
                        (Chưa bao gồm phí ship) <br />
                        <button
                            onClick={() => {
                                checkOut.length > 0
                                    ? setShowBilling(true)
                                    : toast.warning('Chọn ít nhất 1 sản phẩm!', {
                                          position: toast.POSITION.BOTTOM_LEFT,
                                          autoClose: 1000,
                                      });
                            }}
                            className="button"
                        >
                            Tiến hành Đặt hàng
                        </button>
                    </footer>
                    {showBilling && <Billing product={checkOut} total={totalCoin} setShowBilling={setShowBilling} />}
                </>
            ) : (
                <Empty />
            )}
        </div>
    );
}

export default Cart;
