import { useEffect, useMemo, useState } from 'react'
import {
  adminDeleteGalleryImage,
  adminListGalleryPhotos,
  adminSaveGalleryPhotos,
  adminUploadGalleryImage,
} from '../../cms/api'
import type { GalleryCategory, GalleryPhoto } from '../../content/gallery'

type GalleryFilter = 'all' | GalleryCategory

export function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [category, setCategory] = useState<GalleryCategory>('hajj')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void adminListGalleryPhotos()
      .then(setPhotos)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load gallery')
      })
      .finally(() => setLoading(false))
  }, [])

  const visiblePhotos = useMemo(
    () => photos.filter((photo) => filter === 'all' || photo.category === filter),
    [photos, filter],
  )

  async function onFilesSelected(files: File[]) {
    if (!files.length) return
    setError(null)
    setMessage(null)
    setUploading(true)
    const uploaded: GalleryPhoto[] = []
    try {
      for (const file of files) {
        uploaded.push(await adminUploadGalleryImage(category, file))
      }
      const next = [...uploaded, ...photos]
      await adminSaveGalleryPhotos(next)
      setPhotos(next)
      setMessage(`${uploaded.length} image${uploaded.length === 1 ? '' : 's'} added to ${category === 'hajj' ? 'Hajj' : 'Umrah'}.`)
    } catch (err) {
      await Promise.all(
        uploaded.map((photo) =>
          photo.storagePath
            ? adminDeleteGalleryImage(photo.storagePath).catch(() => undefined)
            : Promise.resolve(),
        ),
      )
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function removePhoto(photo: GalleryPhoto) {
    if (!confirm(`Remove this ${photo.category === 'hajj' ? 'Hajj' : 'Umrah'} photo from the gallery?`)) return
    setError(null)
    setMessage(null)
    const next = photos.filter((item) => item.id !== photo.id)
    try {
      await adminSaveGalleryPhotos(next)
      setPhotos(next)
      if (photo.storagePath) {
        try {
          await adminDeleteGalleryImage(photo.storagePath)
        } catch {
          setError('The photo was removed from the gallery, but its stored file could not be deleted.')
          return
        }
      }
      setMessage('Photo removed from the gallery.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not remove photo')
    }
  }

  return (
    <section className="admin-gallery">
      <div className="admin-toolbar">
        <div>
          <h2>Gallery photos</h2>
          <p className="admin-muted">Upload and organize the photos shown on the public gallery.</p>
        </div>
        <span className="admin-badge admin-badge-muted">{photos.length} photos</span>
      </div>

      {error ? <div className="admin-alert admin-alert-error" role="alert">{error}</div> : null}
      {message ? <div className="admin-alert admin-alert-ok" role="status">{message}</div> : null}

      <div className="admin-card admin-gallery-upload">
        <div>
          <h3>Add photos</h3>
          <p className="admin-muted">Choose a category, then select one or more images. JPG, PNG, WebP, or AVIF, up to 10 MB each.</p>
        </div>
        <div className="admin-gallery-upload-controls">
          <div className="admin-field">
            <label htmlFor="gallery-upload-category">Category</label>
            <select
              id="gallery-upload-category"
              value={category}
              disabled={uploading}
              onChange={(event) => setCategory(event.target.value as GalleryCategory)}
            >
              <option value="hajj">Hajj</option>
              <option value="umrah">Umrah</option>
            </select>
          </div>
          <label className={`admin-btn admin-btn-primary admin-gallery-file-label${uploading ? ' is-disabled' : ''}`}>
            {uploading ? 'Uploading…' : 'Choose images'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              disabled={uploading}
              onChange={(event) => {
                const files = Array.from(event.currentTarget.files ?? [])
                event.currentTarget.value = ''
                void onFilesSelected(files)
              }}
            />
          </label>
        </div>
      </div>

      <div className="admin-gallery-list-head">
        <div className="admin-gallery-filters" role="tablist" aria-label="Filter gallery by pilgrimage">
          {(['all', 'hajj', 'umrah'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              className={filter === value ? 'is-active' : ''}
              onClick={() => setFilter(value)}
            >
              {value === 'all' ? 'All photos' : value === 'hajj' ? 'Hajj' : 'Umrah'}
              <span>{value === 'all' ? photos.length : photos.filter((photo) => photo.category === value).length}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? <div className="admin-card"><p className="admin-muted">Loading gallery…</p></div> : null}
      {!loading && visiblePhotos.length === 0 ? (
        <div className="admin-card admin-gallery-empty">
          <h3>No {filter === 'all' ? '' : `${filter} `}photos yet</h3>
          <p className="admin-muted">Upload images to add them to this gallery.</p>
        </div>
      ) : null}
      {!loading && visiblePhotos.length > 0 ? (
        <div className="admin-gallery-grid">
          {visiblePhotos.map((photo) => (
            <article className="admin-gallery-item" key={photo.id}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="admin-gallery-item-details">
                <span className={`admin-badge ${photo.category === 'hajj' ? 'admin-badge-warn' : 'admin-badge-ok'}`}>
                  {photo.category}
                </span>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  onClick={() => void removePhoto(photo)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}