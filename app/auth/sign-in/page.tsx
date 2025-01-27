import { SignInForm } from "@/app/auth/sign-in/_components/sign-in-form";
import { CardService } from "@/components/shared/card-service";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col lg:h-screen">
        <Header />
        <div className="lg:divided-background flex-grow">
          <article className="mx-auto grid h-full max-w-screen-2xl grid-cols-1 lg:grid-cols-2">
            <LeftSection />
            <RightSection />
          </article>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function LeftSection() {
  return (
    <div className="p-content lg:p-content-full relative flex items-center justify-center">
      <h2 className="text-center text-3xl font-bold lg:text-left lg:text-5xl">
        <p>¡Nos alegramos</p>
        <p>
          de volver a <span className="text-primary-500">VERTE!</span>
        </p>
      </h2>
      <CardService
        title="Soy constructora"
        link="https://company.inverclick.com"
        className="absolute bottom-4 left-4 hidden lg:flex"
        target="_blank"
      />
    </div>
  );
}

function RightSection() {
  return (
    <div className="p-content-full flex w-full flex-col items-center justify-center">
      <SignInForm />
    </div>
  );
}
