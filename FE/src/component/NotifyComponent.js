import Notify from '~/component/Notify';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '~/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Header/Header.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { setNumberNotify } from '~/redux';

function NotifyComponent({ page }) {
    const numberNotify = useSelector((state) => state.numberNotifyReduce.numberNotify);
    const [loading, setLoading] = useState(true);
    const [showListNotify, setShowListNotify] = useState(false);
    const [notifyData, setNotifyData] = useState([]);
    const isLogin = useSelector((state) => state.AuthReducer.Auth);
    const dispatch = useDispatch();
    useEffect(() => {
        const handleClick = () => {
            showListNotify && setShowListNotify(false);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [showListNotify]);
    useEffect(() => {
        setLoading(true);
        const notifyRef = collection(db, 'notify');
        const queryRef = query(
            notifyRef,
            where('user_id', '==', [localStorage.getItem('uid')]),
            where('deleted', '==', false),
            orderBy('time', 'desc'),
        );

        const queryRefAll = query(notifyRef, where('isAll', '==', true), where('deleted', '==', false));

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            isLogin &&
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        const newNotify = change.doc.data();
                        localStorage.getItem('uid') &&
                            setNotifyData((prev) => [{ id: change.doc.id, ...newNotify }, ...prev]);
                    }
                });

            setLoading(false);
        });

        const unsubscribeAll = onSnapshot(queryRefAll, (snapshot) => {
            isLogin &&
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        const newNotify = change.doc.data();
                        localStorage.getItem('uid') &&
                            setNotifyData((prev) => [{ id: change.doc.id, ...newNotify }, ...prev]);
                    }
                });

            setLoading(false);
        });

        return () => {
            unsubscribe();
            unsubscribeAll();
        };
    }, [isLogin]);
    useEffect(() => {
        const newData = notifyData.sort((a, b) => {
            return b.time.seconds - a.time.seconds;
        });
        setNotifyData(newData);
    }, [notifyData]);
    useEffect(() => {
        const newData =
            notifyData.length > 0 &&
            notifyData.filter((item) => {
                return !item.isRead || !item.user_id.includes(localStorage.getItem('uid'));
            });
        dispatch(setNumberNotify(newData.length));
    }, [notifyData]);
    return (
        <li
            className={`shop header__opstion--item ${page === 'admin' ? 'admin--page' : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                setShowListNotify(true);
            }}
        >
            <div className="header__opstion--link">
                <FontAwesomeIcon
                    icon={faBell}
                    className={`header__opstion--img ${numberNotify > 0 && 'notify__icon'} ${
                        page === 'admin' ? 'notify__icon--admin--page' : ''
                    }`}
                    size="xl"
                />
                <p className="header__opstion--title">Thông báo</p>{' '}
                {numberNotify > 0 && (
                    <div className="number__product">
                        <span className="number">{numberNotify}</span>
                    </div>
                )}
                {showListNotify && <Notify loading={loading} notifyData={notifyData} />}
            </div>
        </li>
    );
}

export default NotifyComponent;
