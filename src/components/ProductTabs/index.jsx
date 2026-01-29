
import { useState } from "react";
import { MockComentarios } from "../../mocks";
import { Rating, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const ProductTabs = ({ item }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Estado del formulario (solo rating + comentario)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const ratingError = rating === 0;
  const commentError = comment.trim() === "";

  // Filtrar comentarios del producto actual
  const comentariosProducto = MockComentarios.filter(
    (coment) => coment.idProducto === item.id
  );

  return (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-8 pt-4">
        <span
          className={`text-[16px] cursor-pointer font-[500] ${
            activeTab === 0 ? "text-black font-bold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Descripción
        </span>

        <span
          className={`text-[16px] cursor-pointer font-[500] ${
            activeTab === 1 ? "text-black font-bold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Detalles del producto
        </span>

        <span
          className={`text-[16px] cursor-pointer font-[500] ${
            activeTab === 2 ? "text-black font-bold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Reviews
        </span>
      </div>

      {/* DESCRIPCIÓN */}
      {activeTab === 0 && (
        <div className="
          w-full mt-6 p-8 
          bg-white rounded-xl 
          border border-gray-200 
          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
          space-y-6
        ">
          <p className="text-[14px]">{item.description}</p>
        </div>
      )}

      {/* DETALLES DEL PRODUCTO */}
      {activeTab === 1 && (
        <div className="
          w-full mt-6 p-8 
          bg-white rounded-xl 
          border border-gray-200 
          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
          space-y-6
        ">
          <p className="text-[14px] text-gray-700">
            Acá podés agregar detalles técnicos del producto.
          </p>
        </div>
      )}

      {/* REVIEWS */}
      {activeTab === 2 && (
        <div className="
          w-full mt-6 p-8 
          bg-white rounded-xl 
          border border-gray-200 
          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
          space-y-6
        ">
          {/* LISTADO DE REVIEWS */}
          {comentariosProducto.length > 0 ? (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Opiniones de clientes
              </h3>

              {comentariosProducto.map((coment) => (
                <div
                  key={coment.id}
                  className="
                    p-4 rounded-lg border border-gray-100 
                    shadow-sm bg-gray-50/70 hover:shadow-md transition
                  "
                >
                  <div className="flex items-center gap-3">
                    {/* ICONO DE USUARIO */}
                    <AccountCircleIcon className="w-10 h-10 text-gray-500" />

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800">
                          {coment.nombreUsuario}
                        </span>
                        <Rating size="small" readOnly value={coment.rating} />
                      </div>

                      <p className="text-[14px] text-gray-700 mt-2">
                        {coment.comentario}
                      </p>

                      <p className="text-[12px] text-gray-400 mt-1">
                        {new Date(coment.CreatedAt).toLocaleDateString("es-AR")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-[15px] text-gray-800 font-medium">
                No hay reviews aún.
              </p>
              <p className="text-[14px] text-gray-500">
                Sé el primero en dejar tu opinión.
              </p>
            </>
          )}

          {/* FORMULARIO DE NUEVA REVIEW */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              Agregar una review
            </h4>

            {/* CALIFICACIÓN */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-medium text-gray-700">
                Calificación <span className="text-red-500">*</span>
              </label>

              <Rating
                value={rating}
                precision={0.5}
                size="large"
                onChange={(e, value) => setRating(value)}
              />

              {ratingError && (
                <span className="text-sm text-red-500">
                  La calificación es obligatoria.
                </span>
              )}
            </div>

            {/* COMENTARIO */}
            <div className="flex flex-col gap-1 mt-4">
              <label className="text-[14px] font-medium text-gray-700">
                Comentario <span className="text-red-500">*</span>
              </label>

              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`
                  border rounded-md px-3 py-2 w-full transition
                  focus:outline-none focus:ring-2
                  ${
                    commentError && comment !== ""
                      ? "border-red-500 ring-red-300"
                      : "border-gray-300 focus:ring-black/20"
                  }
                `}
              ></textarea>

              {commentError && comment !== "" && (
                <span className="text-sm text-red-500">
                  El comentario es obligatorio.
                </span>
              )}
            </div>

            {/* BOTÓN ENVIAR */}
            <Button
              variant="contained"
              disabled={ratingError || commentError}
              className={`
                !mt-6 !py-3 !px-6 !text-lg !font-semibold
                ${
                  ratingError || commentError
                    ? "!bg-gray-300 !text-gray-500 !cursor-not-allowed"
                    : "!bg-black !text-white hover:!bg-gray-900"
                }
              `}
              onClick={() =>
                console.log("REVIEW ENVIADA:", {
                  idProducto: item.id,
                  rating,
                  comentario: comment,
                })
              }
            >
              Enviar review
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTabs;
