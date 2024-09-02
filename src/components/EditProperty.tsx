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
import { Pencil } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import PropertyType from "@/types/PropertyType";

export function EditProperty({ currentPropertyData }: { currentPropertyData: PropertyType }) {
  const [propertyData, setPropertyData] = useState<PropertyType>({ PropertyId: currentPropertyData.PropertyId } as PropertyType);
  const [isOpen, setIsOpen] = useState(false);

  const editProperty = async () => {
    const res = await fetch('/api/v1/properties', {
      method: "PATCH",
      body: JSON.stringify(propertyData)
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
              value={propertyData?.Name || currentPropertyData.Name}
              onChange={({ target: { value } }) => setPropertyData(prev => ({ ...prev, Name: currentPropertyData.Name === value ? undefined : value } as PropertyType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left">
              Address
            </Label>
            <Input
              id="address"
              className="col-span-3"
              value={propertyData?.Address || currentPropertyData.Address}
              onChange={({ target: { value } }) => setPropertyData(prev => ({ ...prev, Address: currentPropertyData.Address === value ? undefined : value } as PropertyType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left">
              Type
            </Label>
            <Select
              value={propertyData?.Type || currentPropertyData.Type}
              onValueChange={(value) => setPropertyData(prev => ({ ...prev, Type: currentPropertyData.Type === value ? undefined : value } as PropertyType))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rental" className="text-left">
              Rental Cost ($)
            </Label>
            <Input
              id="rental"
              className="col-span-3"
              type="number"
              value={propertyData?.RentalCost === 0 ? "" : propertyData?.RentalCost || currentPropertyData.RentalCost}
              onChange={({ target: { value } }) => setPropertyData(prev => ({ ...prev, RentalCost: +currentPropertyData.RentalCost === +value ? undefined : +value } as PropertyType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unitsNumber" className="text-left">
              Units Number
            </Label>
            <Input
              id="unitsNumber"
              className="col-span-3"
              type="number"
              value={propertyData?.UnitsNumber === 0 ? "" : propertyData?.UnitsNumber || currentPropertyData.UnitsNumber}
              onChange={({ target: { value } }) => setPropertyData(prev => ({ ...prev, UnitsNumber: +currentPropertyData.UnitsNumber === +value ? undefined : +value } as PropertyType))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={editProperty} type="submit" variant="outline" className="bg-green-500 hover:bg-green-400">
            save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
