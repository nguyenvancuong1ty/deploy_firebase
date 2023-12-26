import { SearchOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';
import ModalAccount from '../Component/Modal_Account';
import axios from 'axios';
import { toast } from 'react-toastify';

function OrderPage() {
    const [account, setAccount] = useState([]);
    const [data, setData] = useState(account);
    const [loading, setLoading] = useState(true);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [accountDetail, setAccountDetail] = useState(null);
    const [reRender, setReRender] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/order/all`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setAccount(res.data.metadata);
                setLoading(false);
            } catch {}
        };
        fetchData();
    }, [reRender]);
    useEffect(() => {
        setData(account);
    }, [account]);

    const confirm = async (Id) => {
        try {
            const response = await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/account/${Id}`,
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
            title: 'Id',
            width: 180,
            dataIndex: 'Id',
            key: 'Id',
            fixed: 'left',
        },
        {
            title: 'sản phẩm',
            width: 150,
            dataIndex: 'detail',
            key: 'detail',
            render: (key) => <>{key.name}</>,
        },
        {
            title: 'Số lượng',
            width: 150,
            dataIndex: 'detail',
            key: 'detail',
            render: (key) => <>{key.quantity}</>,
        },
        {
            title: 'Tổng đơn',
            width: 150,
            dataIndex: 'total_amount',
            key: 'total_amount',
        },
        {
            title: 'Tiền ship',
            width: 150,
            dataIndex: 'shipping_cost',
            key: 'shipping_cost',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'shipping_address',
            key: 'shipping_address',
            width: 150,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 150,
        },
        {
            title: 'Trạng thái',
            width: 150,
            dataIndex: 'status',
            key: 'status',
            fixed: 'right',
        },
        // {
        //     title: 'Action',
        //     key: 'operation',
        //     fixed: 'right',
        //     width: 110,
        //     render: (key) => (
        //         <>
        //             <Button
        //                 onClick={() => {
        //                     const accountOnly = account.find((item) => {
        //                         return item.Id === key.Id;
        //                     });
        //                     setAccountDetail(accountOnly);
        //                     setModalOpen(true);
        //                 }}
        //             >
        //                 Chi tiết
        //             </Button>
        //             <Popconfirm
        //                 title="Xóa tài khoản"
        //                 placement="left"
        //                 description="Xóa tài khoản khỏi hệ thống"
        //                 onConfirm={() => confirm(key.Id)}
        //             >
        //                 <Button danger onClick={() => {}}>
        //                     Xóa
        //                 </Button>
        //             </Popconfirm>
        //         </>
        //     ),
        // },
    ];
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };
    return (
        <div className="admin__wrap--content">
            <Container>
                {loading ? (
                    <LoadingAntd subClass="subLoading" foreignClass="foreignClass" />
                ) : (
                    <Table
                        onChange={handleChange}
                        columns={columns}
                        dataSource={data}
                        scroll={{
                            x: 1600,
                            y: 600,
                        }}
                    />
                )}
            </Container>{' '}
            <ModalAccount
                accountDetail={accountDetail}
                setAccountDetail={setAccountDetail}
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
                setReRender={setReRender}
                reRender={reRender}
                account={account}
            ></ModalAccount>
        </div>
    );
}

export default OrderPage;
