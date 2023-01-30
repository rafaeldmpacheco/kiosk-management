import { KioskType } from "../@types";
import KioskModel from "../models/KioskModel";

export const populateCache = async () => {
   await KioskCache.getInstance().populate()
};

class KioskCache {
   private static instance: KioskCache;
   private cache: KioskType[] = [];

   private constructor() { }

   static getInstance() {
      if (!KioskCache.instance) {
         KioskCache.instance = new KioskCache();
      }
      return KioskCache.instance;
   }

   get() {
      return this.cache;
   }

   add(item: KioskType) {
      this.cache.push(item);
   }

   update(newItem: KioskType) {
      try {
         const newList = this.cache.map((current) => {
            if (current.id === newItem.id) {
               return newItem;
            } else {
               return current;
            }
         });
         if (newList) this.cache = newList as KioskType[];
      } catch (error) {
         console.log("cache update error", error);
      }
   }

   delete(id: string) {
      this.cache = this.cache.filter((current) => {
         if (current.id !== id) return current;
      });
      return this.cache;
   }

   log() {
      console.log(`Kiosks Cache Length ${this.cache.length} => `, this.cache);
   }

   async populate() {
      this.cache = await KioskModel.findAllKiosks();
   }
}

export default KioskCache;