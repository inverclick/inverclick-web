'use client'
import { FastField, type FieldProps, getIn } from 'formik'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Props extends React.ComponentProps<typeof PhoneInput> {
  label?: string
  name: string
  placeholder?: string
  [x: string]: any
}

export const MyPhoneInput = ({ name, label = '', placeholder = '', ...props }: Props) => {
  return (
    <FastField name={name}>
      {({ field, form }: FieldProps) => (
        <div className='flex flex-col w-full gap-1'>
          {label.length ? <p>{label}</p> : null}
          <PhoneInput
            inputClass='!w-full !h-[40px] !border-black'
            containerClass='!border-black'
            buttonClass='!border-black'
            searchClass='!border-black'
            value={field.value}
            preferredCountries={['co', 'us', 'es']}
            onChange={phone => form.setFieldValue(name, phone)}
          />
          { getIn(form.errors, name) && getIn(form.touched, name)
            ? <p className='pl-2 text-xs text-red-600'>{getIn(form.errors, name)}</p>
            : null
          }
        </div>
      )}
    </FastField>
  )
}