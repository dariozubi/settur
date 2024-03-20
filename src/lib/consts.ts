export const rates = {
  shared: {
    oneWay: {
      zone1: 19,
      zone2: 22,
      zone3: 24,
      zone4: 22,
    },
    roundTrip: {
      zone1: 38,
      zone2: 44,
      zone3: 48,
      zone4: 44,
    },
  },
  private: {
    oneWay: {
      zone1: 65,
      zone2: 80,
      zone3: 95,
      zone4: 80,
      zone5: 190,
      zone6: 120,
      zone7: 150,
      zone8: 220,
      zone9: 145,
    },
    roundTrip: {
      zone1: 135,
      zone2: 155,
      zone3: 185,
      zone4: 155,
      zone5: 380,
      zone6: 235,
      zone7: 300,
      zone8: 440,
      zone9: 290,
    },
  },
}

export const privateRates = {
  'one-way': {
    zone1: {
      suburban: 75,
      hiace: 65,
      escalade: 95,
      sprinter: 140,
    },
    zone2: {
      suburban: 85,
      hiace: 80,
      escalade: 135,
      sprinter: 145,
    },
    zone3: {
      suburban: 95,
      hiace: 100,
      escalade: 145,
      sprinter: 150,
    },
    zone4: {
      suburban: 85,
      hiace: 80,
      escalade: 135,
      sprinter: 145,
    },
    zone5: {
      suburban: 200,
      hiace: 190,
      escalade: 220,
      sprinter: 290,
    },
    zone6: {
      suburban: 120,
      hiace: 125,
      escalade: 150,
      sprinter: 195,
    },
    zone7: {
      suburban: 185,
      hiace: 150,
      escalade: 255,
      sprinter: 310,
    },
    zone8: {
      suburban: 225,
      hiace: 220,
      escalade: 300,
      sprinter: 420,
    },
    zone9: {
      suburban: 180,
      hiace: 145,
      escalade: 250,
      sprinter: 300,
    },
  },
  'round-trip': {
    zone1: {
      suburban: 145,
      hiace: 135,
      escalade: 185,
      sprinter: 275,
    },
    zone2: {
      suburban: 165,
      hiace: 155,
      escalade: 265,
      sprinter: 285,
    },
    zone3: {
      suburban: 185,
      hiace: 295,
      escalade: 185,
      sprinter: 395,
    },
    zone4: {
      suburban: 165,
      hiace: 155,
      escalade: 265,
      sprinter: 285,
    },
    zone5: {
      suburban: 400,
      hiace: 380,
      escalade: 435,
      sprinter: 575,
    },
    zone6: {
      suburban: 235,
      hiace: 245,
      escalade: 395,
      sprinter: 385,
    },
    zone7: {
      suburban: 370,
      hiace: 300,
      escalade: 510,
      sprinter: 620,
    },
    zone8: {
      suburban: 450,
      hiace: 440,
      escalade: 600,
      sprinter: 840,
    },
    zone9: {
      suburban: 360,
      hiace: 290,
      escalade: 500,
      sprinter: 600,
    },
  },
}

