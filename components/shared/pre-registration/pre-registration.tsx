"use client";

import { usePreRegistration } from "@/contexts/pre-registration-context";
import { PreRegistrationValues } from "@/types/pre-registration";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@inverclick/inverclick-ui/dialog";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

import * as yup from "yup";

export const PreRegistration = () => {
  const { isPreRegistrationOpen } = usePreRegistration();

  return <>{isPreRegistrationOpen && <PreRegistrationContent />}</>;
};

const PreRegistrationContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    isPreRegistrationOpen,
    setIsPreRegistrationOpen,
    setPreRegistration,
  } = usePreRegistration();

  const router = useRouter();

  const form = useFormik<PreRegistrationValues>({
    validateOnMount: true,
    initialValues: { name: "", email: "" },
    validationSchema: createFormSchema(),
    onSubmit: async ({ name, email }) => {
      setIsLoading(true);

      const response = await fetch("/api/pre-registration", {
        body: JSON.stringify({
          name,
          email,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const preRegistration = await response.json();

      setPreRegistration(preRegistration);
      setIsPreRegistrationOpen(false);

      setIsLoading(false);

      router.refresh();
    },
  });

  return (
    <Dialog
      open={isPreRegistrationOpen}
      onOpenChange={setIsPreRegistrationOpen}
    >
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Pre-registro</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, optio
            praesentium! Doloremque cumque, porro repellendus quae sed
            praesentium voluptatem corporis veniam exercitationem magnam iusto
            dicta sapiente fuga expedita deleniti assumenda?
          </DialogDescription>
        </DialogHeader>
        <FormikProvider value={form}>
          <Form id="pre-registration" className="my-4">
            <InputFormikNT
              id="name"
              form={form}
              classNames={{
                container: "mb-4",
              }}
              properties={{
                input: {
                  placeholder: "Nombre",
                },
              }}
            />
            <InputFormikNT
              id="email"
              form={form}
              properties={{
                input: {
                  id: "email",
                  placeholder: "Correo electrónico",
                },
              }}
            />
          </Form>
        </FormikProvider>
        <DialogFooter>
          <Button form="pre-registration" type="submit" isLoading={isLoading}>
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function createFormSchema() {
  return yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  });
}
