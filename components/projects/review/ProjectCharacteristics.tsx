import { getAssetUrl } from "@/services/utils";
import { HOUSING_STATE_LABEL, HOUSING_STATE_TYPE } from "@/types/project";
import { BadgeCheck, Check } from "lucide-react";
import Image from "next/image";
import dayjs from "dayjs";
import React from "react";
import { Characteristic } from "@/types/characteristic";
import { supabase } from "@/services/supabase";

interface Props {
  companyLogo: string;
  companyName: string;
  housingState: HOUSING_STATE_TYPE;
  deadline?: string;
  units: number;
  stratum: number;
  characteristics: Characteristic[];
}

export const ProjectCharacteristics = async ({
  companyLogo,
  companyName,
  housingState,
  stratum,
  units,
  deadline,
  characteristics,
}: Props) => {
  const { data } = await supabase.from("characteristics").select("*");
  return (
    <section>
      <p className="font-medium text-2xl mb-8">Características del proyecto</p>
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <article className="flex-1">
          <p className="font-light">
            Constructora: <span className="font-medium">{companyName}</span>
          </p>
          <div className="flex gap-6 items-center pl-4 mt-2 mb-6 md:mb-8">
            <Image
              alt={companyName}
              src={getAssetUrl(companyLogo)}
              width={80}
              height={80}
              unoptimized
            />
            <div>
              <div className="flex justify-center items-center gap-2 bg-gray-300/30 px-2 py-1 text-xs rounded-xl border border-black">
                <BadgeCheck className="text-green-600 h-5 w-5" />
                Constructora verificada
              </div>
            </div>
          </div>
          <p className="font-light">
            Estado proyecto:{" "}
            <span className="font-medium">
              {HOUSING_STATE_LABEL[housingState]}
            </span>
          </p>
          {deadline?.length ? (
            <p className="font-light">
              Fecha de entrega:{" "}
              <span className="font-medium">
                {dayjs(deadline).format("DD/MM/YYYY")} <sup>*</sup>
              </span>
            </p>
          ) : null}
          <p className="font-light">
            Unidades disponibles:{" "}
            <span className="font-medium">
              {units}
              <sup>*</sup>{" "}
            </span>
          </p>
          <p className="font-light">
            Estrato: <span className="font-medium">{stratum}</span>
          </p>

          <p className="font-medium mt-6 md:mt-8">
            Financiación colombianos en el exterior:
          </p>
          <div className="flex gap-8 mt-2 mb-6">
            <Image
              unoptimized
              alt="Banco Unión"
              src="/main-page/banco_union.jpeg"
              width={70}
              height={30}
              className="object-contain"
            />
            <Image
              unoptimized
              alt="Banco Unión"
              src="/main-page/davivienda-logo.png"
              width={180}
              height={40}
              className="object-contain"
            />
          </div>
          <p className="text-xs">
            <sup>*</sup>Consultar con un asesor:
          </p>
          <p className="text-xs">
            Los precios, fechas de entrega y disponibilidad pueden cambiar sin
            previo aviso.
          </p>
        </article>
        <ul className="min-w-64 mr-6">
          {data!.map(({ label, id }) => {
            if (!characteristics.find((c) => c.id === id)) {
              return (
                <li
                  key={id}
                  className="flex gap-2 items-center font-light mb-1 line-through decoration-primary-600"
                >
                  <div className="w-5 h-5" />
                  {label}
                </li>
              );
            }
            return (
              <li key={id} className="flex gap-2 items-center font-light mb-1">
                <Check className="w-5 h-5 text-green-600" />
                {label}
              </li>
            );
          })}
          {characteristics
            .filter((c) => !data!.find((d) => d.id === c.id))
            .map(({ label, id }) => (
              <li key={id} className="flex gap-2 items-center font-light mb-1">
                <Check className="w-5 h-5 text-green-600" />
                {label}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
