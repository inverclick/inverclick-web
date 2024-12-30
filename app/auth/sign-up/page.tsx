import { SignUpForm } from "@/app/auth/sign-up/_components/sign-up-form";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col lg:h-screen">
        <Header />
        <div className="flex-grow lg:divided-background-2">
          <article className="grid grid-cols-1 lg:grid-cols-2 place-content-center max-w-screen-2xl h-full mx-auto">
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
    <div className="order-2 lg:order-1 p-content-full">
      <SignUpForm />
    </div>
  );
}

function RightSection() {
  return (
    <div className="order-1 lg:order-2 relative flex justify-center items-center p-content lg:p-content-full">
      <h2 className="text-center lg:text-left text-3xl lg:text-5xl font-bold">
        <p>¡Nos alegramos</p>
        <p>
          de volver a <span className="text-primary">VERTE!</span>
        </p>
      </h2>
    </div>
  );
}
