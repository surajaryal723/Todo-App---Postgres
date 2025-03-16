import { ReactElement } from "react"

export interface IconProps{
    icon:ReactElement,
    onClick:()=>void

}

export default function Icon(props:IconProps){
    return(
        <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center" onClick={props.onClick}>
            {props.icon}
        </div>
    )
}