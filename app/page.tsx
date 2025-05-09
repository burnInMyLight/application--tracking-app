"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TodoDialog from "@/components/TodoDialog"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash } from "lucide-react"

// Define the type for our data entries
type Entry = {
  id: number
  Date: string
  item: string
  Deadline: string
  Priority: string
  Status: string
}

export default function InfoTable() {
  // State for the table data
  const [tableData, setTableData] = useState<Entry[]>([
    {
      id: 1,
      Date: "2024-01-01",
      item: "Buy groceries",
      Deadline: "2024-01-05",
      Priority: "High",
      Status: "Pending",
    },
    {
      id: 2,
      Date: "2024-01-01",
      item: "Buy groceries",
      Deadline: "2024-01-05",
      Priority: "High",
      Status: "Pending",
    },
  ])
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isViewing, setIsViewing] = useState(false)

  const handleViewEntry = (id: number) => {
    setSelectedEntry(tableData.find((entry) => entry.id === id) || null)
    setIsViewing(true)
  }

  const handleEditEntry = (id: number) => {
    setSelectedEntry(tableData.find((entry) => entry.id === id) || null)
    setIsEditing(true)
  }

  const handleDeleteEntry = (id: number) => {
    setSelectedEntry(tableData.find((entry) => entry.id === id) || null)
    setIsDeleting(true)
  }

  // Handle adding a new entry
  const handleAddEntry = (formData: {
    Date: string
    item: string
    Deadline: string
    Priority: string
    Status: string
  }) => {
    // Create a new entry with the form data
    const newEntry: Entry = {
      id: tableData.length > 0 ? Math.max(...tableData.map((item) => item.id)) + 1 : 1,
      ...formData,
    }

    // Add the new entry to the table data
    setTableData((prev) => [...prev, newEntry])
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vashee's todo list</h1>
        <TodoDialog onAddEntry={handleAddEntry} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of all entries</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.Date}</TableCell>
                <TableCell>{entry.item}</TableCell>
                <TableCell>{entry.Deadline}</TableCell>
                <TableCell>{entry.Priority}</TableCell>
                <TableCell>{entry.Status}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleViewEntry(entry.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEditEntry(entry.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}