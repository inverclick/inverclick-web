import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { ENV_VARS } from "@/global/env";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerWithArrowFirst,
} from "@inverclick/inverclick-ui/accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad y tratamiento de datos personales",
  description:
    "Conoce las política de privacidad y tratamiento de datos personales",
  openGraph: {
    url: ENV_VARS.BASE_URL + "/policy",
    title: "Política de privacidad y tratamiento de datos personales",
    description:
      "Inverclick S.A.S, reconociendo la relevancia de los datos personales y la responsabilidad asumida con respecto a los titulares de dicha información (los &quotTitulares&quot o el &quotTitular&quot), presenta a los interesados la Política de Tratamiento de Datos Personales (la &quotPolítica de Tratamiento de Datos&quot o la &quotPolítica&quot). Esto se realiza en cumplimiento de lo establecido por la Ley 1581 de 2012, el Decreto 1074 de 2015 y otras normas que las modifiquen, adicionen o complementen.",
  },
};

export default function Index() {
  return (
    <main>
      <Header />
      <article className="p-content mb-20 flex flex-col">
        <h1 className="text-3xl font-medium">
          POLÍTICA DE PRIVACIDAD Y DE TRATAMIENTO DE DATOS PERSONALES
        </h1>
        <span>V.1 - 2024</span>
        <p className="mt-2">
          <b>Inverclick S.A.S</b>, reconociendo la relevancia de los datos
          personales y la responsabilidad asumida con respecto a los titulares
          de dicha información (los &quot;Titulares&quot; o el
          &quot;Titular&quot;), presenta a los interesados la Política de
          Tratamiento de Datos Personales (la &quot;Política de Tratamiento de
          Datos&quot; o la &quot;Política&quot;). Esto se realiza en
          cumplimiento de lo establecido por la Ley 1581 de 2012, el Decreto
          1074 de 2015 y otras normas que las modifiquen, adicionen o
          complementen.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="1">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              I. DEFINICIONES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Para facilitar la interpretación y proporcionar una mayor
                comprensión de la Política de Tratamiento de Datos, se adoptan
                las siguientes definiciones:
              </p>
              <p>
                <b>Autorización:</b> es el consentimiento previo, expreso e
                informado otorgado al responsable de los datos personales por
                parte del Titular para realizar el tratamiento de sus datos
                personales.
              </p>
              <p>
                <b>Bases de datos:</b> es el conjunto organizado de datos
                personales que son objeto de tratamiento.
              </p>
              <p>
                <b>Colaborador:</b> es toda persona natural con la que{" "}
                <b>Inverclick</b>
                tiene un contrato de trabajo vigente, de acuerdo con la
                normativa aplicable.
              </p>
              <p>
                <b>Datos personales:</b> cualquier información que esté
                vinculada o pueda asociarse a una o varias personas naturales
                determinadas o determinables.
              </p>
              <p>
                <b>Datos privados:</b> son todos los datos personales que, por
                su naturaleza íntima o reservada, sólo son relevantes para el
                Titular.
              </p>
              <p>
                <b>Datos públicos:</b> son todos los datos personales que se
                refieren a un interés general, como los datos relativos al
                estado civil de las personas, su profesión u oficio, y su
                calidad de comerciante o servidor público. Por su naturaleza,
                los datos públicos pueden estar contenidos, entre otros, en
                registros públicos, documentos públicos, gacetas y boletines
                oficiales, y sentencias judiciales debidamente ejecutoriadas que
                no estén sometidas a reserva.
              </p>
              <p>
                <b>Datos semiprivados:</b> son aquellos datos personales que no
                son íntimos, reservados ni públicos, y cuya divulgación o
                conocimiento puede interesar tanto al Titular como a ciertos
                sectores o a la sociedad en general.
              </p>
              <p>
                <b>Datos sensibles:</b> son los datos personales que afectan la
                intimidad del Titular o que, si se usan de manera incorrecta,
                pueden dar lugar a su discriminación.
              </p>
              <p>
                <b>Encargado del tratamiento:</b> es la persona, ya sea natural
                o jurídica, pública o privada, que, de manera individual o en
                colaboración con otros, lleva a cabo el tratamiento de datos
                personales en nombre del responsable de dichos datos.
              </p>
              <p>
                <b>Responsable del tratamiento:</b> es la persona, ya sea
                natural o jurídica, pública o privada, que individualmente o en
                colaboración con otros, toma decisiones sobre la base de datos
                y/o el tratamiento de los datos personales. De acuerdo a la Ley
                1581 de 2012, Inverclick S.A.S es quien para efectos de la
                presente Política, será el responsable de los datos personales
                en los términos establecidos.
              </p>
              <p>
                <b>Razón social:</b> es el nombre con el que se constituye una
                empresa y que aparece como tal en el documento público o privado
                de constitución o en los documentos posteriores que la reforman.
              </p>
              <div className="ml-10 space-y-2">
                <p>Razón social: Inverclick S.A.S, </p>
                <p>Dirección: Carrera 11 # 48-136 Maraya, Pereira Colombia.</p>
                <p>
                  Sitio web: <a href="www.inverclick.com">www.inverclick.com</a>
                </p>
                <p>
                  Correo electrónico de contacto:{" "}
                  <a href="mailto:contactenos@inverclick.com">
                    contactenos@inverclick.com
                  </a>
                </p>
              </div>
              <p>
                <b>Titular:</b> es aquella persona natural cuyos datos
                personales son objeto de tratamiento y hacen parte de las bases
                de datos del responsable.
              </p>
              <p>
                <b>Transferencia:</b> se refiere al proceso en el que el
                responsable y/o encargado del tratamiento de datos personales en
                Colombia envía dicha información a un destinatario que también
                es responsable del tratamiento, ya sea dentro o fuera del país.
              </p>
              <p>
                <b>Transmisión:</b> es el tratamiento de datos personales que
                implica la comunicación de estos dentro o fuera del territorio
                de la República de Colombia, con el fin de que el encargado
                realice el tratamiento en nombre del responsable.
              </p>
              <p>
                <b>Tratamiento:</b> engloba cualquier operación o conjunto de
                operaciones que el responsable de los datos personales o el
                encargado realice sobre dichos datos, como la recolección,
                almacenamiento, uso, circulación o eliminación.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              II. MARCO NORMATIVO
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Para aquellas situaciones no reguladas por la Política de
                Tratamiento de Datos, se estará a lo dispuesto por:
              </p>
              <ul className="ml-10 list-disc">
                <li>Artículo 15 de la Constitución Política de Colombia.</li>
                <li>Ley Estatutaria 1266 de 2008.</li>
                <li>Ley 1273 de 2009.</li>
                <li>Ley Estatutaria 1581 de 2012.</li>
                <li>Decreto 1377 de 2013.</li>
                <li>Decreto 886 de 2014.</li>
                <li>Decreto 1074 de 2015.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              III. OBJETO
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                El propósito de esta Política de Tratamiento de Datos es
                establecer normas para todas las actividades relacionadas con el
                manejo al que serán sometidos los datos personales de los
                Titulares, especialmente en lo que respecta a la finalidad del
                tratamiento, los derechos de los Titulares de los datos
                personales, los compromisos asumidos por <b>Inverclick</b> con
                los Titulares en su rol de responsable del tratamiento y las
                herramientas implementadas para que los Titulares puedan ejercer
                adecuadamente sus derechos.
              </p>
              <p>
                Todos los Colaboradores, contratistas, aliados y terceros que
                tengan relación con <b>Inverclick</b> y que, para efectos de lo
                dispuesto en la presente Política, ostenten la calidad de
                encargados del tratamiento deben cumplir con lo estipulado en
                esta Política.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="4">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              IV. PRINCIPIOS APLICABLES AL TRATAMIENTO DE DATOS PERSONALES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Para el adecuado tratamiento de datos personales, en todas las
                acciones realizadas por <b>Inverclick</b> sobre los datos
                personales de los Titulares, así como en la interpretación y
                ejecución de la presente Política, se seguirán los siguientes
                principios:
              </p>
              <p>
                <b>Principio de legalidad:</b> Durante todas las etapas y
                actividades de tratamiento de información por parte de{" "}
                <b>Inverclick</b> o de quien éste designe como encargado del
                tratamiento, se aplicará, además de lo establecido en la
                presente Política, las normas descritas en el numeral II y todas
                aquellas que las reglamenten, adicionen, modifiquen o supriman.
              </p>
              <p>
                <b>Principio de finalidad:</b> <b>Inverclick</b> tratará los
                datos personales con una finalidad legítima de acuerdo con la
                Constitución y la ley, la cual será informada al Titular.
              </p>
              <p>
                <b>Principio de libertad:</b> Las actividades de tratamiento a
                las cuales serán sometidos los datos personales regidos por la
                presente Política se llevarán a cabo únicamente cuando el
                Titular de los mismos haya emitido, de manera previa o expresa,
                autorización para tal fin, salvo que sean de aquellos que, en
                virtud de lo dispuesto por el artículo 10 de la Ley 1581 de
                2012, no requieran autorización del Titular.
              </p>
              <p>
                <b>Principio de veracidad o calidad:</b> <b>Inverclick</b> se
                compromete con los Titulares de la información que compone su
                base de datos a garantizar que la misma sea veraz, completa,
                exacta, actualizada, comprobable y comprensible.
                Consecuentemente, se abstendrá de tratar datos parciales,
                incompletos, fraccionados o que induzcan a error.
              </p>
              <p>
                <b>Principio de transparencia:</b> <b>Inverclick</b> ha adoptado
                los mecanismos idóneos para garantizar que el Titular de los
                datos obtenga, en cualquier momento y sin restricciones,
                información acerca de la existencia de datos personales que le
                concierne.
              </p>
              <p>
                <b>Principio de acceso y circulación restringida:</b> El acceso
                a la información que compone las bases de datos está restringido
                al tratamiento exclusivo del personal especializado y
                previamente capacitado para la manipulación de este tipo de
                información. Con excepción de la información pública,{" "}
                <b>Inverclick</b> no pondrá a disposición los datos personales
                en Internet u otros medios de divulgación o comunicación masiva,
                salvo si el acceso es técnicamente controlable para brindar un
                conocimiento restringido sólo a los Titulares o terceros
                autorizados conforme a la Ley 1581 de 2012.
              </p>
              <p>
                <b>Principio de seguridad:</b> <b>Inverclick</b> ha adoptado una
                serie de medidas técnicas, humanas y administrativas, acorde a
                la naturaleza de los datos personales objeto de tratamiento,
                para impedir que los mismos sean adulterados, extraviados,
                consultados, usados o accedidos por personal no autorizado.
              </p>
              <p>
                <b>Principio de confidencialidad:</b> Todas las personas que
                intervienen en el tratamiento de los datos personales guardarán
                reserva sobre dicha información, aún después de finalizada la
                labor de tratamiento o su vínculo contractual con{" "}
                <b>Inverclick</b>.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="5">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              V. DATOS PERSONALES SOMETIDOS A TRATAMIENTO
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Con el fin de dar cumplimiento a las finalidades descritas en la
                presente Política, <b>Inverclick</b> tratará los siguientes
                datos:
              </p>
              <p>
                <b>Datos de identificación:</b> Información que permite
                identificar a un Titular de otro. Estos datos incluyen: nombre y
                apellido, firma autógrafa, firma electrónica, copia del
                documento con el cual acredita su identidad (cédula de
                ciudadanía, cédula de extranjería).
              </p>
              <p>
                <b>Datos de contacto:</b> Información que permite mantener
                contacto con el Titular. Estos datos incluyen el correo
                electrónico, teléfono y domicilio.
              </p>
              <p>
                <b>Datos patrimoniales o financieros:</b> Información relativa a
                los bienes o derechos del Titular, el historial crediticio,
                consulta en centrales de riesgo, etc.
              </p>
              <p>
                <b>Registros electrónicos:</b> Incluye información sobre
                credenciales de acceso a la página web y/o la aplicación para
                dispositivos móviles, dirección IP, tipo de navegador e
                información sobre la actividad y preferencias del Titular.
              </p>
              <p>
                <b>
                  Datos necesarios para el cumplimiento de obligaciones legales,
                  comerciales o contractuales.
                </b>
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="6">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              VI. AUTORIZACIÓN DE TRATAMIENTO DE DATOS PERSONALES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Las actividades de tratamiento de datos personales reglamentadas
                por la presente Política serán ejecutadas exclusivamente sobre
                datos personales cuyos Titulares hayan emitido su autorización
                de manera previa, expresa e informada. Sin perjuicio de lo
                anterior, <b>Inverclick</b> se reserva el derecho a llevar a
                cabo actividades de tratamiento sobre información cuya
                autorización no sea requerida en virtud de las disposiciones
                legales que reglamentan la materia, caso en el cual continúan
                vigentes los compromisos de <b>Inverclick</b> como responsable
                del tratamiento frente a los Titulares, conforme lo establecido
                en la presente Política.
              </p>
              <p>
                El Usuario autoriza de manera voluntaria, previa y expresa a{" "}
                <b>Inverclick</b>, para dar a conocer, transferir y/o transmitir
                sus datos personales dentro y fuera del país, a terceros como
                consecuencia de un contrato, ley o vínculo lícito que así lo
                requiera o para implementar servicios de computación en la nube.
              </p>
              <p>
                Para los efectos pertinentes, es importante destacar que{" "}
                <b>Inverclick</b> podrá utilizar cualquiera de las siguientes
                modalidades para la obtención de los datos personales sometidos
                a tratamiento:
              </p>
              <b>
                Datos recolectados directamente por <b>Inverclick</b>
              </b>
              <p>
                De forma general, <b>Inverclick</b> recaba los datos personales
                de forma directa del Titular. <b>Inverclick</b> obtendrá la
                autorización mediante diferentes medios, entre ellos, documentos
                físicos, electrónicos, mensajes de datos, Internet, Sitios Web,
                o en cualquier otro formato que en todo caso permita la
                obtención del consentimiento mediante conductas inequívocas a
                través de las cuales se concluya que, de no haberse surtido la
                misma por parte del Titular, los datos personales no se hubieran
                almacenado en las bases de datos de <b>Inverclick</b>. La
                autorización será solicitada por <b>Inverclick</b> de manera
                previa al tratamiento de los datos personales. <b>Inverclick</b>{" "}
                conservará la prueba de la autorización, para lo cual utilizará
                los mecanismos disponibles a su alcance en la actualidad, al
                igual que adoptará las acciones necesarias para mantener el
                registro de la forma y fecha en la que obtuvo ésta. En
                consecuencia, <b>Inverclick</b> podrá establecer archivos
                físicos o repositorios electrónicos realizados de manera directa
                o a través de terceros contratados para tal fin.
              </p>
              <b>
                Datos recolectados a través de la aplicación móvil y la página
                web
              </b>
              <p>
                Con el fin de ofrecer una mejor experiencia al utilizar la
                aplicación móvil de <b>Inverclick</b> para Android e IOS,{" "}
                <b>Inverclick</b> podrá solicitar al Titular cierta información
                de identificación personal, incluyendo, pero sin limitarse, al
                correo electrónico o el número de móvil del Titular
                (&quot;Primary Account&quot;). Asimismo, la aplicación utiliza
                servicios de terceros que pueden recopilar información personal
                con el fin de identificar a los usuarios. Para conocer la
                política de privacidad de los proveedores utilizados por la
                aplicación, se debe acceder a sus sitios oficiales en el
                apartado política de tratamiento de datos.
              </p>
              <p>
                Adicionalmente, <b>Inverclick</b> podrá recoger, guardar y
                tratar información sobre los dispositivos sobre los cuales el
                Titular acceda a la página web o a la aplicación móvil, el
                navegador de Internet que utilice, así como del comportamiento
                del Titular. <b>Inverclick</b> pone a disposición de los
                Titulares toda la información de las cookies que se emplea para
                obtener esta información, en la Política de Cookies.
              </p>
              <b>Datos suministrados por terceros</b>
              <p>
                Además de los datos personales recolectados directamente del
                Titular, <b>Inverclick</b> podrá obtener datos personales de
                bases de datos suministradas por terceros, quienes previamente
                deberán haber obtenido autorización de los Titulares, como por
                ejemplo de aliados comerciales, proveedores de servicios, de las
                centrales de información crediticia, entre otros.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="7">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              VII. NIVEL DE INTERVENCIÓN
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Para todos los efectos legales relacionados con el tratamiento
                de datos personales y en atención a lo establecido en la
                presente Política y en la Ley 1581 de 2012, <b>Inverclick</b> se
                considera responsable del tratamiento de información personal.
                En virtud de lo anterior, <b>Inverclick</b> decide sobre el
                tratamiento al cual serán sometidos los datos personales que
                componen las bases de datos, y es quien ejecuta las actividades
                de tratamiento conforme a la presente Política.
              </p>
              <p>
                Sin perjuicio de lo anterior, <b>Inverclick</b> se reserva la
                facultad de delegar ciertas actividades de tratamiento a
                terceros, para que las ejecuten en su nombre, caso en el cual
                estos últimos deberán observar los compromisos establecidos en
                la presente Política.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="8">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              VIII. FINALIDAD Y ACTIVIDADES DE TRATAMIENTO
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                El tratamiento de los datos personales se realizará conforme al
                marco legal que regula la materia, con el objetivo de cumplir
                con el objeto social de <b>Inverclick</b>. En este sentido, los
                Titulares, al aceptar la presente Política, autorizan a{" "}
                <b>Inverclick</b> a recolectar y tratar los datos personales
                para las siguientes finalidades:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Brindar asesoría personalizada para la búsqueda y adquisición
                  de inmuebles.
                </li>
                <li>
                  Realizar análisis estadísticos e investigación de mercado.
                </li>
                <li>
                  Realizar encuestas relacionadas con los servicios o bienes
                  ofrecidos por <b>Inverclick</b>.
                </li>
                <li>Gestionar la atención de servicio al cliente.</li>
                <li>
                  Grabar todas las llamadas telefónicas entrantes y salientes
                  entre el Titular e <b>Inverclick</b>, con fines de
                  verificación de la calidad del servicio y de seguridad.
                </li>
                <li>
                  Enviar y difundir información publicitaria (&quot;Información
                  Publicitaria&quot;) relacionada con las ofertas comerciales de
                  inmuebles nuevos y usados, información sobre lanzamiento de
                  proyectos, actividades, noticias, contenidos por área de
                  interés, productos y demás servicios ofrecidos por{" "}
                  <b>Inverclick</b>.
                </li>
                <li>
                  Elaborar perfiles de los usuarios que acceden a la plataforma
                  para evaluar aspectos personales de los Titulares, como
                  intereses, preferencias, comportamientos o ubicación, y así
                  prestar un mejor servicio de acuerdo con sus preferencias y
                  necesidades.
                </li>
                <li>
                  Administrar las cuentas y perfiles de los usuarios en la
                  página web y la aplicación móvil.
                </li>
                <li>
                  Compartir los datos personales del Titular con constructores,
                  desarrolladores y/o inmobiliarias con las cuales{" "}
                  <b>Inverclick</b> tenga acuerdos comerciales, para que estos a
                  su vez puedan contactar a los Titulares y gestionar el proceso
                  de adquisición del inmueble.
                </li>
                <li>
                  Compartir los datos personales del Titular con entidades
                  financieras en aquellos casos en los cuales el Titular desee
                  contratar un servicio con ellas, encaminado a la adquisición
                  de un inmueble.
                </li>
                <li>
                  Transferir los datos personales del Titular a terceros,
                  proveedores de bienes o servicios, y aliados comerciales de{" "}
                  <b>Inverclick</b>, según sea necesario para cumplir con las
                  obligaciones derivadas de las relaciones existentes con los
                  Titulares.
                </li>
                <li>
                  Cumplir con las obligaciones de prevención de lavado de
                  activos y financiación del terrorismo.
                </li>
                <li>
                  Acceder y consultar los datos personales en las centrales de
                  información crediticia y financiera, y recabar información
                  relevante del comportamiento crediticio. Para el tratamiento
                  de datos personales conforme a esta finalidad,{" "}
                  <b>Inverclick</b> informará expresamente al usuario sobre
                  dicho tratamiento.
                </li>
                <li>
                  Hacer consultas de antecedentes penales, judiciales,
                  comerciales y financieros en listas públicas o privadas.
                </li>
                <li>
                  Atender requerimientos de organismos de control y vigilancia.
                </li>
                <li>
                  Realizar otras actividades relacionadas con el desarrollo del
                  objeto social de <b>Inverclick</b> y que resulten del
                  desarrollo de la relación que tenga con el Titular.
                </li>
              </ul>
              <p>
                El Titular podrá contactar a <b>Inverclick</b> en cualquier
                momento para rechazar recibir Información Publicitaria. El hecho
                de que el Titular decida no recibir Información Publicitaria no
                afectará la posibilidad de acceder a los servicios ofrecidos por{" "}
                <b>Inverclick</b>.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="9">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              IX. TRATAMIENTO DE DATOS PERSONALES SENSIBLES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                <b>Inverclick</b> no tratará datos sensibles a menos que sea
                absolutamente necesario. En tales casos, <b>Inverclick</b>{" "}
                tomará las medidas necesarias para asegurar la protección de los
                derechos del Titular y además reforzará el cumplimiento de los
                principios que regulan el tratamiento de los datos personales,
                establecidos en el numeral IV de la presente Política. Para el
                tratamiento de datos sensibles, <b>Inverclick</b> se
                comprometerá a lo dispuesto en los artículos 5 y 6 de la Ley
                1581 de 2012.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="10">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              X. TRATAMIENTO DE DATOS DE MENORES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Por norma general, en la ejecución de cualquier actividad de
                tratamiento de datos personales, <b>Inverclick</b> se abstendrá
                de tratar datos cuyo Titular sea un menor, conforme a lo
                dispuesto en el artículo 7 de la Ley 1581 de 2012.
              </p>
              <p>
                De manera excepcional, <b>Inverclick</b> podrá necesitar tratar
                datos personales de menores de edad. En estos casos,{" "}
                <b>Inverclick</b> se asegurará de que el tratamiento de dichos
                datos se realice bajo las siguientes reglas:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Respeto del interés superior del menor Titular del dato.
                </li>
                <li>
                  Respeto de los derechos fundamentales del menor Titular del
                  dato.
                </li>
                <li>
                  Obtención de la autorización emitida por el representante
                  legal del menor Titular del dato.
                </li>
              </ul>
              <p>
                En caso de que el CLIENTE desee dar por terminado de manera
                unilateral el contrato u orden de compra suscrito con{" "}
                <b>Inverclick</b>, podrá hacerlo siempre que medie un preaviso
                por escrito que debe ser enviado al correo:{" "}
                <a href="mailto:contactenos@Inverclick.com">
                  contactenos@Inverclick.com
                </a>{" "}
                . El preaviso debe ser de 60 días calendario, los cuales
                empezarán a contar a partir de la siguiente fecha de corte de la
                respectiva orden de compra o contrato. Durante el término de
                preaviso, el contrato u orden de compra continuará vigente.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="11">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XI. TRANSMISIÓN Y/O TRANSFERENCIA NACIONAL O INTERNACIONAL
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                <b>Inverclick</b> podrá transferir y transmitir datos personales
                de los Titulares a terceros con quienes tenga una relación
                comercial para asegurar el cumplimiento de las finalidades
                descritas en la presente Política.
              </p>
              <p>
                De manera enunciativa pero no limitativa, <b>Inverclick</b>{" "}
                podrá transmitir y/o transferir los datos personales a:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Proveedores de servicios o productos con los que{" "}
                  <b>Inverclick</b> tiene una relación contractual.
                </li>
                <li>
                  Aliados comerciales con los que <b>Inverclick</b> tenga una
                  relación de colaboración o alianza.
                </li>
                <li>
                  Empresas del <b>“Grupo Inverclick”</b>, las cuales son
                  sociedades que pertenecen al grupo corporativo y operan bajo
                  los mismos procesos y políticas internas.
                </li>
                <li>
                  Desarrolladores, constructoras, inmobiliarias, propietarios de
                  los inmuebles y/o proyectos inmobiliarios promocionados a
                  través de la plataforma, quienes a su vez podrán comunicarse
                  con el Titular para gestionar el proceso de adquisición del
                  inmueble.
                </li>
                <li>
                  Entidades financieras que ofrezcan servicios en los que el
                  Titular haya manifestado su interés.
                </li>
                <li>Autoridades públicas.</li>
              </ul>
              <p>
                Dado que estas empresas pueden estar localizadas fuera de
                Colombia, estas transferencias podrían implicar una
                transferencia internacional de los datos personales.
              </p>
              <p>
                <b>Inverclick</b> adoptará las medidas necesarias para que los
                terceros que tengan acceso a los datos personales de los
                Titulares cumplan con la presente Política y con los principios
                de protección de datos personales y obligaciones establecidas en
                la normativa vigente. No obstante, <b>Inverclick</b> no será
                responsable del uso indebido de la información personal que
                realice cualquier tercero cuando estos terceros sean quienes
                directamente recojan y/o traten la información personal de los
                Titulares en calidad de responsables de su tratamiento.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="12">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XII.DURACIÓN DEL TRATAMIENTO Y CONSERVACIÓN DE LOS DATOS
              PERSONALES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Como regla general, <b>Inverclick</b> tratará los datos
                personales mientras sean necesarios para mantener una adecuada
                relación comercial, laboral o civil con el Titular, y para
                cumplir con el propósito para el cual se hayan recogido. Además,{" "}
                <b>Inverclick</b> cumplirá con los requisitos reglamentarios o
                legales y mantendrá los datos durante el periodo de prescripción
                legal ante posibles responsabilidades legales o contractuales.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="13">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XIII. OBLIGACIONES DE TERCEROS
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                <b>Inverclick</b> cuenta con proveedores de productos y
                servicios y aliados comerciales para el cumplimiento de su
                objeto social y, por tanto, podrá delegar la realización de
                ciertas actividades relacionadas con el tratamiento de datos
                personales a estos terceros, quienes actuarán como encargados
                del tratamiento o responsables, de acuerdo con la naturaleza de
                la relación. En este sentido, cada uno de los terceros
                encargados y responsables del tratamiento de los datos
                personales que forman parte de las bases de datos de{" "}
                <b>Inverclick</b> se comprometen a:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Cumplir estrictamente con los principios y obligaciones
                  contenidos en la Política de Tratamiento de Datos.
                </li>
                <li>
                  Cumplir con el marco normativo aplicable en materia de
                  protección de datos, especialmente las obligaciones contenidas
                  en la Ley 1581 de 2012 y el Decreto 1377 de 2013, de acuerdo
                  con el tratamiento de datos personales que realicen.
                </li>
                <li>
                  En el caso de los encargados del tratamiento, tratar los datos
                  de acuerdo con las instrucciones del responsable del
                  tratamiento.
                </li>
                <li>
                  Conservar los datos personales bajo las condiciones de
                  seguridad necesarias para impedir su adulteración, pérdida,
                  consulta, uso o acceso no autorizado o fraudulento.
                </li>
                <li>
                  Realizar oportunamente la actualización, rectificación o
                  supresión de los datos cuando así sea requerido por{" "}
                  <b>Inverclick</b> o directamente por el Titular.
                </li>
                <li>
                  Asistir a <b>Inverclick</b> como responsable del tratamiento
                  en las respuestas al ejercicio de los derechos descritos en el
                  numeral XIV de la Política.
                </li>
                <li>
                  Adoptar unas políticas de tratamiento de datos que aseguren el
                  debido tratamiento de los datos personales.
                </li>
                <li>
                  Suministrar las políticas de tratamiento de datos personales a{" "}
                  <b>Inverclick</b> como responsable del tratamiento.
                </li>
                <li>
                  Asegurar que todo el personal que participe en la prestación
                  de los servicios conforme al vínculo comercial que exista con{" "}
                  <b>Inverclick</b> conozca las obligaciones de seguridad y
                  confidencialidad que le corresponden de acuerdo con la
                  normatividad vigente.
                </li>
                <li>
                  No comunicar los datos a terceras personas, salvo que cuente
                  con la autorización expresa de <b>Inverclick</b>, en los
                  supuestos legalmente admisibles.
                </li>
                <li>
                  En el caso de información objeto de controversia ante una
                  autoridad administrativa o judicial, o que esté siendo objeto
                  de reclamo por parte del Titular, o cuyo bloqueo haya sido
                  ordenado por la autoridad competente, tomar todas las medidas
                  pertinentes para impedir que dicha información continúe siendo
                  tratada, salvo lo referente al almacenamiento de la misma,
                  hasta que se tome una decisión de fondo.
                </li>
                <li>
                  Notificar a <b>Inverclick</b> sin dilación indebida sobre las
                  violaciones de la seguridad de los datos personales a su cargo
                  de las que tenga conocimiento, conjuntamente con toda la
                  información relevante para la documentación y comunicación de
                  la incidencia.
                </li>
                <li>
                  Informar al Superintendente Delegado para la Protección de
                  Datos Personales, o quien haga sus veces, cuando se presenten
                  violaciones a los códigos de seguridad y existan riesgos en la
                  administración de la información de los Titulares.
                </li>
              </ul>
              <p>
                <b>Inverclick</b> podrá solicitar a los terceros que acrediten
                el cumplimiento de la normativa vigente, las obligaciones
                descritas en la presente Política, así como aquellas estipuladas
                en los contratos que tenga con cada uno de los terceros.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="14">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XIV. DERECHOS DE LOS TITULARES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                <b>Inverclick</b>, en su compromiso con el respeto de los
                intereses de los Titulares de los datos personales sometidos a
                su tratamiento y consciente de la importancia de un adecuado
                manejo de estos datos, reconoce que los Titulares podrán ejercer
                de manera gratuita los siguientes derechos:
              </p>
              <p>
                <b>Conocimiento:</b> En virtud de este derecho, el Titular del
                dato está facultado para solicitar, en cualquier momento y de
                manera gratuita, información sobre los datos que{" "}
                <b>Inverclick</b> esté manipulando sobre él y el uso que se les
                da a dichos datos.
              </p>
              <p>
                <b>Rectificación:</b> Potestad reconocida al Titular del dato
                para solicitar, en cualquier momento, la corrección de la
                información inexacta que repose en las bases de datos de{" "}
                <b>Inverclick</b>.
              </p>
              <p>
                <b>Actualización:</b> Facultad del Titular del dato personal de
                solicitar que, por motivos diferentes a la corrección de datos,
                la información que repose en las bases de datos de{" "}
                <b>Inverclick</b> sea completa y actualizada. En este sentido,
                podrá solicitar la inclusión o eliminación de cualquier tipo de
                información que considere pertinente.
              </p>
              <p>
                <b>Solicitar copia de autorización:</b> Cuando, de conformidad
                con lo establecido en los artículos 9 y 10 de la Ley 1581 de
                2012, se requiera obtener autorización del Titular para que sus
                datos sean sometidos a actividades de tratamiento, estará
                facultado para solicitar, en cualquier momento y de manera
                gratuita, una copia de la autorización emitida por este.
              </p>
              <p>
                <b>Revocar la autorización:</b> Cuando, de conformidad con lo
                establecido en los artículos 9 y 10 de la Ley 1581, se requiera
                obtener autorización del Titular para que sus datos sean
                sometidos a actividades de tratamiento, estará facultado para
                revocar, en cualquier momento, la autorización emitida.
              </p>
              <p>
                <b>Presentar quejas:</b> El Titular, cuando evidencie un
                tratamiento ilegal de sus datos personales por parte de la
                sociedad, podrá presentar quejas ante la Superintendencia de
                Industria y Comercio de Colombia.
              </p>
              <p>
                <b>Supresión:</b> En virtud de este derecho, el Titular podrá
                solicitar a <b>Inverclick</b>, en cualquier momento, la
                supresión de los datos que reposen en las bases de datos de{" "}
                <b>Inverclick</b>, siempre que no exista un deber legal o
                contractual de mantenerlos en ellas.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="15">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XV. PROCEDIMIENTO PARA EL EJERCICIO DE LOS DERECHOS DE LOS
              TITULARES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Para ejercer los derechos mencionados en el numeral XIII de la
                presente Política, el Titular de los datos personales podrá
                contactar a <b>Inverclick</b> a través del correo electrónico{" "}
                <a href="mailto:contactenos@inverclick.com">
                  contactenos@inverclick.com
                </a>{" "}
                o a la dirección Carrera 11 # 48-136 Maraya, Pereira Colombia.
              </p>
              <b>Consultas</b>
              <p>
                Para ejercer los derechos de conocimiento, acceso a la
                información y solicitud de copia de la autorización,{" "}
                <b>Inverclick</b> dará respuesta dentro de los diez (10) días
                hábiles siguientes a la fecha de recibo de la consulta. Cuando
                no sea posible atender la consulta dentro del término indicado,
                se informará al solicitante indicando los motivos de la demora y
                la fecha en la cual será resuelta la solicitud, que en ningún
                caso superará los cinco (5) días hábiles siguientes al
                vencimiento del primer término.
              </p>
              <b>Peticiones o reclamos</b>
              <p>
                Para ejercer los derechos de rectificación, actualización,
                revocatoria de la autorización y supresión de la información, o
                cuando se advierta el presunto incumplimiento de cualquiera de
                los deberes contenidos en la Ley 1581 de 2012, o la norma que la
                sustituya o complemente, los Titulares o las personas
                legitimadas conforme a lo dispuesto en el numeral XV de la
                presente Política, podrán presentar sus peticiones, observando
                las siguientes reglas:
              </p>
              <b>Las peticiones:</b> Se presentarán por solicitud escrita
              describiendo brevemente los hechos que motivan la petición, la
              dirección de correspondencia, los datos de identificación, y
              adjuntando los documentos que soporten su solicitud y que
              acrediten su legitimidad para actuar, cuando quien presenta la
              solicitud no sea el Titular del dato.
              <ul className="ml-10 list-disc">
                <li>
                  <b>Petición incompleta:</b> Cuando <b>Inverclick</b> considere
                  que la petición presentada por el Titular o por quien esté
                  facultado para hacerlo es incompleta por falta de los
                  requisitos establecidos en el párrafo anterior, requerirá,
                  dentro de los cinco (5) días siguientes a la recepción de la
                  petición, al interesado para que subsane las fallas. Si
                  transcurren dos (2) meses desde la fecha del requerimiento de{" "}
                  <b>Inverclick</b> al interesado sin que este último presente
                  la información solicitada, se entenderá que ha desistido del
                  reclamo, sin perjuicio de poder presentar una nueva petición
                  en el mismo sentido; en cuyo caso los términos para resolver
                  comenzarán a contarse a partir de la nueva petición.
                </li>
                <li>
                  <b>Petición completa:</b> Recibido el reclamo completo o
                  subsanados los vicios dentro del término establecido en el
                  párrafo anterior, <b>Inverclick</b> dará respuesta dentro de
                  los quince (15) días hábiles siguientes a la fecha de recibo
                  de la misma o desde la fecha en que la petición fue subsanada.
                  Cuando no sea posible atender la petición dentro del término
                  indicado, se informará al Titular sobre la situación, los
                  motivos de la demora y la fecha en la cual será resuelta la
                  petición, que en ningún caso superará los ocho (8) días
                  hábiles siguientes al vencimiento del primer término.
                </li>
              </ul>
              <b>Decisión</b>
              <p>
                El área de protección de datos del Departamento Legal de{" "}
                <b>Inverclick</b> dará respuesta a los requerimientos de los
                Titulares del dato, dentro de los términos establecidos en la
                sección anterior, de manera escrita a la dirección física o
                electrónica suministrada por el solicitante para tal efecto.
                Cuando el solicitante suministre una dirección física y una
                electrónica, o más de una dirección de cualquiera de estas, será
                a discreción de <b>Inverclick</b> decidir a cuál dirección
                enviar la respuesta a la consulta o petición.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="16">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XVI. LEGITIMIDAD
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Están legitimados para ejercer los derechos establecidos en el
                numeral XIII y los demás reconocidos por la ley, el Titular del
                dato, sus herederos y las personas autorizadas por cualquiera de
                ellos. En estos dos últimos casos, se deberá acreditar la
                calidad de la persona que solicita el reconocimiento, mediante
                mecanismos apropiados.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="17">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XVII. VIGENCIA
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                La presente Política entra en vigor a partir de la fecha de su
                publicación y estará vigente mientras <b>Inverclick</b> lleve a
                cabo las finalidades descritas en este documento. Podrá ser
                modificada en cualquier momento con el fin de adaptarla a nuevas
                prácticas que surjan de novedades legislativas o
                jurisprudenciales en la materia. Cualquier actualización se
                pondrá a disposición de los Titulares en{" "}
                <a href="www.inverclick.com/policy">
                  www.inverclick.com/policy
                </a>
                , o a través de cualquier otro medio que se considere adecuado,
                indicando la fecha de entrada en vigencia de la correspondiente
                modificación o actualización, según sea el caso.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="18">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XVIII. AUTORIDAD NACIONAL DE PROTECCIÓN DE DATOS
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                <b>Inverclick</b>, comprometido con la efectiva protección de
                los datos personales de los Titulares, pone a disposición del
                público en general información relacionada con la Delegatura
                para la Protección de Datos Personales. Esta es la autoridad
                competente a nivel nacional que supervisa las actividades de
                tratamiento realizadas en el territorio nacional, y puede ser
                consultada en el siguiente enlace:{" "}
                <a href="https://www.sic.gov.co">https://www.sic.gov.co</a>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </article>
      <Footer />
    </main>
  );
}
