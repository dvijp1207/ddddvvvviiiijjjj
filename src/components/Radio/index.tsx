import { useController } from "react-hook-form";

type Props = {};

const Radio = ({ label, items, name, control, rules }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <fieldset>
      <legend>{label}</legend>
      {items.map((x) => (
        <div>
          <input
            type="radio"
            id={x.id}
            {...field}
            checked={field.value === x.id}
            onChange={() => {
              field.onChange(x.id);
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

export default Radio;
