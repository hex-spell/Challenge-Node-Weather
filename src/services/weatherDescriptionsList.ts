type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

// codigos de los iconos de openweather
const iconCodes = {
  clear: '01d',
  fewClowds: '02d',
  scatteredClows: '03d',
  brokenClowds: '04d',
  showerRain: '09d',
  rain: '10d',
  thunderstorm: '11d',
  snow: '13d',
  mist: '50d',
};

// esto debería pasarlo a una base de datos, pero por ahora lo dejo acá
const weatherDescriptionsList: WeatherDescription[] = [
  {
    id: 0,
    main: 'Lluvia',
    description: 'Lluvia, mucha lluvia, demasiada lluvia',
    icon: iconCodes.showerRain,
  },
  {
    id: 1,
    main: 'Lluvia',
    description: 'Lluvia ácida',
    icon: iconCodes.showerRain,
  },
  {
    id: 2,
    main: 'Lluvia',
    description: 'Apocalipsis',
    icon: iconCodes.thunderstorm,
  },
  {
    id: 3,
    main: 'Lluvia',
    description: 'Si te apuras, no se te larga',
    icon: iconCodes.brokenClowds,
  },
  {
    id: 4,
    main: 'Lluvia',
    description: 'Se largó',
    icon: iconCodes.rain,
  },
  {
    id: 5,
    main: 'Soleado',
    description: 'Es un día hermoso',
    icon: iconCodes.clear,
  },
  {
    id: 6,
    main: 'Soleado',
    description: 'Ponete protector solar',
    icon: iconCodes.clear,
  },
  {
    id: 7,
    main: 'Niebla',
    description: 'No manejes, que no se ve nada',
    icon: iconCodes.mist,
  },
];

export default weatherDescriptionsList;
