import moment from "moment";

moment.locale("pt-br");

export const isStoreOpen = (storeOpensAt: Date, storeClosesAt: Date): boolean => {
  try {
    let currentDate = moment();
    let opensAt = moment(storeOpensAt);
    let closesAt = moment(storeClosesAt);

    return currentDate.isBetween(opensAt, closesAt, "minutes", "[]");
  } catch (err) {
    console.error("isStoreOpen error: ", err);
    return false;
  }
};