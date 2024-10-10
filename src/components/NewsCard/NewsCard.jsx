import trashIcon from "../../assets/trash.svg";
import editIcon from "../../assets/edit.svg";
import classes from "./NewsCard.module.scss";

function NewsCard({ news, handleDeleteNews, handleOpenEditModal }) {
  return (
    <li className={classes.card}>
      <h2 className={classes.card__name}>{news.name}</h2>
      <p className={classes.card__description}>{news.description}</p>
      <button
        className={`${classes["card__button-delete"]}`}
        onClick={() => handleDeleteNews(news.id)}
      >
        <img
          className={classes.card__icon}
          src={trashIcon}
          alt="Удалить новость"
        />
      </button>
      <button
        className={`${classes["card__button-edit"]}`}
        onClick={() => handleOpenEditModal(news)}
      >
        <img
          className={classes.card__icon}
          src={editIcon}
          alt="Редактировать новость"
        />
      </button>
    </li>
  );
}

export default NewsCard;
