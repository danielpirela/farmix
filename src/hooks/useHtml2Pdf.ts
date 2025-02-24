'use client'

import { useEffect, useRef, useState } from 'react'

type Html2Pdf = ReturnType<typeof import('html2pdf.js')>

type UseHtml2PdfParams = {
  filename: string
}

export const useHtml2Pdf = ({ filename }: UseHtml2PdfParams) => {
  const pdfRef = useRef<HTMLDivElement>(null)
  const [html2pdf, setHtml2pdf] = useState<Html2Pdf | null>(null)

  useEffect(() => {
    let mounted = true

    const loadHtml2Pdf = async () => {
      try {
        const lib = (await import('html2pdf.js')).default
        if (mounted) {
          setHtml2pdf(() => lib)
        }
      } catch (error) {
        console.error('Error loading html2pdf:', error)
      }
    }

    loadHtml2Pdf()

    return () => {
      mounted = false
    }
  }, [])

  const downloadPDF = async () => {
    if (!pdfRef.current || !html2pdf) return

    const opt = {
      margin: 1,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(pdfRef.current).save()
  }

  return {
    pdfRef,
    downloadPDF
  }
}
