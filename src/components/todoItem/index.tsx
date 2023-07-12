import clsx from "clsx";
import { memo } from "react";
import TodoContext, { TodoItemType } from "../../context/todoApp";

type Props = {
  todoItem: TodoItemType;
};

const TodoItem = memo(({ todoItem }: Props) => {
  console.log("Todo Item render");
  return (
    <div key={todoItem.id} className="flex items-center">
      <div>
        <label htmlFor="isCompleted" className="sr-only">
          Is Completed
        </label>
        <TodoContext.Consumer>
          {({ updateTodo }) => (
            <input
              type="checkbox"
              name="completed"
              id="isCompleted"
              checked={todoItem.isDone}
              onChange={() => updateTodo(todoItem)}
            />
          )}
        </TodoContext.Consumer>
      </div>
      <p
        className={clsx("flex-1 px-4", {
          "line-through": todoItem.isDone,
        })}
      >
        {todoItem.text}
      </p>
      {/* <ThemeContext.Consumer>
        {(value) => {
          console.log("rerender");

          return (
            <div>
              <p>{value.theme}</p>
              <button type="button" className="btn" onClick={value.toggleTheme}>
                Change Theme
              </button>
            </div>
          );
        }}
      </ThemeContext.Consumer> */}
      <TodoContext.Consumer>
        {({ deleteTodo }) => (
          <button
            type="button"
            className="btn"
            onClick={() => deleteTodo(todoItem)}
          >
            Delete
          </button>
        )}
      </TodoContext.Consumer>
    </div>
  );
});

export default TodoItem;
