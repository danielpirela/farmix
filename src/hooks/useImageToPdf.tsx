import { useRef, useCallback } from 'react'
import * as htmlToImage from 'html-to-image'
import { jsPDF } from 'jspdf'

export const useComponentToPDF = ({ filename = 'component.pdf' }) => {
  const ref = useRef(null)

  const exportAsImage = useCallback(async () => {
    if (!ref.current) return

    try {
      const dataUrl = await htmlToImage.toPng(ref.current)
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'component.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }, [])

  const exportAsPDF = useCallback(async () => {
    if (!ref.current) return

    try {
      const dataUrl = await htmlToImage.toPng(ref.current)

      const img = new Image()
      img.src = dataUrl
      img.onload = () => {
        const pdf = new jsPDF()
        const imgWidth = 210
        const imgHeight =
          (pdf.internal.pageSize.getHeight() * img.height) / img.width

        pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save(filename)
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }, [filename])

  return { ref, exportAsImage, exportAsPDF }
}
