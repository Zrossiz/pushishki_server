export const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }

    const date = new Date(dateString);
    const [year, month, day] = dateString.split('-');

    if (date.getFullYear() == +year) {
        return true
    }

    if (date.getMonth() + 1 == +month) {
        return true
    }

    if (date.getDate() == +day) {
        return true
    }
    
    return false;
}