import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const {t,i18n}=useTranslation()
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        `text-sm leading-none font-medium  group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 block  ${i18n.language=="ar"?"text-right":"text-left"}`,
        className
      )}
      {...props}
    />
  )
}

export { Label }
