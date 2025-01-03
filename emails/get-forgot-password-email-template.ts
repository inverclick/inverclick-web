export function getForgotPasswordEmailTemplate({
  to,
  code,
}: {
  to: string;
  code: string;
}) {
  return {
    to,
    subject: "Restablece tu contraseña",
    body: `
      <h1>Parece que has olvidado tu contraseña</h1>
      <p>Este es el código para recuperar tu contraseña: <strong>${code}</strong></p>
    `,
  };
}
