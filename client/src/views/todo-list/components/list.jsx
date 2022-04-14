import React, { useState } from "react";
import classNames from "classnames";

const List = ({
  lists = [],
  selected = "",
  actionAdd = () => {},
  actionSelected = () => {},
  actionRemove = () => {},
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col text-white font-semibold">
      <div className="p-2">
        <h4 className="text-2xl">My Todo List</h4>
      </div>

      <div className="p-2">
        <ul className="list-disc list-inside">
          {!!lists &&
            lists.map((i, idx) => (
              <li
                key={idx}
                id={i.id}
                onClick={() => actionSelected(i.id)}
                className={classNames(
                  "pl-2 pr-2 pt-1 pb-1 rounded-md cursor-pointer flex flex-row justify-between",
                  {
                    "bg-white": selected === i.id,
                    "text-gray-800": selected === i.id,
                    "text-white": selected !== i.id,
                  }
                )}
              >
                <span
                  id={i.id}
                  role="button"
                  onClick={() => actionSelected(i.id)}
                >
                  {i.title}
                </span>
                <i
                  role="button"
                  tabIndex={1}
                  className="material-icons text-red-600"
                  onClick={() => actionRemove(i.id)}
                >
                  delete
                </i>
              </li>
            ))}
        </ul>
      </div>

      <div className="p-2 text-gray-700">
        <div className="flex flex-row gap-5">
          <input
            type="text"
            id="todoParent"
            name="todoParentTitle"
            value={inputValue}
            className="text-white w-full px-3 py-2 bg-transparent border-b-2 ring-0 shadow-sm placeholder-gray-800 outline-none focus:outline-none focus:ring-0 block sm:text-sm"
            placeholder="Tambahkan list"
            onChange={({ target: { value } }) => setInputValue(value)}
          />
          <button
            onClick={() => {
              actionAdd(inputValue);
              return setInputValue("");
            }}
          >
            <i className="material-icons text-white hover:text-gray-400">
              send
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
