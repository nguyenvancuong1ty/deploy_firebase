import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingAntd from '~/Loading/Loading.antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
function DashboardPage({ product, account, order, ordered }) {
    const [loading, setLoading] = useState(false);
    const [allOrder, setAllOrder] = useState([]);
    const [startDate, setStartDate] = useState(new Date('2015/01/01'));
    const [endDate, setEndDate] = useState(new Date('2024/01/01'));
    const [chartData, setChartData] = useState([]);
    const formatVnd = (money) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
    };
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_URL}/order/all?type=shipped`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setAllOrder(res.data.metadata);
            } catch {}
            setLoading(false);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const filteredData = allOrder.filter((item) => {
            const orderDate = new Date(item.shipped_date._seconds * 1000);
            return (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);
        });
        const newChartData = [];

        if (startDate && endDate) {
            const totalAmountSum = filteredData.reduce(
                (sum, item) => sum + (item.total_amount - item.shipping_cost),
                0,
            );
            // Thêm cột cho từng sản phẩm
            filteredData.forEach((item) => {
                newChartData.push({ name: item.detail.name, Doanhthu: item.total_amount - item.shipping_cost });
            });
            // Thêm cột "total" cho tất cả sản phẩm

            newChartData.push({
                name: 'Tổng thu',
                Doanhthu: totalAmountSum,
            });
        }
        const sortCharData = newChartData.sort((prev, next) => {
            return prev.Doanhthu - next.Doanhthu;
        });
        setChartData(sortCharData);
    }, [startDate, endDate, allOrder]);
    const onChange = (value, dateString) => {
        setStartDate(new Date(value[0].$d));
        setEndDate(new Date(value[1].$d));
    };
    const onOk = (value) => {
        console.log('onOk: ', value);
    };
    return (
        <div className="admin__wrap--content">
            <Container>
                {loading ? (
                    <LoadingAntd subClass="subLoading" foreignClass="foreignClass" />
                ) : (
                    <>
                        <Row>
                            <Col>
                                <div className="role__item product">
                                    <h5>{product && product.length > 0 ? product.length : 0}</h5>
                                    <h5>Sản phẩm</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className="role__item user">
                                    <h5>{account && account.length > 0 ? account.length : 0}</h5>
                                    <h5>Người dùng</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className="role__item order">
                                    <h5>{order && order.length > 0 ? order.length : 0}</h5>
                                    <h5>Đơn hàng đã giao</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className="role__item ordered">
                                    <h5>{ordered && ordered.length > 0 ? ordered.length : 0}</h5>
                                    <h5>Đơn hàng đang sử lý</h5>
                                </div>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col xs={2}></Col>
                            <Col xs={7}>
                                <div>
                                    <span>&emsp; &emsp; &emsp;Khoảng thời gian</span> &emsp;
                                    <RangePicker
                                        format="YYYY-MM-DD"
                                        onChange={onChange}
                                        onOk={onOk}
                                        defaultValue={[
                                            dayjs('2015/01/01', 'YYYY-MM-DD'),
                                            dayjs('2024/01/01', 'YYYY-MM-DD'),
                                        ]}
                                        style={{ margin: '16px 0 0 ' }}
                                    />
                                </div>

                                <BarChart
                                    width={700}
                                    height={600}
                                    data={chartData}
                                    margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
                                >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Doanhthu" fill="#f9b115" barSize={50} />
                                </BarChart>
                            </Col>
                            <Col></Col>
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );
}

export default DashboardPage;
