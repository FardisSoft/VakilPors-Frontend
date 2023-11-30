

export const primeFaceDataTablePaginatorTemplate =
    "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport";

export const convertDateToJalali = (value, dateStyle, timeStyle) => {
    let date = new Date(value);
    let converted_date = new Date();
    if (date)
    if (dateStyle && timeStyle)
        converted_date = new Intl.DateTimeFormat("fa-IR", {
        dateStyle: dateStyle,
        timeStyle: timeStyle,
        })
        .format(date)
        .replace(",", "،");
    else converted_date = new Intl.DateTimeFormat("fa-IR").format(date);
    return converted_date;
};