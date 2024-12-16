"use client";

import { usePreRegistration } from "@/contexts/pre-registration-context";
import { Button } from "@inverclick/inverclick-ui/button";

export const ViewInformationButton = () => {
  const { setIsPreRegistrationOpen } = usePreRegistration();

  return (
    <Button onClick={() => setIsPreRegistrationOpen(true)}>
      Ver información
    </Button>
  );
};