export const hotels = [
  { label: 'Barcelo Gran Faro Los Cabos', zone: 1 },
  { label: 'Cabo Azul Resort', zone: 1 },
  { label: 'Casa Costa Azul', zone: 1 },
  { label: 'Casa Natalia', zone: 1 },
  { label: 'Club La Costa', zone: 1 },
  { label: 'Drift Hotel San Jose', zone: 1 },
  { label: 'El Encanto Inn Hotel Spa and Suites', zone: 1 },
  { label: 'El Zalate Condos', zone: 1 },
  {
    label: 'Four Seasons Resort and Residences Cabo San Lucas at Cabo Del Sol',
    zone: 1,
  },
  { label: 'Grand Mayan', zone: 1 },
  { label: 'Holiday Inn', zone: 1 },
  { label: 'Hyatt Place', zone: 1 },
  { label: 'Hyatt Ziva Los Cabos', zone: 1 },
  { label: 'Krystal Grand Los Cabos', zone: 1 },
  { label: 'La Jolla', zone: 1 },
  { label: 'Las Olas', zone: 1 },
  { label: 'Mananitas', zone: 1 },
  { label: 'Marisol', zone: 1 },
  { label: 'Mikonos', zone: 1 },
  { label: 'Mira Vista', zone: 1 },
  { label: 'Posada Real', zone: 1 },
  { label: 'Royal Decameron', zone: 1 },
  { label: 'Royal Park', zone: 1 },
  { label: 'Royal Solaris', zone: 1 },
  { label: 'Sampaguita', zone: 1 },
  { label: 'San Jose del Cabo Downtown/Centro', zone: 1 },
  { label: 'Santa Maria Hotel and Suites', zone: 1 },
  { label: 'Six two four urban beach hotel', zone: 1 },
  { label: 'Suites Las Palmas', zone: 1 },
  { label: 'The Club at Presidente Los Cabos', zone: 1 },
  { label: 'Tropicana Inn', zone: 1 },
  { label: 'Viceroy Los Cabos', zone: 1 },
  { label: 'Vidanta', zone: 1 },
  { label: 'Worldmark Coral Baja', zone: 1 },
  { label: 'Acre Treehouse Hotel', zone: 2 },
  { label: 'Baja Point', zone: 2 },
  { label: 'Cabo Del Sol Residential Area', zone: 2 },
  { label: 'Cabo Surf', zone: 2 },
  { label: 'Casa del Mar Golf Resort and Spa', zone: 2 },
  { label: 'Casa Florencia', zone: 2 },
  { label: 'Chileno Bay', zone: 2 },
  { label: 'Club Regina', zone: 2 },
  { label: 'Dreams Los Cabos Suites Golf Resort and Spa', zone: 2 },
  { label: 'El Dorado Residential Area', zone: 2 },
  { label: 'Garza Blanca Resort and Spa Los Cabos', zone: 2 },
  { label: 'Grand Fiesta Americana Los Cabos', zone: 2 },
  { label: 'Grand Regina', zone: 2 },
  { label: 'Grand Velas Los Cabos', zone: 2 },
  { label: 'Hacienda Del Mar', zone: 2 },
  { label: 'Hampton Inn and Suites Los Cabos', zone: 2 },
  { label: 'Hilton Los Cabos', zone: 2 },
  { label: 'Las Ventanas', zone: 2 },
  { label: 'Le Blanc Spa Resort Los Cabos', zone: 2 },
  { label: 'Live Aqua Residences', zone: 2 },
  { label: 'Mar del Cabo', zone: 2 },
  { label: 'Maravilla Los Cabos', zone: 2 },
  { label: 'Marbella Suites en la Playa', zone: 2 },
  { label: 'Marella Cabo', zone: 2 },
  { label: 'Marquis Los Cabos', zone: 2 },
  { label: 'Montage', zone: 2 },
  { label: 'One and Only Palmilla', zone: 2 },
  { label: 'Palmilla Villa del Mar', zone: 2 },
  { label: 'Paradisus', zone: 2 },
  { label: 'Puerta Del Sol', zone: 2 },
  { label: 'Querencia Residential Area', zone: 2 },
  { label: 'Sheraton Grand Los Cabos', zone: 2 },
  { label: 'Solaz Los Cabos', zone: 2 },
  { label: 'The Westin Resort and Spa', zone: 2 },
  { label: 'Zadun, a Ritz Carlton Reserve', zone: 2 },
  { label: 'Bahia Hotel and Beach Club', zone: 3 },
  { label: 'Breathless Cabo San Lucas Resort and Spa', zone: 3 },
  { label: 'Bungalows', zone: 3 },
  { label: 'Cabo Inn', zone: 3 },
  { label: 'Cabo San Lucas Downtown/Centro', zone: 3 },
  { label: 'Cabo Vista Hotel', zone: 3 },
  { label: 'Cachet Beach Hotel Los Cabos', zone: 3 },
  { label: 'Casa Dorada At Medano Beach', zone: 3 },
  { label: 'Casa Pablito', zone: 3 },
  { label: 'City Express Plus Los Cabos', zone: 3 },
  { label: 'City Express Suites Los Cabos', zone: 3 },
  { label: 'Club Cascadas de Baja', zone: 3 },
  { label: 'Comfort Inn Los Cabos', zone: 3 },
  { label: 'Corazon Cabo', zone: 3 },
  { label: 'El Ameyal', zone: 3 },
  { label: 'Esperanza an Aubert Resort', zone: 3 },
  { label: 'Estancia Real', zone: 3 },
  { label: 'Fairfield inn by Marriot', zone: 3 },
  { label: 'Finca El Tezal', zone: 3 },
  { label: 'Grand Solmar Lands', zone: 3 },
  { label: 'Hacienda Beach', zone: 3 },
  { label: 'Hacienda Encantada', zone: 3 },
  { label: 'Holiday Inn Express', zone: 3 },
  { label: 'Hotel Castillo Blarney', zone: 3 },
  { label: 'Hotel Hacienda', zone: 3 },
  { label: 'La Marina Inn', zone: 3 },
  { label: 'Los Cabos Golf Resort', zone: 3 },
  { label: 'Los Milagros', zone: 3 },
  { label: 'Los Patios', zone: 3 },
  { label: 'Mar De Cortez', zone: 3 },
  { label: 'Marbella El Tezal', zone: 3 },
  { label: 'Marina Cabo Plaza', zone: 3 },
  { label: 'Marina Fiesta Resort &amp; Spa', zone: 3 },
  { label: 'Marina Sol', zone: 3 },
  { label: 'Marina View Villas', zone: 3 },
  { label: 'Mayan Monkey Hostel Los Cabos', zone: 3 },
  { label: 'Me Cabo', zone: 3 },
  { label: 'Medano Hotel and Suites', zone: 3 },
  { label: 'Misiones Del Cabo', zone: 3 },
  { label: 'Montecristo Residential Area', zone: 3 },
  { label: 'Pedregal Residential Area', zone: 3 },
  { label: 'Playa Grande', zone: 3 },
  { label: 'Portofino Condos', zone: 3 },
  { label: 'Pueblo Bonito Los Cabos', zone: 3 },
  { label: 'Pueblo Bonito Pacifica', zone: 3 },
  { label: 'Pueblo Bonito Rose', zone: 3 },
  { label: 'Pueblo Bonito Sunset Beach', zone: 3 },
  { label: 'Punta Ballena Area', zone: 3 },
  { label: 'Quinta Del Sol', zone: 3 },
  { label: 'Riu Baja California', zone: 3 },
  { label: 'Riu Palace', zone: 3 },
  { label: 'Riu Santa Fe', zone: 3 },
  { label: 'San Angel Suites', zone: 3 },
  { label: 'Sandos Finisterra Los Cabos', zone: 3 },
  { label: 'Santa Fe (DOWNTOWN)', zone: 3 },
  { label: 'Seven Crown', zone: 3 },
  { label: 'Siesta Suites', zone: 3 },
  { label: 'Sirena del Mar', zone: 3 },
  { label: 'Solmar Resort', zone: 3 },
  { label: 'Sunrock', zone: 3 },
  { label: 'Terrasol', zone: 3 },
  { label: 'Tesoro Los Cabos', zone: 3 },
  { label: 'The Cape Hotel', zone: 3 },
  { label: 'The Residences at Hacienda Encantada', zone: 3 },
  { label: 'The Resort at Pedregral', zone: 3 },
  { label: 'The Ridge at Playa Grande Luxury Villas', zone: 3 },
  { label: 'Villa Del Arco', zone: 3 },
  { label: 'Villa Del Palmar', zone: 3 },
  { label: 'Villa La Estancia', zone: 3 },
  { label: 'Villa Serena', zone: 3 },
  { label: 'Vista Azul', zone: 3 },
  { label: 'Vista Encantada', zone: 3 },
  { label: 'Waldorf Astoria Los Cabos Pedregal', zone: 3 },
  { label: 'ACRE Hotel ', zone: 4 },
  { label: 'El Ganzo', zone: 4 },
  { label: 'JW Marriot', zone: 4 },
  { label: 'Puerto Los Cabos Residential Area', zone: 4 },
  { label: 'Secrets Puerto Los Cabos ', zone: 4 },
  { label: 'Costa Palmas', zone: 5 },
  { label: 'Four Seasons Resort Los Cabos at Costa Palmas', zone: 5 },
  { label: 'Los Barriles', zone: 5 },
  { label: 'Palmas del Cortez', zone: 5 },
  { label: 'Rancho Buena Vista', zone: 5 },
  { label: 'Rancho Leonero', zone: 5 },
  { label: 'Diamante Cabo San Lucas ', zone: 6 },
  { label: 'Grand Solmar Pacific Dunes', zone: 6 },
  { label: 'Hard Rock Los Cabos', zone: 6 },
  { label: 'Nobu Los Cabos', zone: 6 },
  { label: 'Residencial Diamante', zone: 6 },
  { label: 'Guaycura Boutique Hotel Beach Club and Spa', zone: 7 },
  { label: 'Pescadero ', zone: 7 },
  { label: 'Punta Pescadero', zone: 7 },
  { label: 'Todos Santos', zone: 7 },
  { label: 'Araiza Palmira Hotel', zone: 8 },
  { label: 'City Express La Paz', zone: 8 },
  { label: 'Club Cantamar', zone: 8 },
  { label: 'Club El Moro', zone: 8 },
  { label: 'Costa Baja', zone: 8 },
  { label: 'Grand Plaza La Paz', zone: 8 },
  { label: 'Hotel California', zone: 8 },
  { label: 'Hotel Marina', zone: 8 },
  { label: 'Hotel One La Paz', zone: 8 },
  { label: 'Hotel Perla', zone: 8 },
  { label: 'Hyatt Place La Paz', zone: 8 },
  { label: 'La Concha Beach Resort', zone: 8 },
  { label: 'La Paz', zone: 8 },
  { label: 'Posada de las Flores La Paz', zone: 8 },
  { label: 'Seven Crown La Paz-Centro', zone: 8 },
  { label: 'Seven Crown La Paz-Malecon', zone: 8 },
]

