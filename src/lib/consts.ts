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

export const vehicleBrands = Object.keys(vehicles)
export const trips = ['round-trip', 'airport', 'hotel'] as const
export const phoneRegexp = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
export const flightRegexp = new RegExp(
  /^([a-zA-Z][\d]|[\d][a-zA-Z]|[a-zA-Z]{2,3})(\d{1,})$/
)
export const vehicleTypes = ['private', 'shared'] as const
