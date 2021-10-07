import React from "react"
import { TagBoxContainer } from "./TagBox.styled"

export interface TagBoxProps{
    selected: boolean;
    name: string;  
    onclick: any;  
}

export const TagBox : React.FC<TagBoxProps> = ({selected, name,onclick}) => {
    return (
        <TagBoxContainer onClick={onclick} selected={selected} >
            {name}
        </TagBoxContainer>
    )
}