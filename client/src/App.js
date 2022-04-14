import React from "react";
import "./assets/styles/css/tailwind.css";
import TodoList from "./views/todo-list";

function App() {
  return (
    <div className="w-screen h-screen bg-blue-400">
      <div className="container mx-auto">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
