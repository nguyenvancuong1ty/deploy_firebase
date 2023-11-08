import { Empty, Modal } from 'antd';
import LoadingAntd from '~/Loading/Loading.antd';
import TimeNotify from './TimeNotify';
import { useState } from 'react';

import NotifyItem from './NotifyItem';
function Notify({ loading, notifyData }) {
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({});

    return (
        <>
            <div className="wrap_notify">
                {loading && <LoadingAntd subClass="subLoading" />}
                {!loading && Array.isArray(notifyData) && notifyData.length > 0 ? (
                    <>
                        {notifyData.map((item, index) => (
                            <NotifyItem key={index} data={item} index={index} setNotify={setNotify} setOpen={setOpen} />
                        ))}
                        <footer>
                            <button onClick={() => {}} className="button">
                                Đánh dấu tất cả đã đọc
                            </button>
                        </footer>
                    </>
                ) : (
                    <Empty />
                )}
            </div>
            <Modal
                title="Chi tiết thông báo"
                centered
                zIndex={99999}
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <p>{notify.title}</p>
                <p>{notify.description}</p>
                <TimeNotify time={notify.time} />
            </Modal>
        </>
    );
}

export default Notify;
