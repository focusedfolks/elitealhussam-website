import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { images } from '../content/site'
import './InnerPages.css'
import './Gallery.css'

type GalleryTab = 'photos' | 'videos'

type GalleryImage = {
  src: string
  caption: string
}

type GalleryVideo = {
  url: string
  thumbnail: string
  caption: string
}

const photos: GalleryImage[] = [
  { src: '/images/gallery/hajj 1436  image 16.jpg', caption: 'Hajj 1436 image 16' },
  { src: '/images/gallery/Hajj 1436  image 22.jpg', caption: 'Hajj 1436 image 22' },
  { src: '/images/gallery/Hajj 1436 image  21.jpg', caption: 'Hajj 1436 image 21' },
  { src: '/images/gallery/Hajj 1436 image 1.jpg', caption: 'Hajj 1436 image 1' },
  { src: '/images/gallery/Hajj 1436 image 10.jpg', caption: 'Hajj 1436 image 10' },
  { src: '/images/gallery/Hajj 1436 image 12.jpg', caption: 'Hajj 1436 image 12' },
  { src: '/images/gallery/Hajj 1436 image 13.jpg', caption: 'Hajj 1436 image 13' },
  { src: '/images/gallery/Hajj 1436 image 14.jpg', caption: 'Hajj 1436 image 14' },
  { src: '/images/gallery/Hajj 1436 image 15.jpg', caption: 'Hajj 1436 image 15' },
  { src: '/images/gallery/Hajj 1436 image 17.jpg', caption: 'Hajj 1436 image 17' },
  { src: '/images/gallery/Hajj 1436 image 18.jpg', caption: 'Hajj 1436 image 18' },
  { src: '/images/gallery/Hajj 1436 image 19.jpg', caption: 'Hajj 1436 image 19' },
  { src: '/images/gallery/Hajj 1436 image 2.jpg', caption: 'Hajj 1436 image 2' },
  { src: '/images/gallery/Hajj 1436 image 20.jpg', caption: 'Hajj 1436 image 20' },
  { src: '/images/gallery/Hajj 1436 image 21.jpg', caption: 'Hajj 1436 image 21' },
  { src: '/images/gallery/Hajj 1436 image 23.jpg', caption: 'Hajj 1436 image 23' },
  { src: '/images/gallery/Hajj 1436 image 24.jpg', caption: 'Hajj 1436 image 24' },
  { src: '/images/gallery/Hajj 1436 image 25.jpg', caption: 'Hajj 1436 image 25' },
  { src: '/images/gallery/Hajj 1436 image 26.jpg', caption: 'Hajj 1436 image 26' },
  { src: '/images/gallery/Hajj 1436 image 27.jpg', caption: 'Hajj 1436 image 27' },
  { src: '/images/gallery/hajj 1436 image 3.jpg', caption: 'Hajj 1436 image 3' },
  { src: '/images/gallery/Hajj 1436 image 4.jpg', caption: 'Hajj 1436 image 4' },
  { src: '/images/gallery/Hajj 1436 image 5.jpg', caption: 'Hajj 1436 image 5' },
  { src: '/images/gallery/Hajj 1436 image 6.jpg', caption: 'Hajj 1436 image 6' },
  { src: '/images/gallery/hajj 1436 image 7.jpg', caption: 'Hajj 1436 image 7' },
  { src: '/images/gallery/Hajj 1436 image 8.jpg', caption: 'Hajj 1436 image 8' },
  { src: '/images/gallery/Hajj 1436 image 9.jpg', caption: 'Hajj 1436 image 9' },
  { src: '/images/gallery/Hajj image 1436 11.jpg', caption: 'Hajj 1436 image 11' },
]

const videos: GalleryVideo[] = [
  {
    url: 'https://www.youtube.com/watch?v=VIDEO_ID_1',
    thumbnail: images.hero,
    caption: 'Placeholder: A journey of faith',
  },
  {
    url: 'https://www.youtube.com/watch?v=VIDEO_ID_2',
    thumbnail: images.madinah,
    caption: 'Placeholder: Visiting the holy cities',
  },
  {
    url: 'https://www.youtube.com/watch?v=VIDEO_ID_3',
    thumbnail: images.familyMakkah,
    caption: 'Placeholder: Pilgrim stories',
  },
  {
    url: 'https://www.youtube.com/watch?v=VIDEO_ID_4',
    thumbnail: images.kiswah,
    caption: 'Placeholder: The Sacred Mosque',
  },
]

function PlayIcon() {
  return (
    <span className="gallery-play-icon" aria-hidden="true">
      ▶
    </span>
  )
}

export function Gallery() {
  const [tab, setTab] = useState<GalleryTab>('photos')

  return (
    <div className="gallery-page">
      <Seo
        title="Gallery | ELITE ALHUSSAM"
        description="Photos and videos from the pilgrimage journeys and destinations served by ELITE ALHUSSAM."
        url="/gallery"
        image={images.galleryPackages}
      />
      <PageHero
        title="Gallery"
        subtitle="A visual collection of places, people, and moments from the journey."
        image={images.galleryPackages}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
      />

      <section className="inner-section">
        <div className="container gallery-content">
          <div className="gallery-heading">
            <div>
              <p className="eyebrow">The Journey</p>
              <h2 className="section-title">Moments worth remembering</h2>
            </div>
            <div className="gallery-tabs" role="tablist" aria-label="Gallery media">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'photos'}
                className={tab === 'photos' ? 'is-active' : ''}
                onClick={() => setTab('photos')}
              >
                Photos
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'videos'}
                className={tab === 'videos' ? 'is-active' : ''}
                onClick={() => setTab('videos')}
              >
                Videos
              </button>
            </div>
          </div>

          {tab === 'photos' ? (
            <div className="gallery-grid" role="tabpanel">
              {photos.map((photo) => (
                <figure className="gallery-card" key={photo.src}>
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="gallery-grid" role="tabpanel">
              {videos.map((video) => (
                <a
                  className="gallery-card gallery-video-card"
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  key={video.url}
                >
                  <span className="gallery-media">
                    <img src={video.thumbnail} alt="" loading="lazy" />
                    <span className="gallery-play" aria-hidden="true">
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="gallery-caption">{video.caption}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}