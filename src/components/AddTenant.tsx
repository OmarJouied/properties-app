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
import { PlusCircle, PlusIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";
import TenantType from "@/types/TenantType";
import getProperties from "@/utils/getProperties";
import PropertyType from "@/types/PropertyType";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function AddTenant() {
  const [tenantData, setTenantData] = useState<TenantType>({
    Email: "", Name: "", TenantId: "", PhoneNumber: "", PropertyId: 0
  });
  const [isOpen, setIsOpen] = useState(false);
  const [propertiesAvilable, setPropertiesAvilable] = useState<PropertyType[]>();

  useEffect(() => {
    (async () => {
      const data = await getProperties({} as ReadonlyHeaders);
      setPropertiesAvilable(data.properties);
    })()
  }, [])


  const submitTenant = async () => {
    const res = await fetch('/api/v1/tenants', {
      method: "POST",
      body: JSON.stringify(tenantData)
    });
    const { error, msg } = await res.json();

    if (!error) setIsOpen(false);
    alert(msg);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); setTenantData({ Email: "", Name: "", TenantId: "", PhoneNumber: "", PropertyId: 0 }) }}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1 bg-green-700 hover:bg-green-600">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Tenant
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Add Tenant</DialogTitle>
          <DialogDescription>
            Add information about tenant, and click add button to save.
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
              value={tenantData.Name}
              onChange={({ target: { value } }) => setTenantData(prev => ({ ...prev, Name: value } as TenantType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              value={tenantData.Email}
              onChange={({ target: { value } }) => setTenantData(prev => ({ ...prev, Email: value } as TenantType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rental" className="text-left">
              Phone Number
            </Label>
            <Input
              id="rental"
              className="col-span-3"
              value={tenantData.PhoneNumber || ""}
              onChange={({ target: { value } }) => setTenantData(prev => ({ ...prev, PhoneNumber: value } as TenantType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left">
              Property
            </Label>
            <Select
              value={tenantData.PropertyId as unknown as string}
              onValueChange={(value) => setTenantData(prev => ({ ...prev, PropertyId: +value } as TenantType))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  {
                    propertiesAvilable?.map(property => (<SelectItem value={property.PropertyId}>{property.PropertyId}: {property.Name}</SelectItem>))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submitTenant} type="submit" variant="outline" className="bg-green-500 hover:bg-green-400">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
