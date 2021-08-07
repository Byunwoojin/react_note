import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import CreateNote from './CreateNote';
import { AiFillDelete } from 'react-icons/ai';

const NoteList = () => {
  const nextId = useRef(3);
  const [data, setData] = useState([
    {
      id: 1,
      date: '2021. 2. 3.',
      title: 'Todo',
      text: 'React Study',
    },
    {
      id: 2,
      date: '2021. 8. 3.',
      title: 'Todo',
      text: 'Term Project',
    },
  ]);
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [editId, setEditId] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const onDel = useCallback(
    (id) => {
      setData(data.filter((item) => item.id !== id));
    },
    [data],
  );

  const onAdd = useCallback(
    async (title, text) => {
      const addDate = new Date().toLocaleDateString();
      const item = {
        id: nextId.current,
        date: addDate,
        title: title,
        text: text,
      };
      await setData(data.concat(item));
      nextId.current += 1;
      setIsPageOpen(false);
    },
    [data],
  );

  const onEdit = useCallback(async (title, text) => {
    const newData = data.map((item) =>
      item.id === editId
        ? {
            id: editId,
            date: new Date().toLocaleDateString(),
            title: title,
            text: text,
          }
        : item,
    );
    await setData(newData);
    setIsPageOpen(false);
    setIsEdit(false);
    setEditId(0);
  });


  const onClick = useCallback(() => {
    setIsPageOpen(true);
  }, [setIsPageOpen]);

  useEffect(()=>{
    console.log("here");
    console.log(keyword);
    const upperKeyword = keyword.toUpperCase();
    const nextResult =  data.filter(
      (item) =>
        item.title.toUpperCase().includes(upperKeyword) ||
        item.text.toUpperCase().includes(upperKeyword),
    );
    setSearchResult(nextResult);
  },[keyword,data,setSearchResult]);

  const onChangeKeyword =  async(e) => {
    await setKeyword(e.target.value);
    
  };

  if (!isPageOpen) {
    return (
      <Note>
        <OuterLine>
          <Title>Notes App</Title>
          <Description>Take notes and never forget</Description>
          <InputContainer>
            <InputSearch
              type="text"
              placeholder="Keyword"
              value={keyword}
              onChange={onChangeKeyword}
              maxLength={500}
            ></InputSearch>
          </InputContainer>
          {data.length !== 0 && keyword.length === 0 ? (
            <Container>
              {data.map((item) => {
                return (
                  <ItemContainer
                    id={item.id}
                    key={item.id}
                    date={item.date}
                    title={item.title}
                    text={item.text}
                    onDel={onDel}
                    onClick={() => {
                      setIsPageOpen(true);
                      setIsEdit(true);
                      setEditId(item.id);
                    }}
                  />
                );
              })}
            </Container>
          ) : data.length !== 0 && keyword.length !== 0 ? (
            <Container>
              {searchResult.map((item) => {
                return (
                  <ItemContainer
                    id={item.id}
                    key={item.id}
                    date={item.date}
                    title={item.title}
                    text={item.text}
                    onDel={onDel}
                    onClick={() => {
                      setIsPageOpen(true);
                      setIsEdit(true);
                      setEditId(item.id);
                    }}
                  />
                );
              })}
            </Container>
          ) : (
            <EmptyMessage>Record your daily life</EmptyMessage>
          )}
          <AddBtn onClick={onClick}>Add Note</AddBtn>
        </OuterLine>
      </Note>
    );
  } else {
    return (
      <CreateNote
        setIsPageOpen={setIsPageOpen}
        onAdd={onAdd}
        onEdit={onEdit}
        isEdit={isEdit}
        editId={editId}
        data={data}
      ></CreateNote>
    );
  }
};

export default NoteList;
const ItemContainer = ({ id, date, title, text, onDel, onClick }) => {
  return (
    <Item>
      <Header>
        <ItemTitle onClick={() => onClick(id)}>{title}</ItemTitle>
        <DelBtn onClick={() => onDel(id)}>
          <AiFillDelete />
        </DelBtn>
      </Header>
      <ItemData onClick={() => onClick(id)}>
        <ItemText>{text}</ItemText>
        <ItemDate>{date}</ItemDate>
      </ItemData>
    </Item>
  );
};
const Note = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ebebf2;
`;
const OuterLine = styled.div`
  width: 100%;
  justify-content: center;
  padding: 1rem 0;
  font-size: 30px;
`;

const Title = styled.div`
  width: 520px;
  height: 50px;
  margin-top: 1rem;
  margin-right: auto;
  margin-left: auto;
  justify-content: start;
  font-size: 30px;
  color: #262f40;
`;
const Description = styled.div`
  width: 520px;
  height: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.7rem;
  color: #262f40;
  font-size: 14px;
`;
const InputContainer = styled.div`
  width: 530px;
  height: 50px;
  margin: 1rem auto;
`;
const InputSearch = styled.textarea`
  width: 170px;
  height: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: #d6d6e5;
  font-size: 13px;
  font-family: -apple-system;
`;
const Container = styled.div`
  margin-left: 3rem;
  margin-right: 3rem;
  margin-bottom: 3rem;
`;
const EmptyMessage = styled.div`
  display: flex;
  width: 100%;
  margin: 3rem 0;
  justify-content: center;
  padding: 1rem 0;
  font-size: 17px;
  color: #262f40;
`;
const Item = styled.div`
  width: 500px;
  height: 60px;
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  border-radius: 10px;
  background-color: #d6d6e5;
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const ItemTitle = styled.div`
  font-size: 16px;
  color: #405173;
`;
const DelBtn = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #605f88;
  height: 20px;
  width: 20px;
`;
const ItemData = styled.div`
  height: 100%;
  padding: 0.2rem 0.2rem;
`;
const ItemText = styled.div`
  padding: 0.2rem 0;
  font-size: 12.5px;
  height: 30%;
`;
const ItemDate = styled.div`
  font-size: 13px;
  height: 12.5px;
  width: 80px;
  position: relative;
  left: 440px;
`;

const AddBtn = styled.div`
  width: 5rem;
  height: 2rem;
  margin: 1rem auto;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  background-color: #474F75;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  right: -13.5rem;
  top:: 50rem;
`;
