import React from "react";

import Aux from "../Aux/Aux";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
  return (
    <div className={styles.footer}>
      <div className={styles["page-number"]}>Page: {props.currentPage}</div>
      <div className={styles.pagination}>
        {props.friendCount > 4 ? (
          <Aux>
            <div className={styles["page-item"]}>
              <div
                onClick={() => props.paginate(1)}
                className={styles["page-link"]}
              >
                <img
                  className={styles.icon}
                  src="/assets/home.png"
                  alt="First Page"
                />
              </div>
            </div>
            <div className={styles["page-item"]}>
              <div
                onClick={() => props.paginate(props.currentPage - 1)}
                className={styles["page-link"]}
              >
                <img
                  className={styles.icon}
                  src="/assets/back.png"
                  alt="Previous Page"
                />
              </div>
            </div>
            <div className={styles["page-item"]}>
              <div
                onClick={() => props.paginate(props.currentPage + 1)}
                className={styles["page-link"]}
              >
                <img
                  className={styles.icon}
                  src="/assets/next.png"
                  alt="Next Page"
                />
              </div>
            </div>
            <div className={styles["page-item"]}>
              <div
                onClick={() => props.paginate(Math.ceil(props.friendCount / 4))}
                className={styles["page-link"]}
              >
                <img
                  className={styles.icon}
                  src="/assets/stop.png"
                  alt="Last Page"
                />
              </div>
            </div>
          </Aux>
        ) : (
          <div style={{ height: "24px" }}></div>
        )}
      </div>
      <div className={styles.sort} onClick={props.sort}>
        Sort By {props.sortType}
      </div>
    </div>
  );
};

export default Pagination;
