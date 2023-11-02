import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoadingAntd from '~/Loading/Loading.antd';
import useAxios from '~/useAxios';
import './Detail.css';
import { setCurrent } from '~/redux';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import api from '~/config/axios';
import { Image, Modal } from 'antd';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useEffect, useRef, useState } from 'react';
import ChangeQuantityOrder from '~/component/ChangeQuantityOrder';
import Footer from '~/component/Footer';
import LoginCpn from '~/LoginCpn';
import Header from '~/Header';
function Detail({ Page, setShow2, showCart, setShowCart, setUid2 }) {
    const { confirm } = Modal;
    const formRef = useRef(null);
    const { id } = useParams();
    const number = useSelector((state) => state.numberReducer.number);
    const [uid, setUid] = useState(localStorage.getItem('uid'));
    const [show, setShow] = useState(false);
    const [quantityAddToCart, setQuantityAddToCart] = useState(1);
    const [primaryImage, setPrimaryImage] = useState('');
    const [specialAttributes, setSpecialAttributes] = useState({});
    const [selectTag, setSelectTag] = useState([]);
    const [remainingProduct, setRemainingProduct] = useState(0);
    const [realPrice, setRealPrice] = useState(0);
    const [initialPrice, setInitialPrice] = useState(0);

    let { data, loading } = useAxios({
        url: `${process.env.REACT_APP_API_URL}/product/${id}`,
        method: 'get',
    });
    const getRealPrice = (data, price) => {
        if (price) {
            return data.sale.percent ? price - (price * data.sale.percent) / 100 : price;
        } else {
            return data.sale.percent ? data.price - (data.price * data.sale.percent) / 100 : data.price;
        }
    };
    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {
            setPrimaryImage(data[0].data.metadata.images);
            setRemainingProduct(data[0].data.metadata.quantity - data[0].data.metadata.sold);
            setRealPrice(getRealPrice(data[0].data.metadata));
            setInitialPrice(data[0].data.metadata.price);
        }
    }, [data]);
    useEffect(() => {
        const inputElements = formRef.current && formRef.current.querySelectorAll('select');

        inputElements &&
            inputElements.forEach((element) => {
                const { name, value } = element;
                setSpecialAttributes((prev) => {
                    return { ...prev, [name]: value };
                });
            });
    }, [selectTag]);
    const dispatch = useDispatch();
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
                    modifier: specialAttributes,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );
            console.log(res);
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
            const allSelected = Object.values(specialAttributes).some((value) => value === '');
            if (allSelected) {
                toast.warn(`Vui lòng chọn ${Object.keys(specialAttributes).toString()}`, {
                    position: 'bottom-left',
                    autoClose: 2000,
                    theme: 'light',
                });
                return;
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
        }
    };

    useEffect(() => {
        const getSelectTag = (data) => {
            const arrayData = data && Array.isArray(data) && Object.keys(data[0]);
            const select =
                arrayData &&
                arrayData.map((item) => {
                    return item;
                });
            select &&
                setSelectTag(
                    select.filter((item) => {
                        if (item !== 'quantity' && item !== 'price') return item;
                    }),
                );
        };
        data && Array.isArray(data) && data.length > 0 && getSelectTag(data[0].data.metadata.attribute);
    }, [data]);
    useEffect(() => {
        function isObjectContained(parent, children) {
            for (let key in children) {
                if (children[key] !== parent[key]) {
                    return false;
                }
            }
            return true;
        }
        const handleChangeQuantity = () => {
            const allSelected = Object.values(specialAttributes).some((value) => value === '');
            if (!allSelected) {
                const quantity = data[0].data.metadata.attribute.find((attribute) => {
                    return isObjectContained(attribute, specialAttributes);
                });
                if (quantity) {
                    setRemainingProduct(quantity.quantity);
                    quantity.price && setRealPrice(getRealPrice(data[0].data.metadata, quantity.price));
                    quantity.price && setInitialPrice(quantity.price);
                } else {
                    setRemainingProduct(0);
                    setRealPrice(getRealPrice(data[0].data.metadata));
                    setInitialPrice(data[0].data.metadata.price);
                }
            }
            return;
        };
        data && Array.isArray(data) && data.length > 0 && handleChangeQuantity();
    }, [specialAttributes]);
    return (
        <>
            {loading && <LoadingAntd></LoadingAntd>}
            {data && Array.isArray(data) && data.length > 0 && (
                <Container>
                    <Row lg={2} md={2} sm={2} xl={2} xs={2} className="detail_component">
                        <Col>
                            <Image alt="Img" src={primaryImage} className="detail_img" />
                            {/* <img alt="Img" src={primaryImage} width={380} height={380} className="detail_img" /> */}
                            <div className="sub__img">
                                <div className="sub__imgs">
                                    {data[0].data.metadata.image &&
                                        data[0].data.metadata.image.length > 0 &&
                                        data[0].data.metadata.image.map((item, index) => {
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
                            <h2>Tên: {data[0].data.metadata.name}</h2>
                            <div className="detail_info--head">
                                <p className="detail_info--brand">Thương hiệu: {data[0].data.metadata.brand || ''}</p>
                                <p>Mã sản phẩm: {id}</p>
                            </div>
                            <div className="detail_info--head">
                                <p className="detail_info--sold">Đã bán: {data[0].data.metadata.sold}</p>
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
                                <h6 className="detail_info--original--sale">
                                    {data[0].data.metadata.sale.percent || 0}% giảm
                                </h6>
                            </div>
                            <form
                                ref={formRef}
                                className=""
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleConfirm(id, remainingProduct);
                                }}
                            >
                                {' '}
                                {data[0].data.metadata.attribute && (
                                    <div className=" detail_info--head select">
                                        {selectTag.length > 0 &&
                                            selectTag.map((item, index) => {
                                                const optionTag = data[0].data.metadata.attribute.map((attribute) => {
                                                    return attribute[item];
                                                });
                                                const a = [...new Set(optionTag)];
                                                const select = a.map((item) => {
                                                    return (
                                                        <option value={item} key={item}>
                                                            {item}
                                                        </option>
                                                    );
                                                });
                                                return (
                                                    <Fragment key={index}>
                                                        <p className="detail__info--number--selected">
                                                            {item}:{' '}
                                                            <select
                                                                value={specialAttributes[item] || ''}
                                                                name={item}
                                                                id={item}
                                                                onChange={(e) => {
                                                                    const { name, value } = e.target;
                                                                    setSpecialAttributes((prev) => {
                                                                        return { ...prev, [name]: value };
                                                                    });
                                                                }}
                                                            >
                                                                {' '}
                                                                <option value={''}>chọn {item}</option>
                                                                {select}
                                                            </select>
                                                        </p>{' '}
                                                    </Fragment>
                                                );
                                            })}
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
                                    <Button type="submit" size="lg" className="detail__btn--order">
                                        <FontAwesomeIcon icon={faCartPlus} />
                                        <span style={{ marginLeft: 12 }}>Thêm vào giỏ hàng</span>
                                    </Button>
                                    <Button type="submit" size="lg" className="detail__btn--order">
                                        <FontAwesomeIcon icon={faCartPlus} />
                                        <span style={{ marginLeft: 12 }}>Mua Ngay</span>
                                    </Button>
                                </div>
                            </form>

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
                    <Row lg={2} md={2} sm={2} xl={2} xs={2} className="detail_component">
                        {data[0].data.metadata.detail.split('.').map((item, index) => {
                            return <p key={index}>- {item}</p>;
                        })}
                    </Row>

                    <ToastContainer />
                </Container>
            )}
            {show && <LoginCpn setShow={setShow} setUid={setUid} />}
            <Footer></Footer>
        </>
    );
}

export default Detail;
