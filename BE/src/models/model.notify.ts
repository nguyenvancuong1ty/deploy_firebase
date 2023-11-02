interface Notify {
    deleted: boolean;
    description: string;
    icon: string;
    isAll: boolean;
    isRead: Array<string>;
    link: string;
    time: object;
    title: string;
    user_id: string;
}

export default Notify;
