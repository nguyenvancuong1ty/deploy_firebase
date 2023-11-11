import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Select, Switch } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import LoadingSpin from '~/Loading/Loading.spin';
function ModalAccount({ accountDetail, setModalOpen, modalOpen, setAccountDetail, setReRender, reRender, account }) {
    const handleUpdateClick = async (type) => {
        let payload = Object.entries(accountDetail); // Chuyển đổi object xang mảng gồm key và value
        payload = payload.filter(([key, value]) => {
            return key !== 'Id' && key !== 'timeUpdate' && key !== 'timeCreate';
        });
        payload = Object.fromEntries(payload);
        if (type === 'update') {
            await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/account/${accountDetail.Id}`,
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
                url: `${process.env.REACT_APP_API_URL}/account`,
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
        setAccountDetail((prev) => {
            return { ...prev, [name]: value };
        });
    };
    const getTypeAccountOptions = () => {
        const types = [...new Set(account.map((item) => item.type_account))].map((item) => {
            return {
                value: item,
                label: item,
            };
        });
        return types;
    };

    const handleDetailChangeActive = async (active) => {
        setAccountDetail((prev) => {
            return { ...prev, active: active };
        });
    };
    console.log(accountDetail);
    return (
        <Modal
            title="Chi tiết sản phẩm"
            centered
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            width={1000}
            style={{ background: '#292929' }}
            footer={[
                <Button key="cancel" onClick={() => setModalOpen(false)}>
                    Cancel
                </Button>,
                <Button key="add" onClick={() => handleUpdateClick('add')}>
                    Thêm mới
                </Button>,
                <Button key="ok" type="primary" onClick={() => handleUpdateClick('update')}>
                    Update
                </Button>,
            ]}
        >
            {accountDetail && (
                <>
                    <Row className="product_detail">
                        <Col>
                            <div className="product__detail--item info__disable">
                                <b>Id:</b> <span> {accountDetail.Id}</span>
                            </div>
                            <div className="product__detail--item">
                                <b>Tên: </b>
                                <input
                                    name="name"
                                    id="name"
                                    value={accountDetail.fullName}
                                    onChange={(e) => handleDetailChange(e)}
                                />
                                <label htmlFor="name">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </label>
                            </div>
                            <div className="product__detail--item">
                                <b>Tên tài khoản: </b>
                                <input
                                    name="username"
                                    id="username"
                                    value={accountDetail.username}
                                    onChange={(e) => handleDetailChange(e)}
                                    style={{
                                        width: 250,
                                    }}
                                />
                                <label htmlFor="username">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </label>
                            </div>

                            <div className="product__detail--item">
                                <b>Kiểu: </b>
                                <Select
                                    value={accountDetail.type_account}
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={(e) => {
                                        setAccountDetail((prev) => {
                                            return {
                                                ...prev,
                                                type_account: e,
                                            };
                                        });
                                    }}
                                    options={getTypeAccountOptions()}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="product__detail--item">
                                <b>Tuổi: </b>
                                <input
                                    name="age"
                                    type="number"
                                    value={accountDetail.age}
                                    onChange={(e) => handleDetailChange(e)}
                                />
                            </div>
                            <div className="product__detail--item">
                                <b>Email: </b>
                                <input
                                    name="email"
                                    id="email"
                                    value={accountDetail.email || ''}
                                    onChange={(e) => handleDetailChange(e)}
                                    style={{
                                        width: 250,
                                    }}
                                />
                                <label htmlFor="email">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </label>
                            </div>
                            <div className="product__detail--item">
                                <b>Địa chỉ: </b>
                                <input
                                    name="address"
                                    id="address"
                                    value={accountDetail.address || ''}
                                    onChange={(e) => handleDetailChange(e)}
                                    style={{
                                        width: 250,
                                    }}
                                />
                                <label htmlFor="address">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </label>
                            </div>
                            <div className="product__detail--item">
                                <b>Số điện thoại: </b>
                                <input
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={accountDetail.phoneNumber || ''}
                                    onChange={(e) => handleDetailChange(e)}
                                    style={{
                                        width: 250,
                                    }}
                                />
                                <label htmlFor="phoneNumber">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </label>
                            </div>
                            <div className="product__detail--item">
                                <b>Active: </b>
                                <Switch defaultChecked={accountDetail.active} onChange={handleDetailChangeActive} />
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Modal>
    );
}

export default ModalAccount;
