// Formula de suscripción a Newsletter

import { useMemo, useState } from "react";

const FormSuscription = () => {
  const [accepted, setAccepted] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Validación simple de email
  const isEmailValid = useMemo(() => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  // Reglas de validación
  const isValid = accepted && name.trim().length > 0 && isEmailValid;

  const handleSubmit = (e) => {
    if (!isValid) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    console.log("Formulario enviado:", { accepted, name, email });
  };

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="flex w-full max-w-2xl flex-col gap-4"
      noValidate
    >
      {/* Checkbox */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          className="h-[20px] w-[20px] border border-gray-300"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span className="text-[14px]">Acepto los términos y condiciones</span>
      </label>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          className="h-[40px] w-full border border-gray-300 px-3"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="h-[40px] w-full border border-gray-300 px-3"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={!isValid}
        className={
          "h-[40px] w-full font-semibold transition-colors " +
          (isValid
            ? "bg-black text-white hover:bg-neutral-800"
            : "cursor-not-allowed bg-neutral-300 text-neutral-500")
        }
      >
        Suscribirse
      </button>
    </form>
  );
};

export default FormSuscription;