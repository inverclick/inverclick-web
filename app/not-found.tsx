import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center gap-2">
      <h2 className="text-5xl text-primary-700">404</h2>
      <p className="text-2xl mb-4">Página no encontrada</p>
      <Link
        href="/"
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
      >
        Volver al inicio
      </Link>
      <Image
        unoptimized
        className="absolute bottom-0 left-0 right-0 object-cover -z-10 h-full w-full"
        src="/main-page/main-background.avif"
        alt="Inverclick fondo de pantalla"
        width="1200"
        height="1200"
      />
    </section>
  );
}
