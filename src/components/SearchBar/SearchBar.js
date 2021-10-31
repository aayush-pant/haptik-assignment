import React, { PureComponent } from "react";

import styles from "./SearchBar.module.css";

class SearchBar extends PureComponent {
  constructor() {
    super();
    this.state = {
      inputValue: "",
    };
  }

  handleInputChange = (e) => {
    this.props.changeData(e.target.value);
    this.setState({
      inputValue: e.target.value,
    });
  };

  handlePressEnter = (e) => {
    if (e.key === "Enter") {
      let ack = this.props.addFriend(this.state.inputValue);
      if (ack) {
        console.log("Friend added to your friends list.");
        document.getElementById("input").value = "";
      } else {
        console.log("You already have a friend with this name.");
      }
    }
  };

  render() {
    return (
      <div className={styles["input-container"]}>
        <input
          id="input"
          type="text"
          onChange={this.handleInputChange}
          onKeyDown={this.handlePressEnter}
          placeholder="Enter your friend's name"
        />
      </div>
    );
  }
}

export default SearchBar;
