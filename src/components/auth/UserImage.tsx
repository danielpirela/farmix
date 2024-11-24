import Image from 'next/image'

interface Props {
  src?: string | null | undefined
  name: string
}
const DEFAULT_IMAGE_URL =
  'https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid'

export function UserImage({ src, name }: Props) {
  return (
    <Image
      className="rounded-full"
      src={src ?? DEFAULT_IMAGE_URL}
      width={32}
      height={32}
      alt={`User image of ${name}`}
    />
  )
}

export default UserImage
