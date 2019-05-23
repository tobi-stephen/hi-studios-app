import AsyncStorage from '@react-native-community/async-storage';

const store = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        return new Error("Error occured while storing the item with key: " + key + " and value: " + value);
    }
};

const retrieve = async key => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        return new Error("Error occured while retrieving the item with key: " + key);
    }
};

const remove = async key => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        return new Error("Error occured while removing the item with key: " + key)
    }
};

const push = async (key, value) => {
    return true;
};

const pop = async key => {
    return true;
};

const loadState = () => {
    try {
        const serializedState = retrieve('state');console.log(serializedState, JSON.parse(serializedState));
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}

const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        store('state', serializedState);
    } catch (error) {
        
    }
}

const BursarStorage = {
    store,
    retrieve,
    remove,
    push,
    pop,
    loadState,
    saveState
}

export default BursarStorage;