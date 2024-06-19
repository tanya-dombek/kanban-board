import React, {FC} from 'react';
import Dropdown from 'react-dropdown';
import { TOnSelect } from "../../utils/types";

type TTaskDropdown = {
  showInput: boolean,
  name: string,
  dropDownOptions: string[],
  onSelect: TOnSelect
}

const TaskDropdown: FC<TTaskDropdown> = ({ showInput, name, dropDownOptions, onSelect }) => {
  if (name.toLowerCase() === 'backlog' || !showInput) return null;

  return (
    <Dropdown
      placeholderClassName="dropdown-placeholder"
      placeholder="Select a task"
      menuClassName="dropdown-menu"
      controlClassName="dropdown-control"
      arrowClosed={<span className="arrow-closed" />}
      arrowOpen={<span className="arrow-open" />}
      options={dropDownOptions}
      onChange={onSelect}
    />
  );
};

export default TaskDropdown;