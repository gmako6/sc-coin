import Identicons from "react-identicons";
import { SiBinance } from "react-icons/si";
import { truncate } from "../store";
import Moment from "react-moment";

const ProjectDonators = ({ donators }) => {
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
            {donators.map((donator, i) => (
              <Donator key={i} donator={donator} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Donator = ({ donator }) => (
  <>
    <tr className="border-b border-gray-200">
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="flex justify-start items-center space-x-2">
          <Identicons
            string={donator?.owner}
            size={15}
            className="rounded-full shadow-md"
          />
          {donator.owner ? (
            <h5 className="text-gray-700">
              {truncate(donator?.owner, 4, 4, 11)}
            </h5>
          ) : null}
        </span>
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <span className="flex justify-start items-center space-x-2">
          <SiBinance className="text-orange" />
          <span className="text-gray-500">{donator?.contribution} BNB</span>
        </span>
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        {donator?.refunded ? "Yes" : "No"}
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <Moment fromNow>{donator?.timestamp}</Moment>
      </td>
    </tr>
  </>
);

export default ProjectDonators;
