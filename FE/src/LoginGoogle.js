import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from './firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrent, setAuth } from './redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginGoogle = ({ setShow, setUid }) => {
    const dispatch = useDispatch();
    const number = useSelector((state) => state.numberReducer.number);
    const navigate = useNavigate();
    const handleLoginWithGoogle = async () => {
        try {
            // Đăng nhập thành công
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const ok = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/account/login-google`,
                data: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                },
                withCredentials: true,
            });
            setUid(user.uid);
            localStorage.setItem('token', ok.data.metadata.accessToken);
            localStorage.setItem('address', ok.data.metadata.data.address);
            localStorage.setItem('uid', user.uid);
            localStorage.setItem('account', ok.data.metadata.data.type_account);
            dispatch(setCurrent(number));
            dispatch(setAuth({ ...ok.data.metadata.data }));
            setShow(false);
            console.log(ok.data.metadata.data.type_account);
            ok.data.metadata.data.type_account === 'admin' && navigate('/admin/');
        } catch (error) {
            toast.error({});
        }
    };

    return (
        <div style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon
                icon={faGooglePlusG}
                style={{ color: '#38bc6b' }}
                size="2xl"
                onClick={handleLoginWithGoogle}
            />
        </div>
    );
};

export default LoginGoogle;
