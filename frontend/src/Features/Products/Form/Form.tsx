import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../../../store";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../productSlice";

function Form(): JSX.Element {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleClickOpenModal = () => {
    setOpen((prev) => !prev);
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
    // navigate("/");
  };

  return (
    <div>
      {!open ? (
        <div>
          <button type="button" onClick={handleClickOpenModal}>
            Добавить товар
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            ></input>
            <input
              placeholder="Введите описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            ></input>
            <input
              placeholder="Загрузите фото"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              type="text"
              required
            ></input>
            <input
              placeholder="Укажите цену"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              required
            ></input>
            <button type="submit">Добавить товар</button>
            <button type="button" onClick={handleClickCloseModal}>
              Отменить добавление
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Form;
