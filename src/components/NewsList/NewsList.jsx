import NewsCard from "../NewsCard/NewsCard";

import classes from "./NewsList.module.scss";

function NewsList({ news, handleDeleteNews, handleOpenEditModal }) {
  return (
    <ul className={classes.list}>
      {news.map((current) => {
        return (
          <NewsCard
            key={current.id}
            news={current}
            handleDeleteNews={handleDeleteNews}
            handleOpenEditModal={handleOpenEditModal}
          />
        );
      })}
    </ul>
  );
}

export default NewsList;
