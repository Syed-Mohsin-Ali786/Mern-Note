import NoteCard from '@/components/NoteCard'
import NoteForm from '@/components/NoteForm'
import React from 'react'

function Notes() {
  return (
    <div className='flex flex-col justify-center items-center'>
    <NoteForm/>
    <NoteCard/>
    </div>
  )
}

export default Notes