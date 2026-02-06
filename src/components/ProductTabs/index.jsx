import React, { useState } from "react";
import { MockComentarios } from "../../mocks";
import { Rating, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";

// Tabla
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Context
import { useAuth } from "../../context/AuthContext";

const ProductTabs = ({ item }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { isLoggedIn } = useAuth();

  // Form review
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const ratingError = rating === 0;
  const commentError = comment.trim() === "";

  // Reviews del producto
  const comentariosProducto = MockComentarios.filter(
    (c) => c.idProducto === item.id
  );

  return (
    <>
      {/* ----------- TABS ----------- */}
      <div className="flex items-center gap-10 pt-6 pl-2 border-b border-gray-200">
        {["Descripción", "Detalles del producto", `Reviews (${comentariosProducto.length})`].map(
          (label, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`
                pb-3 text-[16px] tracking-tight font-medium relative transition-all
                ${activeTab === idx ? "text-gray-900 font-semibold" : "text-gray-500"}
              `}
            >
              {label}

              {/* underline */}
              <span
                className={`
                  absolute left-0 right-0 -bottom-[2px] h-[2px] bg-gray-900 transition-all duration-300
                  ${activeTab === idx ? "opacity-100" : "opacity-0"}
                `}
              />
            </button>
          )
        )}
      </div>

      {/* ----------- DESCRIPCIÓN ----------- */}
      {activeTab === 0 && (
        <div
          className="
            w-full mt-6 p-8
            rounded-xl bg-white ring-1 ring-black/5
            shadow-[0_6px_24px_rgba(0,0,0,0.06)]
            text-gray-700 leading-relaxed tracking-tight
          "
        >
          <p className="text-[15px]">{item.description}</p>
        </div>
      )}

      {/* ----------- DETALLES ----------- */}
      {activeTab === 1 && (
        <div
          className="
            w-full mt-6 p-8
            rounded-xl bg-white ring-1 ring-black/5
            shadow-[0_6px_24px_rgba(0,0,0,0.06)]
          "
        >
          <TableContainer>
            <Table>
              <TableBody>
                {[
                  ["Categoría", item.category],
                  ["Marca", item.brand],
                  ["SKU", item.sku],
                  ["Precio original", item.price],
                  ["Precio con descuento", item.offerprice],
                  [
                    "Stock Disponible",
                    item.stock > 0 ? `${item.stock} unidades` : "Sin stock",
                  ],
                  [
                    "Colores disponibles",
                    item.stock === 0
                      ? "Sin stock"
                      : Array.isArray(item.colors) && item.colors.length > 0
                      ? item.colors.map((c) => c.name).join(", ")
                      : "No hay colores disponibles",
                  ],
                  [
                    "Talles disponibles",
                    item.stock === 0
                      ? "Sin stock"
                      : Array.isArray(item.sizes) && item.sizes.length > 0
                      ? item.sizes.map((t) => t.name).join(", ")
                      : "No hay talles disponibles",
                  ],
                ].map(([label, value], i) => (
                  <TableRow key={i}>
                    <TableCell className="font-semibold text-gray-800">
                      {label}
                    </TableCell>
                    <TableCell className="text-gray-700">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* ----------- REVIEWS ----------- */}
      {activeTab === 2 && (
        <div
          className="
            w-full mt-6 p-8
            rounded-xl bg-white ring-1 ring-black/5
            shadow-[0_6px_24px_rgba(0,0,0,0.06)]
            space-y-8
          "
        >
          {/* ----- LISTA DE REVIEWS ----- */}
          {comentariosProducto.length > 0 ? (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                Opiniones de clientes
              </h3>

              {comentariosProducto.map((coment) => (
                <div
                  key={coment.id}
                  className="
                    p-5 rounded-xl bg-gray-50/60 
                    ring-1 ring-black/5 
                    shadow-sm hover:shadow-md transition-all
                  "
                >
                  <div className="flex items-start gap-4">
                    {/* Icono */}
                    <div
                      className="
                        w-12 h-12 rounded-full bg-white/70 backdrop-blur
                        ring-1 ring-black/5 shadow-sm flex items-center justify-center
                      "
                    >
                      <AccountCircleIcon className="text-gray-600 !text-[32px]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-semibold tracking-tight">
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
              <p className="text-[15px] text-gray-800 font-medium tracking-tight">
                No hay reviews aún.
              </p>
              <p className="text-[14px] text-gray-500">
                Sé el primero en dejar tu opinión.
              </p>
            </>
          )}

          {/* ----- FORM ----- */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 tracking-tight mb-4">
              Agregar una review
            </h4>

            <Tooltip
              arrow
              title={
                !isLoggedIn
                  ? "Iniciá sesión para dejar una review"
                  : "Completá los campos obligatorios"
              }
            >
              <div className={`${!isLoggedIn ? "opacity-50 pointer-events-none" : ""}`}>
                {/* Rating */}
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-medium text-gray-700">
                    Calificación <span className="text-red-500">*</span>
                  </label>

                  <Rating
                    value={rating}
                    precision={0.5}
                    size="large"
                    onChange={(e, val) => setRating(val)}
                    disabled={!isLoggedIn}
                  />

                  {ratingError && (
                    <span className="text-sm text-red-500">
                      La calificación es obligatoria.
                    </span>
                  )}
                </div>

                {/* Comentario */}
                <div className="flex flex-col gap-1 mt-4">
                  <label className="text-[14px] font-medium text-gray-700">
                    Comentario <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!isLoggedIn}
                    className={`
                      border rounded-lg px-3 py-2 w-full text-[14px]
                      transition-all resize-none
                      focus:outline-none focus:ring-2
                      ${
                        commentError && comment !== ""
                          ? "border-red-500 ring-red-300"
                          : "border-gray-300 ring-black/10 focus:ring-black/20"
                      }
                    `}
                  />

                  {commentError && comment !== "" && (
                    <span className="text-sm text-red-500">
                      El comentario es obligatorio.
                    </span>
                  )}
                </div>

                {/* Botón */}
                <Button
                  variant="contained"
                  disabled={!isLoggedIn || ratingError || commentError}
                  onClick={() => {
                    if (!isLoggedIn) return;
                    console.log("REVIEW ENVIADA:", {
                      idProducto: item.id,
                      rating,
                      comentario: comment,
                    });
                  }}
                  sx={{
                    mt: 3,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "15px",
                    borderRadius: "10px",
                    px: 3,
                    py: 1.5,
                    bgcolor:
                      !isLoggedIn || ratingError || commentError ? "grey.300" : "black",
                    color:
                      !isLoggedIn || ratingError || commentError
                        ? "text.disabled"
                        : "white",
                    boxShadow:
                      !isLoggedIn || ratingError || commentError
                        ? "none"
                        : "0 8px 20px rgba(0,0,0,0.25)",
                    "&:hover":
                      !isLoggedIn || ratingError || commentError
                        ? {}
                        : { bgcolor: "grey.900", transform: "translateY(-1px)" },
                  }}
                  fullWidth
                >
                  {!isLoggedIn ? "Iniciá sesión" : "Enviar review"}
                </Button>
              </div>
            </Tooltip>
          </div>

        </div>
      )}
    </>
  );
};

export default ProductTabs;