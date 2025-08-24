import { ZikrSeries, ZikrCategory, DuaSubcategory, Dua } from '@/shared/types/supplications';

// Sample duas for demonstration - you can expand these with actual content
const sampleDuas: Dua[] = [
  {
    id: '1-1',
    title: 'The Virtue of Remembering Allah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Lā ilāha illā Allāhu waḥdahu lā sharīka lahu, lahu al-mulku wa lahu al-ḥamdu, wa huwa ʿalā kulli shay\'in qadīr',
    translation: 'There is no deity except Allah, alone, without partner. To Him belongs dominion and to Him belongs praise, and He is over all things competent.',
    category: 'Hadith-based Supplications',
    occasion: 'General remembrance',
    reference: 'Bukhari and Muslim',
    repetitions: 100
  },
  {
    id: '1-2',
    title: 'When Getting Dressed',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: 'Al-ḥamdu lillāhi alladhī kasānī hādhā ath-thawba wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah',
    translation: 'Praise be to Allah who has clothed me with this garment and provided it for me without any power or strength from myself.',
    category: 'Hadith-based Supplications',
    occasion: 'When getting dressed',
    reference: 'Abu Dawud and Tirmidhi',
    repetitions: 1
  }
];

export const ZIKR_CATEGORIES: ZikrCategory[] = [
  { id: 'all', name: 'All Categories', icon: 'apps' },
  { id: 'daily', name: 'Daily Dhikr', icon: 'sunny' },
  { id: 'prayer', name: 'Prayer Times', icon: 'time' },
  { id: 'protection', name: 'Protection', icon: 'shield' },
  { id: 'gratitude', name: 'Gratitude', icon: 'heart' },
];

