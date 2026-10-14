export interface Mission {
  id: string
  firstName: string
  lastName: string
  ministry: string
  spouse: string
  address: string
  phone: string
  email: string
  country: string
  latitude: number
  longitude: number
  geocode: string
}

const COUNTRY_CENTER: Record<string, [number, number]> = {
  Philippines: [12.879721, 121.774017],
  'United States': [39.8283, -98.5795],
  'Hong Kong': [22.3193, 114.1694],
  Malaysia: [4.2105, 101.9758],
}

function countryPin(country: string): Pick<Mission, 'latitude' | 'longitude' | 'geocode'> {
  const coords = COUNTRY_CENTER[country]
  if (!coords) {
    throw new Error(`Missing country center for ${country}`)
  }
  const [lat, lng] = coords
  return {
    latitude: lat,
    longitude: lng,
    geocode: `${lat.toFixed(6)},${lng.toFixed(6)}`,
  }
}

export const MISSIONS: Mission[] = [
  {
    id: 'akut',
    firstName: 'Pastor Ruel & Jocelyn',
    lastName: 'Akut',
    ministry: 'Doane Baptist Bible Institute',
    spouse: '',
    address: 'Iloilo City, Philippines',
    phone: '',
    email: '',
    country: 'Philippines',
    ...countryPin('Philippines'),
  },
  {
    id: 'hartwick',
    firstName: 'Pastor Chris & Maylin',
    lastName: 'Hartwick',
    ministry: 'Harmony Baptist Church (ABWE International)',
    spouse: '',
    address: 'Hong Kong',
    phone: '',
    email: '',
    country: 'Hong Kong',
    ...countryPin('Hong Kong'),
  },
  {
    id: 'nasayao',
    firstName: 'Pastor Edilberto & Loida',
    lastName: 'Nasayao',
    ministry: 'New Life Fundamental Baptist Missions',
    spouse: '',
    address: 'Alangalang, Leyte, Philippines',
    phone: '',
    email: '',
    country: 'Philippines',
    ...countryPin('Philippines'),
  },
  {
    id: 'ardiente',
    firstName: 'Pastor Freddie',
    lastName: 'Ardiente',
    ministry: 'Lighthouse Fundamental Baptist Church',
    spouse: '',
    address: 'Sta. Barbara, Iloilo, Philippines',
    phone: '',
    email: '',
    country: 'Philippines',
    ...countryPin('Philippines'),
  },
  {
    id: 'pacquaio',
    firstName: 'Pastor Glenn',
    lastName: 'Pacquaio',
    ministry: 'Patiad Fundamental Baptist Church',
    spouse: '',
    address: 'Dumangas, Iloilo, Philippines',
    phone: '',
    email: '',
    country: 'Philippines',
    ...countryPin('Philippines'),
  },
  {
    id: 'tupas',
    firstName: 'Pastor Jogli',
    lastName: 'Tupas',
    ministry: 'The Journey',
    spouse: '',
    address: 'Sabah, Malaysia & Southern Philippines',
    phone: '',
    email: '',
    country: 'Malaysia',
    ...countryPin('Malaysia'),
  },
  {
    id: 'inventor',
    firstName: 'Pastor Jimmy',
    lastName: 'Inventor',
    ministry: 'Fundamental Fellowship Baptist Church Missions',
    spouse: '',
    address: 'Moalboal, Cebu, Philippines',
    phone: '',
    email: '',
    country: 'Philippines',
    ...countryPin('Philippines'),
  },
  {
    id: 'magdale',
    firstName: 'Pastor Earl',
    lastName: 'Magdale',
    ministry: 'Mindanao Frontier Missions Partnership Inc.',
    spouse: '',
    address: 'Midsayap, Cotabato, Philippines',
    phone: '',
    email: '',
    country: 'Philippines',
    ...countryPin('Philippines'),
  },
  {
    id: 'augsburger',
    firstName: 'Pastor Bernie & Marcia',
    lastName: 'Augsburger',
    ministry: 'IL-MO Association of Regular Baptist Churches',
    spouse: '',
    address: 'Washington, Illinois, USA',
    phone: '',
    email: '',
    country: 'United States',
    ...countryPin('United States'),
  },
]

export function missionName(mission: Mission): string {
  return [mission.firstName, mission.lastName].filter(Boolean).join(' ')
}
