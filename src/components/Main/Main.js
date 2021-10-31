import React, { useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import FriendList from "../FriendList/FriendList";
import Pagination from "../Pagination/Pagination";
import initialFriendList from "../../utils";

const Main = () => {
  const [searchedFriendList, setSearchedFriendList] =
    useState(initialFriendList);
  const [friendList, setFriendList] = useState(initialFriendList);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortByFav, setSortByFav] = useState(false);

  const itemsPerPage = 4;

  const handleChangeData = (value) => {
    let friends = friendList.filter((friend) => {
      return friend.name.toLowerCase().startsWith(value.toLowerCase());
    });
    setSearchedFriendList(friends);
    setCurrentPage(1);
  };

  const titleCase = (str) => {
    str = str
      .toLowerCase()
      .split(" ")
      .map((word) => word.replace(word[0], word[0].toUpperCase()));
    return str.join(" ");
  };

  const handleAddFriend = (value) => {
    if (
      friendList.find(
        (friend) => friend.name.toLowerCase() === value.toLowerCase()
      )
    ) {
      return 0;
    } else {
      let newFriend = {
        name: titleCase(value),
        isFavourite: 0,
      };
      setFriendList([...friendList, newFriend]);
      setSearchedFriendList([...friendList, newFriend]);
      return 1;
    }
  };

  const handleDeleteFriend = (friend) => {
    let friends = [...friendList];
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].name === friend.name) {
        friends.splice(i, 1);
      }
    }
    setSearchedFriendList(friends);
    setFriendList(friends);
    return 1;
  };

  const handleToggleFavourite = (friend) => {
    let friends = [...friendList];
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].name === friend.name) {
        friends[i].isFavourite = Number(!friend.isFavourite);
      }
    }
    setSearchedFriendList(friends);
    setFriendList(friends);
  };

  // Friends On Current Page
  const lastFriendIndex = currentPage * itemsPerPage;
  const firstFriendIndex = lastFriendIndex - itemsPerPage;
  let sortedSearchedFriendList = searchedFriendList.sort((a, b) => {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  });
  if (isSortByFav) {
    sortedSearchedFriendList = searchedFriendList.sort((a, b) => {
      return a.isFavourite > b.isFavourite
        ? -1
        : b.isFavourite > a.isFavourite
        ? 1
        : 0;
    });
  }
  const friendsOnCurrentPage = sortedSearchedFriendList.slice(
    firstFriendIndex,
    lastFriendIndex
  );

  const paginate = (pageNumber) => {
    if (
      pageNumber <= 0 ||
      pageNumber > Math.ceil(searchedFriendList.length / 4)
    ) {
      console.log("Cant go to this page");
      return;
    }
    setCurrentPage(pageNumber);
  };

  const sortByFav = () => {
    setSortByFav((prevState) => !prevState);
  };

  return (
    <div>
      <SearchBar changeData={handleChangeData} addFriend={handleAddFriend} />
      <FriendList
        friendList={friendsOnCurrentPage}
        deleteFriend={handleDeleteFriend}
        toggleFav={handleToggleFavourite}
      />
      <Pagination
        friendCount={searchedFriendList.length}
        currentPage={currentPage}
        paginate={paginate}
        sort={sortByFav}
        sortType={isSortByFav ? "Name" : "Favourite"}
      />
    </div>
  );
};

export default Main;
