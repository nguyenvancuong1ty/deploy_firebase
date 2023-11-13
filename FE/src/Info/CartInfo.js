import { Button, List } from 'antd';
import '../App.css';
import '../Cart/Cart.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Billing from '~/component/Billing';
import CartInfoItem from '~/component/CartInfoItem';
import { setTotalCoin } from '~/redux';

function CartInfo() {
    const dataCart = useSelector((state) => state.dataCartReducer.dataCart);
    const [checkOut, setCheckOut] = useState([]);
    const [showBilling, setShowBilling] = useState(false);
    const totalCoin = useSelector((state) => state.totalCoinReducer.totalCoin);
    const dispatch = useDispatch();
    useEffect(() => {
        const total =
            Array.isArray(checkOut) && checkOut.length > 0
                ? checkOut.reduce((init, item) => {
                      return (
                          init +
                          (item.product.price - (item.product.price * item.product.sale.percent || 0) / 100) *
                              item.quantity
                      );
                  }, 0)
                : 0;
        dispatch(setTotalCoin(total));
    }, [checkOut]);
    const data = dataCart.map((item) => {
        return {
            data: item,
        };
    });
    return (
        <>
            <List
                size={'large'}
                pagination={{
                    position: 'center',
                    align: 'bottom',
                }}
                dataSource={data}
                renderItem={(item) => <CartInfoItem item={item} checkOut={checkOut} setCheckOut={setCheckOut} />}
            />
            <div className="cart__info--option">
                <Button onClick={() => setShowBilling(true)}>Đặt hàng</Button>
            </div>
            {showBilling && <Billing product={checkOut} total={totalCoin} setShowBilling={setShowBilling} />}
        </>
    );
}

export default CartInfo;
