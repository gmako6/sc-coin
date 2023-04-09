import Identicons from "react-identicons";
import { SiBinance } from "react-icons/si";

const ProjectDonators = () => {
  return (
    <div className="py-10 flex-col justify-center items-start ">
      <div className="max-h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounded-md w-full">
        <table className="min-w-full">
          <thead className="border-b bg-gradient-to-r from-pink-500 to-fuchsia-400 ">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Donators
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Donations
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Refund
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(16)
              .fill()
              .map((funding, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    <span className="flex justify-start items-center space-x-2">
                      <Identicons
                        string={"0x9e....487f" + i}
                        size={15}
                        className="rounded-full shadow-md"
                      />
                      <h5 className="text-gray-700">0x9e....487f{i}</h5>
                    </span>
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    <span className="flex justify-start items-center space-x-2">
                      <SiBinance className="text-orange" />
                      <span className="text-gray-500">{3} BNB</span>
                    </span>
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    {false ? "Yes" : "No"}
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    {new Date().getTime()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectDonators;
