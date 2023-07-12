import { useCallback, useRef } from "react";
import { useController } from "react-hook-form";

type Props = {};

const File = ({ name, control, rules, id, label, ...props }: Props) => {
  const fileInput = useRef();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });


  const loadImages = useCallback(() => {
    const arr = [];
    if (field.value) {
      for (let file of field.value) {
        arr.push(<figure><img src={URL.createObjectURL(file)} alt={file.name} height={100} width={100} />
        <figcaption>{file.name}</figcaption>
        </figure>);
      }
    }
    return arr;
  }, [field.value]);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="flex">
        {loadImages()}
        {/* {field.value &&
          field.value.length > 0 &&
          field.value.map((x) => (
            <img
              src={URL.createObjectURL(x)}
              alt="avart"
              height={100}
              width={100}
            />
          ))} */}
        <div className="mt-2">
          <input
            id={id}
            type="file"
            className="hidden"
            //   {...field}
            ref={fileInput}
            {...props}
            onChange={(event) => {
              field.onChange(event?.target?.files);
            }}
          />
          <button type="button" onClick={() => fileInput.current.click()}>
            Upload Image
          </button>
        </div>
        {error && (
          <span className="text-red-400 text-sm font-semibold">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default File;
