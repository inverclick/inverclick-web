import { Project } from "@/types/domain/projects";

export type MessagesSource = "db" | "local";

export type Chatter = {
  id: string;
  leadId: string;
  name: string;
  email: string;
  messagesSource: MessagesSource;
};

export type Sender = "user" | "assistant";

export type FunctionOutput =
  | GoToProjectsWithFiltersFunctionOutput
  | GoToProjectsFunctionOutput
  | SimulateCreditFunctionOutput
  | GoToProjectFunctionOutput
  | QuestionAboutProjectFunctionOutput
  | QuestionAboutInverclickFunctionOutput
  | ScheduleAnAppointmentFunctionOutput;

export type GoToProjectsWithFiltersFunctionOutput = {
  action: "go_to_projects";
  response_message: string;
  params: {
    filter: string;
  };
};

export type GoToProjectsFunctionOutput = {
  action: "go_to_projects";
  response_message: string;
};

export type SimulateCreditFunctionOutput =
  | SimulateCreditVoidFunctionOutput
  | SimulateCreditByValueHousingFunctionOutput
  | SimulateCreditByQuotaValueFunctionOutput;

export type SimulateCreditVoidFunctionOutput = {
  response_message: string;
};

export type SimulateCreditByValueHousingFunctionOutput = {
  data: {
    response_message: string;
  };
  amountFunded: string;
  monthlyInterestRate: string;
  fixedQuota: string;
  insurance: string;
  totalQuota: string;
};

export type SimulateCreditByQuotaValueFunctionOutput = {
  data: {
    response_message: string;
  };
  amountFunded: string;
  monthlyInterestRate: string;
  response_message: string;
};

export type GoToProjectFunctionOutput =
  | { response_message: string }
  | {
      action: "go_to_project";
      _id: string;
      params: {
        project_id: string;
        typology_id: string;
      };
    };

export type QuestionAboutProjectFunctionOutput = {
  response_message: string;
} & Project;

export type QuestionAboutInverclickFunctionOutput = { output: string };

export type ScheduleAnAppointmentFunctionOutput = {
  action: "schedule_an_appointment";
  response_message: string;
  params: {
    projectId: string;
    date: string; // 2025-10-03
    time: string; // 10:35
    email: string;
  };
};
