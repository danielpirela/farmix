
declare module 'html2pdf.js' {
  export default function html2pdf(element: HTMLElement): {
    from: (element: HTMLElement) => {
      save: (filename: string) => Promise<void>;
    }
  }
}
