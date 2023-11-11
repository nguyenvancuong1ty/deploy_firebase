import { Descriptions, Input } from 'antd';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function Info() {
    const info = useSelector((state) => state.AuthReducer.Auth);
    const dispatch = useDispatch();
    // const handleChangeInfo = (value) => {
    //     dispatch();
    // };
    const items = [
        {
            key: '1',
            label: 'Tên',
            children: (
                <Input
                    value={info.fullName}
                    style={{
                        width: '50%',
                    }}
                />
            ),
        },
        {
            key: '2',
            label: 'Tuổi',
            children: (
                <Input
                    value={info.age}
                    type="number"
                    style={{
                        width: '50%',
                    }}
                />
            ),
        },
        {
            key: '3',
            label: 'Địa chỉ',
            children: (
                <Input
                    value={info.address || ''}
                    style={{
                        width: '50%',
                    }}
                />
            ),
        },
        {
            key: '4',
            label: 'Số điện thoại',
            children: (
                <Input
                    value={info.phoneNumber || ''}
                    style={{
                        width: '50%',
                    }}
                />
            ),
        },
        {
            key: '5',
            label: 'Email',
            children: (
                <Input
                    value={info.email || ''}
                    style={{
                        width: '50%',
                    }}
                />
            ),
        },
    ];
    return (
        <Container>
            <Descriptions
                title="Thông tin tài khoản"
                layout="vertical"
                items={items}
                style={{ background: '#ccc', padding: 12 }}
            />
        </Container>
    );
}

export default Info;
