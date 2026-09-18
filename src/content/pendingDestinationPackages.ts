import {
  destinationCountries,
  type Destination,
} from './destinations'

export type PendingDestinationPackage = Destination & {
  stateName: string
}

const pendingDestinationSlugs = new Set([
  'munnar',
  'wayanad',
  'vagamon',
  'alleppey',
  'kumarakom',
  'varkala',
  'kovalam',
  'fort-kochi',
  'periyar-national-park',
  'eravikulam-national-park',
  'athirappilly-waterfalls',
  'ooty',
  'kodaikanal',
  'yercaud',
  'yelagiri',
])

function destinationsWithStates() {
  const india = destinationCountries.find(
    (country) => country.id === 'india' && country.kind === 'states',
  )
  if (!india || india.kind !== 'states') return []

  return india.states.flatMap((state) =>
    state.categories.flatMap((category) =>
      category.destinations.map((destination) => ({
        ...destination,
        stateName: state.name,
      })),
    ),
  )
}

export function getPendingDestinationBySlug(
  slug: string,
): PendingDestinationPackage | undefined {
  if (!pendingDestinationSlugs.has(slug)) return undefined
  return destinationsWithStates().find((destination) => destination.slug === slug)
}

export function isPendingDestinationSlug(slug: string): boolean {
  return pendingDestinationSlugs.has(slug)
}