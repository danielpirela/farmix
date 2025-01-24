interface Props {
  src?: string | null | undefined
  name: string
}
const DEFAULT_IMAGE_URL =
  'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'

export function UserImage({ src, name }: Props) {
  return (
    <img
      className="rounded-full"
      src={src ?? DEFAULT_IMAGE_URL}
      width={32}
      height={32}
      alt={`User image of ${name}`}
    />
  )
}

export default UserImage
