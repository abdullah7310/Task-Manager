import React, { useEffect, useState } from 'react'
import FilterTask from './FilterTask'
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';


function TaskCreate() {

  const [taskData, setTaskData] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [priority, setPriority] = useState("low")
  const [status, setStatus] = useState("pending")
  const [editTask, setEditTask] = useState(null)

  function handleTitle(e) {
    setTitle(e.target.value)
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }

  function handleDate(e) {
    setDate(e.target.value)
  }

  function handlePriority(e) {
    setPriority(e.target.value)
  }
  function handleStatus(e) {
    setStatus(e.target.value)
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Loaded tasks from localStorage: ", storedTasks);
    setTaskData(storedTasks);
  }, []);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskData));
    console.log("Saving tasks to localStorage: ", taskData);
  }, [taskData]);

  function handleEditTask(index) {
    // const updatedTask = [...taskData]
    const editTask = taskData[index]
    // console.log(updatedTask);
    
    setTitle(editTask.title)
    setDescription(editTask.description)
    setDate(editTask.date)
    setPriority(editTask.priority)
    setStatus(editTask.status)
    setEditTask(index)
  }

  function handleTaskData(e) {
    e.preventDefault()
    const createdTask = { title, description, date, priority, status }
    if (editTask !== null) {
      const taskToUpdate = [...taskData]
      taskToUpdate[editTask] = createdTask
      setTaskData(taskToUpdate)
      toast.success("Task updated successfully!");
      setEditTask(null)
    } else {

      setTaskData([...taskData, createdTask])
      console.log(createdTask);
      toast.success("Task created successfully!");
      // form.reset()
      setTitle("");
      setDescription("");
      setDate("");
      setPriority("low");
      setStatus("pending");
    }

  }

  function handleDelete(index) {
    const deletedTask = []
    taskData.forEach((el, ind) => {
      if (ind !== index) {
        deletedTask.push(el)
      }
    })
    setTaskData(deletedTask)
    
    
  }


  return (
    <>
    
      <form onSubmit={handleTaskData}  className=' flex flex-col rounded-2xl bg-orange-100 bg-[url("https://cdn.dribbble.com/users/6846220/screenshots/20068634/giiiiif.gif")] bg-cover bg-center  p-4 m-auto mt-6 w-[40vw]'>
        <div className='flex justify-between items-center'>
          <div className='w-[30%]'>
            <label className='text-center font-semibold font-serif mb-2' htmlFor="title">Task Title : </label></div>
          <div className='w-[68%] '>
            <input required placeholder='Enter Title' value={title} onChange={handleTitle} className='w-full px-2 py-2 mb-4 border-2 border-black' type="text" />
          </div>
        </div>
        <div className='flex justify-between '>
          <div className='w-[30%]'>
          <label className='text-center font-semibold font-serif mb-2' htmlFor="description">Task Description: </label>
          </div>
          <div className='w-[68%]'>
          <input required placeholder='Enter description....' value={description} onChange={handleDescription} className='w-full px-2 py-2 mb-4 border-2 border-black' type="text" />
          </div>
        </div>
        <div className='flex justify-between'>
        <div className='w-[30%]'>
          <label className='text-center font-semibold font-serif mb-2' htmlFor="date">Enter Date : </label>
          </div>
          <div className='w-[68%]'>
          <input required value={date} onChange={handleDate} className='w-full px-2 py-2 mb-4 border-2 border-black' type="date" />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='w-[30%]'>
          <label className='text-center font-semibold font-serif mb-2' htmlFor="priority">Choose Priority : </label>
          </div>
          <div className='w-[68%]'>
          <select required value={priority} onChange={handlePriority} className='w-full px-2 py-2 mb-4 border-2 border-black' name="" id="">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          </div>
        </div>
        <div className='flex justify-between'>
        <div className='w-[30%]'>
          <label className='text-center font-semibold font-serif mb-2' htmlFor="status">Choose Status : </label>
          </div>
          <div className='w-[68%]'>
          <select required value={status} onChange={handleStatus} className='w-full px-2 py-2 mb-4 border-2 border-black' name="" id="">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          </div>
        </div>
        <div className=' m-auto'>
        <button className='w-full text rounded-lg bg-purple-300 hover:bg-purple-400 active:bg-orange-200 font-bold px-[20px] py-2 mb-4 flex gap-2 items-center'> <FaPlus/>  {editTask !== null ? "Edit Task" : "Create Task"}</button>
        </div>
      </form>
      <FilterTask tasks={taskData} onDelete={handleDelete} onEdit={handleEditTask} />
      <ToastContainer />
    </>

  )
}

export default TaskCreate
