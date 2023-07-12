import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export enum FilterType {
  all = "all",
  pending = "pending",
  completed = "completed",
}

export type TodoItemType = {
  id: number;
  text: string;
  isDone: boolean;
};

type State = {
  todoList: TodoItemType[];
  filterType: FilterType;
};

type BtsTyps = { value: FilterType; text: string };

type TodoContextType = {
  todoList: TodoItemType[];
  filterType: FilterType;
  addTodo: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  updateTodo: (x: TodoItemType) => Promise<void>;
  deleteTodo: (x: TodoItemType) => Promise<void>;
  loadTodo: (ft: FilterType) => Promise<void>;
  btns: BtsTyps[];
  inputRef: React.RefObject<HTMLInputElement>;
};

const TodoContext = createContext<TodoContextType>({
  todoList: [],
  filterType: FilterType.all,
  addTodo: async (e: React.FormEvent<HTMLFormElement>) => {},
  updateTodo: async (x: TodoItemType) => {},
  deleteTodo: async (x: TodoItemType) => {},
  loadTodo: async (ft: FilterType) => {},
  btns: [],
  inputRef: null,
});

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [filterType, setFilterType] = useState(FilterType.all);

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        const inputEle = inputRef.current;

        if (inputEle) {
          const todoText = inputEle.value;
          const res = await fetch("http://localhost:3000/todoList", {
            method: "POST",
            body: JSON.stringify({
              text: todoText,
              isDone: false,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          const json = await res.json();

          setTodoList((val) => {
            return [...val, json];
          });
          inputEle.value = "";
        }
      } catch (error) {}
    },
    []
  );

  const updateTodo = useCallback(async (x: TodoItemType) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${x.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...x, isDone: !x.isDone }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();

      setTodoList((val) => {
        const index = val.findIndex((item) => item.id === x.id);
        return [...val.slice(0, index), json, ...val.slice(index + 1)];
      });
    } catch (error) {}
  }, []);

  const deleteTodo = useCallback(async (x: TodoItemType) => {
    try {
      await fetch(`http://localhost:3000/todoList/${x.id}`, {
        method: "DELETE",
      });
      setTodoList((val) => {
        const index = val.findIndex((item) => item.id === x.id);
        return [...val.slice(0, index), ...val.slice(index + 1)];
      });
    } catch (error) {}
  }, []);

  const btns = useMemo(
    () => [
      { value: FilterType.all, text: "All" },
      { value: FilterType.pending, text: "Pending" },
      { value: FilterType.completed, text: "Completed" },
    ],
    []
  );

  const loadTodo = async (ft: FilterType) => {
    try {
      let url = "http://localhost:3000/todoList";
      if (ft !== FilterType.all) {
        url = `${url}?isDone=${ft === FilterType.completed}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      setTodoList(json);
      setFilterType(ft);
    } catch (error) {}
  };

  useEffect(() => {
    loadTodo(FilterType.all);
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        filterType,
        addTodo,
        updateTodo,
        deleteTodo,
        loadTodo,
        inputRef,
        btns,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
