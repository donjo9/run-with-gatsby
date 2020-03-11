export const formatDateTImeString= (time) => {
    const tid = new Date(parseInt(time));
    const tidsString =
        (tid
            .getUTCHours()+1)
            .toString()
            .padStart(2, 0) +
        ":" +
        tid
            .getMinutes()
            .toString()
            .padStart(2, 0) +
        " - " +
        tid
            .getDate()
            .toString()
            .padStart(2, 0) +
        "-" +
        Number(tid
            .getMonth()+1)
            .toString()
            .padStart(2, 0) +
        "-" +
        tid.getFullYear();
    return tidsString;
}