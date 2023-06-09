import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  const { numberPages, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(numberPages / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); //lodash range creates an array of numbers progressing from start up to, but not including, end.

  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => {
            return (
              <li
                key={("page", page)}
                style={{
                  cursor: "pointer",
                  outline: "none",
                  userSelect: "none",
                }}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <button
                  className="page-link"
                  onClick={() => {
                    onPageChange(page);
                  }}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  numberPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
