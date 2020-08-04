import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
import { AsyncStorage } from 'react-native';

const retrieveItem = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.log('Failed to fetch the data from storage');
    }
}

const initialState = {
    user: null,
    token: null,
    tableId: null,
    roomId: null,
    order: null,
    restro : null
};

const Actions = {
    UPDATE_USER: "UPDATE_USER",
    UPDATE_TOKEN: "UPDATE_TOKEN",
    UPDATE_TABLE_ID: "UPDATE_TABLE_ID",
    UPDATE_ROOM_ID: "UPDATE_ROOM_ID",
    UPDATE_ORDER: "UPDATE_ORDER",
    UPDATE_RESTRO : "UPDATE_RESTRO"
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        async function fetchUser() {
            const user = await retrieveItem('user');
            dispatch({ type: Actions.UPDATE_USER, payload: user });
        }
        async function fetchToken() {
            const token = await AsyncStorage.getItem('token');
            dispatch({ type: Actions.UPDATE_TOKEN, payload: token });
        }
        async function fetchTable() {
            const data = await AsyncStorage.getItem('tableId');
            dispatch({ type: Actions.UPDATE_TABLE_ID, payload: data });
        }
        async function fetchRoom() {
            const data = await AsyncStorage.getItem('roomId');
            dispatch({ type: Actions.UPDATE_ROOM_ID, payload: data });
        }
        fetchUser();
        fetchToken();
        fetchTable();
        fetchRoom();
    }, [])

    const updateUser = (userData) => {
        dispatch({
            type: Actions.UPDATE_USER,
            payload: userData
        });
    }

    const updateToken = (userData) => {
        dispatch({
            type: Actions.UPDATE_TOKEN,
            payload: userData
        });
    }

    const updateTable = (tableId) => {
        dispatch({
            type: Actions.UPDATE_TABLE_ID,
            payload: tableId
        });
    }

    const updateRoom = (roomId) => {
        dispatch({
            type: Actions.UPDATE_ROOM_ID,
            payload: roomId
        });
    }

    const updateOrder = (order) => {
        dispatch({
            type: Actions.UPDATE_ORDER,
            payload: order
        });
    }

    const updateRestro = (restro) => {
        dispatch({
            type : Actions.UPDATE_RESTRO,
            payload : restro
        })
    }

    return (
        <GlobalContext.Provider
            value={{
                user: state.user,
                token: state.token,
                order: state.order,
                globalTableId: state.tableId,
                globalRoomId: state.roomId,
                restro : state.restro,
                updateUser,
                updateToken,
                updateTable,
                updateRoom,
                updateOrder,
                updateRestro
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};