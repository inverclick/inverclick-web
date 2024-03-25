'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const ProjectFilters = ({onRedirect}: any) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="!text-sm font-normal py-1 h-8 hover:bg-primary-100 hover:text-primary-600 ease-in">Filtros</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0  md:w-[700px]">
        <header className="flex w-full items-center border-b border-zinc-300 py-3 px-6">
          <X onClick={() => setOpen(false)} className="w-5 h-5 cursor-pointer text-primary-600" />
          <h3 className="flex-1 text-lg text-primary-600 text-center font-semibold">Filtros</h3>
        </header>
        <main className="px-6">
          <h4>Tipo de propiedad</h4>
          <div>
            <button>Casa</button>
            <button
              onClick={() => {
                const UrlParams = new URLSearchParams({type: 'Apartamento'}).toString()
                const url = `${window.location.origin}/projects?${UrlParams}`
                router.push(url)
              }}
            >Apartamento</button>
          </div>
        </main>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
