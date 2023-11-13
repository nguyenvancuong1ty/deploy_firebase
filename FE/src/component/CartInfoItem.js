import { Avatar, Button, Checkbox, List, Modal } from 'antd';
import { useEffect, useState } from 'react';
import ChangeQuantityOrder from './ChangeQuantityOrder';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { setCurrent, setDataCart } from '~/redux';
import LoadingAntd from '~/Loading/Loading.antd';
import Billing from './Billing';

function CartInfoItem({ item, checkOut, setCheckOut }) {
    const { confirm } = Modal;
    const [loading, setLoading] = useState(false);

    const [quantityAddToCart, setQuantityAddToCart] = useState(item.data.quantity);
    const [remainingProduct, setRemainingProduct] = useState(0);
    const [product, setProduct] = useState(null);

    const number = useSelector((state) => state.numberReducer.number);
    const dataCart = useSelector((state) => state.dataCartReducer.dataCart);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true);
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/product/${item.data.cakeID}`,
        })
            .then((res) => {
                setProduct(res);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e.message);
                setLoading(false);
            });
    }, [dataCart]);

    useEffect(() => {
        product && setRemainingProduct(product.data.metadata.quantity - product.data.metadata.sold);
    }, [product]);
    console.log(item);
    const handleDelete = (item) => {
        confirm({
            zIndex: 99999,
            centered: true,
            icon: <ExclamationCircleFilled />,
            title: 'Xóa hàng',
            content: 'Xóa mặt hàng này vào giỏ hàng của bạn?',
            onOk() {
                axios({
                    url: `${process.env.REACT_APP_API_URL}/cart/${item.id}`,
                    method: 'delete',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                    .then(() => {
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
    return loading ? (
        <LoadingAntd></LoadingAntd>
    ) : (
        <>
            {' '}
            <List.Item>
                <List.Item.Meta
                    avatar={
                        <>
                            <Checkbox onChange={(e) => onChange(e, item.data)}></Checkbox>
                            &emsp;
                            <Avatar src={item.data.product.images} />
                        </>
                    }
                    title={
                        <b>
                            {item.data.product.name} x {quantityAddToCart}
                        </b>
                    }
                    description={
                        <b className="price">
                            Giá:
                            {(
                                item.data.product.price -
                                (item.data.product.price * item.data.product.sale.percent || 0) / 100
                            ).toLocaleString('en-US')}
                        </b>
                    }
                />
                <div className="cart__info--option modifier">
                    {item.data.modifier &&
                        Object.entries(item.data.modifier).map(([key, value]) => {
                            return (
                                <b>
                                    {key} : {value} &emsp;
                                </b>
                            );
                        })}
                </div>
                <div className="cart__info--option">
                    <ChangeQuantityOrder
                        quantityAddToCart={quantityAddToCart}
                        setQuantityAddToCart={setQuantityAddToCart}
                        remainingProduct={remainingProduct}
                    />
                </div>
                <div className="cart__info--option">
                    <Button>Lưu</Button>
                </div>

                <div className="cart__info--option">
                    <Button danger onClick={() => handleDelete(item.data)}>
                        Xóa khỏi giỏ
                    </Button>
                </div>
            </List.Item>
        </>
    );
}

export default CartInfoItem;
