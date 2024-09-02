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
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteTenant({ TenantId }: { TenantId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const deleteTenant = async () => {
    const res = await fetch('/api/v1/tenants', {
      method: "DELETE",
      body: JSON.stringify({ TenantId })
    });
    const { error, msg } = await res.json();

    if (!error) setIsOpen(false);
    alert(msg);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-500">
          <Trash2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this tenant from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} type="submit" variant="outline">
            cancel
          </Button>
          <Button onClick={deleteTenant} type="submit" className="bg-red-600 hover:bg-red-500">
            continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
