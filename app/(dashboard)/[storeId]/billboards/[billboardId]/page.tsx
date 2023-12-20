import React from 'react'
import BillboardForm from './_Components/BillboardForm'
import prisma from '@/prisma/client'

const BillboarPage = async ({params}:{params:{billboardId:string}}) => {
  const billboard=await prisma.billboards.findUnique({
    where:{id:params.billboardId}
  })

  return (
    <div className='flex-col '>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboarPage