import { SearchOutlined } from '@ant-design/icons';
import { Button, List, Modal, Popconfirm, Radio, Select, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';
function ImportProductPage() {
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState([]);
    const [data, setData] = useState();
    const { confirm } = Modal;
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/notify/public`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setNotify(res.data.metadata);
            } catch {}
        };
        fetchData();
        setLoading(false);
    }, []);

    const columns = [
        {
            title: 'Có cái đéo gì đâu',
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
            filteredValue: data || null,
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
                            const accountOnly = data.find((item) => {
                                return item.Id === key.Id;
                            });
                            // setAccountDetail(accountOnly);
                            // setModalOpen(true);
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
    return (
        <div className="admin__wrap--content">
            <Container>
                {loading ? (
                    <LoadingAntd subClass="subLoading" foreignClass="foreignClass" />
                ) : (
                    <Row>
                        <Table
                            // onChange={handleChange}
                            columns={columns}
                            dataSource={data}
                            scroll={{
                                x: 1600,
                                y: 600,
                            }}
                        />
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default ImportProductPage;
