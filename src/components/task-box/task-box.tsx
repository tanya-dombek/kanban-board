import React, { FC, useState, useEffect, useRef, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import TaskDropdown from "../dropdowns/task-dropdown";
import TaskInput from "./task-input";
import TaskList from "./task-list";
import TaskButton from "../buttons/task-button";
import { TTaskState, TTask, TOnSelect } from "../../utils/types";

type TTaskBox = TTaskState & {
  name: string,
}

const TaskBox: FC<TTaskBox> = ({name, tasks, setTasks}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showInput, setShowInput] = useState<boolean>(false);
    const [dropDownOptions, setDropDownOptions] = useState<string[]>([]);
    
    const addTask = (taskName: string) => {
        if (!taskName) return;

        const updatedTasks = tasks.map(item => {
            if (item.title.toLowerCase() === name.toLowerCase()) {
              return {
                ...item,
                issues: [
                  ...item.issues,
                  {
                    name: taskName,
                    description: '',
                    id: uuidv4(),
                  }
                ]
              };
            }
            return item;
        });
      
        setTasks(updatedTasks);
    };

    const handleClick = () => {
        if (showInput && name.toLowerCase() === 'backlog' && inputRef.current) {
          addTask(inputRef.current.value);
        }
        setShowInput(prevShowInput => !prevShowInput);
    };

    const updateDropDownOptions = (tasks: TTask[]): string[] => {
        if (name.toLowerCase() === 'backlog') return [];

        const currentIndex = tasks.findIndex(item => item.title.toLowerCase() === name.toLowerCase());
        if (currentIndex > 0) {
            return tasks[currentIndex - 1].issues.map(issue => issue.name);
        }
        return [];
    }

    const displayTasks = useMemo(() => {
        const currentTasks = tasks.find(item => item.title.toLowerCase() === name.toLowerCase());
        return currentTasks?.issues || [];
    }, [tasks, name]);

    const onSelect: TOnSelect = (option) => {
        const selectedTaskName = option.value;
        const previousBoxName = tasks[tasks.findIndex(item => item.title.toLowerCase() === name.toLowerCase()) - 1].title;
    
        const updatedTasks = tasks.map(item => {
          if (item.title.toLowerCase() === name.toLowerCase()) {
            const previousTasks = tasks.find(prevItem => prevItem.title.toLowerCase() === previousBoxName.toLowerCase());
            if (previousTasks) {
              const selectedTask = previousTasks.issues.find(task => task.name === selectedTaskName);

              if (selectedTask) {
                return {
                  ...item,
                  issues: [
                    ...item.issues,
                    selectedTask
                  ]
                };
              }
            }
          } else if (item.title.toLowerCase() === previousBoxName.toLowerCase()) {
            return {
              ...item,
              issues: item.issues.filter(issue => issue.name !== selectedTaskName)
            };
          }
          return item;
        });

        setTasks(updatedTasks);
        setShowInput(prevShowInput => !prevShowInput);
    }
    
    useEffect(() => {
        setDropDownOptions(updateDropDownOptions(tasks));
    }, [tasks]);
    
    return (
      <div className={"task-box"}>
        <div className="tasks-container">
            <p>{name}</p>
            <TaskList issues={displayTasks} />
            <TaskInput showInput={showInput} name={name} addTask={addTask} inputRef={inputRef} setShowInput={setShowInput}/>
            <TaskDropdown showInput={showInput} name={name} dropDownOptions={dropDownOptions} onSelect={onSelect} />
        </div>
        <TaskButton showInput={showInput} name={name} handleClick={handleClick} disabled={dropDownOptions.length === 0}/>
      </div>
    );
}
  
export default TaskBox;