// Sección de banner de anuncios
import { Link } from 'react-router-dom';
// Mock data: asegurate de que sea "puro" (solo datos, sin side effects)
import { MockAds } from '../../mocks';

export default function AdsBannerSlider() {
  return (
    <div className="AdsBannerSlider w-[90%] mx-auto mt-5">
      <div className="adsWrapper flex items-center justify-center gap-5 overflow-x-auto py-3">
        {MockAds.map((ad) => (
          <Link key={ad.id} to={ad.link}>
            <div className="adItem w-[300px] h-[250px] overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all">
              <img
                src={ad.image}
                alt={ad.title ?? 'Publicidad'} 
                className="w-full h-full object-cover hover:scale-105 transition-all"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}