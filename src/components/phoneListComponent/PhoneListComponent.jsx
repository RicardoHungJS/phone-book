import { useEffect, useState } from "react";
import "./phoneListComponent.scss";
import _ from "lodash";

const PhoneListComponent = ({ contacts, openModal }) => {
  const [listContacts, setListConstacts] = useState([]);

  const [nameDir, setNameDir] = useState(true);
  const [lastNameDir, setLastNameDir] = useState(true);
  const [celPhoneDir, setCelPhoneDir] = useState(true);
  const [phonwDir, setPhonwDir] = useState(true);

  useEffect(() => {
    setListConstacts(_.orderBy(contacts, ["nombre"]));
  }, [contacts]);

  const openModalFunc = () => {
    openModal();
  };

  const [searchContact, setSearchContact] = useState("");

  const handleChange = (event) => {
    setSearchContact(event.target.value);
  };

  const filteredData = listContacts.filter((item) =>
    item.nombre.toLowerCase().includes(searchContact.toLowerCase())
  );

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData])

  const orderContactsNameAlphabetically = () => {
    if (nameDir === false) {
      setListConstacts(_.orderBy(filteredData, ["nombre"], ["asc"]));
    } else {
      setListConstacts(_.orderBy(filteredData, ["nombre"], ["desc"]));
    }
    setNameDir(!nameDir);
  };

  const orderContactsLastNameAlphabetically = () => {
    if (lastNameDir === true) {
      setListConstacts(_.orderBy(filteredData, ["apellido"], ["asc"]));
    } else {
      setListConstacts(_.orderBy(filteredData, ["apellido"], ["desc"]));
    }
    setLastNameDir(!lastNameDir);
  };

  const orderContactsCelPhone = () => {
    if (celPhoneDir === true) {
      setListConstacts(_.orderBy(filteredData, ["celular"], ["asc"]));
    } else {
      setListConstacts(_.orderBy(filteredData, ["celular"], ["desc"]));
    }
    setCelPhoneDir(!celPhoneDir);
  };

  const orderContactsPhone = () => {
    if (phonwDir === true) {
      setListConstacts(_.orderBy(filteredData, ["telefono"], ["asc"]));
    } else {
      setListConstacts(_.orderBy(filteredData, ["telefono"], ["desc"]));
    }
    setPhonwDir(!phonwDir);
  };

  return (
    <div className="phone-book-container">
      <h1>Contactos</h1>
      <input className="search-input" type="text" placeholder="Buscador" onChange={handleChange}/>
      <div className="contact-list-box-header">
        <p className="header-click" onClick={orderContactsNameAlphabetically}>
          Nombre
        </p>
        <p
          className="header-click"
          onClick={orderContactsLastNameAlphabetically}
        >
          Apellido
        </p>
        <p className="header-click" onClick={orderContactsCelPhone}>
          Celular
        </p>
        <p className="header-click" onClick={orderContactsPhone}>
          Teléfono
        </p>
      </div>
      <div className="scroll-box">
        {filteredData.map((contact, i) => {
          return (
            <div className="contact-list-box">
              <p key={`${i}a`}>{contact.nombre}</p>
              <p key={`${i}b`}>{contact.apellido}</p>
              <p key={`${i}c`}>{contact.celular}</p>
              <p key={`${i}d`}>{contact.telefono}</p>
            </div>
          );
        })}
      </div>
      <button className="new-contact-button" onClick={openModalFunc}>
        Agregar nuevo contacto
      </button>
    </div>
  );
};

export default PhoneListComponent;
