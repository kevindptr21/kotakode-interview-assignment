import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addChildTodo,
  addParentTodo,
  changeSelectedTodo,
  completeTodo,
  dragTodo,
  removeChildTodo,
  removeParentTodo,
} from "../../redux/todo/action/todo.action";
import List from "./components/list";
import OngoingList from "./components/ongoingList";
import CompleteList from "./components/complete";

const TodoList = ({
  todos,
  addParent,
  addChild,
  complete,
  removeChild,
  removeParent,
  changeSelected,
  currentSelected,
  dragTodo,
}) => {
  const [todo, setTodo] = useState([]);
  const [childrenList, setChildrenList] = useState({
    ongoing: [],
    complete: [],
  });

  useEffect(() => {
    let mounted = true;

    const filterChild = () => {
      const list = todos.filter((i) => i.id === currentSelected);
      const ongoingList = list[0]?.child.filter((i) => i.complete === false);
      const CompleteList = list[0]?.child.filter((i) => i.complete === true);

      return setChildrenList({
        ongoing: ongoingList,
        complete: CompleteList,
      });
    };

    if (mounted) {
      setTodo(todos);
      filterChild();
    }

    return () => {
      mounted = false;
    };
  }, [todos, currentSelected]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-3">
      <h1 className="text-3xl text-white">Code Challenge | KotaKode</h1>
      <div className="grid grid-cols-3 gap-10 w-full">
        <div>
          <List
            lists={todo}
            selected={currentSelected}
            actionAdd={addParent}
            actionSelected={changeSelected}
            actionRemove={removeParent}
          />
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-10">
            <OngoingList
              lists={childrenList?.ongoing}
              actionAdd={addChild}
              actionRemove={removeChild}
              actionComplete={complete}
              actionDrag={dragTodo}
            />
            <CompleteList lists={childrenList?.complete} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos,
    currentSelected: state.todo.isSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addParent: (string) => dispatch(addParentTodo(string)),
    addChild: (string) => dispatch(addChildTodo(string)),
    changeSelected: (string) => dispatch(changeSelectedTodo(string)),
    complete: (string) => dispatch(completeTodo(string)),
    removeChild: (string) => dispatch(removeChildTodo(string)),
    removeParent: (string) => dispatch(removeParentTodo(string)),
    dragTodo: (arr = []) => dispatch(dragTodo(arr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
