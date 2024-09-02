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
import { useState } from "react";
import PropertyType from "@/types/PropertyType";

export function AddProperty() {
  const [propertyData, setPropertyData] = useState<PropertyType>({
    Address: "", Name: "", RentalCost: 0, Type: "", UnitsNumber: 0, PropertyId: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  const submitProperty = async () => {
    const res = await fetch('/api/v1/properties', {
      method: "POST",
      body: JSON.stringify(propertyData)
    });
    const { error, msg } = await res.json();

    if (!error) setIsOpen(false);
    alert(msg);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); setPropertyData({ Address: "", Name: "", RentalCost: 0, Type: "", UnitsNumber: 0, PropertyId: "" }) }}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1 bg-green-700 hover:bg-green-600">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Property
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Add Property</DialogTitle>
          <DialogDescription>
            Add information about property, and click add button to save.
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
              value={propertyData.Name}
              onChange={({ target: { value } }) => setPropertyData(prev => ({ ...prev, Name: value } as PropertyType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left">
              Address
            </Label>
            <Input
              id="address"
              className="col-span-3"
              value={propertyData.Address}
              onChange={({ target: { value } }) => setPropertyData(prev => ({ ...prev, Address: value } as PropertyType))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-left">
              Type
            </Label>
            <Select
              value={propertyData.Type}
              onValueChange={(value) => setPropertyData(prev => ({ ...prev, Type: value } as PropertyType))}
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
              value={propertyData.RentalCost || ""}
              onChange={({ target: { value } }) => setPropertyData(prev => ({ ...prev, RentalCost: +value } as PropertyType))}
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
              value={propertyData.UnitsNumber || ""}
              onChange={({ target: { value } }) => setPropertyData(prev => ({ ...prev, UnitsNumber: +value } as PropertyType))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submitProperty} type="submit" variant="outline" className="bg-green-500 hover:bg-green-400">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
