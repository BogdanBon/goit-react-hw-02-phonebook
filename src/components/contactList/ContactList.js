import PropTypes from 'prop-types';

function ContactList({ getVisibleContacts, deleteContact }) {
  return (
    <ul>
      {getVisibleContacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button type="submit" onClick={() => deleteContact(contact)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  getVisibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
};

export default ContactList;
