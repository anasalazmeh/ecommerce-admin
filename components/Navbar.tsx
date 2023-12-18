import React from 'react'
import MainNavabar from './MainNavabar'
import { UserButton, auth } from '@clerk/nextjs'
import StoreSwichter from './StoreSwichter'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'

const Navbar =async () => {
  const {userId} =auth()
  if(!userId)redirect('/sign-in')
  const Items=await prisma.store.findMany({
    where:{
      userId
    }
  })
  return (
    <div className='flex items-center h-16 px-4 border-b-2'>
      <div>
        <StoreSwichter items={Items}/>
      </div>
      <div>
        <MainNavabar  className='mx-6'/>
      </div>
      <div className='ml-auto flex items-center space-x-4'>
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  )
}

export default Navbar