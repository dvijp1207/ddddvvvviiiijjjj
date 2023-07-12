import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const wait = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

type Props = {};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
  });
  const { login } = useContext(AuthContext);

  console.log(errors);

  return (
    <form className="space-y-6" noValidate onSubmit={handleSubmit(login)}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required..",
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please Provide valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-400 text-sm font-semibold">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("password", {
              required: {
                value: true,
                message: "Password is Required..",
              },
              // minLength: {
              //   value: 6,
              //   message: "Password should min 6 character",
              // },
              // maxLength: {
              //   value: 20,
              //   message: "Password should max 20 character",
              // },
            })}
          />
          {errors.password && (
            <span className="text-red-400 text-sm font-semibold">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400 disabled:cursor-wait"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Login;
