import { Button, List, Modal, Radio, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';
import ModalNotify from '../Component/Modal_Notify';
import { toast } from 'react-toastify';
function NotifyPage({ product, account, order, ordered }) {
    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [reRender, setReRender] = useState(true);
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
            setLoading(false);
        };
        fetchData();
    }, [reRender]);
    useEffect(() => {
        const sortData =
            notify && Array.isArray(notify) && notify.length > 0 && notify.sort((prev, next) => next.time - prev.time);
        setNotify(sortData);
    }, [notify]);
    const handlePushNotifyAgain = (e, item) => {
        confirm({
            centered: true,
            zIndex: 9999,
            title: 'Gửi lại thông báo',
            content: 'Bạn có chắc muốn gửi lại thông báo này?',
            onOk() {
                axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_API_URL}/notify-all`,
                    data: {
                        title: item.title,
                        body: item.description,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }).then(() => {
                    setModalOpen(false);
                    setReRender(!reRender);
                    toast.success('Đã gửi thông báo', {
                        position: 'bottom-left',
                        autoClose: 2000,
                        progress: undefined,
                        theme: 'light',
                    });
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
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
                            <div className="notify__page--head">
                                <h3>Thông báo đã gửi</h3>
                                <Button
                                    className="btn__add--type--product"
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}
                                >
                                    Gửi thông báo mới
                                </Button>
                            </div>
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
                                        />
                                        <Button onClick={(e) => handlePushNotifyAgain(e, item)}>Gửi lại</Button>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                )}
            </Container>
            <ModalNotify
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                reRender={reRender}
                setReRender={setReRender}
            ></ModalNotify>
        </div>
    );
}

export default NotifyPage;
