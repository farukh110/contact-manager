import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';

import { ADD_CONTACT,
         DELETE_CONTACT, 
         SET_CURRENT, 
         CLEAR_CURRENT,
         UPDATE_CURRENT,
         FILTER_CONTACTS,
         CLEAR_FILTER } from '../constants/types';

const ContactState = props => {
    
    const initialState = {
        
        contacts: [
            {
                id: 1,
                name: 'oan',
                email: 'oan110@gmail.com',
                phone: '03414285511',
                type: 'personal'
            },
            {
                id: 2,
                name: 'oan sajjad',
                email: 'oan115@gmail.com',
                phone: '03414285512',
                type: 'professional'
            },
            {
                id: 3,
                name: 'muhammad raza',
                email: 'muhammad.raza@gmail.com',
                phone: '03414285512',
                type: 'professional'
            }
        ],
        // contact: null,
        current: null,
        filtered: null

    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // add contact

    const addContact = contact => {

        contact.id = uuid();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }

    // delete contact

    const deleteContact = id => {

        dispatch({ type: DELETE_CONTACT, payload: id });
    }

    // set current contact

    const setCurrent = contact => {

        dispatch({ type: SET_CURRENT, payload: contact });
    } 

    // clear current contact

    const clearContact = () => {

        dispatch({ type: CLEAR_CURRENT });
    }

    // update contact

    const updateContact = contact => {

        dispatch({ type: UPDATE_CURRENT, payload: contact });
    }

    // filter contacts

    const filterContacts = text => {

        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    // clear filter

    const clearFilter = () => {

        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <contactContext.Provider value={{ 
                                          contacts: state.contacts,
                                          current: state.current,
                                          filtered: state.filtered,
                                          addContact,
                                          updateContact, 
                                          deleteContact,
                                          setCurrent,
                                          clearContact,
                                          filterContacts,
                                          clearFilter }}>
            { props.children }
        </contactContext.Provider>
    )
}

export default ContactState;
