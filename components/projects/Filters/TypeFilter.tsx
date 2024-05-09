import { IHOUSING_TYPE } from "@/types/project"
import { Building, Home, LandPlot, Warehouse } from "lucide-react"

const OPTIONS_ICON = [
  Building,
  Home,
  Warehouse,
  LandPlot
]

interface Props {
  currentTypes: string[]
  setCurrentTypes: (value: string[]) => void
  housingTypes: IHOUSING_TYPE[]
}

export const TypeFilter = ({currentTypes, setCurrentTypes, housingTypes}: Props) => {
  const onChange = (type: string) => {    
    const newTypes = (currentTypes.includes(type) ? currentTypes.filter(t => t !== type) : [...currentTypes, type]).filter(t => t.length)
    setCurrentTypes(newTypes)
  }

  return (
    <section className="flex flex-col gap-3">
      <h4 className="font-medium md:text-lg">Tipo de propiedad</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      { housingTypes.map(({ label, _id }, index) => {
        const Icon = OPTIONS_ICON[index]
        return (
          <button 
            key={_id}
            onClick={() => onChange(_id)}
            className={`flex flex-col gap-1 border border-black rounded-lg p-3 hover:bg-primary-800 hover:text-white hover:border-primary-800 transition-colors ease-in ${currentTypes.includes(_id) ? 'bg-primary-600 text-white border-primary-600' : ''}`}
          >
            <Icon className="h-5 w-5 md:h-7 md:w-7 " />
            <span className="text-sm md:text-base font-medium">{label}</span>
          </button>
        )
      }
      )}
      </div>
    </section>
  )
}