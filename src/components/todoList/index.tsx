import { memo } from "react";
import TodoItem from "../todoItem";
import TodoContext from "../../context/todoApp";

const TodoList = memo(() => {
  console.log("redner TodoList");
  return (
    <TodoContext.Consumer>
      {({ todoList }) => (
        <section
          id="todoList"
          className="flex flex-1 flex-col mx-4 my-10 gap-4"
        >
          {todoList.map((x) => {
            return <TodoItem key={x.id} todoItem={x} />;
          })}
        </section>
      )}
    </TodoContext.Consumer>
  );
});

export default TodoList;
