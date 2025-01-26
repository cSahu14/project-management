'use client'
import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'

type Props = {
    params: {id: string}
}

const Project = ({params}: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id} = params
    const [ activeTab, setActiveTab ] = useState("Borad");
    const [ isModalNewTaskOpen, setIsModalNewTaskOpen ] = useState(false)
  return (
    <div>
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* {activeTab === "Board" && ( */}
            {/* // <Board /> */}
        {/* )} */}
    </div>
  )
}

export default Project