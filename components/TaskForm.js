import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const TaskForm = ({ onSubmit, editingTask }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Média');

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({
        id: editingTask?.id || Date.now().toString(),
        name,
        description,
        priority,
      });
      setName('');
      setDescription('');
      setPriority('Média');
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nome da Tarefa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.priorityContainer}>
        {['Alta', 'Média', 'Baixa'].map((level) => (
          <Button
            key={level}
            title={level}
            color={priority === level ? 'blue' : 'gray'}
            onPress={() => setPriority(level)}
          />
        ))}
      </View>
      <Button title={editingTask ? "Editar Tarefa" : "Adicionar Tarefa"} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
});

export default TaskForm;
