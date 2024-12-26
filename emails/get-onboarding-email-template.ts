import { ENV_VARS } from "@/global/env";

export const getOnboardingEmailTemplate = ({
  to,
  userId,
}: {
  to: string;
  userId: string;
}) => {
  const ONBOARDING_PAGE = `${ENV_VARS.BASE_URL}/auth/onboarding/${userId}`;

  return {
    to,
    subject: "Continúa con tu proceso de registro en Inverclick",
    body: `<p>Estás a punto de empezar tu camino hacia la inversión inteligente. Descubre oportunidades exclusivas de inversión en bienes raíces. Conéctate con proyectos diseñados para hacer crecer tu patrimonio y asegura tu futuro financiero. <a href='${ONBOARDING_PAGE}'>Completa tu registro aquí</a></p>`,
  };
};
