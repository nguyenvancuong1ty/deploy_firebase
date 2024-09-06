import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingAntd from '~/Loading/Loading.antd';
import './index.css';
import axios from 'axios';
const Forgetpass = ({ setShow, setUid }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        await axios({
            url: `${process.env.REACT_APP_API_URL}/account/confirm-code/${values?.email}`,
            method: 'Get',
        })
            .then((res) => {
                toast.success('Go to email get Code', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch((e) => {
                toast.error('Email does not exits', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            });
    };
    return (
        <Container>
            <Row lg={2} md={2} sm={1} xl={3} xs={1} className="overlay-wrap">
                <Col
                    className=""
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        {' '}
                        <Form.Item
                            name="email"
                            className="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Get auth code
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
export default Forgetpass;
