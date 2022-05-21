import moment from 'moment';

export const getMondayDate = (date) => {
    const currentMonday = moment().startOf('isoweek').format();
    if(date === undefined) return currentMonday;

    const monday = moment = (date);
    if(!monday.isValid()) return currentMonday;
    return monday.startOf('isoweek').format();
}

export const getSundayLastTime = (date = undefined) => {
    if(date === undefined) return moment().endOf('week').format();
    return moment(date).endOf('week').format(); 
}

export const getLastWeekMonday = () => {
    return moment().startOf('week').subtract(6, 'day').format();
}

export const getDayOfWeek = (date) => {
    const daysOfWeek = [undefined, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const weekDayNumber = moment(date).format('E');
    return daysOfWeek[weekDayNumber];
}

export const getTodaysInitialTime = () => {
    return moment().startOf('day').format();
}

export const getTodaysEndTime = () => {
    return moment().endOf('day').format();
}