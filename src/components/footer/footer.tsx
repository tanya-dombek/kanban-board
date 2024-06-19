import React, {FC} from "react";
import { TTask } from "../../utils/types";

type TFooter = {
  tasks: TTask[]
}

const Footer: FC<TFooter> = ({tasks}) => {
  const tasksAmount = (boxName: string) => {
    const currentBox = tasks.find(item => item.title.toLowerCase() === boxName.toLowerCase());
    return currentBox ? currentBox.issues.length : 0;
  }

    return (
      <footer>
        <div>
            <p>Active tasks: {tasksAmount('Backlog')}</p>
            <p>Finished tasks: {tasksAmount('Finished')}</p>
        </div>
        <p>Kanban board by Tati, 2024</p>
      </footer>
    );
}
  
export default Footer;