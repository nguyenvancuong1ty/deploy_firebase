const addLeadingZero = (value) => {
    if (value < 10) {
        return '0' + value;
    }
    return value.toString();
};
export const getDateFormat = (time) => {
    const year = time.getFullYear();
    const month = addLeadingZero(time.getMonth() + 1); // Tháng bắt đầu từ 0, cộng thêm 1 và thêm số 0 nếu cần.
    const day = addLeadingZero(time.getDate());
    const hour = addLeadingZero(time.getHours());
    const minute = addLeadingZero(time.getMinutes());
    const second = addLeadingZero(time.getSeconds());
    return `${day}/${month}/${year}  ${hour}:${minute}:${second}`;
};
