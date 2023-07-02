import React, { useState } from "react";
import Authenication from "./Authenication";
import Registration from "./Registration";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

const style = {
  width: 650,
  height: 240,
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

function ModalAuthReg() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<Page>("login");
 
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
                    <h5 className="activeNone">У вас еще нет аккаунта?</h5>
                    <p onClick={handleClickRegistration}>Зарегистрироваться</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container">
                  <div className="nav">
                    <Registration />
                    <h5 className="activeNone">Уже есть аккаунт?</h5>
                    <p onClick={handleClickLogin} color="white">
                      Войти
                    </p>
                  </div>
                </div>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalAuthReg;
