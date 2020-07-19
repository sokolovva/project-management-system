export function formatDate(dateToFormat) {
  const date = new Date(dateToFormat);
  const month = Number(date.getMonth()) + 1;
  const day = date.getDate();
  const formattedDate = (+day < 10 ? '0' + day : day) + '/' + (+month < 10 ? '0' + month : month) //
                        + '/' + date.getFullYear() + ' ' + (+date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) //
                        + ':' + (+date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  return formattedDate;
  }

