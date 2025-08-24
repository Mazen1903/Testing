import { ZikrSeries, ZikrCategory, DuaSubcategory, Dua } from '@/shared/types/supplications';

// Zikr Categories
export const ZIKR_CATEGORIES: ZikrCategory[] = [
  { id: 'all', name: 'All', icon: 'apps' },
  { id: 'morning', name: 'Morning', icon: 'sunny' },
  { id: 'evening', name: 'Evening', icon: 'moon' },
  { id: 'daily', name: 'Daily', icon: 'calendar' },
  { id: 'protection', name: 'Protection', icon: 'shield' },
  { id: 'gratitude', name: 'Gratitude', icon: 'heart' },
];

// Sample duas for demonstration
const sampleDuas: Dua[] = [
  {
    id: '1-1',
    title: 'The Virtue of Remembering Allah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Lā ilāha illā Allāhu waḥdahu lā sharīka lahu, lahu al-mulku wa lahu al-ḥamdu, wa huwa ʿalā kulli shay\'in qadīr',
    translation: 'There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things.',
    category: 'Virtues & General Remembrance',
    occasion: 'General remembrance',
    reference: 'Bukhari and Muslim',
    repetitions: 100
  },
  {
    id: '1-2',
    title: 'The Excellence of Remembering Allah',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subḥān Allāhi wa biḥamdih',
    translation: 'Glory be to Allah and praise be to Him.',
    category: 'Virtues & General Remembrance',
    occasion: 'General remembrance',
    reference: 'Bukhari and Muslim',
    fullReference: 'The Prophet (ﷺ) said: "Whoever says \'Glory be to Allah and praise be to Him\' (Subhan Allah wa bihamdihi) a hundred times during the day, his sins are wiped away, even if they are like the foam of the sea." [Bukhari and Muslim]\n\nThis simple yet powerful dhikr carries immense reward. The combination of glorifying Allah (Subhan Allah) while simultaneously praising Him (wa bihamdihi) acknowledges both His perfection and our gratitude. The Prophet (ﷺ) emphasized that even saying this 100 times can lead to complete forgiveness of sins, no matter how numerous they may be.',
    repetitions: 100
  }
];

