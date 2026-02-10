import { useMemo, useState, useCallback } from "react";

export default function FormSuscription() {
  const [accepted, setAccepted] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Validación de email
  const isEmailValid = useMemo(() => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const isValid = useMemo(() => {
    return accepted && name.trim().length > 0 && isEmailValid;
  }, [accepted, name, isEmailValid]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!isValid) return;

      console.log("Formulario enviado:", {
        accepted,
        name,
        email,
      });
    },
    [isValid, accepted, name, email]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-5"
      noValidate
    >
      {/* Checkbox */}
      <label
        htmlFor="terms"
        className="flex items-start gap-3 text-gray-700 text-[14px]"
      >
        <input
          id="terms"
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
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-[46px] w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-[14px] 
                     focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          required
        />

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
}