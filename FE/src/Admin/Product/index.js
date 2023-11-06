import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Image, Modal, Select, Space, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';
import ListImagesProduct from './ListImagesProduct';
import { getDateFormat } from '~/until/function';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import UploadFile from '~/component/UploadFile';
import { toast } from 'react-toastify';
dayjs.extend(customParseFormat);

function ProductPage() {
    const [product, setProduct] = useState([]);
    const [data, setData] = useState(product);
    const [loading, setLoading] = useState(true);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [productDetail, setProductDetail] = useState(null);
    const [sale, setSale] = useState(null);
    const [reRender, setReRender] = useState(true);

    const getALlTypeProduct = (product) => {
        return [...new Set(product.map((item) => item.type))];
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/product/search`,
                });
                setProduct(res.data.metadata);
                setLoading(false);
            } catch {}
        };
        fetchData();
    }, [reRender]);

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
    const columns = [
        {
            title: 'Name',
            width: 180,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Thumbnail',
            width: 150,
            dataIndex: 'thumb',
            key: 'thumb',
        },
        {
            title: 'Tổng số lượng',
            dataIndex: 'quantity',
            width: 150,
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            width: 150,
            sorter: (a, b) => a.sold - b.sold,
        },
        {
            title: 'Kiểu',
            dataIndex: 'type',
            width: 150,
            filteredValue: filteredInfo.type || null,
            onFilter: (value, record) => record.type.includes(value),
            ellipsis: true,
            filters: [
                {
                    text: 'clothes',
                    value: 'clothes',
                },
                {
                    text: 'candy',
                    value: 'candy',
                },
                {
                    text: 'cake',
                    value: 'cake',
                },
                {
                    text: 'houseware',
                    value: 'houseware',
                },
                {
                    text: 'smart device',
                    value: 'smart device',
                },
                {
                    text: 'electronic device',
                    value: 'electronic device',
                },
            ],
            render: (type) => <span style={typeStyle(type)}>{type}</span>,
        },
        {
            title: 'cân nặng(kg)',
            dataIndex: 'weight',
            width: 150,
            sorter: (a, b) => a.weight - b.weight,
        },
        {
            title: 'Giá gốc(vnđ)',
            dataIndex: 'price',
            width: 150,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Giảm giá(%)',
            dataIndex: 'sale',
            width: 150,
            sorter: (a, b) => a.sale - b.sale,
        },
        {
            title: 'Giá bán',
            dataIndex: 'price2',
            width: 150,
        },

        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 170,
            render: (key) => (
                <>
                    <Button
                        onClick={() => {
                            console.log(key);
                            const productOnly = product.find((item) => {
                                return item.Id === key.Id;
                            });
                            setProductDetail(productOnly);
                            setModalOpen(true);
                        }}
                    >
                        Chi tiết
                    </Button>{' '}
                    <Button danger>Xóa</Button>
                </>
            ),
        },
    ];
    const typeStyle = (type) => {
        let color = '';
        switch (type) {
            case 'clothes':
                color = 'yellow';
                break;
            case 'candy':
                color = 'pink';
                break;
            case 'cake':
                color = 'skyblue';
                break;
            case 'houseware':
                color = '#b7eb8f';
                break;
            case 'smartdevice':
                color = '#adc6ff';
                break;
            default:
                color = '#b7eb8f';
                break;
        }
        return { marginBottom: 0, background: color };
    };
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);
    useEffect(() => {
        const settingData = () => {
            const newData = product.map((item) => {
                return {
                    key: item.Id,
                    Id: item.Id,
                    name: item.name,
                    thumb: <img src={item.images} className="product__thumb" />,
                    quantity: item.quantity,
                    sold: item.sold,
                    type: item.type,
                    weight: item.weight,
                    price: item.price,
                    sale: item.sale.percent || 0,
                    price2: item.price - (item.price * item.sale.percent || 0) / 100,
                };
            });
            setData(newData);
        };
        settingData();
    }, [product]);
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };
    console.log(productDetail && productDetail.sale.percent);
    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setProductDetail((prev) => {
            return { ...prev, [name]: value };
        });
    };
    const handleUpdateClick = async () => {
        let payload = Object.entries(productDetail); // Chuyển đổi object xang mảng gồm key và value
        payload = payload.filter(([key, value]) => {
            return key !== 'Id' && key !== 'timeUpdate';
        });
        payload = Object.fromEntries(payload);
        await axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/product/${productDetail.Id}`,
            data: payload,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        toast.success('Update thành công', {
            position: 'bottom-left',
            autoClose: 2000,
            progress: undefined,
            theme: 'light',
        });
        setModalOpen(false);
        setReRender(!reRender);
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
    const disabledDateTime = () => ({
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    });
    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    const getSaleOptions = () => {
        const sales = sale.map((item) => {
            return {
                value: item.id,
                label: item.percent,
            };
        });
        return sales;
    };

    return (
        <div className="admin__wrap--content">
            <Container>
                {' '}
                {loading ? (
                    <LoadingAntd subClass="subLoading" foreignClass="foreignClass" />
                ) : (
                    <Table
                        onChange={handleChange}
                        columns={columns}
                        dataSource={data}
                        scroll={{
                            x: 1600,
                            y: 800,
                        }}
                    />
                )}
            </Container>
            <Modal
                title="Chi tiết sản phẩm"
                centered
                open={modalOpen}
                width={1000}
                onOk={() => handleUpdateClick()}
                style={{ background: '#292929' }}
                onCancel={() => {
                    setModalOpen(false);
                }}
                okText="Update"
            >
                {productDetail && (
                    <>
                        <Row className="product_detail">
                            <Col>
                                <div className="product__detail--item">
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
                                    <img src={productDetail.images} className="product__thumb detail" />

                                    <UploadFile setProductDetail={setProductDetail} />
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
                                    <select
                                        name="type"
                                        className="select__type"
                                        value={productDetail.type}
                                        onChange={(e) => handleDetailChange(e)}
                                    >
                                        {getALlTypeProduct(product).map((item, index) => {
                                            return <option key={index}> {item}</option>;
                                        })}
                                    </select>
                                </div>
                            </Col>
                            <Col>
                                <div className="product__detail--item">
                                    <b>Giảm giá: </b>
                                    <b>{productDetail.sale.percent}</b>
                                    <Select
                                        defaultValue={productDetail.sale.percent}
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={(e) => {
                                            setProductDetail((prev) => {
                                                return {
                                                    ...prev,
                                                    sale: e,
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
                                    <label className="label__change__image">
                                        <input
                                            name="images"
                                            type="file"
                                            value=""
                                            onChange={(e) => handleDetailChange(e)}
                                        />
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
                                {productDetail.expiryDate && (
                                    <div className="product__detail--item">
                                        <b>Hạn sử dụng: </b>
                                        <input
                                            name="price"
                                            value={getDateFormat(new Date(productDetail.expiryDate._seconds * 1000))}
                                            onChange={(e) => handleDetailChange(e)}
                                        />
                                        <Space direction="vertical" size={12}>
                                            <DatePicker
                                                format={'YYYY/MM/DD'}
                                                disabledDate={disabledDate}
                                                disabledTime={disabledDateTime}
                                                showTime={{
                                                    defaultValue: dayjs('2015/01/01', 'YYYY/MM/DD'),
                                                }}
                                            />
                                        </Space>
                                    </div>
                                )}
                            </Col>
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
        </div>
    );
}

export default ProductPage;
