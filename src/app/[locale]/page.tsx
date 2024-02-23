import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <main className="flex flex-col items-center justify-center p-20">
      <h1>{t("title")}</h1>
    </main>
  );
}
