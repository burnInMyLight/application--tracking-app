"use client"

import React, { useState } from "react"
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
import { Calendar } from "@/components/ui/calendar"
import { PlusCircle, CalendarIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

// Define the type for our form data
type FormData = {
  Date: string
  item: string
  Deadline: string
  Priority: 'High' | 'Medium' | 'Low'
  Status: 'Pending' | 'Completed' | 'In Progress' | 'Cancelled'
}

// Define the props for our component
type AddEntryDialogProps = {
  onAddEntry: (entry: FormData) => void
}

export default function TodoDialog({ onAddEntry }: AddEntryDialogProps) {
  // State for the modal open/close
  const [open, setOpen] = useState(false)

  // State for the form data
  const [formData, setFormData] = useState<FormData>({
    Date: new Date().toLocaleDateString(),
    item: "",
    Deadline: "",
    Priority: "High",
    Status: "Pending",
  })

  // Handle form input changes for standard inputs and textareas
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form input changes for Select component
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  // Handle date selection
  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        Deadline: format(selectedDate, "PPP"),
      }))
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Call the onAddEntry prop with the form data
    onAddEntry(formData)

    // Reset the form data
    setFormData({
      Date: "",
      item: "",
      Deadline: "",
      Priority: "High",
      Status: "Pending",
    })

    // Close the modal
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Todo</DialogTitle>
            <DialogDescription>Fill in the details below to add a new item to the list.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Date" className="text-right">
                Date
              </Label>
              <Input
                id="Date"
                name="Date"
                value={formData.Date || new Date().toLocaleDateString()}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item" className="text-right">
                Item
              </Label>
              <Textarea
                id="item"
                name="item"
                value={formData.item}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Deadline" className="text-right">
                Deadline
              </Label>
              <div className="col-span-3">
                <DatePicker onDateChange={handleDateChange} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Priority" className="text-right">
                Priority
              </Label>
              <Select
                value={formData.Priority}
                onValueChange={(value) => handleSelectChange(value, "Priority")}
                
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.Status}
                onValueChange={(value) => handleSelectChange(value, "Status")}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Entry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

type DatePickerProps = {
  onDateChange: (date: Date | undefined) => void
}

const DatePicker = ({ onDateChange }: DatePickerProps) => {
    const [date, setDate] = useState<Date>()
    
    const handleSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      onDateChange(selectedDate)
    }
    
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }