import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { logout } from "../../Features/Auth/authSlice";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Authenication from "../../Features/Auth/Authenication";
import Registration from "../../Features/Auth/Registration";
import "./Header.sass";

const style = {
  width: 650,
  height: 250,
  position: "absolute" as "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 44,
  p: 4,
  background: "#2ee59d",
  borderRadius: 5,
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
    <nav className="navBar">
      <Link to="/">
        <button type="button" className="btnMain">
          Product List
        </button>
      </Link>
      <span>
        {user ? (
          <div>
            <Link to="/favorites">
              <button className="btnMain">Избранное</button>
            </Link>
            <button type="button" onClick={handleLogout} className="btnMain">
              Выйти
            </button>
          </div>
        ) : (
          <div>
            <div className="nav">
              <button type="button" onClick={handleOpen} className="btnMain">
                Войти
              </button>
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
                            <span className="activeNone">
                              У вас еще нет аккаунта?
                            </span>{" "}
                            <span
                              onClick={handleClickRegistration}
                              style={{ color: "white" }}
                            >
                              Зарегистрироваться
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="container">
                          <div className="nav">
                            <Registration />
                            <div>
                              <span className="activeNone">
                                Уже есть аккаунт?
                              </span>{" "}
                              <span
                                onClick={handleClickLogin}
                                style={{ color: "white" }}
                              >
                                Войти
                              </span>
                            </div>
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
  );
}

export default Header;
