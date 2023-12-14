import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Descriptions } from 'antd';
import { getDateFormat } from '~/until/function';

function Info({ account }) {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        const me = account.find((item) => {
            return (item.Id === localStorage.getItem('uid'));
        });
        if (!me || me.length <= 0) {
            return;
        }
        const date = me.timeCreate;
        me.timeCreate = getDateFormat(new Date(date));
        const data = Object.entries(me).map(([key, value], index) => {
            console.log(key, value);
            return { key: index, label: key, children: value };
        });
        setInfo(data);
    }, [account]);
    console.log(info);
    return (
        <Container>
            <Descriptions title="Thông tin tài khoản" layout="vertical" items={info} />
        </Container>
    );
}

export default Info;
