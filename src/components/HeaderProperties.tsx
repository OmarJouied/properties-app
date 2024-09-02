import React from 'react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ListFilter } from 'lucide-react'
import { AddProperty } from './AddProperty'

const HeaderProperties = () => {
  return (
    <div className="ml-auto flex items-center justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1 bg-foreground">
            <ListFilter className="h-3.5 w-3.5 text-primary-foreground" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-primary-foreground">
              Filter
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>
            Active
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Archived
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddProperty />
    </div>
  )
}

export default HeaderProperties