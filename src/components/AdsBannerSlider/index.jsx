import React from 'react'
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
    <div className='AdsBannerSlider mt-10'>
        <div className="container flex justify-center gap-6">
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