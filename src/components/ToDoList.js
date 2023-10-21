import React from "react";
import { useState, useEffect } from "react";
import localforage from "localforage";
import { UilTrashAlt,UilEdit,UilCheckCircle,UilCheck } from '@iconscout/react-unicons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'


const ToDoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModal, setUpdateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateTask, setUpdateTask] = useState("");
  const [checked, setChecked] = useState(false);
  const [todo, setTodo] = useState([
    {"id":1, "title":"task1", "description":"my description", "status":false},
    {"id":2, "title":"task1", "description":"my description", "status":false}
  ]);
  
 


  // Load tasks from local storage when the component mounts
  useEffect(() => {
    // Load tasks from localForage when the component mounts
    localforage.getItem("tasks").then((tasks) => {
      if (tasks) {
        setTodo(tasks);
      }
    });
  }, []);

  // Function to save tasks to localForage
  const saveTasksToLocalForage = (tasks) => {
    localforage.setItem("tasks", tasks);
  };

  // Update the tasks in localForage whenever 'todo' changes
  useEffect(() => {
    saveTasksToLocalForage(todo);
  }, [todo]);


  
  const openModal = () => {
    setIsModalOpen(true);

    
    // Reset selected task when opening the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeUpdate = () => {
    setUpdateModal(false);
    setUpdateTask("");
  };

  const UpdateModal = () => {
    setUpdateModal(true);
  };

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.split(' ');

    if (words.length <= 5) {
      setTitle(inputValue);
    }
  };

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.split(' ');

    if (words.length <= 10) {
      setDescription(inputValue);
    }
  };

  const addTask = () => {

    
    if (title && description) {
      let num = todo.length + 1;
      let newEntry = {
        id: num,
        title: title,
        description: description,
        status: false,
      };
      setTodo([newEntry, ...todo]);
      setTitle("");
      setDescription("");
      closeModal();
    }else{
      alert("Please write Title and Description")
    }
  };

  const deleteTask = (id) => {
    let deleteNewTask = todo.filter((task) => task.id !== id);
    setTodo(deleteNewTask);
  };

  const ChangeTask = (e) => {
    const { name, value } = e.target;
    setUpdateTask((prevUpdateTask) => ({
      ...prevUpdateTask,
      [name]: value,
    }));
  };

  const updateCurrTask = () => {
    if (updateTask.id && updateTask.title && updateTask.description){
    let updatedTasks = todo.map((task) =>
      task.id === updateTask.id ? updateTask : task
    );
    setTodo(updatedTasks);
    setUpdateTask("");
    closeUpdate();
    }else{
      alert("Please update your task")
    }
  };

  const markDone = (id) => {
    const newTasks = todo.map((task) => {
      if (task.id === id){
        return ({ ...task, status: !task.status, checked: !task.checked })
      }
      
      return task;
    });
    setTodo(newTasks);
    setChecked(!checked);
  }

  return (
    <div className="px-8 pt-4 container mb-8 ">
      <div className="flex flex-col items-center justify-center py-8 gap-4 todolist mb-8">
      <h1 className="head">MY TO DO LIST</h1>
      
        <button
          className="shadow-md text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 px-4 py-2 rounded"
          onClick={openModal}
        >
          Create Task
        </button>
      </div>

      {/* --------cards--------- */}
      <h2 className="text-center">My Tasks</h2>
      <div className="cards">
        {todo.length === 0 ? (
          <div className="No-records text-center"><h1 >No Records found...plz add some</h1></div>
          
        ) : (
          ""
        )}
        {todo &&
          todo
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((task, index) => (
              <React.Fragment key={task.id}>
                <div className="card-box rounded p-4 bg-white flex flex-col justify-between items-start gap-4">
                  <h1 className="font-bold text-center">Task : {index + 1}</h1>

                  

                  <div className="flex flex-col items-start justify-between gap-5 ">
                  <h1 className={`font-medium ${task.status ? 'line-through' : ''}`}>Task : {task.title}</h1>
                  <p className={`text-gray-600 ${task.status ? 'line-through' : ''}`}><span className="text-black">About task : </span>{task.description}</p>
                  </div>
                  {task.status && <div className="text-center complete"><FontAwesomeIcon icon={faCheckDouble} className="text-green-500 transition-all" /><br/><span className="ml-2 text-gray-600">Task completed</span></div>}

                  

                  <div className="btns flex items-center justify-end  gap-4 text-xl">
                  <button 
                  onClick={(e) => markDone(task.id)}
                  title="Completed / Not Completed"
                >
                  <UilCheckCircle checked={task.checked}
          style={
            task.checked ? {'backgroundColor' :'green', 'borderRadius' : '50%', 'color' : 'white' }: {'backgroundColor' : '#fff'}
          }/>
                </button>
                {!task.status && (
    
                    <button className="text-5xl"
                      onClick={() => {
                        UpdateModal();
                        setUpdateTask({
                          id: task.id,
                          title: task.title,
                          description: task.description,
                        });
                      }}
                      title="Edit"
                    >
                     <UilEdit className="text-5xl" />
                    </button>
                )}
                    <button onClick={() => deleteTask(task.id)} title="Delete">
                    <UilTrashAlt />
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
            
      </div>

      {/* for add task */}
      {isModalOpen && (
        <div className="modal">
          <div className="flex flex-col items-center justify-center gap-2 model-container transition-transform">
            <h1>Add Your Task</h1>
            <div className="content">
              <form action="" className="form">
                <label htmlFor="">Title:</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                />
                <br />
                <label htmlFor="">Description:</label>
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </form>
            </div>
            <div className="flex items-center justify-end gap-8">
              <button
                onClick={closeModal}
                className=" bg-red-500 rounded py-0.5 px-2 text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 shadow"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className=" text-white bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded py-0.5 px-2 text-white dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {/* For update task */}
      {isUpdateModal && (
        <div className="modal2">
          <div className="flex flex-col items-center justify-center gap-2 model-container transition-transform">
            <h1>Update Your Task</h1>
            <div className="content">
              <form action="" className="form">
                <label htmlFor="">Title:</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={updateTask && updateTask.title}
                  name="title"
                  onChange={(e) => ChangeTask(e)}
                />
                <br />
                <label htmlFor="">Description:</label>
                <textarea
                  placeholder="Description"
                  value={updateTask && updateTask.description}
                  name="description"
                  onChange={(e) => ChangeTask(e)}
                />
              </form>
            </div>
            <div className="flex items-center justify-end gap-8">
              <button
                onClick={() => setUpdateModal(false)}
                className=" bg-red-500 rounded py-0.5 px-2 text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 shadow"
              >
                Cancel
              </button>
              <button
                onClick={updateCurrTask}
                className=" text-white bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded py-0.5 px-2 text-white dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
