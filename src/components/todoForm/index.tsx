import { memo } from "react";
import TodoContext from "../../context/todoApp";

type Props = {
  // addTodo: (event: React.FormEvent<HTMLFormElement>) => void;
};

const TodoForm = memo(() => {
  console.log("redner TodoForm");
  return (
    <TodoContext.Consumer>
      {({ addTodo, inputRef }) => (
        <form className="flex justify-center" onSubmit={addTodo}>
          <div>
            <label htmlFor="todoText" className="sr-only">
              Todo Text
            </label>
            <input
              ref={inputRef}
              type="text"
              id="todoText"
              className="rounded-l-md"
            />
          </div>
          <button type="submit" className="btn rounded-l-none">
            Add Todo
          </button>
        </form>
      )}
    </TodoContext.Consumer>
  );
});

export default TodoForm;
