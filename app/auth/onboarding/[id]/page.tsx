import { InvalidOnboardingPage } from "@/app/auth/onboarding/[id]/_components/invalid-onboarding-page";
import { CompletedOnboardingPage } from "@/app/auth/onboarding/[id]/_components/onboarding-completed-page";
import { OnboardingForm } from "@/app/auth/onboarding/[id]/_components/onboarding-form";
import { getUser } from "@/app/auth/onboarding/[id]/_services/get-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
  description:
    "Completa tu perfil y accede a oportunidades exclusivas de inversión en bienes raíces. Descubre proyectos diseñados para hacer crecer tu patrimonio y asegurar tu futuro financiero.",
};

export type OnboardingPageParams = Readonly<{
  params: { id: string };
}>;

export default async function OnboardingPage({
  params: { id },
}: OnboardingPageParams) {
  const { data: user } = await getUser({ id });

  if (!user) {
    return <InvalidOnboardingPage />;
  }

  if (user.is_confirmed) {
    return <CompletedOnboardingPage />;
  }

  return (
    <main className="p-content-full flex min-h-screen w-screen justify-center lg:items-center">
      <OnboardingForm user={user} />
    </main>
  );
}
