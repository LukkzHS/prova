import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <Text style={styles.priorityLabel}>Prioridade</Text>
      <View style={styles.priorityContainer}>
        {['Alta', 'Média', 'Baixa'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.priorityButton, priority === level && styles.priorityButtonActive]}
            onPress={() => setPriority(level)}
          >
            <Icon
              name={level === 'Alta' ? 'exclamation-circle' : level === 'Média' ? 'exclamation-triangle' : 'check-circle'}
              size={20}
              color={priority === level ? '#fff' : '#000'}
            />
            <Text style={priority === level ? styles.priorityTextActive : styles.priorityText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title={editingTask ? 'Editar Tarefa' : 'Adicionar Tarefa'} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    width: '30%',
    justifyContent: 'center',
  },
  priorityButtonActive: {
    backgroundColor: '#007BFF',
  },
  priorityText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  priorityTextActive: {
    color: '#fff',
  },
});

export default TaskForm;
