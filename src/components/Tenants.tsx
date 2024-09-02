import TenantType from "@/types/TenantType"
import Tenant from "./Tenant"

const Tenants = async ({ tenants }: { tenants: TenantType[] }) => {
  // const res = await getTenants(headers());
  // const { tenants } = res.error ? [] : res;

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,_350px)] justify-center gap-4">
      {tenants.map(tenant => (
        <Tenant key={tenant.PropertyId} tenant={tenant} />
      ))}
    </div>
  )
}

export default Tenants