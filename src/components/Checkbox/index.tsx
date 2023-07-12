import { useController } from "react-hook-form";

type Props = {};

const Checkbox = ({
  label,
  items,
  name,
  control,
  rules,
  defaultValue,
}: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
  });

  return (
    <fieldset>
      <legend>{label}</legend>
      {items.map((x) => (
        <div>
          <input
            type="checkbox"
            id={x.id}
            {...field}
            checked={field.value.some((y) => y === x.id)}
            onChange={() => {
              const index = field.value.findIndex((y) => y === x.id);
              console.log(index);
              if (index === -1) {
                field.onChange([...field.value, x.id]);
              } else {
                field.onChange([
                  ...field.value.slice(0, index),
                  ...field.value.slice(index + 1),
                ]);
              }

              //   field.onChange(x.id);
            }}
          />
          <label htmlFor={x.id}>{x.text}</label>
        </div>
      ))}
      {error && (
        <span className="text-red-400 text-sm font-semibold">
          {error.message}
        </span>
      )}
    </fieldset>
  );
};

export default Checkbox;
