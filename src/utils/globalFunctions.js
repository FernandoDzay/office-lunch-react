export const getDateString = (date) => {
    if(!(date instanceof Date)) return ''; 

    const year = date.getFullYear();
    const month = parseInt(date.getMonth()) < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
    const day = parseInt(date.getDate()) < 10 ? `0${date.getDate()}` : date.getDate();

    return `${year}-${month}-${day}`;
}