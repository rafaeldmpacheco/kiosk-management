import cron from "node-cron";
import { KioskType } from "../@types";
import KioskModel from "../models/KioskModel";
import KioskCache from "../utils/Cache";
import { isStoreOpen } from "../utils/Store";

const everyMinuteEvent = cron.schedule("*/1 * * * *", async () => {
  const kiosks = await KioskCache.getInstance().get();
  await processAvailabilities(kiosks);
});

const processAvailabilities = async (kiosks: KioskType[]): Promise<void> => {
  try {
    for (const kiosk of kiosks) {
      if (!kiosk.storeOpensAt || !kiosk.storeClosesAt) continue;
      const isOpen = isStoreOpen(kiosk.storeOpensAt, kiosk.storeClosesAt);

      kiosk.isKioskClosed = !isOpen;
      const filter = { id: kiosk.id };
      await KioskModel.updateKiosk(filter, kiosk);
      KioskCache.getInstance().update(kiosk);
    }
  } catch (err) {
    console.log(err);
  }
};

export const initEvents = () => {
  everyMinuteEvent.start();
};