import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Grip, X } from 'lucide-react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { useState } from 'react'
import Image from 'next/image'


interface Props {
  photos: string[]
}

export const MasonryView = ({photos}: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className='flex items-center justify-center gap-1'>
          <Grip className='text-gray-600 h-5 w-5' />
          Mostrar más fotos
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className='max-w-4xl'>
        <header className="flex w-full items-center">
          <X onClick={() => setOpen(false)} className="w-5 h-5 cursor-pointer text-black hover:text-primary-800 transition-colors ease-in" />
          <h3 className="flex-1 md:text-lg text-primary-600 text-center font-medium">Galería de fotos</h3>
        </header>
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} className='overflow-y-auto'>
          <Masonry gutter='12px'>
          { photos.map((photo, index) => 
            <Image 
              unoptimized
              src={photo}
              alt={photo}
              width='600'
              height='400'
              key={index}
              className='object-cover !h-full w-auto'
            />
          )}
          </Masonry>
        </ResponsiveMasonry>
      </AlertDialogContent>
    </AlertDialog>
  )
}
