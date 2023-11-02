import { useEffect, useState } from 'react';
function TimeNotify({ time }) {
    const [timer, setTimer] = useState('');
    const formatTimeDifference = (timestamp) => {
        const currentTime = new Date();
        const targetTime = new Date(timestamp * 1000);

        const timeDifference = Math.floor((currentTime - targetTime) / 1000);

        if (timeDifference < 60) {
            return 'Vừa xong';
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} phút trước`;
        } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} giờ trước`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return `${days} ngày trước`;
        }
    };

    useEffect(() => {
        const updateTimer = () => {
            setTimer(formatTimeDifference(time.seconds));
            setTimeout(updateTimer, 60000); // Gọi lại hàm sau 1 giây
        };

        updateTimer(); // Bắt đầu đệ quy
    }, [time.seconds]);
    return <div>{timer}</div>;
}

export default TimeNotify;
