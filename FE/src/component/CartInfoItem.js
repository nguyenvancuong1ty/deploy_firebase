import { Avatar, Button, Checkbox, List, Modal } from 'antd';
import { useEffect, useState } from 'react';
import ChangeQuantityOrder from './ChangeQuantityOrder';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { setCurrent, setDataCart } from '~/redux';
import LoadingAntd from '~/Loading/Loading.antd';
import api from '~/config/axios';

function CartInfoItem({ item, checkOut, setCheckOut, checked }) {
    const { confirm } = Modal;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [quantityAddToCart, setQuantityAddToCart] = useState(item.data.quantity);
    const [remainingProduct, setRemainingProduct] = useState(0);
    const [product, setProduct] = useState(null);
    const [defaultChecked, setDefaultChecked] = useState(checked);
    const number = useSelector((state) => state.numberReducer.number);
    const dataCart = useSelector((state) => state.dataCartReducer.dataCart);

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
        setDefaultChecked(checked);
    }, [checked]);
    console.log(defaultChecked);
    useEffect(() => {
        product && setRemainingProduct(product.data.metadata.quantity - product.data.metadata.sold);
    }, [product]);
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
            setDefaultChecked(true);
            setCheckOut([...checkOut, data]);
        } else {
            const newItem = checkOut.filter((item) => {
                return item.cakeID !== data.cakeID;
            });
            setCheckOut(newItem);
            setDefaultChecked(false);
        }
    };
    const addToCartSuccess = () =>
        toast.success('Lưu thành công', {
            position: 'bottom-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    const handleSaveDataCart = async () => {
        confirm({
            zIndex: 99999,
            centered: true,
            icon: <ExclamationCircleFilled />,
            title: 'Lưu',
            content: 'Lưu giỏ hàng',
            async onOk() {
                try {
                    const res = await api.post(
                        '/cart',
                        {
                            uid: localStorage.getItem('uid'),
                            cakeID: item.data.cakeID,
                            quantity: quantityAddToCart,
                            modifier: item.data.modifier,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        },
                    );
                    if (res.data.metadata.result) {
                        dispatch(setCurrent(number + quantityAddToCart));
                        addToCartSuccess();
                    } else {
                        dispatch(setCurrent(number + quantityAddToCart - res.data.metadata.oldQuantity));
                        addToCartSuccess();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return loading ? (
        <LoadingAntd></LoadingAntd>
    ) : (
        <div>
            <List.Item>
                <List.Item.Meta
                    avatar={
                        <>
                            <Checkbox checked={defaultChecked} onChange={(e) => onChange(e, item.data)}></Checkbox>
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
                                <b key={key}>
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
                    <Button onClick={() => handleSaveDataCart()}>Lưu</Button>
                </div>

                <div className="cart__info--option">
                    <Button danger onClick={() => handleDelete(item.data)}>
                        Xóa khỏi giỏ
                    </Button>
                </div>
            </List.Item>
        </div>
    );
}

export default CartInfoItem;
