import { Button } from 'antd';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div>
                <h1>404 PAGE NOT FOUND</h1>
                <Button width={'100%'}>
                    <Link width={'100%'} to={'/'}>
                        {' '}
                        Back to Home
                    </Link>
                </Button>
            </div>
        </section>
    );
}

export default NotFoundPage;
