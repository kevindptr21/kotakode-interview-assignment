import {
  ADD_CHILD_TODO,
  ADD_PARENT_TODO,
  CHANGE_SELECTED_TODO,
  COMPLETE_TODO,
  DRAG_TODO,
  REMOVE_CHILD_TODO,
  REMOVE_PARENT_TODO,
} from "../todo.types";

export const addParentTodo = (title = "") => {
  return {
    type: ADD_PARENT_TODO,
    payload: title,
  };
};

export const addChildTodo = (title = "") => {
  return {
    type: ADD_CHILD_TODO,
    payload: title,
  };
};

export const completeTodo = (id = "") => {
  return {
    type: COMPLETE_TODO,
    payload: id,
  };
};

export const changeSelectedTodo = (id = "") => {
  return {
    type: CHANGE_SELECTED_TODO,
    payload: id,
  };
};

export const removeParentTodo = (id = "") => {
  return {
    type: REMOVE_PARENT_TODO,
    payload: id,
  };
};

export const removeChildTodo = (id = "") => {
  return {
    type: REMOVE_CHILD_TODO,
    payload: id,
  };
};

export const dragTodo = (arr = []) => {
  return {
    type: DRAG_TODO,
    payload: arr,
  };
};
