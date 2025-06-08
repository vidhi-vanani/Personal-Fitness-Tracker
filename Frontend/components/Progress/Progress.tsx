import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  Pressable,
  TextInput,
  ScrollView
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, XAxis, YAxis, Line, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';

interface ProgressData {
  _id?: string;
  date: string;
  weight: number;
  mass: number;
  fat: number;
}

export const Progress = () => {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [weight, setWeight] = useState('');
  const [mass, setMass] = useState('');
  const [fat, setFat] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/progress`);
      setProgressData(response.data);
    } catch (err) {
      alert("Failed to fetch progress data");
    }
  };

  const handleAddProgress = async () => {
    if (!weight || !mass || !fat || !date) return;

    const newProgress: ProgressData = {
      date,
      weight: parseFloat(weight),
      mass: parseFloat(mass),
      fat: parseFloat(fat)
    };

    try {
      await axios.post(`${BASE_URL}/api/progress`, newProgress);
      setProgressData([newProgress, ...progressData]);
      setIsAddModalVisible(false);
      setWeight('');
      setMass('');
      setFat('');
      setDate('');
    } catch (err) {
      alert("Failed to add progress data");
    }
  };

  const handleDeleteProgress = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/api/progress/${id}`);
      setProgressData(progressData.filter(item => item._id !== id));
    } catch (err) {
      alert("Failed to delete progress data");
    }
  };

  const WeightGraph = () => {
    const formattedData = progressData.map(item => ({
      date: item.date,
      weight: item.weight
    }));
  
    return (
      <View style={styles.graphContainer}>
        <ResponsiveContainer width="95%" height={250}>
          <LineChart
            data={formattedData}
            margin={{ top: 0, left: -20, right: 0, bottom: 0 }}
          >
            <XAxis dataKey="date" padding={{ left: 10, right: 15 }} tickFormatter={(value) => value.substring(5, 10)} />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']}/>
            <Tooltip />
            <Line type="linear" dataKey="weight" stroke={Colors.light.tint} />
          </LineChart>
        </ResponsiveContainer>
      </View>
    );
  };

  const MuscleAndFatGraph = () => {
    const formattedData = progressData.map(item => ({
      date: item.date,
      mass: item.mass,
      fat: item.fat
    }));
  
    return (
      <View style={styles.graphContainer}>
        <ResponsiveContainer width="95%" height={250}>
          <LineChart
            data={formattedData}
            margin={{ top: 0, left: -20, right: 0, bottom: 0 }}
          >
            <XAxis dataKey="date" padding={{ left: 10, right: 15 }} tickFormatter={(value) => value.substring(5, 10)} />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']}/>
            <Tooltip />
            <Line type="linear" dataKey="mass" stroke={Colors.light.tint} />
            <Line type="linear" dataKey="fat" stroke={Colors.light.tintComplimentary} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Weight Progress</Text>
      </View>
      <WeightGraph />
      <View style={styles.header}>
        <Text style={styles.title}>Muscle and Fat Progress</Text>
      </View>
      <MuscleAndFatGraph />
      <View style={styles.header}>
        <Text style={styles.title}>Progress Data</Text>
      </View>
        {progressData.map((data) => (
          <View key={data._id} style={styles.dataPoint}>
            <View style={styles.iconContainer}>
              <View>
                <Text style={styles.date}>{data.date.substring(0, 10)}</Text>
                <View style={styles.dataRow}>
                  <Text>Weight: {data.weight} lbs  |  </Text>
                  <Text>Muscle: {data.mass}%  |  </Text>
                  <Text>Fat: {data.fat}%</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteProgress(data._id!)}>
                <Ionicons name="trash" size={20} color={Colors.light.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Progress Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight (lbs)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Muscle (%)"
              value={mass}
              onChangeText={setMass}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Fat (%)"
              value={fat}
              onChangeText={setFat}
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsAddModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleAddProgress}
              >
                <Text style={styles.updateButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={() => setIsAddModalVisible(true)}>
        <Ionicons name="add-circle" size={40} color={Colors.light.tint} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  dataPoint: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.light.border,
  },
  submitButton: {
    backgroundColor: Colors.light.tint,
  },
  cancelButtonText: {
    color: Colors.light.text,
    fontSize: 16,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 50,
    elevation: 5,
  },
  graphContainer: {
    alignItems: 'center',
    margin: 20,
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
