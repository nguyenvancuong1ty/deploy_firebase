import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';
function NotifyPage({ product, account, order, ordered }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);
    return (
        <div className="admin__wrap--content">
            <Container>
                {' '}
                {loading ? (
                    <LoadingAntd subClass="subLoading" foreignClass="foreignClass" />
                ) : (
                    <Row>
                        <Col>
                            <h3>Thông báo</h3>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default NotifyPage;
