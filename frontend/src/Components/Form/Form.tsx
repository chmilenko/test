import React, { useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { addNewProduct } from "../../Features/Products/productSlice";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";

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

function Form(): JSX.Element {
  const { user } = useSelector((store: RootState) => store.auth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleClickOpenModal = () => {
    user
      ? setOpen((prev) => !prev)
      : alert("Только авторизированные пользователи могут добавлять товар");
  };

  const handleClickCloseModal = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addNewProduct({
        name,
        description,
        img,
        price,
      })
    );
    handleClickCloseModal();
  };

  return (
    <div className="divFormAddProduct">
      {!open ? (
        <div>
          <button
            type="button"
            onClick={handleClickOpenModal}
            className="btnMain"
          >
            Добавить товар
          </button>
        </div>
      ) : (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClickOpenModal}
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
                <form onSubmit={handleSubmit} className="formAddProduct">
                  <input
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    type="text"
                    className="inputForm"
                  ></input>
                  <input
                    placeholder="Введите описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="inputForm"
                  ></input>
                  <input
                    placeholder="Загрузите фото"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    type="text"
                    required
                    className="inputForm"
                  ></input>
                  <input
                    placeholder="Укажите цену"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    required
                    className="inputForm"
                  ></input>
                  <button type="submit" className="btnMain">
                    Добавить товар
                  </button>
                  <button
                    type="button"
                    onClick={handleClickCloseModal}
                    className="btnMain"
                  >
                    Отменить
                  </button>
                </form>
              </Box>
            </Fade>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Form;
