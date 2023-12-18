import React, { useEffect, useState } from 'react'
import { Modal } from '../ui/modal'
import { Button } from '../ui/button'
interface AlertModalProps{
  isOpen:boolean,
  onClose:()=>void,
  onConfirm:()=>void,
  loading:boolean
}
const AlertModal = ({isOpen,onClose,onConfirm,loading}:AlertModalProps) => {
  const [isMount,setIsMount]=useState(false);
  useEffect(()=>{
    setIsMount(true)
  },[])
  if(!isMount) return null
  return (
    <Modal
     title='Are you sure?.'
     description='This action be undone.'
     isOpen={isOpen}
     onClose={onClose}
    >
      <div className='pt-6 space-x-2 flex justify-end items-center w-full'>
        <Button variant={'outline'} disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={'destructive'} disabled={loading} onClick={onConfirm}>
          Contiuns
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal