'use client'
import { MyCheckbox } from '@/components/form/MyCheckbox'
import { MyInput } from '@/components/form/MyInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { MyPhoneInput } from '@/components/form/MyPhoneInput'


export const StickyContact = () => {
  return (
    <section className='hidden md:block h-auto my-6'>
      <div className='sticky top-44 md:max-w-xs lg:max-w-sm'>
        <ContactForm />
      </div>
    </section>
  )
}

const ContactForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        acceptConditions: false
      }}
      onSubmit={console.log}
      validationSchema={SCHEMA}
    >
    { () => 
      <Form className='p-6 rounded-xl shadow-2xl flex flex-col gap-2 !text-sm'>
        <h3 className='text-center text-2xl font-semibold'>Te asesoramos</h3>
        <p className='text-center font-light mb-2'> Déjanos tus datos y pronto estaremos en contacto.</p>
        <MyInput name="name" label="Nombre completo *" />
        <MyInput name="email" label="Correo electrónico *" />
        <MyPhoneInput name='phone' label='Teléfono' />
        <MyCheckbox 
          name="acceptConditions" 
          label={<p className='text-xs font-light'>Acepto y Autorizo el tratamiento de mis datos personales
            en los términos que aparecen a continuación <span className='text-primary-600 hover:underline'>aquí.</span> *</p>} 
        />
        <div className='w-min self-center mt-3'>
          <button type='submit' className='bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold'>Enviar</button>
        </div>
      </Form>
    }
    </Formik>
  )
}

const SCHEMA = Yup.object().shape({
  name: Yup.string().required('Este campo es obligatorio'),
  email: Yup.string().email('Correo electrónico inválido').required('Este campo es obligatorio'),
  phone: Yup.string().required('Este campo es obligatorio'),
  acceptConditions: Yup.boolean().oneOf([true], 'Debes aceptar las condiciones')
})