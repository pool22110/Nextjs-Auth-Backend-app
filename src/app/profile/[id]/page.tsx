import React from 'react'

export default function page({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center py-2 min-h-screen'>
        <h1>Profile Page</h1>
        <h2 className='p-3 bg-green-200 text-black rounded'>{params.id}</h2>
    </div>
  )
}

