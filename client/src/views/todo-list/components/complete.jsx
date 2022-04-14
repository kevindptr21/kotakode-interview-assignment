import React from "react";
import Card from "../../../components/Card";

const Complete = ({ lists = [] }) => {
  return (
    <Card className="grid gap-2">
      <div className="border-default border-l-0 border-r-0 border-t-0 border-gray-700 p-3 w-full flex flex-row justify-between items-center h-12">
        <span>Selesai</span>
        <p className="flex items-center">
          {lists?.length} <i className="material-icons">assignment_turned_in</i>
        </p>
      </div>

      <div className="px-2 py-2 flex flex-col gap-3">
        {!!lists &&
          lists.map((i, idx) => (
            <Card
              className="shadow-none border-2 border-green-600 rounded-md bg-green-600 text-white"
              key={idx}
            >
              <div className="px-1 pt-2 pb-2">{i?.title}</div>
            </Card>
          ))}

        {lists.length === 0 && ""}
      </div>
    </Card>
  );
};

export default Complete;
