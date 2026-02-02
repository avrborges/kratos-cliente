import { Link } from "react-router-dom";

const PoliticaDePrivacidad = () => {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6">

        {/* Card Premium */}
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
              Política de Privacidad
            </h1>
            <p className="text-gray-600 text-[15px]">
              En Drakos Store valoramos tu privacidad. Esta política detalla cómo recopilamos, usamos y protegemos tu información.
            </p>
          </header>

          {/* Sección 1 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">
              1. Información que recopilamos
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Recopilamos información personal que vos nos proporcionás al registrarte, 
              realizar una compra o contactarte con nosotros. Esto incluye nombre, email, 
              domicilio, teléfono y detalles de pago.
            </p>

            <p className="text-gray-700 leading-relaxed text-[15px]">
              También recopilamos datos automáticamente, como dirección IP, tipo de dispositivo, 
              navegador y actividad dentro del sitio para mejorar tu experiencia.
            </p>
          </section>

          {/* Sección 2 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">
              2. Cómo usamos tu información
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Utilizamos tu información para:
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-[15px] leading-relaxed">
              <li>Procesar tus compras y pagos.</li>
              <li>Contactarte ante actualizaciones de tu pedido.</li>
              <li>Mejorar la experiencia de navegación y productos ofrecidos.</li>
              <li>Enviar promociones si optaste por recibirlas.</li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">
              3. Protección de datos
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Tomamos medidas de seguridad para proteger tus datos personales 
              contra accesos no autorizados, pérdidas o alteraciones. Sin embargo, 
              ningún sistema es 100% seguro, por lo que no podemos garantizar 
              seguridad absoluta.
            </p>
          </section>

          {/* Sección 4 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">
              4. Compartir información con terceros
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Solo compartimos información con proveedores necesarios para 
              procesar pagos, envíos y servicios esenciales del sitio.  
            </p>

            <p className="text-gray-700 leading-relaxed text-[15px]">
              Jamás vendemos ni cedemos tus datos a terceros con fines comerciales.
            </p>
          </section>

          {/* Sección 5 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">
              5. Cookies y tecnologías similares
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Utilizamos cookies para mejorar tu experiencia, guardar tus preferencias 
              y analizar el uso del sitio. Podés desactivar cookies desde tu navegador, 
              aunque algunas funciones pueden verse afectadas.
            </p>
          </section>

          {/* Sección 6 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-semibold text-gray-900 tracking-tight">
              6. Cambios en esta política
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Nos reservamos el derecho de actualizar esta política en cualquier 
              momento. Cualquier cambio será publicado en esta misma página.
            </p>
          </section>

          {/* Footer / Acciones */}
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
                Acepto y continuar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoliticaDePrivacidad;