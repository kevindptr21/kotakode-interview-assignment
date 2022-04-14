import {
  ADD_CHILD_TODO,
  ADD_PARENT_TODO,
  CHANGE_SELECTED_TODO,
  COMPLETE_TODO,
  DRAG_TODO,
  REMOVE_CHILD_TODO,
  REMOVE_PARENT_TODO,
} from "../todo.types";

const initialState = {
  todos: [
    {
      id: "pekerjaan-rumah",
      title: "Pekerjaan Rumah",
      child: [
        {
          id: "cuci-baju",
          title: "Cuci Baju",
          complete: false,
        },
        {
          id: "masak-nasi",
          title: "Masak Nasi",
          complete: false,
        },
      ],
    },
  ],
  isSelected: "pekerjaan-rumah",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARENT_TODO:
      const addNewParent = {
        id: action.payload.toLowerCase().replace(" ", "-"),
        title: action.payload,
        child: [],
      };

      if (state.todos.length === 0) {
        state.isSelected = action.payload.toLowerCase().replace(" ", "-");
      }

      return {
        ...state,
        todos: [...state.todos, addNewParent],
      };

    case ADD_CHILD_TODO:
      const addNewChild = {
        id: action.payload.toLowerCase().replace(" ", "-"),
        title: action.payload,
        complete: false,
      };

      const parentIndex = state.todos.findIndex(
        (i) => i.id === state.isSelected
      );
      state.todos[parentIndex].child.push(addNewChild);

      return {
        ...state,
        todos: [...state.todos],
      };

    case COMPLETE_TODO:
      const completeChildId = state.todos
        .find((i) => i.id === state.isSelected)
        .child.find((j) => j.id === action.payload);

      completeChildId.complete = true;

      return {
        ...state,
        todos: [...state.todos],
      };

    case REMOVE_PARENT_TODO:
      const parentIdx = state.todos.findIndex((i) => i.id === action.payload);
      state.todos.splice(parentIdx, 1);

      return {
        ...state,
        todos: [...state.todos],
      };
    case REMOVE_CHILD_TODO:
      state.todos.find((i) => {
        if (i.id === state.isSelected) {
          const index = i.child.findIndex((j) => j.id === action.payload);
          return i.child.splice(index, 1);
        }
        return true;
      });

      return {
        ...state,
        todos: [...state.todos],
      };
    case CHANGE_SELECTED_TODO:
      return {
        ...state,
        isSelected: action.payload,
      };
    case DRAG_TODO:
      const pId = state.todos.findIndex((i) => i.id === state.isSelected);
      state.todos[pId].child = action.payload;
      return {
        ...state,
        todos: [...state.todos],
      };
    default:
      return state;
  }
};

export default reducer;
