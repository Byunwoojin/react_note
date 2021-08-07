import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const CreateNote = ({ setIsPageOpen, onAdd, onEdit, isEdit, editId, data }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const onClick = useCallback(
    (e) => {
      isEdit ? onEdit(title, text) : onAdd(title, text);
    },
    [isEdit, onAdd, onEdit, title, text],
  );

  useEffect(() => {
    if (isEdit) {
        console.log(editId);
      const editData = data.filter((item) => item.id === editId);
      console.log(editData);
      setTitle(editData[0].title);
      setText(editData[0].text);
    }
  }, [setTitle, setText, editId, data, isEdit]);

  return (
    <AddNote>
      <InputContainer>
        <Title>Notes App</Title>
        <Description>Take notes and never forget</Description>
        <BackBtn
          onClick={() => {
            setIsPageOpen(false);
          }}
        >
          Back
        </BackBtn>
        <InputTitle
          type="text"
          placeholder="Title"
          value={title}
          onChange={onChangeTitle}
          maxLength={500}
        ></InputTitle>
        <InputData
          type="text"
          placeholder="Text"
          value={text}
          onChange={onChangeText}
          maxLength={500}
        ></InputData>
        <AddBtn onClick={onClick}>
            {isEdit? `Edit Note`: `Add Note`}
        </AddBtn>
      </InputContainer>
    </AddNote>
  );
};
export default CreateNote;
const AddNote = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ebebf2;
`;
const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  padding-top: 1rem;
  padding-bottom: 0.6rem;
  font-size: 30px;
  color: #262f40;
`;
const Description = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  padding-bottom: 1rem;
  font-size: 14px;
  color: #262f40;
`;
const BackBtn = styled.div`
  width: 50px;
  height: 25px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  background-color: #474f75;
  align-items: center;
  font-size: 14px;
  color: white;
`;
const AddBtn = styled.div`
  position: relative;
  left: 93%;
  width: 5rem;
  height: 2rem;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  background-color: #474f75;
  align-items: center;
  font-size: 14px;
  color: white;
`;
const InputContainer = styled.div`
  width: 520px;
  height: 60px;
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  justify-content: center;
`;
const InputTitle = styled.textarea`
  display: flex;
  width: 100%;
  height: 1rem;
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  border-radius: 10px;
  background-color: #d6d6e5;
  justify-content: center;
  placeholder: Title;
  font-size: 13px;
  font-family: -apple-system;
`;

const InputData = styled.textarea`
  display: flex;
  width: 100%;
  height: 10rem;
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  border-radius: 10px;
  background-color: #d6d6e5;
  justify-content: center;
  font-size: 13px;
  font-family: -apple-system;
`;
