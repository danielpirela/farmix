declare module 'html2pdf.js' {
  interface Html2Pdf {
    from(element: HTMLElement | string): Html2Pdf
    set(options: Partial<Html2PdfOptions>): Html2Pdf
    toContainer(container: HTMLElement | string): Html2Pdf
    toCanvas(canvas: HTMLCanvasElement | string): Html2Pdf
    save(): Promise<void>
    then(onFulfilled?: () => void, onRejected?: () => void): Html2Pdf
    catch(onRejected?: () => void): Html2Pdf
    finally(onFinally?: () => void): Html2Pdf
  }

  interface Html2PdfOptions {
    margin?: number | [number, number] | [number, number, number, number]
    filename?: string
    image?: {
      type?: 'jpeg' | 'png' | 'webp'
      quality?: number
    }
    html2canvas?: {
      scale?: number
      scrollY?: number
      useCORS?: boolean
      // Agrega más opciones de html2canvas según necesites
    }
    jsPDF?: {
      unit?: 'mm' | 'cm' | 'in' | 'pt' | 'px'
      format?: 'a0' | 'a1' | 'a2' | 'a3' | 'a4' | 'letter' | 'legal'
      orientation?: 'portrait' | 'landscape'
      // Agrega más opciones de jsPDF según necesites
    }
  }

  const html2pdf: () => Html2Pdf
  export = html2pdf
  export type { Html2Pdf, Html2PdfOptions }
}
