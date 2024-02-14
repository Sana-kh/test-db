import { useState } from 'react'
import React from 'react'
import axios from 'axios'

function App() {
  const [file, setFile] = useState()

const upload = () =>{
    const formData = new FormData()
    formData.append('file', file)
    axios.post('http://localhost:8000/upload', formData)
    .then(res =>{
      console.log(res.data)
    })
    .catch(err => console.log(err))
}

  
  return (
    <>
      <div>
        <input type = "file" onChange={(e)=> setFile(e.target.files[0])} accept="video/*"/>
        <button type='button' onClick={upload}>Upload</button>
      </div>
      {file && (
        <div>
          <h2>Uploaded </h2>
          <video controls width="500" height="auto">
            <source src={`http://localhost:8000/videos/${file.name}`} type="video/mp4" />
          </video>
          </div>)}
    </>
  )
}

export default App
