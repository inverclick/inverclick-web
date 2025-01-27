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
  title: "Términos y condiciones",
  description: "Conoce los términos y condiciones de Inverclick",
  openGraph: {
    url: ENV_VARS.BASE_URL + "/terms-conditions",
    title: "Términos y condiciones",
    description:
      "Inverclick S.A.S (en adelante Inverclick) es la sociedad titular de la marca Inverclick y de los activos digitales, incluyendo el portal público www.inverclick.com,  las plataformas de Usuario, Constructora (en adelante Plataforma) y la aplicación móvil (en adelante APP).",
  },
};

export default function Index() {
  return (
    <main>
      <Header />
      <article className="p-content mb-20 flex flex-col">
        <h1 className="text-3xl font-medium">
          TÉRMINOS Y CONDICIONES DE LA PLATAFORMA Y APP DE INVERCLICK
        </h1>
        <span>V.1 - 2024</span>
        <p className="mt-2">
          <b>Inverclick S.A.S</b> (en adelante <b>Inverclick</b>) es la sociedad
          titular de la marca Inverclick y de los activos digitales, incluyendo
          el portal público <a href="www.inverclick.com">www.inverclick.com</a>,
          las plataformas de Usuario, Constructora (en adelante Plataforma) y la
          aplicación móvil (en adelante APP).{" "}
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="1">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              I. DEFINICIONES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                <b>Cliente:</b> Se refiere a todas las personas naturales,
                jurídicas o entidades de cualquier naturaleza que soliciten o
                contraten la prestación de servicios por parte de Inverclick en
                la Plataforma y/o en la APP.
              </p>
              <p>
                <b>Usuario:</b> Se refiere a todas las personas naturales o
                jurídicas o entidades de cualquier naturaleza que visiten y/o
                naveguen en la Plataforma y/o en el APP.
              </p>
              <p>
                <b>Plataforma:</b> Elementos de software y hardware utilizados
                por Inverclick incluyendo el portal público{" "}
                <a href="www.inverclick.com">www.inverclick.com</a>, las
                plataformas de Usuario, Constructora u otros mecanismos para la
                prestación de bienes y servicios.
              </p>
              <p>
                <b>Aplicación Móvil:</b> APP utilizada por Inverclick para la
                prestación de bienes y servicios.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              II. CONDICIONES GENERALES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                El presente documento establece las políticas de uso de la
                Plataforma y del APP, así como las condiciones de prestación de
                servicios por parte de <b>Inverclick</b>. Es tu deber leer
                cuidadosamente este documento antes de usar cualquiera de las
                herramientas disponibles en la Plataforma o en el APP y/o
                solicitar la prestación de cualquier servicio ofrecido por{" "}
                <b>Inverclick</b>.
              </p>
              <p>
                <b>Inverclick</b> presume de buena fe que los Usuarios o
                Clientes de los servicios prestados cumplen con su deber de leer
                detenida y reflexivamente cada uno de los términos y condiciones
                dispuestos por <b>Inverclick</b>. Al acceder, revisar, usar
                cualquier herramienta o aplicativo dispuesto en la Plataforma o
                en el APP y/o solicitar la prestación de cualquiera de los
                servicios ofrecidos por <b>Inverclick</b>, el Usuario y/o
                Cliente reconoce y acepta cada uno de los términos y
                condiciones, obligándose así al cumplimiento de los mismos.
              </p>
              <p>
                <b>Inverclick</b> tiene la facultad unilateral de modificar los
                términos y condiciones en cualquier momento. En tal caso,
                publicará en la Plataforma o en el APP los ajustes realizados
                para facilidad de acceso al público. Los servicios contratados
                antes de la publicación de la modificación serán prestados bajo
                las mismas condiciones en que fueron adquiridos. Los servicios
                adquiridos después de la fecha de publicación de la modificación
                se prestarán bajo estas nuevas condiciones. El Usuario o Cliente
                tiene la obligación de revisar estos términos y condiciones cada
                vez que haga uso de las herramientas de la Plataforma o del APP
                y/o solicite la prestación de servicios por parte de{" "}
                <b>Inverclick</b>, con el fin de conocer las condiciones de
                modo, tiempo y lugar bajo las cuales se regirá la actuación de
                Inverclick, sus empleados, contratistas, subcontratistas o
                Aliados.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              III. LA APP
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                El APP es un canal mediante el cual se puede acceder a los
                distintos servicios que <b>Inverclick</b> tenga habilitados. En
                cualquier momento <b>Inverclick</b> podrá limitar, adicionar o
                suprimir cualquiera de los servicios, lo cual será informado a
                través de los canales dispuestos por <b>Inverclick</b>.
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  <b>Acceso:</b> Para poder acceder a la App, deberás disponer
                  de conexión a internet y de un dispositivo que opere con la
                  tecnología apta y los medios físicos que te permitan recibir o
                  transmitir la información necesaria para la utilización de la
                  App. Conoces y aceptas que el uso de la App puede verse
                  afectado a consecuencia de una imposibilidad, demora o
                  deficiente transmisión de los datos u operaciones solicitadas
                  en tu sistema de telefonía celular, a causa de fallas en tu
                  equipo u otras causas, así como por problemas técnicos o por
                  suspensión de dichos servicios, las cuales no son atribuibles
                  a <b>Inverclick</b>.
                </li>
                <li>
                  <b>Servicios:</b> La App podrá permitir la prestación de
                  servicios, cuyos términos y condiciones se sujetarán a lo
                  establecido en el presente documento o a lo que{" "}
                  <b>Inverclick</b> disponga para cada uno de los servicios de
                  manera particular.
                </li>
              </ul>
              <b>Obligaciones del Usuario/Cliente</b>
              <ul className="ml-10 list-disc">
                <li>Hacer un debido uso de la App.</li>
                <li>
                  Seguir las recomendaciones formuladas por <b>Inverclick</b> en
                  cuanto a la forma de operar y seguridades del App.
                </li>
                <li>
                  Adquirir y mantener todo el equipo y medios de comunicación
                  necesarios para utilizar el App.
                </li>
                <li>
                  No ceder ni hacerse sustituir por terceros en el ejercicio de
                  los derechos y obligaciones que asume.
                </li>
                <li>
                  Abstenerse de realizar conductas que lleven a obtener algún
                  beneficio comercial del App, tales como licenciar, vender,
                  revender, re-licenciar, asignar o distribuir, entre otras.
                </li>
                <li>
                  No realizar cambios o alteraciones del software que soporta el
                  App.
                </li>
                <li>
                  No ejecutar actos encaminados a descomponer técnicamente el
                  App, independientemente de la finalidad perseguida.
                </li>
                <li>
                  Entregar correctamente los datos a <b>Inverclick</b> para
                  hacer uso del App.
                </li>
                <li>Mantener permanentemente actualizada el App.</li>
              </ul>
              <p>
                <b>Propiedad intelectual:</b> Aceptas que el software y/o los
                distintos códigos usados en el App son de propiedad de
                Inverclick y/o de sus proveedores, conforme a la normatividad
                vigente sobre propiedad intelectual. Cualquier reproducción,
                alteración, modificación o explotación patrimonial está
                expresamente prohibida por la ley y puede conllevar sanciones
                civiles, comerciales y penales.
              </p>
              <p>
                <b>Localización:</b> Está en cabeza del Usuario o del Cliente la
                facultad de activar o desactivar el servicio de localización. En
                aquellos eventos en los cuales permitas la localización,
                autorizas el uso de tu información respecto de tu localización
                para que pueda ser usada en la prestación de los servicios de
                Inverclick.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="4">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              IV. DERECHOS DE AUTOR / PROPIEDAD INDUSTRIAL
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Los textos, gráficas, imágenes, logotipos, iconos, software,
                direcciones de página web, o cualquier otro contenido
                susceptible de apropiación que se encuentre dispuesto en la
                Plataforma como en el APP, es de propiedad de <b>Inverclick</b>,
                en todo o en parte, según los acuerdos de licenciamiento que
                tenga con otros titulares de los derechos de autor o de
                propiedad industrial que recaigan sobre estos.
              </p>
              <p>
                <b>Inverclick</b> autoriza al Usuario y/o Cliente a consultar,
                revisar, visualizar, compartir el material sometido a las normas
                nacionales, comunitarias y/o internacionales relacionadas con la
                protección de la propiedad intelectual o industrial, siempre que
                dicha consulta, revisión, visualización o acto de compartir no
                tenga como fin directo o indirecto la posibilidad de percibir un
                rédito económico por ello. Cualquier otro uso no señalado en
                este documento constituye una infracción a los derechos de
                propiedad intelectual o industrial de <b>Inverclick</b> y los
                demás titulares. Cualquier uso no autorizado o por fuera de los
                límites previstos dentro de este documento constituye una
                infracción a las normas nacionales, supranacionales o
                internacionales de propiedad intelectual, industrial o cualquier
                otra normatividad que se le relacione. El Usuario y/o Cliente
                asume la responsabilidad de cualquier naturaleza por el uso
                indebido o desautorizado de los contenidos protegidos por las
                normas de propiedad intelectual o industrial. Este igualmente
                deberá cubrir los perjuicios causados tanto a <b>Inverclick</b>{" "}
                como a los titulares de los derechos de propiedad intelectual o
                industrial de los contenidos, software o cualquier otro derecho
                involucrado en la Plataforma o en el APP, por los actos
                cometidos directamente por el Usuario o Cliente o por
                interpuesta persona con su aquiescencia, o utilizando cualquier
                otro mecanismo como instrumento para infringir tales derechos.
              </p>
              <p>
                Los Usuarios/Clientes licencian a título gratuito a{" "}
                <b>Inverclick</b> sus subordinados, vinculados o dependientes,
                los derechos de uso, reproducción, modificación, adaptación,
                cualquier forma de transformación, comunicación al público de
                las imágenes, diseños o cualquier otra obra que incorporen
                directamente o por conducto de <b>Inverclick</b> a la Plataforma
                o en el APP, con el propósito de permitir la visualización de
                las mismas y el eventual contacto. Teniendo en cuenta que la
                Plataforma o el APP se encuentra dispuesto en internet, la
                licencia otorgada no tendrá restricciones en razón al territorio
                o al tiempo.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="5">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              V. USO AUTORIZADO DE LA PLATAFORMA Y DEL APP
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                <b>Reglas generales:</b> Los Usuarios/Clientes no podrán usar la
                Plataforma o el APP con el fin de transmitir, distribuir,
                editar, almacenar, modificar, adaptar o de cualquier forma
                transformar el material dispuesto en la Plataforma:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  De manera que se infrinjan las normas nacionales,
                  supranacionales o internacionales sobre derechos de autor,
                  propiedad industrial, secretos comerciales o cualquier otro
                  derecho de propiedad intelectual de terceros o de manera que
                  viole la privacidad, publicidad, derechos personales o
                  personalísimos de terceros.
                </li>
                <li>
                  De forma tal que resulte lesivo, difamatorio, obsceno,
                  amenazante o abusivo a los derechos de terceros, tanto
                  personas naturales como jurídicas o cualquier otra forma
                  asociativa.
                </li>
              </ul>
              <p>
                <b>Reglas de seguridad:</b> Los Usuarios o Clientes no podrán
                violar o intentar violar la seguridad de la Plataforma o del
                APP. Particularmente se encuentran inhabilitados para:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Acceder a información que no esté dirigida o autorizada a
                  dicho Usuario o Cliente o acceder a los servidores o cuentas a
                  los cuales no se encuentra autorizado a acceder.
                </li>
                <li>
                  Probar o intentar probar la vulnerabilidad de cualquiera de
                  los sistemas o redes por las cuales opera la Plataforma o el
                  APP, sin la debida autorización. Esta limitación comprende el
                  violar las medidas de seguridad o autenticación dispuestas por{" "}
                  <b>Inverclick</b>.
                </li>
                <li>
                  Intentar interferir con los servicios prestados a un usuario,
                  servidor o red, incluyendo, pero sin limitarse al envío de
                  virus utilizando como instrumento la Plataforma o el APP.
                </li>
                <li>
                  Enviar correo electrónico no solicitado, incluyendo
                  promociones o publicidad de productos o servicios.
                </li>
              </ul>
              <p>
                El Usuario/Cliente deberá reparar los daños y asumir las demás
                consecuencias del orden penal, si llegara a ocurrir, por la
                ejecución de actos propios o de terceros bajo su dirección, en
                donde se viole la seguridad de cualquier sistema o red asociada
                a la Plataforma o al APP.
              </p>
              <p>
                <b>Inverclick</b> podrá iniciar los rastreos, investigaciones y
                cualquier otra forma de indagación sobre las personas e
                instrumentos utilizados para vulnerar la seguridad dispuestas en
                la Plataforma o en el APP. En cualquier evento promoverá las
                denuncias o demandas buscando que se proscriban dichas
                actuaciones, así como la indemnización de los perjuicios
                ocasionados.
              </p>
              <b>Límites a las operaciones:</b>
              <p>
                <b>Inverclick</b> podrá rechazar operaciones que se realicen a
                través de la Plataforma o del APP, bloquear temporal o
                definitivamente al Usuario o al Cliente y/o bloquear la
                Plataforma o el APP y los servicios que se realizan a través de
                estos canales en los siguientes eventos:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Cuando se presenten o se adviertan irregularidades en el uso
                  de cualquiera de los servicios por parte del Usuario o del
                  Cliente.
                </li>
                <li>
                  Como medida de seguridad para proteger sus propios intereses o
                  los del Usuario o del Cliente.
                </li>
                <li>
                  En caso de incumplimiento del Usuario o Cliente de las
                  condiciones de estos términos y condiciones.
                </li>
                <li>
                  Cuando <b>Inverclick</b> considere que el servicio está siendo
                  utilizado para actividades ilícitas, delictivas o ilegales.
                </li>
                <li>
                  Cuando <b>Inverclick</b> evidencie que el Usuario o Cliente no
                  esté dando cumplimiento a estos términos y condiciones y/o las
                  disposiciones legales o esté haciendo un uso indebido de la
                  Plataforma, del APP o de los servicios que en ellos se
                  prestan.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="6">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              VI. USOS PROHIBIDOS EN LA PLATAFORMA O EN EL APP
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                La Plataforma y el APP solo podrán ser utilizados para
                propósitos que se adecuen dentro del marco de las leyes de la
                República de Colombia, así como de los instrumentos
                internacionales que protejan derechos de propiedad intelectual e
                industrial. <b>Inverclick</b> prohíbe el uso de su Plataforma o
                del APP en cualquiera de las siguientes formas:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Incluir cualquier información falsa, errónea, inexacta o que
                  de cualquier otra manera no corresponda con la realidad,
                  induciendo en error a los Usuarios o Clientes de la Plataforma
                  o del APP.
                </li>
                <li>
                  Generar solicitudes spam, envíos de correos masivos,
                  diligenciamiento de formularios de manera mecánica o
                  automática y en general, realizar actividades que perturben el
                  buen uso de los servicios que se prestan en la Plataforma y el
                  APP.
                </li>
                <li>
                  Utilizar los canales para difundir u ofrecer cualquier
                  franquicia, esquema de pirámide, membresía a clubes o grupos,
                  representación, mandato o corretaje en venta de bienes,
                  oportunidades de negocio que requieran pagos anticipados o
                  pagos periódicos en cualquier tiempo o solicitando la
                  vinculación de terceras personas a esquemas piramidales de
                  negocio o la captación masiva de dineros del público sin la
                  autorización de la entidad competente.
                </li>
                <li>
                  Utilizar los canales para ejecutar actividades que signifiquen
                  la comisión de conductas relacionadas con los delitos de
                  lavado de activos o financiación del terrorismo, o aquellos
                  conexos con estos.
                </li>
                <li>
                  Borrar, editar o transformar de cualquier forma o
                  comercializar cualquier material publicado en la Plataforma o
                  en el APP por cualquier otra persona o entidad sin la debida
                  autorización.
                </li>
                <li>
                  Usar cualquier elemento, diseño, software o rutina para
                  interferir o intentar interferir con el funcionamiento
                  adecuado de la Plataforma o en el APP o que tenga como
                  propósito la modificación de la Plataforma o del APP.
                </li>
                <li>
                  Intentar descifrar, compilar o desensamblar cualquier software
                  o sistema que sea utilizado para el funcionamiento de la
                  Plataforma o del APP.
                </li>
                <li>
                  Si tienes un password o contraseña que te permita el acceso a
                  un área no pública de la Plataforma, no podrás revelar o
                  compartir ese password o contraseña con terceras personas o
                  usar la contraseña para propósitos no autorizados.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="7">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              VII. AVISO DE PRIVACIDAD
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                A través de este enlace encontrarás la Política de Tratamiento
                de Datos Personales que regirá el Tratamiento de tus Datos
                Personales, la cual aceptas previa y expresamente como Usuario o
                Cliente de la Plataforma y/o del APP de <b>Inverclick</b>, para
                los fines que allí se informan de manera previa, expresa e
                informada.
              </p>
              <p>
                Toda la información suministrada por los Usuarios/Clientes que
                en virtud de la Ley 1581 de 2011, su normatividad complementaria
                o aquella que la modifique sea considerada como dato personal,
                se encontrará sometida a la Política de Tratamiento de Datos
                Personales de <b>Inverclick</b> y será tratada para las
                finalidades dispuestas por esta. El procedimiento para la
                rectificación, actualización, supresión podrá ser realizado por
                los titulares de la misma de conformidad con el procedimiento
                establecido.
              </p>
              <p>
                <b>Inverclick</b> ofrecerá sus servicios o productos anunciados
                en la Plataforma o en el APP, basándose en las preferencias que
                el Usuario o Cliente haya identificado en la solicitud de
                registro o en un momento posterior a la misma.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="8">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              VIII. DE LA TRANSFERENCIA DE DATOS
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                En el evento de que <b>Inverclick</b> comparta datos personales
                de titulares con el CLIENTE, se entenderá que se hace bajo la
                modalidad de transferencia de datos personales y, con ocasión a
                ello, el CLIENTE asumirá el rol de RESPONSABLE sobre los datos
                personales que le sean transferidos por <b>Inverclick</b>, en su
                rol de RESPONSABLE.
              </p>
              <p>
                Bajo el anterior escenario, serán aplicables las siguientes
                disposiciones:
              </p>
              <p>
                Esta cláusula tiene como objeto establecer las condiciones
                aplicables a la transferencia de datos personales entre{" "}
                <b>Inverclick</b> (como RESPONSABLE) y el CLIENTE (quien asumirá
                también el rol de RESPONSABLE), bajo las finalidades autorizadas
                por el titular que se contemplan en la política de tratamiento
                de datos de Inverclick (la cual se encuentra en el siguiente
                link{" "}
                <a href="www.inverclick.com/privacy">
                  www.inverclick.com/privacy
                </a>
                ) y de acuerdo con la autorización otorgada por el titular.
              </p>
              <b>OBLIGACIONES DEL CLIENTE:</b>
              <ul className="ml-10 list-disc">
                <li>
                  Dar tratamiento a los datos personales de los titulares en su
                  calidad de RESPONSABLE de acuerdo con la política de
                  tratamiento de datos de <b>Inverclick</b>, las finalidades
                  autorizadas por el titular y los principios que los tutelan;
                  lo anterior, siempre que el CLIENTE no haya realizado la
                  captura de una nueva autorización de tratamiento de datos del
                  titular a su favor, en cuyo caso, podrá tratar los datos
                  personales bajo su política de tratamiento de datos y las
                  finalidades allí contempladas.
                </li>
                <li>
                  Declarar conocer y acatar el contenido de la política de
                  tratamiento de datos personales de <b>Inverclick</b>, así como
                  los estándares de seguridad consagrados en el modelo de
                  seguridad de la información de <b>Inverclick</b>.
                </li>
                <li>
                  Salvaguardar la seguridad de las bases de datos en los que se
                  contengan datos personales.
                </li>
                <li>
                  Guardar la confidencialidad respecto de los datos personales,
                  incluyendo extender este deber al personal que pueda tener
                  relación con el tratamiento de los datos.
                </li>
                <li>
                  Remitir a <b>Inverclick</b> toda PQR interpuesta por el
                  titular de los datos personales objeto de transferencia,
                  siempre que dicha PQR sea en relación con el tratamiento
                  realizado por <b>Inverclick</b>, dentro de los 2 días hábiles
                  siguientes a su recepción. Para ello deberá apoyar a{" "}
                  <b>Inverclick</b> suministrando la información que este
                  requiera para atender la solicitud del titular.
                </li>
                <li>
                  Proceder con la actualización y rectificación de datos
                  personales, cuando a ello haya lugar.
                </li>
                <li>
                  Cuando sea pertinente, remitir a <b>Inverclick</b> dentro de
                  los 5 días hábiles siguientes a la ocurrencia, toda la
                  información sobre cualquier incidente de seguridad que afecte
                  los datos personales que hayan sido transferidos y que pueda
                  implicar un riesgo para la seguridad de la información de{" "}
                  <b>Inverclick</b>.
                </li>
                <li>
                  Deberá notificar oportunamente y por escrito a{" "}
                  <b>Inverclick</b> de cualquier requerimiento que reciba de las
                  autoridades, relacionado con los datos personales transferidos
                  y que pueda implicar algún grado de responsabilidad para{" "}
                  <b>Inverclick</b>; el aviso deberá darse dentro de las 24
                  horas siguientes una vez el CLIENTE reciba la notificación,
                  cuando a ello haya lugar.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="9">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              IX. INFORMACIÓN INCLUIDA POR USUARIOS / CLIENTES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                El Usuario o Cliente será responsable de forma exclusiva y
                principal, por los textos y/o imágenes que publique en la
                Plataforma o en el APP, al igual que por las consecuencias de
                orden legal.
              </p>
              <p>El Usuario o Cliente no podrá:</p>
              <ul className="ml-10 list-disc">
                <li>
                  Incluir material que esté protegido por las leyes sobre
                  derechos de autor o cualquier otro derecho de propiedad
                  intelectual o industrial, a menos que el Usuario o Cliente sea
                  titular de tales derechos y/o se encuentre facultado para
                  comunicar públicamente los derechos incorporados en la
                  publicación. <b>Inverclick</b> presume de buena fe que el
                  Usuario o Cliente tiene las facultades necesarias para
                  publicar los textos o imágenes. Cualquier persona que acredite
                  mejor derecho o pueda sustentar la falta de capacidad del
                  Usuario o Cliente para la comunicación pública, podrá
                  comunicarse en cualquier tiempo con <b>Inverclick</b> a través
                  de los canales de comunicación dispuestos para que este lleve
                  a cabo las actuaciones pertinentes.
                </li>
                <li>
                  Incluir material que revele secretos industriales o
                  comerciales salvo que sea el legítimo propietario de los
                  mismos o haya obtenido autorización para el efecto.
                </li>
                <li>
                  Incluir material que pueda considerarse razonablemente como
                  obsceno, difamatorio, abusivo, amenazante u ofensivo para
                  cualquier persona natural o jurídica.
                </li>
                <li>
                  Incluir imágenes o información considerada como pornográfica,
                  que incluyan material sexual explícito o que sea considerada
                  como pornografía infantil en los términos del Decreto 1524 de
                  2002 o cualquier otra disposición legal o reglamentaria que
                  regule la materia.
                </li>
                <li>
                  Incluir publicidad o anuncios publicitarios en cualquier
                  modalidad, cadenas de cartas sin la previa y expresa
                  autorización de <b>Inverclick</b>.
                </li>
                <li>
                  Introducir en los servidores o cualquier otro sistema donde se
                  encuentre alojada la Plataforma o el APP, malware o programas
                  de computador con potencialidad para afectar software,
                  sistemas o herramientas.
                </li>
              </ul>
              <p>
                <b>Inverclick</b> no se responsabiliza por la información
                publicada por los Clientes o la publicidad anunciada por
                Terceros y, así lo entienden y aceptan los Usuarios y Clientes,
                quienes antes de realizar cualquier transacción o negociación
                deben verificar que la información entregada por quien realiza
                la oferta o la publicidad sea correcta.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="10">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              X. OBLIGACIONES DE LOS CLIENTES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>El Cliente deberá:</p>
              <ul className="ml-10 list-disc">
                <li>
                  Pagar a <b>Inverclick</b> la remuneración acordada en la forma
                  y tiempos establecidos para la prestación del servicio y, por
                  tanto, mantenerse a paz y salvo en sus obligaciones.
                </li>
                <li>
                  Entregar las imágenes en formato .JPG o en los estándares que
                  sean indicados en el Portal. Igualmente, debe cumplir con las
                  especificaciones técnicas de los productos adquiridos en pro
                  del correcto funcionamiento de la Plataforma.
                </li>
                <li>
                  Garantizar que es el Propietario del inmueble y/o que cuenta
                  con la autorización del propietario para disponer del bien y
                  poder realizar la venta y/o arriendo del mismo.
                </li>
                <li>
                  Guardar custodia del usuario y clave para el acceso al Portal.
                  Dichas credenciales son de uso personal e intransferible, por
                  tanto, no está autorizado a compartirla con terceros o
                  comercializarlas. Cualquier novedad con las credenciales
                  deberá notificarla de manera inmediata a <b>Inverclick</b>.
                </li>
                <li>Mantener actualizada la información de los anuncios.</li>
                <li>
                  Atender dentro de los 5 días hábiles siguientes los
                  requerimientos de información que realice <b>Inverclick</b> y
                  los requerimientos relacionados con PQR presentadas por los
                  usuarios y/o clientes del Portal.
                </li>
                <li>
                  Utilizar de manera exclusiva los productos de{" "}
                  <b>Inverclick</b> y abstenerse de permitir su uso por parte de
                  terceros.
                </li>
                <li>
                  Abstenerse de operar como intermediario o vender a terceros
                  los servicios prestados por <b>Inverclick</b>.
                </li>
                <li>
                  No podrá utilizar sus cuentas de acceso o en general los
                  servicios contratados con <b>Inverclick</b>, para prestar los
                  mismos servicios a terceras personas, bien sea de forma
                  gratuita u onerosa, como un servicio independiente o
                  complementario a otras actividades.
                </li>
                <li>
                  Mantener indemne a <b>Inverclick</b> frente a cualquier
                  reclamación, queja o acción judicial que sea interpuesta por
                  cualquier tercero o autoridad competente, como consecuencia de
                  su incumplimiento.
                </li>
              </ul>
              <p>
                En caso de que el CLIENTE desee dar por terminado de manera
                unilateral el contrato u orden de compra suscrito con{" "}
                <b>Inverclick</b>, podrá hacerlo siempre que medie un preaviso
                por escrito que debe ser enviado al correo:
                <a href="mailto:contactenos@inverclick.com">
                  contactenos@inverclick.com
                </a>
                .El preaviso debe ser de 60 días calendario, los cuales
                empezarán a contar a partir de la siguiente fecha de corte de la
                respectiva orden de compra o contrato. Durante el término de
                preaviso, el contrato u orden de compra continuará vigente.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="11">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XI. REGISTRO Y CONTRASEÑA (PASSWORD)
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Cada persona natural o jurídica que se encuentre interesada bien
                sea en adquirir u ofrecer para la venta, arriendo, permuta o
                cualquier otro negocio traslaticio en todo o en parte el derecho
                de dominio deberá registrarse de forma gratuita en la Plataforma
                o en la APP llenando los campos del formulario exclusivamente
                con información verdadera y de su propiedad. El nombre de
                usuario o su contraseña es de uso personal e intransferible.
                Cada Usuario /Cliente será responsable de forma exclusiva por la
                confidencialidad de su nombre de usuario y contraseña. En ese
                mismo sentido, el Usuario/Cliente será responsable de forma
                directa, exclusiva y excluyente por la destinación que le dé a
                su usuario.
              </p>
              <p>
                El Usuario o Cliente notificará a <b>Inverclick</b> de forma
                inmediata cuando conozca que su nombre de usuario y/o contraseña
                han sido vulnerados o terceros ajenos se encuentran haciendo uso
                de ella sin su consentimiento.
              </p>
              <p>
                <b>Inverclick</b> presume de buena fe que los datos ingresados
                por el Usuario y Cliente en su registro corresponde a los de su
                propia identidad o a la de un tercero con la debida
                representación. La verificación previa y automática que realiza
                el titular del dominio se ceñirá estrictamente al suministro de
                la totalidad de la información útil, pertinente y necesaria para
                que los demás Usuarios y/o Clientes tengan razonable
                confiabilidad sobre las transacciones que pretendan realizar.
                Será deber de los Usuarios o Clientes, de acuerdo a las reglas
                de la lógica o de la experiencia, evaluar de manera razonable
                las ofertas y oferentes a fin de formarse un consentimiento
                serio sobre la transacción que pretende llevar a cabo.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="12">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XII. CESIÓN DEL USUARIO
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Las cuentas de usuario registradas no podrán ser objeto de
                venta, cesión o cualquier otro título traslaticio sin el
                consentimiento previo y escrito de Inverclick autorizado para
                tal fin. Tanto el enajenante como el adquirente serán
                responsables de forma exclusiva y excluyente por la
                transferencia del usuario por fuera del procedimiento señalado.
              </p>
              <p>
                <b>Inverclick</b> no responderá económica u operativamente por
                la transferencia a cualquier título de las cuentas de usuario
                registradas sin su autorización previa y escrita. El titular
                originario (y único titular) será el responsable por los
                contenidos, imágenes, anuncios, ofertas, promociones que sean
                publicadas desde su perfil. <b>Inverclick</b> presume de buena
                fe que cada una de las cuentas de usuario registradas está
                siendo usada por sus legítimos titulares.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="13">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XIII. NATURALEZA DE LOS SERVICIOS PRESTADOS POR INVERCLICK
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                La Plataforma y el APP son un Portal de Contacto, bajo los
                lineamientos que ello implica, salvo que se informe lo contrario
                en los respectivos términos y condiciones del servicio
                respectivo.
              </p>
              <b>Portal de contacto</b>
              <p>
                En atención a que la Plataforma y el APP, es un espacio
                electrónico para el ofrecimiento de bienes inmuebles por parte
                de terceras personas ajenas a <b>Inverclick</b>, con el fin que
                los Usuarios o Clientes a la misma puedan contactar a los
                propietarios, corredores o cualquier otra forma de
                intermediarios para la concreción de negocios jurídicos
                (compraventa, permuta o arriendo) sin estar vinculado en ninguno
                de los extremos de la relación jurídica que entre estos surja,
                de acuerdo con la Ley 1480 de 2011 y su normatividad
                complementaria o aquella que la modifique, el servicio prestado
                por <b>Inverclick</b> trata de un portal de contacto, teniendo
                únicamente como deberes a su cargo:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Exigir a todos los oferentes información que permita su
                  identificación, para lo cual tendrá un registro en el que
                  conste, como mínimo:
                  <ul className="ml-10 list-disc">
                    <li>Nombre o razón social del oferente</li>
                    <li>Documento de identificación</li>
                    <li>Dirección física de notificaciones de contacto</li>
                    <li>
                      Permitir la consulta de dicha información a quien acredite
                      debidamente haber preparado o celebrado negocios jurídicos
                      con el o los oferentes asociados a la transferencia del
                      derecho de dominio o concesión del derecho de uso, con el
                      propósito de presentar una queja o reclamo directamente
                      con el oferente.
                    </li>
                  </ul>
                </li>
                <li>
                  Sin perjuicio de lo anterior, Inverclick podrá solicitar al
                  oferente información adicional, antes o durante el tiempo en
                  que el anuncio esté circulando o que considere relevante para
                  sus intereses o el de los consumidores.
                </li>
              </ul>
              <p>
                Si <b>Inverclick</b> llega a ser notificada por un usuario
                acerca de la existencia de información falsa, errónea, inexacta,
                incompleta o que incumpla con estos términos y condiciones,
                podrá realizar las averiguaciones e indagaciones pertinentes a
                fin de corroborar las aseveraciones que fueron conocidas. En
                caso de evidenciar tales fallas o tener razonable sospecha sobre
                su veracidad, autenticidad o verificabilidad, podrá desmontar el
                aviso comunicándolo al anunciante, sin lugar a reembolso alguno
                por el dinero pagado en ello.
              </p>
              <p>
                Igualmente, bajo duda razonable, <b>Inverclick</b> podrá
                expulsar, remover, eliminar o prohibir -sin reembolso alguno- el
                acceso de Usuarios o Clientes a la Plataforma o al APP por la
                omisión o infracción de estos términos y condiciones o de las
                leyes aplicables, cuando se hace uso de este.
              </p>
              <p>
                El mapa dispuesto en la Plataforma solamente mostrará al Usuario
                o Cliente de manera aleatoria doscientos (200) inmuebles que
                hayan sido publicados por los Clientes, independientemente si el
                número de publicaciones haya sido superior al momento de su
                consulta.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="14">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XIV. CONDICIONES ESPECIALES PARA ALGUNOS SERVICIOS
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <b>Servicio de acompañamiento en tu búsqueda</b>
              <p>
                <b>Inverclick</b> podrá acompañarte en la búsqueda de tu
                inmueble, si así lo solicitas en nuestra Plataforma; en este
                caso, <b>Inverclick</b> podrá ponerse en contacto contigo para
                conocer mejor tus preferencias, presupuesto y necesidades y así,
                presentarte posibles opciones para tu selección; igualmente te
                pondremos en contacto con la inmobiliaria y te acompañaremos en
                tu proceso de compra o arrendamiento ayudándote a agendar
                visitas a los inmuebles, te brindaremos información general
                sobre la zona y las posibles gestiones que debes realizar para
                adquirirlo o tomarlo en arriendo.
              </p>
              <p>
                Este acompañamiento en ningún momento constituirá recomendación,
                consejo, ni asesoría por parte de <b>Inverclick</b> en relación
                con el bien y, estará bajo tu absoluta responsabilidad revisar
                el estado y condición del inmueble, su historial, antecedentes y
                asesorarte legalmente de un experto; igualmente, será de tu
                responsabilidad adelantar la negociación con el vendedor y/o con
                la inmobiliaria y realizar los trámites que se requieran para la
                adquisición o toma en arriendo del inmueble, en tal sentido{" "}
                <b>Inverclick</b> no asumirá ninguna responsabilidad al
                respecto.
              </p>
              <p>
                Es tu responsabilidad averiguar y verificar los posibles
                defectos, anomalías o irregularidades que pueda presentar el
                inmueble, revisar que el bien cumple con la función de uso que
                motiva la adquisición o arriendo y que el mismo no suponga un
                riesgo para tu vida o salud y la de tu familia. Nuestro servicio
                solamente consistirá en un acompañamiento que busca mejorar tu
                experiencia en nuestra Plataforma y en ningún caso, seremos
                responsables por el estado del bien, los términos de la
                negociación y las decisiones que tomes como comprador o
                arrendatario.
              </p>
              <b>Publicación de inmuebles ocasionales</b>
              <p>
                El Cliente podrá realizar cambios en: Tipo de oferta, ubicación
                o tipo de inmueble dentro de los 3 días calendario siguientes
                después de realizada la publicación. Estas modificaciones son
                autogestionables y las debe realizar el Cliente con su usuario y
                contraseña.
              </p>
              <b>Servicios adquiridos mediante televenta</b>
              <p>
                <b>Inverclick</b> podrá contactarse con Usuarios o Clientes para
                ofrecerles la adquisición de los servicios, mediante llamada
                telefónica asistida, en la cual uno de nuestros asesores le
                brindará toda la información sobre el paquete a adquirir, las
                características, los beneficios, los términos y condiciones, el
                valor, la duración del servicio, así como sus derechos y
                obligaciones.
              </p>
              <p>
                En caso de estar de acuerdo con el servicio ofrecido, el Usuario
                o Cliente podrá aceptarlo durante la llamada y proceder a
                realizar el pago conforme a las indicaciones que le informe el
                asesor y, una vez realizado el pago, se entenderá que el
                servicio fue adquirido por el Cliente de conformidad con estos
                términos y condiciones y con los que le haya informado el asesor
                durante la llamada; para efectos legales, se entenderá que el
                Cliente dio la aceptación al contrato de manera verbal y que a
                partir de allí empezará la relación comercial entre las partes.
                En todo caso, al correo electrónico indicado, le será remitida
                la información del servicio adquirido.
              </p>
              <b>Paquete Plan +</b>
              <p>
                <b>Inverclick</b> pone a tu disposición el paquete de
                publicaciones Plan +, el cual consiste en adquirir cierto número
                de cupos de publicaciones para que puedas ofrecer en nuestra
                Plataforma, el número de inmuebles que incluya el Plan, ejemplo
                Plan +3, Plan +5, etc.
              </p>
              <p>Este servicio tiene las siguientes condiciones:</p>
              <ul className="ml-10 list-disc">
                <li>
                  El número de inmuebles que podrás publicar dependerá del
                  número de cupos que incluya el Plan + que adquieras y que{" "}
                  <b>Inverclick</b> te haya ofrecido.
                </li>
                <li>
                  Una vez adquirido el paquete Plan + podrás hacer uso de este,
                  dentro del término de vigencia que te sea informado en el
                  momento de la compra.
                </li>
                <li>
                  El término durante el cual estará publicado cada cupo es de
                  noventa (90) días calendario, contados a partir de la
                  publicación y corre de manera individual para cada inmueble
                  publicado.
                </li>
                <li>
                  No serán cupos rotativos, razón por la cual, si por alguna
                  circunstancia, llegas a des publicar un inmueble, ya no podrás
                  utilizar ese cupo.
                </li>
                <li>
                  No aplica para republicaciones; esto quiere decir que,
                  únicamente podrás publicar inmuebles que no hayas publicado
                  antes.
                </li>
                <li>
                  Solo podrás adquirir y tener activo un paquete de publicación
                  Plan +. Una vez utilices el último cupo del plan, podrás
                  volver a adquirir el mismo plan o uno distinto, siempre que
                  Inverclick aún lo tenga disponible.
                </li>
                <li>
                  El precio del Plan + será el indicado en la Plataforma de{" "}
                  <b>Inverclick</b> al momento de hacer el pago.
                </li>
                <li>
                  Cada inmueble tendrá su código individual de identificación
                  dentro de la Plataforma de <b>Inverclick</b>.
                </li>
                <li>
                  El Plan + tendrá acceso a las mismas funcionalidades
                  disponibles para el Paquete Básico que ofrece{" "}
                  <b>Inverclick</b>.
                </li>
                <li>
                  <b>Inverclick</b> podrá modificar estas condiciones, sin
                  embargo, te informará con al menos diez (10) días hábiles de
                  anterioridad y te respetará las condiciones bajo las cuales
                  hayas adquirido el paquete Plan +.
                </li>
              </ul>
              <b>Servicios Complementarios</b>
              <p>
                El Cliente podrá adquirir servicios complementarios que le sean
                ofrecidos por <b>Inverclick</b> en el momento de comprar su
                servicio principal, tales como, destacar inmuebles, incluir
                etiquetas, entre otros servicios.
              </p>
              <p>
                Dichos servicios deberán ser utilizados dentro de la vigencia
                del servicio principal y aplicarán las condiciones para su
                activación, uso, vigencia, funcionamiento, tarifas, entre otros,
                que le sean informados en el momento de la venta.
              </p>
              <b>Otros servicios</b>
              <p>
                <b>Inverclick</b> podrá prestar servicios, ofrecer productos
                adicionales o accesorios en la Plataforma o en el APP, de forma
                directa o a través de un tercero, cuyos términos y condiciones
                serán los señalados al momento de tomar el servicio.
              </p>
              <p>
                Los servicios ofrecidos por terceros serán prestados
                directamente por el tercero bajo los términos y condiciones que
                él disponga, por lo cual, el Usuario o Cliente deberá
                consultarlos previo a adquirir el servicio; <b>Inverclick</b> no
                asumirá responsabilidad alguna por la prestación del servicio
                que realice el tercero.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="15">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XV. RESPONSABILIDAD
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                <b>Inverclick</b> actúa solamente como un lugar o escenario para
                que oferentes publiquen oportunidades de negocios (compras,
                ventas, arriendos, entre otros) en relación con inmuebles y, en
                general, obtengan información útil relativa a este mercado, por
                lo anterior <b>Inverclick</b>:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  No revisa ni censura las oportunidades de negocios publicadas.
                </li>
                <li>
                  No está involucrado ni se involucra en las transacciones o
                  negocios entre los oferentes y los Usuarios. Los criterios de
                  selección de las oportunidades de negocios que se publican en{" "}
                  <b>Inverclick</b> son responsabilidad exclusiva de cada
                  Usuario o Cliente.
                </li>
                <li>
                  No tiene ni ejerce control alguno sobre la calidad, seguridad
                  o legalidad de los bienes, servicios, negocios o transacciones
                  ofrecidas o publicadas.
                </li>
                <li>
                  Tampoco tiene ni ejerce control alguno sobre la veracidad o
                  exactitud de la información publicada por los Usuarios o
                  Clientes, ni sobre la capacidad o cumplimiento de los Usuarios
                  o Clientes para ejecutar o cumplir con las transacciones o
                  negocios ofrecidos o publicados.
                </li>
                <li>
                  No tiene ni ejerce control alguno sobre la veracidad,
                  exactitud y calidad de la información publicada por los
                  Usuarios o Clientes y en consecuencia no es responsable ni
                  otorga garantía alguna, expresa o implícita, sobre el mismo.
                </li>
                <li>
                  Reconoces y aceptas que el uso de la Plataforma, de los
                  contenidos y de los servicios tiene lugar en todo caso bajo tu
                  única y exclusiva responsabilidad.
                </li>
              </ul>
              <p>
                Ten en cuenta que existen riesgos asociados a tratar con
                terceros desconocidos, con menores de edad o personas que actúan
                bajo falsas pretensiones. Por lo anterior, asumes todos los
                riesgos asociados de tratar con otros usuarios con los cuales
                entres en contacto a través de <b>Inverclick</b>.
              </p>
              <p>
                El cumplimiento de los términos y condiciones de los contratos o
                acuerdos que llegues a celebrar con otros Usuarios y/o Clientes,
                así como el cumplimiento de las leyes aplicables a tales
                contratos o acuerdos, es de tu exclusiva responsabilidad y del
                Usuario o Cliente con el que celebres el contrato, y no de esta
                Plataforma.
              </p>
              <p>
                Debido a que la autenticidad de los usuarios de internet no
                puede garantizarse, <b>Inverclick</b> no puede confirmar y no
                confirma que cada Usuario o Cliente es quien dice ser. Debido a
                que <b>Inverclick</b> no se involucra en las relaciones o tratos
                entre sus Usuarios o Clientes ni controla el comportamiento de
                los Usuarios o Clientes en <b>Inverclick</b>, en el evento en
                que tengas una diferencia o controversia con otros
                Usuarios/Clientes, liberas a <b>Inverclick</b> de cualquier
                reclamación, demanda o daño de cualquier naturaleza que surja
                con ocasión a dicha disputa.
              </p>
              <p>
                Atendiendo que <b>Inverclick</b> no controla la información
                suministrada por los Usuarios o Clientes, dicha información
                podría ser ofensiva, dañina o inexacta y en algunos casos puede
                ser titulada o rotulada de manera errónea o decepcionante, por
                lo que <b>Inverclick</b> espera que emplees la debida precaución
                y sentido común cuando uses esta Plataforma o el APP.
              </p>
              <p>
                Nada de lo incluido en la Plataforma o en el APP por{" "}
                <b>Inverclick</b>, por sus proveedores o por los Usuarios o
                Clientes constituye recomendación, asesoría o consejo
                suministrado por <b>Inverclick</b>. El uso de la Plataforma o el
                APP y del material, al igual que las decisiones que adoptes, se
                hacen bajo tu propio y exclusivo riesgo. Inverclick recomienda
                que todas las decisiones que pretendas adoptar con base en el
                material y cualquier otra información incluida en la Plataforma
                o en el APP, sean consultadas con tus propios asesores y
                consultores. Inverclick no será responsable por cualquier
                decisión que tomes con base en el uso de la Plataforma.
              </p>
              <p>
                Los precios, especificaciones, ubicación y en general la
                información relativa a los inmuebles publicados pueden variar
                dependiendo de diferentes circunstancias. Las fotografías son de
                referencia y los precios están sujetos a cambios sin previo
                aviso.
              </p>
              <p>
                Los Usuarios y Clientes reconocen y aceptan que son los únicos
                responsables por la información contenida en las oportunidades
                de negocios o transacciones que sean incluidas o publicadas por
                ellos en la Plataforma o en el APP.
              </p>
              <p>
                <b>Inverclick</b> no garantiza que la Plataforma o el APP opere
                libre de errores o que la Plataforma y su servidor se encuentren
                libres de virus u otros mecanismos o agentes maliciosos; si el
                uso de la Plataforma o el APP o del material resulta en la
                necesidad de prestar servicio de reparación, mantenimiento o
                reemplazo de equipos o información, <b>Inverclick</b> no es
                responsable por los costos que ello implique.
              </p>
              <p>
                Así mismo, <b>Inverclick</b> se excluye de cualquier
                responsabilidad por los daños y perjuicios de toda naturaleza
                que puedan causarse debido a las fallas en el sistema, en el
                servidor o en Internet. La Plataforma o el APP pueden
                eventualmente no estar disponibles debido a dificultades
                técnicas, en tal caso, <b>Inverclick</b> procurará restablecerlo
                con la mayor celeridad posible sin que por ello pueda existir
                algún tipo de responsabilidad.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="16">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XVI. PROMOCIONES, CONCURSOS Y EVENTOS
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Las promociones, concursos, sorteos y eventos que se implementen
                estarán sujetas a las reglas y condiciones que en cada
                oportunidad se establezca por parte de <b>Inverclick</b> y lo
                dispuesto en la regulación colombiana sobre la materia.
              </p>
              <p>
                Será necesario como requisito mínimo para acceder a tales
                oportunidades o beneficios comerciales, que el usuario se
                encuentre debidamente registrado en la Plataforma.
              </p>
              <p>
                <b>Inverclick</b> no se responsabiliza por cualquier tipo de
                daño incluyendo moral, físico, material, ni de cualquier otra
                índole que pudiera invocarse como relacionado con la recepción
                por parte del usuario registrado de cualquier tipo de obsequios
                o regalos remitidos por <b>Inverclick</b>. Así mismo,{" "}
                <b>Inverclick</b> no será responsable por las consecuencias que
                pudiere causar el ingreso a la Plataforma o la presencia en
                cualquier evento o reunión organizada por este.
              </p>
              <p>
                Cada promoción, concurso o evento que se promueva o realice a
                través de la Plataforma o del APP, estará sujeto a las reglas de
                privacidad que para el mismo se indiquen, por lo que la
                participación en los mismos deberá atenerse a lo que en cada
                caso se señale de manera complementaria con las políticas de
                privacidad de <b>Inverclick</b>.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="17">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XVII. PROTECCIÓN AL CONSUMIDOR
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <b>Garantía legal</b>
              <p>
                Cuando por causas demostradas imputables a <b>Inverclick</b>,
                los servicios ofrecidos no sean prestados o se ejecuten
                evidenciando fallas o deficiencias, el Usuario o Cliente deberá
                informar a <b>Inverclick</b> el defecto presentado y la fecha en
                la cual fue contratado.
              </p>
              <p>
                En esos casos, <b>Inverclick</b> podrá:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Prestar nuevamente el mismo servicio de acuerdo con las
                  condiciones ofrecidas y sin ningún tipo de cargo adicional,
                </li>
                <li>
                  Ofrecer un servicio similar como compensación del servicio no
                  prestado o prestado de manera deficiente o
                </li>
                <li>
                  Procederá con la devolución del dinero por el mismo medio en
                  el que se realizó el pago.
                </li>
              </ul>
              <p>
                En caso de devolución del dinero, <b>Inverclick</b> solicitará
                los documentos requeridos por las Entidades Financieras y/o
                empresas de procesamiento de pagos electrónicos, a fin de
                adelantar la correspondiente gestión. <b>Inverclick</b> tendrá
                quince (15) días hábiles después de tomada la decisión para
                realizar la devolución del dinero pagado.
              </p>
              <b>Derecho de retracto</b>
              <p>
                Para los servicios que empiezan a ejecutarse una vez se realiza
                el pago, no se entiende pactado el derecho de retracto, de
                acuerdo con la normatividad vigente.
              </p>
              <p>
                En los demás casos, podrás ejercer el derecho de retracto, para
                lo cual deberás tener en cuenta lo siguiente:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  La reclamación debe ser realizada dentro de los 5 días hábiles
                  siguientes al recibo del producto o servicio. El Cliente
                  deberá hacer la devolución del producto por el mismo medio y
                  en las mismas condiciones en que lo recibió. Los costos de
                  transporte y los demás que conlleve la devolución del bien
                  serán cubiertos por el consumidor, de conformidad con las
                  disposiciones normativas.
                </li>
                <li>
                  El producto debe estar nuevo, sin abrir, debe estar sin uso
                  con todos sus empaques originales, piezas, accesorios,
                  manuales completos y etiquetas adheridas al mismo, en caso de
                  aplicar.
                </li>
                <li>
                  En el caso de productos que requieren armado, ya sea por parte
                  del cliente o por parte de un técnico indicado por la marca,
                  el derecho de retracto, solo se podrá hacer efectivo si el
                  producto no ha sido desembalado y se mantiene en su embalaje
                  original, en caso de aplicar.
                </li>
                <li>
                  Para ejercer este derecho debes remitir un correo electrónico
                  a{" "}
                  <a href="mailto:contactenos@inverclick.com">
                    contactenos@inverclick.com
                  </a>{" "}
                  indicando el número de la orden y el número de cédula del
                  Usuario o Cliente.
                </li>
                <li>
                  <b>Inverclick</b> tendrá 30 días calendario para realizar la
                  devolución del dinero contados desde el momento en que el
                  cliente ejerció su derecho de retracto.
                </li>
              </ul>
              <b>Derecho de Reversión de Pago</b>
              <p>
                Para el caso de los productos y servicios adquiridos por medio
                de tarjeta de crédito, débito o cualquier otro medio de pago
                electrónico, el Usuario o Cliente podrá solicitar la reversión
                de los pagos si se presenta alguno de los siguientes eventos:
              </p>
              <ul className="ml-10 list-disc">
                <li>Por ser objeto de fraude</li>
                <li>Que corresponda a una operación no solicitada</li>
                <li>Que el producto adquirido no sea recibido</li>
                <li>
                  Que el producto entregado no corresponda a lo solicitado, no
                  cumpla con las características inherentes o las atribuidas por
                  la información que se suministre sobre él.
                </li>
                <li>Que el producto sea defectuoso.</li>
              </ul>
              <p>
                Para el efecto, dentro de los cinco (5) días hábiles siguientes
                a la fecha en la que el Usuario/Cliente advirtió la existencia
                de la causal, deberá solicitar:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  La reversión a su entidad bancaria y notificar a{" "}
                  <b>Inverclick</b> sobre la solicitud de reversión del pago,
                  explicando las razones que fundamentan la solicitud,
                  identificando la causal específica, indicando la cuenta,
                  tarjeta o instrumento de pago al que fue cargada la operación
                  en el formato dispuesto Aquí. Los participantes del proceso de
                  pago dispondrán de quince (15) días hábiles para hacerla
                  efectiva.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="18">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XVIII. DECLARACIÓN DE ORIGEN DE FONDOS
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                El Usuario o Cliente declara y certifica que él ni la entidad
                que pudiera estar representando, así como ninguno de sus
                accionistas y administradores, se encuentran incursos en
                procesos o investigaciones frente a delitos de lavado de
                activos, financiación del terrorismo, hechos asociados a
                corrupción o soborno y no se encuentran registrados en listas
                restrictivas. Igualmente declara que el origen de sus recursos
                es lícito y provienen de la actividad comercial legal que
                desarrolla. Así mismo, se obliga a no prestar su cuenta y a no
                permitir que terceros desconocidos por este, efectúen depósitos
                o transferencias a su cuenta y a no hacer pagos o transferencias
                desde su cuenta a terceros desconocidos.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="19">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              IXX. SUGERENCIAS PARA EL BUEN FUNCIONAMIENTO DE LA PLATAFORMA O EL
              APP
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <ul className="ml-10 list-disc">
                <li>No es funcional el sistema operativo Windows server.</li>
                <li>Se recomienda no navegar en Safari.</li>
                <li>
                  En caso de utilizar Internet Explorer se aconseja tener la
                  versión 8 en adelante.
                </li>
                <li>Es fundamental que el equipo posea un solo antivirus.</li>
                <li>Es necesario no tener proxy o restricciones en la red.</li>
                <li>
                  El ancho de banda debe ser mínimo de 512 kbps por equipo.
                </li>
                <li>La versión de Flash Player debe estar actualizada.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="20">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XX. CANALES DE CONTACTO
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Recuerda que en cualquier momento podrás hacer la selección,
                actualización o modificación de tus canales de contacto para
                fines comerciales, de publicidad y de cobranza a través del
                formulario que ha dispuesto <b>Inverclick</b> en cumplimiento de
                ley 2300/23, el cual podrás encontrar en el siguiente link:
                <a href="www.inverclick.com/contact">
                  www.inverclick.com/contact
                </a>{" "}
              </p>
              <p>
                En caso de no seleccionar tus canales, entenderemos que nos
                autorizas para seguirnos contactando a través de los datos de
                contacto que le has suministrado a <b>Inverclick</b> y a los
                canales asociados a los mismos, tales como tu correo
                electrónico, llamada, mensaje de texto, WhatsApp y/o mensajería
                web y app.
              </p>
              <p>
                Para cancelar el recibimiento de mensajes publicitarios podrás
                diligenciar el siguiente formulario:
                <a href="https://emailInverclick.com/pub/sf/FormLink">
                  https://emailInverclick.com/pub/sf/FormLink
                </a>
                .
              </p>
              <p>
                O podrás enviar tu solicitud al correo
                <a href="mailto:contactenos@inverclick.com">
                  contactenos@inverclick.com
                </a>
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="21">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XXI. PROCEDIMIENTO PQRS
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                Las PQRS presentadas ante <b>Inverclick</b> deberán contener
                como mínimo los siguientes aspectos:
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  Nombres y apellidos completos del solicitante, de su
                  representante y/o apoderado (de ser el caso) o razón social
                </li>
                <li>
                  Documento de identidad del solicitante y/o número de
                  identificación de la persona a la que se representa
                </li>
                <li>
                  Indicar la dirección de correo electrónico donde recibirá la
                  respuesta a su solicitud
                </li>
                <li>
                  El objeto de la PQRS y las razones en las que se fundamenta
                </li>
                <li>
                  Los documentos que desee presentar para iniciar el trámite
                </li>
              </ul>
              <b>Tiempos de Respuesta</b>
              <ul className="ml-10 list-disc">
                <li>
                  Las peticiones, quejas y reclamos se resolverán en el término
                  de quince (15) días hábiles contados a partir del día
                  siguiente a su recepción.
                </li>
                <li>
                  Las peticiones de documentos y de información se resolverán en
                  el término de diez (10) días hábiles contados a partir del día
                  siguiente a su recepción.
                </li>
                <li>
                  Cuando no sea posible para <b>Inverclick</b> dar una respuesta
                  en los plazos antes señalados, se informará (antes del
                  vencimiento del plazo) al interesado al correo electrónico
                  indicado que se informó en la PQR, expresando los motivos de
                  la demora y señalando a la vez el plazo en que se resolverá o
                  dará respuesta, el cual no excederá del doble del inicialmente
                  previsto.
                </li>
              </ul>
              <b>Canales de atención</b>
              <b>Inverclick</b> tiene dispuesto para la atención de PQR el
              correo electrónico:{" "}
              <a href="mailto:contactenos@inverclick.com">
                contactenos@inverclick.com
              </a>{" "}
              y sus canales de WhatsApp, chat y call center.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="22">
            <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
              XXII. DISPOSICIONES FINALES
            </AccordionTriggerWithArrowFirst>
            <AccordionContent className="ml-14 space-y-2 text-lg">
              <p>
                <b>Inverclick</b> tendrá la facultad discrecional de eliminar,
                borrar, corregir, adaptar cualquier texto o imagen publicados
                por sus Usuarios o Clientes en la Plataforma o en el APP cuando
                evidencie, por su propia cuenta o a través de información de
                terceros, que la publicación contraría en todo o en partes estos
                Términos y Condiciones, derechos de terceros, el ordenamiento
                jurídico de la República de Colombia o cualquier otra norma que
                en virtud de tratados o instrumentos internacionales resulte
                vinculante. En tales situaciones, comunicará al usuario titular
                de la publicación la decisión adoptada y las razones por las
                cuales se procedió. El usuario o cliente podrá oponerse
                fundadamente a la actuación, presentando su queja a través de
                los canales de comunicación dispuestos.
              </p>
              <p>
                La Plataforma y el APP se rigen por las leyes vigentes y
                aplicables en la República de Colombia. <b>Inverclick</b> no
                asume responsabilidad alguna por cualquiera de los textos o
                imágenes que no se encuentren de acuerdo con las leyes de
                terceros países, o tratados o instrumentos internacionales no
                vinculantes para la República de Colombia.
              </p>
              <p>
                <b>Inverclick</b> no garantiza que las publicaciones, textos o
                imágenes sean accesibles o visibles en países distintos al
                territorio que comprende la República de Colombia, o que tal
                material se encuentre de acuerdo con leyes distintas a las de la
                República de Colombia. El Usuario o Cliente que acceda a la
                Plataforma o al APP será individual y exclusivamente responsable
                del cumplimiento de las leyes aplicables a la jurisdicción en la
                que se encuentre.
              </p>
              <p>
                De presentarse decisión judicial que declare la nulidad,
                invalidez o ineficacia de alguna de las disposiciones de estos
                Términos y Condiciones, ello no afectará la subsistencia y la
                producción de efectos jurídicos de las demás declaraciones aquí
                contenidas.
              </p>
              <p>
                <b>Inverclick</b> no tiene deber legal o contractual alguno para
                inspeccionar las publicaciones, ofertas o bienes publicados.
                Igualmente, <b>Inverclick</b> no tiene participación o
                injerencia alguna en los actos o negocios jurídicos que se
                celebren entre los Usuarios y Clientes de la Plataforma o del
                APP. La selección y celebración de actos o negocios jurídicos
                por parte de Usuarios o Clientes solamente compromete entre sí
                las declaraciones de voluntad que estos realicen.
              </p>
              <p>
                Cualquier interacción entre Usuarios o Clientes, independiente
                del motivo o finalidad que se hayan propuesto con ello, es de
                exclusiva y excluyente responsabilidad de los intervinientes.{" "}
                <b>Inverclick</b> no será responsable civil o penalmente por los
                hechos que ocasionaren algún perjuicio, moral o patrimonial, que
                tenga como origen las interacciones entre usuarios en la
                Plataforma o en el APP. Sin perjuicio de ello, en virtud de
                solicitud de autoridad judicial o administrativa,{" "}
                <b>Inverclick</b> podrá suministrar información que se pueda
                recolectar sobre la presunta comisión de conductas punibles o
                hechos dañosos.
              </p>
              <p>
                <b>INTERESES MORATORIOS Y GASTOS DE COBRANZA.</b> En caso de que
                el Cliente y/o Usuario hayan adquirido servicios y/o productos
                ofrecidos por <b>Inverclick</b> y el Cliente presente mora en el
                pago, se causará a favor de <b>Inverclick</b> los respectivos
                intereses moratorios a la tasa más alta legalmente permitida.
                Igualmente, si para lograr el pago, <b>Inverclick</b> debe
                incurrir en gastos de cobranza, estos serán cobrados y asumidos
                por el Cliente, con ocasión a la actividad desplegada por la
                gestión de cobro.
              </p>
              <p>
                <b>CAPACIDAD LEGAL.</b> El uso de los servicios prestados por{" "}
                <b>Inverclick</b> está reservado exclusivamente para personas
                con capacidad legal para contratar y obligarse. No podrán
                utilizar los servicios las personas que no tengan tal condición,
                incluidos las personas menores de edad. <b>Inverclick</b>, no
                asume ningún tipo de responsabilidad frente a las operaciones
                realizadas por personas sin las capacidades correspondientes
                para contratar o por la veracidad de los datos registrados.
              </p>
              <p>
                <b>LINKS A OTROS WEB SITES.</b> <b>Inverclick</b> contiene o
                puede contener links o vínculos a Web Sites de terceros. Estos
                links o vínculos se suministran para su conveniencia e
                información únicamente; <b>Inverclick</b> no respalda,
                recomienda o asume responsabilidad alguna sobre el contenido de
                los Web Sites de terceros. Si decides acceder a través de los
                links o vínculos a los Web Sites de terceros, lo haces bajo tu
                propio riesgo.
              </p>
              <p>
                <b>FINANCIACIÓN.</b> El cálculo del monto máximo a financiar y
                de cuotas, en las calculadoras de crédito comercial o leasing,
                se basan en estándares de la industria, y solo se pueden
                utilizar como referencia. Tampoco incluyen costos adicionales.
                Las entidades bancarias se reservan el derecho de aplicar sus
                políticas de crédito al momento de ofrecer posibilidades de
                financiamiento a los Usuarios o Clientes que hayan solicitado
                ese servicio.
              </p>
              <p>
                <b>DISCLAIMERS SOBRE LOS ANUNCIOS</b>
              </p>
              <ul className="ml-10 list-disc">
                <li>
                  La clasificación del estrato es potestativa del municipio, el
                  anunciante no puede comprometerse con una clasificación
                  determinada del estrato el cual queda definido en el momento
                  de recibo de la obra.
                </li>
                <li>
                  Las Constructoras pueden variar los precios del proyecto,
                  según sus políticas de comercialización.
                </li>
                <li>
                  Los precios de los inmuebles pueden no incluir el precio del
                  parqueadero o depósito.
                </li>
                <li>
                  Los proyectos inmobiliarios podrán estar sujetos a
                  modificaciones conforme el trámite de licencias urbanísticas o
                  los requisitos legales que sean adelantados por el Constructor
                  del Proyecto.
                </li>
                <li>
                  No se permite a los Usuarios la publicación de proyectos
                  nuevos en donde el constructor o patrimonio autónomo inicial
                  mantengan el control y responsabilidad del inmueble; tampoco
                  se podrán publicar proyectos sobre planos y en construcción;
                  inmuebles nuevos o para estrenar o cualquier inmueble que su
                  estado no sea usado. Estas publicaciones serán reguladas en
                  los acuerdos que se suscriban con inmobiliarias o
                  constructoras.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </article>
      <Footer />
    </main>
  );
}
