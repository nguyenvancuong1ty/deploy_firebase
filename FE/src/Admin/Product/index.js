import { Button, Popconfirm, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ModalComponent from '../Component/Modal_Component';
import { toast } from 'react-toastify';
dayjs.extend(customParseFormat);

function ProductPage() {
    const [product, setProduct] = useState([]);
    const [data, setData] = useState(product);
    const [loading, setLoading] = useState(true);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [productDetail, setProductDetail] = useState(null);
    const [reRender, setReRender] = useState(true);

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
    const confirm = async (Id) => {
        try {
            const response = await axios({
                method: 'patch',
                url: `${process.env.REACT_APP_API_URL}/product/delete/${Id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setTimeout(() => {
                setModalOpen(false);
                setReRender(!reRender);
                toast.success('Xóa thành công', {
                    position: 'bottom-left',
                    autoClose: 2000,
                    progress: undefined,
                    theme: 'light',
                });
            }, 500);
        } catch (error) {
            console.error(error);
        }
    };

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
                            const productOnly = product.find((item) => {
                                return item.Id === key.Id;
                            });
                            setProductDetail(productOnly);
                            setModalOpen(true);
                        }}
                    >
                        Chi tiết
                    </Button>
                    <Popconfirm
                        title="Xóa sản phẩm"
                        placement="left"
                        description="Xóa sản phẩm khỏi cửa hàng"
                        onConfirm={() => confirm(key.Id)}
                    >
                        <Button danger onClick={() => {}}>
                            Xóa
                        </Button>
                    </Popconfirm>
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
                    thumb: <img alt="" src={item.images} className="product__thumb" />,
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
                            y: 670,
                        }}
                    />
                )}
            </Container>
            <ModalComponent
                productDetail={productDetail}
                setProductDetail={setProductDetail}
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
                setReRender={setReRender}
                reRender={reRender}
                product={product}
            ></ModalComponent>
        </div>
    );
}

export default ProductPage;
