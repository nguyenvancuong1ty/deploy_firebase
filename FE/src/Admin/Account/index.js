import { SearchOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';
import ModalAccount from '../Component/Modal_Account';
import axios from 'axios';
import { toast } from 'react-toastify';

function AccountPage() {
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
                    url: `${process.env.REACT_APP_API_URL}/account/`,
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
        const settingAccount = () => {
            const newData = account.map((item) => {
                return {
                    key: item.Id,
                    Id: item.Id,
                    name: item.fullName,
                    age: item.age,
                    username: item.username,
                    email: item.email || '',
                    type: item.type_account,
                    active: `${item.active}`,
                };
            });
            setData(newData);
        };
        settingAccount();
    }, [account]);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);
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
            title: 'Full Name',
            width: 180,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            filterIcon: () => (
                <SearchOutlined
                    style={{
                        color: '#1677ff',
                    }}
                />
            ),
        },
        {
            title: 'Tuổi',
            width: 150,
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 150,
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
                    text: 'customer',
                    value: 'customer',
                },
                {
                    text: 'shipper',
                    value: 'shipper',
                },
                {
                    text: 'admin',
                    value: 'admin',
                },
            ],
        },
        {
            title: 'active',
            dataIndex: 'active',
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 110,
            render: (key) => (
                <>
                    <Button
                        onClick={() => {
                            const accountOnly = account.find((item) => {
                                return item.Id === key.Id;
                            });
                            setAccountDetail(accountOnly);
                            setModalOpen(true);
                        }}
                    >
                        Chi tiết
                    </Button>
                    <Popconfirm
                        title="Xóa tài khoản"
                        placement="left"
                        description="Xóa tài khoản khỏi hệ thống"
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

export default AccountPage;
