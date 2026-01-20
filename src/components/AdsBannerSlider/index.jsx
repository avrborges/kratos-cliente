// Seccion de banner de anuncios
import { Link } from 'react-router-dom'
// Mock data
import { MockAds } from '../../mocks'

const AdsBannerSlider = () => {
  return (
    <div className='AdsBannerSlider w-[90%] mx-auto mt-5 '>
        <div className="adsWrapper flex items-center justify-center gap-5 overflow-x-auto py-3">
            {MockAds.map(ad => (
                <Link key={ad.id} to={ad.link}>
                    <div className="adItem w-[300px] h-[250px] overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all">
                        <img src={ad.image} className='w-full h-full object-cover hover:scale-105 transition-all'/>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default AdsBannerSlider