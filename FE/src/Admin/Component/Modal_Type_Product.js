import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Select, Switch } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ModalTypeProduct({ typeDetail, setModalOpen, modalOpen, setTypeDetail, setReRender, reRender, typeBtn }) {
    const handleModalClick = async (type) => {
        let payload = Object.entries(typeDetail); // Chuyển đổi object xang mảng gồm key và value
        payload = payload.filter(([key, value]) => {
            return key !== 'Id' && key !== 'timeUpdate' && key !== 'timeCreate';
        });
        payload = Object.fromEntries(payload);
        if (type === 'update') {
            await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/type/product/${typeDetail.Id}`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setModalOpen(false);
            setReRender(!reRender);
            toast.success('Update thành công', {
                position: 'bottom-left',
                autoClose: 2000,
                progress: undefined,
                theme: 'light',
            });
        } else if (type === 'add') {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/type/product`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setModalOpen(false);
            setReRender(!reRender);
            toast.success('Tạo mới thành công', {
                position: 'bottom-left',
                autoClose: 2000,
                progress: undefined,
                theme: 'light',
            });
        }
    };
    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setTypeDetail((prev) => {
            return { ...prev, [name]: value };
        });
    };
    console.log(typeDetail);
    return (
        <Modal
            title="Thêm loại sản phẩm"
            centered
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            width={1000}
            style={{ background: '#292929' }}
            footer={[
                <Button key="cancel" onClick={() => setModalOpen(false)}>
                    Cancel
                </Button>,
                typeBtn === 'add' && (
                    <Button key="add" onClick={() => handleModalClick('add')}>
                        Thêm mới
                    </Button>
                ),
                typeBtn === 'update' && (
                    <Button key="add" onClick={() => handleModalClick('update')}>
                        Update
                    </Button>
                ),
            ]}
        >
            <Row className="product_detail">
                <Col>
                    {typeDetail && typeDetail.Id && (
                        <div className="product__detail--item info__disable">
                            <b>Id:</b> <span> {typeDetail.Id}</span>
                        </div>
                    )}
                    <div className="product__detail--item">
                        <b>Tên: </b>
                        <input
                            name="name"
                            id="name"
                            value={typeDetail ? typeDetail.name : ''}
                            onChange={(e) => handleDetailChange(e)}
                            style={{
                                width: 250,
                            }}
                        />
                        <label htmlFor="name">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </label>
                    </div>
                </Col>
                <Col>
                    <div className="product__detail--item">
                        <b>Text hiển thị: </b>
                        <input
                            name="vnl"
                            id="vnl"
                            value={typeDetail ? typeDetail.vnl : ''}
                            onChange={(e) => handleDetailChange(e)}
                            style={{
                                width: 250,
                            }}
                        />
                        <label htmlFor="vnl">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </label>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
}

export default ModalTypeProduct;
