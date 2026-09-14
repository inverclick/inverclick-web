import { FavoritesContent } from "@/app/favorites/_components/favorites-content";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis favoritos",
  robots: "noindex, nofollow",
};

export default function FavoritesPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <Header />
      <div className="p-content-full mx-auto w-full max-w-screen-2xl flex-1">
        <FavoritesContent />
      </div>
      <Footer />
    </main>
  );
}
