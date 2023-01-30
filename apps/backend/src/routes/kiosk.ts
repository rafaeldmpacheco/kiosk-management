import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { getKiosk } from "../middleware/kiosk";
import KioskModel from "../models/KioskModel";
import KioskCache from "../utils/Cache";

const kioskRoutes = Router();

kioskRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const kiosks = await KioskModel.findAllKiosks();
    res.json(kiosks);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

kioskRoutes.get("/:id", getKiosk, (req: Request, res: Response) => {
  if (!res.locals.kiosk) {
    return res.status(404).json({ message: "Kiosk not found" });
  }
  res.json(res.locals);
});

kioskRoutes.delete("/:id", getKiosk, async (req, res) => {
  if (!res.locals.kiosk) {
    return res.status(404).json({ message: "Kiosk not found" });
  }
  try {
    const { id } = res.locals.kiosk;
    await KioskModel.deleteKiosk(id);
    KioskCache.getInstance().delete(id);
    res.json({ message: `Deleted Kiosk ${res.locals.kiosk.id}` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

kioskRoutes.post("/", getKiosk, async (req: Request, res: Response) => {
  const {
    serialKey,
    description,
    isKioskClosed,
    storeOpensAt,
    storeClosesAt,
  } = req.body;
  const kiosk = res.locals.kiosk;

  if (kiosk) {
    res.status(400).json({ message: "Cannot perform update like this" });
    return;
  }

  const newKiosk = {
    id: uuidv4(),
    serialKey,
    description,
    isKioskClosed,
    storeOpensAt,
    storeClosesAt,
  };

  try {
    await new KioskModel.model(newKiosk).save();
    KioskCache.getInstance().add(newKiosk);
    res.status(201).json(newKiosk);
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : "" });
  }
});

kioskRoutes.patch("/:id", getKiosk, async (req, res) => {
  if (!res.locals.kiosk) {
    return res.status(404).send({ message: "Kiosk not found" });
  }

  const kiosk = res.locals.kiosk;
  const { serialKey, description, isKioskClosed, storeOpensAt, storeClosesAt } = req.body;
  const updatedKiosk = { ...kiosk, serialKey, description, isKioskClosed, storeOpensAt, storeClosesAt };
  const filter = { id: kiosk.id };

  try {
    await KioskModel.updateKiosk(filter, updatedKiosk);
    KioskCache.getInstance().update(updatedKiosk);
    res.status(200).json(updatedKiosk);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export { kioskRoutes };
