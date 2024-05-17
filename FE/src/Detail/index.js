import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoadingAntd from '~/Loading/Loading.antd';
import './Detail.css';
import { setCurrent } from '~/redux';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import api from '~/config/axios';
import { Button, Image, Modal, Radio } from 'antd';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ChangeQuantityOrder from '~/component/ChangeQuantityOrder';
import Footer from '~/component/Footer';
import LoginCpn from '~/LoginCpn';
import axios from 'axios';
import { setTotalCoin } from '~/redux';
import Billing from '~/component/Billing';
function Detail({ Page, setShow2, showCart, setShowCart, setUid2 }) {
    const { confirm } = Modal;
    const { id } = useParams();
    const number = useSelector((state) => state.numberReducer.number);
    const [uid, setUid] = useState(localStorage.getItem('uid'));
    const [show, setShow] = useState(false);
    const [quantityAddToCart, setQuantityAddToCart] = useState(1);
    const [primaryImage, setPrimaryImage] = useState('');
    const [specialAttributes, setSpecialAttributes] = useState({});
    const [labels, setLabels] = useState(null);
    const [remainingProduct, setRemainingProduct] = useState(0);
    const [realPrice, setRealPrice] = useState(0);
    const [initialPrice, setInitialPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [attribute, setAttribute] = useState(null);
    const [showBilling, setShowBilling] = useState(false);
    const [checkOut, setCheckOut] = useState([]);
    const dispatch = useDispatch();
    const totalCoin = useSelector((state) => state.totalCoinReducer.totalCoin);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/product/${id}`,
            });
            setData(res.data.metadata);
            setLoading(false);
        };
        fetchData();
    }, [id]);
    const getRealPrice = (data, price) => {
        if (price) {
            return data.sale.percent ? price - (price * data.sale.percent) / 100 : price;
        } else {
            return data.sale.percent ? data.price - (data.price * data.sale.percent) / 100 : data.price;
        }
    };
    useEffect(() => {
        if (data) {
            setPrimaryImage(data.images);
            setRemainingProduct(data.quantity);
            setRealPrice(getRealPrice(data));
            setInitialPrice(data.price);
        }
    }, [data]);
    useEffect(() => {
        setCheckOut([
            {
                uid: localStorage.getItem('uid'),
                cakeID: id,
                quantity: quantityAddToCart,
                modifier: specialAttributes,
                initialPrice: initialPrice,
                realPrice: realPrice,
                product: data,
            },
        ]);
    }, [quantityAddToCart, specialAttributes, initialPrice, realPrice, id]);
    useEffect(() => {
        dispatch(setTotalCoin(realPrice * quantityAddToCart));
    }, [checkOut]);
    const addToCartSuccess = () =>
        toast.success('Thêm mặt hàng thành công', {
            position: 'bottom-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    const changeQuantityError = (max) =>
        toast.warn(max ? `Số lượng phải lớn hơn 1 và nhỏ hơn ${max}` : 'hết hàng', {
            position: 'bottom-left',
            autoClose: 2000,
            theme: 'light',
        });
    const handleAddToCart = async (ID) => {
        try {
            const res = await api.post(
                '/cart',
                {
                    uid: localStorage.getItem('uid'),
                    cakeID: ID,
                    quantity: quantityAddToCart,
                    modifier: specialAttributes || {},
                    initialPrice: initialPrice,
                    realPrice: realPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );
            if (res.data.metadata.result) {
                console.log(quantityAddToCart);
                dispatch(setCurrent(number + quantityAddToCart));
                addToCartSuccess();
            } else {
                dispatch(setCurrent(number + quantityAddToCart - res.data.metadata.oldQuantity));
                addToCartSuccess();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleConfirm = (id, quantity) => {
        if (!uid) {
            setShow(true);
        } else {
            if (quantityAddToCart < 1 || quantityAddToCart > quantity) {
                changeQuantityError(quantity);
            } else
                confirm({
                    style: { marginTop: 150 },
                    zIndex: 9999,
                    title: 'Mua hàng',
                    content: 'Thêm mặt hàng này vào giỏ hàng của bạn?',
                    onOk() {
                        handleAddToCart(id);
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
        }
    };

    useEffect(() => {
        const labels =
            data &&
            Array.isArray(data.attribute) &&
            data.attribute.length > 0 &&
            data.attribute.map((item) => {
                const b = Object.entries(item);
                const option =
                    Array.isArray(b) &&
                    b.length > 0 &&
                    b.map(([key, value]) => {
                        if (key !== 'quantity' && key !== 'price') {
                            return `${key}: ${value}`;
                        }
                    });
                let label = option.join(' - ');
                if (label.startsWith(' - ')) {
                    label = label.substring(2);
                }
                if (label.endsWith(' - ')) {
                    label = label.substring(0, label.length - 2);
                }
                return { label: label.trim(), value: JSON.stringify(item) };
            });
        setLabels(labels);
    }, [data]);

    const onChange = (e) => {
        const attribute = JSON.parse(e.target.value);
        setAttribute(attribute);
        if (attribute.quantity) {
            setRemainingProduct(attribute.quantity);
        }
        if (attribute.price) {
            setInitialPrice(attribute.price);
            setRealPrice(getRealPrice(data, attribute.price));
        } else {
            setInitialPrice(data.price);
            setRealPrice(getRealPrice(data, data.price));
        }
    };
    useEffect(() => {
        const specialAttributes = attribute;
        specialAttributes && delete specialAttributes.price;
        specialAttributes && delete specialAttributes.quantity;
        specialAttributes && delete specialAttributes.image;
        setSpecialAttributes(specialAttributes);
    }, [attribute]);
    const handleSubmitForm = (e, type) => {
        e.preventDefault();
        if (type === 'addCart') {
            handleConfirm(id, remainingProduct);
        } else {
            if (!uid) {
            setShow(true);
        } else {
            setShowBilling(true);
        }
        }
    };
    return (
        <>
            {loading && <LoadingAntd></LoadingAntd>}
            {data && (
                <Container>
                    <Row lg={2} md={2} sm={2} xl={2} xs={2} className="detail_component">
                        <Col>
                            <div className="detail_img">
                                <Image alt="Img" src={primaryImage} width={380} height={380} />
                            </div>
                            <div className="sub__img">
                                <div className="sub__imgs">
                                    {data.image &&
                                        data.image.length > 0 &&
                                        data.image.map((item, index) => {
                                            return (
                                                <Image
                                                    alt="img"
                                                    src={item}
                                                    key={index}
                                                    className="sub__img--item "
                                                    onMouseMove={() => setPrimaryImage(item)}
                                                />
                                            );
                                        })}
                                </div>
                            </div>
                        </Col>
                        <Col className="detail_info">
                            <h2>Tên: {data.name}</h2>
                            <div className="detail_info--head">
                                <p className="detail_info--brand">Thương hiệu: {data.brand || ''}</p>
                                <p>Mã sản phẩm: {id}</p>
                            </div>
                            <div className="detail_info--head">
                                <p className="detail_info--sold">Đã bán: {data.sold}</p>
                                <p className="detail_info--inventory">Còn lại: {remainingProduct || 'hết hàng'} </p>
                            </div>
                            <div className="detail_info--head">
                                <h6 className="detail_info--original--price">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        initialPrice,
                                    )}
                                </h6>
                                <h4 className="detail_info--discounted--price">
                                    Giá:{' '}
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        realPrice,
                                    )}
                                </h4>
                                <h6 className="detail_info--original--sale">{data.sale.percent || 0}% giảm</h6>
                            </div>
                            <div>
                                {data.attribute && (
                                    <div className=" detail_info--head select">
                                        {Array.isArray(labels) && labels.length > 0 && (
                                            <Radio.Group
                                                defaultValue={attribute}
                                                buttonStyle="solid"
                                                style={{
                                                    marginTop: 16,
                                                }}
                                                onChange={onChange}
                                            >
                                                <Container>
                                                    {labels.map((item, index) => (
                                                        <Radio.Button key={index} value={item.value}>
                                                            {item.label}
                                                        </Radio.Button>
                                                    ))}
                                                </Container>
                                            </Radio.Group>
                                        )}
                                    </div>
                                )}
                                <div className="detail_info--head">
                                    <p className="detail__info--number--selected">Số lượng</p>
                                    <ChangeQuantityOrder
                                        data={data}
                                        quantityAddToCart={quantityAddToCart}
                                        setQuantityAddToCart={setQuantityAddToCart}
                                        remainingProduct={remainingProduct}
                                    />
                                </div>
                                <div className="detail_info--head detail__btn">
                                    <Button
                                        size="large"
                                        className="detail__btn--order"
                                        disabled={attribute ? false : labels && true}
                                        onClick={(e) => {
                                            handleSubmitForm(e, 'addCart');
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} />
                                        <span style={{ marginLeft: 12 }}>Thêm vào giỏ hàng</span>
                                    </Button>
                                    <Button
                                        size="large"
                                        className="detail__btn--order"
                                        disabled={attribute ? false : labels && true}
                                        onClick={(e) => {
                                            handleSubmitForm(e, 'buyProduct');
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} />
                                        <span style={{ marginLeft: 12 }}>Mua Ngay</span>
                                    </Button>
                                </div>
                            </div>

                            <hr />
                            <div className="detail_info--head">
                                <div className="detail_info--footer">
                                    <img
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/6c502a2641457578b0d5f5153b53dd5d.png"
                                        alt="trả hàng"
                                        width={18}
                                    />
                                    <span>7 ngày miễn phí trả hàng</span>
                                </div>
                                <div className="detail_info--footer">
                                    <img
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/511aca04cc3ba9234ab0e4fcf20768a2.png"
                                        alt="chinhhang"
                                        width={18}
                                    />
                                    <span>100% chính hãng</span>
                                </div>
                                <div className="detail_info--footer">
                                    <img
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/16ead7e0a68c3cff9f32910e4be08122.png"
                                        alt="vanchuyen"
                                        width={18}
                                    />
                                    <span>Vận chuyển tận nơi</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row lg={1} md={1} sm={1} xl={1} xs={1} className="detail_component">
                        <Col>
                            {data.detail &&
                                data.detail.split('.').map((item, index) => {
                                    return <p key={index}>- {item}</p>;
                                })}
                        </Col>
                    </Row>
                </Container>
            )}
            {show && <LoginCpn setShow={setShow} setUid={setUid} />}
            {showBilling && <Billing product={checkOut} total={totalCoin} setShowBilling={setShowBilling} />}
            <Footer></Footer>
        </>
    );
}

export default Detail;
