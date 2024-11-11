import Image from 'next/image'


export function UserImage({src, name} : {src: string, name: string}){
  return (
    <Image className='w-8 h-8 rounded-full' src={src} width={32} height={32} alt={`User image of ${name}`} />
  )
}

export default UserImage
