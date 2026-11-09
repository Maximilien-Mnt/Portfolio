// ═════════════════════════════════════════════════════════════════════════════
// races.ts — placeholder (placeholder: true). Rewrite with verified facts.
// date: YYYY-MM-DD | time: "H:MM:SS" | kind: 50m/100m/200m/400m/800m/1500m/5k/10k/half/ultra
// ═════════════════════════════════════════════════════════════════════════════

import { Race } from "./schema";

/**
 * Race properties used below:
 * - id: original course label from the CSV
 * - date: ISO date string (YYYY-MM-DD)
 * - distanceKm: distance in kilometres
 * - durationSeconds: elapsed duration as an integer number of seconds
 * - averageSpeedKmh: average speed in km/h (source value when supplied, otherwise calculated)
 * - notes: original note, or null when the CSV cell was empty
 */
export const races = Race.parse(
[
  {
    "id": "Course O-235",
    "date": "2026-11-08",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "Frais, mais on s’habitue à la température"
  },
  {
    "id": "Course O-234",
    "date": "2026-11-07",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "Le soir, y’avait presque personne"
  },
  {
    "id": "Course O-233",
    "date": "2026-11-05",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "Tard le soir, un gars l’a dit a ses potes"
  },
  {
    "id": "Course O-232",
    "date": "2026-11-01",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "Première de novembre, pas trop difficile"
  },
  {
    "id": "Course O-231",
    "date": "2026-10-31",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "C’est le bon choix de le faire le matin"
  },
  {
    "id": "Course O-230",
    "date": "2026-10-25",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "Soleil d’après-midi par pluie en automne"
  },
  {
    "id": "Course O-229",
    "date": "2026-10-22",
    "distanceKm": 4.05,
    "durationSeconds": 1140,
    "averageSpeedKmh": 12.79,
    "notes": "Pluvieux, rapide, enjoué, de nuit"
  },
  {
    "id": "Course O-228",
    "date": "2026-10-17",
    "distanceKm": 4.05,
    "durationSeconds": 1196,
    "averageSpeedKmh": 12.19,
    "notes": "Légèrement frais, vitesse moyenne"
  },
  {
    "id": "Course O-227",
    "date": "2026-10-11",
    "distanceKm": 4.05,
    "durationSeconds": 1200,
    "averageSpeedKmh": 12.15,
    "notes": "Souvenirs de sensations d’air et ballades"
  },
  {
    "id": "Course O-226",
    "date": "2026-10-10",
    "distanceKm": 4.05,
    "durationSeconds": 963,
    "averageSpeedKmh": 15.14,
    "notes": "Pensé à Anne, pour me motiver"
  },
  {
    "id": "Course O-225",
    "date": "2026-10-04",
    "distanceKm": 4.05,
    "durationSeconds": 1125,
    "averageSpeedKmh": 12.96,
    "notes": "Gris, soleil perçant les nuages au loin"
  },
  {
    "id": "Course O-224",
    "date": "2026-10-03",
    "distanceKm": 4.05,
    "durationSeconds": 1200,
    "averageSpeedKmh": 12.15,
    "notes": "Agréable chaleur, un peu de monde"
  },
  {
    "id": "Course S-223",
    "date": "2026-09-26",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "Coucher de soleil, allure tranquille"
  },
  {
    "id": "Course S-222",
    "date": "2026-09-20",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "Frais, quelques fines gouttes de pluie"
  },
  {
    "id": "Course S-221",
    "date": "2026-09-19",
    "distanceKm": 4.05,
    "durationSeconds": 1215,
    "averageSpeedKmh": 12.0,
    "notes": "Soleil léger, juste après le repas de midi"
  },
  {
    "id": "Course S-220",
    "date": "2026-09-13",
    "distanceKm": 4.05,
    "durationSeconds": 1145,
    "averageSpeedKmh": 12.73,
    "notes": "Gris, peu de monde, ambiance tranquille"
  },
  {
    "id": "Course S-219",
    "date": "2026-09-12",
    "distanceKm": 4.05,
    "durationSeconds": 1210,
    "averageSpeedKmh": 12.05,
    "notes": "Au soleil le matin, difficile et désagréable"
  },
  {
    "id": "Course S-218",
    "date": "2026-09-05",
    "distanceKm": 4.05,
    "durationSeconds": 1230,
    "averageSpeedKmh": 11.85,
    "notes": "Grand soleil, temps chaud, moyen"
  },
  {
    "id": "Course S-217",
    "date": "2026-09-03",
    "distanceKm": 4.05,
    "durationSeconds": 1210,
    "averageSpeedKmh": 12.05,
    "notes": "Soir, mal de ventre léger, après rentrée"
  },
  {
    "id": "Course A-216",
    "date": "2026-08-30",
    "distanceKm": 4.05,
    "durationSeconds": 1173,
    "averageSpeedKmh": 12.43,
    "notes": "Dernière course avant la rentrée"
  },
  {
    "id": "Course A-215",
    "date": "2026-08-29",
    "distanceKm": 4.05,
    "durationSeconds": 1210,
    "averageSpeedKmh": 12.05,
    "notes": "Pensé au sens de tout, Dieu en a"
  },
  {
    "id": "Course A-214",
    "date": "2026-08-27",
    "distanceKm": 4.05,
    "durationSeconds": 1174,
    "averageSpeedKmh": 12.42,
    "notes": "Pleins de jeunes pour retour de vacances"
  },
  {
    "id": "Course A-213",
    "date": "2026-08-23",
    "distanceKm": 4.05,
    "durationSeconds": 1025,
    "averageSpeedKmh": 14.22,
    "notes": "Très rapide, pensé à Emy pour voler"
  },
  {
    "id": "Course A-212",
    "date": "2026-08-22",
    "distanceKm": 4.05,
    "durationSeconds": 1170,
    "averageSpeedKmh": 12.46,
    "notes": "Peu de gens, samedi, gris"
  },
  {
    "id": "Course A-211",
    "date": "2026-08-20",
    "distanceKm": 4.05,
    "durationSeconds": 1240,
    "averageSpeedKmh": 11.76,
    "notes": "Ciel rouge-orange-violet-rose"
  },
  {
    "id": "Course A-210",
    "date": "2026-08-16",
    "distanceKm": 4.05,
    "durationSeconds": 1205,
    "averageSpeedKmh": 12.1,
    "notes": "Fumée d’incendies en Belgique"
  },
  {
    "id": "Course A-209",
    "date": "2026-08-13",
    "distanceKm": 4.05,
    "durationSeconds": 1190,
    "averageSpeedKmh": 12.25,
    "notes": "Quelques jeunes, bonne température"
  },
  {
    "id": "Course A-208",
    "date": "2026-08-09",
    "distanceKm": 4.05,
    "durationSeconds": 1224,
    "averageSpeedKmh": 11.91,
    "notes": "Couvert, matin, pensé à l’ultra de 80km"
  },
  {
    "id": "Course A-207",
    "date": "2026-08-08",
    "distanceKm": 4.05,
    "durationSeconds": 1064,
    "averageSpeedKmh": 13.7,
    "notes": "Chaud, très peu de monde pour samedi"
  },
  {
    "id": "Course A-206",
    "date": "2026-08-06",
    "distanceKm": 4.05,
    "durationSeconds": 1230,
    "averageSpeedKmh": 11.85,
    "notes": "Après une semaine d’arrêt pour vacances"
  },
  {
    "id": "Course J-205",
    "date": "2026-07-26",
    "distanceKm": 4.05,
    "durationSeconds": 1169,
    "averageSpeedKmh": 12.47,
    "notes": "Chaud encore, mais moins qu’hier"
  },
  {
    "id": "Course J-204",
    "date": "2026-07-25",
    "distanceKm": 4.05,
    "durationSeconds": 1163,
    "averageSpeedKmh": 12.54,
    "notes": "Chaud, peu de gens pour un samedi"
  },
  {
    "id": "Course J-203",
    "date": "2026-07-23",
    "distanceKm": 4.05,
    "durationSeconds": 1165,
    "averageSpeedKmh": 12.52,
    "notes": "Chaud mais sympa"
  },
  {
    "id": "Course J-202",
    "date": "2026-07-19",
    "distanceKm": 4.05,
    "durationSeconds": 1159,
    "averageSpeedKmh": 12.58,
    "notes": "Avant midi, bonne température"
  },
  {
    "id": "Course J-201",
    "date": "2026-07-18",
    "distanceKm": 4.05,
    "durationSeconds": 1029,
    "averageSpeedKmh": 14.17,
    "notes": "Dur, je croyais aller très vite"
  },
  {
    "id": "Course J-200",
    "date": "2026-07-16",
    "distanceKm": 4.05,
    "durationSeconds": 1195,
    "averageSpeedKmh": 12.2,
    "notes": "Soirée, transpiré fort une fois revenu"
  },
  {
    "id": "Course J-199",
    "date": "2026-07-12",
    "distanceKm": 4.05,
    "durationSeconds": 1134,
    "averageSpeedKmh": 12.86,
    "notes": "Amie de Francesco en voiture Rt. d’Arlon"
  },
  {
    "id": "Course J-198",
    "date": "2026-07-11",
    "distanceKm": 4.05,
    "durationSeconds": 1145,
    "averageSpeedKmh": 12.73,
    "notes": "Chaud, soleil très fort"
  },
  {
    "id": "Course J-197",
    "date": "2026-07-09",
    "distanceKm": 4.05,
    "durationSeconds": 1087,
    "averageSpeedKmh": 13.41,
    "notes": "Chaud, me suis senti petit, tous grands"
  },
  {
    "id": "Course J-196",
    "date": "2026-07-05",
    "distanceKm": 4.05,
    "durationSeconds": 1183,
    "averageSpeedKmh": 12.32,
    "notes": "Matin, après le réveil, transpiré"
  },
  {
    "id": "Course J-195",
    "date": "2026-07-04",
    "distanceKm": 4.05,
    "durationSeconds": 1145,
    "averageSpeedKmh": 12.73,
    "notes": "Après effort avec Victor, du monde"
  },
  {
    "id": "Course J-194",
    "date": "2026-07-02",
    "distanceKm": 4.05,
    "durationSeconds": 1150,
    "averageSpeedKmh": 12.68,
    "notes": "Pas si dur, les températures plus vivables"
  },
  {
    "id": "Course J-193",
    "date": "2026-06-28",
    "distanceKm": 4.05,
    "durationSeconds": 1159,
    "averageSpeedKmh": 12.58,
    "notes": "Chaud mais gris et vent donc acceptable"
  },
  {
    "id": "Course J-192",
    "date": "2026-06-27",
    "distanceKm": 4.05,
    "durationSeconds": 1134,
    "averageSpeedKmh": 12.86,
    "notes": "36°, mais je commence à m’y habituer"
  },
  {
    "id": "Course J-191",
    "date": "2026-06-25",
    "distanceKm": 4.05,
    "durationSeconds": 1180,
    "averageSpeedKmh": 12.36,
    "notes": "Dur, chaleur, transpiré comme un buffle"
  },
  {
    "id": "Course J-190",
    "date": "2026-06-20",
    "distanceKm": 4.05,
    "durationSeconds": 1162,
    "averageSpeedKmh": 12.55,
    "notes": "Par 32°, suivi un coureur torse nu, pas dur"
  },
  {
    "id": "Course J-189",
    "date": "2026-06-18",
    "distanceKm": 4.05,
    "durationSeconds": 1230,
    "averageSpeedKmh": 11.85,
    "notes": "Soirée d’été, peu de monde, nuit tombée"
  },
  {
    "id": "Course J-188",
    "date": "2026-06-13",
    "distanceKm": 4.05,
    "durationSeconds": 1215,
    "averageSpeedKmh": 12.0,
    "notes": "Chaud, sympa, pas mal de monde"
  },
  {
    "id": "Course J-187",
    "date": "2026-06-12",
    "distanceKm": 4.05,
    "durationSeconds": 1299,
    "averageSpeedKmh": 11.22,
    "notes": "Soirée, nuit en train de tomber"
  },
  {
    "id": "Course J-186",
    "date": "2026-06-07",
    "distanceKm": 4.05,
    "durationSeconds": 1249,
    "averageSpeedKmh": 11.67,
    "notes": "Bonne chaleur, entre compositions"
  },
  {
    "id": "Course J-185",
    "date": "2026-06-06",
    "distanceKm": 4.05,
    "durationSeconds": 1259,
    "averageSpeedKmh": 11.58,
    "notes": "Avant la composition de français, moyen"
  },
  {
    "id": "Course J-184",
    "date": "2026-06-04",
    "distanceKm": 4.05,
    "durationSeconds": 1227,
    "averageSpeedKmh": 11.88,
    "notes": "Il ne s’agissait pas de moi, mais de la vie"
  },
  {
    "id": "Course M-183",
    "date": "2026-05-31",
    "distanceKm": 4.05,
    "durationSeconds": 1319,
    "averageSpeedKmh": 11.05,
    "notes": "Brise légère, poing de côté, soir vers 20h"
  },
  {
    "id": "Course M-182",
    "date": "2026-05-30",
    "distanceKm": 4.05,
    "durationSeconds": 1189,
    "averageSpeedKmh": 12.26,
    "notes": "Mal au ventre, poing de côté, dur"
  },
  {
    "id": "Course M-181",
    "date": "2026-05-28",
    "distanceKm": 4.05,
    "durationSeconds": 1012,
    "averageSpeedKmh": 14.41,
    "notes": "Croyais avoir nouveau record, concentré"
  },
  {
    "id": "Course M-180",
    "date": "2026-05-23",
    "distanceKm": 4.05,
    "durationSeconds": 1178,
    "averageSpeedKmh": 12.38,
    "notes": "Début soirée, dur, très chaud, mal ventre"
  },
  {
    "id": "Course M-179",
    "date": "2026-05-21",
    "distanceKm": 4.05,
    "durationSeconds": 1213,
    "averageSpeedKmh": 12.02,
    "notes": "Chaud, soleil, un peu ventre balloté, dur"
  },
  {
    "id": "Course M-178",
    "date": "2026-05-17",
    "distanceKm": 4.05,
    "durationSeconds": 1230,
    "averageSpeedKmh": 11.85,
    "notes": "Pensé aux maths, chapitres et leurs liens"
  },
  {
    "id": "Course M-177",
    "date": "2026-05-16",
    "distanceKm": 4.05,
    "durationSeconds": 1050,
    "averageSpeedKmh": 13.89,
    "notes": "De bon matin, 10h, dur, mais bon temps"
  },
  {
    "id": "Course M-176",
    "date": "2026-05-14",
    "distanceKm": 4.05,
    "durationSeconds": 1140,
    "averageSpeedKmh": 12.79,
    "notes": "Tiède, gris et pluie légère, vent, le soir"
  },
  {
    "id": "Course M-175",
    "date": "2026-05-10",
    "distanceKm": 4.05,
    "durationSeconds": 1050,
    "averageSpeedKmh": 13.89,
    "notes": "Vite, paradoxalement plus vu le paysage"
  },
  {
    "id": "Course M-174",
    "date": "2026-05-09",
    "distanceKm": 4.05,
    "durationSeconds": 1228,
    "averageSpeedKmh": 11.87,
    "notes": "Pensé à la vie, éternelle, et l’erreur de tous"
  },
  {
    "id": "Course M-173",
    "date": "2026-05-07",
    "distanceKm": 4.05,
    "durationSeconds": 1173,
    "averageSpeedKmh": 12.43,
    "notes": "Temps gris agréable, quelques coureurs"
  },
  {
    "id": "Course M-172",
    "date": "2026-05-03",
    "distanceKm": 4.05,
    "durationSeconds": 1268,
    "averageSpeedKmh": 11.5,
    "notes": "Gris, tiède, agréable, pensé à dans 4 mois"
  },
  {
    "id": "Course A-171",
    "date": "2026-04-30",
    "distanceKm": 4.05,
    "durationSeconds": 1159,
    "averageSpeedKmh": 12.58,
    "notes": "Coureuse jeune en rouge, pensé à l’Iliade"
  },
  {
    "id": "Course A-170",
    "date": "2026-04-19",
    "distanceKm": 4.05,
    "durationSeconds": 1130,
    "averageSpeedKmh": 12.9,
    "notes": "Soleil, un peu de monde, en T-Shirt"
  },
  {
    "id": "Course A-169",
    "date": "2026-04-18",
    "distanceKm": 4.05,
    "durationSeconds": 1170,
    "averageSpeedKmh": 12.46,
    "notes": "Chaud, comme l’été, quelques personnes"
  },
  {
    "id": "Course A-168",
    "date": "2026-04-16",
    "distanceKm": 4.05,
    "durationSeconds": 1228,
    "averageSpeedKmh": 11.87,
    "notes": "Tranquille, un peu tard vers 19h, moyen"
  },
  {
    "id": "Course A-167",
    "date": "2026-04-12",
    "distanceKm": 4.05,
    "durationSeconds": 1230,
    "averageSpeedKmh": 11.85,
    "notes": "Frais, très peu de monde, quelques jeunes"
  },
  {
    "id": "Course A-166",
    "date": "2026-04-11",
    "distanceKm": 4.05,
    "durationSeconds": 1180,
    "averageSpeedKmh": 12.36,
    "notes": "Peu de pluie, agréable, 2 filles parfumées"
  },
  {
    "id": "Course A-165",
    "date": "2026-04-09",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "Temps d’été, chaud, bon, bouche ouverte"
  },
  {
    "id": "Course A-164",
    "date": "2026-04-05",
    "distanceKm": 21.0,
    "durationSeconds": 7205,
    "averageSpeedKmh": 10.49,
    "notes": "Bretagne, mer sublime, forêts, campagne"
  },
  {
    "id": "Course M-163",
    "date": "2026-03-31",
    "distanceKm": 5.45,
    "durationSeconds": 1945,
    "averageSpeedKmh": 10.09,
    "notes": "De nuit, sinistre, entrecoupé et long, facile"
  },
  {
    "id": "Course M-162",
    "date": "2026-03-28",
    "distanceKm": 4.05,
    "durationSeconds": 1130,
    "averageSpeedKmh": 12.9,
    "notes": "Frais, chaussure mal lacées, moyen"
  },
  {
    "id": "Course M-161",
    "date": "2026-03-26",
    "distanceKm": 4.05,
    "durationSeconds": 1065,
    "averageSpeedKmh": 13.69,
    "notes": "Soleil léger, des coureurs, plutôt costaud"
  },
  {
    "id": "Course M-160",
    "date": "2026-03-22",
    "distanceKm": 4.05,
    "durationSeconds": 1095,
    "averageSpeedKmh": 13.32,
    "notes": "Chaud, du monde, quelques jeunes"
  },
  {
    "id": "Course M-159",
    "date": "2026-03-21",
    "distanceKm": 4.05,
    "durationSeconds": 1100,
    "averageSpeedKmh": 13.25,
    "notes": "Température parfaite, très peu de gens"
  },
  {
    "id": "Course M-158",
    "date": "2026-03-19",
    "distanceKm": 4.05,
    "durationSeconds": 1100,
    "averageSpeedKmh": 13.25,
    "notes": "Température parfaite, rapide, 7 coureurs"
  },
  {
    "id": "Course M-157",
    "date": "2026-03-15",
    "distanceKm": 4.05,
    "durationSeconds": 1205,
    "averageSpeedKmh": 12.1,
    "notes": "Beaucoup de monde, soleil et sympa, dur"
  },
  {
    "id": "Cours M-156",
    "date": "2026-03-12",
    "distanceKm": 4.05,
    "durationSeconds": 1135,
    "averageSpeedKmh": 12.85,
    "notes": "Quelques coureurs, léger mal à l’épaule"
  },
  {
    "id": "Course M-155",
    "date": "2026-03-08",
    "distanceKm": 4.05,
    "durationSeconds": 1105,
    "averageSpeedKmh": 13.19,
    "notes": "Grand soleil, peu de monde, assoiffé"
  },
  {
    "id": "Course M-154",
    "date": "2026-03-07",
    "distanceKm": 4.05,
    "durationSeconds": 1091,
    "averageSpeedKmh": 13.36,
    "notes": "Soleil, chaud, comme en été, peu de gens"
  },
  {
    "id": "Course M-153",
    "date": "2026-03-05",
    "distanceKm": 4.05,
    "durationSeconds": 1135,
    "averageSpeedKmh": 12.85,
    "notes": "Vu fille de bus, 2 grands groupes coureurs"
  },
  {
    "id": "Course M-152",
    "date": "2026-03-01",
    "distanceKm": 4.05,
    "durationSeconds": 1140,
    "averageSpeedKmh": 12.79,
    "notes": "Chaud, beau, peu de monde, agréable"
  },
  {
    "id": "Course F-151",
    "date": "2026-02-28",
    "distanceKm": 4.05,
    "durationSeconds": 1145,
    "averageSpeedKmh": 12.73,
    "notes": "Après coiffeur, chaud, mal aux jambes"
  },
  {
    "id": "Course F-150",
    "date": "2026-02-26",
    "distanceKm": 3.95,
    "durationSeconds": 1020,
    "averageSpeedKmh": 13.94,
    "notes": "Revu ce gars de l’EEL2 en couple, chaud"
  },
  {
    "id": "Course F-149",
    "date": "2026-02-22",
    "distanceKm": 4.05,
    "durationSeconds": 1135,
    "averageSpeedKmh": 12.85,
    "notes": "Pluie légère, pensé à React/JavaScript"
  },
  {
    "id": "Course F-148",
    "date": "2026-02-21",
    "distanceKm": 4.05,
    "durationSeconds": 1050,
    "averageSpeedKmh": 13.89,
    "notes": "Gris, température idéale, quelques gens"
  },
  {
    "id": "Course F-147",
    "date": "2026-02-19",
    "distanceKm": 4.05,
    "durationSeconds": 1150,
    "averageSpeedKmh": 12.68,
    "notes": "Soir qui tombait, léger poing de côté"
  },
  {
    "id": "Course F-146",
    "date": "2026-02-15",
    "distanceKm": 4.05,
    "durationSeconds": 1160,
    "averageSpeedKmh": 12.57,
    "notes": "Froid, cocasse les gens, peu après le réveil"
  },
  {
    "id": "Course F-145",
    "date": "2026-02-14",
    "distanceKm": 4.05,
    "durationSeconds": 1215,
    "averageSpeedKmh": 12.0,
    "notes": "Frais, gris, terne, vu des jeunes en voiture"
  },
  {
    "id": "Course F-144",
    "date": "2026-02-12",
    "distanceKm": 4.05,
    "durationSeconds": 1228,
    "averageSpeedKmh": 11.87,
    "notes": "Pluie, pensé au sens de Dieu, philosophé"
  },
  {
    "id": "Course F-143",
    "date": "2026-02-08",
    "distanceKm": 4.05,
    "durationSeconds": 1230,
    "averageSpeedKmh": 11.85,
    "notes": "Frais, pensé à mon évolution en course"
  },
  {
    "id": "Course F-142",
    "date": "2026-02-07",
    "distanceKm": 4.05,
    "durationSeconds": 1215,
    "averageSpeedKmh": 12.0,
    "notes": "Temps incroyable, tiède et ensoleillé"
  },
  {
    "id": "Course F-141",
    "date": "2026-02-05",
    "distanceKm": 4.05,
    "durationSeconds": 1140,
    "averageSpeedKmh": 12.79,
    "notes": "Vu Simon et sa host en bus au début, nuit"
  },
  {
    "id": "Course F-140",
    "date": "2026-02-01",
    "distanceKm": 4.05,
    "durationSeconds": 1215,
    "averageSpeedKmh": 12.0,
    "notes": "Matin, avant midi, poing de côté intense"
  },
  {
    "id": "Course J-139",
    "date": "2026-01-31",
    "distanceKm": 4.05,
    "durationSeconds": 1190,
    "averageSpeedKmh": 12.25,
    "notes": "Quelques coureurs, tard, vers 18h30"
  },
  {
    "id": "Course J-138",
    "date": "2026-01-29",
    "distanceKm": 4.05,
    "durationSeconds": 1215,
    "averageSpeedKmh": 12.0,
    "notes": "Pleins de coureurs, nuit, pas dur du tout"
  },
  {
    "id": "Course J-137",
    "date": "2026-01-25",
    "distanceKm": 4.05,
    "durationSeconds": 1190,
    "averageSpeedKmh": 12.25,
    "notes": "Brouillard léger, peu de monde, moyen"
  },
  {
    "id": "Course J-136",
    "date": "2026-01-24",
    "distanceKm": 4.05,
    "durationSeconds": 1195,
    "averageSpeedKmh": 12.2,
    "notes": null
  },
  {
    "id": "Course J-135",
    "date": "2026-01-22",
    "distanceKm": 4.05,
    "durationSeconds": 1195,
    "averageSpeedKmh": 12.2,
    "notes": "De nuit, fatigué, mais pas dur du tout"
  },
  {
    "id": "Course J-134",
    "date": "2026-01-18",
    "distanceKm": 4.05,
    "durationSeconds": 1125,
    "averageSpeedKmh": 12.96,
    "notes": "Faisait bien froid, vu 5 coureurs, 2 duos"
  },
  {
    "id": "Course J-133",
    "date": "2026-01-17",
    "distanceKm": 4.05,
    "durationSeconds": 1224,
    "averageSpeedKmh": 11.91,
    "notes": "Soleil, tiède, pensé à une vie à Seattle"
  },
  {
    "id": "Course J-132",
    "date": "2026-01-15",
    "distanceKm": 4.05,
    "durationSeconds": 1211,
    "averageSpeedKmh": 12.04,
    "notes": "Malade, pénible, mais c’est fait"
  },
  {
    "id": "Course J-131",
    "date": "2026-01-11",
    "distanceKm": 4.05,
    "durationSeconds": 1155,
    "averageSpeedKmh": 12.62,
    "notes": "Frais, peu de monde, pas très rapide"
  },
  {
    "id": "Course J-130",
    "date": "2026-01-10",
    "distanceKm": 4.05,
    "durationSeconds": 1020,
    "averageSpeedKmh": 14.29,
    "notes": "Froid, beaucoup de coureurs, rapide"
  },
  {
    "id": "Course J-129",
    "date": "2026-01-08",
    "distanceKm": 4.05,
    "durationSeconds": 1035,
    "averageSpeedKmh": 14.09,
    "notes": "Pluie, de nuit, trempé, bien rapide en vrai"
  },
  {
    "id": "Course J-128",
    "date": "2026-01-04",
    "distanceKm": 4.05,
    "durationSeconds": 1140,
    "averageSpeedKmh": 12.79,
    "notes": "Pensé à la présentation de politique"
  },
  {
    "id": "Course J-127",
    "date": "2026-01-03",
    "distanceKm": 4.05,
    "durationSeconds": 1195,
    "averageSpeedKmh": 12.2,
    "notes": "Neige par terre, soleil léger, du monde"
  },
  {
    "id": "Course J-126",
    "date": "2026-01-01",
    "distanceKm": 4.05,
    "durationSeconds": 1245,
    "averageSpeedKmh": 11.71,
    "notes": "Presque personne, frais, ciel gris/bleu"
  },
  {
    "id": "Course D-125",
    "date": "2025-12-28",
    "distanceKm": 4.05,
    "durationSeconds": 1140,
    "averageSpeedKmh": 12.79,
    "notes": "Soleil et tièdeure, juré de courir à Mutzig"
  },
  {
    "id": "Course D-124",
    "date": "2025-12-27",
    "distanceKm": 4.05,
    "durationSeconds": 1231,
    "averageSpeedKmh": 11.84,
    "notes": "Tiède, ensoleillé, souvenirs de courses"
  },
  {
    "id": "Course D-123",
    "date": "2025-12-25",
    "distanceKm": 4.05,
    "durationSeconds": 1146,
    "averageSpeedKmh": 12.72,
    "notes": "0°C, croissant de lune, quasi personne"
  },
  {
    "id": "Course D-122",
    "date": "2025-12-21",
    "distanceKm": 4.05,
    "durationSeconds": 1070,
    "averageSpeedKmh": 13.63,
    "notes": "Soleil de fin d’après-midi, chaleur tiède"
  },
  {
    "id": "Course D-121",
    "date": "2025-12-20",
    "distanceKm": 4.05,
    "durationSeconds": 1200,
    "averageSpeedKmh": 12.15,
    "notes": "Après-midi, 16h30, peu de gens dehors"
  },
  {
    "id": "Course D-120",
    "date": "2025-12-18",
    "distanceKm": 4.05,
    "durationSeconds": 1170,
    "averageSpeedKmh": 12.46,
    "notes": "De nuit comme d’habitude, frais"
  },
  {
    "id": "Course D-119",
    "date": "2025-12-11",
    "distanceKm": 4.05,
    "durationSeconds": 1160,
    "averageSpeedKmh": 12.57,
    "notes": "Soir, facile, un peu mal au tibia gauche"
  },
  {
    "id": "Course D-118",
    "date": "2025-12-07",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": "Tranquille, peu de monde, un peu de pluie"
  },
  {
    "id": "Course D-117",
    "date": "2025-12-06",
    "distanceKm": 4.05,
    "durationSeconds": 995,
    "averageSpeedKmh": 14.65,
    "notes": "Rapide, dur, ~17h, nuit, pluie soudaine"
  },
  {
    "id": "Course D-116",
    "date": "2025-12-04",
    "distanceKm": 4.05,
    "durationSeconds": 1145,
    "averageSpeedKmh": 12.73,
    "notes": "Bruine légère, nuit, peu de monde, sympa"
  },
  {
    "id": "Course N-115",
    "date": "2025-11-30",
    "distanceKm": 4.05,
    "durationSeconds": 1148,
    "averageSpeedKmh": 12.7,
    "notes": "Légère pluie, mais tiède (7°C), rapide"
  },
  {
    "id": "Course N-114",
    "date": "2025-11-27",
    "distanceKm": 4.05,
    "durationSeconds": 1130,
    "averageSpeedKmh": 12.9,
    "notes": "Vu 2 filles du bus au début, improbable"
  },
  {
    "id": "Course N-113",
    "date": "2025-11-23",
    "distanceKm": 4.05,
    "durationSeconds": 1318,
    "averageSpeedKmh": 11.06,
    "notes": "Neige en masse, personne dehors, unique"
  },
  {
    "id": "Course N-112",
    "date": "2025-11-22",
    "distanceKm": 4.05,
    "durationSeconds": 1230,
    "averageSpeedKmh": 11.85,
    "notes": "1°C, en retard, ensoleillé, des gens dehors"
  },
  {
    "id": "Course N-111",
    "date": "2025-11-20",
    "distanceKm": 4.05,
    "durationSeconds": 1190,
    "averageSpeedKmh": 12.25,
    "notes": "1°C seulement, un peu de neige, frais"
  },
  {
    "id": "Course N-110",
    "date": "2025-11-16",
    "distanceKm": 4.05,
    "durationSeconds": 1185,
    "averageSpeedKmh": 12.3,
    "notes": null
  },
  {
    "id": "Course N-109",
    "date": "2025-11-15",
    "distanceKm": 4.05,
    "durationSeconds": 1311,
    "averageSpeedKmh": 11.12,
    "notes": null
  },
  {
    "id": "Course N-108",
    "date": "2025-11-09",
    "distanceKm": 4.05,
    "durationSeconds": 1068,
    "averageSpeedKmh": 13.65,
    "notes": "Costaud, tiède, vu un autre jeune coureur"
  },
  {
    "id": "Course N-107",
    "date": "2025-11-06",
    "distanceKm": 4.05,
    "durationSeconds": 1050,
    "averageSpeedKmh": 13.89,
    "notes": "Soirée, avant la fête, musique d’Inception"
  },
  {
    "id": "Course N-106",
    "date": "2025-11-02",
    "distanceKm": 3.92,
    "durationSeconds": 1163,
    "averageSpeedKmh": 12.14,
    "notes": "De nuit, croisé 3 jeunes, humide et tiède"
  },
  {
    "id": "Course O-105",
    "date": "2025-10-26",
    "distanceKm": 4.04,
    "durationSeconds": 1244,
    "averageSpeedKmh": 11.71,
    "notes": "Soleil automnal, familles dehors, sympa"
  },
  {
    "id": "Course O-104",
    "date": "2025-10-25",
    "distanceKm": 4.08,
    "durationSeconds": 1010,
    "averageSpeedKmh": 14.52,
    "notes": "Légère pluie, quelques coureurs, rapide"
  },
  {
    "id": "Course O-103",
    "date": "2025-10-23",
    "distanceKm": 4.33,
    "durationSeconds": 1365,
    "averageSpeedKmh": 11.42,
    "notes": "19h40, nuit, pluie légère, nostalgie"
  },
  {
    "id": "Course O-102",
    "date": "2025-10-21",
    "distanceKm": 3.0,
    "durationSeconds": 710,
    "averageSpeedKmh": 15.21,
    "notes": "À l’école, nouveau record personnel"
  },
  {
    "id": "Course O-101",
    "date": "2025-10-19",
    "distanceKm": 4.05,
    "durationSeconds": 1269,
    "averageSpeedKmh": 11.49,
    "notes": "Course tranquille, un peu mal aux jambes"
  },
  {
    "id": "Course O-100",
    "date": "2025-10-18",
    "distanceKm": 5.34,
    "durationSeconds": 1608,
    "averageSpeedKmh": 11.96,
    "notes": "Automne, vu Adam, ambiance formidable"
  },
  {
    "id": "Course O-99",
    "date": "2025-10-11",
    "distanceKm": 4.29,
    "durationSeconds": 1071,
    "averageSpeedKmh": 14.42,
    "notes": "Début d’après-midi, avant fête de Mathis"
  },
  {
    "id": "Course O-98",
    "date": "2025-10-05",
    "distanceKm": 4.33,
    "durationSeconds": 1218,
    "averageSpeedKmh": 12.78,
    "notes": "Début d’après-midi, temps sympa, chill"
  },
  {
    "id": "Course S-97",
    "date": "2025-09-25",
    "distanceKm": 7.04,
    "durationSeconds": 2511,
    "averageSpeedKmh": 10.1,
    "notes": "Avec Mathieu, le matin, ~8°C, sympa"
  },
  {
    "id": "Course S-96",
    "date": "2025-09-20",
    "distanceKm": 3.46,
    "durationSeconds": 865,
    "averageSpeedKmh": 14.4,
    "notes": "Matin, 3 tours de 1km rapide, pas trop dur"
  },
  {
    "id": "Course S-95",
    "date": "2025-09-16",
    "distanceKm": 3.0,
    "durationSeconds": 725,
    "averageSpeedKmh": 14.9,
    "notes": "À l’école, rattrapé 5 personnes, 10/10"
  },
  {
    "id": "Course S-94",
    "date": "2025-09-14",
    "distanceKm": 3.33,
    "durationSeconds": 882,
    "averageSpeedKmh": 13.59,
    "notes": "Parc le matin, rosée et légère brume, vite"
  },
  {
    "id": "Course S-93",
    "date": "2025-09-13",
    "distanceKm": 7.01,
    "durationSeconds": 2145,
    "averageSpeedKmh": 11.77,
    "notes": "Matin, moyen, passé vite, frais, sympa"
  },
  {
    "id": "Course S-92",
    "date": "2025-09-06",
    "distanceKm": 21.14,
    "durationSeconds": 8604,
    "averageSpeedKmh": 8.85,
    "notes": "Esch-sur-Alzette, Xavier et Simon, fou"
  },
  {
    "id": "Course A-91",
    "date": "2025-08-31",
    "distanceKm": 4.36,
    "durationSeconds": 1360,
    "averageSpeedKmh": 11.55,
    "notes": "Pas trop rapide, tôt le matin, légère pluie"
  },
  {
    "id": "Course A-90",
    "date": "2025-08-30",
    "distanceKm": 4.14,
    "durationSeconds": 1278,
    "averageSpeedKmh": 11.66,
    "notes": "Pas trop frais, course chill, agréable"
  },
  {
    "id": "Course A-89",
    "date": "2025-08-26",
    "distanceKm": 3.54,
    "durationSeconds": 922,
    "averageSpeedKmh": 13.82,
    "notes": "Vers 9h, rapide au début, bonne posture"
  },
  {
    "id": "Course A-88",
    "date": "2025-08-24",
    "distanceKm": 6.35,
    "durationSeconds": 1992,
    "averageSpeedKmh": 11.48,
    "notes": "Ensoleillé, quelques coureurs, mal pieds"
  },
  {
    "id": "Course A-87",
    "date": "2025-08-23",
    "distanceKm": 4.04,
    "durationSeconds": 1142,
    "averageSpeedKmh": 12.72,
    "notes": "Matin, frais, essoufflé, peu de gens"
  },
  {
    "id": "Course A-86",
    "date": "2025-08-19",
    "distanceKm": 4.28,
    "durationSeconds": 1098,
    "averageSpeedKmh": 14.06,
    "notes": "Rapide, après la déchèterie, tard (9h30)"
  },
  {
    "id": "Course A-85",
    "date": "2025-08-17",
    "distanceKm": 3.28,
    "durationSeconds": 940,
    "averageSpeedKmh": 12.55,
    "notes": "Parc, quelques coureurs, pas trop rapide"
  },
  {
    "id": "Course A-84",
    "date": "2025-08-16",
    "distanceKm": 5.4,
    "durationSeconds": 1470,
    "averageSpeedKmh": 13.22,
    "notes": "Petit matin, peu de monde, rapide"
  },
  {
    "id": "Course A-83",
    "date": "2025-08-15",
    "distanceKm": 4.3,
    "durationSeconds": 1403,
    "averageSpeedKmh": 11.03,
    "notes": "Sens inverse d’habitude, très différent"
  },
  {
    "id": "Course A-82",
    "date": "2025-08-10",
    "distanceKm": 10.39,
    "durationSeconds": 2920,
    "averageSpeedKmh": 12.81,
    "notes": "Soir, Cessange, rapide, nostalgique"
  },
  {
    "id": "Course J-81",
    "date": "2025-07-27",
    "distanceKm": 5.34,
    "durationSeconds": 1264,
    "averageSpeedKmh": 15.21,
    "notes": "7 tours, personne au parc, un peu de pluie"
  },
  {
    "id": "Course J-80",
    "date": "2025-07-26",
    "distanceKm": 11.9,
    "durationSeconds": 3937,
    "averageSpeedKmh": 10.88,
    "notes": "24°C, beaucoup de mal, l’après-midi"
  },
  {
    "id": "Course J-79",
    "date": "2025-07-22",
    "distanceKm": 4.79,
    "durationSeconds": 1087,
    "averageSpeedKmh": 15.86,
    "notes": "Rapide, au parc, très court"
  },
  {
    "id": "Course J-78",
    "date": "2025-07-16",
    "distanceKm": 4.35,
    "durationSeconds": 1282,
    "averageSpeedKmh": 12.22,
    "notes": "Beau soleil, court, pas trop rapide"
  },
  {
    "id": "Course J-77",
    "date": "2025-07-03",
    "distanceKm": 6.74,
    "durationSeconds": 1902,
    "averageSpeedKmh": 12.77,
    "notes": "Soirée cool, plein de coureurs, dur"
  },
  {
    "id": "Course J-76",
    "date": "2025-06-21",
    "distanceKm": 3.61,
    "durationSeconds": 1200,
    "averageSpeedKmh": 10.83,
    "notes": "Près de 30°C, extrêmement chaud"
  },
  {
    "id": "Course J-75",
    "date": "2025-06-08",
    "distanceKm": 7.2,
    "durationSeconds": 2030,
    "averageSpeedKmh": 12.83,
    "notes": "Nouvelle ère, vitesse et temps"
  },
  {
    "id": "Course M-74",
    "date": "2025-05-31",
    "distanceKm": 7.69,
    "durationSeconds": 1970,
    "averageSpeedKmh": 14.05,
    "notes": "Dépassé tout le monde, ING, fou"
  },
  {
    "id": "Course M-73",
    "date": "2025-05-29",
    "distanceKm": 102.38,
    "durationSeconds": 51660,
    "averageSpeedKmh": 7.12,
    "notes": "De 8h le jeudi à 4h le vendredi"
  },
  {
    "id": "Course A-72",
    "date": "2025-04-27",
    "distanceKm": 64.14,
    "durationSeconds": 29640,
    "averageSpeedKmh": 7.8,
    "notes": "Coupé par parents, chaud, très dur"
  },
  {
    "id": "Course A-71",
    "date": "2025-04-21",
    "distanceKm": 16.65,
    "durationSeconds": 6420,
    "averageSpeedKmh": 9.33,
    "notes": "Superbe, puis pénible, beaux paysages"
  },
  {
    "id": "Course A-70",
    "date": "2025-04-17",
    "distanceKm": 4.48,
    "durationSeconds": 1358,
    "averageSpeedKmh": 11.82,
    "notes": "Course tranquille, ambiance agréable"
  },
  {
    "id": "Course A-69",
    "date": "2025-04-13",
    "distanceKm": 60.93,
    "durationSeconds": 26580,
    "averageSpeedKmh": 8.25,
    "notes": "Visité Arlon, pauses, fouillé poubelles"
  },
  {
    "id": "Course A-68",
    "date": "2025-04-05",
    "distanceKm": 21.6,
    "durationSeconds": 7140,
    "averageSpeedKmh": 10.85,
    "notes": "Avec Xavier et Simon, passé un appel"
  },
  {
    "id": "Course M-67",
    "date": "2025-03-22",
    "distanceKm": 42.48,
    "durationSeconds": 15840,
    "averageSpeedKmh": 9.65,
    "notes": "3 grosses pauses, avec Simon, dur"
  },
  {
    "id": "Course M-66",
    "date": "2025-03-09",
    "distanceKm": 21.5,
    "durationSeconds": 6780,
    "averageSpeedKmh": 11.42,
    "notes": "Test des Pegasus 41, agréable"
  },
  {
    "id": "Course M-65",
    "date": "2025-03-01",
    "distanceKm": 42.75,
    "durationSeconds": 14940,
    "averageSpeedKmh": 10.3,
    "notes": "À la Belle, incroyable, crampe au km 36"
  },
  {
    "id": "Course F-64",
    "date": "2025-02-25",
    "distanceKm": 2.4,
    "durationSeconds": 766,
    "averageSpeedKmh": 11.29,
    "notes": "Petite course, pluie, affûtage"
  },
  {
    "id": "Course F-63",
    "date": "2025-02-22",
    "distanceKm": 2.6,
    "durationSeconds": 665,
    "averageSpeedKmh": 14.18,
    "notes": "Petite course chill de récupération"
  },
  {
    "id": "Course F-62",
    "date": "2025-02-17",
    "distanceKm": 31.64,
    "durationSeconds": 11520,
    "averageSpeedKmh": 9.89,
    "notes": "Pire temps"
  },
  {
    "id": "Course F-61",
    "date": "2025-02-11",
    "distanceKm": 31.64,
    "durationSeconds": 10440,
    "averageSpeedKmh": 10.91,
    "notes": "Mal de dos, début agréable"
  },
  {
    "id": "Course F-60",
    "date": "2025-02-08",
    "distanceKm": 31.22,
    "durationSeconds": 10320,
    "averageSpeedKmh": 10.92,
    "notes": "Avec Simon, départ trop rapide"
  },
  {
    "id": "Course F-59",
    "date": "2025-02-04",
    "distanceKm": 21.3,
    "durationSeconds": 6540,
    "averageSpeedKmh": 11.72,
    "notes": "Que un semi, trés peu motivé"
  },
  {
    "id": "Course F-58",
    "date": "2025-02-02",
    "distanceKm": 31.63,
    "durationSeconds": 9840,
    "averageSpeedKmh": 11.54,
    "notes": "Super gel, toilettes de Capellen"
  },
  {
    "id": "Course J-57",
    "date": "2025-01-28",
    "distanceKm": 31.5,
    "durationSeconds": 9900,
    "averageSpeedKmh": 11.45,
    "notes": "Extrêmement dur, mal aux pieds"
  },
  {
    "id": "Course J-56",
    "date": "2025-01-26",
    "distanceKm": 43.16,
    "durationSeconds": 13380,
    "averageSpeedKmh": 11.61,
    "notes": "À Lucile, j’ai fait l’impensable"
  },
  {
    "id": "Course J-55",
    "date": "2025-01-21",
    "distanceKm": 31.45,
    "durationSeconds": 9600,
    "averageSpeedKmh": 11.78,
    "notes": "Bien plus agréable, sans pauses"
  },
  {
    "id": "Course J-54",
    "date": "2025-01-19",
    "distanceKm": 10.12,
    "durationSeconds": 2600,
    "averageSpeedKmh": 14.01,
    "notes": "Très bonne vitesse, mais très dur"
  },
  {
    "id": "Course J-53",
    "date": "2025-01-18",
    "distanceKm": 31.2,
    "durationSeconds": 9300,
    "averageSpeedKmh": 12.04,
    "notes": "Trés trés dur, en négative split"
  },
  {
    "id": "Course J-52",
    "date": "2025-01-14",
    "distanceKm": 27.45,
    "durationSeconds": 8460,
    "averageSpeedKmh": 11.68,
    "notes": "Nouveau RP, incroyable, pas dur"
  },
  {
    "id": "Course J-51",
    "date": "2025-01-12",
    "distanceKm": 21.25,
    "durationSeconds": 6720,
    "averageSpeedKmh": 11.38,
    "notes": "Pensé à Mutzig, plutôt dur"
  },
  {
    "id": "Course J-50",
    "date": "2025-01-11",
    "distanceKm": 21.27,
    "durationSeconds": 6600,
    "averageSpeedKmh": 11.55,
    "notes": "Parti à 9h05, pas si dur que ça"
  },
  {
    "id": "Course J-49",
    "date": "2025-01-07",
    "distanceKm": 21.19,
    "durationSeconds": 6540,
    "averageSpeedKmh": 11.67,
    "notes": "Vu Brina-Sophia, beaux paysages"
  },
  {
    "id": "Course J-48",
    "date": "2025-01-04",
    "distanceKm": 21.38,
    "durationSeconds": 6900,
    "averageSpeedKmh": 11.15,
    "notes": "Vu Max, sans pauses, mains gelées"
  },
  {
    "id": "Course J-47",
    "date": "2025-01-03",
    "distanceKm": 15.78,
    "durationSeconds": 4620,
    "averageSpeedKmh": 12.26,
    "notes": "Pleins de coureurs, beau temps"
  },
  {
    "id": "Course J-46",
    "date": "2025-01-02",
    "distanceKm": 11.28,
    "durationSeconds": 3180,
    "averageSpeedKmh": 12.71,
    "notes": "Trés dur"
  },
  {
    "id": "Course D-45",
    "date": "2024-12-27",
    "distanceKm": 21.32,
    "durationSeconds": 6360,
    "averageSpeedKmh": 12.01,
    "notes": "Mamer, la Pétrusse, -1°C"
  },
  {
    "id": "Course D-44",
    "date": "2024-12-24",
    "distanceKm": 18.48,
    "durationSeconds": 5520,
    "averageSpeedKmh": 12.05,
    "notes": "Mamer"
  },
  {
    "id": "Course D-43",
    "date": "2024-12-22",
    "distanceKm": 15.83,
    "durationSeconds": 4680,
    "averageSpeedKmh": 12.1,
    "notes": "Pauses, Matthis (5km), de jour"
  },
  {
    "id": "Course D-42",
    "date": "2024-12-18",
    "distanceKm": 11.08,
    "durationSeconds": 3360,
    "averageSpeedKmh": 11.91,
    "notes": "Itinéraire de route d’Arlon, bien"
  },
  {
    "id": "Course D-41",
    "date": "2024-12-15",
    "distanceKm": 10.64,
    "durationSeconds": 3240,
    "averageSpeedKmh": 11.82,
    "notes": "Passable"
  },
  {
    "id": "Course D-40",
    "date": "2024-12-13",
    "distanceKm": 10.66,
    "durationSeconds": 3000,
    "averageSpeedKmh": 12.73,
    "notes": "En sweat, plutôt facile"
  },
  {
    "id": "Course D-39",
    "date": "2024-12-10",
    "distanceKm": 10.62,
    "durationSeconds": 2880,
    "averageSpeedKmh": 13.23,
    "notes": "Nouveau RP, incroyable"
  },
  {
    "id": "Course D-38",
    "date": "2024-12-08",
    "distanceKm": 10.64,
    "durationSeconds": 3120,
    "averageSpeedKmh": 12.28,
    "notes": "1 pause à 6 km, maux de ventre"
  },
  {
    "id": "Course D-37",
    "date": "2024-12-05",
    "distanceKm": 10.6,
    "durationSeconds": 3180,
    "averageSpeedKmh": 11.89,
    "notes": "Allure bonne, course correcte"
  },
  {
    "id": "Course D-36",
    "date": "2024-12-04",
    "distanceKm": 10.64,
    "durationSeconds": 3060,
    "averageSpeedKmh": 12.47,
    "notes": "Difficile, fait les lacets en course"
  },
  {
    "id": "Course D-35",
    "date": "2024-12-01",
    "distanceKm": 6.34,
    "durationSeconds": 2340,
    "averageSpeedKmh": 9.63,
    "notes": "Trés dur, maux de ventres, retards"
  },
  {
    "id": "Course N-34",
    "date": "2024-11-29",
    "distanceKm": 10.64,
    "durationSeconds": 3000,
    "averageSpeedKmh": 12.68,
    "notes": "Difficile, mais satisfaisant"
  },
  {
    "id": "Course N-33",
    "date": "2024-11-28",
    "distanceKm": 10.63,
    "durationSeconds": 3000,
    "averageSpeedKmh": 12.69,
    "notes": "Parfait, enfin"
  },
  {
    "id": "Course N-32",
    "date": "2024-11-27",
    "distanceKm": 10.61,
    "durationSeconds": 3360,
    "averageSpeedKmh": 11.27,
    "notes": "Pluie, lent puis rapide, course OK"
  },
  {
    "id": "Course N-31",
    "date": "2024-11-26",
    "distanceKm": 10.6,
    "durationSeconds": 3540,
    "averageSpeedKmh": 10.72,
    "notes": "Pas regardé l’heure, allure pas ouf"
  },
  {
    "id": "Course N-30",
    "date": "2024-11-24",
    "distanceKm": 10.6,
    "durationSeconds": 3180,
    "averageSpeedKmh": 11.93,
    "notes": "Difficile, avec bonnet"
  },
  {
    "id": "Course N-29",
    "date": "2024-11-21",
    "distanceKm": 10.62,
    "durationSeconds": 3300,
    "averageSpeedKmh": 11.6,
    "notes": "Froid, très mal aux mains rouges"
  },
  {
    "id": "Course N-28",
    "date": "2024-11-20",
    "distanceKm": 10.63,
    "durationSeconds": 3240,
    "averageSpeedKmh": 11.78,
    "notes": "Premières neiges, 0°C"
  },
  {
    "id": "Course N-27",
    "date": "2024-11-19",
    "distanceKm": 10.6,
    "durationSeconds": 3420,
    "averageSpeedKmh": 11.16,
    "notes": "Pluie et vent, sans difficultée"
  },
  {
    "id": "Course N-26",
    "date": "2024-11-14",
    "distanceKm": 10.63,
    "durationSeconds": 3240,
    "averageSpeedKmh": 11.78,
    "notes": "Rien de particulier"
  },
  {
    "id": "Course N-25",
    "date": "2024-11-13",
    "distanceKm": 10.65,
    "durationSeconds": 3180,
    "averageSpeedKmh": 12.0,
    "notes": "Sans problème, bonne cadence"
  },
  {
    "id": "Course N-24",
    "date": "2024-11-12",
    "distanceKm": 10.63,
    "durationSeconds": 3420,
    "averageSpeedKmh": 11.26,
    "notes": "Réussie"
  },
  {
    "id": "Course N-23",
    "date": "2024-11-10",
    "distanceKm": 10.6,
    "durationSeconds": 3720,
    "averageSpeedKmh": 10.26,
    "notes": "Pas de pause, plus dur, allure lente"
  },
  {
    "id": "Course N-22",
    "date": "2024-11-08",
    "distanceKm": 10.64,
    "durationSeconds": 3300,
    "averageSpeedKmh": 11.56,
    "notes": "Toujours bien, meilleure streak"
  },
  {
    "id": "Course N-21",
    "date": "2024-11-07",
    "distanceKm": 10.66,
    "durationSeconds": 3480,
    "averageSpeedKmh": 10.97,
    "notes": "Encore bien"
  },
  {
    "id": "Course N-20",
    "date": "2024-11-06",
    "distanceKm": 10.57,
    "durationSeconds": 3300,
    "averageSpeedKmh": 11.6,
    "notes": "Trés bien, comme hier"
  },
  {
    "id": "Course N-19",
    "date": "2024-11-05",
    "distanceKm": 10.58,
    "durationSeconds": 3480,
    "averageSpeedKmh": 10.97,
    "notes": "Beaucoups mieux, sans douleurs"
  },
  {
    "id": "Course N-18",
    "date": "2024-11-03",
    "distanceKm": 9.68,
    "durationSeconds": 3420,
    "averageSpeedKmh": 10.11,
    "notes": "Mal au ventre et pieds, serré abdos"
  },
  {
    "id": "Course N-17",
    "date": "2024-11-02",
    "distanceKm": 9.52,
    "durationSeconds": 3180,
    "averageSpeedKmh": 10.11,
    "notes": "Trés dur, après 1 semaine de vacances"
  },
  {
    "id": "Course O-16",
    "date": "2024-10-24",
    "distanceKm": 4.88,
    "durationSeconds": 1320,
    "averageSpeedKmh": 13.31,
    "notes": "Parti trop tard, dur"
  },
  {
    "id": "Course O-15",
    "date": "2024-10-22",
    "distanceKm": 10.55,
    "durationSeconds": 3180,
    "averageSpeedKmh": 12.0,
    "notes": "Épuisant, motivé pour le 100 km"
  },
  {
    "id": "Course O-14",
    "date": "2024-10-20",
    "distanceKm": 8.55,
    "durationSeconds": 2700,
    "averageSpeedKmh": 11.33,
    "notes": "Cessange, pauses ~5 min., agréable"
  },
  {
    "id": "Course O-13",
    "date": "2024-10-17",
    "distanceKm": 8.3,
    "durationSeconds": 2640,
    "averageSpeedKmh": 11.32,
    "notes": "Pareil qu’hier, pas de douleur"
  },
  {
    "id": "Course O-12",
    "date": "2024-10-16",
    "distanceKm": 8.27,
    "durationSeconds": 2460,
    "averageSpeedKmh": 12.1,
    "notes": "Mieux qu’hier"
  },
  {
    "id": "Course O-11",
    "date": "2024-10-15",
    "distanceKm": 7.15,
    "durationSeconds": 2160,
    "averageSpeedKmh": 11.92,
    "notes": "Dur, poing de côté"
  },
  {
    "id": "Course O-10",
    "date": "2024-10-13",
    "distanceKm": 5.82,
    "durationSeconds": 1680,
    "averageSpeedKmh": 12.47,
    "notes": "Gros retards, douleurs"
  },
  {
    "id": "Course O-9",
    "date": "2024-10-12",
    "distanceKm": 8.91,
    "durationSeconds": 2700,
    "averageSpeedKmh": 11.88,
    "notes": "Dur, fatigué"
  },
  {
    "id": "Course O-8",
    "date": "2024-10-10",
    "distanceKm": 12.5,
    "durationSeconds": 4320,
    "averageSpeedKmh": 10.42,
    "notes": "Allé jusqu’à voie ferrée de Bertrange"
  },
  {
    "id": "Course O-7",
    "date": "2024-10-08",
    "distanceKm": 10.8,
    "durationSeconds": 3960,
    "averageSpeedKmh": 9.82,
    "notes": null
  },
  {
    "id": "Course O-6",
    "date": "2024-10-06",
    "distanceKm": 11.4,
    "durationSeconds": 3360,
    "averageSpeedKmh": 12.21,
    "notes": "Jusqu’au BK de Belle Etoile, plus rapide"
  },
  {
    "id": "Course O-5",
    "date": "2024-10-05",
    "distanceKm": 9.23,
    "durationSeconds": 3360,
    "averageSpeedKmh": 9.89,
    "notes": "3 longues pauses, déficit calorique"
  },
  {
    "id": "Course O-4",
    "date": "2024-10-02",
    "distanceKm": 3.4,
    "durationSeconds": 1200,
    "averageSpeedKmh": 10.2,
    "notes": null
  },
  {
    "id": "Course O-3",
    "date": "2024-10-01",
    "distanceKm": 3.35,
    "durationSeconds": 1200,
    "averageSpeedKmh": 10.05,
    "notes": "Dans Bellair"
  },
  {
    "id": "Course S-2",
    "date": "2024-09-29",
    "distanceKm": 5.6,
    "durationSeconds": 1500,
    "averageSpeedKmh": 13.44,
    "notes": "Cessange"
  },
  {
    "id": "Course S-1",
    "date": "2024-09-22",
    "distanceKm": 5.35,
    "durationSeconds": 1620,
    "averageSpeedKmh": 11.89,
    "notes": null
  }
]
);

export type { Race };
