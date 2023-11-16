import { Radio } from 'antd';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function SpecialAttribute({ productDetail, setProductDetail }) {
    const [labels, setLabels] = useState(null);
    const [specialAttributeQuantity, setSpecialAttributeQuantity] = useState(null);
    const [specialAttributePrice, setSpecialAttributePrice] = useState(null);
    const [specialAttribute, setSpecialAttribute] = useState({});
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
                        if (key !== 'quantity' && key !== 'price') return `${key}: ${value}`;
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
    console.log('---', specialAttribute, '---');
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
    return (
        <div className="product__detail--item">
            <b>Thuộc tính riêng: </b>
            {Array.isArray(labels) && labels.length > 0 && (
                <Container>
                    <Radio.Group
                        value={JSON.stringify(specialAttribute)}
                        buttonStyle="solid"
                        style={{
                            marginTop: 16,
                        }}
                        onChange={onChange}
                    >
                        {labels.map((item, index) => {
                            return (
                                <Radio.Button key={index} value={item.value}>
                                    {item.label}
                                </Radio.Button>
                            );
                        })}
                    </Radio.Group>
                    {specialAttribute.quantity && (
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
                    {specialAttribute.price && (
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
                </Container>
            )}
        </div>
    );
}

export default SpecialAttribute;
