import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { selectRegisterFormError } from "./selectors";
import { register, resetRegisterErrorForm } from "./authSlice";

function Registration(): JSX.Element {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectRegisterFormError);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const dispatchResult = await dispatch(
        register({
          login,
          email,
          password,
          passwordRepeat,
        })
      );

      if (register.fulfilled.match(dispatchResult)) {
        navigate("/");
      }
    },
    [dispatch, email, login, navigate, password, passwordRepeat]
  );

  const handleLoginChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLogin(event.target.value);
      dispatch(resetRegisterErrorForm());
    },
    [dispatch]
  );

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      dispatch(resetRegisterErrorForm());
    },
    [dispatch]
  );

  const handlePasswordChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      dispatch(resetRegisterErrorForm());
    },
    [dispatch]
  );

  const handlePasswordRepeatChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordRepeat(event.target.value);
      dispatch(resetRegisterErrorForm());
    },
    [dispatch]
  );

  return (
    <div>
      <div>
        <div>
          <h2>Registration</h2>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login">
                Login
                <div className="mt-2">
                  <input
                    id="login"
                    name="login"
                    type="text"
                    required
                    autoComplete="on"
                    value={login}
                    onChange={handleLoginChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="email">
                Email address
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
                    autoComplete="on"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="on"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Repeat Password
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="on"
                    value={passwordRepeat}
                    onChange={handlePasswordRepeatChange}
                  />
                </div>
              </label>
            </div>

            <div>
              <button type="submit">Зарегистрироваться</button>
            </div>
            <div>
              <p>{error}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
