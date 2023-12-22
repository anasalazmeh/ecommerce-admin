"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  isArchive:boolean
  isFeatured:boolean
  paice:string
  category:string
  size:string,
  color:string
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchive",
    header: "Archive",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "paice",
    header: "Paice",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="w-20">
        {row.original.color}
        </div>
        <div className="h-6 w-6 rounded-full border"
        style={{background:row.original.color}}
        >
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
