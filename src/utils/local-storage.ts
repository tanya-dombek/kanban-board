import { TTask } from "./types";
const data: TTask[] = [
    {
        title: 'backlog',
        issues: [],
    },
    {
        title: 'ready',
        issues: [],
   },
   {
        title: 'in progress',
        issues: [],
    },
    {
        title: 'finished',
        issues: [],
    }
];

export const initLocalStorage = () => {
    manageLocalStorage(data);
}

export const manageLocalStorage = (tasks: TTask[] | []) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const getLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}