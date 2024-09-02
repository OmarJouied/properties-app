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
import { LayoutGrid, Phone } from "lucide-react"
import { DeleteProperty } from "./DeleteProperty"
import { EditProperty } from "./EditProperty"
import TenantType from "@/types/TenantType"
import { EditTenant } from "./EditTenant"
import { DeleteTenant } from "./DeleteTenant"

const Tenant = ({ tenant: { Name, Email, PhoneNumber, PropertyId, TenantId } }: { tenant: TenantType }) => {
  return (
    <Card className="w-full md:w-[350px]">
      <CardHeader>
        <CardTitle>{Name}</CardTitle>
        <CardDescription className="flex">
          <Phone className="h-4 w-4" />
          {/* https://www.google.com/maps/place/address */}
          {PhoneNumber}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between align-center">
          <div className="flex gap-1">
            <LayoutGrid />
            <span>section <span className="font-bold">{PropertyId}</span></span>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address" className="text-left">
            Email
          </Label>
          <p className="text-sm">{Email}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <EditTenant currentTenantData={{ Name, Email, PhoneNumber, PropertyId, TenantId }} />
        <DeleteTenant TenantId={TenantId} />
      </CardFooter>
    </Card>
  )
}

export default Tenant