// Zikr Series with detailed subcategories
export const ZIKR_SERIES: ZikrSeries[] = [
  {
    id: 'hadith-based',
    title: 'Hadith-based Supplications',
    description: 'Authentic supplications from the Quran and Sunnah for every aspect of life',
    categories: ['daily', 'protection', 'gratitude'],
    icon: 'book',
    subcategories: [
      {
        id: 'virtues-general',
        name: 'Virtues & General Remembrance',
        description: 'The virtue of remembering Allah and general dhikr',
        icon: 'star',
        category: 'Virtues & General Remembrance',
        duas: [
          {
            id: '1-1',
            title: 'The Virtue of Remembering Allah',
            arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
            transliteration: 'Lā ilāha illā Allāhu waḥdahu lā sharīka lahu, lahu al-mulku wa lahu al-ḥamdu, wa huwa ʿalā kulli shay\'in qadīr',
            translation: 'There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things.',
            category: 'Virtues & General Remembrance',
            occasion: 'General remembrance',
            reference: 'Bukhari and Muslim',
            repetitions: 100
          },
          {
            id: '1-2',
            title: 'The Excellence of Remembering Allah',
            arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
            transliteration: 'Subḥān Allāhi wa biḥamdih',
            translation: 'Glory be to Allah and praise be to Him.',
            category: 'Virtues & General Remembrance',
            occasion: 'General remembrance',
            reference: 'Bukhari and Muslim',
            fullReference: 'The Prophet (ﷺ) said: "Whoever says \'Glory be to Allah and praise be to Him\' (Subhan Allah wa bihamdihi) a hundred times during the day, his sins are wiped away, even if they are like the foam of the sea." [Bukhari and Muslim]\n\nThis simple yet powerful dhikr carries immense reward. The combination of glorifying Allah (Subhan Allah) while simultaneously praising Him (wa bihamdihi) acknowledges both His perfection and our gratitude. The Prophet (ﷺ) emphasized that even saying this 100 times can lead to complete forgiveness of sins, no matter how numerous they may be.',
            repetitions: 100
          },
          {
            id: '1-3',
            title: 'The Excellence of Asking for Allah\'s Blessings Upon the Prophet (ﷺ)',
            arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
            transliteration: 'Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammadin kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīma innaka ḥamīdun majīd',
            translation: 'O Allah, send prayers upon Muhammad and upon the family of Muhammad as You sent prayers upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.',
            category: 'Virtues & General Remembrance',
            occasion: 'Sending blessings upon the Prophet',
            reference: 'Bukhari and Muslim',
            repetitions: 10
          },
          {
            id: '1-4',
            title: 'How the Prophet (ﷺ) Glorified Allah',
            arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
            transliteration: 'Subḥān Allāhi wal-ḥamdu lillāhi wa lā ilāha illā Allāhu wa Allāhu akbar',
            translation: 'Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest.',
            category: 'Virtues & General Remembrance',
            occasion: 'General glorification',
            reference: 'Muslim',
            repetitions: 25
          },
          {
            id: '1-5',
            title: 'Types of Goodness and Good Etiquette for Community Life',
            arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
            transliteration: 'Rabbanā ātinā fī ad-dunyā ḥasanatan wa fī al-ākhirati ḥasanatan wa qinā ʿadhāb an-nār',
            translation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
            category: 'Virtues & General Remembrance',
            occasion: 'For goodness in this life and the next',
            reference: 'Quran 2:201',
            repetitions: 7
          },
          {
            id: '1-6',
            title: 'For Seeking Allah\'s Counsel (Istikharah)',
            arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
            transliteration: 'Allāhumma innī astakhīruka bi-ʿilmika, wa astaqdiruka bi-qudratika, wa as\'aluka min faḍlika al-ʿaẓīm',
            translation: 'O Allah, I seek Your guidance through Your knowledge, and I seek Your strength through Your power, and I ask You from Your great bounty.',
            category: 'Virtues & General Remembrance',
            occasion: 'When seeking guidance for a decision',
            reference: 'Bukhari',
            repetitions: 1
          }
        ]
      },
      {
        id: 'clothing',
        name: 'Clothing',
        description: 'Supplications related to dressing and clothing',
        icon: 'shirt',
        category: 'Clothing',
        duas: [
          {
            id: '2-1',
            title: 'When Getting Dressed',
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
            transliteration: 'Al-ḥamdu lillāhi alladhī kasānī hādhā ath-thawba wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah',
            translation: 'Praise be to Allah who has clothed me with this garment and provided it for me without any power or strength from me.',
            category: 'Clothing',
            occasion: 'When putting on clothes',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '2-2',
            title: 'When Putting on New Clothes',
            arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ',
            transliteration: 'Allāhumma laka al-ḥamdu anta kasawtanīhi, as\'aluka khayrahu wa khayra mā ṣuniʿa lahu, wa aʿūdhu bika min sharrih wa sharri mā ṣuniʿa lah',
            translation: 'O Allah, praise be to You. You have clothed me with this. I ask You for its good and the good of what it was made for, and I seek refuge in You from its evil and the evil of what it was made for.',
            category: 'Clothing',
            occasion: 'When wearing new clothes',
            reference: 'Abu Dawud, Tirmidhi',
            fullReference: 'This comprehensive dua acknowledges Allah as the provider of clothing while seeking protection from any potential harm. The Prophet (ﷺ) taught us to be grateful for Allah\'s blessings while also seeking His protection from any negative aspects. This reflects the Islamic principle of seeking good while avoiding harm in all aspects of life.',
            repetitions: 1
          },
          {
            id: '2-3',
            title: 'For Someone Who Has Put on New Clothes',
            arabic: 'تُبْلِي وَيُخْلِفُ اللَّهُ تَعَالَى',
            transliteration: 'Tublī wa yukhlifu Allāhu taʿālā',
            translation: 'May you wear it out and may Allah replace it (with something better).',
            category: 'Clothing',
            occasion: 'Blessing someone with new clothes',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '2-4',
            title: 'Before Undressing',
            arabic: 'بِسْمِ اللَّهِ',
            transliteration: 'Bismillāh',
            translation: 'In the name of Allah.',
            category: 'Clothing',
            occasion: 'Before removing clothes',
            reference: 'Tirmidhi',
            repetitions: 1
          }
        ]
      },
      {
        id: 'restroom-purification',
        name: 'Restroom & Purification',
        description: 'Supplications for restroom use and purification',
        icon: 'water',
        category: 'Restroom & Purification',
        duas: [
          {
            id: '3-1',
            title: 'Before Entering the Restroom',
            arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
            transliteration: 'Allāhumma innī aʿūdhu bika min al-khubuthi wal-khabā\'ith',
            translation: 'O Allah, I seek refuge in You from the male and female devils.',
            category: 'Restroom & Purification',
            occasion: 'Before entering the restroom',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '3-2',
            title: 'After Leaving the Restroom',
            arabic: 'غُفْرَانَكَ',
            transliteration: 'Ghufrānak',
            translation: 'I seek Your forgiveness.',
            category: 'Restroom & Purification',
            occasion: 'After leaving the restroom',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '3-3',
            title: 'Before Performing Ablution',
            arabic: 'بِسْمِ اللَّهِ',
            transliteration: 'Bismillāh',
            translation: 'In the name of Allah.',
            category: 'Restroom & Purification',
            occasion: 'Before ablution',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '3-4',
            title: 'Upon Completing Ablution',
            arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
            transliteration: 'Ashhadu an lā ilāha illā Allāhu waḥdahu lā sharīka lahu, wa ashhadu anna Muḥammadan ʿabduhu wa rasūluh',
            translation: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger.',
            category: 'Restroom & Purification',
            occasion: 'After completing ablution',
            reference: 'Muslim',
            repetitions: 1
          }
        ]
      },
      {
        id: 'home',
        name: 'Home',
        description: 'Supplications for entering and leaving the home',
        icon: 'home',
        category: 'Home',
        duas: [
          {
            id: '4-1',
            title: 'When Leaving the Home',
            arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
            transliteration: 'Bismillāh, tawakkaltu ʿalā Allāh, wa lā ḥawla wa lā quwwata illā billāh',
            translation: 'In the name of Allah, I trust in Allah, and there is no power and no strength except with Allah.',
            category: 'Home',
            occasion: 'When leaving home',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '4-2',
            title: 'Upon Entering the Home',
            arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
            transliteration: 'Bismillāhi walajna, wa bismillāhi kharajna, wa ʿalā Allāhi rabbinā tawakkalnā',
            translation: 'In the name of Allah we enter, and in the name of Allah we leave, and upon Allah our Lord we trust.',
            category: 'Home',
            occasion: 'When entering home',
            reference: 'Abu Dawud',
            repetitions: 1
          }
        ]
      },
      {
        id: 'mosque-athan',
        name: 'Mosque & Prayer Call (Athan)',
        description: 'Supplications for mosque visits and responding to the call to prayer',
        icon: 'business',
        category: 'Mosque & Prayer Call',
        duas: [
          {
            id: '5-1',
            title: 'When Going to the Mosque',
            arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا',
            transliteration: 'Allāhumma ijʿal fī qalbī nūran, wa fī lisānī nūran, wa fī samʿī nūran, wa fī baṣarī nūran',
            translation: 'O Allah, place light in my heart, light in my tongue, light in my hearing, and light in my sight.',
            category: 'Mosque & Prayer Call',
            occasion: 'When going to the mosque',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '5-2',
            title: 'Upon Entering the Mosque',
            arabic: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ',
            transliteration: 'Aʿūdhu billāhi al-ʿaẓīm, wa bi-wajhihi al-karīm, wa sulṭānihi al-qadīm, min ash-shayṭāni ar-rajīm',
            translation: 'I seek refuge in Allah the Mighty, in His Noble Face, and in His eternal authority from Satan the accursed.',
            category: 'Mosque & Prayer Call',
            occasion: 'When entering the mosque',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '5-3',
            title: 'Upon Leaving the Mosque',
            arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ',
            transliteration: 'Allāhumma innī as\'aluka min faḍlika wa raḥmatik',
            translation: 'O Allah, I ask You from Your bounty and mercy.',
            category: 'Mosque & Prayer Call',
            occasion: 'When leaving the mosque',
            reference: 'Ibn Majah',
            repetitions: 1
          },
          {
            id: '5-4',
            title: 'When Hearing the Athan',
            arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ',
            transliteration: 'Allāhumma rabba hādhihi ad-daʿwati at-tāmmah, wa aṣ-ṣalāti al-qā\'imah, āti Muḥammadan al-wasīlata wal-faḍīlah',
            translation: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor.',
            category: 'Mosque & Prayer Call',
            occasion: 'After hearing the athan',
            reference: 'Bukhari',
            repetitions: 1
          }
        ]
      },
      {
        id: 'inside-prayer',
        name: 'Inside the Prayer (Salah)',
        description: 'Supplications during different parts of the prayer',
        icon: 'person',
        category: 'Inside the Prayer',
        duas: [
          {
            id: '6-1',
            title: 'At Beginning of the Prayer (After Takbeer)',
            arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
            transliteration: 'Subḥānaka Allāhumma wa biḥamdika, wa tabāraka ismuka, wa taʿālā jadduka, wa lā ilāha ghayruk',
            translation: 'Glory be to You, O Allah, and praise be to You. Blessed is Your name and exalted is Your majesty. There is no god but You.',
            category: 'Inside the Prayer',
            occasion: 'Opening supplication in prayer',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '6-2',
            title: 'While Bowing (Ruku)',
            arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
            transliteration: 'Subḥāna rabbiya al-ʿaẓīm',
            translation: 'Glory be to my Lord, the Most Great.',
            category: 'Inside the Prayer',
            occasion: 'During ruku (bowing)',
            reference: 'Abu Dawud, Ibn Majah',
            repetitions: 3
          },
          {
            id: '6-3',
            title: 'Upon Rising from the Bowing Position',
            arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ',
            transliteration: 'Samiʿa Allāhu liman ḥamidah, rabbanā wa laka al-ḥamd',
            translation: 'Allah hears whoever praises Him. Our Lord, to You belongs all praise.',
            category: 'Inside the Prayer',
            occasion: 'When rising from ruku',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '6-4',
            title: 'During Prostration (Sujood)',
            arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
            transliteration: 'Subḥāna rabbiya al-aʿlā',
            translation: 'Glory be to my Lord, the Most High.',
            category: 'Inside the Prayer',
            occasion: 'During sujood (prostration)',
            reference: 'Abu Dawud, Ibn Majah',
            repetitions: 3
          },
          {
            id: '6-5',
            title: 'While Sitting Between Two Prostrations',
            arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
            transliteration: 'Rabbi ighfir lī, rabbi ighfir lī',
            translation: 'My Lord, forgive me. My Lord, forgive me.',
            category: 'Inside the Prayer',
            occasion: 'Between two prostrations',
            reference: 'Abu Dawud, Ibn Majah',
            repetitions: 2
          },
          {
            id: '6-6',
            title: 'The Tashahhud (Sitting in Prayer)',
            arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
            transliteration: 'At-taḥiyyātu lillāhi wa aṣ-ṣalawātu wa aṭ-ṭayyibāt, as-salāmu ʿalayka ayyuhā an-nabiyyu wa raḥmatu Allāhi wa barakātuh',
            translation: 'All greetings, prayers and pure words are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings.',
            category: 'Inside the Prayer',
            occasion: 'During tashahhud',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          }
        ]
      },
      {
        id: 'sleep-issues',
        name: 'Sleep Issues',
        description: 'Supplications for sleep difficulties and dreams',
        icon: 'moon',
        category: 'Sleep Issues',
        duas: [
          {
            id: '7-1',
            title: 'When Tossing and Turning During the Night',
            arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
            transliteration: 'Lā ilāha illā Allāhu waḥdahu lā sharīka lahu, lahu al-mulku wa lahu al-ḥamdu, wa huwa ʿalā kulli shay\'in qadīr',
            translation: 'There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things.',
            category: 'Sleep Issues',
            occasion: 'When unable to sleep',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: '7-2',
            title: 'Upon Experiencing Unrest, Fear, or Apprehensiveness',
            arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ',
            transliteration: 'Aʿūdhu bi-kalimāti Allāhi at-tāmmāti min ghaḍabihi wa ʿiqābihi, wa sharri ʿibādihi, wa min hamazāti ash-shayāṭīni wa an yaḥḍurūn',
            translation: 'I seek refuge in the perfect words of Allah from His anger and punishment, from the evil of His servants, from the whispers of devils, and from their presence.',
            category: 'Sleep Issues',
            occasion: 'When experiencing fear or unrest',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '7-3',
            title: 'Upon Seeing a Good Dream',
            arabic: 'الْحَمْدُ لِلَّهِ',
            transliteration: 'Al-ḥamdu lillāh',
            translation: 'Praise be to Allah.',
            category: 'Sleep Issues',
            occasion: 'After a good dream',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '7-4',
            title: 'Upon Seeing a Bad Dream',
            arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
            transliteration: 'Aʿūdhu billāhi min ash-shayṭāni ar-rajīm',
            translation: 'I seek refuge in Allah from Satan the accursed.',
            category: 'Sleep Issues',
            occasion: 'After a bad dream',
            reference: 'Bukhari and Muslim',
            repetitions: 3
          }
        ]
      },
      {
        id: 'distress-trials',
        name: 'Distress, Trials & Protection',
        description: 'Supplications for times of difficulty and seeking protection',
        icon: 'shield',
        category: 'Distress & Protection',
        duas: [
          {
            id: '8-1',
            title: 'In Times of Worry and Grief',
            arabic: 'اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ',
            transliteration: 'Allāhumma innī ʿabduka, ibnu ʿabdika, ibnu amatika, nāṣiyatī bi-yadika, māḍin fiyya ḥukmuka, ʿadlun fiyya qaḍā\'uk',
            translation: 'O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand, Your command over me is forever executed and Your decree over me is just.',
            category: 'Distress & Protection',
            occasion: 'When worried or grieved',
            reference: 'Ahmad, Ibn Hibban',
            repetitions: 1
          },
          {
            id: '8-2',
            title: 'In Times of Distress',
            arabic: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
            transliteration: 'Lā ilāha illā Allāhu al-ʿaẓīmu al-ḥalīm, lā ilāha illā Allāhu rabbu al-ʿarshi al-ʿaẓīm, lā ilāha illā Allāhu rabbu as-samāwāti wa rabbu al-arḍi wa rabbu al-ʿarshi al-karīm',
            translation: 'There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the mighty throne. There is no god but Allah, Lord of the heavens and Lord of the earth and Lord of the noble throne.',
            category: 'Distress & Protection',
            occasion: 'During distress',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '8-3',
            title: 'When Tragedy Strikes',
            arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا',
            transliteration: 'Innā lillāhi wa innā ilayhi rājiʿūn, Allāhumma ujurnī fī muṣībatī wa akhlif lī khayran minhā',
            translation: 'Indeed we belong to Allah, and indeed to Him we will return. O Allah, reward me in my affliction and replace it with something better.',
            category: 'Distress & Protection',
            occasion: 'When afflicted by tragedy',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '8-4',
            title: 'Upon Committing a Sin',
            arabic: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
            transliteration: 'Astaghfiru Allāha alladhī lā ilāha illā huwa al-ḥayyu al-qayyūmu wa atūbu ilayh',
            translation: 'I seek forgiveness from Allah, there is no god but He, the Ever-Living, the Self-Sustaining, and I repent to Him.',
            category: 'Distress & Protection',
            occasion: 'After committing a sin',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 3
          }
        ]
      },
      {
        id: 'enemies-oppression',
        name: 'Enemies, Oppression & Harm',
        description: 'Protection from enemies and injustice',
        icon: 'shield-checkmark',
        category: 'Enemies & Oppression',
        duas: [
          {
            id: '9-1',
            title: 'Upon Encountering an Enemy or Those of Authority',
            arabic: 'اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ، وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ',
            transliteration: 'Allāhumma innā najʿaluka fī nuḥūrihim, wa naʿūdhu bika min shurūrihim',
            translation: 'O Allah, we place You before them, and we seek refuge in You from their evil.',
            category: 'Enemies & Oppression',
            occasion: 'When facing enemies',
            reference: 'Abu Dawud, Nasai',
            repetitions: 1
          },
          {
            id: '9-2',
            title: 'When Afraid of the Ruler\'s Injustice',
            arabic: 'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، كُنْ لِي جَارًا مِنْ فُلَانِ بْنِ فُلَانٍ',
            transliteration: 'Allāhumma rabba as-samāwāti as-sabʿi wa rabba al-ʿarshi al-ʿaẓīm, kun lī jāran min fulānin ibn fulān',
            translation: 'O Allah, Lord of the seven heavens and Lord of the mighty throne, be my protector from so-and-so.',
            category: 'Enemies & Oppression',
            occasion: 'When fearing injustice',
            reference: 'Abu Dawud',
            repetitions: 1
          }
        ]
      },
      {
        id: 'debts-worldly',
        name: 'Debts & Worldly Difficulties',
        description: 'Supplications for financial concerns and worldly matters',
        icon: 'card',
        category: 'Debts & Worldly Difficulties',
        duas: [
          {
            id: '10-1',
            title: 'For the Settling of a Debt',
            arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
            transliteration: 'Allāhumma ikfinī bi-ḥalālika ʿan ḥarāmika, wa aghninī bi-faḍlika ʿamman siwāk',
            translation: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.',
            category: 'Debts & Worldly Difficulties',
            occasion: 'When in debt',
            reference: 'Tirmidhi',
            repetitions: 1
          }
        ]
      },
      {
        id: 'family-marriage',
        name: 'Family, Marriage & Intimacy',
        description: 'Supplications for family occasions and relationships',
        icon: 'people',
        category: 'Family & Marriage',
        duas: [
          {
            id: '11-1',
            title: 'Congratulation on the Occasion of a Birth',
            arabic: 'بَارَكَ اللَّهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ',
            transliteration: 'Bāraka Allāhu laka fī al-mawhūbi laka, wa shakarta al-wāhiba, wa balagha ashuddahu, wa ruziqta birrah',
            translation: 'May Allah bless you with His gift to you, may you give thanks to the Giver, may the child reach maturity, and may you be blessed with his righteousness.',
            category: 'Family & Marriage',
            occasion: 'Congratulating on a birth',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '11-2',
            title: 'How to Seek Allah\'s Protection for Children',
            arabic: 'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
            transliteration: 'Uʿīdhukumā bi-kalimāti Allāhi at-tāmmati min kulli shayṭānin wa hāmmah, wa min kulli ʿaynin lāmmah',
            translation: 'I seek protection for you both in the perfect words of Allah from every devil and harmful thing, and from every evil eye.',
            category: 'Family & Marriage',
            occasion: 'Protecting children',
            reference: 'Bukhari',
            repetitions: 1
          }
        ]
      },
      {
        id: 'illness-death',
        name: 'Illness, Death & Funeral Rites',
        description: 'Supplications for times of illness and death',
        icon: 'medical',
        category: 'Illness & Death',
        duas: [
          {
            id: '12-1',
            title: 'When Visiting the Sick',
            arabic: 'لَا بَأْسَ، طَهُورٌ إِنْ شَاءَ اللَّهُ',
            transliteration: 'Lā ba\'s, ṭahūrun in shā\' Allāh',
            translation: 'No harm, it is purification, Allah willing.',
            category: 'Illness & Death',
            occasion: 'When visiting someone who is ill',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: '12-2',
            title: 'When Having Terminal Illness',
            arabic: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَأَلْحِقْنِي بِالرَّفِيقِ الْأَعْلَى',
            transliteration: 'Allāhumma ighfir lī wa irḥamnī wa alḥiqnī bir-rafīqi al-aʿlā',
            translation: 'O Allah, forgive me, have mercy on me, and join me with the highest companions.',
            category: 'Illness & Death',
            occasion: 'During terminal illness',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          }
        ]
      },
      {
        id: 'weather-celestial',
        name: 'Weather & Celestial Phenomena',
        description: 'Supplications for natural phenomena',
        icon: 'partly-sunny',
        category: 'Weather & Celestial',
        duas: [
          {
            id: '13-1',
            title: 'When the Wind Blows',
            arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَخَيْرَ مَا فِيهَا، وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا، وَشَرِّ مَا فِيهَا، وَشَرِّ مَا أُرْسِلَتْ بِهِ',
            transliteration: 'Allāhumma innī as\'aluka khayrahā, wa khayra mā fīhā, wa khayra mā ursilat bih, wa aʿūdhu bika min sharrihā, wa sharri mā fīhā, wa sharri mā ursilat bih',
            translation: 'O Allah, I ask You for its good, the good within it, and the good it was sent with. I seek refuge in You from its evil, the evil within it, and the evil it was sent with.',
            category: 'Weather & Celestial',
            occasion: 'When wind blows',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '13-2',
            title: 'When it Thunders',
            arabic: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ',
            transliteration: 'Subḥāna alladhī yusabbiḥu ar-raʿdu bi-ḥamdihi wal-malā\'ikatu min khīfatih',
            translation: 'Glory be to Him whom thunder glorifies with praise, and the angels too, out of fear of Him.',
            category: 'Weather & Celestial',
            occasion: 'When hearing thunder',
            reference: 'Malik',
            repetitions: 1
          }
        ]
      },
      {
        id: 'eating-drinking',
        name: 'Eating, Drinking & Fasting',
        description: 'Supplications for meals and fasting',
        icon: 'restaurant',
        category: 'Eating & Drinking',
        duas: [
          {
            id: '14-1',
            title: 'Before Eating',
            arabic: 'بِسْمِ اللَّهِ',
            transliteration: 'Bismillāh',
            translation: 'In the name of Allah.',
            category: 'Eating & Drinking',
            occasion: 'Before eating',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '14-2',
            title: 'After Eating',
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
            transliteration: 'Al-ḥamdu lillāhi alladhī aṭʿamanī hādhā wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah',
            translation: 'Praise be to Allah who has fed me this food and provided it for me without any power or strength from me.',
            category: 'Eating & Drinking',
            occasion: 'After eating',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          }
        ]
      },
      {
        id: 'social-etiquette',
        name: 'Social Etiquette & Interactions',
        description: 'Supplications for social situations and interactions',
        icon: 'people-circle',
        category: 'Social Etiquette',
        duas: [
          {
            id: '15-1',
            title: 'Upon Sneezing',
            arabic: 'الْحَمْدُ لِلَّهِ',
            transliteration: 'Al-ḥamdu lillāh',
            translation: 'Praise be to Allah.',
            category: 'Social Etiquette',
            occasion: 'When sneezing',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: '15-2',
            title: 'The Excellence of Spreading the Islamic Greeting',
            arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
            transliteration: 'As-salāmu ʿalaykum wa raḥmatu Allāhi wa barakātuh',
            translation: 'Peace be upon you and the mercy of Allah and His blessings.',
            category: 'Social Etiquette',
            occasion: 'Islamic greeting',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          }
        ]
      },
      {
        id: 'travel-riding',
        name: 'Travel, Riding & Commerce',
        description: 'Supplications for travel and transportation',
        icon: 'car',
        category: 'Travel & Riding',
        duas: [
          {
            id: '16-1',
            title: 'When Mounting an Animal or Any Means of Transport',
            arabic: 'بِسْمِ اللَّهِ، وَالْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
            transliteration: 'Bismillāh, wal-ḥamdu lillāh, subḥāna alladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā la-munqalibūn',
            translation: 'In the name of Allah, and praise be to Allah. Glory be to Him who has subjected this to us, and we could never have it (by our efforts). And indeed we, to our Lord, will surely return.',
            category: 'Travel & Riding',
            occasion: 'When boarding transport',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '16-2',
            title: 'For Travel',
            arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى',
            transliteration: 'Allāhumma innā nas\'aluka fī safarinā hādhā al-birra wat-taqwā, wa min al-ʿamali mā tarḍā',
            translation: 'O Allah, we ask You in this journey of ours for righteousness and piety, and for deeds that are pleasing to You.',
            category: 'Travel & Riding',
            occasion: 'When beginning a journey',
            reference: 'Tirmidhi',
            repetitions: 1
          }
        ]
      },
      {
        id: 'hajj-umrah',
        name: 'Hajj & \'Umrah Rites',
        description: 'Supplications for pilgrimage rituals',
        icon: 'location',
        category: 'Hajj & Umrah',
        duas: [
          {
            id: '17-1',
            title: 'The Pilgrim\'s Announcement (Talbiyah)',
            arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
            transliteration: 'Labbayka Allāhumma labbayk, labbayka lā sharīka laka labbayk, inna al-ḥamda wan-niʿmata laka wal-mulk, lā sharīka lak',
            translation: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, favor and sovereignty belong to You. You have no partner.',
            category: 'Hajj & Umrah',
            occasion: 'During Hajj or Umrah',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '17-2',
            title: 'Between the Yemeni Corner and the Black Stone',
            arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
            transliteration: 'Rabbanā ātinā fī ad-dunyā ḥasanatan wa fī al-ākhirati ḥasanatan wa qinā ʿadhāb an-nār',
            translation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
            category: 'Hajj & Umrah',
            occasion: 'During Tawaf',
            reference: 'Abu Dawud',
            repetitions: 1
          }
        ]
      },
      {
        id: 'miscellaneous',
        name: 'Miscellaneous Situations',
        description: 'Supplications for various other situations',
        icon: 'ellipsis-horizontal',
        category: 'Miscellaneous',
        duas: [
          {
            id: '18-1',
            title: 'When Prostrating Due to Recitation of the Quran',
            arabic: 'سَجَدَ وَجْهِي لِلَّذِي خَلَقَهُ وَصَوَّرَهُ وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ',
            transliteration: 'Sajada wajhī lilladhī khalaqahu wa ṣawwarahu wa shaqqa samʿahu wa baṣarahu bi-ḥawlihi wa quwwatih',
            translation: 'My face has prostrated to the One who created it, fashioned it, and gave it hearing and sight by His power and strength.',
            category: 'Miscellaneous',
            occasion: 'During prostration of recitation',
            reference: 'Tirmidhi',
            repetitions: 1
          },
          {
            id: '18-2',
            title: 'At Times of Amazement and That Which Delights',
            arabic: 'سُبْحَانَ اللَّهِ',
            transliteration: 'Subḥān Allāh',
            translation: 'Glory be to Allah.',
            category: 'Miscellaneous',
            occasion: 'When amazed or delighted',
            reference: 'Abu Dawud',
            repetitions: 1
          }
        ]
      }
    ]
  },
  {
    id: 'morning-evening',
    title: 'Morning & Evening Adhkar',
    description: 'Daily remembrance for morning and evening times',
    categories: ['morning', 'evening', 'daily'],
    icon: 'sunny',
    subcategories: [
      {
        id: 'morning-adhkar',
        name: 'Morning Adhkar',
        description: 'Remembrance to be recited in the morning',
        icon: 'sunny',
        category: 'Morning',
        duas: [
          {
            id: 'm-1',
            title: 'Ayat al-Kursi',
            arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
            transliteration: 'Allāhu lā ilāha illā huwa al-ḥayyu al-qayyūm lā ta\'khudhuhu sinatun wa lā nawm',
            translation: 'Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining. Neither drowsiness overtakes Him nor sleep.',
            category: 'Morning',
            occasion: 'Morning remembrance',
            reference: 'Quran 2:255',
            repetitions: 1
          },
          {
            id: 'm-2',
            title: 'Seeking Allah\'s Protection',
            arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
            transliteration: 'Aʿūdhu billāhi min ash-shayṭāni ar-rajīm',
            translation: 'I seek refuge in Allah from Satan the accursed.',
            category: 'Morning',
            occasion: 'Morning protection',
            reference: 'Abu Dawud',
            repetitions: 3
          }
        ]
      },
      {
        id: 'evening-adhkar',
        name: 'Evening Adhkar',
        description: 'Remembrance to be recited in the evening',
        icon: 'moon',
        category: 'Evening',
        duas: [
          {
            id: 'e-1',
            title: 'Evening Protection',
            arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
            transliteration: 'Amsaynā wa amsā al-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illā Allāhu waḥdahu lā sharīka lah',
            translation: 'We have entered the evening and the kingdom belongs to Allah. Praise be to Allah. There is no god but Allah alone, with no partner.',
            category: 'Evening',
            occasion: 'Evening remembrance',
            reference: 'Muslim',
            repetitions: 1
          }
        ]
      }
    ]
  },
  {
    id: 'protection-fortress',
    title: 'Protection & Spiritual Fortress',
    description: 'Powerful supplications for protection from all forms of harm',
    categories: ['protection', 'daily'],
    icon: 'shield',
    subcategories: [
      {
        id: 'general-protection',
        name: 'General Protection',
        description: 'Comprehensive protection from all harm',
        icon: 'shield-checkmark',
        category: 'Protection',
        duas: [
          {
            id: 'p-1',
            title: 'Surah Al-Falaq',
            arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِنْ شَرِّ مَا خَلَقَ',
            transliteration: 'Qul aʿūdhu bi-rabbi al-falaq min sharri mā khalaq',
            translation: 'Say: I seek refuge in the Lord of daybreak from the evil of what He created.',
            category: 'Protection',
            occasion: 'General protection',
            reference: 'Quran 113:1-2',
            repetitions: 3
          },
          {
            id: 'p-2',
            title: 'Surah An-Nas',
            arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَهِ النَّاسِ',
            transliteration: 'Qul aʿūdhu bi-rabbi an-nās maliki an-nās ilāhi an-nās',
            translation: 'Say: I seek refuge in the Lord of mankind, the King of mankind, the God of mankind.',
            category: 'Protection',
            occasion: 'Protection from evil whispers',
            reference: 'Quran 114:1-3',
            repetitions: 3
          }
        ]
      }
    ]
  },
  {
    id: 'gratitude-praise',
    title: 'Gratitude & Praise',
    description: 'Expressions of thankfulness and praise to Allah',
    categories: ['gratitude', 'daily'],
    icon: 'heart',
    subcategories: [
      {
        id: 'daily-gratitude',
        name: 'Daily Gratitude',
        description: 'Daily expressions of thankfulness',
        icon: 'heart-circle',
        category: 'Gratitude',
        duas: [
          {
            id: 'g-1',
            title: 'General Praise',
            arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
            transliteration: 'Al-ḥamdu lillāhi rabbi al-ʿālamīn',
            translation: 'Praise be to Allah, Lord of all the worlds.',
            category: 'Gratitude',
            occasion: 'General praise',
            reference: 'Quran 1:2',
            repetitions: 10
          }
        ]
      }
    ]
  }
];