import { OptionsGroupType } from './types/OptionsGroupType';

export const PREFECTURES = [
  'Tokyo', // Capital, most populous, economic hub
  'Osaka', // Major city, food culture, business center
  'Kyoto', // Historic capital, temples, traditional culture
  'Hokkaido', // Famous for nature, skiing, Sapporo
  'Fukuoka', // Largest city in Kyushu, great food
  'Hiroshima', // Historical significance, Miyajima
  'Nara', // Ancient temples, deer park
  'Okinawa', // Tropical beaches, unique Ryukyu culture
  'Kanagawa', // Yokohama, Kamakura, close to Tokyo
  'Chiba', // Narita Airport, Disneyland
  'Aichi', // Nagoya, Toyota, industrial power
  'Hyogo', // Kobe, Himeji Castle
  'Shizuoka', // Mt. Fuji views, green tea
  'Miyagi', // Sendai, Matsushima Bay
  'Nagano', // Ski resorts, Japanese Alps
  'Oita', // Beppu hot springs
  'Saitama', // Suburban Tokyo, large population
  'Ibaraki', // Tsukuba science city
  'Tochigi', // Nikko’s shrines & nature
  'Gifu', // Takayama, Shirakawa-go
  'Shiga', // Lake Biwa, historic sites
  'Okayama', // Korakuen Garden, Kurashiki
  'Yamaguchi', // Shimonoseki, historical sites
  'Kumamoto', // Kumamoto Castle, Aso volcano
  'Kagoshima', // Sakurajima volcano, hot springs
  'Ehime', // Matsuyama, Dogo Onsen
  'Nagasaki', // Historical port city
  'Niigata', // Rice, skiing, sake
  'Mie', // Ise Shrine, pearls
  'Wakayama', // Koyasan, Kumano pilgrimage
  'Gunma', // Hot springs, mountains
  'Ishikawa', // Kanazawa, Kenrokuen Garden
  'Fukui', // Dinosaurs, Eiheiji Temple
  'Yamanashi', // Mt. Fuji, wine country
  'Aomori', // Nebuta Festival, apples
  'Iwate', // Morioka, scenic coast
  'Yamagata', // Zao Onsen, cherries
  'Akita', // Rice, Akita dogs
  'Fukushima', // Nature, onsen, recovery from disaster
  'Tottori', // Sand dunes, least populous
  'Shimane', // Izumo Taisha, rural
  'Tokushima', // Awa Odori dance, Naruto whirlpools
  'Kagawa', // Udon noodles, Seto Inland Sea
  'Kochi', // Nature, Shimanto River
  'Saga', // Pottery, small but charming
  'Toyama', // Tateyama Kurobe Alpine Route
  'Miyazaki', // Subtropical beaches, Nichinan Coast
];

export const AIRPORTS: OptionsGroupType = [
  {
    'Kanto Region': [
      'Haneda Airport (HND)',
      'Narita International Airport (NRT)',
    ],
  },
  {
    'Kansai Region': ['Kansai International Airport (KIX)'],
  },
  {
    'Hokkaido Region': ['New Chitose Airport (CTS)'],
  },
  {
    'Chubu Region': ['Chubu Centrair International Airport (NGO)'],
  },
  {
    'Chugoku Region': ['Hiroshima Airport (HIJ)'],
  },
  {
    'Kyushu Region': ['Fukuoka Airport (FUK)'],
  },
  {
    'Okinawa Region': ['Okinawa Naha Airport (OKA)'],
  },
];

export const TRAVEL_FORM_DEFAULT_VALUES = {
  destinations: [],
  lengthOfTrip: '',
  arrivalAirport: '',
  departureAirport: '',
  timeOfArrival: null,
  timeOfDeparture: null,
};

export const LOGIN_FORM_DEFAULT_VALUES = {
  email: '',
  password: '',
};

export const TIME_DISPLAY_FORMAT = 'hh:mm a';