export const vehicles = {
  escalade: {
    seats: 5,
    imgAspect: 'aspect-[1775/1057]',
  },
  suburban: {
    seats: 6,
    imgAspect: 'aspect-[587/264]',
  },
  hiace: {
    seats: 10,
    imgAspect: 'aspect-[404/220]',
  },
  sprinter: {
    seats: 17,
    imgAspect: 'aspect-[700/480]',
  },
}

export const zones = [
  {
    label: 'San José del Cabo',
    zone: 1,
  },
  {
    label: 'Corredor',
    zone: 2,
  },
  {
    label: 'Cabo San Lucas',
    zone: 3,
  },
  {
    label: 'Puerto Los Cabos',
    zone: 4,
  },
  {
    label: 'East Cape',
    zone: 5,
  },
  {
    label: 'Diamante',
    zone: 6,
  },
  {
    label: 'Todos Santos',
    zone: 7,
  },
  {
    label: 'La Paz',
    zone: 8,
  },
]

export const vehicleBrands = Object.keys(vehicles)
export const trips = ['round-trip', 'airport', 'hotel'] as const
export const phoneRegexp = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
export const flightRegexp = new RegExp(
  /^([A-Z][\d]|[\d][A-Z]|[A-Z]{3})(\d{1,})$/
)
export const vehicleTypes = ['private', 'shared'] as const
