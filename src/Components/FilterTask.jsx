import React, { useEffect, useState } from 'react'
import ListDisplay from './ListDisplay';
import { IoFilter } from "react-icons/io5";
import NoData from './NoData';

function FilterTask({ tasks, onDelete, onEdit }) {
    console.log("this is task", tasks);
    const [priority, setPriority] = useState("all")
    const [status, setStatus] = useState("all")
    const [filteredTask, setFilteredTask] = useState([])

    useEffect(() => {
        setFilteredTask(tasks)
    }, [tasks])

    function handleFilteredTask() {
        const filterTaskArr = []
        if (tasks) {
            tasks.forEach((el) => {
                if ((priority === "all" || priority.toLowerCase() === el.priority.toLowerCase()) && (status === "all" || el.status.toLowerCase() === status)) {
                    filterTaskArr.push(el)
                    console.log(filterTaskArr);
                }
            })

            if (filterTaskArr.length === 0) {
                alert("no data is here....")
                // {<NoData />}
            }
           

            setFilteredTask(filterTaskArr)
            console.log("this is filtered", filterTaskArr);

        }
    }






    return (
        <>
            {/* <h1 className='font-serif font-bold text-center text-2xl m-8'>Filter Tasks</h1> */}
            <div className='rounded-xl shadow-xl bg-purple-100 pl-4 mb-4 px-2 mt-8 flex items-center justify-center'>
                <label className='font-serif font-bold mr-2' htmlFor="priority">Choose Priority : </label>
                <select value={priority} onChange={(el) => setPriority(el.target.value)} className="w-1/3 py-2 px-3 hover:bg-orange-300 rounded-lg bg-orange-200">
                    <option value="all">all</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <label className='font-serif font-bold mr-2 ml-6 ' htmlFor="status">Choose Status : </label>
                <select value={status} onChange={(el) => setStatus(el.target.value)} className="w-1/3 py-2 px-3 bg-orange-200 hover:bg-orange-300  rounded-lg" id="">
                    <option value="all">all</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>

                <button onClick={() => handleFilteredTask(tasks)} className='w-1/6 ml-4 py-2 px-3 bg-blue-500 text-white font-serif font-bold hover:bg-blue-800 rounded-lg  flex items-center active:bg-orange-300 gap-2'><IoFilter size={20}/> <h1>Apply filter</h1></button>
            </div>
            <ListDisplay filteredTask={filteredTask} deleteFunction={onDelete} editTask={onEdit} />

        </>
    )
}

export default FilterTask
