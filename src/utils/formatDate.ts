export function formatDate(isoDate: string): string { // Tipado agregado
  const date = new Date(isoDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0') // Ajuste para AM/PM
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM' // Determinar AM o PM

  // Formatear como dd/mm/yy h:m AM/PM
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`
}

