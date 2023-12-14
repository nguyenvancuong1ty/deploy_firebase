import { Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

function AttributeAdd({ setNewAttribute }) {
    const [name, setName] = useState(null);
    return (
        <Row>
            <Col>
                <label htmlFor="att">Thuộc tính</label>
                <Input
                    placeholder="Nhập thuộc tính"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    name="att"
                ></Input>
            </Col>
            <Col>
                <label htmlFor="val">Giá trị</label>
                <Input
                    placeholder="Nhập giá trị"
                    name={name}
                    onChange={(e) => {
                        setNewAttribute((prev) => {
                            return {
                                ...prev,
                                [name]: e.target.value,
                            };
                        });
                    }}
                ></Input>
            </Col>
        </Row>
    );
}

export default AttributeAdd;
