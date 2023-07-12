import React from "react";
import { useController } from "react-hook-form";

type Props = {};

const Input = ({ name, control, rules, id, label, ...props }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...field}
          {...props}
        />
        {error && (
          <span className="text-red-400 text-sm font-semibold">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
