import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Background = styled.div`
    position: absolute;
    z-index: 0;
    background-image: url('https://acegif.com/wp-content/gifs/starfall-gif-46.gif');
    background-size: cover;
    width: 100%;
    height: 100%;
`

const Content = styled.div`
    position: relative;
    z-index: 1;
    padding: 5% 10%;
`

const ThxTitle = styled.div`
    color: white;
    font-weight: 700;
    font-size: 32px;
    text-align: center;
    margin-top: 10vh;
`

const TgButton = styled.div`
    background-color: #0088CC;
    padding: 15px 20px;
    color: white;
    text-decoration: none;
    cursor: pointer;
    width : 80%;
    text-align: center;
    border-radius:30px;
    margin-top: 20px;
    max-width: 500px;
`


const GoBack = () => {
    return <>
        <Background/>
        <Content>
            <ThxTitle>Уже ловим для вас ту самую!</ThxTitle>
            <Link href="https://t.me/aiijc_bot"><TgButton>Вернуться в телеграм</TgButton></Link>
        </Content>
    </>
}

export default GoBack;