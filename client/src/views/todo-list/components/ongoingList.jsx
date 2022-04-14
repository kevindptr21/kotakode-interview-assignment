import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import Card from "../../../components/Card";

const Ongoing = ({
  lists = [],
  actionAdd = () => {},
  actionRemove = () => {},
  actionComplete = () => {},
  actionDrag = () => {},
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(lists);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    actionDrag(items);
  };

  return (
    <Card className="grid gap-2">
      <div className="border-default border-l-0 border-r-0 border-t-0 border-gray-700 p-3 w-full flex flex-row justify-between items-center h-12">
        <span>Berlangsung</span>
        <div className="flex flex-row gap-5">
          <p className="flex items-center">
            {lists?.length} <i className="material-icons">assignment</i>
          </p>
          <i
            role="button"
            className="material-icons cursor-pointer"
            onClick={() => setShowAdd(!showAdd)}
          >
            add_box
          </i>
        </div>
      </div>

      <div className="px-2 py-2 flex flex-col gap-3">
        <div
          className={classNames(
            "flex flex-col border-default rounded-md px-2 py-2 bg-gray-500 gap-2",
            { hidden: !showAdd }
          )}
        >
          <label htmlFor="todoChild" className="text-white">
            Title
          </label>
          <input
            type="text"
            id="todoChild"
            name="todoChildTitle"
            value={inputValue}
            className="block bg-white w-full border border-slate-300 rounded-sm py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            onChange={({ target: { value } }) => setInputValue(value)}
          />
          <div className="flex flex-row justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => {
                actionAdd(inputValue);
                return setInputValue("");
              }}
            >
              Tambah
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => setShowAdd(!showAdd)}
            >
              Batal
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="to-dos">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {lists.map((i, index) => (
                  <Draggable
                    key={i.id}
                    draggableId={i.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        key={i.id}
                        className={classNames("py-1", {
                          selected: snapshot.isDragging,
                          "not-selected": !snapshot.isDragging,
                        })}
                      >
                        <Card className="shadow-none border-2 border-blue-400 rounded-md">
                          <div className="px-1 pt-2 pb-2 grid grid-cols-3">
                            <div className="col-span-2">{i.title}</div>
                            <div className="flex justify-end items-end gap-5">
                              <i
                                id={i.id}
                                role="button"
                                onClick={() => actionComplete(i.id)}
                                className="material-icons cursor-pointer text-green-500"
                              >
                                check_circle
                              </i>
                              <i
                                id={i.id}
                                role="button"
                                onClick={() => actionRemove(i.id)}
                                className="material-icons cursor-pointer text-red-600"
                              >
                                delete
                              </i>
                            </div>
                          </div>
                        </Card>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        {lists.length === 0 && <p>Yeay, semua telah selesai!</p>}
      </div>
    </Card>
  );
};

export default Ongoing;
