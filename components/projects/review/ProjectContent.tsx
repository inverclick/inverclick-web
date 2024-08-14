import React, { Suspense } from "react";
import { StickyContact } from "./StickyContact";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectLocation } from "./ProjectLocation";
import Image from "next/image";
import { ProjectCharacteristics } from "./ProjectCharacteristics";
import { HOUSING_STATE_TYPE } from "@/types/project";
import { IBLUEPRINT } from "@/types/blueprint";
import { Typologies } from "./Typologies";
import { Urbanism } from "./Urbanism";
import { getAssetUrl } from "@/services/utils";
import { CreditSimulador } from "@/components/financing/CreditSimulador";

interface DescriptionProps {
  name: string;
  description: string;
  companyName: string;
  companyLogo: string;
  housingState: HOUSING_STATE_TYPE;
  department: string;
  city: string;
  projectLogo: string;
  address: string;
  projectId: string;
  stratum: number;
  characteristics: { label: string; _id: string }[];
  units: number;
  deadline?: string;
  typologies: IBLUEPRINT[];
  location: {
    lat: number;
    lng: number;
  };
  urbanismFiles: string[];
}

export const ProjectContent = ({
  typologies,
  urbanismFiles,
  characteristics,
  name,
  description,
  location,
  address,
  city,
  department,
  projectLogo,
  projectId,
  companyLogo,
  companyName,
  housingState,
  stratum,
  units,
  deadline,
}: DescriptionProps) => {
  return (
    <article className="flex gap-4">
      <Tabs defaultValue="description" className="flex-1">
        <TabsList className="flex items-center ">
          <TabsTrigger value="description">Descripción</TabsTrigger>
          <TabsTrigger value="types">Tipologías</TabsTrigger>
          <TabsTrigger value="urban">Urbanismo</TabsTrigger>
          <TabsTrigger 
            value="credit" 
            className="mx-6 px-2 py-1 border border-primary-600 rounded-lg text-base md:text-lg lg:text-xl hover:bg-primary-100 transition-colors ease-in !no-underline"
          >Simulador de crédito</TabsTrigger>
        </TabsList>
        <div className="flex gap-6 ">
          <div className="flex-1 flex flex-col gap-6 mb-6">
            <TabsContent value="description">
              <div className="flex flex-col gap-3 pb-6">
                <div className="flex flex-col gap-6 lg:flex-row mt-6">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Image
                      unoptimized
                      width={100}
                      height={100}
                      src={getAssetUrl(projectLogo)}
                      alt={name}
                      className="md:h-[80px] lg:w-[100px] lg:h-[100px]"
                    />
                    <p className="text-xs lg:text-sm font-light">
                      ID&nbsp;Proyecto:&nbsp;
                      <span className="text-primary-600">{projectId}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-2xl lg:text-3xl mb-2">
                      {name}
                    </p>
                    <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-3xl">
                      {description.split("\n").map((p, i) => (
                        <p
                          key={i}
                          className="md:max-w-4xl text-sm text-pretty font-light"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <hr />
                <Suspense>
                  <ProjectCharacteristics
                    characteristics={characteristics}
                    companyLogo={companyLogo}
                    companyName={companyName}
                    housingState={housingState}
                    stratum={stratum}
                    units={units}
                    deadline={deadline}
                  />
                </Suspense>
                <ProjectLocation
                  lat={location.lat}
                  lng={location.lng}
                  address={address}
                  city={city}
                  department={department}
                />
                <section>
                  <h3 className="font-medium text-2xl mb-10">Simulador de crédito</h3>
                  <CreditSimulador />
                </section>
                <hr />
              </div>
            </TabsContent>
            <TabsContent value="types">
              <Typologies typologies={typologies} />
            </TabsContent>
            <TabsContent value="urban">
              <Urbanism urbanismFiles={urbanismFiles} />
            </TabsContent>
            <TabsContent value="credit">
              <h3 className="font-medium text-2xl mb-10">Simulador de crédito</h3>
              <CreditSimulador />
            </TabsContent>
          </div>
          <StickyContact />
        </div>
      </Tabs>
    </article>
  );
};
