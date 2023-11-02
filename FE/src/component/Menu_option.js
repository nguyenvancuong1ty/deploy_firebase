import React, { useState } from 'react';
import {
    CaretDownOutlined,
    CaretUpOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Bán chạy nhất', '1', <PieChartOutlined />),
    getItem('Giá tốt hôm nay', '2', <DesktopOutlined />),
    getItem('Sản phẩm nổi bật', '3', <ContainerOutlined />),
    getItem('Giá cao', '4', <CaretDownOutlined />),
    getItem('Giá thấp', '5', <CaretUpOutlined />),
];
const MenuOption = ({ data, setData, setLoading }) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const getBestSeller = () => {
        setLoading(true);
        const newData = data[0].sort((a, b) => {
            return b.sold - a.sold;
        });
        setData([newData]);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };
    const getBiggestDiscount = () => {
        setLoading(true);
        const newData = data[0].sort((a, b) => {
            const prev = b.sale.percent || 0;
            const next = a.sale.percent || 0;
            return prev - next;
        });
        setData([newData]);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };
    const getIncrease = () => {
        setLoading(true);
        const newData = data[0].sort((a, b) => {
            const prev = b.price - (b.price * (b.sale.percent || 0)) / 100;
            const next = a.price - (a.price * (a.sale.percent || 0)) / 100;
            return next - prev;
        });
        setData([newData]);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };
    const getDecrease = () => {
        setLoading(true);
        const newData = data[0].sort((a, b) => {
            const prev = b.price - (b.price * (b.sale.percent || 0)) / 100;
            const next = a.price - (a.price * (a.sale.percent || 0)) / 100;
            return prev - next;
        });
        setData([newData]);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };
    const handleItemClick = (item) => {
        switch (item.key) {
            case '1':
                getBestSeller();
                break;
            case '2':
                getBiggestDiscount();
                break;
            case '3':
                getBestSeller();
                break;
            case '4':
                getDecrease();
                break;
            case '5':
                getIncrease();
                break;
            default:
                break;
        }
    };
    return (
        <div
            className="menu__options"
            style={{
                width: 256,
            }}
        >
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                onSelect={({ key }) => handleItemClick({ key })}
                className="menu"
            />
        </div>
    );
};
export default MenuOption;
