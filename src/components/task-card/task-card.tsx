import React, {FC, useEffect, useState, useRef} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { TTaskState, TTask, TIssue } from "../../utils/types";

const TaskCard: FC<TTaskState> = ({tasks, setTasks}) => {
    const navigate = useNavigate();
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [taskInfo, setTaskInfo] = useState<TIssue | null>(null);
    const [editDescription, setEditDescription] = useState<boolean>(false);
    let { id } = useParams();

    const handleClose = () => {
        navigate(-1);
    }

    const handleSubmit = () => {
        if (!taskInfo) return;
        const updatedTaskInfo: TIssue = { ...taskInfo!, description: descriptionRef.current ? descriptionRef.current.value : ''};
        const updatedTasks = tasks.map((task: TTask) => ({
            ...task,
            issues: task.issues.map(issue =>
                issue.id === updatedTaskInfo.id ? updatedTaskInfo : issue
            )
        }));

        setTasks(updatedTasks);
        setEditDescription(false)
    }
    
    useEffect(
        () => {
            const foundIssue = tasks.flatMap((task: TTask) => task.issues).find(issue => issue.id === id);
            setTaskInfo(foundIssue || null);
        }, [id, tasks]
    );

    useEffect(() => {
        if (editDescription && descriptionRef.current && taskInfo) {
            descriptionRef.current.value = taskInfo.description ? taskInfo.description : '';
            descriptionRef.current.focus();
        }
    }, [editDescription, descriptionRef, taskInfo]);    

    return ( 
        taskInfo && (
        <div className="task-card-container">
            <div className="header-section">
                <h2>{taskInfo.name}</h2>
                <section className="modal-btns">
                    <div className="edit-btn" onClick={() => setEditDescription(true)} data-testid={'edit'}></div>
                    <div className="close-btn" onClick={handleClose}></div>
                </section>
            </div>
            {editDescription ? (
                <div className="edit-container">
                    <textarea ref={descriptionRef} />
                    <button className='submit-btn' onClick={handleSubmit}>Submit</button>
                </div>
            ) : (
                <p>{taskInfo.description ? taskInfo.description : 'This task has no description'}</p>
            )}
        </div>
        )
    )
}
  
export default TaskCard;