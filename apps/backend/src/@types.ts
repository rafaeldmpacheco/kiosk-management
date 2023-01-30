export interface KioskType {
  id: String | undefined;
  serialKey: String| undefined;
  description: String| undefined;
  isKioskClosed: Boolean| undefined;
  storeOpensAt: Date| undefined;
  storeClosesAt: Date| undefined;
}