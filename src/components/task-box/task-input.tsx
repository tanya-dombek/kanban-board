import React, { FC, useEffect } from 'react';

type TTaskInput = {
  showInput: boolean,
  name: string,
  addTask: (taskName: string) => void,
  inputRef: React.RefObject<HTMLInputElement>,
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskInput: FC<TTaskInput> = ({ showInput, name, addTask, inputRef, setShowInput }) => {
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput, inputRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      addTask(inputRef.current.value);
      inputRef.current.value = '';
      setShowInput(prevShowInput => !prevShowInput);
    }
  };

  if (name.toLowerCase() !== 'backlog' || !showInput) return null;

  return (
    <input 
      placeholder="Task name" 
      ref={inputRef} 
      onKeyDown={handleKeyDown}
      data-testid={'task-input'}
    />
  );
};

export default TaskInput;