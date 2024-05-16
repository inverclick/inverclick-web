'use client'
import Typewriter from 'typewriter-effect';

export const DynamicPhrases = () => {

  return (
    <div className='text-center md:text-left text-base md:text-lg'>
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('Asegura tu futuro invirtiendo en propiedad raíz ')
            .pauseFor(2500)
            .deleteAll()
            .typeString('Invierte inteligentemente: tu patrimonio creciendo en Colombia')
            .pauseFor(2500)
            .deleteAll()
            .typeString('Maximiza tu capital vía valorización')
            .pauseFor(2500)
            .deleteAll()
            .start()
        }}
        options={{
          loop: true,
          delay: 25,
          deleteSpeed: 5
        }}
      />
    </div>
  )
}