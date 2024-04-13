'use client'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Copy, MessageCircle, Share, X } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

export const ShareProject = () => {
  const [open, setOpen] = useState(false)
  
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('¡Enlace copiado!')
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${window?.location.href}`)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <span 
          className='flex gap-2 text-sm md:text-base underline hover:text-primary-600 transition-colors ease-in cursor-pointer'
          onClick={() => setOpen(true)}
        >
          <Share className='w-4 h-4 md:w-5 md:h-5' />
          Compartir
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <header className="flex w-full items-center">
          <X onClick={() => setOpen(false)} className="w-5 h-5 cursor-pointer text-black hover:text-primary-800 transition-colors ease-in" />
          <h3 className="flex-1 md:text-lg text-primary-600 text-center font-medium">Comparte este proyecto</h3>
        </header>
        <div className='grid grid-cols-1 sm:grid-cols-2 mt-2 gap-3'>
          <button 
            onClick={copyLink}
            className='flex gap-2 justify-center items-center border border-black p-2 rounded-md hover:bg-primary-50 hover:border-primary-600 transition-colors ease-in hover:text-primary-700'
          >
            <Copy className='w-4 h-4 md:w-5 md:h-5' />
            Copiar link
          </button>
          <button
            onClick={shareWhatsApp}
            className='flex gap-2 justify-center items-center border border-black p-2 rounded-md hover:bg-primary-50 hover:border-primary-600 transition-colors ease-in hover:text-primary-700'
          >
            <MessageCircle className='w-4 h-4 md:w-5 md:h-5' />
            WhatsApp
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
