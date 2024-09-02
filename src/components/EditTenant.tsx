"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, PlusCircle, PlusIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";
import PropertyType from "@/types/PropertyType";
import TenantType from "@/types/TenantType";
import getProperties from "@/utils/getProperties";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function EditTenant({ currentTenantData }: { currentTenantData: TenantType }) {
  const [tenantData, setTenantData] = useState<TenantType>({ TenantId: currentTenantData.TenantId } as TenantType);
  const [isOpen, setIsOpen] = useState(false);
  const [propertiesAvilable, setPropertiesAvilable] = useState<PropertyType[]>();

  useEffect(() => {
    (async () => {
      const data = await getProperties({} as ReadonlyHeaders);
      setPropertiesAvilable(data.properties);
    })()
  }, [])

  const editTenant = async () => {
    const res = await fetch('/api/v1/tenants', {
      method: "PUT",
      body: JSON.stringify(tenantData)
    });
    const { error, msg } = await res.json();

    if (!error) setIsOpen(false);
    alert(msg);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-600 hover:bg-yellow-500">
          <Pencil className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>
            Edit information about property, and click save button to save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={tenantData?.Name || currentTenantData.Name}
              onChange={({ target: { value } }) => setTenantData(prev => ({ ...prev, Name: currentTenantData.Name === value ? undefined : value } as TenantType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              value={tenantData?.Email || currentTenantData.Email}
              onChange={({ target: { value } }) => setTenantData(prev => ({ ...prev, Email: currentTenantData.Email === value ? undefined : value } as TenantType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rental" className="text-left">
              Phone Number
            </Label>
            <Input
              id="rental"
              className="col-span-3"
              value={tenantData.PhoneNumber || currentTenantData.PhoneNumber}
              onChange={({ target: { value } }) => setTenantData(prev => ({ ...prev, PhoneNumber: currentTenantData.PhoneNumber === value ? undefined : value } as TenantType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left">
              Property
            </Label>
            <Select
              value={tenantData.PropertyId as unknown as string || currentTenantData.PropertyId as unknown as string}
              onValueChange={(value) => setTenantData(prev => ({ ...prev, PropertyId: +currentTenantData.PropertyId === +value ? undefined : +value } as TenantType))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Properties</SelectLabel>
                  {
                    propertiesAvilable?.map(property => (<SelectItem value={property.PropertyId}>{property.PropertyId}: {property.Name}</SelectItem>))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={editTenant} type="submit" variant="outline" className="bg-green-500 hover:bg-green-400">
            save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
