import {
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
} from "@/app/blog/_components/brand-icons";
import { CopyLinkButton } from "@/app/blog/_components/copy-link-button";
import { cn } from "@/lib/utils";

const BUTTON_CLASS_NAME =
  "flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:border-primary-600 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2";

const SHARE_TARGETS = [
  {
    name: "WhatsApp",
    Icon: WhatsAppIcon,
    getHref: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    name: "Facebook",
    Icon: FacebookIcon,
    getHref: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "X",
    Icon: XIcon,
    getHref: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "LinkedIn",
    Icon: LinkedInIcon,
    getHref: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

export type ShareButtonsProps = Readonly<{
  url: string;
  title: string;
  className?: string;
}>;

/** Enlaces para compartir: funcionan sin JavaScript, salvo "copiar enlace". */
export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  return (
    <ul
      aria-label="Compartir artículo"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {SHARE_TARGETS.map(({ name, Icon, getHref }) => (
        <li key={name}>
          <a
            href={getHref(url, title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${name}`}
            title={`Compartir en ${name}`}
            className={BUTTON_CLASS_NAME}
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
      <li>
        <CopyLinkButton url={url} className={BUTTON_CLASS_NAME} />
      </li>
    </ul>
  );
}
