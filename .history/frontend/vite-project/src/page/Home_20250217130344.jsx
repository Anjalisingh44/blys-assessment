import React from 'react'
import logo from '../assets/logo.png';
 
const Home = () => {
  return (
   <div className='relative'>
       <div className="absolute inset-0 bg-cover bg-center opacity-40 " style={{ backgroundImage: `url(${logo})` }}></div>
       
    <div className='flex justify-center items-center h-screen text-3xl font-bold'><span className='text-indigo-500'>Welcome to&nbsp;</span> <span className='text-lime-500'> Softvista Creations</span> 

</div>
   </div>
  )
}

export default Home