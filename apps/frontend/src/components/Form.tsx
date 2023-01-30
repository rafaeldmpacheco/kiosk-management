import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { FormProps, KioskType } from "../@types";
import { currentKioskState } from "../atoms/currentKioskAtom";
import { kioskListState } from "../atoms/kioskListAtom";
import TimePicker from "./TimePicker";


const Form: React.FC<FormProps> = ({ callback }) => {
  const [currentId] = useRecoilState(currentKioskState);
  const [kiosks] = useRecoilState(kioskListState);

  const [id, setId] = useState<String>("");
  const [serialKey, setSerialKey] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [isKioskClosed, setIsKioskClosed] = useState<Boolean>(false);
  const [storeOpensAt, setStoreOpensAt] = useState<Date>(new Date());
  const [storeClosesAt, setStoreClosesAt] = useState<Date>(new Date());
  const [isEditing, setEditing] = useState<boolean>();

  useEffect(() => {
    const editing = currentId.trim() !== "";
    setEditing(editing);

    if (editing) {
      const kiosk = kiosks.find((item) => item.id === currentId);

      if (!kiosk) {
        return;
      }

      setId(kiosk.id);
      setSerialKey(kiosk.serialKey);
      setDescription(kiosk.description);
      setIsKioskClosed(true);
      setStoreOpensAt(kiosk.storeOpensAt);
      setStoreClosesAt(kiosk.storeClosesAt);
    }
  }, []);

  const renderStoreOpensAt = useMemo(() => {
    return (
      <TimePicker
        defaultValue={isEditing && storeOpensAt ? storeOpensAt : new Date()}
        label="Opens at"
        callback={(date: Date) => {
          setStoreOpensAt(date);
        }}
      />
    );
  }, [isEditing]);

  const renderStoreClosesAt = useMemo(() => {
    return (
      <TimePicker
        defaultValue={isEditing && storeClosesAt ? storeClosesAt : new Date()}
        label="Closes at"
        callback={(date: Date) => {
          setStoreClosesAt(date);
        }}
      />
    );
  }, [isEditing]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              {isEditing ? `Kiosk [${id}]` : "New Kiosk"}
            </h6>

            <button
              onClick={() => {
                const kiosk: KioskType = {
                  id,
                  serialKey,
                  description,
                  isKioskClosed,
                  storeOpensAt,
                  storeClosesAt,
                };
                const edit = isEditing?.valueOf() ? true : false;
                callback(kiosk, edit);
              }}
              className="text-sm leading-none text-white py-3 px-5 bg-green-600 rounded hover:bg-green-500 focus:outline-none"
              type="button"
            >
              Save
            </button>
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex mt-3">
              <div className="lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Serial Key
                  </label>

                  <input
                    onChange={({ target: { value } }) => {
                      setSerialKey(value);
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600
                    bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={serialKey.toString()}
                  />
                </div>
              </div>

              {renderStoreOpensAt}

              {renderStoreClosesAt}
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Description
                  </label>

                  <textarea
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white 
                    rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={({ target: { value } }) => {
                      setDescription(value);
                    }}
                    value={description.toString()}
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
