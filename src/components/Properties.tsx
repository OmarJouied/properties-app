import PropertyType from "@/types/PropertyType"
import Property from "./Property"
import getTenants from "@/utils/getTenants"
import { headers } from "next/headers"

const Properties = async ({ properties }: { properties: PropertyType[] }) => {
  const res = await getTenants(headers());
  const { tenants } = res.error ? [] : res;

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,_350px)] justify-center gap-4">
      {properties.map(property => (
        <Property key={property.PropertyId} property={property} tenants={tenants} />
      ))}
    </div>
  )
}

export default Properties