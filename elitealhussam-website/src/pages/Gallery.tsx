import { useEffect, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { fetchCmsGalleryPhotos } from '../cms/api'
import { defaultGalleryPhotos, type GalleryCategory, type GalleryPhoto } from '../content/gallery'
import { images } from '../content/site'
import './InnerPages.css'
import './Gallery.css'

type GalleryTab = 'photos' | 'videos'

type GalleryVideo = {
  url: string
  thumbnail: string
  caption: string
}

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
  const [category, setCategory] = useState<'all' | GalleryCategory>('all')
  const [photos, setPhotos] = useState<GalleryPhoto[]>(defaultGalleryPhotos)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const visiblePhotos = photos.filter(
    (photo) => category === 'all' || photo.category === category,
  )

  useEffect(() => {
    let active = true
    void fetchCmsGalleryPhotos()
      .then((items) => {
        if (active) setPhotos(items)
      })
      .catch(() => {
        if (active) setPhotos(defaultGalleryPhotos)
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (selectedPhoto === null || visiblePhotos.length === 0) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null)
      if (event.key === 'ArrowLeft') {
        setSelectedPhoto((current) =>
          current === null ? null : (current - 1 + visiblePhotos.length) % visiblePhotos.length,
        )
      }
      if (event.key === 'ArrowRight') {
        setSelectedPhoto((current) =>
          current === null ? null : (current + 1) % visiblePhotos.length,
        )
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedPhoto, visiblePhotos.length])

  function showPreviousPhoto() {
    setSelectedPhoto((current) =>
      current === null ? null : (current - 1 + visiblePhotos.length) % visiblePhotos.length,
    )
  }

  function showNextPhoto() {
    setSelectedPhoto((current) =>
      current === null ? null : (current + 1) % visiblePhotos.length,
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
            <>
              <div className="gallery-category-tabs" role="tablist" aria-label="Filter photos">
                {(['all', 'hajj', 'umrah'] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={category === value}
                    className={category === value ? 'is-active' : ''}
                    onClick={() => {
                      setCategory(value)
                      setSelectedPhoto(null)
                    }}
                  >
                    {value === 'all' ? 'All photos' : value === 'hajj' ? 'Hajj' : 'Umrah'}
                  </button>
                ))}
              </div>
              {visiblePhotos.length ? (
                <div className="gallery-grid gallery-photo-grid" role="tabpanel">
                  {visiblePhotos.map((photo, index) => (
                    <button
                      className="gallery-card gallery-photo-card"
                      type="button"
                      key={photo.id}
                      onClick={() => setSelectedPhoto(index)}
                      aria-label={`View ${photo.category} gallery photo ${index + 1}`}
                    >
                      <img src={photo.src} alt={photo.alt} loading="lazy" />
                      <span className="gallery-photo-overlay" aria-hidden="true">
                        <span className="gallery-view-icon" />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="gallery-empty">No {category} photos have been added yet.</p>
              )}
            </>
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
            src={visiblePhotos[selectedPhoto].src}
            alt={visiblePhotos[selectedPhoto].alt}
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