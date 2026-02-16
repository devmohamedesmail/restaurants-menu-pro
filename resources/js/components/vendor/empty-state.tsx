import React from 'react'
import { Button } from '../ui/button'

export default function EmptyState({ icon, title, description, actionText, onAction }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/50 p-4 rounded-full mb-4 text-muted-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mb-6">{description}</p>
      {actionText && (
        <Button onClick={onAction} variant="outline">
          {actionText}
        </Button>
      )}
    </div>
  )
}
