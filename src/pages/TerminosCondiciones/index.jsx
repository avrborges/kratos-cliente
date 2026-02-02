import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6">

        {/* Card premium */}
        <div
          className="
            bg-white rounded-xl ring-1 ring-black/5
            shadow-[0_6px_24px_rgba(0,0,0,0.06)]
            p-10 space-y-10
          "
        >
          {/* Header */}
          <header className="space-y-2">
            <h1 className="text-[28px] font-semibold tracking-tight text-gray-900">
              Términos y Condiciones
            </h1>
            <p className="text-gray-600 text-[15px]">
              Bienvenido a Drakos Store. Al utilizar nuestro sitio aceptás estos términos.
            </p>
          </header>

          {/* Sección 1 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-gray-900">
              1. Aceptación de los términos
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Al acceder y utilizar este sitio web, confirmás que leíste, entendés y aceptás
              los presentes Términos y Condiciones. Si no estás de acuerdo con alguna parte, 
              debés dejar de utilizar el sitio inmediatamente.
            </p>
          </section>

          {/* Sección 2 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-gray-900">
              2. Uso del sitio
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              El contenido, productos y servicios disponibles en este sitio están destinados 
              exclusivamente a uso personal y no comercial. Está prohibido modificar, copiar, 
              distribuir o reproducir cualquier contenido sin autorización previa.
            </p>
          </section>

          {/* Sección 3 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-gray-900">
              3. Precios y disponibilidad
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Los precios pueden cambiar sin previo aviso. Hacemos nuestro máximo esfuerzo 
              por mantener la información actualizada, pero no garantizamos exactitud absoluta 
              en el stock, precios o descripciones.
            </p>
          </section>

          {/* Sección 4 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-gray-900">
              4. Envíos y devoluciones
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Ofrecemos envíos a todo el país. Los tiempos de entrega varían según la 
              localidad. Las devoluciones deben gestionarse dentro de los primeros 30 días 
              desde la recepción del producto. El artículo debe estar en perfecto estado.
            </p>
          </section>

          {/* Sección 5 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-gray-900">
              5. Protección de datos personales
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Nos comprometemos a proteger tu privacidad. La información personal proporcionada 
              será utilizada conforme a nuestra Política de Privacidad, disponible en esta misma web.
            </p>
          </section>

          {/* Sección 6 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold tracking-tight text-gray-900">
              6. Modificaciones
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento.
              Cualquier cambio será publicado en esta página.
            </p>
          </section>

          {/* Footer / acciones */}
          <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link
              to="/"
              className="
                text-gray-800 font-semibold hover:underline text-[14px]
              "
            >
              ← Volver al inicio
            </Link>

            <Link to="/registro">
              <button
                className="
                  bg-black text-white font-semibold tracking-tight
                  rounded-lg px-6 py-3
                  transition-all duration-300
                  hover:bg-gray-900 hover:-translate-y-[1px]
                  shadow-[0_4px_15px_rgba(0,0,0,0.25)]
                "
              >
                Aceptar y continuar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;