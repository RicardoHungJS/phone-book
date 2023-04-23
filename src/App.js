import { useRef, useState } from "react";
import "./App.scss";
import FormComponentModal from "./components/formComponent/FormComponent";
import PhoneListComponent from "./components/phoneListComponent/PhoneListComponent";

function App() {
  const [contacts, setContacts] = useState([]);

  const formModal = useRef(null);

  const addContacts = (contacts) => {
    setContacts(contacts);
  };

  const openFormModal = () => {
    formModal.current.openModal();
  };

  return (
    <div className="app-container">
      <FormComponentModal ref={formModal} addContacts={addContacts} />
      <PhoneListComponent contacts={contacts} openModal={openFormModal} />
    </div>
  );
}

export default App;
