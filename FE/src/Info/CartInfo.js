import { Button, Empty, List } from 'antd';
import '../App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Billing from '~/component/Billing';
import CartInfoItem from '~/component/CartInfoItem';
import { setTotalCoin } from '~/redux';
import { toast } from 'react-toastify';

function CartInfo() {
    const dataCart = useSelector((state) => state.dataCartReducer.dataCart);
    const [checkOut, setCheckOut] = useState([]);
    const [showBilling, setShowBilling] = useState(false);
    const [checked, setChecked] = useState(false);
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
            {dataCart.length > 0 ? (
                <>
                    <List
                        size={'large'}
                        pagination={{
                            position: 'center',
                            align: 'bottom',
                        }}
                        dataSource={data}
                        renderItem={(item) => (
                            <CartInfoItem item={item} checkOut={checkOut} setCheckOut={setCheckOut} checked={checked} />
                        )}
                    />
                    <div className="cart__info--option">
                        <Button
                            onClick={() => {
                                if (!checked) {
                                    setCheckOut(dataCart);
                                    setChecked(true);
                                } else {
                                    setCheckOut([]);
                                    setChecked(false);
                                }
                            }}
                        >
                            {checked ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                        </Button>{' '}
                        <Button
                            onClick={() =>
                                checkOut.length > 0
                                    ? setShowBilling(true)
                                    : toast.warning('Chọn ít nhất 1 sản phẩm!', {
                                          position: toast.POSITION.BOTTOM_LEFT,
                                          autoClose: 1000,
                                      })
                            }
                        >
                            Đặt hàng
                        </Button>
                    </div>{' '}
                </>
            ) : (
                <Empty />
            )}
            {showBilling && <Billing product={checkOut} total={totalCoin} setShowBilling={setShowBilling} />}
        </>
    );
}

export default CartInfo;
