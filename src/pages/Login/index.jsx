import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  /* -----------------------------------------
   * State
   * ----------------------------------------- */
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPwd: false,
  });

  const { email, password, showPwd } = form;

  /* -----------------------------------------
   * Derived state
   * ----------------------------------------- */
  const emailError = useMemo(() => {
    if (email.trim() === "") return false;
    return !EMAIL_REGEX.test(email);
  }, [email]);

  const isValid = useMemo(() => {
    return email !== "" && !emailError && password !== "";
  }, [email, emailError, password]);

  /* -----------------------------------------
   * Handlers (estables)
   * ----------------------------------------- */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const togglePassword = useCallback(() => {
    setForm((prev) => ({ ...prev, showPwd: !prev.showPwd }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!isValid) return;

      console.log("LOGIN:", { email, password });
    },
    [isValid, email, password]
  );

  /* -----------------------------------------
   * UI
   * ----------------------------------------- */
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
          Iniciar Sesión
        </h1>
        <p className="text-gray-600 text-[14px] text-center mt-1">
          Accedé a tu cuenta para continuar
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
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
                name="email"
                placeholder="tu@email.com"
                className="w-full bg-transparent outline-none text-[14px]"
                value={email}
                onChange={handleChange}
                aria-invalid={emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />
            </div>

            {emailError && (
              <span id="email-error" className="text-sm text-red-500">
                Ingresá un email válido.
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-medium text-gray-700">
              Contraseña
            </label>

            <div
              className="
                flex items-center gap-3
                rounded-lg border border-gray-300 px-3 py-2 bg-gray-50
                focus-within:ring-2 focus-within:ring-black/20
                transition-all
              "
            >
              <LockIcon className="text-gray-500" fontSize="small" />

              <input
                type={showPwd ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-[14px]"
                value={password}
                onChange={handleChange}
                aria-label="Contraseña"
              />

              <button
                type="button"
                onClick={togglePassword}
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
          </div>

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
            Ingresar
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-[14px]">
          <p className="text-gray-600">
            ¿No tenés cuenta?{" "}
            <Link
              to="/registro"
              className="text-gray-900 font-semibold hover:underline"
            >
              Crear una cuenta
            </Link>
          </p>

          <Link
            to="/reset-password"
            className="mt-2 inline-block text-[14px] text-gray-600 hover:text-gray-800"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;