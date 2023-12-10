import Notify from '~/component/Notify';
import { useDispatch, useSelector } from 'react-redux';
import { and, collection, onSnapshot, or, query, where } from 'firebase/firestore';
import { db } from '~/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Header/Header.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { changeNotifyData } from '~/Redux/notifyDataSlice';
import { changeNumberNotify } from '~/Redux/numberNotifySlice';

function NotifyComponent({ page }) {
    const numberNotify = useSelector((state) => state.numberNotify.numberNotify);
    const [loading, setLoading] = useState(true);
    const [showListNotify, setShowListNotify] = useState(false);
    const [listNotify, setListNotify] = useState([]);
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
        if (!isLogin || Object.keys(isLogin).length <= 0) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const notifyRef = collection(db, 'notify');
        const queryRef =
            localStorage.getItem('account') !== 'admin'
                ? query(
                      notifyRef,
                      or(
                          and(
                              where('user_id', '==', [localStorage.getItem('uid')]),
                              where('deleted', '==', false),
                              where('isAll', '==', false),
                          ),
                          and(where('isAll', '==', true), where('deleted', '==', false)),
                      ),
                  )
                : query(
                      notifyRef,
                      and(
                          where('user_id', '==', [localStorage.getItem('uid')]),
                          where('deleted', '==', false),
                          where('isAll', '==', false),
                      ),
                  );
        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    setListNotify((prev) => [
                        ...prev,
                        {
                            id: change.doc.id,
                            ...change.doc.data(),
                            time: change.doc.data().time.toMillis(),
                        },
                    ]);
                }
                if (change.type === 'modified') {
                    console.log(change.doc.data());
                }
                if (change.type === 'removed') {
                    console.log('Removed city: ', change.doc.data());
                }
            });
            setLoading(false);
        });
        return () => unsubscribe();
    }, [isLogin]);

    useEffect(() => {
        const notifyNotRead = listNotify.filter((item) => {
            return !item.user_id.includes(localStorage.getItem('uid')) || item.isRead !== true;
        });
        dispatch(changeNumberNotify(notifyNotRead.length || 0));
        const sortNotify =
            Array.isArray(listNotify) &&
            listNotify.length > 0 &&
            listNotify.sort((prev, next) => next.time - prev.time);
        dispatch(changeNotifyData(sortNotify));
    }, [listNotify]);
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
                <p className="header__opstion--title">Thông báo</p>
                {numberNotify > 0 && (
                    <div className="number__product">
                        <span className="number">{numberNotify}</span>
                    </div>
                )}
                {showListNotify && <Notify loading={loading} />}
            </div>
        </li>
    );
}

export default NotifyComponent;
