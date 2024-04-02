import { FastField, type FieldProps, getIn } from 'formik'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Props extends React.ComponentProps<typeof Select> {
  label?: string
  name: string
  placeholder?: string
  options: Array<{ value: string, label: string }>
  [x: string]: any
}

export const MySelect = ({ name, label = '', placeholder = '', options, ...props }: Props) => {
  return (
    <FastField name={name}>
      {({ field, form }: FieldProps) => (
        <div className='flex flex-col w-full gap-1'>
          {label.length ? <p>{label}</p> : null}
          <Select {...props} value={field.value} onValueChange={async v => await form.setFieldValue(name, v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
              { options.map(({ value, label }) =>
                <SelectItem key={value} value={value}>{label}</SelectItem>
              )}
              </SelectGroup>
            </SelectContent>
          </Select>
          { getIn(form.errors, name) && getIn(form.touched, name)
            ? <p className='pl-2 text-xs text-red-600'>{getIn(form.errors, name)}</p>
            : null
          }
        </div>
      )}
    </FastField>
  )
}