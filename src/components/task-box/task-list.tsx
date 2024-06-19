import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import { TIssue } from "../../utils/types";

type TTaskList = {
  issues: TIssue[]
}

const TaskList: FC<TTaskList> = ({ issues }) => {
  return (
    <>
      {issues.map(item => (
        <Link to={`/tasks/${item.id}`} key={item.id}>
            <p className="task">{item.name}</p>
        </Link>
      ))}
    </>
  )
};

export default TaskList;