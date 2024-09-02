import PropertyType from "@/types/PropertyType"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LayoutGrid, MapPin } from "lucide-react"
import { DeleteProperty } from "./DeleteProperty"
import { EditProperty } from "./EditProperty"
import TenantType from "@/types/TenantType"

const Property = ({ property: { Name, Address, PropertyId, RentalCost, Type, UnitsNumber }, tenants }: { property: PropertyType; tenants: TenantType[] }) => {
  return (
    <Card className="w-full md:w-[350px]">
      <CardHeader>
        <CardTitle>{Name} | {Type}</CardTitle>
        <CardDescription className="flex">
          <MapPin className="h-4 w-4" />
          {/* https://www.google.com/maps/place/address */}
          {Address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between align-center">
          <div className="flex gap-1">
            <LayoutGrid />
            <span>{UnitsNumber} rooms</span>
          </div>
          <div className="flex gap-1">
            <Label className="font-bold text-sm flex items-end">${RentalCost}</Label>
            <CardDescription className="text-xs">/monthly</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="address" className="text-left">
            Tenant
          </Label>
          <p className="text-sm w-full">
            {
              // tenants.filter(tenant => tenant.PropertyId === +PropertyId)?.[0].Name.toUpperCase()
              tenants.find(tenant => tenant.PropertyId === +PropertyId)?.Name ? tenants.find(tenant => tenant.PropertyId === +PropertyId)?.Name
                : <span className="text-red-500">empty</span>
            }
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <EditProperty currentPropertyData={{ Name, Address, PropertyId, RentalCost, Type, UnitsNumber }} />
        <DeleteProperty PropertyId={PropertyId} />
      </CardFooter>
    </Card>
  )
}

export default Property