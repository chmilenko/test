import React from "react";

function Registration(): JSX.Element {
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registration
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="login"
                className="block text-xl font-medium leading-6 text-gray-900"
              >
                Login
                <div className="mt-2">
                  <input
                    id="login"
                    name="login"
                    type="text"
                    required
                    autoComplete="on"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 text-lg"
                    // value={login}
                    // onChange={handleLoginChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium leading-6 text-gray-900"
              >
                Email address
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
                    autoComplete="on"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 text-lg"
                    // value={email}
                    // onChange={handleEmailChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xl font-medium leading-6 text-gray-900"
              >
                Password
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="on"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 text-lg"
                    // value={password}
                    // onChange={handlePasswordChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xl font-medium leading-6 text-gray-900"
              >
                Repeat Password
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="on"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 text-lg"
                    // value={passwordRepeat}
                    // onChange={handlePasswordRepeatChange}
                  />
                </div>
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-40 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Зарегистрироваться
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-red-600"></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
