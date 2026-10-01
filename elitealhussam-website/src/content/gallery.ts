export type GalleryCategory = 'hajj' | 'umrah'

export type GalleryPhoto = {
  id: string
  category: GalleryCategory
  src: string
  alt: string
  storagePath?: string
}

const legacyHajjPhotos = [
  'hajj 1436  image 16.jpg',
  'Hajj 1436  image 22.jpg',
  'Hajj 1436 image  21.jpg',
  'Hajj 1436 image 1.jpg',
  'Hajj 1436 image 10.jpg',
  'Hajj 1436 image 12.jpg',
  'Hajj 1436 image 13.jpg',
  'Hajj 1436 image 14.jpg',
  'Hajj 1436 image 15.jpg',
  'Hajj 1436 image 17.jpg',
  'Hajj 1436 image 18.jpg',
  'Hajj 1436 image 19.jpg',
  'Hajj 1436 image 2.jpg',
  'Hajj 1436 image 20.jpg',
  'Hajj 1436 image 21.jpg',
  'Hajj 1436 image 23.jpg',
  'Hajj 1436 image 24.jpg',
  'Hajj 1436 image 25.jpg',
  'Hajj 1436 image 26.jpg',
  'Hajj 1436 image 27.jpg',
  'hajj 1436 image 3.jpg',
  'Hajj 1436 image 4.jpg',
  'Hajj 1436 image 5.jpg',
  'Hajj 1436 image 6.jpg',
  'hajj 1436 image 7.jpg',
  'Hajj 1436 image 8.jpg',
  'Hajj 1436 image 9.jpg',
  'Hajj image 1436 11.jpg',
]

export const defaultGalleryPhotos: GalleryPhoto[] = legacyHajjPhotos.map(
  (filename, index) => ({
    id: `legacy-hajj-${index + 1}`,
    category: 'hajj',
    src: `/images/gallery/${filename}`,
    alt: `Hajj pilgrimage photo ${index + 1}`,
  }),
)