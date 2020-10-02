type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

// codigos de los iconos de openweather
const weatherDescriptionTypes = {
  clear: { name: 'Despejado', icon: '01d' },
  fewClowds: { name: 'Algunas nubes', icon: '02d' },
  scatteredClows: { name: 'Nublado', icon: '03d' },
  brokenClowds: { name: 'Tronando', icon: '04d' },
  showerRain: { name: 'Lluvia', icon: '09d' },
  rain: { name: 'Llovizna', icon: '10d' },
  thunderstorm: { name: 'Tormenta', icon: '11d' },
  snow: { name: 'Nieve', icon: '13d' },
  mist: { name: 'Niebla', icon: '50d' },
};

// esto debería pasarlo a una base de datos, pero por ahora lo dejo acá, ya que es un plus
const weatherDescriptionsList: WeatherDescription[] = [
  {
    id: 0,
    main: weatherDescriptionTypes.showerRain.name,
    description: 'Lluvia, mucha lluvia, demasiada lluvia',
    icon: weatherDescriptionTypes.showerRain.icon,
  },
  {
    id: 1,
    main: weatherDescriptionTypes.showerRain.name,
    description: 'Lluvia ácida',
    icon: weatherDescriptionTypes.showerRain.icon,
  },
  {
    id: 2,
    main: weatherDescriptionTypes.showerRain.name,
    description: 'Apocalipsis',
    icon: weatherDescriptionTypes.thunderstorm.icon,
  },
  {
    id: 3,
    main: weatherDescriptionTypes.showerRain.name,
    description: 'Si te apuras, no se te larga',
    icon: weatherDescriptionTypes.brokenClowds.icon,
  },
  {
    id: 4,
    main: weatherDescriptionTypes.showerRain.name,
    description: 'Se largó',
    icon: weatherDescriptionTypes.rain.icon,
  },
  {
    id: 5,
    main: weatherDescriptionTypes.clear.name,
    description: 'Es un día hermoso',
    icon: weatherDescriptionTypes.clear.icon,
  },
  {
    id: 6,
    main: weatherDescriptionTypes.clear.name,
    description: 'Ponete protector solar',
    icon: weatherDescriptionTypes.clear.icon,
  },
  {
    id: 7,
    main: weatherDescriptionTypes.mist.name,
    description: 'No manejes, que no se ve nada',
    icon: weatherDescriptionTypes.mist.icon,
  },
];

export default weatherDescriptionsList;
