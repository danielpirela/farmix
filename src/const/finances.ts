export type TypeOptions = 'Ingreso' | 'Egreso' | 'Deuda'
export type MethodOptions = 'Efectivo' | 'Transferencia' | 'Credito'

export type TransactionCategory =
  | 'Gastos de alimentación'
  | 'Gastos de mantenimiento'
  | 'Gastos de personal'
  | 'Gastos de suministros'
  | 'Gastos de servicios públicos'
  | 'Gastos de transporte'
  | 'Gastos de seguros'
  | 'Gastos de marketing'
  | 'Gastos de tecnología'
  | 'Gastos de administración'
  | 'Ingresos por ventas'
  | 'Ingresos por servicios'
  | 'Ingresos por inversiones'
  | 'Otros ingresos'

export type Transaction = {
  category: TransactionCategory
  description: string;
}

export const transactionTypes: TypeOptions[] = [
    'Ingreso',
    'Egreso',
    'Deuda',
]

export const transactionMethods: MethodOptions[] = [
    'Efectivo',
    'Transferencia',
    'Credito',
]

export const transactionOptions: Transaction[] = [
  { category: 'Gastos de alimentación', description: 'Gasto relacionado con la alimentación de los animales' },
  { category: 'Gastos de mantenimiento', description: 'Gasto para el mantenimiento de instalaciones' },
  { category: 'Gastos de personal', description: 'Gasto en salarios y beneficios del personal' },
  { category: 'Gastos de suministros', description: 'Gasto en suministros necesarios para las actividades' },
  { category: 'Gastos de servicios públicos', description: 'Gasto en servicios como agua y electricidad' },
  { category: 'Gastos de transporte', description: 'Gasto en transporte de productos o personal' },
  { category: 'Gastos de seguros', description: 'Gasto en pólizas de seguros' },
  { category: 'Gastos de marketing', description: 'Gasto en actividades de promoción y publicidad' },
  { category: 'Gastos de tecnología', description: 'Gasto en tecnología y equipos' },
  { category: 'Gastos de administración', description: 'Gasto en administración y gestión de la empresa' },
  { category: 'Ingresos por ventas', description: 'Ingreso generado por la venta de productos' },
  { category: 'Ingresos por servicios', description: 'Ingreso generado por la prestación de servicios' },
  { category: 'Ingresos por inversiones', description: 'Ingreso generado por inversiones realizadas' },
  { category: 'Otros ingresos', description: 'Ingreso de otras fuentes no especificadas' }
]
