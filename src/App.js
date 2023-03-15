import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #98afc7;
  align-items: center;
  justify-content: center;
`;
const Title = styled.Text`
  font-size: 35px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: center;
  margin: 0px 20px;
  color: #151b54;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const App = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({
    1: { id: '1', text: 'Hanbit', completed: false },
    2: { id: '2', text: 'React Native', completed: true },
    3: { id: '3', text: 'React Native Sample', completed: false },
    4: { id: '4', text: 'Edit TODO Item', completed: false },
  });

  const { width } = Dimensions.get('window');

  //추가기능
  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject });
  };

  // 삭제기능
  const _deleteTask = id => {
    const currentTasks = { ...tasks };
    delete currentTasks[id];
    setTasks({ ...currentTasks });
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
  };

  const _updateTask = item => {
    const currentTasks = { ...tasks };
    currentTasks[item.id] = item;
    setTasks(currentTasks);
  };

  const _onBlur = () => {
    setNewTask('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>버킷 리스트</Title>
        <Input
          placeholder="+ 항목 추가"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};

export default App;
