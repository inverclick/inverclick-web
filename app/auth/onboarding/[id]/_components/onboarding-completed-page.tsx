import {
  GO_HOME,
  ONBOARDING_COMPLETED,
} from "@/app/auth/onboarding/[id]/_constants/messages";
import { Button } from "@inverclick/inverclick-ui/button";
import { Typography } from "@inverclick/inverclick-ui/typography";

import Image from "next/image";
import Link from "next/link";

export const CompletedOnboardingPage = () => {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <Typography className="mb-4">{ONBOARDING_COMPLETED}</Typography>
      <Button>
        <Link href="/">{GO_HOME}</Link>
      </Button>
      <Image
        unoptimized
        className="absolute bottom-0 left-0 right-0 -z-10 h-full w-full object-cover"
        src="/main-page/main-background.avif"
        alt="Inverclick fondo de pantalla"
        width="1200"
        height="1200"
      />
    </section>
  );
};
