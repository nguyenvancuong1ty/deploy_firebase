import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Modal, Select, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import ListImagesProduct from '../Product/ListImagesProduct';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase';
import LoadingSpin from '~/Loading/Loading.spin';
import SpecialAttribute from './SpecialAttribute';
function ModalComponent({ productDetail, setModalOpen, modalOpen, setProductDetail, setReRender, reRender, product }) {
    const [sale, setSale] = useState(null);
    const [typeProduct, setTypeProduct] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [uploadChangeThumb, setUploadChangeThumb] = useState(false);
    const [uploadChangeListImages, setUploadChangeListImages] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_URL}/sale`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setSale(response.data.metadata);
            } catch {}
        };
        fetchData();
    }, []);

    useEffect(() => {
        productDetail && productDetail.expiryDate
            ? setExpiryDate(dayjs(productDetail.expiryDate._seconds * 1000 || productDetail.expiryDate))
            : setExpiryDate(null);
    }, [productDetail]);

    const handleUpdateClick = async (type) => {
        let payload = Object.entries(productDetail); // Chuyển đổi object xang mảng gồm key và value
        payload = payload.filter(([key, value]) => {
            return key !== 'Id' && key !== 'timeUpdate' && key !== 'timeCreate';
        });
        payload = Object.fromEntries(payload);
        payload.sale = payload.sale.id;
        if (type === 'update') {
            await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/product/${productDetail.Id}`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setModalOpen(false);
            setReRender(!reRender);
            toast.success('Update thành công', {
                position: 'bottom-left',
                autoClose: 2000,
                progress: undefined,
                theme: 'light',
            });
        } else if (type === 'add') {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/product`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setModalOpen(false);
            setReRender(!reRender);
            toast.success('Tạo mới thành công', {
                position: 'bottom-left',
                autoClose: 2000,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_API_URL}/type/product`,
            method: 'get',
        })
            .then((res) => {
                setTypeProduct(res.data.metadata);
            })
            .catch((e) => alert(e.message));
    }, []);

    const getTypeProductOptions = () => {
        const types =
            typeProduct &&
            typeProduct.map((item) => {
                return {
                    value: item.name,
                    label: item.vnl,
                };
            });
        return types;
    };

    const getSaleOptions = () => {
        const sales = sale.map((item) => {
            return {
                value: JSON.stringify(item),
                label: `${item.percent}%`,
            };
        });
        return sales;
    };

    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setProductDetail((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleThumbChange = async (e) => {
        setUploadChangeThumb(true);
        const { name } = e.target;
        const url = await uploadFile(e);
        setProductDetail((prev) => {
            return { ...prev, [name]: url };
        });
        setUploadChangeThumb(false);
    };

    const handleListImgChange = async (e) => {
        setUploadChangeListImages(true);
        const { name } = e.target;
        const url = await uploadFile(e);
        const listImg = productDetail[name] || [];
        listImg.push(url);
        console.log(listImg);
        setProductDetail((prev) => {
            return { ...prev, [name]: listImg };
        });
        setUploadChangeListImages(false);
    };

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return Promise.resolve('');

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Theo dõi tiến trình tải lên nếu bạn muốn
                },
                (error) => {
                    // Xử lý lỗi nếu có
                    reject(error.message);
                },
                () => {
                    // Khi quá trình tải lên hoàn tất, bạn lấy URL và trả về nó qua resolve
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL);
                        })
                        .catch((error) => {
                            reject(error.message);
                        });
                },
            );
        });
    };

    const handleExpiryDateChange = (value) => {
        const expiryDate = 'expiryDate';
        setExpiryDate(value);
        if (value) {
            const time = value.$d.getTime();
            console.log(time);
            value &&
                setProductDetail((prev) => {
                    return { ...prev, [expiryDate]: time };
                });
        } else {
            setProductDetail((prev) => {
                return { ...prev, [expiryDate]: value };
            });
        }
    };

    return (
        <Modal
            title="Chi tiết sản phẩm"
            centered
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            width={1000}
            style={{ background: '#292929' }}
            footer={[
                <Button key="cancel" onClick={() => setModalOpen(false)}>
                    Cancel
                </Button>,
                <Button key="add" onClick={() => handleUpdateClick('add')}>
                    Thêm mới
                </Button>,
                <Button key="ok" type="primary" onClick={() => handleUpdateClick('update')}>
                    Update
                </Button>,
            ]}
        >
            {productDetail && (
                <>
                    <Row className="product_detail">
                        <Col>
                            <div className="product__detail--item info__disable">
                                <b>Mã sp:</b> <span> {productDetail.Id}</span>
                            </div>
                            <div className="product__detail--item">
                                <b>Tên: </b>
                                <input
                                    name="name"
                                    id="name"
                                    value={productDetail.name}
                                    onChange={(e) => handleDetailChange(e)}
                                />
                                <label htmlFor="name">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </label>
                            </div>
                            <div className="product__detail--item product__detail--item--imgs">
                                <b>Thumbnail: </b>
                                {uploadChangeThumb ? (
                                    <LoadingSpin></LoadingSpin>
                                ) : (
                                    <img alt="" src={productDetail.images} className="product__thumb detail" />
                                )}

                                <label className="label__change__image">
                                    <input name="images" type="file" defaultValue="" onChange={handleThumbChange} />
                                    <span>Thay đổi</span>
                                </label>
                            </div>
                            <div className="product__detail--item">
                                <b>Cân nặng(kg): </b>
                                <input
                                    name="weight"
                                    id="weight"
                                    type={'number'}
                                    value={productDetail.weight}
                                    onChange={(e) => handleDetailChange(e)}
                                />
                            </div>
                            <div className="product__detail--item">
                                <b>Kiểu: </b>
                                <Select
                                    name="type"
                                    value={productDetail.type}
                                    style={{
                                        width: 150,
                                    }}
                                    onChange={(e) =>
                                        setProductDetail((prev) => {
                                            return {
                                                ...prev,
                                                type: e,
                                            };
                                        })
                                    }
                                    options={getTypeProductOptions()}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="product__detail--item">
                                <b>Thương hiệu: </b>
                                <input
                                    name="brand"
                                    id="brand"
                                    value={productDetail.brand || ''}
                                    onChange={(e) => handleDetailChange(e)}
                                />
                                <label htmlFor="brand">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </label>
                            </div>
                            <div className="product__detail--item">
                                <b>Giảm giá: </b>
                                <Select
                                    value={`${productDetail.sale.percent || 0}%`}
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={(e) => {
                                        setProductDetail((prev) => {
                                            return {
                                                ...prev,
                                                sale: JSON.parse(e),
                                            };
                                        });
                                    }}
                                    options={getSaleOptions()}
                                />
                            </div>
                            <div className="product__detail--item">
                                <b>Số lượng: </b>
                                <input
                                    name="quantity"
                                    type="number"
                                    value={productDetail.quantity}
                                    onChange={(e) => handleDetailChange(e)}
                                />
                            </div>
                            <div className="product__detail--item product__detail--item--imgs">
                                <b>List ảnh: </b>
                                <ListImagesProduct
                                    images={productDetail.image}
                                    productDetail={productDetail}
                                    setProductDetail={setProductDetail}
                                />
                                {uploadChangeListImages && <LoadingSpin />}
                                <label className="label__change__image">
                                    <input name="image" type="file" value="" onChange={handleListImgChange} />
                                    <span>Thêm ảnh</span>
                                </label>
                            </div>
                            <div className="product__detail--item">
                                <b>Giá gốc: </b>
                                <input
                                    name="price"
                                    type="number"
                                    value={productDetail.price}
                                    onChange={(e) => handleDetailChange(e)}
                                />
                            </div>
                            {
                                <div className="product__detail--item">
                                    <b>Hạn sử dụng: </b>
                                    <Space direction="vertical" size={12}>
                                        <DatePicker value={expiryDate} showTime onChange={handleExpiryDateChange} />
                                    </Space>
                                </div>
                            }
                        </Col>
                    </Row>
                    <Row className="product_detail">
                        <SpecialAttribute productDetail={productDetail} setProductDetail={setProductDetail} />
                    </Row>
                    <Row className="product_detail">
                        <div className="product__detail--item description">
                            <b>Mô tả: </b>
                            <textarea
                                rows="8"
                                name="detail"
                                value={productDetail.detail}
                                onChange={(e) => handleDetailChange(e)}
                            />
                        </div>
                    </Row>
                </>
            )}
        </Modal>
    );
}

export default ModalComponent;
