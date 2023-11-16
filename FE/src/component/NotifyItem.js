import { useEffect, useState } from 'react';
import TimeNotify from './TimeNotify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { decrement } from '~/Redux/numberNotifySlice';
function NotifyItem({ data, setNotify, setOpen, }) {
    const [isRead, setIsRead] = useState(false);
    const dispatch = useDispatch();
    const updateNotify = async (id) => {
        await axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}/notify/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: data.isAll
                ? {
                      user_id: [...data.user_id, localStorage.getItem('uid')],
                      isRead: true,
                  }
                : {
                      isRead: true,
                  },
        });
    };

    useEffect(() => {
        const isRead = data.user_id.includes(localStorage.getItem('uid')) && data.isRead === true;
        setIsRead(isRead);
    }, [data]);

    return (
        <div
            className={`items ${isRead ? '' : 'unread__notify'}`}
            onClick={(e) => {
                setNotify(data);
                e.stopPropagation();
                setOpen(true);
                if (isRead === false) {
                    setIsRead(true);
                    updateNotify(data.id);
                    dispatch(decrement());
                }
            }}
        >
            <div className="content">
                <b>{data.title}</b>
                <div>
                    <div className="price">{data.description}</div>
                </div>
            </div>
            <TimeNotify time={data.time} />
        </div>
    );
}

export default NotifyItem;
