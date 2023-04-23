import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";
import "./formComponent.scss";

const mockPhoneBookContacts = [
  {
    apellido: "Caicedo",
    celular: "7654321765",
    nombre: "Sofia",
    telefono: "7654321",
  },
  {
    apellido: "Jaramillo",
    celular: "7654321764",
    nombre: "Juan",
    telefono: "4723465",
  },
  {
    apellido: "Araujo",
    celular: "7654321762",
    nombre: "Oskar",
    telefono: "3467432",
  },
  {
    apellido: "Moreno",
    celular: "3843472354",
    nombre: "Daniela",
    telefono: "2347676",
  },
  {
    apellido: "Power",
    celular: "3495847239",
    nombre: "Max",
    telefono: "4857321",
  },
  {
    apellido: "Simpson",
    celular: "9580043201",
    nombre: "Homero",
    telefono: "9991112",
  },
];

const FormComponentModal = forwardRef(({ addContacts }, ref) => {
  const [phoneBookArray, setPhoneBookArray] = useState([
    ...mockPhoneBookContacts,
  ]);

  const formContainer = useRef();

  useImperativeHandle(ref, () => ({
    openModal() {
      reset();
      formContainer.current.style.display = "flex";
    },
  }));

  useEffect(() => {
    console.log("runing");
    addContacts(phoneBookArray);
  }, [phoneBookArray]);

  useEffect(() => {});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitForm = (data) => {
    setPhoneBookArray([...phoneBookArray, data]);
    reset();
    formContainer.current.style.display = "none";
  };

  const closeModal = () => {
    formContainer.current.style.display = "none";
  };

  return (
    <div className="form-container" ref={formContainer}>
      <div className="blur-background"></div>
      <form onSubmit={handleSubmit(onSubmitForm)} className="form-box">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <div className="input-box">
          <label>Primer nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", {
              required: true,
              maxLength: 10,
            })}
          />
          {errors.nombre?.type === "required" && <p>El campo es requerido</p>}
          {errors.nombre?.type === "maxLength" && (
            <p>El campo debe tener menos de 10 caracteres</p>
          )}
        </div>
        <div className="input-box">
          <label>Primer apellido</label>
          <input
            type="text"
            placeholder="Apellido"
            {...register("apellido", {
              maxLength: 10,
            })}
          />
          {errors.apellido?.type === "maxLength" && (
            <p>El campo debe tener menos de 10 caracteres</p>
          )}
        </div>
        <div className="input-box">
          <label>Número de telefono</label>
          <input
            type="tel"
            placeholder="Telèfono"
            {...register("telefono", {
              required: true,
              maxLength: 7,
              minLength: 7,
              pattern:
                /^(?:\+?\d{1,3}\s*(?:\(\d{1,4}\)|\d{1,4})?[\s-]*)?\d{6,10}$/,
            })}
          />
          {errors.telefono?.type === "required" && <p>El campo es requerido</p>}
          {errors.telefono?.type === "minLength" && (
            <p>El campo debe tener al menos 7 dígitos</p>
          )}
          {errors.telefono?.type === "maxLength" && (
            <p>El campo debe tener 7 máximo</p>
          )}
          {errors.telefono?.type === "pattern" && (
            <p>El campo no se reconoce como un número de teléfono</p>
          )}
        </div>
        <div className="input-box">
          <label>Nùmero de celular</label>
          <input
            type="tel"
            placeholder="Celular"
            {...register("celular", {
              required: true,
              maxLength: 10,
              minLength: 10,
              pattern:
                /^(?:\+?\d{1,3}\s*(?:\(\d{1,4}\)|\d{1,4})?[\s-]*)?\d{6,10}$/,
            })}
          />
          {errors.celular?.type === "required" && <p>El campo es requerido</p>}
          {errors.celular?.type === "minLength" && (
            <p>El campo debe tener al menos 10 dígitos</p>
          )}
          {errors.celular?.type === "maxLength" && (
            <p>El campo debe tener 10 dígitos máximo</p>
          )}
          {errors.celular?.type === "pattern" && (
            <p>El campo no se reconoce como un número de celular</p>
          )}
        </div>
        <div className="submit-button-box">
          <input className="submit-button" type="submit" value="Enviar" />
        </div>
      </form>
    </div>
  );
});

export default FormComponentModal;
