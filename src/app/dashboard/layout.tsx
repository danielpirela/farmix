import { MyProvider } from '@components/context/Provider'
import { Menu } from '@components/Menu'


export default function EmployeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <MyProvider>
        <Menu>
          {children}
        </Menu>
      </MyProvider>
  )
}
