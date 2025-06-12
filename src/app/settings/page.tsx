import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/app/settings/profile-form"
import { getRouteApi } from "@tanstack/react-router"
import { CommonApp } from "@/app/common"

export default function Page() {
  
  const routeApi = getRouteApi('/_auth/settings')
  const { user } = routeApi.useLoaderData()

  return (
    <CommonApp title="Settings">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ProfileForm user={user} />
        </div>
      </div>
    </CommonApp>
  )
}