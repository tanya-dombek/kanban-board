export type TIssue = {
    id: string;
    description: string;
    name: string;
};

export type TTask = {
    title: string;
    issues: TIssue[];
};

export type TTaskState = {
    tasks: TTask[],
    setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
}

export type TOption = {
    value: string,
    label: string | React.ReactNode
}

export type TOnSelect = (option: TOption) => void;