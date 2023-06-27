import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { logout } from "../../Features/auth/authSlice";

function Header(): JSX.Element {
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();

      const dispatchResult = await dispatch(logout());
      if (logout.fulfilled.match(dispatchResult)) {
        navigate("/");
      }
    },
    [dispatch, navigate]
  );

  return (
    <div>
      <nav className="navBar">
        <h3>Product List</h3>
        <span>
          {user ? (
            <div>
              <Link to="/">Избранное</Link>
              <button type="button" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          ) : (
            <div>
              <Link to="/registration">Регистрация</Link>
              <Link to="/authenication">Войти</Link>
            </div>
          )}
        </span>
      </nav>
    </div>
  );
}

export default Header;
