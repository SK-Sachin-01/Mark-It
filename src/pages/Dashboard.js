import React from 'react'
import MyHighlights from '../components/core/Highlights/MyHighlights' 

const Dashboard = () => {
  return (
    <div className=' w-8/12 p-8 h-auto min-h-screen m-auto mt-10 text-black bg-zinc-200 flex flex-col justify-start p-5 '>
        <h1 className=' w-fit mx-auto font-bold text-5xl font-inter text-gray-900 text-center mb-16 
        border-4 border-gray-900 rounded-xl py-5 px-2'>
          Your Highlights
        </h1>
        <div>
            <MyHighlights/>
        </div>
    </div>
  )
}

export default Dashboard