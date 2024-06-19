import React from "react";

const UserDropdown = () => {
    return (
        <div className="user-dropdown-wrapper">
            <div className="dropdown-arrow"></div>
            <div className="user-dropdown">
              <a href="#">Profile</a>
              <a href="#">Log Out</a>
            </div>
        </div>
    );
}
  
export default UserDropdown;