import React, { useState } from 'react';
import Button from '../Button';
import styles from './ContactForm.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/slices/contactsSlice';
import { nanoid } from '@reduxjs/toolkit';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const handleNameChange = evt => {
    const newTextValue = evt.target.value.replace(/[^a-zA-Z\s'-]/g, '');
    setName(newTextValue);
  };

  const handleNumberChange = e => {
    const newNumberValue = e.target.value.replace(
      /[^+\d\s()-]|^[\s()-]+|(?<=\d)[+]|\b[+]\b/g,
      ''
    );
    setNumber(newNumberValue);
  };

  const handleAddButtonClick = () => {
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const numberExists = contacts.some(contact => contact.number === number);

    if (nameExists) {
      alert(`${name} is already in contacts!`);
    } else if (numberExists) {
      alert(`${number} is already in contacts!`);
    } else if (name.trim() !== '' && number.trim() !== '') {
      dispatch(
        addContact({
          id: nanoid(),
          name: name,
          number: number,
        })
      );

      setName('');
      setNumber('');
    }
  };

  return (
    <form className={styles.container}>
      <label className={styles.label}>
        Name:
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name and surname:"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label className={styles.label}>
        Number:
        <input
          className={styles.input}
          type="tel"
          name="number"
          placeholder="Telephone number:"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleNumberChange}
        />
      </label>

      <Button type="button" action={handleAddButtonClick}>
        Add contact
      </Button>
    </form>
  );
};

export default ContactForm;
