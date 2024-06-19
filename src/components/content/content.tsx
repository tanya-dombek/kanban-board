import React, {FC} from "react";
import TaskBox from "../task-box/task-box";
import { TTaskState } from "../../utils/types";

const Content: FC<TTaskState> = ({tasks, setTasks}) => {
    return (
        <main className="content">
            {['Backlog', 'Ready', 'In Progress', 'Finished'].map((name) => (
                <TaskBox key={name} name={name} tasks={tasks} setTasks={setTasks}/>
            ))}
      </main>
    );
}
  
export default Content;