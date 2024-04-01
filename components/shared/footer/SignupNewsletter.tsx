'use client'
import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { MyInput } from '@/components/form/MyInput'

export const SignupNewsletter = () => {
  return (
    <Formik 
      initialValues={{email: ''}}
      validationSchema={SCHEMA}
      onSubmit={console.log}
    >
    { () => 
      <Form className='flex flex-col gap-2 md:max-w-sm xl:max-w-md text-base md:text-lg'>
        <p className='max-w-xs'>Suscríbete <span className='text-purple-600 font-medium'>GRATIS</span> para recibir consejos y noticias de inversión.</p>
        <MyInput name='email' placeholder='Ingresa tu correo electrónico' className='w-full'/>
        <div className='flex items-end justify-end'>
          <button type='submit' className='!text-base bg-primary-600 text-white font-medium hover:bg-primary-800 transition-colors ease-in px-4 py-2 rounded-md'>
            Suscribirse
          </button>
        </div>
      </Form>
    }
    </Formik>
  )
}

const SCHEMA = Yup.object().shape({
  email: Yup.string().email('Formato de email inválido').required('Campo requerido')
})
