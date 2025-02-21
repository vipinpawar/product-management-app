import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1 className='text-3xl bold'><Link to={"/login"}>Login Now</Link></h1>
    </div>
  )
}

export default Home
