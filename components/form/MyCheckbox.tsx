'use client'
import { Checkbox } from '../ui/checkbox'
import { FastField, type FieldProps, getIn } from 'formik'

interface Props extends React.ComponentProps<typeof Checkbox> {
  label?: React.ReactNode
  name: string
  [x: string]: any
}

export const MyCheckbox = ({ name, label = '', ...props }: Props) => {
  return (
    <FastField name={name}>
      {({ field, form }: FieldProps) => (
        <div className='flex flex-col gap-1'>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id={name} 
              {...field}
              {...props}
              onCheckedChange={e => form.setFieldValue(name, e.valueOf())}
            />
            <label htmlFor={name}>
              {label}
            </label>
          </div>
          { getIn(form.errors, name) && getIn(form.touched, name)
            ? <p className='pl-2 text-xs text-red-600'>{getIn(form.errors, name)}</p>
            : null
          }
        </div>
      )}
    </FastField>
  )
}