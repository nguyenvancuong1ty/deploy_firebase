import { ExclamationCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, setAuth, setNotifyData, setNumberNotify } from '~/redux';
import { Modal } from 'antd';
import { resetNumberNotify } from '~/Redux/numberNotifySlice';
import { resetNotifyData } from '~/Redux/notifyDataSlice';
function HandleLogout(props) {
    const { confirm } = Modal;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        confirm({
            zIndex: 9999,
            centered: true,
            icon: <ExclamationCircleFilled />,
            title: 'Đăng xuất',
            content: 'Bạn có muốn đăng xuất không?',
            cancelText: 'Hủy',
            onOk() {
                localStorage.clear();
                sessionStorage.clear();
                dispatch(reset());
                dispatch(resetNumberNotify());
                dispatch(setAuth({}));
                dispatch(resetNotifyData());
                props.setUid && props.setUid(null);
                dispatch(setNotifyData([]));
                toast.success('Đăng xuất thành công', {
                    position: 'bottom-left',
                    autoClose: 2000,
                    hideProgressBar: false,
                    progress: undefined,
                    theme: 'light',
                });
                navigate('/');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <div onClick={handleLogout} className={props.className}>
            {props.element}
        </div>
    );
}

export default HandleLogout;
