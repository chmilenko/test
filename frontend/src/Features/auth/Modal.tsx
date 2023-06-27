import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Authenication from "./Authenication";
import Modal from "@mui/material/Modal";
import Registration from "./Registration";

type Page = "login" | "registration";
function ModalPage() {
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
            <Box>
              {page === "login" ? (
                <>
                  <div className="container">
                    <div className="nav">
                      <h3 className="active" onClick={handleClickLogin}>
                        Войти
                      </h3>
                      <h3
                        className="activeNone"
                        onClick={handleClickRegistration}
                      >
                        Зарегистрироваться
                      </h3>
                    </div>
                    <Authenication />
                  </div>
                </>
              ) : (
                <>
                  <div className="container">
                    <div className="nav">
                      <h3 className="activeNone" onClick={handleClickLogin}>
                        Войти
                      </h3>
                      <h3 className="active" onClick={handleClickRegistration}>
                        Зарегистрироваться
                      </h3>
                    </div>
                    <Registration />
                  </div>
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default ModalPage;
