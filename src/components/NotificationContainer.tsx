'use client'

import { AlertToast } from './AlertToast'
import { useNotificationsContext } from './context/NotificationsContext'

export function NotificationsContainer() {
  const { notifications, removeNotification } = useNotificationsContext()
  console.log(notifications)

  return (
    <div className="fixed bottom-5 right-5 space-y-2">
      {notifications.map(({ id, message, code, href }) => (
        <AlertToast
          key={id}
          code={code}
          message={message}
          href={href}
          remove={() => removeNotification(id)}
        >
          {message}
        </AlertToast>
      ))}
    </div>
  )
}
