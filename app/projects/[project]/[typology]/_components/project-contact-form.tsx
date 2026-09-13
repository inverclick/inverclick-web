"use client";

import { useUser } from "@/contexts/user-context";
import { cn } from "@/lib/utils";
import { requestProjectInfo } from "@/services/projects/request-project-info";
import { Button } from "@inverclick/inverclick-ui/button";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { PhoneInputFormikNT } from "@inverclick/inverclick-ui/phone-input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";
import { CircleCheck, Clock } from "lucide-react";
import { ComponentProps, useId, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import * as yup from "yup";

import Link from "next/link";

export type ProjectContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
};

export type ProjectContactFormProps = Readonly<{
  projectId: string;
  /**
   * En la vista previa de una constructora el id es el de un borrador, que no
   * existe en `projects`: se pinta el formulario pero no se envía nada.
   */
  isPreview?: boolean;
}> &
  Omit<ComponentProps<"div">, "children">;

/**
 * Formulario de solicitud de información de un proyecto.
 *
 * Llega precargado con los datos de la sesión (por heurística quien lo ve ya
 * está registrado) pero es editable: lo que el usuario envíe se guarda como una
 * foto de esa solicitud, sin tocar su perfil.
 *
 * El resultado vive solo en el estado del componente: si el usuario recarga o
 * vuelve a entrar al proyecto, el formulario aparece de nuevo. Lo que evita una
 * segunda solicitud es la API, no el front.
 */
export function ProjectContactForm({
  projectId,
  isPreview,
  className,
  ...props
}: ProjectContactFormProps) {
  const { user } = useUser();
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "sent" | "already-requested">(
    "idle"
  );

  const form = useFormik<ProjectContactFormValues>({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.client?.phone ?? "",
    },
    validationSchema: FORM_SCHEMA,
    onSubmit: async (values) => {
      const result = await requestProjectInfo({
        projectId,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone,
      });

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      setStatus(
        result.status === "already-requested" ? "already-requested" : "sent"
      );
    },
  });

  if (status !== "idle") {
    return (
      <ProjectContactFeedback
        variant={status}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div className={className} {...props}>
      <FormikProvider value={form}>
        <Form id={formId} className="flex flex-col">
          <InputFormikNT
            id="fullName"
            classNames={{ container: "mb-3" }}
            properties={{
              input: {
                autoComplete: "name",
                placeholder: "Nombre completo",
              },
            }}
          />
          <InputFormikNT
            id="email"
            classNames={{ container: "mb-3" }}
            properties={{
              input: {
                type: "email",
                autoComplete: "email",
                placeholder: "Correo electrónico",
              },
            }}
          />
          <PhoneInputFormikNT
            id="phone"
            classNames={{ container: "mb-4" }}
            properties={{
              phoneInput: {
                defaultCountry: "CO",
                placeholder: "Número de celular",
              },
            }}
          />
          <Typography className="mb-3 text-center text-xs text-muted-foreground">
            Al dar clic en enviar, aceptas la{" "}
            <Link
              href="/policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-2"
            >
              política de tratamiento de datos
            </Link>
            .
          </Typography>
          <Button
            type="submit"
            form={formId}
            className="w-full"
            isLoading={form.isSubmitting}
            disabled={form.isSubmitting || isPreview}
          >
            Enviar
          </Button>
          {isPreview && (
            <Typography className="mt-2 text-center text-xs text-muted-foreground">
              Vista previa: el formulario no envía solicitudes.
            </Typography>
          )}
        </Form>
      </FormikProvider>
    </div>
  );
}

const FORM_SCHEMA = yup.object({
  fullName: yup.string().trim().required("Ingresa tu nombre completo"),
  email: yup
    .string()
    .trim()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
  phone: yup
    .string()
    .required("Ingresa tu número de celular")
    .test("is-valid-phone", "Ingresa un número válido", (value) =>
      value ? isValidPhoneNumber(value) : false
    ),
});

type ProjectContactFeedbackProps = Readonly<{
  variant: "sent" | "already-requested";
}> &
  ComponentProps<"div">;

function ProjectContactFeedback({
  variant,
  className,
  ...props
}: ProjectContactFeedbackProps) {
  const isSent = variant === "sent";

  return (
    <div
      data-element="project-contact-feedback"
      className={cn(
        "flex flex-col items-center gap-2 rounded-md bg-muted/60 px-4 py-6 text-center",
        className
      )}
      {...props}
    >
      <Icon
        icon={isSent ? CircleCheck : Clock}
        className={cn("size-8", isSent ? "text-green-500" : "text-primary")}
      />
      <Typography className="font-medium">
        {isSent
          ? "¡Listo! Recibimos tus datos"
          : "Ya habíamos recibido tu solicitud"}
      </Typography>
      <Typography className="text-xs text-muted-foreground">
        {isSent
          ? "Un asesor se pondrá en contacto contigo muy pronto."
          : "Estamos trabajando en ella; un asesor te contactará muy pronto."}
      </Typography>
    </div>
  );
}
