'use client'
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext
} from 'react'

interface Notification {
  id: number
  message: string
  code?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  href?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (
    message: string,
    code?: Notification['code'],
    duration?: number,
    href?: string
  ) => void
  removeNotification: (id: number) => void
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined)

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error(
      'useNotificationsContext must be used within a NotificationsProvider'
    )
  }
  return context
}

interface NotificationsContextProviderProps {
  children: React.ReactNode
}

export const NotificationsProvider: React.FC<
  NotificationsContextProviderProps
> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Solo se ejecuta en el cliente
    const savedNotifications = localStorage.getItem('notifications')
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  useEffect(() => {
    // Guardar notificaciones en localStorage
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

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}
