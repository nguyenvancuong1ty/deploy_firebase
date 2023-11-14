import { List, Radio, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';
function NotifyPage({ product, account, order, ordered }) {
    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState([]);
    useEffect(() => {
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
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);
    const a = [
        {
            quantity: 25,
            size: 'S',
            color: 'vàng',
        },
        {
            quantity: 25,
            size: 'S',
            color: 'đen',
        },
        {
            quantity: 25,
            size: 'S',
            color: 'trắng',
        },
        {
            quantity: 25,
            size: 'S',
            color: 'nâu',
        },
        {
            quantity: 12,
            size: 'M',
            color: 'vàng',
        },
        {
            quantity: 88,
            size: 'M',
            color: 'đen',
        },
        {
            quantity: 17,
            size: 'M',
            color: 'trắng',
        },
        {
            quantity: 44,
            size: 'M',
            color: 'nâu',
        },
        {
            quantity: 12,
            size: 'L',
            color: 'vàng',
        },
        {
            quantity: 88,
            size: 'L',
            color: 'đen',
        },
        {
            quantity: 17,
            size: 'L',
            color: 'trắng',
        },
    ];

    const labels = a.map((item) => {
        const b = Object.entries(item);
        const option = b.map(([key, value]) => {
            if (key !== 'quantity') return `${key}: ${value}`;
        });
        let label = option.join(' - ');
        if (label.startsWith(' - ')) {
            label = label.substring(2);
        }

        // Kiểm tra và loại bỏ ký tự "-" ở cuối chuỗi
        if (label.endsWith(' - ')) {
            label = label.substring(0, label.length - 2);
        }
        return { label: label, value: JSON.stringify(item) };
    });
    const onChange = (e) => {
        console.log(JSON.parse(e.target.value));
    };
    return (
        <div className="admin__wrap--content">
            <Container>
                {' '}
                {loading ? (
                    <LoadingAntd subClass="subLoading" foreignClass="foreignClass" />
                ) : (
                    <Row>
                        <Col>
                            <h3>Thông báo</h3>
                            <List
                                size={'large'}
                                pagination={{
                                    position: 'center',
                                    align: 'bottom',
                                }}
                                dataSource={notify}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<b>{item.title}</b>}
                                            description={<p>{item.description}</p>}
                                        ></List.Item.Meta>
                                        <Radio.Group
                                            buttonStyle="solid"
                                            style={{
                                                marginTop: 16,
                                            }}
                                            onChange={onChange}
                                        >
                                            {labels.map((item) => {
                                                return <Radio.Button value={item.value}>{item.label}</Radio.Button>;
                                            })}
                                        </Radio.Group>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default NotifyPage;
