import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { DraftProject } from "@/app/projects/[project]/[typology]/preview/_services/get-draft-project";
import {
  HOUSING_STATE,
  HOUSING_TYPE,
  PROJECT_CLASS,
  PROJECT_STATUS,
  SUBSCRIPTION_STATUS,
} from "@/constants/enums";
import { MatchingProperties } from "@/types/typescript";

import * as yup from "yup";

export type MatchingProject = MatchingProperties<Project, DraftProject>;

export function isProjectComplete(
  project: DraftProject | Project
): project is Project {
  try {
    // const schema: yup.ObjectSchema<MatchingProject> = yup.object().shape({
    //   address: yup.string().required(),
    //   city_id: yup.number().required(),
    //   company_id: yup.string().uuid().required(),
    //   created_at: yup.string().required(),
    //   deadline: yup.string().nullable().defined(),
    //   department_id: yup.number().required(),
    //   description: yup.string().required(),
    //   features: yup.array(yup.string().defined()).required(),
    //   housing_state: yup
    //     .string()
    //     .oneOf(Object.values(HOUSING_STATE))
    //     .required(),
    //   housing_type: yup.string().oneOf(Object.values(HOUSING_TYPE)).required(),
    //   id: yup.string().uuid().required(),
    //   latitude: yup.number().required(),
    //   logo: yup.string().required(),
    //   longitude: yup.number().required(),
    //   name: yup.string().required(),
    //   photos: yup.array(yup.string().defined()).required(),
    //   plan_id: yup.string().uuid().optional().nullable(),
    //   project_class: yup
    //     .string()
    //     .oneOf(Object.values(PROJECT_CLASS))
    //     .required(),
    //   status: yup.string().oneOf(Object.values(PROJECT_STATUS)).required(),
    //   stratum: yup.number().required(),
    //   updated_at: yup.string().nullable().defined(),
    //   urbanism_files: yup.array(yup.string().defined()).required(),
    //   urbanism_photos: yup.array(yup.string().defined()).required(),
    //   videos: yup.array(yup.string().defined()).required(),
    //   valuation: yup.number().required(),
    //   valuation_months: yup.number().required(),
    //   characteristics: yup
    //     .array(
    //       yup.object().shape({
    //         characteristic_id: yup.string().uuid().required(),
    //         id: yup.string().uuid().required(),
    //         project_id: yup.string().uuid().required(),
    //         characteristic: yup.object().shape({
    //           icon: yup.string().required(),
    //           id: yup.string().uuid().required(),
    //           label: yup.string().required(),
    //           order: yup.number().required(),
    //         }),
    //       })
    //     )
    //     .required(),
    //   typologies: yup
    //     .array(
    //       yup.object().shape({
    //         area: yup.number().required(),
    //         bathrooms: yup.number().required(),
    //         blueprints: yup.array(yup.string().required()).required(),
    //         delivery_date: yup.string().nullable().defined(),
    //         description: yup
    //           .string()
    //           .transform((value) => (value === "" ? "non-empty" : value))
    //           .required(),
    //         id: yup.string().uuid().required(),
    //         name: yup.string().required(),
    //         order: yup.number().required(),
    //         parking: yup.number().nullable().defined(),
    //         price: yup.number().required(),
    //         private_area: yup.number().required(),
    //         project_id: yup.string().uuid().required(),
    //         rooms: yup.number().required(),
    //         units: yup.number().required(),
    //         updated_at: yup.string().nullable().defined(),
    //       })
    //     )
    //     .required(),
    //   department: yup
    //     .object()
    //     .shape({
    //       id: yup.number().required(),
    //       name: yup.string().required(),
    //     })
    //     .required(),
    //   city: yup
    //     .object()
    //     .shape({
    //       department_id: yup.number().required(),
    //       id: yup.number().required(),
    //       name: yup.string().required(),
    //     })
    //     .required(),
    //   company: yup
    //     .object()
    //     .shape({
    //       created_at: yup.string().required(),
    //       description: yup.string().nullable().defined(),
    //       id: yup.string().required(),
    //       logo_url: yup.string().required(),
    //       name: yup.string().required(),
    //       subscription_status: yup
    //         .string()
    //         .oneOf(Object.values(SUBSCRIPTION_STATUS))
    //         .required(),
    //     })
    //     .required(),
    // });

    // schema.validateSync(project);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
