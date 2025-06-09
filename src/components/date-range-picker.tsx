"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { badgeVariants } from "./ui/badge"

export function DatePickerWithRange({
  onChange,
  className,
}: React.HTMLAttributes<HTMLDivElement>& {
  onChange: (date: DateRange | undefined) => void
}) {

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const [open, setOpen] = useState(false)

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      setOpen(false); // Close the popover when a range is selected
    }
  }

  useEffect(() => {
    onChange?.(date)
  }, [date])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            autoFocus={true}
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
          <div className={cn("flex flex-wrap gap-2 px-2 py-2", className)}>
            <Link onClick={() => handleDateChange({ from: new Date(), to: new Date() })} to="." className={badgeVariants({ variant: "outline" })}>Today</Link>
            <Link onClick={() => handleDateChange(getMonthDateRange())} to="." className={badgeVariants({ variant: "outline" })}>This Month</Link>
            <Link onClick={() => handleDateChange(getMonthDateRange(1))} to="." className={badgeVariants({ variant: "outline" })}>Last Month</Link>
            <Link onClick={() => handleDateChange(getYearDateRange())} to="." className={badgeVariants({ variant: "outline" })}>This Year</Link>
            <Link onClick={() => handleDateChange(getYearDateRange(1))} to="." className={badgeVariants({ variant: "outline" })}>Last Year</Link>
            <Link onClick={() => handleDateChange(getLastMonthsDateRange(3))} to="." className={badgeVariants({ variant: "outline" })}>Last 3 Months</Link>
            <Link onClick={() => handleDateChange(getLastMonthsDateRange(6))} to="." className={badgeVariants({ variant: "outline" })}>Last 6 Months</Link>
            <Link onClick={() => handleDateChange(getLastMonthsDateRange(12))} to="." className={badgeVariants({ variant: "outline" })}>Last 12 Months</Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function getMonthDateRange(monthsAgo: number = 0): { from: Date; to: Date } {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth();
  const startDate: Date = new Date(year, month - monthsAgo, 1);
  const endDate: Date = new Date(year, month - monthsAgo + 1, 0);
  return {
    from: startDate,
    to: endDate,
  };
}

function getYearDateRange(yearsAgo: number = 0): { from: Date; to: Date } {
  const today: Date = new Date();
  const year: number = today.getFullYear() - yearsAgo;
  const startDate: Date = new Date(year, 0, 1); // January 1st
  const endDate: Date = new Date(year, 11, 31); // December 31st
  return {
    from: startDate,
    to: endDate,
  };
}

function getLastMonthsDateRange(numberOfMonths: number): { from: Date; to: Date } {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth();
  const startDate: Date = new Date(year, month - (numberOfMonths - 1), 1); // First day of n months ago
  const endDate: Date = new Date(year, month + 1, 0); // Last day of current month
  return {
    from: startDate,
    to: endDate,
  };
}