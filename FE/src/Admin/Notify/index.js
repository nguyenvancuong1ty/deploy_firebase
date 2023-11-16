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
