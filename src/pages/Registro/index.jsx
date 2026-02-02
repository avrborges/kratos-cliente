import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [accepted, setAccepted] = useState(false);

  // toggles ver/ocultar
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- Validaciones ---
  const emailError =
    email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordTooShort = password !== "" && password.length < 8;
  const passwordMismatch =
    confirm !== "" && password !== "" && password !== confirm;

  // Regla para habilitar CTA
  const isValid = useMemo(() => {
    return (
      name.trim() !== "" &&
      email !== "" &&
      !emailError &&
      password !== "" &&
      !passwordTooShort &&
      confirm !== "" &&
      !passwordMismatch &&
      accepted
    );
  }, [
    name,
    email,
    emailError,
    password,
    passwordTooShort,
    confirm,
    passwordMismatch,
    accepted,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("REGISTER:", {
      name,
      email,
      password,
      acceptedTerms: accepted,
    });

    // TODO: Integrar con backend / API de registro
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div
        className="
          w-full max-w-md mx-auto
          rounded-xl bg-white ring-1 ring-black/5
          shadow-[0_6px_24px_rgba(0,0,0,0.06)]
          p-8
        "
      >
        {/* Header */}
        <h1 className="text-[26px] font-semibold tracking-tight text-gray-900 text-center">
          Crear una cuenta
        </h1>
        <p className="text-gray-600 text-[14px] text-center mt-1">
          Registrate para continuar
        </p>

        {/* FORM */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-medium text-gray-700">
              Nombre completo
            </label>

            <div
              className="
                flex items-center gap-3
                rounded-lg border border-gray-300
                px-3 py-2 bg-gray-50
                focus-within:ring-2 focus-within:ring-black/20
                transition-all
              "
            >
              <PersonIcon className="text-gray-500" fontSize="small" />
              <input
                type="text"
                placeholder="Juan Pérez"
                className="w-full bg-transparent outline-none text-[14px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Nombre completo"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-medium text-gray-700">
              Email
            </label>

            <div
              className={`
                flex items-center gap-3
                rounded-lg border px-3 py-2 bg-gray-50
                focus-within:ring-2 focus-within:ring-black/20
                transition-all
                ${emailError ? "border-red-500 ring-red-300" : "border-gray-300"}
              `}
            >
              <EmailIcon className="text-gray-500" fontSize="small" />
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full bg-transparent outline-none text-[14px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={emailError ? "true" : "false"}
                aria-describedby={emailError ? "email-error" : undefined}
              />
            </div>

            {emailError && (
              <span id="email-error" className="text-sm text-red-500">
                Ingresá un email válido.
              </span>
            )}
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-medium text-gray-700">
              Contraseña
            </label>

            <div
              className={`
                flex items-center gap-3
                rounded-lg border px-3 py-2 bg-gray-50
                focus-within:ring-2 focus-within:ring-black/20
                transition-all
                ${passwordTooShort ? "border-red-500 ring-red-300" : "border-gray-300"}
              `}
            >
              <LockIcon className="text-gray-500" fontSize="small" />

              <input
                type={showPwd ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                className="w-full bg-transparent outline-none text-[14px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Contraseña"
              />

              {/* Toggle ver/ocultar */}
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? "Ocultar contraseña" : "Ver contraseña"}
                className="
                  ml-auto flex items-center justify-center
                  w-9 h-9 rounded-full bg-white/70 backdrop-blur
                  ring-1 ring-black/5 shadow-sm
                  hover:bg-gray-100 transition-all
                "
              >
                {showPwd ? (
                  <VisibilityOffIcon className="text-gray-700" fontSize="small" />
                ) : (
                  <VisibilityIcon className="text-gray-700" fontSize="small" />
                )}
              </button>
            </div>

            <div className="flex items-start gap-2 text-[12px] text-gray-500">
              <InfoOutlinedIcon fontSize="inherit" />
              <span>
                La contraseña debe tener al menos <strong>8 caracteres</strong>.
              </span>
            </div>

            {passwordTooShort && (
              <span className="text-sm text-red-500">
                La contraseña es demasiado corta.
              </span>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-medium text-gray-700">
              Repetir contraseña
            </label>

            <div
              className={`
                flex items-center gap-3
                rounded-lg border px-3 py-2 bg-gray-50
                focus-within:ring-2 focus-within:ring-black/20
                transition-all
                ${passwordMismatch ? "border-red-500 ring-red-300" : "border-gray-300"}
              `}
            >
              <LockIcon className="text-gray-500" fontSize="small" />

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repetí tu contraseña"
                className="w-full bg-transparent outline-none text-[14px]"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                aria-label="Confirmar contraseña"
              />

              {/* Toggle ver/ocultar */}
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Ocultar confirmación" : "Ver confirmación"}
                className="
                  ml-auto flex items-center justify-center
                  w-9 h-9 rounded-full bg-white/70 backdrop-blur
                  ring-1 ring-black/5 shadow-sm
                  hover:bg-gray-100 transition-all
                "
              >
                {showConfirm ? (
                  <VisibilityOffIcon className="text-gray-700" fontSize="small" />
                ) : (
                  <VisibilityIcon className="text-gray-700" fontSize="small" />
                )}
              </button>
            </div>

            {passwordMismatch && (
              <span className="text-sm text-red-500">
                Las contraseñas no coinciden.
              </span>
            )}
          </div>

          {/* Términos y condiciones */}
          <label className="flex items-start gap-3 text-gray-700 text-[14px] select-none">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="h-[16px] w-[16px] rounded border border-gray-300 text-black focus:ring-black cursor-pointer mt-[2px]"
            />
            <span>
              Acepto los{" "}
              <Link to="/terminos" className="text-gray-900 font-semibold hover:underline">
                Términos y Condiciones
              </Link>{" "}
              y la{" "}
              <Link to="/privacidad" className="text-gray-900 font-semibold hover:underline">
                Política de Privacidad
              </Link>.
            </span>
          </label>

          {/* CTA */}
          <button
            type="submit"
            disabled={!isValid}
            className={`
              w-full rounded-lg font-semibold tracking-tight text-[15px]
              px-6 py-3 mt-2 transition-all duration-300
              ${
                !isValid
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900 hover:-translate-y-[1px] shadow-[0_4px_15px_rgba(0,0,0,0.25)]"
              }
            `}
          >
            Crear cuenta
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center text-[14px]">
          <p className="text-gray-600">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="text-gray-900 font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;