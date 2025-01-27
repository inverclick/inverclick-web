import { SignUpForm } from "@/app/auth/sign-up/_components/sign-up-form";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col lg:h-screen">
        <Header />
        <div className="lg:divided-background-2 flex-grow">
          <article className="mx-auto grid h-full max-w-screen-2xl grid-cols-1 place-content-center lg:grid-cols-2">
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
    <div className="p-content-full order-2 lg:order-1">
      <SignUpForm />
    </div>
  );
}

function RightSection() {
  return (
    <div className="p-content lg:p-content-full relative order-1 flex items-center justify-center lg:order-2">
      <h2 className="text-center text-3xl font-bold lg:text-left lg:text-5xl">
        <p>¡Nos alegramos</p>
        <p>
          de volver a <span className="text-primary">VERTE!</span>
        </p>
      </h2>
    </div>
  );
}
