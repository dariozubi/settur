import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";

type Props = {
  from: string;
  className?: string;
  variant?: "h1" | "span" | "h2";
};

function Text({
  from,
  variant,
  className,
  children,
}: PropsWithChildren<Props>) {
  const t = useTranslations(from);
  const Tag = variant || "p";
  return (
    <Tag className={className}>
      {typeof children === "string" ? t(children) : children}
    </Tag>
  );
}

export default Text;
