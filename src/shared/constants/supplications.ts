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
        id: '2-importance',
        name: 'The Importance of Hadith-based Supplications',
        description: 'Understanding the significance of prophetic supplications',
        icon: 'information-circle',
        category: 'hadith',
        duas: []
      }
    ]
  },

  {
    id: '3',
    title: 'Virtues & General Remembrance',
    description: 'The virtues and excellence of remembering Allah',
    categories: ['virtues'],
    icon: 'heart',
    subcategories: [
      {
        id: '3-virtue',
        name: 'The Virtue of Remembering Allah',
        description: 'Understanding the importance of dhikr',
        icon: 'heart',
        category: 'virtues',
        duas: []
      },
      {
        id: '3-excellence',
        name: 'The excellence of remembering Allah',
        description: 'The benefits and rewards of constant remembrance',
        icon: 'star',
        category: 'virtues',
        duas: []
      },
      {
        id: '3-blessings',
        name: 'The excellence of asking for Allah\'s blessings upon the Prophet (ﷺ)',
        description: 'The importance of sending salawat',
        icon: 'heart-outline',
        category: 'virtues',
        duas: []
      },
      {
        id: '3-glorification',
        name: 'How the Prophet (ﷺ) glorified Allah',
        description: 'Learning from the Prophet\'s way of praising Allah',
        icon: 'star-outline',
        category: 'virtues',
        duas: []
      },
      {
        id: '3-goodness',
        name: 'Types of goodness and good etiquette for community life',
        description: 'Islamic manners and community ethics',
        icon: 'people',
        category: 'virtues',
        duas: []
      },
      {
        id: '3-istikharah',
        name: 'For seeking Allah\'s counsel (Istikharah)',
        description: 'Prayer for guidance in decision making',
        icon: 'compass',
        category: 'virtues',
        duas: []
      }
    ]
  },

  {
    id: '4',
    title: 'Clothing',
    description: 'Supplications related to dressing and clothing',
    categories: ['clothing'],
    icon: 'shirt',
    subcategories: [
      {
        id: '4-dressing',
        name: 'When getting dressed',
        description: 'Prayers when putting on clothes',
        icon: 'shirt',
        category: 'clothing',
        duas: []
      },
      {
        id: '4-new-clothes',
        name: 'When putting on new clothes',
        description: 'Supplications for new garments',
        icon: 'gift',
        category: 'clothing',
        duas: []
      },
      {
        id: '4-for-others',
        name: 'For someone who has put on new clothes',
        description: 'Prayers for others wearing new clothes',
        icon: 'people',
        category: 'clothing',
        duas: []
      },
      {
        id: '4-undressing',
        name: 'Before undressing',
        description: 'Supplications before removing clothes',
        icon: 'eye-off',
        category: 'clothing',
        duas: []
      }
    ]
  },

  {
    id: '5',
    title: 'Restroom & Purification',
    description: 'Supplications for restroom use and purification',
    categories: ['restroom'],
    icon: 'water',
    subcategories: [
      {
        id: '5-entering',
        name: 'Before entering the restroom',
        description: 'Prayer before entering the toilet',
        icon: 'enter',
        category: 'restroom',
        duas: []
      },
      {
        id: '5-leaving',
        name: 'After leaving the restroom',
        description: 'Prayer after leaving the toilet',
        icon: 'exit',
        category: 'restroom',
        duas: []
      },
      {
        id: '5-before-wudu',
        name: 'Before performing ablution',
        description: 'Supplications before wudu',
        icon: 'water',
        category: 'restroom',
        duas: []
      },
      {
        id: '5-after-wudu',
        name: 'Upon completing ablution',
        description: 'Prayers after completing wudu',
        icon: 'checkmark-circle',
        category: 'restroom',
        duas: []
      }
    ]
  },

  {
    id: '6',
    title: 'Home',
    description: 'Supplications for entering and leaving the home',
    categories: ['home'],
    icon: 'home',
    subcategories: [
      {
        id: '6-leaving',
        name: 'When leaving the home',
        description: 'Prayers when going out',
        icon: 'exit',
        category: 'home',
        duas: []
      },
      {
        id: '6-entering',
        name: 'Upon entering the home',
        description: 'Supplications when returning home',
        icon: 'enter',
        category: 'home',
        duas: []
      }
    ]
  },

  {
    id: '7',
    title: 'Mosque & Prayer Call (Athan)',
    description: 'Supplications related to mosque and prayer call',
    categories: ['mosque'],
    icon: 'star',
    subcategories: [
      {
        id: '7-going',
        name: 'When going to the mosque',
        description: 'Prayers while traveling to the mosque',
        icon: 'walk',
        category: 'mosque',
        duas: [
          {
            id: '2-1-1',
            title: 'Invocation',
            arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُوراً، وَفِي لِسَانِي نُوراً، وَفِي سَمْعِي نُوراً، وَفِي بَصَرِي نُوراً، وَمِنْ فَوقِي نُوراً، وَمِنْ تَحْتِِي نُوراً، وَعَنْ يَمِينِي نُوراً، وَعَنْ شِمَالِي نُوراً، وَمِن أَمَامِي نُوراً، وَمِنْ خَلْفِِي نُوراً، وَاجْعَلْ فِي نَفْسِي نُوراً، وَأَعْظِمْ لِي نُوراً، وَعَظِّمْ لِي نُوراً، وِاجْعَلْ لِي نُوراً، وَاجْعَلْنِي نُوراً، اللَّهُمَّ أَعْطِنِي نُوراً، وَاجْعَلْ فِي عَصَبِي نُوراً، وَفِي لَحْمِي نُوراً، وَفِي دَمِي نُوراً، وَفِي شَعْرِي نُوراً، وَفِي بَشَرِي نُوراً،" ["اللَّهُمَّ اجْعَلْ لِي نُوراً فِي قَبْرِي.. وَنُوراً فِي عِظَامِي"] ["وَزِدْنِي نُوراً، وَزِدْنِي نُوراً، وَزِدْنِي نُوراً"] ["وَهَبْ لِي نُوراً عَلَى نُورٍ"].',
            transliteration: "Allaahummaj'al fee qalbee nooran, wa fee lisaaanee nooran, wa fee sam'ee nooran, wa fee basaree nooran, wa min fawqee nooran, wa min tahtee nooran, wa 'an yameenee nooran, wa 'an shimaalee nooran, wa min 'amaamee nooran, wa min khalfee nooran, waj'al fee nafsee nooran, wa 'a'dhim lee nooran, wa 'adhdhim lee nooran, waj'al lee nooran, waj'alnee nooran, Allaahumma 'a'tinee nooran, waj'al fee 'asabee nooran, wa fee lahmee nooran, wa fee damee nooran, wa fee sha'ree nooran, wa fee basharee nooran. [Allaahummaj'al lee nooran fee qabree wa nooran fee 'idhaamee.] [Wa zidnee nooran, wa zidnee nooran, wa zidnee nooran.] [Wa hab lee nooran 'alaa noor.]",
            translation: 'O Allah, place light in my heart, and on my tongue light, and in my ears light and in my sight light, and above me light, and below me light, and to my right light, and to my left light, and before me light and behind me light. Place in my soul light. Magnify for me light, and amplify for me light. Make for me light and make me a light. O Allah, grant me light, and place light in my nerves, and in my body light and in my blood light and in my hair light and in my skin light. [O Allah, make for me a light in my grave... and a light in my bones.] [Increase me in light, increase me in light, increase me in light.] [Grant me light upon light.]',
            category: 'all',
            occasion: 'Going to the mosque',
            reference: 'Al-Bukhari 11/116, Muslim 1/526, 529-530',
            fullReference: 'This supplication is reported in Al-Bukhari 11/116 (Hadith no. 6316) and Muslim 1/526, 529-530 (Hadith no. 763) on the authority of Ibn Abbas (may Allah be pleased with him). The Prophet (peace be upon him) would recite this dua when going to the mosque, asking Allah for light in every aspect of his being and surroundings. Additional narrations are found in At-Tirmithi 5/483 (Hadith no. 3419), Al-Bukhari in Al-Adab Al-Mufrad (Hadith no. 695), and authenticated by Al-Albani in Sahih Al-Adab Al-Mufrad (no. 536). This invocation emphasizes seeking Allah\'s guidance, protection, and spiritual illumination in all matters.',
            repetitions: 1
          }
        ]
      },
      {
        id: '7-entering',
        name: 'Upon entering the mosque',
        description: 'Prayers when entering the mosque',
        icon: 'enter',
        category: 'mosque',
        duas: []
      },
      {
        id: '7-leaving',
        name: 'Upon leaving the mosque',
        description: 'Supplications when leaving the mosque',
        icon: 'exit',
        category: 'mosque',
        duas: []
      },
      {
        id: '7-athan',
        name: 'When hearing the Athan',
        description: 'Responses to the call to prayer',
        icon: 'volume-high',
        category: 'mosque',
        duas: []
      }
    ]
  },

  {
    id: '8',
    title: 'Inside the Prayer (Salah)',
    description: 'Supplications during different parts of the prayer',
    categories: ['prayer'],
    icon: 'pray',
    subcategories: [
      {
        id: '8-beginning',
        name: 'At beginning of the prayer (after takbeer)',
        description: 'Opening supplications in prayer',
        icon: 'play',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-ruku',
        name: 'While bowing (Ruku)',
        description: 'Dhikr during ruku position',
        icon: 'arrow-down',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-rising',
        name: 'Upon rising from the bowing position',
        description: 'Supplications when standing from ruku',
        icon: 'arrow-up',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-sujood',
        name: 'During prostration (Sujood)',
        description: 'Dhikr during prostration',
        icon: 'arrow-down-circle',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-sitting',
        name: 'While sitting between two prostrations',
        description: 'Supplications between sujood',
        icon: 'pause',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-tashahhud',
        name: 'The Tashahhud (sitting in prayer)',
        description: 'The testimony recited while sitting',
        icon: 'hand-right',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-salawat',
        name: 'Prayers upon the Prophet ﷺ after the tashahhud',
        description: 'Sending blessings upon the Prophet',
        icon: 'heart',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-final',
        name: 'After the final Tashahhud and before ending the prayer',
        description: 'Final supplications before salam',
        icon: 'checkmark-circle',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-whispers',
        name: 'When afflicted by Satan whisperings in prayer or Quran recitation',
        description: 'Protection from satanic whispers',
        icon: 'shield',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-after',
        name: 'What to say after completing the prayer',
        description: 'Post-prayer supplications',
        icon: 'checkmark-done',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-qunut',
        name: 'Invocations for Qunut in Witr (Night Prayer)',
        description: 'Special supplications for witr prayer',
        icon: 'moon',
        category: 'prayer',
        duas: []
      },
      {
        id: '8-witr',
        name: 'Immediately following the Witr prayer',
        description: 'After witr prayer supplications',
        icon: 'moon-outline',
        category: 'prayer',
        duas: []
      }
    ]
  },

  {
    id: '9',
    title: 'Sleep Issues',
    description: 'Supplications for sleep-related concerns',
    categories: ['sleep'],
    icon: 'moon',
    subcategories: [
      {
        id: '9-tossing',
        name: 'When tossing and turning during the night',
        description: 'For restless nights',
        icon: 'refresh',
        category: 'sleep',
        duas: []
      },
      {
        id: '9-unrest',
        name: 'Upon experiencing unrest, fear, apprehensiveness before or during sleep',
        description: 'For anxiety and fear at bedtime',
        icon: 'shield',
        category: 'sleep',
        duas: []
      },
      {
        id: '9-dreams',
        name: 'Upon seeing a good dream or a bad dream',
        description: 'Responses to dreams',
        icon: 'cloud',
        category: 'sleep',
        duas: []
      }
    ]
  },

  {
    id: '10',
    title: 'Distress, Trials & Protection',
    description: 'Supplications for difficult times and seeking protection',
    categories: ['distress'],
    icon: 'shield',
    subcategories: [
      {
        id: '10-worry',
        name: 'In times of worry and grief',
        description: 'For anxiety and sadness',
        icon: 'sad',
        category: 'distress',
        duas: []
      },
      {
        id: '10-distress',
        name: 'In times of distress',
        description: 'For overwhelming difficulties',
        icon: 'alert-circle',
        category: 'distress',
        duas: []
      },
      {
        id: '10-tragedy',
        name: 'When tragedy strikes',
        description: 'For major calamities',
        icon: 'warning',
        category: 'distress',
        duas: []
      },
      {
        id: '10-difficulty',
        name: 'When you find something becoming difficult for you',
        description: 'For challenging situations',
        icon: 'help-circle',
        category: 'distress',
        duas: []
      },
      {
        id: '10-sin',
        name: 'Upon committing a sin',
        description: 'Seeking forgiveness after wrongdoing',
        icon: 'heart-dislike',
        category: 'distress',
        duas: []
      },
      {
        id: '10-devil',
        name: 'For expelling the devil and his whisperings',
        description: 'Protection from satanic influence',
        icon: 'shield-checkmark',
        category: 'distress',
        duas: []
      },
      {
        id: '10-shirk',
        name: 'For fear of Shirk',
        description: 'Protection from associating partners with Allah',
        icon: 'warning-outline',
        category: 'distress',
        duas: []
      },
      {
        id: '10-dislike',
        name: 'When something you dislike happens or when you fail to achieve something',
        description: 'Accepting Allah\'s decree',
        icon: 'thumbs-down',
        category: 'distress',
        duas: []
      },
      {
        id: '10-anger',
        name: 'When angry',
        description: 'Controlling anger through prayer',
        icon: 'flame',
        category: 'distress',
        duas: []
      },
      {
        id: '10-startled',
        name: 'When startled',
        description: 'For sudden fear or shock',
        icon: 'flash',
        category: 'distress',
        duas: []
      },
      {
        id: '10-evil-eye',
        name: 'When in fear of afflicting something with evil eye',
        description: 'Protection from evil eye',
        icon: 'eye',
        category: 'distress',
        duas: []
      },
      {
        id: '10-devils',
        name: 'To ward off the plot of the rebellious devils',
        description: 'Protection from evil plots',
        icon: 'shield',
        category: 'distress',
        duas: []
      },
      {
        id: '10-repentance',
        name: 'Repentance and seeking forgiveness',
        description: 'Tawbah and istighfar',
        icon: 'heart',
        category: 'distress',
        duas: []
      },
      {
        id: '10-doubts',
        name: 'When having doubts about the faith',
        description: 'Strengthening faith and certainty',
        icon: 'help',
        category: 'distress',
        duas: []
      }
    ]
  },

  {
    id: '11',
    title: 'Enemies, Oppression & Harm',
    description: 'Supplications for protection from enemies and oppression',
    categories: ['enemies'],
    icon: 'warning',
    subcategories: [
      {
        id: '11-enemy',
        name: 'Upon encountering an enemy or those of authority',
        description: 'When facing hostile people',
        icon: 'people',
        category: 'enemies',
        duas: []
      },
      {
        id: '11-ruler',
        name: 'When afraid of the ruler\'s injustice',
        description: 'Protection from unjust authority',
        icon: 'shield',
        category: 'enemies',
        duas: []
      },
      {
        id: '11-against',
        name: 'Against enemies',
        description: 'General protection from enemies',
        icon: 'shield-checkmark',
        category: 'enemies',
        duas: []
      },
      {
        id: '11-harm',
        name: 'What to say if you fear people may harm you',
        description: 'Protection from potential harm',
        icon: 'warning-outline',
        category: 'enemies',
        duas: []
      }
    ]
  },

  {
    id: '12',
    title: 'Debts & Worldly Difficulties',
    description: 'Supplications for financial and worldly problems',
    categories: ['debts'],
    icon: 'card',
    subcategories: [
      {
        id: '12-debt',
        name: 'For the settling of a debt',
        description: 'Prayers for financial relief',
        icon: 'card',
        category: 'debts',
        duas: []
      }
    ]
  },

  {
    id: '13',
    title: 'Family, Marriage & Intimacy',
    description: 'Supplications for family life and relationships',
    categories: ['family'],
    icon: 'people',
    subcategories: [
      {
        id: '13-birth',
        name: 'Congratulation on the occasion of a birth and its reply',
        description: 'Prayers for newborns',
        icon: 'happy',
        category: 'family',
        duas: []
      },
      {
        id: '13-children',
        name: 'How to seek Allah\'s protection for children',
        description: 'Protecting children through prayer',
        icon: 'shield',
        category: 'family',
        duas: []
      },
      {
        id: '13-newlywed',
        name: 'To the newlywed',
        description: 'Blessings for newly married couples',
        icon: 'heart',
        category: 'family',
        duas: []
      },
      {
        id: '13-wedding',
        name: 'On the wedding night or when buying an animal',
        description: 'Special occasion prayers',
        icon: 'gift',
        category: 'family',
        duas: []
      },
      {
        id: '13-intimacy',
        name: 'Before intercourse',
        description: 'Prayers for marital intimacy',
        icon: 'heart-outline',
        category: 'family',
        duas: []
      }
    ]
  },

  {
    id: '14',
    title: 'Illness, Death & Funeral Rites',
    description: 'Supplications for sickness, death, and funeral procedures',
    categories: ['illness'],
    icon: 'medical',
    subcategories: [
      {
        id: '14-visiting',
        name: 'When visiting the sick',
        description: 'Prayers when visiting ill people',
        icon: 'medical',
        category: 'illness',
        duas: []
      },
      {
        id: '14-reward',
        name: 'The reward for visiting the sick',
        description: 'Understanding the benefits of visiting the sick',
        icon: 'star',
        category: 'illness',
        duas: []
      },
      {
        id: '14-terminal',
        name: 'When having terminal illness',
        description: 'Prayers for serious illness',
        icon: 'sad',
        category: 'illness',
        duas: []
      },
      {
        id: '14-dying',
        name: 'Instruction for the one nearing death',
        description: 'Guidance for the dying person',
        icon: 'information',
        category: 'illness',
        duas: []
      },
      {
        id: '14-closing-eyes',
        name: 'When closing the eyes of the deceased',
        description: 'Prayer when someone passes away',
        icon: 'eye-off',
        category: 'illness',
        duas: []
      },
      {
        id: '14-funeral',
        name: 'For the deceased at the funeral prayer',
        description: 'Janazah prayer supplications',
        icon: 'flower',
        category: 'illness',
        duas: []
      },
      {
        id: '14-child',
        name: 'For the deceased child in the funeral prayer',
        description: 'Special prayers for deceased children',
        icon: 'heart-outline',
        category: 'illness',
        duas: []
      },
      {
        id: '14-condolence',
        name: 'Condolence',
        description: 'Offering condolences to the bereaved',
        icon: 'hand-left',
        category: 'illness',
        duas: []
      },
      {
        id: '14-grave',
        name: 'When placing the deceased in the grave',
        description: 'Prayers during burial',
        icon: 'location',
        category: 'illness',
        duas: []
      },
      {
        id: '14-after-burial',
        name: 'After burying the deceased',
        description: 'Post-burial supplications',
        icon: 'checkmark',
        category: 'illness',
        duas: []
      },
      {
        id: '14-visiting-graves',
        name: 'When visiting the graves',
        description: 'Prayers when visiting cemetery',
        icon: 'flower-outline',
        category: 'illness',
        duas: []
      }
    ]
  },

  {
    id: '15',
    title: 'Weather & Celestial Phenomena',
    description: 'Supplications for weather and natural phenomena',
    categories: ['weather'],
    icon: 'cloud',
    subcategories: [
      {
        id: '15-wind',
        name: 'When the wind blows',
        description: 'Prayers during windy weather',
        icon: 'leaf',
        category: 'weather',
        duas: []
      },
      {
        id: '15-thunder',
        name: 'When it thunders',
        description: 'Supplications during thunderstorms',
        icon: 'flash',
        category: 'weather',
        duas: []
      },
      {
        id: '15-rain-request',
        name: 'For rainfall',
        description: 'Asking Allah for rain',
        icon: 'cloud-upload',
        category: 'weather',
        duas: []
      },
      {
        id: '15-during-rain',
        name: 'During rainfall',
        description: 'Prayers while it\'s raining',
        icon: 'rainy',
        category: 'weather',
        duas: []
      },
      {
        id: '15-after-rain',
        name: 'After rainfall',
        description: 'Gratitude after rain',
        icon: 'checkmark-circle',
        category: 'weather',
        duas: []
      },
      {
        id: '15-clear-skies',
        name: 'Asking for clear skies',
        description: 'Requesting good weather',
        icon: 'sunny',
        category: 'weather',
        duas: []
      },
      {
        id: '15-moon',
        name: 'Upon sighting the crescent moon',
        description: 'Prayers when seeing the new moon',
        icon: 'moon',
        category: 'weather',
        duas: []
      }
    ]
  },

  {
    id: '16',
    title: 'Eating, Drinking & Fasting',
    description: 'Supplications related to food and fasting',
    categories: ['eating'],
    icon: 'restaurant',
    subcategories: [
      {
        id: '16-before-eating',
        name: 'Before eating',
        description: 'Prayers before meals',
        icon: 'restaurant',
        category: 'eating',
        duas: []
      },
      {
        id: '16-after-eating',
        name: 'After eating',
        description: 'Gratitude after meals',
        icon: 'checkmark-circle',
        category: 'eating',
        duas: []
      },
      {
        id: '16-guest',
        name: 'Of the guest for the host',
        description: 'Guest\'s prayer for the host',
        icon: 'people',
        category: 'eating',
        duas: []
      },
      {
        id: '16-given-food',
        name: 'When someone gives you food or drink',
        description: 'Gratitude for offered food',
        icon: 'gift',
        category: 'eating',
        duas: []
      },
      {
        id: '16-breaking-fast',
        name: 'When breaking fast in someone\'s home',
        description: 'Iftar prayers at others\' homes',
        icon: 'home',
        category: 'eating',
        duas: []
      },
      {
        id: '16-offered-while-fasting',
        name: 'When someone offers you food when you are fasting (which you decline)',
        description: 'Polite decline while fasting',
        icon: 'hand-left',
        category: 'eating',
        duas: []
      },
      {
        id: '16-iftar',
        name: 'Upon breaking fast',
        description: 'Prayers when ending the fast',
        icon: 'time',
        category: 'eating',
        duas: []
      },
      {
        id: '16-insulted-fasting',
        name: 'When insulted while fasting',
        description: 'Response to provocation while fasting',
        icon: 'shield',
        category: 'eating',
        duas: []
      },
      {
        id: '16-early-fruit',
        name: 'Upon seeing the early or premature fruit',
        description: 'Gratitude for seasonal fruits',
        icon: 'leaf',
        category: 'eating',
        duas: []
      }
    ]
  },

  {
    id: '17',
    title: 'Social Etiquette & Interactions',
    description: 'Supplications for social situations and interactions',
    categories: ['social'],
    icon: 'chatbubbles',
    subcategories: [
      {
        id: '17-sneezing',
        name: 'Upon sneezing',
        description: 'Prayers when sneezing',
        icon: 'medical',
        category: 'social',
        duas: []
      },
      {
        id: '17-disbeliever-sneeze',
        name: 'When a disbeliever praises Allah after sneezing',
        description: 'Response to non-Muslim\'s praise',
        icon: 'people',
        category: 'social',
        duas: []
      },
      {
        id: '17-greeting',
        name: 'The excellence of spreading the Islamic greeting',
        description: 'Importance of saying Salam',
        icon: 'hand-right',
        category: 'social',
        duas: []
      },
      {
        id: '17-greeting-disbeliever',
        name: 'Returning a greeting to a disbeliever',
        description: 'How to respond to non-Muslim greetings',
        icon: 'people-outline',
        category: 'social',
        duas: []
      },
      {
        id: '17-forgiveness',
        name: 'Returning an invocation of forgiveness',
        description: 'Responding to requests for forgiveness',
        icon: 'heart',
        category: 'social',
        duas: []
      },
      {
        id: '17-good-deed',
        name: 'When someone does good to you',
        description: 'Gratitude for kindness',
        icon: 'thumbs-up',
        category: 'social',
        duas: []
      },
      {
        id: '17-love',
        name: 'To one who pronounces their love for you, for Allah\'s sake',
        description: 'Response to expressions of love for Allah\'s sake',
        icon: 'heart',
        category: 'social',
        duas: []
      },
      {
        id: '17-wealth',
        name: 'To one who has offered you some of their wealth',
        description: 'Response to financial generosity',
        icon: 'gift',
        category: 'social',
        duas: []
      },
      {
        id: '17-debt-settled',
        name: 'To the debtor when his debt is settled',
        description: 'Prayer when debt is paid off',
        icon: 'checkmark-circle',
        category: 'social',
        duas: []
      },
      {
        id: '17-blessing',
        name: 'To someone who says "May Allah bless you"',
        description: 'Response to blessings',
        icon: 'star',
        category: 'social',
        duas: []
      },
      {
        id: '17-sitting',
        name: 'At a sitting or gathering',
        description: 'Prayers during gatherings',
        icon: 'people',
        category: 'social',
        duas: []
      },
      {
        id: '17-conclusion',
        name: 'For the expiation of sins, said at the conclusion of a sitting or gathering',
        description: 'Closing prayers for gatherings',
        icon: 'checkmark-done',
        category: 'social',
        duas: []
      },
      {
        id: '17-insulted',
        name: 'For one you have insulted',
        description: 'Seeking forgiveness after insulting someone',
        icon: 'sad',
        category: 'social',
        duas: []
      },
      {
        id: '17-praising',
        name: 'The etiquette of praising a fellow Muslim',
        description: 'How to properly praise others',
        icon: 'thumbs-up',
        category: 'social',
        duas: []
      },
      {
        id: '17-praised',
        name: 'For the one that have been praised',
        description: 'Response when being praised',
        icon: 'star-outline',
        category: 'social',
        duas: []
      },
      {
        id: '17-trial',
        name: 'Upon seeing someone in trial or tribulation',
        description: 'Prayer when seeing others in difficulty',
        icon: 'sad-outline',
        category: 'social',
        duas: []
      }
    ]
  },

  {
    id: '18',
    title: 'Travel, Riding & Commerce',
    description: 'Supplications for travel and transportation',
    categories: ['travel'],
    icon: 'car',
    subcategories: [
      {
        id: '18-mounting',
        name: 'When mounting an animal or any means of transport',
        description: 'Prayers before traveling',
        icon: 'car',
        category: 'travel',
        duas: []
      },
      {
        id: '18-travel',
        name: 'For travel',
        description: 'General travel supplications',
        icon: 'airplane',
        category: 'travel',
        duas: []
      },
      {
        id: '18-entering-town',
        name: 'Upon entering a town or village',
        description: 'Prayers when arriving at destination',
        icon: 'location',
        category: 'travel',
        duas: []
      },
      {
        id: '18-stumble',
        name: 'When your vehicle stumbles',
        description: 'Prayers during travel difficulties',
        icon: 'warning',
        category: 'travel',
        duas: []
      },
      {
        id: '18-traveler-resident',
        name: 'The traveler for the resident',
        description: 'Traveler\'s prayer for those at home',
        icon: 'home',
        category: 'travel',
        duas: []
      },
      {
        id: '18-resident-traveler',
        name: 'The resident for the traveler',
        description: 'Home dweller\'s prayer for travelers',
        icon: 'airplane-outline',
        category: 'travel',
        duas: []
      },
      {
        id: '18-glorifying',
        name: 'Glorifying and magnifying Allah during travel',
        description: 'Dhikr while traveling',
        icon: 'star',
        category: 'travel',
        duas: []
      },
      {
        id: '18-dawn',
        name: 'The traveler as dawn approaches',
        description: 'Morning prayers while traveling',
        icon: 'sunny',
        category: 'travel',
        duas: []
      },
      {
        id: '18-stopping',
        name: 'Stopping along the way of a travel',
        description: 'Prayers during travel breaks',
        icon: 'pause',
        category: 'travel',
        duas: []
      },
      {
        id: '18-returning',
        name: 'Upon returning from travel',
        description: 'Gratitude when returning home',
        icon: 'home',
        category: 'travel',
        duas: []
      }
    ]
  },

  {
    id: '19',
    title: 'Hajj & Umrah Rites',
    description: 'Supplications for pilgrimage rituals',
    categories: ['hajj'],
    icon: 'location',
    subcategories: [
      {
        id: '19-announcement',
        name: 'The pilgrim\'s announcement of his arrival for Hajj or \'Umrah',
        description: 'Talbiyah and arrival prayers',
        icon: 'megaphone',
        category: 'hajj',
        duas: []
      },
      {
        id: '19-black-stone',
        name: 'Saying "Allahu Akbar" when passing the Black Stone',
        description: 'Takbir at the Black Stone',
        icon: 'star',
        category: 'hajj',
        duas: []
      },
      {
        id: '19-corners',
        name: 'Between the Yemeni Corner and the Black Stone',
        description: 'Prayers during tawaf',
        icon: 'refresh',
        category: 'hajj',
        duas: []
      },
      {
        id: '19-safa-marwah',
        name: 'While standing at Safa and Marwah',
        description: 'Supplications during sa\'i',
        icon: 'walk',
        category: 'hajj',
        duas: []
      },
      {
        id: '19-arafah',
        name: 'The Day of \'Arafah',
        description: 'Special prayers on the Day of Arafah',
        icon: 'sunny',
        category: 'hajj',
        duas: []
      },
      {
        id: '19-muzdalifah',
        name: 'At the sacred area of Muzdalifah',
        description: 'Prayers at Muzdalifah',
        icon: 'location-outline',
        category: 'hajj',
        duas: []
      },
      {
        id: '19-stoning',
        name: 'Saying "Allahu Akbar" while stoning the three pillars at Mina',
        description: 'Takbir during stoning ritual',
        icon: 'star-outline',
        category: 'hajj',
        duas: []
      }
    ]
  },

  {
    id: '20',
    title: 'Miscellaneous Situations',
    description: 'Supplications for various other situations',
    categories: ['miscellaneous'],
    icon: 'ellipsis-horizontal',
    subcategories: [
      {
        id: '20-prostration',
        name: 'When prostrating due to recitation of the Quran',
        description: 'Sujood at-tilawah supplications',
        icon: 'book',
        category: 'miscellaneous',
        duas: []
      },
      {
        id: '20-amazement',
        name: 'At times of amazement and that which delights',
        description: 'Expressions of wonder and joy',
        icon: 'happy',
        category: 'miscellaneous',
        duas: []
      },
      {
        id: '20-pleasant-news',
        name: 'Upon receiving pleasant news',
        description: 'Gratitude for good news',
        icon: 'checkmark-circle',
        category: 'miscellaneous',
        duas: []
      },
      {
        id: '20-any-news',
        name: 'Upon receiving pleasing or displeasing news',
        description: 'Response to any type of news',
        icon: 'information-circle',
        category: 'miscellaneous',
        duas: []
      },
      {
        id: '20-pain',
        name: 'What to say when you feel a pain in your body',
        description: 'Prayers for physical discomfort',
        icon: 'medical',
        category: 'miscellaneous',
        duas: []
      },
      {
        id: '20-sacrifice',
        name: 'When slaughtering or offering a sacrifice',
        description: 'Prayers during sacrifice',
        icon: 'cut',
        category: 'miscellaneous',
        duas: []
      },
      {
        id: '20-omens',
        name: 'Against evil omens',
        description: 'Protection from superstitions',
        icon: 'shield',
        category: 'miscellaneous',
        duas: []
      },
      {
        id: '20-false-messiah',
        name: 'For Allah\'s protection from the False Messiah',
        description: 'Protection from Dajjal',
        icon: 'shield-checkmark',
        category: 'miscellaneous',
        duas: []
      },
      {
        id: '20-cock-crow',
        name: 'Upon hearing the cock\'s crow or the bray of a donkey',
        description: 'Responses to animal sounds',
        icon: 'volume-high',
        category: 'miscellaneous',
        duas: []
      },
      {
        id: '20-dog-bark',
        name: 'Upon hearing a dog barking at night',
        description: 'Prayer when hearing dogs at night',
        icon: 'moon',
        category: 'miscellaneous',
        duas: []
      }
    ]
  },

  {
    id: '21',
    title: 'Quranic Supplications',
    description: 'Supplications from the Quran by various prophets',
    categories: ['quranic'],
    icon: 'library',
    subcategories: [
      {
        id: '21-importance',
        name: 'The importance of Quranic Supplications',
        description: 'Understanding the significance of Quranic duas',
        icon: 'information-circle',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-adam',
        name: 'Prophet Adam',
        description: 'Supplications of Prophet Adam (AS)',
        icon: 'person',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-nooh',
        name: 'Prophet Nooh (Noah)',
        description: 'Supplications of Prophet Noah (AS)',
        icon: 'boat',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-hood',
        name: 'Prophet Hood',
        description: 'Supplications of Prophet Hood (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-ibrahim',
        name: 'Prophet Ibrahim (Abraham)',
        description: 'Supplications of Prophet Abraham (AS)',
        icon: 'star',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-lot',
        name: 'Prophet Lot (Lut)',
        description: 'Supplications of Prophet Lot (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-shuaib',
        name: 'Prophet Shuaib (Jethro)',
        description: 'Supplications of Prophet Shuaib (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-yaqub',
        name: 'Prophet Yaqub (Jacob)',
        description: 'Supplications of Prophet Jacob (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-yusuf',
        name: 'Prophet Yusuf (Joseph)',
        description: 'Supplications of Prophet Joseph (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-ayyub',
        name: 'Prophet Ayyub (Job)',
        description: 'Supplications of Prophet Job (AS)',
        icon: 'medical',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-yunus',
        name: 'Prophet Yunus (Jonah)',
        description: 'Supplications of Prophet Jonah (AS)',
        icon: 'fish',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-musa',
        name: 'Prophet Musa (Moses)',
        description: 'Supplications of Prophet Moses (AS)',
        icon: 'flash',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-dawud',
        name: 'Prophet Dawud (David)',
        description: 'Supplications of Prophet David (AS)',
        icon: 'musical-notes',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-sulaiman',
        name: 'Prophet Sulaiman (Solomon)',
        description: 'Supplications of Prophet Solomon (AS)',
        icon: 'diamond',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-zakariya',
        name: 'Prophet Zakariya (Zechariah)',
        description: 'Supplications of Prophet Zechariah (AS)',
        icon: 'person-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-isa',
        name: 'Prophet Isa (Jesus)',
        description: 'Supplications of Prophet Jesus (AS)',
        icon: 'star-outline',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-muhammad',
        name: 'Prophet Muhammad ﷺ',
        description: 'Supplications of Prophet Muhammad (SAW)',
        icon: 'star',
        category: 'quranic',
        duas: []
      },
      {
        id: '21-believers',
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