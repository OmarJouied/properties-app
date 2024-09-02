import TenantType from "@/types/TenantType";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

const getTenants = async (headers: ReadonlyHeaders) => {
  const host = process.env.HOST || "http://localhost:3000";
  const endPoint = `${host}/api/v1/tenants`;

  const res = await fetch(endPoint, {
    headers
  });
  return await res.json();
}

export default getTenants;