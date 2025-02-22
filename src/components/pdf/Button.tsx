import { PDFDownloadLink } from '@react-pdf/renderer'
import { ConvertPdf } from './ConvertPdf'
export const Button = () => {
  return (
    <div className="bg-red-600">
      <PDFDownloadLink document={<ConvertPdf />} fileName="Kimetsu_Pilares.pdf">
        {({ loading }) =>
          loading ? (
            <button>Cargando...</button>
          ) : (
            <button className="bg-blue-500 px-6 py-2 rounded-md text-white">
              Descargar
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  )
}
