import React, { useState } from "react";
import { useAppDispatch } from "../../store";
import { selectLoginFormError } from "./selectors";
import { useNavigate } from "react-router-dom";
import { login, resetLoginErrorForm } from "./authSlice";
import { useSelector } from "react-redux";

function Authenication(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectLoginFormError);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const dispatchResult = await dispatch(
        login({
          email,
          password,
        })
      );

      if (login.fulfilled.match(dispatchResult)) {
        navigate("/");
      }

      if (login.rejected.match(dispatchResult)) {
        console.error(dispatchResult.error.message);
      }
    },
    [dispatch, email, navigate, password]
  );

  const handleEmailChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      dispatch(resetLoginErrorForm());
    },
    [dispatch]
  );

  const handlePasswordChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      dispatch(resetLoginErrorForm());
    },
    [dispatch]
  );

  return (
    <div>
      <div>
        <div>
          <h2>Войти</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">
                Email address
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </label>
            </div>

            <div>
              <button type="submit">Войти</button>
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

export default Authenication;
