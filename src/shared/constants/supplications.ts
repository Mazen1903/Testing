import { ZikrSeries, ZikrCategory } from '../types/supplications';

export const ZIKR_CATEGORIES: ZikrCategory[] = [
  { id: 'all', name: 'All', icon: 'apps' },
  { id: 'daily', name: 'Daily Supplications', icon: 'star' },
  { id: 'hadith', name: 'Hadith-based', icon: 'book' },
  { id: 'virtues', name: 'Virtues & Remembrance', icon: 'heart' },
  { id: 'clothing', name: 'Clothing', icon: 'shirt' },
  { id: 'restroom', name: 'Restroom & Purification', icon: 'water' },
  { id: 'home', name: 'Home', icon: 'home' },
  { id: 'mosque', name: 'Mosque & Prayer', icon: 'star' },
  { id: 'prayer', name: 'Inside Prayer', icon: 'pray' },
  { id: 'sleep', name: 'Sleep Issues', icon: 'moon' },
  { id: 'distress', name: 'Distress & Protection', icon: 'shield' },
  { id: 'enemies', name: 'Enemies & Oppression', icon: 'warning' },
  { id: 'debts', name: 'Debts & Difficulties', icon: 'card' },
  { id: 'family', name: 'Family & Marriage', icon: 'people' },
  { id: 'illness', name: 'Illness & Death', icon: 'medical' },
  { id: 'weather', name: 'Weather & Celestial', icon: 'cloud' },
  { id: 'eating', name: 'Eating & Drinking', icon: 'restaurant' },
  { id: 'social', name: 'Social Etiquette', icon: 'chatbubbles' },
  { id: 'travel', name: 'Travel & Transport', icon: 'car' },
  { id: 'hajj', name: 'Hajj & Umrah', icon: 'location' },
  { id: 'miscellaneous', name: 'Miscellaneous', icon: 'ellipsis-horizontal' },
  { id: 'quranic', name: 'Quranic Supplications', icon: 'library' },
];

