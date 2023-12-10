import { SearchOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalTypeProduct from '../Component/Modal_Type_Product';

function AccountPage() {
    const [type, setType] = useState([]);
    const [typeDetail, setTypeDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [reRender, setReRender] = useState(true);
    const [typeBtn, setTypeBtn] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/type/product`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setType(res.data.metadata);
                setLoading(false);
            } catch {}
        };
        fetchData();
    }, [reRender]);

    const confirm = async (Id) => {
        try {
            const response = await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/type/product/${Id}`,
                data: {
                    deleted: true,
                },
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
            title: 'Loại sản phẩm',
            width: 180,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Text hiển thị',
            dataIndex: 'vnl',
            width: 180,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 60,
            render: (key) => (
                <>
                    <Button
                        onClick={() => {
                            const productOnly = type.find((item) => {
                                return item.Id === key.Id;
                            });
                            setTypeDetail(productOnly);
                            setModalOpen(true);
                            setTypeBtn('update');
                        }}
                    >
                        Chi tiết
                    </Button>
                    <Popconfirm
                        title="Xóa loại sản phẩm"
                        placement="left"
                        description="Xóa loại sản phẩm khỏi hệ thống"
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

    return (
        <div className="admin__wrap--content">
            <Container>
                {loading ? (
                    <LoadingAntd subClass="subLoading" foreignClass="foreignClass" />
                ) : (
                    <>
                        <Button
                            className="btn__add--type--product"
                            style={{ float: 'right' }}
                            onClick={() => {
                                setTypeDetail(null);
                                setTypeBtn('add');
                                setModalOpen(true);
                            }}
                        >
                            Thêm loại sản phẩm
                        </Button>
                        <Table columns={columns} dataSource={type} pagination={{ pageSize: 5 }} />
                    </>
                )}
            </Container>
            <ModalTypeProduct
                typeDetail={typeDetail}
                setTypeDetail={setTypeDetail}
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
                setReRender={setReRender}
                reRender={reRender}
                typeBtn={typeBtn}
            ></ModalTypeProduct>
        </div>
    );
}

export default AccountPage;
