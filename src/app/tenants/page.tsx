import HeaderTenants from "@/components/HeaderTenants";
import Tenants from "@/components/Tenants";
import getTenants from "@/utils/getTenants";
import { headers } from "next/headers";

export default async function Home() {
  const data = await getTenants(headers());

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <header className="w-full">
        <HeaderTenants />
      </header>
      {data.tenants && (
        <Tenants tenants={data.tenants} />
      )}
    </main>
  );
}
