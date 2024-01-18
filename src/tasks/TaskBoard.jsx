import { useState } from "react";
import Search from "./Search";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "I'm learn javascript",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) =>{
    if(isAdd){
      setTasks([...tasks, newTask]);
    }else{
      setTasks(
        tasks.map((task)=> {
          if(task.id === newTask.id){
            return newTask
        }
        return task;
      })
      );
    }
    setShowModal(false);
  }

  const handleEdit = (edit) =>{
    setTaskToUpdate(edit);
    setShowModal(true);
  }

  const handleModalClose = () =>{
    setShowModal(false);
    setTaskToUpdate(null);
  }

  const handleDelete = (deleteId) =>{
    const taskAfterDelete = tasks.filter(task => task.id !== deleteId);
    setTasks(taskAfterDelete);
  }

  const handleAllDelete = () =>{
    tasks.length = 0;
    setTasks([...tasks]);
  }

  const handleFavorite = (taskId) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  }

  const handleSearch = (searchData)=>{
    const filtered = tasks.filter(task => task.title.toLowerCase().includes(searchData.toLowerCase()));
    setTasks([...filtered]);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && <AddTaskModal taskToUpdate={taskToUpdate} onSave={handleAddEditTask} onCloseClick={handleModalClose} />}
      <div className="container">
        <div className="p-2 flex justify-end">
          <Search onSearch={handleSearch} />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction onAddClick={()=> setShowModal(true)} onAllDelete={handleAllDelete}/>
          
          {tasks.length > 0 ?  <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onFavorite={handleFavorite}/> : "No task is found" }
        </div>
      </div>
    </section>
  );
}
