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
            <Icon name={level === 'Alta' ? 'exclamation-circle' : level === 'Média' ? 'exclamation-triangle' : 'check-circle'} size={20} color={priority === level ? '#fff' : '#555'} />
            <Text style={priority === level ? styles.priorityTextActive : styles.priorityText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{editingTask ? "Editar Tarefa" : "Adicionar Tarefa"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    width: '30%',
    justifyContent: 'center',
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  priorityButtonActive: {
    backgroundColor: '#007BFF',
  },
  priorityText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  priorityTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TaskForm;
