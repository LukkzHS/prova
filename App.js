import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, FlatList, View } from 'react-native';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isAscending, setIsAscending] = useState(false);

  const addTask = (task) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === editingTask.id ? task : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const sortTasks = () => {
    const priorityOrder = { Alta: 1, Média: 2, Baixa: 3 };
    const sortedTasks = [...tasks].sort((a, b) => {
      return isAscending
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    setTasks(sortedTasks);
    setIsAscending(!isAscending); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Tarefas</Text>
      </View>
      <TaskForm onSubmit={addTask} editingTask={editingTask} />
      <Button title={`Ordenar por Prioridade (${isAscending ? 'Crescente' : 'Decrescente'})`} onPress={sortTasks} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskList task={item} onDelete={deleteTask} onEdit={startEditing} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 40,
  },
});

export default App;
