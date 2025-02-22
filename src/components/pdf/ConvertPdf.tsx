import { Document, Page } from '@react-pdf/renderer'
import ReportsPage from '../../app/dashboard/admin/animals/reports/page'

export const ConvertPdf = () => {
  return (
    <Document>
      <Page size={'A4'}>
        <ReportsPage />
      </Page>
    </Document>
  )
}
