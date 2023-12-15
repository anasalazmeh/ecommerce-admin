"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetupPage=()=>{
  const onOpen=useStoreModal(set=>set.onOpen)
  const isOpne=useStoreModal(set=>set.isOpen)
  useEffect(()=>{
    if(!isOpne)
    onOpen()
  },[isOpne,onOpen])
  return null;
}

export default SetupPage
