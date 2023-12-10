import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Select, Switch } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ModalNotify({ setModalOpen, modalOpen, reRender, setReRender }) {
    const [notify, setNotify] = useState(null);
    const { confirm } = Modal;
    const handleModalClick = async () => {
        confirm({
            centered: true,
            zIndex: 9999,
            title: 'Gửi thông báo',
            content: 'Bạn có chắc muốn gửi thông báo đến mọi người?',
            onOk() {
                handlePushNotification().then(() => {
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
    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setNotify((prev) => {
            return { ...prev, [name]: value };
        });
    };
    console.log(notify);
    const handlePushNotification = async () => {
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/notify-all`,
            data: notify,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    };
    return (
        <Modal
            title="Thông báo mới"
            centered
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            width={1000}
            style={{ background: '#292929' }}
            footer={[
                <Button key="cancel" onClick={() => setModalOpen(false)}>
                    Cancel
                </Button>,
                <Button key="add" onClick={() => handleModalClick()}>
                    Gửi
                </Button>,
            ]}
        >
            <Row className="product_detail">
                <Col>
                    <div className="product__detail--item">
                        <b>Tiêu đề: </b>
                        <input
                            name="title"
                            id="title"
                            value={notify ? notify.title : ''}
                            onChange={(e) => handleDetailChange(e)}
                            style={{
                                width: 250,
                            }}
                        />
                        <label htmlFor="title">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </label>
                    </div>
                </Col>
                <Col>
                    <div className="product__detail--item">
                        <b>Nội dung: </b>
                        <input
                            name="body"
                            id="body"
                            value={notify ? notify.body : ''}
                            onChange={(e) => handleDetailChange(e)}
                            style={{
                                width: 250,
                            }}
                        />
                        <label htmlFor="body">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </label>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
}

export default ModalNotify;
