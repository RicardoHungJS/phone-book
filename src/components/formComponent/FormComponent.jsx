import { useForm } from "react-hook-form";

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
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
        <div>
          <label>Apellido</label>
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
        <div>
          <label>Nùmero de telefono</label>
          <input
            type="tel"
            placeholder="Telèfono"
            {...register("telefono", {
              required: true,
              maxLength: 10,
              minLength: 7,
              pattern: /^(\+\d{1,3})?\d{9,15}$/,
            })}
          />
          {errors.telefono?.type === "required" && <p>El campo es requerido</p>}
          {errors.telefono?.type === "minLength" && (
            <p>El campo debe tener al menos 7 dìgitos</p>
          )}
          {errors.telefono?.type === "maxLength" && (
            <p>El campo debe tener 10 dìgitos o menos</p>
          )}
          {errors.telefono?.type === "pattern" && (
            <p>El campo solo admite valores numèricos</p>
          )}
        </div>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default FormComponent;
