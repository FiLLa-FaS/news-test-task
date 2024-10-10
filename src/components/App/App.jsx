import { useState, useEffect } from "react";
import nextId from "react-id-generator";

import NewsList from "../NewsList/NewsList";
import classes from "./App.module.scss";
import iconClose from "../../assets/close.svg";

function App() {
  const [currentNews, setCurrentNews] = useState({});
  const [news, setNews] = useState(() => {
    const savedNews = localStorage.getItem("news");
    if (savedNews) {
      return JSON.parse(savedNews);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(news));
  }, [news]);

  const openModal = (modalType) => {
    if (modalType === "add") {
      window.add.showModal();
    }
    if (modalType === "edit") {
      window.edit.showModal();
    }
  };

  const closeModal = (modalType) => {
    if (modalType === "add") {
      window.add.close();
    }
    if (modalType === "edit") {
      window.edit.close();
    }
  };

  const handleAddNews = () => {
    if (currentNews.description && currentNews.name) {
      setNews((prevNews) => {
        return [
          ...prevNews,
          {
            name: currentNews.name,
            description: currentNews.description,
            id: `${currentNews.name}${nextId()}`,
          },
        ];
      });
    }
    window.add.close();
  };

  const handleDeleteNews = (id) => {
    setNews(news.filter((current) => current.id !== id));
  };

  const handleOpenEditModal = (currentNews) => {
    setCurrentNews(currentNews);

    openModal("edit");
  };

  const handleEditNews = () => {
    setNews((prevNews) => {
      const idx = prevNews.findIndex((el) => el.id === currentNews.id);
      const oldItem = prevNews[idx];
      const newItem = currentNews;
      const currentItem = {
        ...oldItem,
        description: newItem.description,
        name: newItem.name,
      };

      return [
        ...prevNews.slice(0, idx),
        currentItem,
        ...prevNews.slice(idx + 1),
      ];
    });
  };

  const onInputChangeName = (e) => {
    setCurrentNews((prevNews) => {
      return {
        name: e.target.value,
        description: prevNews.description,
        id: prevNews.id,
      };
    });
  };

  const onInputChangeDescription = (e) => {
    setCurrentNews((prevNews) => {
      return {
        name: prevNews.name,
        description: e.target.value,
        id: prevNews.id,
      };
    });
  };

  return (
    <>
      <h1 className={`${classes["main-title"]}`}>Список новостей</h1>

      {!news.length && (
        <p className={classes.error}>
          Новостей нет! Можно добавить новость по кнопке внизу
        </p>
      )}

      {news.length > 0 && (
        <NewsList
          news={news}
          handleDeleteNews={handleDeleteNews}
          handleOpenEditModal={handleOpenEditModal}
        />
      )}

      <button
        className={`${classes["button-text"]}`}
        onClick={() => openModal("add")}
      >
        Добавить новость
      </button>

      <dialog className={classes.dialog} id="add">
        <button
          className={`${classes["button-close"]}`}
          type="reset"
          onClick={() => closeModal("add")}
        >
          <img
            className={`${classes["button-close__icon"]}`}
            src={iconClose}
            alt="Закрыть"
          />
        </button>
        <h2 className={classes.dialog__title}>Добавить новость</h2>
        <form
          className={classes.dialog__form}
          method="dialog"
          onSubmit={handleAddNews}
        >
          <input
            className={classes.dialog__input}
            type="text"
            name="name"
            value={currentNews.name}
            onChange={(e) => onInputChangeName(e)}
            placeholder="Заголовок новости"
          />
          <textarea
            className={classes.dialog__input}
            name="description"
            onChange={(e) => onInputChangeDescription(e)}
            placeholder="Описание новости"
          >
            {currentNews.description}
          </textarea>
          <button className={`${classes["button-text"]}`} type="submit">
            Сохранить
          </button>
        </form>
      </dialog>

      <dialog className={classes.dialog} id="edit">
        <button
          className={`${classes["button-close"]}`}
          type="reset"
          onClick={() => closeModal("edit")}
        >
          <img
            className={`${classes["button-close__icon"]}`}
            src={iconClose}
            alt="Закрыть"
          />
        </button>
        <h2 className={classes.dialog__title}>Редактировать новость</h2>
        <form
          className={classes.dialog__form}
          method="dialog"
          onSubmit={handleEditNews}
        >
          <input
            className={classes.dialog__input}
            type="text"
            name="name"
            value={currentNews.name}
            onChange={(e) => onInputChangeName(e)}
            placeholder="Заголовок новости"
          />
          <textarea
            className={classes.dialog__input}
            name="description"
            onChange={(e) => onInputChangeDescription(e)}
            placeholder="Описание новости"
            value={currentNews.description}
          />
          <button className={`${classes["button-text"]}`} type="submit">
            Сохранить
          </button>
        </form>
      </dialog>
    </>
  );
}

export default App;

// TODO: обработать пустую новость (пустой заголовок или пустое описание)
// TODO: иконочки вместо кнопок удаления и редактирования
