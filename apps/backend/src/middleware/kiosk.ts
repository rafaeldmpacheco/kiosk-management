import { RequestHandler } from "express";
import { KioskType } from "../@types";
import KioskModel from "../models/KioskModel";

export const getKiosk: RequestHandler = async (req, res, next) => {
  try {
    const id = !req.body.id ? req.params.id : req.body.id;
    const item = await KioskModel.findKioskById(id)
    if (item) {
      const kiosk: KioskType = {
        id: item.id,
        serialKey: item.serialKey,
        description: item.description,
        isKioskClosed: item.isKioskClosed,
        storeOpensAt: item.storeOpensAt,
        storeClosesAt: item.storeClosesAt,
      };
      res.locals.kiosk = kiosk;
    } else {
      res.locals.kiosk = undefined;
    }
    next();
  } catch (err: unknown) {
    res.status(500).json({ message: err instanceof Error ? err.message : "" });
  }
};