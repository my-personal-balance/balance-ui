import { Breadcrumb, BreadcrumbLink, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export function AppBreadcrumbs({ title }: { title: string | any[] }) {

  if (Array.isArray(title)) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {title.map((t, index) => (
             getBreadcrumbItem(t, index === 0, index === title.length - 1)
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    )
  } else {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            {title}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
}

function getBreadcrumbItem(item: string | any, isFirst: boolean, isLast: boolean) {
  return (
    <>
      {!isFirst && <BreadcrumbSeparator />}
      <BreadcrumbItem>
      {isLast ? item :
        <BreadcrumbLink asChild>
          {item}
        </BreadcrumbLink>
      }
      </BreadcrumbItem>
    </>
  )
}