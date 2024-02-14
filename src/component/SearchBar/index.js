import React from 'react'
import './style.css'
const SearchBar = ({handleChange}) => {

  return (
    <div className='searchBar'>
      <input type="text" placeholder="Search by name" onChange={handleChange} name='search'/>
      <select name='price' onChange={handleChange}>
       <option value="2000">upto 2000$</option>
       <option value="1500">upto 1500$</option>
       <option value="1000">upto 1000$</option>
       <option value="500">upto 500$</option>
       <option value="100">upto 100$</option>
      </select>
    </div>
  )
}

export default SearchBar
