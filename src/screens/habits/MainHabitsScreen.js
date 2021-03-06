import React, { useContext, useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView , Text, StyleSheet, TextInput, Pressable, FlatList  } from 'react-native';
import { Context } from '../../context/HabitsContext';
import { Card, List, Checkbox, Button, FAB, Icon,  } from 'react-native-paper';

let inspirationalInsight = "You completed 72% of your habits this week! Keep it up!";

const HabitCheckbox = (prop) => {
    const [checked, setChecked] = useState(prop.checked);
  
    return (
        <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
                setChecked(!checked);
            }}
        />
    );
};



const MainHabitsScreen = ({ navigation }) => {

    const { state, getHabits, addHabit } = useContext(Context);
    const [addHabitActivated, setAddHabitActivated] = useState(false);
    const [addText, setAddText] = useState('');

    useEffect(() => {
        getHabits();
        const listener = navigation.addListener('didFocus', () => {
            getHabits();
        });

        return () => {
            listener.remove();
        }
    }, [addHabitActivated])

    const setUpAddHabit = () => {
        setAddHabitActivated(true);
    }

    return (
        
        <SafeAreaView style={styles.container}>
        <FAB icon="plus" style={styles.addButton} onPress={() => setUpAddHabit()} />    
            <ScrollView style={styles.scrollView}>
                <View style={styles.titleContainer}>
                <Text style={styles.habitTitle}>
                    Your Habits
                
                    
                </Text>
                

                </View>
                    <FlatList data={state} keyExtractor={(habit) => habit.habitName} renderItem={({item}) => {
                        return (
                            <Card style={styles.habitCard} key={item.habitName}>
                                <View style={styles.habitItem}>
                                    <HabitCheckbox style={styles.habitCheckbox} checked={item.checked} key={item.habitName} />
                                    {(item.habitName ? 
                                    <Text style={styles.habitName}>{item.habitName}</Text>:
                                    <TextInput
                                        placeholder="New habit"
                                        style={styles.habitInput}
                                    />)}
                                    <Text style={styles.habitStreak}>{item.streak}{" day\nstreak!"}</Text>
                                </View>
                            </Card>
                        )
                    }} />
                    {
                        addHabitActivated ? <Card style={styles.habitCard} key="addHabit"><View style={styles.habitItem}><TextInput
                        placeholder="New habit"
                        style={styles.habitInput}
                        onChangeText={text => setAddText(text)}
                        onSubmitEditing={() => {
                            addHabit(addText);
                            setAddHabitActivated(false)}}
                    /></View></Card> : null
                    }

                    
                    <Text style={styles.inspirationalText}>{inspirationalInsight}</Text>  
                    <Button icon="chart-bar" contentStyle={styles.statsButtonContent} style={styles.statsButton} labelStyle={styles.statsButtonText} mode="contained" onPress={() => console.log('Stats Pressed')}>
                        See stats about your habits
                    </Button>  
            </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        marginTop:8,
    },
    buttonStyles: {
        margin: 15
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 2,
    },
    habitTitle: {
        flexGrow: 1,
        fontSize: 24,
        fontWeight: 'bold',
    },
    addButton: {
        margin: 16,
        padding: 8,
        position:'absolute',
        right:16,
        top:-56,
        borderRadius: 100
        

    },

    habitCard: {
        marginTop: 10,
        marginHorizontal: 16,

    },

    habitItem: {

        flex: 0,
        flexDirection: 'row',
        padding: 10,
        
    },

    habitCheckbox: {
        flexGrow: 0, 
    },
    habitInput: {
        flexGrow: 1, 
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        fontSize: 18,
        width: 250,
        backgroundColor: '#F0F0F0'
    },
    habitName: {
        flexGrow: 1, 
        fontSize: 18,
        width: 250,
        lineHeight: 36,

    },
    habitStreak: {
        flexGrow: 0, 
    },
    inspirationalText: {
        fontSize:36,
        textAlign: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
        opacity: .4,

    },
    statsButton: {
        marginVertical: 30,
        marginHorizontal: 50,
    },
    statsButtonContent: {
        height: 100,
    },    
})

export default MainHabitsScreen;