import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ChooseTagsHeader } from '../src/components/ChooseTagsHeader'
import { RootLayout } from '../src/components/RootLayout/RootLayout'
import { Searcher } from '../src/components/Searcher/Searcher'
import { TagBox } from '../src/components/TagBox/TagBox'
import { TagInterface } from '../src/models/TagInterface'
import { getTags, save_tags } from '../src/shared/services/api'
import { useRouter } from 'next/router'

const ToolsBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 10%;
    justify-content: stretch;
`

const ToolsBoxRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const ToolsHeader = styled.div`
  margin-bottom: 2vh;
  font-weight: bold;
`

const ToolsSaveButton = styled.div`
  background-color : #5cb85c;
  width: 80%;
  border-radius :10px;
  text-align: center;
  color: white;
  font-weight: 600;
  padding: 15px 10px; cursor: pointer;

`

function useForceUpdate(){
  const [value, setValue] = useState(0); 
  return () => setValue(value => value + 1); 
}

const Home: React.FC = () => {

  const router = useRouter()

  const forceUpdate = useForceUpdate();

  const [tagsList, setTagsList] = useState<TagInterface[]>([])
  const [initList, setInitList] = useState<TagInterface[]>([])
  const [selectedList, setSelectedList] = useState<TagInterface[]>([])
  const [search, setSearch] = useState<string>("")

  const getId = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params.tg_id;
  }

  useEffect(() => {
    getTags().then(tags => {
      setTagsList(tags)
      setInitList(tags)
    });
  }, [])


  const _handleKeyDown = (e:any) => {
    setSearch(e.target.value);
    if (search==""){
      setTagsList(initList)
    }else{
      setTagsList(initList.filter(tag => tag.name.startsWith(search)));
    }
  }

  const toogleTag = (tag : TagInterface) => {
    if (selectedList.filter(item => item.id == tag.id).length == 1){
      setSelectedList(selectedList.filter(item => item.id != tag.id));
    }else{
      const arr = selectedList;
      arr.push(tag);
      setSelectedList(arr)
    }
    forceUpdate()
  }

  const send = () => {
    save_tags(selectedList, +getId()).then(() =>{
      router.push("/goback/")
    }).catch(()=>{
      alert("Что-то пошло не так(( Напишите, пожалуйста в тг @abakunov")
    })
  }
 
  return (
    <>
      <ChooseTagsHeader>Привет!👋</ChooseTagsHeader>
      <ChooseTagsHeader>Выбери профессии, которые тебя интересуют</ChooseTagsHeader>
     
      <ToolsBox>
        <br></br>
        <Searcher placeholder="Поиск..." onKeyDown={_handleKeyDown} />
        <br></br>
        <ToolsHeader>Выбранное:</ToolsHeader>
        <ToolsBoxRow>
        {
          selectedList.map(tag => <TagBox onclick={() => toogleTag(tag)} key={tag.id} name={tag.name} selected={true} />)
        }
        </ToolsBoxRow>
        <br></br>
        <ToolsSaveButton onClick={send}>Сохранить!</ToolsSaveButton>
        <br></br>
        <br></br>
        <ToolsHeader>Все профессии:</ToolsHeader>
      </ToolsBox>
      
      <RootLayout>
        
        {
          tagsList.map(tag => <TagBox onclick={() => toogleTag(tag)} key={tag.id} name={tag.name} selected={selectedList.filter(item => item.id == tag.id).length == 1} />)
        }
      </RootLayout>

    </>
  )
}

export default Home
