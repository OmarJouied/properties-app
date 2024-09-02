import HeaderProperties from "@/components/HeaderProperties";
import Properties from "@/components/Properties";
import getProperties from "@/utils/getProperties";
import { headers } from "next/headers";

export default async function Home() {
  const data = await getProperties(headers());

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <header className="w-full">
        <HeaderProperties />
      </header>
      {data.properties && (
        <Properties properties={data.properties} />
      )}
    </main>
  );
}
