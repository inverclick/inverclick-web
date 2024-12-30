import { SignInForm } from "@/app/auth/sign-in/_components/sign-in-form";
import { CardService } from "@/components/shared/card-service";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col lg:h-screen">
        <Header />
        <div className="flex-grow lg:divided-background">
          <article className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-2xl h-full mx-auto">
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
    <div className="relative flex justify-center items-center p-content lg:p-content-full">
      <h2 className="text-center lg:text-left text-3xl lg:text-5xl font-bold">
        <p>¡Nos alegramos</p>
        <p>
          de volver a <span className="text-primary-500">VERTE!</span>
        </p>
      </h2>
      <CardService
        title="Soy constructora"
        link="https://company.inverclick.com"
        className="hidden lg:flex absolute bottom-4 left-4"
        target="_blank"
      />
    </div>
  );
}

function RightSection() {
  return (
    <div className="flex flex-col justify-center items-center w-full p-content-full">
      <SignInForm />
    </div>
  );
}
