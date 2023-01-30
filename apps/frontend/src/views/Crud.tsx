import { useRecoilState } from "recoil";
import { KioskType } from "../@types";
import { currentHomeViewState } from "../atoms/currentHomeViewAtom";
import Form from "../components/Form";
import { createKiosk, updateKiosk } from "../services/KioskService";

function Crud() {
  const [, setView] = useRecoilState(currentHomeViewState);

  const handleBack = () => {
    setView("list");
  };

  const handleSubmit = async (kiosk: KioskType, isEditing: boolean) => {
    const result = isEditing
      ? await updateKiosk(kiosk)
      : await createKiosk(kiosk);

    if (result) {
      setView("list");
    }
  };

  return (
    <>
      <div className="flex justify-end mt-4 mb-4">
        <button
          onClick={handleBack}
          className="text-sm leading-none text-white py-3 px-5 bg-gray-600 rounded hover:bg-gray-500 focus:outline-none"
        >
          Back
        </button>
      </div>
      <div className="flex justify-end mt-4 mb-4">
        <Form callback={handleSubmit} />
      </div>
    </>
  );
}
export default Crud;
