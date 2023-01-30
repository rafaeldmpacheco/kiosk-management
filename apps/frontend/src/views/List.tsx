import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentHomeViewState } from "../atoms/currentHomeViewAtom";
import { currentKioskState } from "../atoms/currentKioskAtom";
import { kioskListState } from "../atoms/kioskListAtom";
import Table from "../components/Table";
import { deleteKiosk, getKiosks } from "../services/KioskService";

function List() {
  const [kiosks, setKiosks] = useRecoilState(kioskListState);
  const [, setCurrentKiosk] = useRecoilState(currentKioskState);
  const [, setView] = useRecoilState(currentHomeViewState);
  const [, setCurrentId] = useRecoilState(currentKioskState);

  const handleCreate = () => {
    setView("crud");
  };

  const handleEdit = (id: string) => {
    setCurrentKiosk(id);
    setView("crud");
  };

  const handleDelete = async (id: string) => {
    const { data } = await deleteKiosk(id);

    if (data.message.includes("Deleted Kiosk")) {
      setKiosks(kiosks.filter((kiosk) => kiosk.id !== id));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getKiosks();
      setKiosks(data);
    };

    fetchData();
    setCurrentId("");
  }, []);

  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  bg-white"
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className={"font-semibold text-lg  text-blueGray-700"}>
              Kiosks List
            </h3>
          </div>

          <div className="flex justify-end mt-4 mb-4">
            <button
              onClick={handleCreate}
              className="text-sm leading-none text-white py-3 px-5 bg-green-600 rounded hover:bg-green-500 focus:outline-none"
            >
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="block w-full overflow-x-auto">
        <Table items={kiosks} edit={handleEdit} remove={handleDelete} />
      </div>
    </div>
  );
}
export default List;
