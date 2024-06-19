import React, {useState} from "react";
import UserDropdown from "../dropdowns/user-dropdown";
import userAvatar from '../../utils/img/user-avatar.png';
import accountArrow from '../../utils/img/account-arrow.svg';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

    return (
      <header>
        <p>Awesome Kanban Board</p>
        <div>
            <img className="user-img" src={userAvatar} alt="user avatar"/>
            <button onClick={toggleDropdown}>
                <img src={accountArrow} className={dropdownOpen ? 'arrow-up' : ''} alt='arrow button'/>
            </button>
            {dropdownOpen && <UserDropdown/>}
        </div>
      </header>
    );
}
  
export default Header;