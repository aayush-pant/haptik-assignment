import React, { useState, useEffect } from "react";

import Aux from "../Aux/Aux";
import FriendListItem from "../FriendListItem/FriendListItem";
import "./FriendList.css";

let modal, overlay, btnCloseModal;
const FriendList = (props) => {
  const [friend, setFriendToBeRemoved] = useState({});

  const renderFriends = () => {
    let friendComp = props.friendList.map((friend, index) => {
      return (
        <FriendListItem
          key={index}
          friend={friend}
          toggleFav={props.toggleFav}
          openDeleteModal={openDeleteFriendModal}
        />
      );
    });
    return friendComp;
  };

  useEffect(() => {
    modal = document.querySelector(".modal");
    overlay = document.querySelector(".overlay");
    btnCloseModal = document.querySelector(".close-modal");

    btnCloseModal.addEventListener("click", closeModalHandler);
    overlay.addEventListener("click", closeModalHandler);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModalHandler();
      }
    });
  }, []);

  const openModalHandler = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const closeModalHandler = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  const openDeleteFriendModal = (friend) => {
    setFriendToBeRemoved(friend);
    openModalHandler();
  };

  return (
    <Aux>
      <div className="modal hidden">
        <button className="close-modal">&times;</button>
        <div className="modal-heading">
          Are you sure you want to remove {friend.name ? friend.name : ""} from
          your Friends List?
        </div>
        <div className="btn-modal-container">
          <div
            className="btn-modal"
            onClick={() => {
              if (props.deleteFriend(friend)) {
                closeModalHandler();
              }
            }}
          >
            Yes
          </div>
          <div onClick={closeModalHandler} className="btn-modal">
            No
          </div>
        </div>
      </div>
      <div className="overlay hidden"></div>
      <div>{renderFriends()}</div>
    </Aux>
  );
};

export default FriendList;
