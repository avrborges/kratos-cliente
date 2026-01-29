import { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'

const ProductZoom = ({ images = [] }) => {

  const safeImages = images ?? [];

  if (!safeImages.length) return null;  // 👈 NO renderiza nada si no hay imágenes

  const [selectedImage, setSelectedImage] = useState(safeImages[0]);

  useEffect(() => {
    if (safeImages.length) {
      setSelectedImage(safeImages[0]);
    }
  }, [safeImages]);

  return (
    <div className="flex gap-2">
      <div className="thumbnails flex flex-col gap-4 w-[280px]">
        {safeImages.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`thumbnail-${index}`}
            className={`
              w-20 h-20 object-cover cursor-pointer border transition-all
              ${selectedImage === thumbnail 
                ? "border-black opacity-100"
                : "border-gray-300 opacity-40 hover:opacity-100"}
            `}
            onClick={() => setSelectedImage(thumbnail)}
          />
        ))}
      </div>

      <InnerImageZoom
        src={selectedImage}
        zoomSrc={selectedImage}
        hasSpacer={false}
        zoomType="hover"
        zoomPreload={true}
      />
    </div>
  );
};


export default ProductZoom