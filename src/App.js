import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './components/contactForm/ContactForm';
import FilterByName from './components/filter/FilterByName';
import ContactList from './components/contactList/ContactList';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Denzel Hayes Washington Jr', number: '459-12-56' },
      { id: 'id-2', name: 'Julia Roberts', number: '443-89-12' },
      { id: 'id-3', name: 'Jennifer Aniston', number: '645-17-79' },
      { id: 'id-4', name: 'Robert De Niro', number: '227-91-26' },
    ],
    filter: '',
  };

  nameFinder = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  handlerFormSubmit = data => {
    const findSpecificContact = this.state.contacts.find(
      contact => contact.name === data.name,
    );

    !findSpecificContact
      ? this.setState(prevState => ({
          contacts: [data, ...prevState.contacts],
        }))
      : Notiflix.Notify.failure(
          `Sorry, but user with name ${data.name} has already registered in contacts. Please specify your name!`,
        );
  };

  getContacts = () => {
    const noramlizedDataInput = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(noramlizedDataInput),
    );
  };

  deleteContactFromList = data => {
    return this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== data.id),
    }));
  };

  render() {
    return (
      <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm handlerFormSubmit={this.handlerFormSubmit} />

        <h2 className={s.title}>Contacts</h2>
        <FilterByName filter={this.state.filter} nameFinder={this.nameFinder} />
        <ContactList
          getContacts={this.getContacts()}
          deleteContactFromList={this.deleteContactFromList}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

export default App;
