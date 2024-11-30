import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button, Text } from 'react-native';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

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
    setTasks((prevTasks) =>
      [...prevTasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>  {/* Título Adicionado */}
      <TaskForm onSubmit={addTask} editingTask={editingTask} />
      <Button title="Ordenar por Prioridade" onPress={sortTasks} />
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={startEditing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default App;
