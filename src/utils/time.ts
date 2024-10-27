export const getTime = () => {
    let message = '';
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 12) {
        message = '上午好';
    } else if (hours >= 12 && hours < 18) {
        message = '下午好';
    } else if (hours >= 18 && hours < 24) {
        message = '晚上好';
    }
    return message;
}