export const ZIKR_SERIES: ZikrSeries[] = [
  {
    id: '1',
    title: 'Daily Supplications',
    description: 'Essential daily prayers for various occasions throughout the day',
    categories: ['daily'],
    icon: 'star',
    subcategories: [
      {
        id: '1-importance',
        name: 'The Importance of Daily Supplications',
        description: 'Understanding the significance of daily prayers in Islamic life',
        icon: 'information-circle',
        category: 'daily',
        duas: []
      },
      {
        id: '1-wakeup',
        name: 'Wakeup Supplications',
        description: 'Supplications for waking up and starting the day',
        icon: 'sunny-outline',
        category: 'waking',
        duas: [
          {
            id: '1-1-1',
            title: 'Upon Waking Up',
            arabic: 'الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
            transliteration: "Alhamdu lillaahil-lathee 'ahyaanaa ba'da maa 'amaatanaa wa'ilayhin-nushoor",
            translation: 'Praise is to Allah Who gives us life after He has caused us to die and to Him is the return.',
            category: 'all',
            occasion: 'Wake up',
            reference: 'Al-Bukhari, cf. Al-Asqalani, Fathul-Bari 11/113; Muslim 4/2083',
            repetitions: 1
          }
        ]
      },
      {
        id: '1-morning',
        name: 'Morning Supplications',
        description: 'Supplications for the morning time',
        icon: 'sunny',
        category: 'morning',
        duas: []
      },
      {
        id: '1-evening',
        name: 'Evening Supplications',
        description: 'Supplications for the evening time',
        icon: 'moon',
        category: 'evening',
        duas: []
      },
      {
        id: '1-bedtime',
        name: 'Bedtime Supplications',
        description: 'Supplications for before sleep',
        icon: 'bed',
        category: 'sleep',
        duas: []
      }
    ]
  },

  {
    id: '2',
    title: 'Hadith-based Supplications',
    description: 'Supplications derived from authentic Hadith traditions',
    categories: ['hadith'],
    icon: 'book',
    subcategories: [
      {
        id: '2-1',
        name: 'The Importance of Hadith-based Supplications',
        description: 'Understanding the significance of prophetic supplications',
        icon: 'information-circle',
        category: 'hadith',
        duas: []
      },
      {
        id: '2-2',
        name: 'Virtues & General Remembrance',
        description: 'The virtue and excellence of remembering Allah',
        icon: 'heart',
        category: 'hadith',
        duas: [
          {
            id: '2-2-1',
            title: 'The Virtue of Remembering Allah',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'General remembrance',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-2-2',
            title: 'The excellence of remembering Allah',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'General remembrance',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-2-3',
            title: 'The excellence of asking for Allah\'s blessings upon the Prophet (ﷺ)',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'General remembrance',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-2-4',
            title: 'How the Prophet (ﷺ) glorified Allah',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'General remembrance',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-2-5',
            title: 'Types of goodness and good etiquette for community life',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'General remembrance',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-2-6',
            title: 'For seeking Allah\'s counsel (Istikharah)',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'General remembrance',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-3',
        name: 'Clothing',
        description: 'Supplications related to dressing and clothing',
        icon: 'shirt',
        category: 'hadith',
        duas: [
          {
            id: '2-3-1',
            title: 'When getting dressed',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Clothing',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-3-2',
            title: 'When putting on new clothes',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Clothing',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-3-3',
            title: 'For someone who has put on new clothes',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Clothing',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-3-4',
            title: 'Before undressing',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Clothing',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-4',
        name: 'Restroom & Purification',
        description: 'Supplications for restroom and purification',
        icon: 'water',
        category: 'hadith',
        duas: [
          {
            id: '2-4-1',
            title: 'Before entering the restroom',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Restroom',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-4-2',
            title: 'After leaving the restroom',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Restroom',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-4-3',
            title: 'Before performing ablution',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Purification',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-4-4',
            title: 'Upon completing ablution',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Purification',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-5',
        name: 'Home',
        description: 'Supplications for entering and leaving home',
        icon: 'home',
        category: 'hadith',
        duas: [
          {
            id: '2-5-1',
            title: 'When leaving the home',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Home',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-5-2',
            title: 'Upon entering the home',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Home',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-6',
        name: 'Mosque & Prayer Call (Athan)',
        description: 'Supplications related to mosque and prayer call',
        icon: 'star',
        category: 'hadith',
        duas: [
          {
            id: '2-6-1',
            title: 'When going to the mosque',
            arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُوراً، وَفِي لِسَانِي نُوراً، وَفِي سَمْعِي نُوراً، وَفِي بَصَرِي نُوراً، وَمِنْ فَوقِي نُوراً، وَمِنْ تَحْتِِي نُوراً، وَعَنْ يَمِينِي نُوراً، وَعَنْ شِمَالِي نُوراً، وَمِن أَمَامِي نُوراً، وَمِنْ خَلْفِِي نُوراً، وَاجْعَلْ فِي نَفْسِي نُوراً، وَأَعْظِمْ لِي نُوراً، وَعَظِّمْ لِي نُوراً، وِاجْعَلْ لِي نُوراً، وَاجْعَلْنِي نُوراً، اللَّهُمَّ أَعْطِنِي نُوراً، وَاجْعَلْ فِي عَصَبِي نُوراً، وَفِي لَحْمِي نُوراً، وَفِي دَمِي نُوراً، وَفِي شَعْرِي نُوراً، وَفِي بَشَرِي نُوراً،" ["اللَّهُمَّ اجْعَلْ لِي نُوراً فِي قَبْرِي.. وَنُوراً فِي عِظَامِي"] ["وَزِدْنِي نُوراً، وَزِدْنِي نُوراً، وَزِدْنِي نُوراً"] ["وَهَبْ لِي نُوراً عَلَى نُورٍ"].',
            transliteration: "Allaahummaj'al fee qalbee nooran, wa fee lisaaanee nooran, wa fee sam'ee nooran, wa fee basaree nooran, wa min fawqee nooran, wa min tahtee nooran, wa 'an yameenee nooran, wa 'an shimaalee nooran, wa min 'amaamee nooran, wa min khalfee nooran, waj'al fee nafsee nooran, wa 'a'dhim lee nooran, wa 'adhdhim lee nooran, waj'al lee nooran, waj'alnee nooran, Allaahumma 'a'tinee nooran, waj'al fee 'asabee nooran, wa fee lahmee nooran, wa fee damee nooran, wa fee sha'ree nooran, wa fee basharee nooran. [Allaahummaj'al lee nooran fee qabree wa nooran fee 'idhaamee.] [Wa zidnee nooran, wa zidnee nooran, wa zidnee nooran.] [Wa hab lee nooran 'alaa noor.]",
            translation: 'O Allah, place light in my heart, and on my tongue light, and in my ears light and in my sight light, and above me light, and below me light, and to my right light, and to my left light, and before me light and behind me light. Place in my soul light. Magnify for me light, and amplify for me light. Make for me light and make me a light. O Allah, grant me light, and place light in my nerves, and in my body light and in my blood light and in my hair light and in my skin light. [O Allah, make for me a light in my grave... and a light in my bones.] [Increase me in light, increase me in light, increase me in light.] [Grant me light upon light.]',
            category: 'hadith',
            occasion: 'Going to the mosque',
            reference: 'Al-Bukhari 11/116, Muslim 1/526, 529-530',
            fullReference: 'This supplication is reported in Al-Bukhari 11/116 (Hadith no. 6316) and Muslim 1/526, 529-530 (Hadith no. 763) on the authority of Ibn Abbas (may Allah be pleased with him). The Prophet (peace be upon him) would recite this dua when going to the mosque, asking Allah for light in every aspect of his being and surroundings. Additional narrations are found in At-Tirmithi 5/483 (Hadith no. 3419), Al-Bukhari in Al-Adab Al-Mufrad (Hadith no. 695), and authenticated by Al-Albani in Sahih Al-Adab Al-Mufrad (no. 536). This invocation emphasizes seeking Allah\'s guidance, protection, and spiritual illumination in all matters.',
            repetitions: 1
          },
          {
            id: '2-6-2',
            title: 'Upon entering the mosque',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Mosque',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-6-3',
            title: 'Upon leaving the mosque',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Mosque',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-6-4',
            title: 'When hearing the Athan',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Athan',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-7',
        name: 'Inside the Prayer (Salah)',
        description: 'Supplications during different positions of prayer',
        icon: 'pray',
        category: 'hadith',
        duas: [
          {
            id: '2-7-1',
            title: 'At beginning of the prayer (after takbeer)',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-2',
            title: 'While bowing (Ruku)',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-3',
            title: 'Upon rising from the bowing position',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-4',
            title: 'During prostration (Sujood)',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-5',
            title: 'While sitting between two prostrations',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-6',
            title: 'The Tashahhud (sitting in prayer)',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-7',
            title: 'Prayers upon the Prophet ﷺ after the tashahhud',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-8',
            title: 'After the final Tashahhud and before ending the prayer',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-9',
            title: 'When afflicted by Satan whisperings in prayer or Quran recitation',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-10',
            title: 'What to say after completing the prayer',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-11',
            title: 'Invocations for Qunut in Witr (Night Prayer)',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-7-12',
            title: 'Immediately following the Witr prayer',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Prayer',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-8',
        name: 'Sleep Issues',
        description: 'Supplications for sleep-related difficulties',
        icon: 'moon',
        category: 'hadith',
        duas: [
          {
            id: '2-8-1',
            title: 'When tossing and turning during the night',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Sleep',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-8-2',
            title: 'Upon experiencing unrest, fear, apprehensiveness before or during sleep',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Sleep',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-8-3',
            title: 'Upon seeing a good dream or a bad dream',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Sleep',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-9',
        name: 'Distress, Trials & Protection',
        description: 'Supplications for times of difficulty and seeking protection',
        icon: 'shield',
        category: 'hadith',
        duas: [
          {
            id: '2-9-1',
            title: 'In times of worry and grief',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Distress',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-2',
            title: 'In times of distress',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Distress',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-3',
            title: 'When tragedy strikes',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Distress',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-4',
            title: 'When you find something becoming difficult for you',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Distress',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-5',
            title: 'Upon committing a sin',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Distress',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-6',
            title: 'For expelling the devil and his whisperings',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Protection',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-7',
            title: 'For fear of Shirk',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Protection',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-8',
            title: 'When something you dislike happens or when you fail to achieve something',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Distress',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-9',
            title: 'When angry',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Distress',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-10',
            title: 'When startled',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Distress',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-11',
            title: 'When in fear of afflicting something with evil eye',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Protection',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-12',
            title: 'To ward off the plot of the rebellious devils',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Protection',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-13',
            title: 'Repentance and seeking forgiveness',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Repentance',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-9-14',
            title: 'When having doubts about the faith',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Protection',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-10',
        name: 'Enemies, Oppression & Harm',
        description: 'Protection from enemies and harmful people',
        icon: 'warning',
        category: 'hadith',
        duas: [
          {
            id: '2-10-1',
            title: 'Upon encountering an enemy or those of authority',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Enemies',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-10-2',
            title: 'When afraid of the ruler\'s injustice',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Enemies',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-10-3',
            title: 'Against enemies',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Enemies',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-10-4',
            title: 'What to say if you fear people may harm you',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Enemies',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-11',
        name: 'Debts & Worldly Difficulties',
        description: 'Supplications for financial and worldly problems',
        icon: 'card',
        category: 'hadith',
        duas: [
          {
            id: '2-11-1',
            title: 'For the settling of a debt',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Debts',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-12',
        name: 'Family, Marriage & Intimacy',
        description: 'Supplications for family life and marriage',
        icon: 'people',
        category: 'hadith',
        duas: [
          {
            id: '2-12-1',
            title: 'Congratulation on the occasion of a birth and its reply',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Family',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-12-2',
            title: 'How to seek Allah\'s protection for children',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Family',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-12-3',
            title: 'To the newlywed',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Family',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-12-4',
            title: 'On the wedding night or when buying an animal',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Family',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-12-5',
            title: 'Before intercourse',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Family',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-13',
        name: 'Illness, Death & Funeral Rites',
        description: 'Supplications for illness, death, and funeral rites',
        icon: 'medical',
        category: 'hadith',
        duas: [
          {
            id: '2-13-1',
            title: 'When visiting the sick',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Illness',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-2',
            title: 'The reward for visiting the sick',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Illness',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-3',
            title: 'When having terminal illness',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Illness',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-4',
            title: 'Instruction for the one nearing death',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Death',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-5',
            title: 'When closing the eyes of the deceased',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Death',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-6',
            title: 'For the deceased at the funeral prayer',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Death',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-7',
            title: 'For the deceased child in the funeral prayer',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Death',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-8',
            title: 'Condolence',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Death',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-9',
            title: 'When placing the deceased in the grave',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Death',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-10',
            title: 'After burying the deceased',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Death',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-13-11',
            title: 'When visiting the graves',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Death',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-14',
        name: 'Weather & Celestial Phenomena',
        description: 'Supplications for weather and celestial events',
        icon: 'cloud',
        category: 'hadith',
        duas: [
          {
            id: '2-14-1',
            title: 'When the wind blows',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Weather',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-14-2',
            title: 'When it thunders',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Weather',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-14-3',
            title: 'For rainfall',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Weather',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-14-4',
            title: 'During rainfall',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Weather',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-14-5',
            title: 'After rainfall',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Weather',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-14-6',
            title: 'Asking for clear skies',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Weather',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-14-7',
            title: 'Upon sighting the crescent moon',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Weather',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-15',
        name: 'Eating, Drinking & Fasting',
        description: 'Supplications for meals and fasting',
        icon: 'restaurant',
        category: 'hadith',
        duas: [
          {
            id: '2-15-1',
            title: 'Before eating',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Eating',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-15-2',
            title: 'After eating',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Eating',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-15-3',
            title: 'Of the guest for the host',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Eating',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-15-4',
            title: 'When someone gives you food or drink',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Eating',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-15-5',
            title: 'When breaking fast in someone\'s home',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Fasting',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-15-6',
            title: 'When someone offers you food when you are fasting (which you decline)',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Fasting',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-15-7',
            title: 'Upon breaking fast',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Fasting',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-15-8',
            title: 'When insulted while fasting',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Fasting',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-15-9',
            title: 'Upon seeing the early or premature fruit',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Eating',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-16',
        name: 'Social Etiquette & Interactions',
        description: 'Islamic manners and social interactions',
        icon: 'chatbubbles',
        category: 'hadith',
        duas: [
          {
            id: '2-16-1',
            title: 'Upon sneezing',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-2',
            title: 'When a disbeliever praises Allah after sneezing',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-3',
            title: 'The excellence of spreading the Islamic greeting',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-4',
            title: 'Returning a greeting to a disbeliever',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-5',
            title: 'Returning an invocation of forgiveness',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-6',
            title: 'When someone does good to you',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-7',
            title: 'To one who pronounces their love for you, for Allah\'s sake',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-8',
            title: 'To one who has offered you some of their wealth',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-9',
            title: 'To the debtor when his debt is settled',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-10',
            title: 'To someone who says "May Allah bless you"',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-11',
            title: 'At a sitting or gathering',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-12',
            title: 'For the expiation of sins, said at the conclusion of a sitting or gathering',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-13',
            title: 'For one you have insulted',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-14',
            title: 'The etiquette of praising a fellow Muslim',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-15',
            title: 'For the one that have been praised',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-16-16',
            title: 'Upon seeing someone in trial or tribulation',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Social',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-entering-home',
        name: 'Upon entering the home',
        description: 'Supplications when returning home',
        icon: 'enter',
        category: 'hadith',
        duas: []
      },
      {
        id: '2-17',
        name: 'Travel, Riding & Commerce',
        description: 'Supplications for travel and transportation',
        icon: 'car',
        category: 'hadith',
        duas: [
          {
            id: '2-17-1',
            title: 'When mounting an animal or any means of transport',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'all',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-17-2',
            title: 'For travel',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-17-3',
            title: 'Upon entering a town or village',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-17-4',
            title: 'When your vehicle stumbles',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-17-5',
            title: 'The traveler for the resident',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-17-6',
            title: 'The resident for the traveler',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-17-7',
            title: 'Glorifying and magnifying Allah during travel',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-17-8',
            title: 'The traveler as dawn approaches',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-17-9',
            title: 'Stopping along the way of a travel',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-17-10',
            title: 'Upon returning from travel',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Travel',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-18',
        name: 'Hajj & Umrah Rites',
        description: 'Supplications for pilgrimage rituals',
        icon: 'location',
        category: 'hadith',
        duas: [
          {
            id: '2-18-1',
            title: 'The pilgrim\'s announcement of his arrival for Hajj or Umrah',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Hajj',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-18-2',
            title: 'Saying "Allahu Akbar" when passing the Black Stone',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Hajj',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-18-3',
            title: 'Between the Yemeni Corner and the Black Stone',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Hajj',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-18-4',
            title: 'While standing at Safa and Marwah',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Hajj',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-18-5',
            title: 'The Day of Arafah',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Hajj',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-18-6',
            title: 'At the sacred area of Muzdalifah',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Hajj',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-18-7',
            title: 'Saying "Allahu Akbar" while stoning the three pillars at Mina',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Hajj',
            reference: '',
            repetitions: 1
          }
        ]
      },
      {
        id: '2-19',
        name: 'Miscellaneous Situations',
        description: 'Various other supplications for different situations',
        icon: 'ellipsis-horizontal',
        category: 'hadith',
        duas: [
          {
            id: '2-19-1',
            title: 'When prostrating due to recitation of the Quran',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-19-2',
            title: 'At times of amazement and that which delights',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-19-3',
            title: 'Upon receiving pleasant news',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-19-4',
            title: 'Upon receiving pleasing or displeasing news',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-19-5',
            title: 'What to say when you feel a pain in your body',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-19-6',
            title: 'When slaughtering or offering a sacrifice',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-19-7',
            title: 'Against evil omens',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-19-8',
            title: 'For Allah\'s protection from the False Messiah',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-19-9',
            title: 'Upon hearing the cock\'s crow or the bray of a donkey',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          },
          {
            id: '2-19-10',
            title: 'Upon hearing a dog barking at night',
            arabic: '',
            transliteration: '',
            translation: '',
            category: 'hadith',
            occasion: 'Miscellaneous',
            reference: '',
            repetitions: 1
          }
        ]
      }
    ]
  },

  {
    id: '3',
    title: 'Quranic Supplications',
    description: 'Supplications from the Quran by various prophets',
    categories: ['quranic'],
    icon: 'library',
    subcategories: [
      {
        id: '3-importance',
        name: 'The importance of Quranic Supplications',
        description: 'Understanding the significance of Quranic duas',
        icon: 'information-circle',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-adam',
        name: 'Prophet Adam',
        description: 'Supplications of Prophet Adam (AS)',
        icon: 'person',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-nooh',
        name: 'Prophet Nooh (Noah)',
        description: 'Supplications of Prophet Noah (AS)',
        icon: 'boat',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-hood',
        name: 'Prophet Hood',
        description: 'Supplications of Prophet Hood (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-ibrahim',
        name: 'Prophet Ibrahim (Abraham)',
        description: 'Supplications of Prophet Abraham (AS)',
        icon: 'star',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-lot',
        name: 'Prophet Lot (Lut)',
        description: 'Supplications of Prophet Lot (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-shuaib',
        name: 'Prophet Shuaib (Jethro)',
        description: 'Supplications of Prophet Shuaib (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-yaqub',
        name: 'Prophet Yaqub (Jacob)',
        description: 'Supplications of Prophet Jacob (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-yusuf',
        name: 'Prophet Yusuf (Joseph)',
        description: 'Supplications of Prophet Joseph (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-ayyub',
        name: 'Prophet Ayyub (Job)',
        description: 'Supplications of Prophet Job (AS)',
        icon: 'medical',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-yunus',
        name: 'Prophet Yunus (Jonah)',
        description: 'Supplications of Prophet Jonah (AS)',
        icon: 'fish',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-musa',
        name: 'Prophet Musa (Moses)',
        description: 'Supplications of Prophet Moses (AS)',
        icon: 'flash',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-dawud',
        name: 'Prophet Dawud (David)',
        description: 'Supplications of Prophet David (AS)',
        icon: 'musical-notes',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-sulaiman',
        name: 'Prophet Sulaiman (Solomon)',
        description: 'Supplications of Prophet Solomon (AS)',
        icon: 'diamond',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-zakariya',
        name: 'Prophet Zakariya (Zechariah)',
        description: 'Supplications of Prophet Zechariah (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-isa',
        name: 'Prophet Isa (Jesus)',
        description: 'Supplications of Prophet Jesus (AS)',
        icon: 'star-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-muhammad',
        name: 'Prophet Muhammad ﷺ',
        description: 'Supplications of Prophet Muhammad (SAW)',
        icon: 'star',
        category: 'quranic',
        duas: []
      },
      {
        id: '3-believers',
        name: 'The Supplication of the Believers',
        description: 'General supplications mentioned in the Quran',
        icon: 'people',
        category: 'quranic',
        duas: []
      }
    ]
  }
];

// Helper function to get all duas from a series (handles both structures)
export function getAllDuasFromSeries(series: ZikrSeries) {
  if (series.subcategories && series.subcategories.length > 0) {
    // Complex series with subcategories
    return series.subcategories.flatMap(subcategory => subcategory.duas);
  } else if (series.duas && series.duas.length > 0) {
    // Simple series with direct duas
    return series.duas;
  }
  return [];
}

// Helper function to check if a series has subcategories
export function hasSubcategories(series: ZikrSeries) {
  return !!(series.subcategories && series.subcategories.length > 0);
}