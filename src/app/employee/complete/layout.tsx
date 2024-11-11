import { Navbar } from '@components/Navbar'

export default function EmployeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}
