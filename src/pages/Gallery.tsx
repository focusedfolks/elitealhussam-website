import { useEffect, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { images } from '../content/site'
import './InnerPages.css'
import './Gallery.css'

type GalleryTab = 'photos' | 'videos'

type GalleryImage = {
  src: string
}

type GalleryVideo = {
  url: string
  thumbnail: string
  caption: string
}

const photos: GalleryImage[] = [
  { src: '/images/gallery/hajj 1436  image 16.jpg' },
  { src: '/images/gallery/Hajj 1436  image 22.jpg' },
  { src: '/images/gallery/Hajj 1436 image  21.jpg' },
  { src: '/images/gallery/Hajj 1436 image 1.jpg' },
  { src: '/images/gallery/Hajj 1436 image 10.jpg' },
  { src: '/images/gallery/Hajj 1436 image 12.jpg' },
  { src: '/images/gallery/Hajj 1436 image 13.jpg' },
  { src: '/images/gallery/Hajj 1436 image 14.jpg' },
  { src: '/images/gallery/Hajj 1436 image 15.jpg' },
  { src: '/images/gallery/Hajj 1436 image 17.jpg' },
  { src: '/images/gallery/Hajj 1436 image 18.jpg' },
  { src: '/images/gallery/Hajj 1436 image 19.jpg' },
  { src: '/images/gallery/Hajj 1436 image 2.jpg' },
  { src: '/images/gallery/Hajj 1436 image 20.jpg' },
  { src: '/images/gallery/Hajj 1436 image 21.jpg' },
  { src: '/images/gallery/Hajj 1436 image 23.jpg' },
  { src: '/images/gallery/Hajj 1436 image 24.jpg' },
  { src: '/images/gallery/Hajj 1436 image 25.jpg' },
  { src: '/images/gallery/Hajj 1436 image 26.jpg' },
  { src: '/images/gallery/Hajj 1436 image 27.jpg' },
  { src: '/images/gallery/hajj 1436 image 3.jpg' },
  { src: '/images/gallery/Hajj 1436 image 4.jpg' },
  { src: '/images/gallery/Hajj 1436 image 5.jpg' },
  { src: '/images/gallery/Hajj 1436 image 6.jpg' },
  { src: '/images/gallery/hajj 1436 image 7.jpg' },
  { src: '/images/gallery/Hajj 1436 image 8.jpg' },
  { src: '/images/gallery/Hajj 1436 image 9.jpg' },
  { src: '/images/gallery/Hajj image 1436 11.jpg' },
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
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  useEffect(() => {
    if (selectedPhoto === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null)
      if (event.key === 'ArrowLeft') {
        setSelectedPhoto((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length,
        )
      }
      if (event.key === 'ArrowRight') {
        setSelectedPhoto((current) =>
          current === null ? null : (current + 1) % photos.length,
        )
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedPhoto])

  function showPreviousPhoto() {
    setSelectedPhoto((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length,
    )
  }

  function showNextPhoto() {
    setSelectedPhoto((current) =>
      current === null ? null : (current + 1) % photos.length,
    )
  }

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
            <div className="gallery-grid gallery-photo-grid" role="tabpanel">
              {photos.map((photo, index) => (
                <button
                  className="gallery-card gallery-photo-card"
                  type="button"
                  key={photo.src}
                  onClick={() => setSelectedPhoto(index)}
                  aria-label={`View gallery photo ${index + 1}`}
                >
                  <img src={photo.src} alt="" loading="lazy" />
                  <span className="gallery-photo-overlay" aria-hidden="true">
                    <span className="gallery-view-icon" />
                  </span>
                </button>
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

      {selectedPhoto !== null ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery photo viewer"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="gallery-lightbox-close"
            type="button"
            aria-label="Close photo viewer"
            onClick={() => setSelectedPhoto(null)}
          >
            X
          </button>
          <button
            className="gallery-lightbox-arrow gallery-lightbox-arrow--previous"
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation()
              showPreviousPhoto()
            }}
          >
            &#8249;
          </button>
          <img
            className="gallery-lightbox-image"
            src={photos[selectedPhoto].src}
            alt=""
            onClick={(event) => event.stopPropagation()}
          />
          <button
            className="gallery-lightbox-arrow gallery-lightbox-arrow--next"
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation()
              showNextPhoto()
            }}
          >
            &#8250;
          </button>
        </div>
      ) : null}
    </div>
  )
}