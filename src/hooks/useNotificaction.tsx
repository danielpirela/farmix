import { useState, useCallback, useEffect } from 'react'

interface Notification {
  id: number
  message: string
  code?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  href?: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem('notifications')
    return savedNotifications ? JSON.parse(savedNotifications) : []
  })

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }, [])

  const addNotification = useCallback(
    (
      message: string,
      code: Notification['code'] = 'info',
      duration = 10000,
      href?: string
    ) => {
      const id = Date.now()
      setNotifications((prev) => [
        ...prev,
        { id, message, code, duration, href }
      ])

      setTimeout(() => {
        removeNotification(id)
      }, duration)
    },
    [removeNotification]
  )

  return { notifications, addNotification, removeNotification }
}
