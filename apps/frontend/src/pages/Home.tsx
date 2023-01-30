import { useRecoilState } from "recoil";
import { currentHomeViewState } from "../atoms/currentHomeViewAtom";

import List from "../views/List";
import Crud from "../views/Crud";

const Home = () => {
  const [view] = useRecoilState(currentHomeViewState);  
  return (
    <>
      <div className="bg-gray-200 h-screen">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap">
            <div className="w-full mb-4 px-4">
              {view === "list" && <List />}
              {view === "crud" && <Crud />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
