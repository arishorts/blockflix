import React from "react";

//sfc
const Filter = (props) => {
  const { items, textProperty, valueProperty, onGenreSelect, currentGenre } =
    props;

  return (
    <ul className="list-group">
      {items.map((genre) => {
        return (
          <button
            key={genre[valueProperty]}
            type="button"
            aria-current="true"
            onClick={() => {
              onGenreSelect(genre);
            }}
            className={
              genre === currentGenre
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
          >
            {genre[textProperty]}
          </button>
        );
      })}
    </ul>
  );
};

export default Filter;
