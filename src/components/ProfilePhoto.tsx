import { CLIENT_URL, SERVER_URL } from "@/lib/config";
import Image from "next/image";

export default function ProfilePhoto({ 
  src,
  width = 180,
  height = 180,
  alt,
  className,
  onClick,
}: {
  src?: string,
  width?: number,
  height?: number,
  alt?: string,
  className?: string
  onClick?: () => void,
}) {
  return src && src != ""
          ? <Image
            src={`${SERVER_URL}${src}`}
            width={width}
            height={height}
            alt={alt ?? ""}
            className={className}
            onClick={onClick} 
            style={{cursor: "pointer"}}/>
          : <Image
            src={`${CLIENT_URL}/icons/profile-icon.svg`}
            width={width}
            height={height}
            alt={alt ?? ""}
            className={className}
            onClick={onClick} 
            style={{cursor: "pointer"}}/>
        
}