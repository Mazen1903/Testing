import { ZikrSeries, ZikrCategory, DuaSubcategory, Dua } from '@/shared/types/supplications';

// Zikr Categories
export const ZIKR_CATEGORIES: ZikrCategory[] = [
  { id: 'all', name: 'All', icon: 'apps' },
  { id: 'daily', name: 'Daily', icon: 'calendar' },
  { id: 'hadith', name: 'Hadith', icon: 'book' },
  { id: 'quranic', name: 'Quranic', icon: 'library' },
];

// Zikr Series with new structure
export const ZIKR_SERIES: ZikrSeries[] = [
  {
    id: 'daily-supplications',
    title: 'Daily Supplications',
    description: 'The Importance of Daily Supplications\n\nDaily supplications form the foundation of a Muslim\'s spiritual connection with Allah. These essential duas help maintain constant remembrance throughout the day, from waking up to going to sleep. Regular recitation of daily supplications purifies the heart, brings barakah (blessings) to our time, and creates a protective spiritual shield around the believer. The Prophet (ﷺ) emphasized the importance of these daily remembrances as they keep us connected to Allah in every moment of our lives.',
    categories: ['daily'],
    icon: 'calendar',
    subcategories: [
      {
        id: 'wakeup-supplications',
        name: 'Wakeup Supplications',
        description: 'Supplications to recite upon waking up',
        icon: 'sunny',
        category: 'Wakeup',
        duas: [
          {
            id: 'w-1',
            title: 'Upon Waking Up',
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
            transliteration: 'Al-ḥamdu lillāhi alladhī aḥyānā baʿda mā amātanā wa ilayhi an-nushūr',
            translation: 'Praise be to Allah who gave us life after having taken it from us, and unto Him is the resurrection.',
            category: 'Wakeup',
            occasion: 'Upon waking up',
            reference: 'Bukhari',
            repetitions: 1
          }
        ]
      },
      {
        id: 'morning-supplications',
        name: 'Morning Supplications',
        description: 'Supplications to recite in the morning',
        icon: 'sunny',
        category: 'Morning',
        duas: [
          {
            id: 'm-1',
            title: 'Morning Protection',
            arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
            transliteration: 'Aṣbaḥnā wa aṣbaḥa al-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illā Allāhu waḥdahu lā sharīka lah',
            translation: 'We have entered the morning and the kingdom belongs to Allah. Praise be to Allah. There is no god but Allah alone, with no partner.',
            category: 'Morning',
            occasion: 'Morning remembrance',
            reference: 'Muslim',
            repetitions: 1
          }
        ]
      },
      {
        id: 'evening-supplications',
        name: 'Evening Supplications',
        description: 'Supplications to recite in the evening',
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
      },
      {
        id: 'bedtime-supplications',
        name: 'Bedtime Supplications',
        description: 'Supplications to recite before going to sleep',
        icon: 'bed',
        category: 'Bedtime',
        duas: [
          {
            id: 'b-1',
            title: 'Before Going to Sleep',
            arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
            transliteration: 'Bi-ismika rabbī waḍaʿtu janbī, wa bika arfaʿuh, fa-in amsakta nafsī fa-irḥamhā, wa in arsaltahā fa-iḥfaẓhā bimā taḥfaẓu bihi ʿibādaka aṣ-ṣāliḥīn',
            translation: 'In Your name, my Lord, I lay down my side, and by You I raise it up. If You take my soul, have mercy on it, and if You send it back, protect it with that which You protect Your righteous servants.',
            category: 'Bedtime',
            occasion: 'Before sleeping',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          }
        ]
      }
    ]
  },
  {
    id: 'hadith-based',
    title: 'Hadith-based Supplications',
    description: 'The Importance of Hadith-based Supplications\n\nHadith-based supplications are the authentic duas taught directly by Prophet Muhammad (ﷺ) through his words, actions, and approvals. These supplications carry immense spiritual weight as they are the exact words and methods our beloved Prophet used to communicate with Allah. Following these Sunnah supplications connects us directly to the prophetic tradition, ensuring our worship is performed in the most beloved manner to Allah. Each dua has been preserved through authentic chains of narration and represents the perfect way to seek Allah\'s help, protection, and blessings in every situation of life.',
    categories: ['hadith'],
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
            arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَارُ',
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
          },
          {
            id: '6-7',
            title: 'Prayers Upon the Prophet ﷺ After the Tashahhud',
            arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
            transliteration: 'Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammadin kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīma innaka ḥamīdun majīd',
            translation: 'O Allah, send prayers upon Muhammad and upon the family of Muhammad as You sent prayers upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.',
            category: 'Inside the Prayer',
            occasion: 'After tashahhud',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '6-8',
            title: 'After the Final Tashahhud and Before Ending the Prayer',
            arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
            transliteration: 'Allāhumma aʿinnī ʿalā dhikrika wa shukrika wa ḥusni ʿibādatik',
            translation: 'O Allah, help me to remember You, to thank You, and to worship You in the best manner.',
            category: 'Inside the Prayer',
            occasion: 'Before ending prayer',
            reference: 'Abu Dawud, Nasai',
            repetitions: 1
          },
          {
            id: '6-9',
            title: 'When Afflicted by Satan Whisperings in Prayer or Quran Recitation',
            arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
            transliteration: 'Aʿūdhu billāhi min ash-shayṭāni ar-rajīm',
            translation: 'I seek refuge in Allah from Satan the accursed.',
            category: 'Inside the Prayer',
            occasion: 'When experiencing whispers during prayer',
            reference: 'Muslim',
            repetitions: 3
          },
          {
            id: '6-10',
            title: 'What to Say After Completing the Prayer',
            arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
            transliteration: 'Astaghfiru Allāh, astaghfiru Allāh, astaghfiru Allāh, Allāhumma anta as-salāmu wa minka as-salām tabārakta yā dhā al-jalāli wal-ikrām',
            translation: 'I seek Allah\'s forgiveness (3x). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.',
            category: 'Inside the Prayer',
            occasion: 'After completing prayer',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '6-11',
            title: 'Invocations for Qunut in Witr (Night Prayer)',
            arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ',
            transliteration: 'Allāhumma ihdinī fīman hadayt, wa ʿāfinī fīman ʿāfayt, wa tawallānī fīman tawallayt',
            translation: 'O Allah, guide me among those You have guided, grant me health among those You have granted health, and take me as an ally among those You have taken as allies.',
            category: 'Inside the Prayer',
            occasion: 'During Qunut in Witr prayer',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '6-12',
            title: 'Immediately Following the Witr Prayer',
            arabic: 'سُبْحَانَ الْمَلِكِ الْقُدُّوسِ',
            transliteration: 'Subḥāna al-maliki al-quddūs',
            translation: 'Glory be to the King, the Most Holy.',
            category: 'Inside the Prayer',
            occasion: 'After Witr prayer',
            reference: 'Abu Dawud, Nasai',
            repetitions: 3
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
            title: 'Upon Experiencing Unrest, Fear, Apprehensiveness Before or During Sleep',
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
            title: 'Upon Seeing a Good Dream or a Bad Dream',
            arabic: 'الْحَمْدُ لِلَّهِ',
            transliteration: 'Al-ḥamdu lillāh',
            translation: 'Praise be to Allah (for good dreams). For bad dreams: I seek refuge in Allah from Satan the accursed.',
            category: 'Sleep Issues',
            occasion: 'After dreams',
            reference: 'Bukhari and Muslim',
            repetitions: 1
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
            title: 'When You Find Something Becoming Difficult for You',
            arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
            transliteration: 'Allāhumma lā sahla illā mā jaʿaltahu sahlan, wa anta tajʿalu al-ḥazna idhā shi\'ta sahlan',
            translation: 'O Allah, there is no ease except in that which You have made easy, and You make the difficult easy if it be Your will.',
            category: 'Distress & Protection',
            occasion: 'When facing difficulty',
            reference: 'Ibn Hibban',
            repetitions: 1
          },
          {
            id: '8-5',
            title: 'Upon Committing a Sin',
            arabic: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
            transliteration: 'Astaghfiru Allāha alladhī lā ilāha illā huwa al-ḥayyu al-qayyūmu wa atūbu ilayh',
            translation: 'I seek forgiveness from Allah, there is no god but He, the Ever-Living, the Self-Sustaining, and I repent to Him.',
            category: 'Distress & Protection',
            occasion: 'After committing a sin',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 3
          },
          {
            id: '8-6',
            title: 'For Expelling the Devil and His Whisperings',
            arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
            transliteration: 'Aʿūdhu billāhi min ash-shayṭāni ar-rajīm',
            translation: 'I seek refuge in Allah from Satan the accursed.',
            category: 'Distress & Protection',
            occasion: 'Against Satan\'s whispers',
            reference: 'Abu Dawud',
            repetitions: 3
          },
          {
            id: '8-7',
            title: 'For Fear of Shirk',
            arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ',
            transliteration: 'Allāhumma innī aʿūdhu bika an ushrika bika shay\'an wa anā aʿlam, wa astaghfiruka limā lā aʿlam',
            translation: 'O Allah, I seek refuge in You from knowingly associating anything with You, and I seek Your forgiveness for what I do not know.',
            category: 'Distress & Protection',
            occasion: 'Fear of committing shirk',
            reference: 'Ahmad',
            repetitions: 1
          },
          {
            id: '8-8',
            title: 'When Something You Dislike Happens or When You Fail to Achieve Something',
            arabic: 'قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ',
            transliteration: 'Qadaru Allāhi wa mā shā\'a faʿal',
            translation: 'This is the decree of Allah and what He willed, He has done.',
            category: 'Distress & Protection',
            occasion: 'When disappointed or facing failure',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '8-9',
            title: 'When Angry',
            arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
            transliteration: 'Aʿūdhu billāhi min ash-shayṭāni ar-rajīm',
            translation: 'I seek refuge in Allah from Satan the accursed.',
            category: 'Distress & Protection',
            occasion: 'When feeling angry',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '8-10',
            title: 'When Startled',
            arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
            transliteration: 'Lā ilāha illā Allāh',
            translation: 'There is no god but Allah.',
            category: 'Distress & Protection',
            occasion: 'When startled or surprised',
            reference: 'Malik',
            repetitions: 1
          },
          {
            id: '8-11',
            title: 'When in Fear of Afflicting Something with Evil Eye',
            arabic: 'اللَّهُمَّ بَارِكْ عَلَيْهِ',
            transliteration: 'Allāhumma bārik ʿalayh',
            translation: 'O Allah, bless him/it.',
            category: 'Distress & Protection',
            occasion: 'To prevent evil eye',
            reference: 'Malik',
            repetitions: 1
          },
          {
            id: '8-12',
            title: 'To Ward Off the Plot of the Rebellious Devils',
            arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
            transliteration: 'Aʿūdhu bi-kalimāti Allāhi at-tāmmāti min sharri mā khalaq',
            translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
            category: 'Distress & Protection',
            occasion: 'Protection from devils',
            reference: 'Muslim',
            repetitions: 3
          },
          {
            id: '8-13',
            title: 'Repentance and Seeking Forgiveness',
            arabic: 'رَبِّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي',
            transliteration: 'Rabbi ighfir lī dhanbī wa khaṭa\'ī wa jahlī',
            translation: 'My Lord, forgive me my sin, my error, and my ignorance.',
            category: 'Distress & Protection',
            occasion: 'Seeking forgiveness',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '8-14',
            title: 'When Having Doubts About the Faith',
            arabic: 'آمَنْتُ بِاللَّهِ وَرُسُلِهِ',
            transliteration: 'Āmantu billāhi wa rusulih',
            translation: 'I believe in Allah and His messengers.',
            category: 'Distress & Protection',
            occasion: 'When having doubts',
            reference: 'Muslim',
            repetitions: 1
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
          },
          {
            id: '9-3',
            title: 'Against Enemies',
            arabic: 'اللَّهُمَّ مُنْزِلَ الْكِتَابِ، سَرِيعَ الْحِسَابِ، اهْزِمِ الْأَحْزَابَ، اللَّهُمَّ اهْزِمْهُمْ وَزَلْزِلْهُمْ',
            transliteration: 'Allāhumma munzila al-kitāb, sarīʿa al-ḥisāb, ihzimi al-aḥzāb, Allāhumma ihzimhum wa zalzilhum',
            translation: 'O Allah, Revealer of the Book, Swift in taking account, defeat the confederates. O Allah, defeat them and shake them.',
            category: 'Enemies & Oppression',
            occasion: 'Against enemies',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '9-4',
            title: 'What to Say If You Fear People May Harm You',
            arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
            transliteration: 'Ḥasbunā Allāhu wa niʿma al-wakīl',
            translation: 'Allah is sufficient for us, and He is the best Disposer of affairs.',
            category: 'Enemies & Oppression',
            occasion: 'When fearing harm from people',
            reference: 'Bukhari',
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
            title: 'Congratulation on the Occasion of a Birth and Its Reply',
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
          },
          {
            id: '11-3',
            title: 'To the Newlywed',
            arabic: 'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
            transliteration: 'Bāraka Allāhu laka, wa bāraka ʿalayka, wa jamaʿa baynakumā fī khayr',
            translation: 'May Allah bless you, and shower His blessings upon you, and bring you together in goodness.',
            category: 'Family & Marriage',
            occasion: 'Congratulating newlyweds',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '11-4',
            title: 'On the Wedding Night or When Buying an Animal',
            arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ',
            transliteration: 'Allāhumma innī as\'aluka khayrahā wa khayra mā jabaltahā ʿalayh, wa aʿūdhu bika min sharrihā wa sharri mā jabaltahā ʿalayh',
            translation: 'O Allah, I ask You for her good and the good of the disposition You have given her, and I take refuge in You from her evil and the evil of the disposition You have given her.',
            category: 'Family & Marriage',
            occasion: 'Wedding night or buying animal',
            reference: 'Abu Dawud, Ibn Majah',
            repetitions: 1
          },
          {
            id: '11-5',
            title: 'Before Intercourse',
            arabic: 'بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ، وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا',
            transliteration: 'Bismillāh, Allāhumma jannibnā ash-shayṭān, wa jannib ash-shayṭāna mā razaqtanā',
            translation: 'In the name of Allah. O Allah, keep us away from Satan and keep Satan away from what You bestow upon us.',
            category: 'Family & Marriage',
            occasion: 'Before intimacy',
            reference: 'Bukhari and Muslim',
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
            title: 'The Reward for Visiting the Sick',
            arabic: 'اللَّهُمَّ أَشْفِ عَبْدَكَ، يَنْكَأُ لَكَ عَدُوًّا، أَوْ يَمْشِي لَكَ إِلَى صَلَاةٍ',
            transliteration: 'Allāhumma ishfi ʿabdaka, yanka\'u laka ʿaduwwan, aw yamshī laka ilā ṣalāh',
            translation: 'O Allah, heal Your servant, so that he may wound an enemy for You, or walk to prayer for You.',
            category: 'Illness & Death',
            occasion: 'Praying for the sick',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '12-3',
            title: 'When Having Terminal Illness',
            arabic: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَأَلْحِقْنِي بِالرَّفِيقِ الْأَعْلَى',
            transliteration: 'Allāhumma ighfir lī wa irḥamnī wa alḥiqnī bir-rafīqi al-aʿlā',
            translation: 'O Allah, forgive me, have mercy on me, and join me with the highest companions.',
            category: 'Illness & Death',
            occasion: 'During terminal illness',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '12-4',
            title: 'Instruction for the One Nearing Death',
            arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
            transliteration: 'Lā ilāha illā Allāh',
            translation: 'There is no god but Allah.',
            category: 'Illness & Death',
            occasion: 'When nearing death',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '12-5',
            title: 'When Closing the Eyes of the Deceased',
            arabic: 'اللَّهُمَّ اغْفِرْ لِفُلَانٍ وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ',
            transliteration: 'Allāhumma ighfir li-fulān wa irfaʿ darajatahu fī al-mahdiyyīn',
            translation: 'O Allah, forgive [name] and raise his rank among the rightly guided.',
            category: 'Illness & Death',
            occasion: 'When closing eyes of deceased',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '12-6',
            title: 'For the Deceased at the Funeral Prayer',
            arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ',
            transliteration: 'Allāhumma ighfir lahu wa irḥamhu wa ʿāfihi wa iʿfu ʿanh',
            translation: 'O Allah, forgive him, have mercy on him, give him strength and pardon him.',
            category: 'Illness & Death',
            occasion: 'During funeral prayer',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '12-7',
            title: 'For the Deceased Child in the Funeral Prayer',
            arabic: 'اللَّهُمَّ اجْعَلْهُ فَرَطًا وَذُخْرًا لِوَالِدَيْهِ، وَشَفِيعًا مُجَابًا',
            transliteration: 'Allāhumma ijʿalhu faraṭan wa dhukhran li-wālidayh, wa shafīʿan mujāban',
            translation: 'O Allah, make him a forerunner and a treasure for his parents, and an answered intercessor.',
            category: 'Illness & Death',
            occasion: 'Funeral prayer for child',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '12-8',
            title: 'Condolence',
            arabic: 'إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى، وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى، فَلْتَصْبِرْ وَلْتَحْتَسِبْ',
            transliteration: 'Inna lillāhi mā akhadh, wa lahu mā aʿṭā, wa kullu shay\'in ʿindahu bi-ajalin musamman, faltaṣbir waltaḥtasib',
            translation: 'Indeed, to Allah belongs what He took and to Him belongs what He gave, and everything with Him has a limited time. So be patient and seek reward.',
            category: 'Illness & Death',
            occasion: 'Offering condolences',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '12-9',
            title: 'When Placing the Deceased in the Grave',
            arabic: 'بِسْمِ اللَّهِ وَعَلَى مِلَّةِ رَسُولِ اللَّهِ',
            transliteration: 'Bismillāhi wa ʿalā millati rasūli Allāh',
            translation: 'In the name of Allah and upon the religion of the Messenger of Allah.',
            category: 'Illness & Death',
            occasion: 'When placing deceased in grave',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '12-10',
            title: 'After Burying the Deceased',
            arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَثَبِّتْهُ، فَإِنَّهُ الْآنَ يُسْأَلُ',
            transliteration: 'Allāhumma ighfir lahu wa thabbithu, fa-innahu al-āna yus\'al',
            translation: 'O Allah, forgive him and make him steadfast, for he is now being questioned.',
            category: 'Illness & Death',
            occasion: 'After burial',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '12-11',
            title: 'When Visiting the Graves',
            arabic: 'السَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ',
            transliteration: 'As-salāmu ʿalaykum dāra qawmin mu\'minīn, wa innā in shā\' Allāhu bikum lāḥiqūn',
            translation: 'Peace be upon you, dwelling place of believing people, and we, Allah willing, will join you.',
            category: 'Illness & Death',
            occasion: 'When visiting graves',
            reference: 'Muslim',
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
          },
          {
            id: '13-3',
            title: 'For Rainfall',
            arabic: 'اللَّهُمَّ اسْقِنَا غَيْثًا مُغِيثًا مَرِيئًا نَافِعًا غَيْرَ ضَارٍّ، عَاجِلًا غَيْرَ آجِلٍ',
            transliteration: 'Allāhumma isqinā ghaythan mughīthan marī\'an nāfiʿan ghayra ḍārr, ʿājilan ghayra ājil',
            translation: 'O Allah, give us beneficial rain, helpful, wholesome, not harmful, sooner rather than later.',
            category: 'Weather & Celestial',
            occasion: 'Asking for rain',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '13-4',
            title: 'During Rainfall',
            arabic: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
            transliteration: 'Allāhumma ṣayyiban nāfiʿan',
            translation: 'O Allah, (let it be) beneficial rain.',
            category: 'Weather & Celestial',
            occasion: 'During rain',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: '13-5',
            title: 'After Rainfall',
            arabic: 'مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ',
            transliteration: 'Muṭirnā bi-faḍli Allāhi wa raḥmatih',
            translation: 'We have been given rain by the grace and mercy of Allah.',
            category: 'Weather & Celestial',
            occasion: 'After rain',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: '13-6',
            title: 'Asking for Clear Skies',
            arabic: 'اللَّهُمَّ حَوَالَيْنَا وَلَا عَلَيْنَا، اللَّهُمَّ عَلَى الْآكَامِ وَالظِّرَابِ وَبُطُونِ الْأَوْدِيَةِ وَمَنَابِتِ الشَّجَرِ',
            transliteration: 'Allāhumma ḥawālaynā wa lā ʿalaynā, Allāhumma ʿalā al-ākāmi waẓ-ẓirābi wa buṭūni al-awdiyati wa manābiti ash-shajar',
            translation: 'O Allah, around us and not upon us. O Allah, on the hills, mountains, valleys and where trees grow.',
            category: 'Weather & Celestial',
            occasion: 'When seeking clear weather',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '13-7',
            title: 'Upon Sighting the Crescent Moon',
            arabic: 'اللَّهُ أَكْبَرُ، اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ',
            transliteration: 'Allāhu akbar, Allāhumma ahillahu ʿalaynā bil-amni wal-īmān, was-salāmati wal-Islām',
            translation: 'Allah is the Greatest. O Allah, bring it over us with security and faith, safety and Islam.',
            category: 'Weather & Celestial',
            occasion: 'Upon seeing new moon',
            reference: 'Tirmidhi',
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
          },
          {
            id: '14-3',
            title: 'Of the Guest for the Host',
            arabic: 'اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ',
            transliteration: 'Allāhumma bārik lahum fīmā razaqtahum, wa ighfir lahum wa irḥamhum',
            translation: 'O Allah, bless them in what You have provided for them, forgive them and have mercy on them.',
            category: 'Eating & Drinking',
            occasion: 'Guest praying for host',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '14-4',
            title: 'When Someone Gives You Food or Drink',
            arabic: 'اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي، وَاسْقِ مَنْ سَقَانِي',
            transliteration: 'Allāhumma aṭʿim man aṭʿamanī, wa isqi man saqānī',
            translation: 'O Allah, feed the one who has fed me, and give drink to the one who has given me drink.',
            category: 'Eating & Drinking',
            occasion: 'When given food or drink',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '14-5',
            title: 'When Breaking Fast in Someone\'s Home',
            arabic: 'أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ، وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ',
            transliteration: 'Afṭara ʿindakumu aṣ-ṣā\'imūn, wa akala ṭaʿāmakumu al-abrār, wa ṣallat ʿalaykumu al-malā\'ikah',
            translation: 'May the fasting break their fast in your home, may the righteous eat your food, and may the angels pray for you.',
            category: 'Eating & Drinking',
            occasion: 'When breaking fast at someone\'s home',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '14-6',
            title: 'When Someone Offers You Food When You Are Fasting (Which You Decline)',
            arabic: 'إِنِّي صَائِمٌ',
            transliteration: 'Innī ṣā\'im',
            translation: 'I am fasting.',
            category: 'Eating & Drinking',
            occasion: 'Declining food while fasting',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '14-7',
            title: 'Upon Breaking Fast',
            arabic: 'ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
            transliteration: 'Dhahaba aẓ-ẓama\', wa ibtallati al-ʿurūq, wa thabata al-ajru in shā\' Allāh',
            translation: 'The thirst is gone, the veins are moistened, and the reward is confirmed, Allah willing.',
            category: 'Eating & Drinking',
            occasion: 'When breaking fast',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '14-8',
            title: 'When Insulted While Fasting',
            arabic: 'إِنِّي امْرُؤٌ صَائِمٌ',
            transliteration: 'Innī imru\'un ṣā\'im',
            translation: 'I am a person who is fasting.',
            category: 'Eating & Drinking',
            occasion: 'When insulted while fasting',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '14-9',
            title: 'Upon Seeing the Early or Premature Fruit',
            arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِي ثَمَرِنَا، وَبَارِكْ لَنَا فِي مَدِينَتِنَا، وَبَارِكْ لَنَا فِي صَاعِنَا وَمُدِّنَا',
            transliteration: 'Allāhumma bārik lanā fī thamarinā, wa bārik lanā fī madīnatinā, wa bārik lanā fī ṣāʿinā wa muddinā',
            translation: 'O Allah, bless us in our fruit, bless us in our city, bless us in our measure and in our measure.',
            category: 'Eating & Drinking',
            occasion: 'Upon seeing early fruit',
            reference: 'Muslim',
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
            title: 'When a Disbeliever Praises Allah After Sneezing',
            arabic: 'يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ',
            transliteration: 'Yahdīkumu Allāhu wa yuṣliḥu bālakum',
            translation: 'May Allah guide you and rectify your condition.',
            category: 'Social Etiquette',
            occasion: 'Response to non-Muslim who sneezes',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '15-3',
            title: 'The Excellence of Spreading the Islamic Greeting',
            arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
            transliteration: 'As-salāmu ʿalaykum wa raḥmatu Allāhi wa barakātuh',
            translation: 'Peace be upon you and the mercy of Allah and His blessings.',
            category: 'Social Etiquette',
            occasion: 'Islamic greeting',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '15-4',
            title: 'Returning a Greeting to a Disbeliever',
            arabic: 'وَعَلَيْكُمْ',
            transliteration: 'Wa ʿalaykum',
            translation: 'And upon you.',
            category: 'Social Etiquette',
            occasion: 'Responding to non-Muslim greeting',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '15-5',
            title: 'Returning an Invocation of Forgiveness',
            arabic: 'وَلَكَ',
            transliteration: 'Wa lak',
            translation: 'And for you too.',
            category: 'Social Etiquette',
            occasion: 'When someone asks for forgiveness for you',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '15-6',
            title: 'When Someone Does Good to You',
            arabic: 'جَزَاكَ اللَّهُ خَيْرًا',
            transliteration: 'Jazāka Allāhu khayran',
            translation: 'May Allah reward you with good.',
            category: 'Social Etiquette',
            occasion: 'When someone does good to you',
            reference: 'Tirmidhi',
            repetitions: 1
          },
          {
            id: '15-7',
            title: 'To One Who Pronounces Their Love for You, for Allah\'s Sake',
            arabic: 'أَحَبَّكَ الَّذِي أَحْبَبْتَنِي لَهُ',
            transliteration: 'Aḥabbaka alladhī aḥbabtanī lah',
            translation: 'May the One for Whose sake you love me, love you.',
            category: 'Social Etiquette',
            occasion: 'When someone expresses love for Allah\'s sake',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '15-8',
            title: 'To One Who Has Offered You Some of Their Wealth',
            arabic: 'بَارَكَ اللَّهُ لَكَ فِي أَهْلِكَ وَمَالِكَ',
            transliteration: 'Bāraka Allāhu laka fī ahlika wa mālik',
            translation: 'May Allah bless you in your family and wealth.',
            category: 'Social Etiquette',
            occasion: 'When offered wealth',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: '15-9',
            title: 'To the Debtor When His Debt is Settled',
            arabic: 'بَارَكَ اللَّهُ لَكَ فِي أَهْلِكَ وَمَالِكَ، إِنَّمَا جَزَاءُ السَّلَفِ الْحَمْدُ وَالْأَدَاءُ',
            transliteration: 'Bāraka Allāhu laka fī ahlika wa mālik, innamā jazā\'u as-salafi al-ḥamdu wal-adā\'',
            translation: 'May Allah bless you in your family and wealth. Indeed, the reward for a loan is praise and repayment.',
            category: 'Social Etiquette',
            occasion: 'When debt is repaid',
            reference: 'Nasai',
            repetitions: 1
          },
          {
            id: '15-10',
            title: 'To Someone Who Says "May Allah Bless You"',
            arabic: 'وَفِيكَ بَارَكَ اللَّهُ',
            transliteration: 'Wa fīka bāraka Allāh',
            translation: 'And may Allah bless you too.',
            category: 'Social Etiquette',
            occasion: 'Response to blessing',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '15-11',
            title: 'At a Sitting or Gathering',
            arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
            transliteration: 'Subḥānaka Allāhumma wa biḥamdika, ashhadu an lā ilāha illā anta, astaghfiruka wa atūbu ilayk',
            translation: 'Glory be to You, O Allah, and praise be to You. I bear witness that there is no god but You. I seek Your forgiveness and repent to You.',
            category: 'Social Etiquette',
            occasion: 'At end of gathering',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '15-12',
            title: 'For the Expiation of Sins, Said at the Conclusion of a Sitting or Gathering',
            arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
            transliteration: 'Subḥānaka Allāhumma wa biḥamdika, ashhadu an lā ilāha illā anta, astaghfiruka wa atūbu ilayk',
            translation: 'Glory be to You, O Allah, and praise be to You. I bear witness that there is no god but You. I seek Your forgiveness and repent to You.',
            category: 'Social Etiquette',
            occasion: 'For expiation at end of gathering',
            reference: 'Abu Dawud, Tirmidhi',
            repetitions: 1
          },
          {
            id: '15-13',
            title: 'For One You Have Insulted',
            arabic: 'اللَّهُمَّ فَأَيُّمَا مُؤْمِنٍ سَبَبْتُهُ فَاجْعَلْ ذَلِكَ لَهُ قُرْبَةً إِلَيْكَ يَوْمَ الْقِيَامَةِ',
            transliteration: 'Allāhumma fa-ayyumā mu\'minin sababtuhu fajʿal dhālika lahu qurbatan ilayka yawma al-qiyāmah',
            translation: 'O Allah, whichever believer I have insulted, make that a means of drawing him closer to You on the Day of Resurrection.',
            category: 'Social Etiquette',
            occasion: 'After insulting someone',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '15-14',
            title: 'The Etiquette of Praising a Fellow Muslim',
            arabic: 'أَحْسِبُهُ كَذَلِكَ، وَلَا أُزَكِّي عَلَى اللَّهِ أَحَدًا',
            transliteration: 'Aḥsibuhu kadhālik, wa lā uzakkī ʿalā Allāhi aḥadan',
            translation: 'I think he is like that, and I do not praise anyone before Allah.',
            category: 'Social Etiquette',
            occasion: 'When praising someone',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '15-15',
            title: 'For the One That Have Been Praised',
            arabic: 'اللَّهُمَّ لَا تُؤَاخِذْنِي بِمَا يَقُولُونَ، وَاغْفِرْ لِي مَا لَا يَعْلَمُونَ، وَاجْعَلْنِي خَيْرًا مِمَّا يَظُنُّونَ',
            transliteration: 'Allāhumma lā tu\'ākhidhnī bimā yaqūlūn, wa ighfir lī mā lā yaʿlamūn, wa ijʿalnī khayran mimmā yaẓunnūn',
            translation: 'O Allah, do not call me to account for what they say, forgive me for what they do not know, and make me better than what they think.',
            category: 'Social Etiquette',
            occasion: 'When being praised',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: '15-16',
            title: 'Upon Seeing Someone in Trial or Tribulation',
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ، وَفَضَّلَنِي عَلَى كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلًا',
            transliteration: 'Al-ḥamdu lillāhi alladhī ʿāfānī mimmā ibtalāka bih, wa faḍḍalanī ʿalā kathīrin mimman khalaqa tafḍīlan',
            translation: 'Praise be to Allah who has spared me from that with which He has afflicted you, and has favored me over many of those He has created.',
            category: 'Social Etiquette',
            occasion: 'Upon seeing someone in trial',
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
          },
          {
            id: '16-3',
            title: 'Upon Entering a Town or Village',
            arabic: 'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ، وَرَبَّ الْأَرَضِينَ السَّبْعِ وَمَا أَقْلَلْنَ، وَرَبَّ الشَّيَاطِينِ وَمَا أَضْلَلْنَ، وَرَبَّ الرِّيَاحِ وَمَا ذَرَيْنَ، أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا وَخَيْرَ مَا فِيهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا وَشَرِّ مَا فِيهَا',
            transliteration: 'Allāhumma rabba as-samāwāti as-sabʿi wa mā aẓlalna, wa rabba al-araḍīna as-sabʿi wa mā aqlaln, wa rabba ash-shayāṭīni wa mā aḍlaln, wa rabba ar-riyāḥi wa mā dharayn, as\'aluka khayra hādhihi al-qaryati wa khayra ahlihā wa khayra mā fīhā, wa aʿūdhu bika min sharrihā wa sharri ahlihā wa sharri mā fīhā',
            translation: 'O Allah, Lord of the seven heavens and what they overshadow, Lord of the seven earths and what they carry, Lord of the devils and what they misguide, Lord of the winds and what they scatter, I ask You for the good of this town, the good of its people and the good that is in it, and I seek refuge in You from its evil, the evil of its people and the evil that is in it.',
            category: 'Travel & Riding',
            occasion: 'When entering a town',
            reference: 'Nasai, Hakim',
            repetitions: 1
          },
          {
            id: '16-4',
            title: 'When Your Vehicle Stumbles',
            arabic: 'بِسْمِ اللَّهِ',
            transliteration: 'Bismillāh',
            translation: 'In the name of Allah.',
            category: 'Travel & Riding',
            occasion: 'When vehicle stumbles',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '16-5',
            title: 'The Traveler for the Resident',
            arabic: 'أَسْتَوْدِعُكُمُ اللَّهَ الَّذِي لَا تَضِيعُ وَدَائِعُهُ',
            transliteration: 'Astawdiʿukumu Allāha alladhī lā taḍīʿu wadā\'iʿuh',
            translation: 'I entrust you to Allah, whose deposits are never lost.',
            category: 'Travel & Riding',
            occasion: 'Traveler\'s farewell to residents',
            reference: 'Ahmad, Ibn Majah',
            repetitions: 1
          },
          {
            id: '16-6',
            title: 'The Resident for the Traveler',
            arabic: 'زَوَّدَكَ اللَّهُ التَّقْوَى، وَغَفَرَ ذَنْبَكَ، وَيَسَّرَ لَكَ الْخَيْرَ حَيْثُ مَا كُنْتَ',
            transliteration: 'Zawwadaka Allāhu at-taqwā, wa ghafara dhanbaka, wa yassara laka al-khayra ḥaythu mā kunt',
            translation: 'May Allah give you piety as provision, forgive your sins, and make good easy for you wherever you are.',
            category: 'Travel & Riding',
            occasion: 'Resident\'s farewell to traveler',
            reference: 'Tirmidhi',
            repetitions: 1
          },
          {
            id: '16-7',
            title: 'Glorifying and Magnifying Allah During Travel',
            arabic: 'سُبْحَانَ اللَّهِ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ',
            transliteration: 'Subḥān Allāh, Allāhu akbar, lā ilāha illā Allāh',
            translation: 'Glory be to Allah, Allah is the Greatest, there is no god but Allah.',
            category: 'Travel & Riding',
            occasion: 'During travel',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '16-8',
            title: 'The Traveler as Dawn Approaches',
            arabic: 'سَمِعَ سَامِعٌ بِحَمْدِ اللَّهِ وَحُسْنِ بَلَائِهِ عَلَيْنَا، رَبَّنَا صَاحِبْنَا وَأَفْضِلْ عَلَيْنَا، عَائِذًا بِاللَّهِ مِنَ النَّارِ',
            transliteration: 'Samiʿa sāmiʿun bi-ḥamdi Allāhi wa ḥusni balā\'ihi ʿalaynā, rabbanā ṣāḥibnā wa afḍil ʿalaynā, ʿā\'idhan billāhi min an-nār',
            translation: 'May a listener hear our praise of Allah and His beautiful trial upon us. Our Lord, be our companion and bestow favor upon us. I seek refuge in Allah from the Fire.',
            category: 'Travel & Riding',
            occasion: 'At dawn during travel',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '16-9',
            title: 'Stopping Along the Way of a Travel',
            arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
            transliteration: 'Aʿūdhu bi-kalimāti Allāhi at-tāmmāti min sharri mā khalaq',
            translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
            category: 'Travel & Riding',
            occasion: 'When stopping during travel',
            reference: 'Muslim',
            repetitions: 1
          },
          {
            id: '16-10',
            title: 'Upon Returning from Travel',
            arabic: 'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',
            transliteration: 'Āyibūna tā\'ibūna ʿābidūna li-rabbinā ḥāmidūn',
            translation: 'We return, repent, worship and praise our Lord.',
            category: 'Travel & Riding',
            occasion: 'When returning from travel',
            reference: 'Bukhari and Muslim',
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
            title: 'The Pilgrim\'s Announcement of His Arrival for Hajj or \'Umrah',
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
            title: 'Saying "Allahu Akbar" When Passing the Black Stone',
            arabic: 'اللَّهُ أَكْبَرُ',
            transliteration: 'Allāhu akbar',
            translation: 'Allah is the Greatest.',
            category: 'Hajj & Umrah',
            occasion: 'When passing Black Stone',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: '17-3',
            title: 'Between the Yemeni Corner and the Black Stone',
            arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
            transliteration: 'Rabbanā ātinā fī ad-dunyā ḥasanatan wa fī al-ākhirati ḥasanatan wa qinā ʿadhāb an-nār',
            translation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
            category: 'Hajj & Umrah',
            occasion: 'During Tawaf',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '17-4',
            title: 'While Standing at Safa and Marwah',
            arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ',
            transliteration: 'Inna aṣ-ṣafā wal-marwata min shaʿā\'iri Allāh',
            translation: 'Indeed, Safa and Marwah are among the symbols of Allah.',
            category: 'Hajj & Umrah',
            occasion: 'At Safa and Marwah',
            reference: 'Quran 2:158',
            repetitions: 1
          },
          {
            id: '17-5',
            title: 'The Day of \'Arafah',
            arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
            transliteration: 'Lā ilāha illā Allāhu waḥdahu lā sharīka lahu, lahu al-mulku wa lahu al-ḥamdu, wa huwa ʿalā kulli shay\'in qadīr',
            translation: 'There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things.',
            category: 'Hajj & Umrah',
            occasion: 'On the Day of Arafah',
            reference: 'Tirmidhi',
            repetitions: 100
          },
          {
            id: '17-6',
            title: 'At the Sacred Area of Muzdalifah',
            arabic: 'اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ',
            transliteration: 'Allāhu akbar, lā ilāha illā Allāh',
            translation: 'Allah is the Greatest, there is no god but Allah.',
            category: 'Hajj & Umrah',
            occasion: 'At Muzdalifah',
            reference: 'Bukhari',
            repetitions: 1
          },
          {
            id: '17-7',
            title: 'Saying "Allahu Akbar" While Stoning the Three Pillars at Mina',
            arabic: 'اللَّهُ أَكْبَرُ',
            transliteration: 'Allāhu akbar',
            translation: 'Allah is the Greatest.',
            category: 'Hajj & Umrah',
            occasion: 'When stoning pillars',
            reference: 'Bukhari',
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
          },
          {
            id: '18-3',
            title: 'Upon Receiving Pleasant News',
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
            transliteration: 'Al-ḥamdu lillāhi alladhī bi-niʿmatihi tatimmu aṣ-ṣāliḥāt',
            translation: 'Praise be to Allah by whose favor good deeds are accomplished.',
            category: 'Miscellaneous',
            occasion: 'Upon receiving good news',
            reference: 'Ibn Majah',
            repetitions: 1
          },
          {
            id: '18-4',
            title: 'Upon Receiving Pleasing or Displeasing News',
            arabic: 'اللَّهُمَّ لَا يَأْتِي بِالْحَسَنَاتِ إِلَّا أَنْتَ، وَلَا يَدْفَعُ السَّيِّئَاتِ إِلَّا أَنْتَ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِكَ',
            transliteration: 'Allāhumma lā ya\'tī bil-ḥasanāti illā ant, wa lā yadfaʿu as-sayyi\'āti illā ant, wa lā ḥawla wa lā quwwata illā bik',
            translation: 'O Allah, none can bring good things except You, and none can ward off bad things except You, and there is no power and no strength except with You.',
            category: 'Miscellaneous',
            occasion: 'Upon receiving any news',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '18-5',
            title: 'What to Say When You Feel a Pain in Your Body',
            arabic: 'أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ',
            transliteration: 'Aʿūdhu billāhi wa qudratihi min sharri mā ajidu wa uḥādhir',
            translation: 'I seek refuge in Allah and in His power from the evil of what I feel and fear.',
            category: 'Miscellaneous',
            occasion: 'When feeling pain',
            reference: 'Muslim',
            repetitions: 7
          },
          {
            id: '18-6',
            title: 'When Slaughtering or Offering a Sacrifice',
            arabic: 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ، اللَّهُمَّ مِنْكَ وَلَكَ',
            transliteration: 'Bismillāh, Allāhu akbar, Allāhumma minka wa lak',
            translation: 'In the name of Allah, Allah is the Greatest. O Allah, from You and for You.',
            category: 'Miscellaneous',
            occasion: 'When slaughtering',
            reference: 'Abu Dawud',
            repetitions: 1
          },
          {
            id: '18-7',
            title: 'Against Evil Omens',
            arabic: 'اللَّهُمَّ لَا طَيْرَ إِلَّا طَيْرُكَ، وَلَا خَيْرَ إِلَّا خَيْرُكَ، وَلَا إِلَهَ غَيْرُكَ',
            transliteration: 'Allāhumma lā ṭayra illā ṭayruk, wa lā khayra illā khayruk, wa lā ilāha ghayruk',
            translation: 'O Allah, there is no omen except Your omen, no good except Your good, and no god other than You.',
            category: 'Miscellaneous',
            occasion: 'Against bad omens',
            reference: 'Ahmad',
            repetitions: 1
          },
          {
            id: '18-8',
            title: 'For Allah\'s Protection from the False Messiah',
            arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
            transliteration: 'Allāhumma innī aʿūdhu bika min ʿadhābi jahannam, wa min ʿadhābi al-qabr, wa min fitnati al-maḥyā wal-mamāt, wa min sharri fitnati al-masīḥi ad-dajjāl',
            translation: 'O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the trial of the False Messiah.',
            category: 'Miscellaneous',
            occasion: 'Seeking protection from Dajjal',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '18-9',
            title: 'Upon Hearing the Cock\'s Crow or the Bray of a Donkey',
            arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ',
            transliteration: 'Allāhumma innī as\'aluka min faḍlika wa raḥmatik',
            translation: 'O Allah, I ask You from Your bounty and mercy (when hearing a rooster). When hearing a donkey: I seek refuge in Allah from Satan.',
            category: 'Miscellaneous',
            occasion: 'Upon hearing animals',
            reference: 'Bukhari and Muslim',
            repetitions: 1
          },
          {
            id: '18-10',
            title: 'Upon Hearing a Dog Barking at Night',
            arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
            transliteration: 'Aʿūdhu billāhi min ash-shayṭāni ar-rajīm',
            translation: 'I seek refuge in Allah from Satan the accursed.',
            category: 'Miscellaneous',
            occasion: 'When hearing dog bark at night',
            reference: 'Abu Dawud',
            repetitions: 1
          }
        ]
      }
    ]
  },
  {
    id: 'quranic-supplications',
    title: 'Quranic Supplications',
    description: 'The Importance of Quranic Supplications\n\nQuranic supplications are the direct words of Allah, revealed in the Holy Quran as perfect examples of how to call upon Him. These duas were made by the Prophets and righteous believers, and Allah preserved them in His final revelation as guidance for all humanity. When we recite Quranic supplications, we use the exact words that Allah chose and approved, making them the most powerful and accepted forms of dua. These supplications teach us the proper etiquette of calling upon Allah and demonstrate how the Prophets sought His help in times of need, guidance, and gratitude.',
    categories: ['quranic'],
    icon: 'library',
    subcategories: [
      {
        id: 'prophet-adam',
        name: 'Prophet Adam',
        description: 'Supplications of Prophet Adam (peace be upon him)',
        icon: 'person',
        category: 'Prophet Adam',
        duas: [
          {
            id: 'adam-1',
            title: 'Adam\'s Repentance',
            arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
            transliteration: 'Rabbanā ẓalamnā anfusanā wa in lam taghfir lanā wa tarḥamnā la-nakūnanna min al-khāsirīn',
            translation: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
            category: 'Prophet Adam',
            occasion: 'Seeking forgiveness',
            reference: 'Quran 7:23',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-nooh',
        name: 'Prophet Nooh (Noah)',
        description: 'Supplications of Prophet Nooh (peace be upon him)',
        icon: 'boat',
        category: 'Prophet Nooh',
        duas: [
          {
            id: 'nooh-1',
            title: 'Nooh\'s Call for Help',
            arabic: 'رَّبِّ إِنِّي مَغْلُوبٌ فَانتَصِرْ',
            transliteration: 'Rabbi innī maghlūbun fantaṣir',
            translation: 'My Lord, indeed I am overpowered, so help me.',
            category: 'Prophet Nooh',
            occasion: 'When seeking Allah\'s help',
            reference: 'Quran 54:10',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-hood',
        name: 'Prophet Hood',
        description: 'Supplications of Prophet Hood (peace be upon him)',
        icon: 'cloudy',
        category: 'Prophet Hood',
        duas: [
          {
            id: 'hood-1',
            title: 'Hood\'s Trust in Allah',
            arabic: 'إِنِّي تَوَكَّلْتُ عَلَى اللَّهِ رَبِّي وَرَبِّكُم مَّا مِن دَابَّةٍ إِلَّا هُوَ آخِذٌ بِنَاصِيَتِهَا إِنَّ رَبِّي عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
            transliteration: 'Innī tawakkaltu ʿalā Allāhi rabbī wa rabbikum mā min dābbatin illā huwa ākhidhun bi-nāṣiyatihā inna rabbī ʿalā ṣirāṭin mustaqīm',
            translation: 'Indeed, I have relied upon Allah, my Lord and your Lord. There is no creature but that He holds its forelock. Indeed, my Lord is on a path that is straight.',
            category: 'Prophet Hood',
            occasion: 'Trusting in Allah',
            reference: 'Quran 11:56',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-ibrahim',
        name: 'Prophet Ibrahim (Abraham)',
        description: 'Supplications of Prophet Ibrahim (peace be upon him)',
        icon: 'star',
        category: 'Prophet Ibrahim',
        duas: [
          {
            id: 'ibrahim-1',
            title: 'Ibrahim\'s Prayer for Guidance',
            arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
            transliteration: 'Rabbi ijʿalnī muqīma aṣ-ṣalāti wa min dhurriyyatī rabbanā wa taqabbal duʿā\'',
            translation: 'My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.',
            category: 'Prophet Ibrahim',
            occasion: 'For establishing prayer',
            reference: 'Quran 14:40',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-lot',
        name: 'Prophet Lot (Lut)',
        description: 'Supplications of Prophet Lot (peace be upon him)',
        icon: 'shield',
        category: 'Prophet Lot',
        duas: [
          {
            id: 'lot-1',
            title: 'Lot\'s Call for Help',
            arabic: 'رَبِّ انصُرْنِي عَلَى الْقَوْمِ الْمُفْسِدِينَ',
            transliteration: 'Rabbi unṣurnī ʿalā al-qawmi al-mufsidīn',
            translation: 'My Lord, support me against the corrupting people.',
            category: 'Prophet Lot',
            occasion: 'Against corruption',
            reference: 'Quran 29:30',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-shuaib',
        name: 'Prophet Shuaib (Jethro)',
        description: 'Supplications of Prophet Shuaib (peace be upon him)',
        icon: 'scale',
        category: 'Prophet Shuaib',
        duas: [
          {
            id: 'shuaib-1',
            title: 'Shuaib\'s Trust in Allah',
            arabic: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ',
            transliteration: 'Wa mā tawfīqī illā billāh ʿalayhi tawakkaltu wa ilayhi unīb',
            translation: 'And my success is not but through Allah. Upon Him I have relied, and to Him I return.',
            category: 'Prophet Shuaib',
            occasion: 'Trusting in Allah',
            reference: 'Quran 11:88',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-yaqub',
        name: 'Prophet Yaqub (Jacob)',
        description: 'Supplications of Prophet Yaqub (peace be upon him)',
        icon: 'family',
        category: 'Prophet Yaqub',
        duas: [
          {
            id: 'yaqub-1',
            title: 'Yaqub\'s Patience',
            arabic: 'فَصَبْرٌ جَمِيلٌ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ',
            transliteration: 'Fa-ṣabrun jamīlun wa Allāhu al-mustaʿānu ʿalā mā taṣifūn',
            translation: 'So patience is most fitting. And Allah is the one sought for help against that which you describe.',
            category: 'Prophet Yaqub',
            occasion: 'For patience',
            reference: 'Quran 12:18',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-yusuf',
        name: 'Prophet Yusuf (Joseph)',
        description: 'Supplications of Prophet Yusuf (peace be upon him)',
        icon: 'diamond',
        category: 'Prophet Yusuf',
        duas: [
          {
            id: 'yusuf-1',
            title: 'Yusuf\'s Prayer for Righteousness',
            arabic: 'رَبِّ قَدْ آتَيْتَنِي مِنَ الْمُلْكِ وَعَلَّمْتَنِي مِن تَأْوِيلِ الْأَحَادِيثِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ أَنتَ وَلِيِّي فِي الدُّنْيَا وَالْآخِرَةِ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ',
            transliteration: 'Rabbi qad ātaytanī min al-mulki wa ʿallamtanī min ta\'wīli al-aḥādīth fāṭira as-samāwāti wal-arḍi anta waliyyī fī ad-dunyā wal-ākhirati tawaffanī musliman wa alḥiqnī biṣ-ṣāliḥīn',
            translation: 'My Lord, You have given me [something] of sovereignty and taught me of the interpretation of dreams. Creator of the heavens and earth, You are my protector in this world and in the Hereafter. Cause me to die a Muslim and join me with the righteous.',
            category: 'Prophet Yusuf',
            occasion: 'For righteous death',
            reference: 'Quran 12:101',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-ayyub',
        name: 'Prophet Ayyub (Job)',
        description: 'Supplications of Prophet Ayyub (peace be upon him)',
        icon: 'medical',
        category: 'Prophet Ayyub',
        duas: [
          {
            id: 'ayyub-1',
            title: 'Ayyub\'s Call During Hardship',
            arabic: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
            transliteration: 'Annī massaniya aḍ-ḍurru wa anta arḥamu ar-rāḥimīn',
            translation: 'Indeed, adversity has touched me, and You are the most merciful of the merciful.',
            category: 'Prophet Ayyub',
            occasion: 'During hardship',
            reference: 'Quran 21:83',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-yunus',
        name: 'Prophet Yunus (Jonah)',
        description: 'Supplications of Prophet Yunus (peace be upon him)',
        icon: 'fish',
        category: 'Prophet Yunus',
        duas: [
          {
            id: 'yunus-1',
            title: 'Yunus\'s Call from the Whale',
            arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
            transliteration: 'Lā ilāha illā anta subḥānaka innī kuntu min aẓ-ẓālimīn',
            translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
            category: 'Prophet Yunus',
            occasion: 'Seeking forgiveness',
            reference: 'Quran 21:87',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-musa',
        name: 'Prophet Musa (Moses)',
        description: 'Supplications of Prophet Musa (peace be upon him)',
        icon: 'flash',
        category: 'Prophet Musa',
        duas: [
          {
            id: 'musa-1',
            title: 'Musa\'s Prayer for Guidance',
            arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي',
            transliteration: 'Rabbi ishraḥ lī ṣadrī wa yassir lī amrī wa uḥlul ʿuqdatan min lisānī yafqahū qawlī',
            translation: 'My Lord, expand for me my breast and ease for me my task and untie the knot from my tongue that they may understand my speech.',
            category: 'Prophet Musa',
            occasion: 'For guidance and ease',
            reference: 'Quran 20:25-28',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-dawud',
        name: 'Prophet Dawud (David)',
        description: 'Supplications of Prophet Dawud (peace be upon him)',
        icon: 'musical-notes',
        category: 'Prophet Dawud',
        duas: [
          {
            id: 'dawud-1',
            title: 'Dawud\'s Repentance',
            arabic: 'رَبِّ اغْفِرْ لِي ذَنْبِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي إِنَّكَ أَنتَ الْوَهَّابُ',
            transliteration: 'Rabbi ighfir lī dhanbī wa hab lī mulkan lā yanbaghī li-aḥadin min baʿdī innaka anta al-wahhāb',
            translation: 'My Lord, forgive me my sin and grant me a kingdom such as will not belong to anyone after me. Indeed, You are the Bestower.',
            category: 'Prophet Dawud',
            occasion: 'Seeking forgiveness',
            reference: 'Quran 38:35',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-sulaiman',
        name: 'Prophet Sulaiman (Solomon)',
        description: 'Supplications of Prophet Sulaiman (peace be upon him)',
        icon: 'crown',
        category: 'Prophet Sulaiman',
        duas: [
          {
            id: 'sulaiman-1',
            title: 'Sulaiman\'s Gratitude',
            arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
            transliteration: 'Rabbi awziʿnī an ashkura niʿmataka allatī anʿamta ʿalayya wa ʿalā wālidayya wa an aʿmala ṣāliḥan tarḍāhu wa adkhilnī bi-raḥmatika fī ʿibādika aṣ-ṣāliḥīn',
            translation: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And admit me by Your mercy into [the ranks of] Your righteous servants.',
            category: 'Prophet Sulaiman',
            occasion: 'For gratitude',
            reference: 'Quran 27:19',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-zakariya',
        name: 'Prophet Zakariya (Zechariah)',
        description: 'Supplications of Prophet Zakariya (peace be upon him)',
        icon: 'person-add',
        category: 'Prophet Zakariya',
        duas: [
          {
            id: 'zakariya-1',
            title: 'Zakariya\'s Prayer for Offspring',
            arabic: 'رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ',
            transliteration: 'Rabbi hab lī min ladunka dhurriyyatan ṭayyibatan innaka samīʿu ad-duʿā\'',
            translation: 'My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.',
            category: 'Prophet Zakariya',
            occasion: 'For righteous offspring',
            reference: 'Quran 3:38',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-isa',
        name: 'Prophet Isa (Jesus)',
        description: 'Supplications of Prophet Isa (peace be upon him)',
        icon: 'heart',
        category: 'Prophet Isa',
        duas: [
          {
            id: 'isa-1',
            title: 'Isa\'s Prayer for the Table',
            arabic: 'اللَّهُمَّ رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ',
            transliteration: 'Allāhumma rabbanā anzil ʿalaynā mā\'idatan min as-samā\'i takūnu lanā ʿīdan li-awwalinā wa ākhirinā wa āyatan minka wa urzuqnā wa anta khayru ar-rāziqīn',
            translation: 'O Allah, our Lord, send down to us a table [spread with food] from the heaven to be for us a festival for the first of us and the last of us and a sign from You. And provide for us, and You are the best of providers.',
            category: 'Prophet Isa',
            occasion: 'Seeking provision',
            reference: 'Quran 5:114',
            repetitions: 1
          }
        ]
      },
      {
        id: 'prophet-muhammad',
        name: 'Prophet Muhammad ﷺ',
        description: 'Supplications of Prophet Muhammad (peace be upon him)',
        icon: 'star-half',
        category: 'Prophet Muhammad',
        duas: [
          {
            id: 'muhammad-1',
            title: 'The Prophet\'s Comprehensive Prayer',
            arabic: 'اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي',
            transliteration: 'Allāhumma aṣliḥ lī dīnī alladhī huwa ʿiṣmatu amrī, wa aṣliḥ lī dunyāya allatī fīhā maʿāshī, wa aṣliḥ lī ākhiratī allatī fīhā maʿādī',
            translation: 'O Allah, make my religion right for me, which is the safeguard of my affairs. Make my world right for me, in which is my livelihood. Make my Hereafter right for me, to which is my return.',
            category: 'Prophet Muhammad',
            occasion: 'Comprehensive prayer',
            reference: 'Muslim',
            repetitions: 1
          }
        ]
      },
      {
        id: 'supplication-believers',
        name: 'The Supplication of the Believers',
        description: 'General supplications mentioned in the Quran for believers',
        icon: 'people',
        category: 'Believers',
        duas: [
          {
            id: 'believers-1',
            title: 'Prayer for This World and the Next',
            arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
            transliteration: 'Rabbanā ātinā fī ad-dunyā ḥasanatan wa fī al-ākhirati ḥasanatan wa qinā ʿadhāb an-nār',
            translation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
            category: 'Believers',
            occasion: 'General supplication',
            reference: 'Quran 2:201',
            repetitions: 1
          },
          {
            id: 'believers-2',
            title: 'Prayer for Forgiveness',
            arabic: 'رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
            transliteration: 'Rabbanā ighfir lanā dhunūbanā wa isrāfanā fī amrinā wa thabbit aqdāmanā wa unṣurnā ʿalā al-qawmi al-kāfirīn',
            translation: 'Our Lord, forgive us our sins and the excess [committed] in our affairs and plant firmly our feet and give us victory over the disbelieving people.',
            category: 'Believers',
            occasion: 'Seeking forgiveness and victory',
            reference: 'Quran 3:147',
            repetitions: 1
          }
        ]
      }
    ]
  }
];