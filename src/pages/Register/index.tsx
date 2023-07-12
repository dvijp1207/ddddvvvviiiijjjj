import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Radio from "../../components/Radio";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import File from "../../components/FileComponent";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const wait = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

type Props = {};

const Register = (props: Props) => {
  const {
    handleSubmit,
    getValues,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
  });
  const { register } = useContext(AuthContext);

  console.log(watch("gender"));

  return (
    <form className="space-y-6" onSubmit={handleSubmit(register)}>
      <Input
        control={control}
        name="name"
        rules={{
          required: {
            value: true,
            message: "Name is Required..",
          },
        }}
        label="Name"
        id="name"
        autoComplete="name"
      />
      {/* <File
        control={control}
        name="avatar"
        rules={{
          required: {
            value: true,
            message: "avatar is Required..",
          },
        }}
        label="Avatar"
        id="avatar"
        multiple
      /> */}
      <Input
        control={control}
        rules={{
          required: {
            value: true,
            message: "Email is Required..",
          },
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: "Please Provide valid email address",
          },
        }}
        name="email"
        label="Email"
        id="email"
        type="email"
        autoComplete="email"
      />
      <Input
        control={control}
        name="password"
        rules={{
          required: {
            value: true,
            message: "Password is Required..",
          },
        }}
        label="Password"
        id="password"
        type="password"
        autoComplete="new-password"
      />
      <Input
        control={control}
        name="confirmPassword"
        rules={{
          required: {
            value: true,
            message: "confirm Password is Required..",
            validate: (value) => {
              const { password } = getValues();
              return (
                value === password || "Password should match confirm password"
              );
            },
          },
        }}
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
      />
      {/* <Select
        control={control}
        name="hobbies"
        rules={{
          required: {
            value: true,
            message: "Hobbies is Required..",
          },
        }}
        label="Hobbies"
        id="hobbies"
        placeholder="Please select hobby"
        options={[
          {
            value: "cricket",
            text: "Cricket",
          },
        ]}
      /> */}
      <Radio
        label="Gender"
        items={[
          {
            id: "male",
            text: "Male",
          },
          {
            id: "female",
            text: "Female",
          },
          {
            id: "other",
            text: "Other",
          },
        ]}
        name="gender"
        control={control}
        rules={{
          required: {
            value: true,
            message: "gender is Required..",
          },
        }}
      />
      <Checkbox
        label="Hobbies"
        items={[
          {
            id: "cricket",
            text: "Cricket",
          },
          {
            id: "hoccky",
            text: "Hoccky",
          },
          {
            id: "football",
            text: "Football",
          },
        ]}
        name="hobbies"
        control={control}
        defaultValue={[]}
        rules={{
          required: {
            value: true,
            message: "Hobbies is Required..",
          },
        }}
      />
      <div>
        <button
          type="submit"
          // disabled={isSubmitting || !isValid}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400 disabled:cursor-wait"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Register;
