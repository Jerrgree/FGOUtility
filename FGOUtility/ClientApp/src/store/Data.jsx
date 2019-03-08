import { getToken } from '../utils/auth';

const loadData = 'LOAD_DATA';
const recieveData = 'RECEIVE_DATA';
const saveData = 'SAVE_DATA';

const initialState = {
    inventory: {},
    servants: [],
    isLoading: false,
    isLoaded: true,
    isDirty: false,
};

export const actionCreators = {
    load: () => async (dispatch, getState) => {
        if (getState().isLoading) {
            return;
        }

        dispatch({ type: loadData });
        const url = 'api/Data/Load';
        await fetch(url, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        })
            .then(response => response.json())
            .then(json => dispatch({ type: recieveData, data: json }));
        },
    save: (data) => async (dispatch, getState) => {
        const state = getState();
        //if (!state.isDirty) {
        //    return;
        //}
        dispatch({ type: saveData, data: data })
        const url = 'api/Data/Save';
        await fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(data)
        });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === loadData) {
        return {
            ...state,
            isLoaded: false,
            isLoading: true
        };
    }

    if (action.type === recieveData) {
        return {
            ...state,
            isLoaded: true,
            isLoading: false,
            inventory: action.data.inventory,
            servants: action.data.servants
        }
    }

    if (action.type === saveData) {
        return {
            ...state,
            isDirty: false,
            inventory: action.data.inventory,
            servants: action.data.servants
        }
    }

    return state;
};
