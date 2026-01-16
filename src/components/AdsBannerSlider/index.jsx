// Seccion de banner de anuncios

import { Link } from 'react-router-dom'

const MockAds = [
    {
        id: 1,
        image: 'https://picsum.photos/300/250?random=5',
        link: '/ads1'
    },
    {
        id: 2,
        image:'https://picsum.photos/300/250?random=6',
        link: '/ads2'
    },
    {
        id: 3,
        image:'https://picsum.photos/300/250?random=7',
        link: '/ads3'
    },
    {
        id: 4,
        image:'https://picsum.photos/300/250?random=8',
        link: '/ads4'
    }
]

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