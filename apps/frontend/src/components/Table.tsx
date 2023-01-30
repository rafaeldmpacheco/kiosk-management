import moment from "moment";
import { TdProps, ThProps, TableProps } from "../@types";

const TD: React.FC<TdProps> = ({ children }) => {
  return (
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {children}
    </td>
  );
};

const TH: React.FC<ThProps> = ({ children }) => {
  return (
    <th
      scope="col"
      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
    >
      {children}
    </th>
  );
};

const Table: React.FC<TableProps> = ({ items, edit, remove }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <TH>ID</TH>
                  <TH>Serial Key</TH>
                  <TH>Description</TH>
                  <TH>Open At</TH>
                  <TH>Closes At</TH>
                  <TH>Closed</TH>
                  <TH>Actions</TH>
                </tr>
              </thead>

              <tbody>
                {items.length > 0 ? (
                  items.map((kiosk, index) => (
                    <tr className="border-b" key={index}>
                      <TD>{kiosk.id}</TD>
                      <TD>{kiosk.serialKey}</TD>
                      <TD>{kiosk.description}</TD>
                      <TD>{moment(kiosk.storeOpensAt).format("LT")}</TD>
                      <TD>{moment(kiosk.storeClosesAt).format("LT")}</TD>
                      <TD>{kiosk.isKioskClosed ? "Yes" : "No"}</TD>
                      <TD>
                        <div className="flex justify-between">
                          <button
                            onClick={() => {
                              edit(kiosk.id);
                            }}
                            className="text-sm leading-none text-white py-3 px-5 bg-blue-600 rounded hover:bg-blue-500 focus:outline-none"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              remove(kiosk.id);
                            }}
                            className="text-sm leading-none text-white py-3 px-5 bg-red-600 rounded hover:bg-red-500 focus:outline-none"
                          >
                            Delete
                          </button>
                        </div>
                      </TD>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b">
                    <td className="text-center" colSpan={8}>
                      No items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
