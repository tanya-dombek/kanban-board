import React, {useEffect, useState} from "react";
import { Routes, Route } from 'react-router-dom';
import Header from "./header/header";
import Content from "./content/content";
import Footer from "./footer/footer";
import TaskCard from "./task-card/task-card";
import { initLocalStorage, manageLocalStorage, getLocalStorage } from "../utils/local-storage";
import { TTask } from "../utils/types";

function App() {
  const [tasks, setTasks] = useState<TTask[]>(getLocalStorage());
  const taskIdPath = "/tasks/:id";

  useEffect(() => {
      manageLocalStorage(tasks);
  }, [tasks]);

  useEffect(() => {
    if (tasks.length === 0) {
      initLocalStorage();
      setTasks(getLocalStorage());
    }
  }, []);

  return (
    <div className='app'>
      <Header />
      <Routes >
        <Route path="/" element={<Content tasks={tasks} setTasks={setTasks}/>}/>
        <Route path={taskIdPath} element={<TaskCard tasks={tasks} setTasks={setTasks}/>}/>
      </Routes>
      <Footer tasks={tasks}/>
    </div>
  );
}

export default App;
