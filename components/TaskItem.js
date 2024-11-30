import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskItem = ({ task, onDelete, onEdit }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Alta':
        return <Icon name="exclamation-circle" size={20} color="red" />;
      case 'Média':
        return <Icon name="exclamation-triangle" size={20} color="orange" />;
      case 'Baixa':
        return <Icon name="check-circle" size={20} color="green" />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.item, styles[`priority_${task.priority.toLowerCase()}`]]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{task.name}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.priorityIcon}>{getPriorityIcon(task.priority)}</View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => onEdit(task)}>
          <Icon name="edit" size={20} color="#fff" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(task.id)}>
          <Icon name="trash" size={20} color="#fff" />
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  priorityIcon: {
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonDelete: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  priority_alta: {
    borderColor: 'red',
  },
  priority_média: {
    borderColor: 'orange',
  },
  priority_baixa: {
    borderColor: 'green',
  },
});

export default TaskItem;
