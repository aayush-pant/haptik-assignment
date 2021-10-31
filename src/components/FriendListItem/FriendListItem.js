import React from "react";

import styles from "./FriendListItem.module.css";

const FriendListItem = (props) => {
  return (
    <div className={styles["friend-container"]}>
      <div className={styles.friend}>
        <p className={styles.heading}>{props.friend.name}</p>
        <p className={styles.subheading}>is your friend</p>
      </div>
      <div className={styles.space}></div>
      <div className={styles["icon-outer-container"]}>
        <div
          className={styles["icon-container"] + " " + styles.star}
          onClick={() => props.toggleFav(props.friend)}
        >
          {Number(props.friend.isFavourite) ? (
            <img
              className={styles.icon}
              src="/assets/star-fill.png"
              alt="Favourite Friend"
            />
          ) : (
            <img className={styles.icon} src="/assets/star.png" alt="Friend" />
          )}
        </div>
        <div
          className={styles["icon-container"]}
          onClick={() => props.openDeleteModal(props.friend)}
        >
          <img
            className={styles.icon}
            src="/assets/delete.svg"
            alt="Delete Friend"
          />
        </div>
      </div>
    </div>
  );
};

export default FriendListItem;
