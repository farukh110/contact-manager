import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {

  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {

    return <h4> Please use the form to add a contact. </h4>

  }

  return (
    <div>

      {
        filtered !== null ?

          filtered.map(contact => (

            <ContactItem key={contact.id} contact={contact} />

          )) : contacts.map(contact => (

            <ContactItem key={contact.id} contact={contact} />

          ))
      }

    </div>
  )
}

export default Contacts;
