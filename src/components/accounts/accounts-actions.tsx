import { useState } from "react"
import { EllipsisIcon, PencilIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteTransactions } from "@/components/accounts/delete-accounts"
import { useRouter } from "@tanstack/react-router"


export function AccountsActions({ accountId }: { accountId: number }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild> 
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <EllipsisIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem disabled={true}>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setOpen(true)}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteTransactions
        open={open}
        onOpenChange={setOpen}
        accountId={accountId}
        onSuccess={() => {
          router.navigate({ to: "/accounts" })
        }}
      />
    </>
  )
}