export const ZIKR_SERIES: ZikrSeries[] = [
  {
    id: 'hadith-supplications',
    title: 'Hadith-based Supplications',
    description: 'Authentic supplications from the Quran and Sunnah for every aspect of daily life',
    categories: ['daily', 'prayer', 'protection'],
    icon: 'book',
    subcategories: [
      {
        id: 'virtues-general',
        name: 'Virtues & General Remembrance',
        description: 'The excellence and virtue of remembering Allah in daily life',
        icon: 'star',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'virtue-1',
            title: 'The Virtue of Remembering Allah',
            arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
            transliteration: 'Lā ilāha illā Allāhu waḥdahu lā sharīka lahu, lahu al-mulku wa lahu al-ḥamdu, wa huwa ʿalā kulli shay\'in qadīr',
            translation: 'There is no deity except Allah, alone, without partner. To Him belongs dominion and to Him belongs praise, and He is over all things competent.',
            category: 'Hadith-based Supplications',
            occasion: 'General remembrance',
            reference: 'Bukhari and Muslim',
            repetitions: 100
          },
          {
            id: 'virtue-2',
            title: 'The Excellence of Remembering Allah',
            arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
            transliteration: 'Subḥān Allāhi wa biḥamdih',
            translation: 'Glory be to Allah and praise be to Him.',
            category: 'Hadith-based Supplications',
            occasion: 'General remembrance',
            reference: 'Bukhari and Muslim',
            repetitions: 100
          },
          {
            id: 'virtue-3',
            title: 'Asking for Allah\'s Blessings upon the Prophet (ﷺ)',
            arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
            transliteration: 'Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammad',
            translation: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad.',
            category: 'Hadith-based Supplications',
            occasion: 'Sending blessings upon the Prophet',
            reference: 'Bukhari and Muslim',
            repetitions: 10
          },
          {
            id: 'virtue-4',
            title: 'How the Prophet (ﷺ) Glorified Allah',
            arabic: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
            transliteration: 'Subḥān Allāh, wa al-ḥamdu lillāh, wa lā ilāha illā Allāh, wa Allāhu akbar',
            translation: 'Glory be to Allah, and praise be to Allah, and there is no deity except Allah, and Allah is greatest.',
            category: 'Hadith-based Supplications',
            occasion: 'General glorification',
            reference: 'Muslim',
            repetitions: 25
          },
          {
            id: 'virtue-5',
            title: 'For Seeking Allah\'s Counsel (Istikharah)',
            arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
            transliteration: 'Allāhumma innī astakhīruka bi ʿilmika, wa astaqdiruka bi qudratika, wa as\'aluka min faḍlika al-ʿaẓīm',
            translation: 'O Allah, I seek Your counsel through Your knowledge, and I seek Your empowerment through Your power, and I ask You from Your immense bounty.',
            category: 'Hadith-based Supplications',
            occasion: 'When seeking guidance',
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
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'clothing-1',
            title: 'When Getting Dressed',
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
            transliteration: 'Al-ḥamdu lillāhi alladhī kasānī hādhā ath-thawba wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah',
            translation: 'Praise be to Allah who has clothed me with this garment and provided it for me without any power or strength from myself.',
            category: 'Hadith-based Supplications',
            occasion: 'When getting dressed',
            reference: 'Abu Dawud and Tirmidhi',
            repetitions: 1
          },
          {
            id: 'clothing-2',
            title: 'When Putting on New Clothes',
            arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ',
            transliteration: 'Allāhumma laka al-ḥamdu anta kasawtanīh, as\'aluka khayrahu wa khayra mā ṣuniʿa lah, wa aʿūdhu bika min sharrih wa sharri mā ṣuniʿa lah',
            translation: 'O Allah, to You belongs all praise. You have clothed me with this. I ask You for its good and the good of what it was made for, and I seek refuge in You from its evil and the evil of what it was made for.',
            category: 'Hadith-based Supplications',
            occasion: 'When putting on new clothes',
            reference: 'Abu Dawud and Tirmidhi',
            repetitions: 1
          },
          {
            id: 'clothing-3',
            title: 'For Someone Who Has Put on New Clothes',
            arabic: 'تُبْلِي وَيُخْلِفُ اللَّهُ تَعَالَى',
            transliteration: 'Tublī wa yukhlifu Allāhu taʿālā',
            translation: 'May you wear it out and Allah replace it (with something better).',
            category: 'Hadith-based Supplications',
            occasion: 'For someone wearing new clothes',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: 'clothing-4',
            title: 'Before Undressing',
            arabic: 'بِسْمِ اللَّهِ',
            transliteration: 'Bismillāh',
            translation: 'In the name of Allah.',
            category: 'Hadith-based Supplications',
            occasion: 'Before undressing',
            reference: 'Tirmidhi',
            repetitions: 1
          }
        ]
      },
      {
        id: 'restroom-purification',
        name: 'Restroom & Purification',
        description: 'Supplications for entering restroom and performing ablution',
        icon: 'water',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'restroom-1',
            title: 'Before Entering the Restroom',
            arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
            transliteration: 'Allāhumma innī aʿūdhu bika min al-khubuthi wa al-khabā\'ith',
            translation: 'O Allah, I seek refuge in You from the male and female devils.',
            category: 'Hadith-based Supplications',
            occasion: 'Before entering restroom',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: 'restroom-2',
            title: 'After Leaving the Restroom',
            arabic: 'غُفْرَانَكَ',
            transliteration: 'Ghufrānak',
            translation: 'I seek Your forgiveness.',
            category: 'Hadith-based Supplications',
            occasion: 'After leaving restroom',
            reference: 'Abu Dawud and Tirmidhi',
            repetitions: 1
          },
          {
            id: 'restroom-3',
            title: 'Before Performing Ablution',
            arabic: 'بِسْمِ اللَّهِ',
            transliteration: 'Bismillāh',
            translation: 'In the name of Allah.',
            category: 'Hadith-based Supplications',
            occasion: 'Before ablution',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: 'restroom-4',
            title: 'Upon Completing Ablution',
            arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
            transliteration: 'Ashhadu an lā ilāha illā Allāhu waḥdahu lā sharīka lah, wa ashhadu anna Muḥammadan ʿabduhu wa rasūluh',
            translation: 'I bear witness that there is no deity except Allah, alone without partner, and I bear witness that Muhammad is His servant and messenger.',
            category: 'Hadith-based Supplications',
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
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'home-1',
            title: 'When Leaving the Home',
            arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
            transliteration: 'Bismillāh, tawakkaltu ʿalā Allāh, wa lā ḥawla wa lā quwwata illā billāh',
            translation: 'In the name of Allah, I place my trust in Allah, and there is no power or strength except with Allah.',
            category: 'Hadith-based Supplications',
            occasion: 'When leaving home',
            reference: 'Abu Dawud and Tirmidhi',
            repetitions: 1
          },
          {
            id: 'home-2',
            title: 'Upon Entering the Home',
            arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
            transliteration: 'Allāhumma innī as\'aluka khayra al-mawlaji wa khayra al-makhraji, bismillāhi walajna, wa bismillāhi kharajna, wa ʿalā Allāhi rabbinā tawakkalnā',
            translation: 'O Allah, I ask You for the best entering and the best exiting. In the name of Allah we enter, and in the name of Allah we exit, and upon Allah our Lord we rely.',
            category: 'Hadith-based Supplications',
            occasion: 'Upon entering home',
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
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'mosque-1',
            title: 'When Going to the Mosque',
            arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا',
            transliteration: 'Allāhumma ijʿal fī qalbī nūran, wa fī lisānī nūran, wa fī samʿī nūran, wa fī baṣarī nūran',
            translation: 'O Allah, place light in my heart, light in my tongue, light in my hearing, and light in my sight.',
            category: 'Hadith-based Supplications',
            occasion: 'When going to mosque',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: 'mosque-2',
            title: 'Upon Entering the Mosque',
            arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
            transliteration: 'Allāhumma iftaḥ lī abwāba raḥmatik',
            translation: 'O Allah, open for me the doors of Your mercy.',
            category: 'Hadith-based Supplications',
            occasion: 'Upon entering mosque',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: 'mosque-3',
            title: 'Upon Leaving the Mosque',
            arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ',
            transliteration: 'Allāhumma innī as\'aluka min faḍlika wa raḥmatik',
            translation: 'O Allah, I ask You from Your bounty and mercy.',
            category: 'Hadith-based Supplications',
            occasion: 'Upon leaving mosque',
            reference: 'Ibn Majah',
            repetitions: 1
          },
          {
            id: 'mosque-4',
            title: 'When Hearing the Athan',
            arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ',
            transliteration: 'Allāhumma rabba hādhihi ad-daʿwati at-tāmmah, wa aṣ-ṣalāti al-qā\'imah, āti Muḥammadan al-wasīlata wa al-faḍīlah',
            translation: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor.',
            category: 'Hadith-based Supplications',
            occasion: 'After hearing athan',
            reference: 'Bukhari',
            repetitions: 1
          }
        ]
      },
      {
        id: 'inside-prayer',
        name: 'Inside the Prayer (Salah)',
        description: 'Supplications to be recited during different parts of the prayer',
        icon: 'person',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'prayer-1',
            title: 'At Beginning of Prayer (After Takbeer)',
            arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
            transliteration: 'Subḥānaka Allāhumma wa biḥamdik, wa tabāraka ismuk, wa taʿālā jadduk, wa lā ilāha ghayruk',
            translation: 'Glory be to You, O Allah, and praise be to You. Blessed is Your name and exalted is Your majesty. There is no deity other than You.',
            category: 'Hadith-based Supplications',
            occasion: 'Opening prayer',
            reference: 'Abu Dawud and Tirmidhi',
            repetitions: 1
          },
          {
            id: 'prayer-2',
            title: 'While Bowing (Ruku)',
            arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
            transliteration: 'Subḥāna rabbiya al-ʿaẓīm',
            translation: 'Glory be to my Lord, the Most Great.',
            category: 'Hadith-based Supplications',
            occasion: 'During ruku',
            reference: 'Abu Dawud and others',
            repetitions: 3
          },
          {
            id: 'prayer-3',
            title: 'Upon Rising from Bowing',
            arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ',
            transliteration: 'Samiʿa Allāhu liman ḥamidah, rabbanā wa laka al-ḥamd',
            translation: 'Allah hears whoever praises Him. Our Lord, to You belongs all praise.',
            category: 'Hadith-based Supplications',
            occasion: 'Rising from ruku',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: 'prayer-4',
            title: 'During Prostration (Sujood)',
            arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
            transliteration: 'Subḥāna rabbiya al-aʿlā',
            translation: 'Glory be to my Lord, the Most High.',
            category: 'Hadith-based Supplications',
            occasion: 'During sujood',
            reference: 'Abu Dawud and others',
            repetitions: 3
          }
        ]
      },
      {
        id: 'sleep-issues',
        name: 'Sleep Issues',
        description: 'Supplications for sleep difficulties and dreams',
        icon: 'moon',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'sleep-1',
            title: 'When Tossing and Turning During the Night',
            arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
            transliteration: 'Lā ilāha illā Allāhu waḥdahu lā sharīka lah, lahu al-mulku wa lahu al-ḥamd, wa huwa ʿalā kulli shay\'in qadīr',
            translation: 'There is no deity except Allah, alone without partner. To Him belongs dominion and to Him belongs praise, and He is over all things competent.',
            category: 'Hadith-based Supplications',
            occasion: 'When restless at night',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: 'sleep-2',
            title: 'Upon Experiencing Fear Before Sleep',
            arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
            transliteration: 'Aʿūdhu bi kalimāti Allāhi at-tāmmāti min sharri mā khalaq',
            translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
            category: 'Hadith-based Supplications',
            occasion: 'When experiencing fear',
            reference: 'Muslim',
            repetitions: 3
          },
          {
            id: 'sleep-3',
            title: 'Upon Seeing a Good Dream',
            arabic: 'الْحَمْدُ لِلَّهِ',
            transliteration: 'Al-ḥamdu lillāh',
            translation: 'Praise be to Allah.',
            category: 'Hadith-based Supplications',
            occasion: 'After good dream',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          }
        ]
      },
      {
        id: 'distress-protection',
        name: 'Distress, Trials & Protection',
        description: 'Supplications for times of difficulty and seeking Allah\'s protection',
        icon: 'shield',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'distress-1',
            title: 'In Times of Worry and Grief',
            arabic: 'اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ',
            transliteration: 'Allāhumma innī ʿabduk, ibnu ʿabdik, ibnu amatik, nāṣiyatī biyadik, māḍin fiyya ḥukmuk, ʿadlun fiyya qaḍā\'uk',
            translation: 'O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand, Your command over me is forever executed and Your decree over me is just.',
            category: 'Hadith-based Supplications',
            occasion: 'Times of worry and grief',
            reference: 'Ahmad and Ibn Hibban',
            repetitions: 1
          },
          {
            id: 'distress-2',
            title: 'In Times of Distress',
            arabic: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ',
            transliteration: 'Lā ilāha illā Allāhu al-ʿaẓīmu al-ḥalīm, lā ilāha illā Allāhu rabbu al-ʿarshi al-ʿaẓīm',
            translation: 'There is no deity except Allah, the Mighty, the Forbearing. There is no deity except Allah, Lord of the mighty throne.',
            category: 'Hadith-based Supplications',
            occasion: 'Times of distress',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: 'distress-3',
            title: 'Upon Committing a Sin',
            arabic: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي، وَجَهْلِي، وَإِسْرَافِي فِي أَمْرِي، وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي',
            transliteration: 'Allāhumma ighfir lī dhanbī, wa jahlī, wa isrāfī fī amrī, wa mā anta aʿlamu bihi minnī',
            translation: 'O Allah, forgive my sin, my ignorance, my excess in my affairs, and what You know better than I.',
            category: 'Hadith-based Supplications',
            occasion: 'After committing sin',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          }
        ]
      },
      {
        id: 'enemies-oppression',
        name: 'Enemies, Oppression & Harm',
        description: 'Supplications for protection from enemies and oppression',
        icon: 'shield-checkmark',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'enemies-1',
            title: 'Upon Encountering an Enemy',
            arabic: 'اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ، وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ',
            transliteration: 'Allāhumma innā najʿaluka fī nuḥūrihim, wa naʿūdhu bika min shurūrihim',
            translation: 'O Allah, we place You before them, and we seek refuge in You from their evil.',
            category: 'Hadith-based Supplications',
            occasion: 'When facing enemies',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: 'enemies-2',
            title: 'When Afraid of Ruler\'s Injustice',
            arabic: 'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ، وَرَبَّ الْعَرْشِ الْعَظِيمِ، كُنْ لِي جَارًا مِنْ فُلَانٍ',
            transliteration: 'Allāhumma rabba as-samāwāti as-sabʿ, wa rabba al-ʿarshi al-ʿaẓīm, kun lī jāran min fulān',
            translation: 'O Allah, Lord of the seven heavens and Lord of the mighty throne, be my protector from so-and-so.',
            category: 'Hadith-based Supplications',
            occasion: 'Fear of injustice',
            reference: 'Abu Dawud',
            repetitions: 1
          }
        ]
      },
      {
        id: 'debts-worldly',
        name: 'Debts & Worldly Difficulties',
        description: 'Supplications for financial difficulties and worldly concerns',
        icon: 'card',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'debts-1',
            title: 'For the Settling of a Debt',
            arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
            transliteration: 'Allāhumma ikfinī bi ḥalālika ʿan ḥarāmik, wa aghninī bi faḍlika ʿamman siwāk',
            translation: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.',
            category: 'Hadith-based Supplications',
            occasion: 'For debt settlement',
            reference: 'Tirmidhi',
            repetitions: 1
          }
        ]
      },
      {
        id: 'family-marriage',
        name: 'Family, Marriage & Intimacy',
        description: 'Supplications for family occasions and marital life',
        icon: 'heart',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'family-1',
            title: 'Congratulation on Birth',
            arabic: 'بَارَكَ اللَّهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ',
            transliteration: 'Bāraka Allāhu laka fī al-mawhūbi lak, wa shakarta al-wāhib, wa balagha ashuddah, wa ruziqta birrah',
            translation: 'May Allah bless you with His gift to you, may you give thanks to the Giver, may the child reach maturity, and may you be blessed with his righteousness.',
            category: 'Hadith-based Supplications',
            occasion: 'Congratulating on birth',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: 'family-2',
            title: 'Protection for Children',
            arabic: 'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
            transliteration: 'Uʿīdhukumā bi kalimāti Allāhi at-tāmmati min kulli shayṭānin wa hāmmah, wa min kulli ʿaynin lāmmah',
            translation: 'I seek protection for you both in the perfect words of Allah from every devil and harmful thing, and from every evil eye.',
            category: 'Hadith-based Supplications',
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
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'illness-1',
            title: 'When Visiting the Sick',
            arabic: 'لَا بَأْسَ، طَهُورٌ إِنْ شَاءَ اللَّهُ',
            transliteration: 'Lā ba\'s, ṭahūrun in shā\' Allāh',
            translation: 'No harm, it is purification, Allah willing.',
            category: 'Hadith-based Supplications',
            occasion: 'When visiting sick',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: 'illness-2',
            title: 'For the Deceased at Funeral Prayer',
            arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ',
            transliteration: 'Allāhumma ighfir lahu wa irḥamh, wa ʿāfihi wa iʿfu ʿanh',
            translation: 'O Allah, forgive him and have mercy on him, grant him well-being and pardon him.',
            category: 'Hadith-based Supplications',
            occasion: 'Funeral prayer',
            reference: 'Muslim',
            repetitions: 1
          }
        ]
      },
      {
        id: 'weather-celestial',
        name: 'Weather & Celestial Phenomena',
        description: 'Supplications for weather changes and natural phenomena',
        icon: 'partly-sunny',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'weather-1',
            title: 'When the Wind Blows',
            arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَخَيْرَ مَا فِيهَا، وَخَيْرَ مَا أُرْسِلَتْ بِهِ',
            transliteration: 'Allāhumma innī as\'aluka khayrahā, wa khayra mā fīhā, wa khayra mā ursilat bih',
            translation: 'O Allah, I ask You for its good, the good within it, and the good it was sent with.',
            category: 'Hadith-based Supplications',
            occasion: 'When wind blows',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: 'weather-2',
            title: 'When It Thunders',
            arabic: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ',
            transliteration: 'Subḥāna alladhī yusabbiḥu ar-raʿdu bi ḥamdih wa al-malā\'ikatu min khīfatih',
            translation: 'Glory be to Him whom thunder glorifies with praise, and the angels too, out of fear of Him.',
            category: 'Hadith-based Supplications',
            occasion: 'When it thunders',
            reference: 'Malik',
            repetitions: 1
          },
          {
            id: 'weather-3',
            title: 'Upon Sighting the Crescent Moon',
            arabic: 'اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ',
            transliteration: 'Allāhumma ahillahu ʿalaynā bil-amni wa al-īmān, wa as-salāmati wa al-islām',
            translation: 'O Allah, bring it over us with security and faith, safety and Islam.',
            category: 'Hadith-based Supplications',
            occasion: 'Sighting new moon',
            reference: 'Tirmidhi',
            repetitions: 1
          }
        ]
      },
      {
        id: 'eating-drinking',
        name: 'Eating, Drinking & Fasting',
        description: 'Supplications related to meals and fasting',
        icon: 'restaurant',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'eating-1',
            title: 'Before Eating',
            arabic: 'بِسْمِ اللَّهِ',
            transliteration: 'Bismillāh',
            translation: 'In the name of Allah.',
            category: 'Hadith-based Supplications',
            occasion: 'Before eating',
            reference: 'Abu Dawud and Tirmidhi',
            repetitions: 1
          },
          {
            id: 'eating-2',
            title: 'After Eating',
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
            transliteration: 'Al-ḥamdu lillāhi alladhī aṭʿamanī hādhā, wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah',
            translation: 'Praise be to Allah who has fed me this food and provided it for me without any power or strength from myself.',
            category: 'Hadith-based Supplications',
            occasion: 'After eating',
            reference: 'Abu Dawud and Tirmidhi',
            repetitions: 1
          },
          {
            id: 'eating-3',
            title: 'Upon Breaking Fast',
            arabic: 'ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
            transliteration: 'Dhahaba aẓ-ẓama\', wa ibtallatil-ʿurūq, wa thabata al-ajru in shā\' Allāh',
            translation: 'Thirst has gone, the veins are moist, and the reward is confirmed, Allah willing.',
            category: 'Hadith-based Supplications',
            occasion: 'Breaking fast',
            reference: 'Abu Dawud',
            repetitions: 1
          }
        ]
      },
      {
        id: 'social-etiquette',
        name: 'Social Etiquette & Interactions',
        description: 'Supplications for social situations and interactions',
        icon: 'people',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'social-1',
            title: 'Upon Sneezing',
            arabic: 'الْحَمْدُ لِلَّهِ',
            transliteration: 'Al-ḥamdu lillāh',
            translation: 'Praise be to Allah.',
            category: 'Hadith-based Supplications',
            occasion: 'Upon sneezing',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: 'social-2',
            title: 'Islamic Greeting',
            arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
            transliteration: 'As-salāmu ʿalaykum wa raḥmatu Allāhi wa barakātuh',
            translation: 'Peace be upon you and Allah\'s mercy and blessings.',
            category: 'Hadith-based Supplications',
            occasion: 'Greeting Muslims',
            reference: 'Abu Dawud and Tirmidhi',
            repetitions: 1
          },
          {
            id: 'social-3',
            title: 'When Someone Does Good to You',
            arabic: 'جَزَاكَ اللَّهُ خَيْرًا',
            transliteration: 'Jazāka Allāhu khayran',
            translation: 'May Allah reward you with good.',
            category: 'Hadith-based Supplications',
            occasion: 'When receiving kindness',
            reference: 'Tirmidhi',
            repetitions: 1
          }
        ]
      },
      {
        id: 'travel-riding',
        name: 'Travel, Riding & Commerce',
        description: 'Supplications for travel and transportation',
        icon: 'car',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'travel-1',
            title: 'When Mounting Transportation',
            arabic: 'بِسْمِ اللَّهِ، وَالْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
            transliteration: 'Bismillāh, wa al-ḥamdu lillāh, subḥāna alladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn',
            translation: 'In the name of Allah, and praise be to Allah. Glory be to Him who has subjected this to us, and we could never have it by our efforts.',
            category: 'Hadith-based Supplications',
            occasion: 'When boarding transport',
            reference: 'Abu Dawud and Tirmidhi',
            repetitions: 1
          },
          {
            id: 'travel-2',
            title: 'For Travel',
            arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى',
            transliteration: 'Allāhumma innā nas\'aluka fī safarinā hādhā al-birra wa at-taqwā, wa min al-ʿamali mā tarḍā',
            translation: 'O Allah, we ask You in this journey of ours for righteousness and piety, and for deeds that are pleasing to You.',
            category: 'Hadith-based Supplications',
            occasion: 'Beginning travel',
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
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'hajj-1',
            title: 'The Pilgrim\'s Talbiyah',
            arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ',
            transliteration: 'Labbayka Allāhumma labbayk, labbayka lā sharīka laka labbayk, inna al-ḥamda wa an-niʿmata laka wa al-mulka lā sharīka lak',
            translation: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, favor and sovereignty belong to You. You have no partner.',
            category: 'Hadith-based Supplications',
            occasion: 'During Hajj/Umrah',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: 'hajj-2',
            title: 'At Safa and Marwah',
            arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ',
            transliteration: 'Inna aṣ-ṣafā wa al-marwata min shaʿā\'iri Allāh',
            translation: 'Indeed, Safa and Marwah are among the symbols of Allah.',
            category: 'Hadith-based Supplications',
            occasion: 'At Safa and Marwah',
            reference: 'Muslim',
            repetitions: 1
          }
        ]
      },
      {
        id: 'miscellaneous',
        name: 'Miscellaneous Situations',
        description: 'Supplications for various other situations',
        icon: 'ellipsis-horizontal',
        category: 'Hadith-based Supplications',
        duas: [
          {
            id: 'misc-1',
            title: 'At Times of Amazement',
            arabic: 'سُبْحَانَ اللَّهِ',
            transliteration: 'Subḥān Allāh',
            translation: 'Glory be to Allah.',
            category: 'Hadith-based Supplications',
            occasion: 'Times of amazement',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: 'misc-2',
            title: 'Upon Receiving Pleasant News',
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
            transliteration: 'Al-ḥamdu lillāhi alladhī bi niʿmatih tatimmu aṣ-ṣāliḥāt',
            translation: 'Praise be to Allah by whose favor good deeds are accomplished.',
            category: 'Hadith-based Supplications',
            occasion: 'Pleasant news',
            reference: 'Ibn Majah',
            repetitions: 1
          },
          {
            id: 'misc-3',
            title: 'When Feeling Pain in Body',
            arabic: 'بِسْمِ اللَّهِ (ثَلَاثًا) أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (سَبْعَ مَرَّاتٍ)',
            transliteration: 'Bismillāh (3 times), Aʿūdhu billāhi wa qudratih min sharri mā ajidu wa uḥādhir (7 times)',
            translation: 'In the name of Allah (3 times). I seek refuge in Allah and His power from the evil of what I feel and fear (7 times).',
            category: 'Hadith-based Supplications',
            occasion: 'When feeling pain',
            reference: 'Muslim',
            repetitions: 1
          }
        ]
      }
    ]
  },
  {
    id: 'morning-evening',
    title: 'Morning & Evening Adhkar',
    description: 'Essential daily remembrance for morning and evening',
    categories: ['daily', 'protection'],
    icon: 'sunny',
    subcategories: [
      {
        id: 'morning-adhkar',
        name: 'Morning Adhkar',
        description: 'Supplications to be recited in the morning',
        icon: 'sunny',
        category: 'Morning & Evening Adhkar',
        duas: [
          {
            id: '2-1',
            title: 'Ayat al-Kursi',
            arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
            transliteration: 'Allāhu lā ilāha illā huwa al-ḥayyu al-qayyūm...',
            translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...',
            category: 'Morning & Evening Adhkar',
            occasion: 'Morning protection',
            reference: 'Quran 2:255',
            fullReference: 'This is the famous "Throne Verse" (Ayat al-Kursi) from Surah Al-Baqarah. The Prophet (ﷺ) said: "Whoever recites Ayat al-Kursi after every obligatory prayer, nothing prevents him from entering Paradise except death." (An-Nasa\'i and Ibn Hibban)\n\nThe verse speaks of Allah\'s absolute sovereignty, His eternal vigilance over creation, and His infinite knowledge. It is considered one of the greatest verses in the Quran and provides immense spiritual protection when recited with contemplation and sincerity.',
            repetitions: 1
          },
          {
            id: '2-2',
            title: 'Surah Al-Ikhlas, Al-Falaq, An-Nas',
            arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
            transliteration: 'Qul huwa Allāhu aḥad, Allāhu aṣ-ṣamad, lam yalid wa lam yūlad, wa lam yakun lahu kufuwan aḥad',
            translation: 'Say: He is Allah, the One! Allah, the Eternal, Absolute; He begets not, nor is He begotten; And there is none like unto Him.',
            category: 'Morning & Evening Adhkar',
            occasion: 'Morning and evening protection',
            reference: 'Quran 112:1-4',
            fullReference: 'These are the three protective chapters (Al-Mu\'awwidhatayn plus Al-Ikhlas). The Prophet (ﷺ) said: "Recite Qul Huwa Allahu Ahad and the Mu\'awwidhatayn three times at dawn and dusk. It will suffice you in all respects." (Abu Dawud and Tirmidhi)\n\nSurah Al-Ikhlas describes Allah\'s absolute oneness and uniqueness. The two Mu\'awwidhatayn (Al-Falaq and An-Nas) seek Allah\'s protection from various forms of evil, both seen and unseen.',
            repetitions: 3
          }
        ]
      },
      {
        id: 'evening-adhkar',
        name: 'Evening Adhkar',
        description: 'Supplications to be recited in the evening',
        icon: 'moon',
        category: 'Morning & Evening Adhkar',
        duas: [
          {
            id: '2-6',
            title: 'Evening Protection',
            arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
            transliteration: 'Amsaynā wa amsā al-mulku lillāh, wa al-ḥamdu lillāh, lā ilāha illā Allāhu waḥdahu lā sharīka lah',
            translation: 'We have reached the evening and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.',
            category: 'Morning & Evening Adhkar',
            occasion: 'Evening remembrance',
            reference: 'Muslim',
            fullReference: 'This comprehensive evening dhikr acknowledges Allah\'s sovereignty as the day transitions to night. It combines gratitude, monotheism, and recognition of Allah\'s absolute authority. The Prophet (ﷺ) emphasized the importance of morning and evening adhkar for spiritual protection and connection with Allah throughout the day and night cycles.',
            repetitions: 1
          },
          {
            id: '2-8',
            title: 'Seeking Allah\'s Protection at Night',
            arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
            transliteration: 'Allāhumma bika amsaynā, wa bika aṣbaḥnā, wa bika naḥyā, wa bika namūt, wa ilayka an-nushūr',
            translation: 'O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning, by Your leave we live and die, and unto You is the resurrection.',
            category: 'Morning & Evening Adhkar',
            occasion: 'Evening protection',
            reference: 'Abu Dawud and Tirmidhi',
            fullReference: 'This powerful evening supplication acknowledges Allah\'s complete control over all aspects of life and death. It serves as a reminder of our total dependence on Allah and our ultimate return to Him. Reciting this with contemplation helps maintain consciousness of Allah\'s presence and our accountability to Him as we end each day.',
            repetitions: 1
          }
        ]
      }
    ]
  },
  {
    id: 'prayer-times',
    title: 'Prayer Time Adhkar',
    description: 'Specific remembrance for the five daily prayers',
    categories: ['prayer', 'daily'],
    icon: 'time',
    subcategories: [
      {
        id: 'after-fajr',
        name: 'After Fajr Prayer',
        description: 'Special adhkar to be recited after the dawn prayer',
        icon: 'sunny',
        category: 'Prayer Time Adhkar',
        duas: [
          {
            id: '3-1',
            title: 'Tasbih after Fajr',
            arabic: 'سُبْحَانَ اللَّهِ',
            transliteration: 'Subḥān Allāh',
            translation: 'Glory be to Allah.',
            category: 'Prayer Time Adhkar',
            occasion: 'After Fajr prayer',
            reference: 'Muslim',
            repetitions: 33
          },
          {
            id: '3-2',
            title: 'Tahmid after Fajr',
            arabic: 'الْحَمْدُ لِلَّهِ',
            transliteration: 'Al-ḥamdu lillāh',
            translation: 'Praise be to Allah.',
            category: 'Prayer Time Adhkar',
            occasion: 'After Fajr prayer',
            reference: 'Muslim',
            repetitions: 33
          },
          {
            id: '3-3',
            title: 'Takbir after Fajr',
            arabic: 'اللَّهُ أَكْبَرُ',
            transliteration: 'Allāhu akbar',
            translation: 'Allah is greatest.',
            category: 'Prayer Time Adhkar',
            occasion: 'After Fajr prayer',
            reference: 'Muslim',
            repetitions: 34
          }
        ]
      },
      {
        id: 'after-maghrib',
        name: 'After Maghrib Prayer',
        description: 'Special adhkar to be recited after the sunset prayer',
        icon: 'moon',
        category: 'Prayer Time Adhkar',
        duas: [
          {
            id: '3-4',
            title: 'Evening Tasbih',
            arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
            transliteration: 'Subḥān Allāhi wa biḥamdih',
            translation: 'Glory be to Allah and praise be to Him.',
            category: 'Prayer Time Adhkar',
            occasion: 'After Maghrib prayer',
            reference: 'Bukhari and Muslim',
            repetitions: 100
          }
        ]
      }
    ]
  },
  {
    id: 'protection-adhkar',
    title: 'Protection & Seeking Refuge',
    description: 'Powerful supplications for spiritual and physical protection',
    categories: ['protection', 'daily'],
    icon: 'shield',
    subcategories: [
      {
        id: 'general-protection',
        name: 'General Protection',
        description: 'Daily protection from various forms of harm',
        icon: 'shield-checkmark',
        category: 'Protection & Seeking Refuge',
        duas: [
          {
            id: '4-1',
            title: 'Seeking Refuge in Allah\'s Perfect Words',
            arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
            transliteration: 'Aʿūdhu bi kalimāti Allāhi at-tāmmāti min sharri mā khalaq',
            translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
            category: 'Protection & Seeking Refuge',
            occasion: 'General protection',
            reference: 'Muslim',
            repetitions: 3
          }
        ]
      }
    ]
  }
];



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
    ],
    category: ''
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
    ],
    category: ''
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
    ],
    category: ''
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