import { MyProvider } from '@components/context/Provider'
import { Menu } from '@components/Menu'


export default function EmployeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className='min-w-full min-h-screen bg-white dark:bg-gray-800  overflow-y-hidden'>
    <MyProvider>
        <Menu>
          {children}
        </Menu>
      </MyProvider>
        </div>
  )
}
