import React, { useEffect, useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '~/firebase';
import { db } from '~/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
function NotificationComponent() {
    const [token, setToken] = useState('');
    const isLogin = useSelector((state) => state.AuthReducer.Auth);
    const handlePushNotification = () => {
        console.log('Sẵn sàng nhận thông báo');
        onMessage(messaging, (payload) => {
            console.log(payload);
            toast.info('Bạn có 1 thông báo mới', {
                position: 'bottom-left',
                autoClose: 4000,
                hideProgressBar: false,
                progress: undefined,
                theme: 'light',
            });
        });
    };
    useEffect(() => {
        const registerNotification = async () => {
            try {
                const currentToken = await getToken(messaging, {
                    vapidKey: 'BMHxPXJyw10y2qfn3W7IljBQE7u1YW7ORLeAubHV3_lJUPiOQBGhndWSv4ZbSXHkIUIzAhyN1AaKmst_naCqNZ8',
                });
                setToken(currentToken);
                console.log('Chấp nhận nhận thông báo', currentToken);
                handlePushNotification();
                localStorage.getItem('account') !== 'admin' &&
                    (await axios({
                        method: 'post',
                        url: `${process.env.REACT_APP_API_URL}/registerNotify`,
                        data: {
                            token: currentToken,
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }));

                await axios({
                    method: 'put',
                    url: `${process.env.REACT_APP_API_URL}/account/${localStorage.getItem('uid')}`,
                    data: {
                        tokenNotify: currentToken,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            } catch (error) {
                console.log('Error:------------------', error);
            }
        };
        localStorage.getItem('uid') && registerNotification();
    }, [localStorage.getItem('uid')]);

    useEffect(() => {
        const ordersRef = collection(db, 'order');
        const queryRef = query(
            ordersRef,
            where('deleted', '==', false),
            where('user_order', '==', localStorage.getItem('uid')),
        );

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added' && change.doc.exists()) {
                } else if (change.type === 'removed') {
                } else if (change.type === 'modified') {
                    const newOrder = change.doc.data();
                    newOrder.id_user_shipper &&
                        newOrder.status === 'shipping' &&
                        axios({
                            method: 'post',
                            url: `${process.env.REACT_APP_API_URL}/order/notify`,
                            data: {
                                id: change.doc.id,
                                status: 'shipping',
                                token: token,
                                user_order_id: newOrder.user_order,
                            },
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
                    newOrder.status === 'pending' &&
                        axios({
                            method: 'post',
                            url: `${process.env.REACT_APP_API_URL}/order/notify`,
                            data: {
                                id: change.doc.id,
                                status: 'pending',
                                token: token,
                                user_order_id: newOrder.user_order,
                            },
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
                    newOrder.id_user_shipper &&
                        newOrder.status === 'shipped' &&
                        axios({
                            method: 'post',
                            url: `${process.env.REACT_APP_API_URL}/order/notify`,
                            data: {
                                id: change.doc.id,
                                status: 'shipped',
                                token: token,
                                user_order_id: newOrder.user_order,
                            },
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
                }
            });
        });

        return () => unsubscribe();
    }, [token]);
    return <></>;
}

export default NotificationComponent;
