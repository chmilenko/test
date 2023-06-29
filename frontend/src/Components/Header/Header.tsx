import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { logout } from "../../Features/Auth/authSlice";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Authenication from "../../Features/Auth/Authenication";
import Registration from "../../Features/Auth/Registration";

const style = {
  width: 550,
  position: "absolute" as "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #cd9cf2",
  boxShadow: 24,
  p: 4,
  background: "linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)",
  color: "black",
  borderRadius: 3,
};
type Page = "login" | "registration";

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

  const [page, setPage] = useState<Page>("login");
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen((prev) => !prev);
  };

  const handleClickLogin: React.MouseEventHandler<HTMLSpanElement> = (
    event
  ) => {
    event.preventDefault();
    setPage("login");
  };

  const handleClickRegistration: React.MouseEventHandler<HTMLSpanElement> = (
    event
  ) => {
    event.preventDefault();
    setPage("registration");
  };

  return (
    <div>
      <nav className="navBar">
        <h3>Product List</h3>
        <span>
          {user ? (
            <div>
              <Link to="/favorites">Избранное</Link>
              <button type="button" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          ) : (
            <div>
              <div className="nav">
                <Button
                  style={{
                    color: "yellow",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleOpen}
                >
                  Войти
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleOpen}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      {page === "login" ? (
                        <>
                          <Authenication />
                          <div className="container">
                            <div className="nav">
                              {/* <h3 className="active" onClick={handleClickLogin}>
                                Войти
                              </h3> */}
                              <h3
                                className="activeNone"
                                onClick={handleClickRegistration}
                              >
                                У вас еще нет аккаунта? Зарегистрироваться
                              </h3>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="container">
                            <div className="nav">
                              <Registration />
                              <h3
                                className="activeNone"
                                onClick={handleClickLogin}
                              >
                                Уже есть аккаунт? Войти
                              </h3>
                              {/* <h3
                                className="active"
                                onClick={handleClickRegistration}
                              >
                                Зарегистрироваться
                              </h3> */}
                            </div>
                          </div>
                        </>
                      )}
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </div>
          )}
        </span>
      </nav>
    </div>
  );
}

export default Header;
