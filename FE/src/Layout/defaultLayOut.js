import { useState } from 'react';
import Header from '~/Header';
import ScrollToTop from '~/component/scrollToTop';

function DefaultLayout({ Page, setShow, showCart, setShowCart, setUid }) {
    const [active, setActive] = useState('cake');
    return (
        <>
            <Header
                setShow={setShow}
                showCart={showCart}
                setShowCart={setShowCart}
                setUid={setUid}
                active={active}
                setActive={setActive}
            />
            <section style={{ height: 150 }}></section>
            <ScrollToTop />
            {Page}
        </>
    );
}

export default DefaultLayout;
