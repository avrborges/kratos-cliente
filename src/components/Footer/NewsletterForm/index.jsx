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
      className="flex w-full max-w-xl flex-col gap-5"
      noValidate
    >
      {/* Checkbox */}
      <label className="flex items-start gap-3 text-gray-700 text-[14px]">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="h-[18px] w-[18px] rounded-md border border-gray-300 text-black focus:ring-black cursor-pointer"
        />
        <span>Acepto los términos y condiciones</span>
      </label>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Nombre */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-[46px] w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-[14px] 
                       focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[46px] w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-[14px] 
                       focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            required
          />

          {/* Error de email */}
          {!isEmailValid && email !== "" && (
            <span className="text-[12px] text-red-500 mt-1">
              Ingresá un email válido
            </span>
          )}
        </div>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={!isValid}
        className={`h-[46px] w-full rounded-xl font-semibold text-[15px] transition-all border 
                    ${
                      isValid
                        ? "border-gray-400 text-gray-900 bg-white hover:bg-gray-100 hover:border-gray-500"
                        : "border-gray-200 bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
      >
        Suscribirse
      </button>
    </form>
  );
};

export default FormSuscription;