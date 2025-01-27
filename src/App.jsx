import React from 'react'
import TaskCreate from './Components/TaskCreate'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Navbar/>
    <div className='pt-[11vh]'>
      <h1 className='text-center font-bold font-serif mb-[10px]  text-2xl'>Task Manager</h1>
      <div className=' w-[90vw] px-6 py-4 m-auto my-4 rounded-2xl shadow-2xl bg-purple-200'>
      <TaskCreate />
      
      </div>
      </div>
      <Footer />
    </>
  )
}

export default App
