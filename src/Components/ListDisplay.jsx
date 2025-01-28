import React, { useEffect, useState } from 'react'
import FilterTask from './FilterTask'
import { MdEdit, MdDelete } from "react-icons/md";
function ListDisplay({ filteredTask, deleteFunction, editTask }) {
    const [firstList, setFirstList] = useState(0)
    // const [paginatedList, setPaginatedList] = useState(filteredTask)

    const showFiveList = 5
    const endList = firstList + showFiveList

    let totalTask = filteredTask.length
    console.log(totalTask, "this is total task");
    let quotient
    let totalPage
    if (totalTask % showFiveList === 0) {
        quotient = totalTask / showFiveList
        totalPage = Math.floor(quotient)
    } else {
        quotient = totalTask / showFiveList
        totalPage = Math.floor(quotient) + 1
    }

    let currentPage = Math.floor(firstList / showFiveList)
    let completedTask = 0
    let completePercentage
    let pendingPercentage

    if (totalTask > 0) {
        for (let i = 0; i < filteredTask.length; i++) {
            if (filteredTask[i].status.toLowerCase() === "completed") {
                completedTask += 1
            }
        }
        completePercentage = ((completedTask / totalTask) * 100).toFixed(2)
        pendingPercentage = (100 - completePercentage).toFixed(2)

    }


    useEffect(() => {
        // Reset firstList to 0 when filtered tasks change
        setFirstList(0);
    }, [filteredTask]);
    // if (filteredTask.length > 0) {
    //     setFirstList(0)
    // }

    function handlePrevTask() {
        // alert("previous value.....")

        if (firstList > 0) {
            setFirstList(firstList - showFiveList)
        }
    }
    function handleNextTask() {
        // alert("next taskk.....")
        if (endList < filteredTask.length) {
            setFirstList(firstList + showFiveList)
        }
    }




    return (
        <div>
            <h1 className='font-semibold text-center text-2xl mt-8 font-serif '>Your Tasks</h1>
            <hr className='border-1 my-3' />
            <div className='flex  justify-between rounded-lg py-4 px-2'>
                <div className='flex w-[50%] justify-between flex-col'>
                    
                    {filteredTask.map((el, ind) => {
                        if (ind >= firstList && ind < endList) {
                            return (
                                <div key={ind} className=' bg-purple-100  w-full  rounded-2xl mx-3 my-4 shadow-2xl px-6 py-4'>
                                    <div className='font-semibold  font-serif rounded-md  py-2 flex justify-between'> <h1 className='bg-orange-100 px-3 rounded-lg py-2 hover:bg-purple-200'>Title : {el.title}</h1> <h1 className='bg-orange-100 px-3 rounded-lg py-2 hover:bg-purple-200'>Date : {el.date}</h1> </div>
                                    <div className=' font-semibold font-serif hover:bg-purple-200 rounded-md bg-orange-100 py-2 px-4 my-3 break-words'> <h1>Description : {el.description}</h1> </div>
                                    <div className=' font-semibold font-serif rounded-md  py-2  flex items-center justify-between'> <h1 className='bg-orange-100 px-3 hover:bg-purple-200 rounded-lg py-2'>Priority : {el.priority}</h1> <h1 className='bg-orange-100 px-3 rounded-lg py-2 hover:bg-purple-200'>Status : {el.status}</h1> </div>
                                    <div className='flex w-full items-center justify-center mt-3 gap-3'>
                                    <button onClick={() => deleteFunction(ind)} className='px-3 py-2  bg-purple-400 text-sm rounded-lg active:bg-orange-100 font-bold flex items-center gap-2 hover:bg-purple-500'><MdDelete  size={20}/> Delete</button> <button className='px-3 py-2 active:bg-orange-100 bg-purple-400 flex items-center gap-2 hover:bg-purple-500 text-sm rounded-lg font-bold' onClick={() => editTask(ind)}><MdEdit size={20} /> Edit</button> 
                                    </div>
                                </div>

                            )
                        }

                    })}
                </div>

                <div className='w-[25%] h-[250px] rounded-lg hover:shadow-2xl transition-shadow duration-[200ms]   bg-orange-200 py-2 px-3 sticky top-[12vh]'>
                    <h1 className='text-center font-semibold font-serif py-2 hover:bg-purple-300 bg-purple-200 rounded'>Progress Tracker</h1>
                    <h1 className='text-center mt-3'><strong>Total Task :</strong> {totalTask}</h1>
                    <h1 className='text-center font-serif mt-3'>Completed Task : {completePercentage}%</h1>
                    <h1 className='text-center font-serif mt-3'>Pending Task : {pendingPercentage}%</h1>
                </div>
            </div>
            <hr className='border-1 my-5' />
            <div className=' flex justify-between items-center m-auto w-[25vw]'>
                <button onClick={handlePrevTask} disabled={firstList === 0} className={`border-2  py-2 px-3 ${firstList === 0 ? 'bg-slate-400 cursor-not-allowed  text-white font-bold font-serif' : 'bg-black border-black font-bold font-serif text-white'} rounded-lg`}>Previous</button>
                <div>Page {currentPage + 1}/{totalPage}</div>
                <button onClick={handleNextTask} className={`border-2  py-2 px-3 ${endList >= filteredTask.length ? 'bg-slate-400 cursor-not-allowed  text-white font-bold font-serif' : 'bg-black border-black font-bold font-serif text-white'} rounded-lg`}>Next</button>
            </div>
        </div>
    )
}

export default ListDisplay
