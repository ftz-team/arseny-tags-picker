import styled from "styled-components";

export interface TagBoxContainerProps{
    selected?: boolean
}

const blue = '#0275d8';

export const TagBoxContainer = styled.div<TagBoxContainerProps>`
    color: ${props => props.selected ? '#0275d8' : 'white'};
    background-color: ${props => props.selected ? 'white' : '#0275d8'};
    
    padding: 15px 10px;
    text-align: center;
    border-radius: 10px;
    border: 2px solid #0275d8;
    cursor: pointer;
    font-weight: '500';
    font-size: 0.9rem;
    margin-right: 1vw;
    margin-left: 1vw;
    margin-bottom: 1vh;
`