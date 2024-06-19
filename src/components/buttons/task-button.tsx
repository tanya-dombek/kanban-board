import React, {FC} from 'react';
import addIcon from '../../utils/img/add-task.svg';

type TTaskButton = {
  showInput: boolean,
  name: string,
  handleClick: () => void,
  disabled: boolean
}

const TaskButton: FC<TTaskButton> = ({ showInput, name, handleClick, disabled }) => {
    const isBacklog = name.toLowerCase() === 'backlog';
    const buttonStyle = showInput ? "submit-btn" : `add-btn ${disabled && !isBacklog ? 'disabled' : ''}`;

    return (
      <button className={buttonStyle} onClick={handleClick} disabled={!isBacklog && disabled} data-testid={'task-button'}>
        {showInput ? isBacklog ? 'Submit' : 'Cancel' : (
          <>
            <img src={addIcon} alt="add icon" />
            {'Add card'}
          </>
        )}
      </button>
    );
};

export default TaskButton;