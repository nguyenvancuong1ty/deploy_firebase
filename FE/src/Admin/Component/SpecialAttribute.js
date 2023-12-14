import { Button, Input, Modal, Radio, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AttributeAdd from './AttributeAdd';

function SpecialAttribute({ productDetail, setProductDetail }) {
    const [labels, setLabels] = useState(null);
    const [specialAttributeQuantity, setSpecialAttributeQuantity] = useState(null);
    const [specialAttributePrice, setSpecialAttributePrice] = useState(null);
    const [specialAttribute, setSpecialAttribute] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [enablePrice, setEnablePrice] = useState(false);
    const [rows, setRows] = useState([{ id: 1 }]);
    const [newAttribute, setNewAttribute] = useState({});
    useEffect(() => {
        const labels =
            productDetail &&
            Array.isArray(productDetail.attribute) &&
            productDetail.attribute.length > 0 &&
            productDetail.attribute.map((item) => {
                const b = Object.entries(item);
                const option =
                    Array.isArray(b) &&
                    b.length > 0 &&
                    b.map(([key, value]) => {
                        if (key !== 'quantity' && key !== 'price') {
                            return `${key}: ${value}`;
                        }
                    });
                let label = option.join(' - ');
                if (label.startsWith(' - ')) {
                    label = label.substring(2);
                }
                if (label.endsWith(' - ')) {
                    label = label.substring(0, label.length - 2);
                }
                return { label: label.trim(), value: JSON.stringify(item) };
            });
        setLabels(labels);
    }, [productDetail]);
    useEffect(() => {
        setSpecialAttributeQuantity(null);
        setSpecialAttributePrice(null);
        setSpecialAttribute(null);
    }, [productDetail.Id]);
    const onChange = (e) => {
        const specialAttributes = JSON.parse(e.target.value);
        setSpecialAttribute(specialAttributes);
        if (specialAttributes.quantity) {
            setSpecialAttributeQuantity(specialAttributes.quantity);
            setSpecialAttributePrice(specialAttributes.price);
        }
    };
    const containsObject = (obj, target) => {
        return Object.keys(obj).every((key) => obj[key] === target[key]);
    };
    const handleSpecialAttributeQuantityChange = (e) => {
        const newQuantity = e.target.value * 1;
        const newListSpecialAttributes = productDetail.attribute.map((item) => {
            if (containsObject(item, specialAttribute)) {
                item.quantity = newQuantity;
                setSpecialAttribute(item);
                setSpecialAttributeQuantity(newQuantity);
            }
            return item;
        });
        setProductDetail((prev) => {
            return { ...prev, attribute: newListSpecialAttributes };
        });
    };
    const handleSpecialAttributePriceChange = (e) => {
        const newPrice = e.target.value * 1;
        const newListSpecialAttributes = productDetail.attribute.map((item) => {
            if (containsObject(item, specialAttribute)) {
                item.price = newPrice;
                setSpecialAttribute(item);
                setSpecialAttributePrice(newPrice);
            }
            return item;
        });
        setProductDetail((prev) => {
            return { ...prev, attribute: newListSpecialAttributes };
        });
    };

    const handleRemove = () => {
        const newListSpecialAttributes = productDetail.attribute.filter((item) => {
            return JSON.stringify(item) !== JSON.stringify(specialAttribute);
        });
        setProductDetail((prev) => {
            return { ...prev, attribute: newListSpecialAttributes };
        });
        setSpecialAttribute(null);
    };

    const handleAddRow = () => {
        const newRow = { id: rows.length + 1 };
        setRows([...rows, newRow]);
    };

    return (
        <div className="product__detail--item">
            <b>Thuộc tính riêng: </b>
            <Button disabled={specialAttribute ? false : true} onClick={handleRemove}>
                Xóa
            </Button>
            <Container>
                <Radio.Group
                    value={JSON.stringify(specialAttribute)}
                    buttonStyle="solid"
                    style={{
                        marginTop: 16,
                    }}
                    onChange={onChange}
                >
                    {Array.isArray(labels) &&
                        labels.length > 0 &&
                        labels.map((item, index) => {
                            return (
                                <Radio.Button key={index} value={item.value} style={{ minWidth: 200 }}>
                                    {item.label}
                                </Radio.Button>
                            );
                        })}
                    <Tooltip title="Thêm loại">
                        <Button
                            onClick={() => {
                                setModalOpen(true);
                            }}
                        >
                            +
                        </Button>
                    </Tooltip>
                </Radio.Group>

                <div>
                    {productDetail.attribute && specialAttribute && specialAttribute.quantity && (
                        <>
                            <b>Số lượng: </b>
                            <input
                                name="specialQuantity"
                                type="number"
                                value={specialAttributeQuantity}
                                onChange={handleSpecialAttributeQuantityChange}
                            />
                        </>
                    )}
                    {productDetail.attribute && specialAttribute && specialAttribute.price && (
                        <>
                            <b>Giá: </b>
                            <input
                                name="specialPrice"
                                type="number"
                                value={specialAttributePrice}
                                onChange={handleSpecialAttributePriceChange}
                            />
                        </>
                    )}
                </div>
            </Container>
            <Modal
                title="Thêm mới thuộc tính"
                centered
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                width={1400}
                style={{ background: '#292929' }}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => {
                            setModalOpen(false);
                            setNewAttribute({});
                            setRows([{ id: 1 }]);
                        }}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="add"
                        onClick={() => {
                            setProductDetail((prev) => {
                                return { ...prev, attribute: [...productDetail.attribute, newAttribute] };
                            });
                            setModalOpen(false);
                            setNewAttribute({});
                        }}
                    >
                        Thêm mới
                    </Button>,
                ]}
            >
                <Row>
                    <Col xs={8}>
                        {rows.map((row) => (
                            <AttributeAdd key={row.id} setNewAttribute={setNewAttribute} />
                        ))}
                        <Row>
                            <Tooltip title="Trường này là bắt buộc">
                                <Col>
                                    <label htmlFor="att">Số lượng</label>
                                    <Input
                                        type="number"
                                        placeholder="Trường này là bắt buộc"
                                        onChange={(e) => {
                                            setNewAttribute((prev) => {
                                                return { ...prev, quantity: e.target.value * 1 };
                                            });
                                        }}
                                    ></Input>
                                </Col>
                            </Tooltip>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="att">Giá</label>
                                <div className="d-flex">
                                    <Input
                                        type="number"
                                        disabled={!enablePrice}
                                        onChange={(e) =>
                                            setNewAttribute((prev) => {
                                                return { ...prev, price: e.target.value * 1 };
                                            })
                                        }
                                    ></Input>
                                    <Button onClick={() => setEnablePrice(true)}>Thêm giá</Button>
                                </div>
                            </Col>
                        </Row>
                        <Tooltip title="Thêm cặp thuộc tính, giá trị">
                            <Button onClick={handleAddRow} className="mt-4">
                                +
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col className="bg-dark text-light rounded fs-5">
                        <pre>
                            <code> {JSON.stringify(newAttribute, null, 2)}</code>
                        </pre>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}

export default SpecialAttribute;
