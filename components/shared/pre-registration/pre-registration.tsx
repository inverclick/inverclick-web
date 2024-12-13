"use client";

import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@inverclick/inverclick-ui/dialog";
import { usePreRegistration } from "@/contexts/pre-registration-context";
import { useRouter } from "next/navigation";
import { Form, FormikProvider, useFormik } from "formik";
import { InputControl } from "@inverclick/inverclick-ui/input-control";

export const PreRegistration = () => {
  const form = useFormik({
    initialValues: { name: "", email: "" },
    onSubmit: async ({ name, email }) => {
      await fetch("/api/pre-registration", {
        body: JSON.stringify({
          name: "Juan",
          email: "juan@gmail.com",
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsPreRegistrationOpen(false);

      router.refresh();
    },
  });

  const { isPreRegistrationOpen, setIsPreRegistrationOpen } =
    usePreRegistration();

  const router = useRouter();

  return (
    <Dialog
      open={isPreRegistrationOpen}
      onOpenChange={setIsPreRegistrationOpen}
    >
      <DialogContent>
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
          <Form id="pre-registration">
            <InputControl
              classNames={{
                container: "mb-4",
              }}
              properties={{
                input: {
                  id: "name",
                  placeholder: "Nombre",
                },
              }}
            />
            <InputControl
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
          <Button form="pre-registration" type="submit">
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
