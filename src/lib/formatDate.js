export const formatDateYMD = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let formattedDate =
    year.toString().padStart(2, "0") +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0");

  return formattedDate;
};

export const formatDateDMY = (ymdFormat) => {
  return ymdFormat.split("-").reverse().join("-");
};
