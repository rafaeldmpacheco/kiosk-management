import { KioskType } from "../@types";

const mongoose = require("mongoose");
const { KioskType } = require("../@types");

const NAME = "Kiosk";
const FIELDS = "id serialKey description isKioskClosed storeOpensAt storeClosesAt";

const KioskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  serialKey: { type: String, required: true },
  description: { type: String },
  isKioskClosed: { type: Boolean, default: false },
  storeOpensAt: { type: Date },
  storeClosesAt: { type: Date },
});

const KioskModel = mongoose.model(NAME, KioskSchema);

async function findAllKiosks() {
  return KioskModel.find({}, FIELDS)
    .then((kiosks: KioskType[]) => {
      return kiosks.map((kiosk) => {
        return {
          id: kiosk.id,
          serialKey: kiosk.serialKey,
          description: kiosk.description,
          isKioskClosed: kiosk.isKioskClosed,
          storeOpensAt: kiosk.storeOpensAt,
          storeClosesAt: kiosk.storeClosesAt,
        };
      });
    });
};

async function findKioskById(id: string) {
  return KioskModel.findOne({ id }, FIELDS);
};

async function updateKiosk(id: any, kiosk: KioskType) {
  return KioskModel.updateOne(id, kiosk);
};

async function deleteKiosk(id: string) {
  return KioskModel.deleteOne({ id });
};

export = {
  model: KioskModel,
  findAllKiosks,
  findKioskById,
  updateKiosk,
  deleteKiosk
};