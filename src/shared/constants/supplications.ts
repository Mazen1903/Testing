import { ZikrSeries, ZikrCategory, SubCategory } from '../types/supplications';

export const ZIKR_CATEGORIES: ZikrCategory[] = [
  { id: 'all', name: 'All', icon: 'apps' },
  { id: 'morning', name: 'Morning', icon: 'sunny' },
  { id: 'evening', name: 'Evening', icon: 'moon' },
  { id: 'sleep', name: 'Sleep', icon: 'bed' },
  { id: 'waking', name: 'Waking', icon: 'sunny-outline' },
  { id: 'restroom', name: 'Restroom', icon: 'home' },
  { id: 'mosque', name: 'Mosque', icon: 'business' },
];

export const ZIKR_SERIES: ZikrSeries[] = [
  {
    id: '1',
    title: 'Morning Adhkar',
    description: 'Complete series of morning remembrance',
    category: 'morning',
    icon: 'sunny',
    duas: [
      {
        id: '1-1',
        title: 'Morning Declaration',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
        transliteration: 'Asbahnaa wa asbahal-mulku lillahi, walhamdu lillahi',
        translation: 'We have entered the morning and the kingdom belongs to Allah, and praise belongs to Allah',
        category: 'morning',
        occasion: 'Morning',
        reference: 'Sahih Muslim',
        fullReference: 'This supplication is reported in Sahih Muslim (2723) on the authority of Ibn Mas\'ud (may Allah be pleased with him). The Prophet (peace be upon him) used to recite this dua when he woke up in the morning, acknowledging Allah\'s sovereignty over all creation. This declaration serves as a reminder that everything belongs to Allah and that we should start our day with gratitude and recognition of His lordship. The scholars recommend reciting this immediately upon waking up to begin the day with remembrance of Allah.',
        repetitions: 1
      },
      {
        id: '1-2',
        title: 'Seeking Protection',
        arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
        transliteration: 'A\'udhu billahi minash-shaytanir-rajeem',
        translation: 'I seek refuge in Allah from Satan the accursed',
        category: 'morning',
        occasion: 'Morning',
        reference: 'Quran',
        fullReference: 'This is from the Quran (16:98) where Allah says: "So when you recite the Quran, [first] seek refuge in Allah from Satan, the expelled [from His mercy]." This formula of seeking refuge (Ta\'awwudh) is recommended before reciting the Quran, performing prayers, or beginning any important task. It serves as spiritual protection against the whispers and temptations of Satan. The scholars emphasize that saying this with sincerity and understanding creates a barrier between the believer and Satan\'s influence. It is particularly powerful when recited in the morning as it provides protection throughout the day.',
        repetitions: 3
      },
      {
        id: '1-3',
        title: 'Subhan Allah',
        arabic: 'سُبْحَانَ اللَّهِ',
        transliteration: 'Subhan Allah',
        translation: 'Glory be to Allah',
        category: 'morning',
        occasion: 'Morning',
        reference: 'Sahih Bukhari',
        repetitions: 33
      }
    ]
  },
  {
    id: '2',
    title: 'Evening Adhkar',
    description: 'Complete series of evening remembrance and night supplications',
    category: 'evening',
    icon: 'moon',
    duas: [
      {
        id: '2-1',
        title: 'Evening Declaration',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
        transliteration: 'Amsayna wa amsal-mulku lillahi, walhamdu lillahi',
        translation: 'We have entered the evening and the kingdom belongs to Allah, and praise belongs to Allah',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Sahih Muslim',
        fullReference: 'This evening supplication is also reported in Sahih Muslim (2723) as part of the comprehensive adhkar taught by the Prophet (peace be upon him). Just as the morning declaration acknowledges Allah\'s sovereignty at the start of the day, this evening version serves the same purpose as we transition into night. This dua helps Muslims end their day with the remembrance of Allah, reflecting on His continuous dominion over all creation. The timing is significant - it should be recited as the sun sets and evening approaches, marking the end of the day with gratitude and submission to Allah\'s will.',
        repetitions: 1
      },
      {
        id: '2-2',
        title: 'Ayat Al-Kursi',
        arabic: 'أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ "اللهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ"',
        transliteration: '\'A \'oothu billaahi minash-Shaytaanir-rajeem. Allaahu laa \'ilaaha \'illaa Huwal-Hayyul-Qayyoom, laa ta\'khuthuhu sinatun wa laa nawm, lahu maa fis-samaawaati wa maa fil-\'ardh, man thai-lathee yashfa\'u \'indahu \'illaa bi\'ithnih, ya\'lamu maa bayna \'aydeehim wa maa khalfahum, wa laa yuheetoona bishay\'im-min \'ilmihi \'illaa bimaa shaa\'a, wasi\'a kursiyyuhus samaawaati wal\'ardh, wa laa ya\'ooduhu hifdhuhumaa, wa Huwal- \'Aliyyul- \'Adheem',
        translation: 'I seek refuge in Allah from Satan the outcast. - Allah! There is none worthy of worship but He, the Ever Living, the One Who sustains and protects all that exists. Neither slumber nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who is he that can intercede with Him except with His Permission? He knows what happens to them in this world, and what will happen to them in the Hereafter. And they will never encompass anything of His Knowledge except that which He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them. And He is the Most High, the Most Great',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Whoever says this when he rises in the morning will be protected from jinns until he retires in the evening, and whoever says it when retiring in the evening will be protected from them until he rises in the morning. It was reported by Al-Hakim 1/562, Al-Albani graded it as authentic in Sahihut-Targhib wat-Tarhib 1/273',
        repetitions: 1
      },
      {
        id: '2-3',
        title: 'Surah Al-Ikhlas',
        arabic: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ "قُلْ هُوَ اللهُ أَحَدٌ ۞ اللهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"',
        transliteration: 'Bismillaahir-Rahmaanir-Raheem. Qul Huwallaahu \'Ahad. Allaahus-Samad. Lam yalid wa lam yoolad. Wa lam yakun lahu kufuwan \'ahad',
        translation: 'With the Name of Allah, the Most Gracious, the Most Merciful. Say: He is Allah (the) One. The Self-Sufficient Master, Whom all creatures need, He begets not nor was He begotten, and there is none equal to Him',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Quran 112',
        repetitions: 3
      },
      {
        id: '2-4',
        title: 'Surah Al-Falaq',
        arabic: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۞ مِن شَرِّ مَا خَلَقَ ۞ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۞ وَمِن شَرِّ النَّفّٰثَٰتِ فِي الْعُقَدِ ۞ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"',
        transliteration: 'Bismillaahir-Rahmaanir-Raheem. Qul \'a\'oothu birabbil-falaq. Min sharri ma khalaq. Wa min sharri ghaasiqin \'ithaa waqab. Wa min sharrin-naffaathaati fil-\'uqad. Wa min sharri haasidin \'ithaa hasad',
        translation: 'With the Name of Allah, the Most Gracious, the Most Merciful. Say: I seek refuge with (Allah) the Lord of the daybreak, from the evil of what He has created, and from the evil of the darkening (night) as it comes with its darkness, and from the evil of those who practice witchcraft when they blow in the knots, and from the evil of the envier when he envies',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Quran 113',
        repetitions: 3
      },
      {
        id: '2-5',
        title: 'Surah An-Nas',
        arabic: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۞ مَلِكِ النَّاسِ ۞ إِلَهِ النَّاسِ ۞ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۞ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۞ مِنَ الْجِنَّةِ وَالنَّاسِ"',
        transliteration: 'Bismillaahir-Rahmaanir-Raheem. Qul \'a\'oothu birabbin-naas. Malikin-naas. \'Ilaahin-naas. Min sharril-waswaasil-khannaas. Allathee yuwaswisu fee sudoorin-naas. Minal-jinnati wannaas',
        translation: 'With the Name of Allah, the Most Gracious, the Most Merciful. Say: I seek refuge with (Allah) the Lord of mankind, the King of mankind, the God of mankind, from the evil of the whisperer who withdraws, who whispers in the breasts of mankind, of jinns and men',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Quran 114',
        repetitions: 3
      },
      {
        id: '2-6',
        title: 'Evening Declaration Extended',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
        transliteration: '\'Amsaynaa wa\'amsal-mulku lillaah walhamdu lillaahi, laa \'ilaaha \'illallaahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu wa Huwa \'alaa kulli shay\'in Qadeer. Rabbi \'as\'aluka khayra maa fee haathihil-laylati, wa khayra maa ba\'dahaa, wa \'a\'oothu bika min sharri maa fee haathihil-laylati wa sharri maa ba\'dahaa, Rabbi \'a\'oothu bika minal-kasali, wa soo\'il-kibari, Rabbi \'a\'oothu bika min \'athaabin fin-naari wa \'athaabin fil-qabri',
        translation: 'We have ended another day and with it all dominion is Allah\'s. Praise is to Allah. None has the right to be worshipped but Allah alone, Who has no partner. To Allah belongs the dominion, and to Him is the praise and He is Able to do all things. My Lord, I ask You for the good things of this night and of the nights that come after it and I seek refuge in You from the evil of this night and of the nights that come after it. My Lord, I seek refuge in You from laziness and helpless old age. My Lord, I seek refuge in You from the punishment of Hell-fire, and from the punishment of the grave',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Muslim 4/2088',
        repetitions: 1
      },
      {
        id: '2-7',
        title: 'Evening with Allah',
        arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
        transliteration: 'Allaahumma bika \'amsaynaa wa bika \'asbahnaa, wa bika nahyaa, wa bika namoot, wa \'ilaykal-maseer',
        translation: 'O Allah, You bring us the end of the day as You bring us its beginning, You bring us life and you bring us death, and to You is our fate',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Sahih At-Tirmithi 3/142',
        repetitions: 1
      },
      {
        id: '2-8',
        title: 'Master of Forgiveness',
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لّا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِر لِي ذُنُوبِي جَمِيعاً إِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
        transliteration: 'Allaahumma \'Anta Rabbee laa \'ilaaha \'illaa \'Anta, khalaqtanee wa \'anaa \'abduka, wa \'anaa \'alaa \'ahdika wa wa\'dika mas-tata\'tu, \'a\'oothu bika min sharri maa sana\'tu, \'aboo\'u laka bini\'matika \'alayya, wa \'aboo\'u bithanbee faghfir lee fa\'innahu laa yaghfiruth-thunooba \'illaa \'Anta',
        translation: 'O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am your slave. I keep Your covenant, and my pledge to You so far as I am able. I seek refuge in You from the evil of what I have done. I admit to Your blessings upon me, and I admit to my misdeeds. Forgive me, for there is none who may forgive sins but You',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Whoever recites this with conviction in the evening and dies during that night shall enter Paradise, and whoever recites it with conviction in the morning and dies during that day shall enter Paradise, Al-Bukhari 7/150',
        repetitions: 1
      },
      {
        id: '2-9',
        title: 'Witnessing Allah',
        arabic: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ، لَا إِلٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
        transliteration: 'Allaahumma \'innee \'amsaytu \'ush-hiduka wa \'ush-hidu hamalata \'arshika, wa malaa\'ikataka wajamee\'a khalqika, \'annaka \'Antallaahu laa \'ilaaha \'illaa \'Anta wahdaka laa shareeka laka, wa \'anna Muhammadan \'abduka wa Rasooluka',
        translation: 'O Allah, I have ended another day and call upon You and upon the bearers of Your Throne, upon Your angels and all creation to bear witness that surely You are Allah, there is none worthy of worship but You alone, You have no partners, and that Muhammad is Your slave and Your Messenger',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Allah will spare whoever says this four times in the morning or evening from the fire of Hell, Abu Dawud 4/317',
        repetitions: 3
      },
      {
        id: '2-10',
        title: 'Gratitude for Blessings',
        arabic: 'اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
        transliteration: 'Allaahumma maa \'amsaa bee min ni\'matin \'aw bi\'ahadin min khalqika faminka wahdaka laa shareeka laka, falakal-hamdu wa lakash-shukru',
        translation: 'O Allah, as I enter this evening whatever blessing has been received by me or anyone of Your creation is from You alone, You have no partner. All praise is for you and thanks is to You',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Whoever recites this in the morning, has completed his obligation to thank Allah for that day; and whoever says it in the evening, has completed his obligation for that night. Abu Dawud 4/318',
        repetitions: 1
      },
      {
        id: '2-11',
        title: 'Health Protection',
        arabic: 'اللّهُـمَّ عافِـني في بَدَنـي، اللّهُـمَّ عافِـني في سَمْـعي، اللّهُـمَّ عافِـني في بَصَـري، لا إلهَ إلاّ أَنْـتَ. اللّهُـمَّ إِنّـي أَعـوذُبِكَ مِنَ الْكُـفر، وَالفَـقْر، وَأَعـوذُبِكَ مِنْ عَذابِ القَـبْر، لا إلهَ إلاّ أَنْـتَ',
        transliteration: 'Allaahumma \'aafinee fee badanee, Allaahumma \'aafinee fee sam\'ee, Allaahumma \'aafinee fee basaree, laa \'ilaaha \'illaa \'Anta. Allaahumma \'innee \'a\'oothu bika minal-kufri, walfaqri, wa \'a\'oothu bika min \'athaabil-qabri, laa \'ilaaha \'illaa \'Anta',
        translation: 'Allah, make me healthy in my body. O Allah, preserve for me my hearing. O Allah, preserve for me my sight. There is none worthy of worship but You. O Allah, I seek refuge in You from disbelief and poverty and I seek refuge in You from the punishment of the grave. There is none worthy of worship but You',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Abu Dawud 4/324, Ahmad 5/42, An-Nasa\'i, \'Amalul-Yawm wal-Laylah (no. 22)',
        repetitions: 3
      },
      {
        id: '2-12',
        title: 'Allah is Sufficient',
        arabic: 'حَسْبِيَ اللهُ لَآ إِلٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        transliteration: 'Hasbiyallaahu laa \'ilaaha \'illaa Huwa \'alayhi tawakkaltu wa Huwa Rabbul-\'Arshil-\'Adheem',
        translation: 'Allah is sufficient for me. There is none worthy of worship but Him. I have placed my trust in Him, He is Lord of the Majestic Throne',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Allah will grant whoever recites this seven times in the morning or evening whatever he desires from this world or the next, Ibn As-Sunni (no. 71), Abu Dawud 4/321',
        repetitions: 7
      },
      {
        id: '2-13',
        title: 'Seeking Forgiveness and Protection',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْللِي، وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
        transliteration: 'Allaahumma \'innee \'as\'alukal-\'afwa wal\'aafiyata fid-dunyaa wal\'aakhirati, Allaahumma \'innee \'as\'alukal-\'afwa wal\'aafiyata fee deenee wa dunyaaya wa \'ahlee, wa maalee, Allaahum-mastur \'awraatee, wa \'aamin raw\'aatee, Allaahum-mahfadhnee min bayni yadayya, wa min khalfee, wa \'an yameenee, wa \'an shimaalee, wa min fawqee, wa \'a\'oothu bi\'adhamatika \'an \'ughtaala min tahtee',
        translation: 'O Allah, I seek Your forgiveness and Your protection in this world and the next. O Allah, I seek Your forgiveness and Your protection in my religion, in my worldly affairs, in my family and in my wealth. O Allah, conceal my secrets and preserve me from anguish. O Allah, guard me from what is in front of me and behind me, from my right, and from my left, and from above me. I seek refuge in Your Greatness from being struck down from beneath me',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Sahih Ibn Majah 2/332 and Abu Dawud',
        repetitions: 1
      },
      {
        id: '2-14',
        title: 'Knower of the Unseen',
        arabic: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّماوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ',
        transliteration: 'Allaahumma \'Aalimal-ghaybi wash-shahaadati faatiras-samaawaati wal\'ardhi, Rabba kulli shay\'in wa maleekahu, \'ash-hadu \'an laa \'ilaaha \'illaa \'Anta, \'a\'oothu bika min sharri nafsee, wa min sharrish-shaytaani wa shirkihi, wa \'an \'aqtarifa \'alaa nafsee soo\'an, \'aw \'ajurrahu \'ilaa Muslimin',
        translation: 'O Allah, Knower of the unseen and the evident, Maker of the heavens and the earth, Lord of everything and its Possessor, I bear witness that there is none worthy of worship but You. I seek refuge in You from the evil of my soul and from the evil of Satan and his helpers. (I seek refuge in You) from bringing evil upon my soul and from harming any Muslim',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Sahih At-Tirmithi 3/142 and AbuDawud',
        repetitions: 1
      },
      {
        id: '2-15',
        title: 'Protection with Allah\'s Name',
        arabic: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
        transliteration: 'Bismillaahil-lathee laa yadhurru ma\'as-mihi shay\'un fil-\'ardhi wa laa fis-samaa\'i wa Huwas-Samee \'ul- \'Aleem',
        translation: 'In the Name of Allah, Who with His Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Whoever recites it three times in the morning will not be afflicted by any calamity before evening, and whoever recites it three times in the evening will not be overtaken by any calamity before morning. Abu Dawud 4/323',
        repetitions: 3
      },
      {
        id: '2-16',
        title: 'Pleased with Allah',
        arabic: 'رَضِيتُ باللهِ رَبَّاً، وَبِالْإِسْلَامِ دِيناً، وَبِمُحَمَّدٍ صَلَى اللهُ عَلِيهِ وَسَلَّمَ نَبِيَّاً',
        transliteration: 'Radheetu billaahi Rabban, wa bil-\'Islaami deenan, wa bi-Muhammadin (sallallaahu \'alayhi wa sallama) Nabiyyan',
        translation: 'I am pleased with Allah as my Lord, with Islam as my religion and with Muhammad (peace and blessings of Allah be upon him) as my Prophet',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Allah has promised that anyone who says this three times every morning or evening will be pleased on the Day of Resurrection. Ahmad 4/337',
        repetitions: 3
      },
      {
        id: '2-17',
        title: 'O Ever Living One',
        arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
        transliteration: 'Yaa Hayyu yaa Qayyoomu birahmatika \'astagheethu \'aslih lee sha\'nee kullahu wa laa takilnee \'ilaa nafsee tarfata \'aynin',
        translation: 'O Ever Living One, O Eternal One, by Your mercy I call on You to set right all my affairs. Do not place me in charge of my soul even for the blinking of an eye (i.e. a moment)',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Its chain of transmission is sound (Sahih), Al-Hakim 1/545, see Albani, Sahihut-Targhib wat-Tarhib, 1/273',
        repetitions: 1
      },
      {
        id: '2-18',
        title: 'Night Goodness',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ فَتْحَهَا، وَنَصْرَهَا، وَنُورَهَا، وَبَرَكَتَهَا، وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهَا، وَشَرِّ مَا بَعْدَهَا',
        transliteration: 'Amsaynaa wa\'amsal-mulku lillaahi Rabbil-\'aalameen, Allaahumma \'innee \'as\'aluka khayra haathihil-laylati: Fathaha wa nasraha wa nooraha, wa barakataha, wa hudaaha, wa\'a\'oothu bika min sharri maafeeha wa sharri maa ba\'daha',
        translation: 'We have entered a new night and with it all the dominion which belongs to Allah, Lord of all that exists. O Allah, I ask You for the goodness of this night, its victory, its help, its light, its blessings, and its guidance. I seek refuge in You from the evil that is in it and from the evil that follows it',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Abu Dawud 4/322. Its transmission chain is good (Hasan). See also Ibn Al-Qayyim, Zadul-Ma\'ad 2/273',
        repetitions: 1
      },
      {
        id: '2-19',
        title: 'Upon the Fitrah',
        arabic: 'أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَى اللهُ عَلِيهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفَاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
        transliteration: 'Amsaynaa \'alaa fitratil-\'Islaami wa \'alaa kalimatil-\'ikhlaasi, wa \'alaa deeni Nabiyyinaa Muhammadin (sallallaahu \'alayhi wa sallama), wa \'alaa millati \'abeenaa \'Ibraaheema, haneefan Musliman wa maa kaana minal-mushrikeen',
        translation: 'We end this day upon the natural religion of Islam, the word of sincere devotion, the religion of our Prophet Muhammad (peace and blessings of Allah be upon him), and the faith of our father Ibrahim. He was upright (in worshipping Allah), and a Muslim. He was not of those who worship others besides Allah',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Ahmad 3/406-7, 5/123, An-Nasa\'i, \'Amalul-Yawm wal-Laylah (no. 34), At-Tirmithi 4/209',
        repetitions: 1
      },
      {
        id: '2-20',
        title: 'Glory and Praise',
        arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ',
        transliteration: 'Subhaanallaahi wa bihamdihi',
        translation: 'Glory is to Allah and praise is to Him',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Whoever recites this one hundred times in the morning and in the evening will not be surpassed on the Day of Resurrection by anyone having done better than this except for someone who had recited it more. Al-Bukhari 4/2071',
        repetitions: 100
      },
      {
        id: '2-21',
        title: 'La ilaha illa Allah',
        arabic: 'لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Laa \'ilaaha \'illallaahu wahdahu laa shareeka lahu, lahul-mulku wa lahul-hamdu, wa Huwa \'alaa kulli shay\'in Qadeer',
        translation: 'None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion and His is the praise and He is Able to do all things',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Allah will write ten Hasanaat (rewards) for whoever recites this ten times in the morning, and forgive him ten misdeeds and give him the reward of freeing ten slaves and protect him from Satan. An-Nasa\'i',
        repetitions: 10
      },
      {
        id: '2-22',
        title: 'Perfect Words Protection',
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: '\'A\'oothu bikalimaatil-laahit-taammaati min sharri maa khalaqa',
        translation: 'I seek refuge in the Perfect Words of Allah from the evil of what He has created',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Whoever recites this three times in the evening will be protected from insect stings, Ahmad 2/290',
        repetitions: 3
      },
      {
        id: '2-23',
        title: 'Blessings on the Prophet',
        arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
        transliteration: 'Allahumma salli wa sallim \'alaa nabiyyinaa Muhammadin',
        translation: 'Oh Allah, we ask you for peace and blessings upon our prophet Muhammad',
        category: 'evening',
        occasion: 'Evening',
        reference: 'The Prophet (peace be upon him) said: "Who recites blessings upon me 10 times in the morning and 10 times in the evening will obtain my intercession on the Day of Resurrection." At-Tabrani',
        repetitions: 10
      },
      {
        id: '2-24',
        title: 'Istighfar',
        arabic: 'أَسْتَغْفِرُ اللَّهَ',
        transliteration: 'Astaghfirullah',
        translation: 'I seek forgiveness from Allah',
        category: 'evening',
        occasion: 'Evening',
        reference: 'Sahih Bukhari',
        repetitions: 70
      }
    ]
  },
  {
    id: '3',
    title: 'Before Sleep',
    description: 'Duas to recite before sleeping',
    category: 'sleep',
    icon: 'bed',
    duas: [
      {
        id: '3-1',
        title: 'Sleeping Dua',
        arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ',
        transliteration: 'Bismika rabbi wada\'tu janbi wa bika arfa\'uh',
        translation: 'In Your name, my Lord, I place my side and by You I raise it',
        category: 'sleep',
        occasion: 'Before Sleep',
        reference: 'Sahih Bukhari',
        fullReference: 'This beautiful sleeping supplication is narrated in Sahih Bukhari (6320) and Sahih Muslim (2714) on the authority of Al-Bara\' ibn \'Azib (may Allah be pleased with him). The Prophet (peace be upon him) taught this dua to be recited when going to bed, emphasizing complete reliance on Allah even in sleep. The phrase "In Your name" shows that we begin our rest with Allah\'s remembrance, while "by You I raise it" acknowledges that waking up depends entirely on Allah\'s will. This dua serves as a protection during sleep and a reminder that life and death are in Allah\'s hands. The scholars recommend lying on the right side when reciting this, following the Prophet\'s sunnah.',
        repetitions: 1
      },
      {
        id: '3-2',
        title: 'Surah Al-Ikhlas',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul huwal-lahu ahad',
        translation: 'Say: He is Allah, the One',
        category: 'sleep',
        occasion: 'Before Sleep',
        reference: 'Quran 112',
        repetitions: 3
      }
    ]
  },
  {
    id: '4',
    title: 'After Waking Up',
    description: 'Duas to recite upon waking up',
    category: 'waking',
    icon: 'sunny-outline',
    duas: [
      {
        id: '4-1',
        title: 'Waking Up Dua',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
        transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur',
        translation: 'Praise be to Allah who gave us life after He caused us to die, and to Him is the resurrection',
        category: 'waking',
        occasion: 'After Waking Up',
        reference: 'Sahih Bukhari',
        repetitions: 1
      },
      {
        id: '4-2',
        title: 'Tasbih',
        arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        transliteration: 'Subhan Allahi wa bihamdihi',
        translation: 'Glory be to Allah and praise be to Him',
        category: 'waking',
        occasion: 'After Waking Up',
        reference: 'Sahih Muslim',
        repetitions: 10
      }
    ]
  },
  {
    id: '5',
    title: 'Restroom Invocations',
    description: 'Duas for entering and exiting the restroom',
    category: 'restroom',
    icon: 'home',
    duas: [
      {
        id: '5-1',
        title: 'When Entering',
        arabic: '[بِسْمِ اللهِ] اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُْثِ وَالْخَبَائِثِ',
        transliteration: '[Bismillaahi] Allaahumma \'innee \'a\'oothu bika minal-khubthi walkhabaa\'ith',
        translation: '(Before entering) [In the Name of Allah]. (Then) O Allah, I seek protection in You from the male and female unclean spirits',
        category: 'restroom',
        occasion: 'Entering Restroom',
        reference: 'Al-Bukhari 1/45, Muslim 1/283. The addition of Bismillah at its beginning was reported by Said bin Mansur. See Fathul-Bari 1/244',
        repetitions: 1
      },
      {
        id: '5-2',
        title: 'When Exiting',
        arabic: 'غُفْرَانَكَ',
        transliteration: 'Ghufraanaka',
        translation: 'I seek Your forgiveness',
        category: 'restroom',
        occasion: 'Exiting Restroom',
        reference: 'Abu Dawud, Ibn Majah and At-Tirmithi. An-Nasa\'i recorded it in \'Amalul-Yawm wal-Laylah. Also see the checking of Ibn Al-Qayyim\'s Zadul-Ma\'ad, 2/387',
        repetitions: 1
      }
    ]
  },
  {
    id: '6',
    title: 'Mosque Invocations',
    description: 'Duas for entering the mosque and seeking light',
    category: 'mosque',
    icon: 'business',
    duas: [
      {
        id: '6-1',
        title: 'Invocation for going to the mosque',
        arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُوراً، وَفِي لِسَانِي نُوراً، وَفِي سَمْعِي نُوراً، وَفِي بَصَرِي نُوراً، وَمِنْ فَوقِي نُوراً، وَمِنْ تَحْتِِي نُوراً، وَعَنْ يَمِينِي نُوراً، وَعَنْ شِمَالِي نُوراً، وَمِن أَمَامِي نُوراً، وَمِنْ خَلْفِِي نُوراً، وَاجْعَلْ فِي نَفْسِي نُوراً، وَأَعْظِمْ لِي نُوراً، وَعَظِّمْ لِي نُوراً، وِاجْعَلْ لِي نُوراً، وَاجْعَلْنِي نُوراً، اللَّهُمَّ أَعْطِنِي نُوراً، وَاجْعَلْ فِي عَصَبِي نُوراً، وَفِي لَحْمِي نُوراً، وَفِي دَمِي نُوراً، وَفِي شَعْرِي نُوراً، وَفِي بَشَرِي نُوراً، اللَّهُمَّ اجْعَلْ لِي نُوراً فِي قَبْرِي وَنُوراً فِي عِظَامِي وَزِدْنِي نُوراً، وَزِدْنِي نُوراً، وَزِدْنِي نُوراً وَهَبْ لِي نُوراً عَلَى نُورٍ',
        transliteration: 'Allaahummaj\'al fee qalbee nooran, wa fee lisaaanee nooran, wa fee sam\'ee nooran, wa fee basaree nooran, wa min fawqee nooran, wa min tahtee nooran, wa \'an yameenee nooran, wa \'an shimaalee nooran, wa min \'amaamee nooran, wa min khalfee nooran, waj\'alfee nafsee nooran, wa \'a\'dhim lee nooran, wa \'adhdhim lee nooran, wafal lee nooran, waj\'alnee nooran, Allaahumma \'a\'tinee nooran, waj\'al fee \'asabee nooran, wafee lahmee nooran, wafee damee nooran, wa fee sha\'ree nooran, wa fee basharee nooran. Allaahummaj\'al lee nooran fee qabree wa nooran fee \'idhaamee. Wa zidnee nooran, wa zidnee nooran, wa zidnee nooran. Wa hab lee nooran \'alaa noor',
        translation: 'O Allah, place light in my heart, and on my tongue light, and in my ears light and in my sight light, and above me light, and below me light, and to my right light, and to my left light, and before me light and behind me light. Place in my soul light. Magnify for me light, and amplify for me light. Make for me light and make me a light. O Allah, grant me light, and place light in my nerves, and in my body light and in my blood light and in my hair light and in my skin light. O Allah, make for me a light in my grave and a light in my bones. Increase me in light, increase me in light, increase me in light. Grant me light upon light',
        category: 'mosque',
        occasion: 'Mosque Invocations',
        reference: 'Al-Bukhari 11/116 (Hadith no. 6316) and by Muslim 1/526, 529-530 (Hadith no. 763)',
        repetitions: 1
      },
      {
        id: '6-2',
        title: 'Entering the Mosque',
        arabic: 'أَعُوذُ بِاللهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ بِسْمِ اللهِ، وَالصَّلَاةُ وَالسَّلَّامُ عَلَى رَسُولِ اللهِ اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
        transliteration: 'A\'oodhu billaahil \'adheem, wa bi wajhihil kareem, wa sultaanihil qadeem, minash-shaytaanir rajeem. Bismillaah, wassalaatu wassalaamu \'alaa rasoolillaah. Allaahumma iftah lee abwaaba rahmatik',
        translation: 'I seek refuge in Almighty Allah, by His Noble Face, by His primordial power, from Satan the outcast. In the Name of Allah, and blessings. And peace be upon the Messenger of Allah. O Allah, open before me the doors of Your mercy',
        category: 'mosque',
        occasion: 'Mosque Invocations',
        reference: 'Abu Dawud and Al-Albani, Sahihul-Jdmi\' As-Saghir (Hadithno. 4591). Muslim 1/494',
        repetitions: 1
      }
    ]
  },
]; 