"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useLang } from "@/components/providers/LangProvider"
import ReviewsSection from "@/components/reviews/ReviewsSection"
import Image from "next/image"

const COURSES: Record<string, any> = {
  "piano-fundamentals": {
    title_en:"Piano Fundamentals: From Zero to Advanced",
    title_ar:"أساسيات البيانو: من الصفر إلى المتقدم",
    description_en:"Start your piano journey from absolute zero and reach an advanced level. This comprehensive course covers everything you need — proper technique, music reading, scales, chords, and beautiful songs. Whether you're 8 or 80, this course will transform you into a confident pianist.",
    description_ar:"ابدأ رحلتك مع البيانو من الصفر وصل إلى المستوى المتقدم. تغطي هذه الدورة الشاملة كل ما تحتاجه — التقنية الصحيحة، قراءة النوتة، السلالم، الأوتار، والأغاني الجميلة. سواء كان عمرك 8 أو 80، هذه الدورة ستحوّلك إلى عازف بيانو واثق.",
    instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس الوفاء رمضاني",
    instructor_photo:"/ons.jpeg",
    instructor_bio_en:"Former accompanist with the Tunisian Symphony Orchestra, holder of a Music Therapy certificate, and experienced piano teacher in Tunisia and Saudi Arabia.",
    instructor_bio_ar:"عازفة مرافقة سابقة مع الأوركسترا السيمفونية التونسية، حاملة شهادة العلاج بالموسيقى، ومدرّسة بيانو متمرّسة في تونس والمملكة العربية السعودية.",
    instrument:"PIANO", level:"BEGINNER", price:220, rating:4.9, students:842, lessons:36, duration:"12h 30m", bestseller:true,
    language_en:"Arabic & English", language_ar:"عربي وإنجليزي",
    updated_en:"May 2025", updated_ar:"مايو 2025",
    what_en:["Play piano with proper technique from day one","Read sheet music fluently","Master scales, chords and arpeggios","Play 10+ complete songs","Understand music theory fundamentals","Reach an advanced performance level"],
    what_ar:["العزف بتقنية صحيحة من اليوم الأول","قراءة النوتة بطلاقة","إتقان السلالم والأوتار","عزف أكثر من 10 أغانٍ كاملة","فهم أساسيات نظرية الموسيقى","الوصول إلى مستوى أداء متقدم"],
    requirements_en:["No prior experience needed","A piano or keyboard with at least 61 keys","Dedication and practice — 20 min/day is enough"],
    requirements_ar:["لا تحتاج خبرة مسبقة","بيانو أو كيبورد بـ61 مفتاحاً على الأقل","التزام وتمرين — 20 دقيقة يومياً تكفي"],
    for_who_en:["Complete beginners with no music background","Children and adults of all ages","Anyone who tried before and gave up","Students who want structured learning"],
    for_who_ar:["المبتدئون الكاملون بلا خلفية موسيقية","الأطفال والكبار من جميع الأعمار","من جرّب من قبل وتوقّف","الطلاب الذين يريدون تعلّماً منظّماً"],
    sections:[
      { title_en:"Getting Started", title_ar:"البداية", lessons:[
        { title_en:"Welcome & Course Overview", title_ar:"مرحباً ونظرة عامة", duration:"5:00",  free:true  },
        { title_en:"Understanding the Piano",   title_ar:"فهم البيانو",        duration:"12:00", free:true  },
        { title_en:"Hand Position & Posture",   title_ar:"وضع اليدين والجلسة", duration:"15:00", free:false },
        { title_en:"Your First Notes",          title_ar:"أولى نوتاتك",        duration:"18:00", free:false },
      ]},
      { title_en:"Music Reading", title_ar:"قراءة النوتة", lessons:[
        { title_en:"The Musical Staff",          title_ar:"المدرج الموسيقي",   duration:"18:00", free:false },
        { title_en:"Note Names & Values",        title_ar:"أسماء وقيم النوتات", duration:"20:00", free:false },
        { title_en:"Reading Your First Melody",  title_ar:"قراءة أول لحن",     duration:"22:00", free:false },
        { title_en:"Rhythm & Time Signatures",   title_ar:"الإيقاع والمقاييس", duration:"25:00", free:false },
      ]},
      { title_en:"Scales & Chords", title_ar:"السلالم والأوتار", lessons:[
        { title_en:"C Major Scale",        title_ar:"سلّم دو الكبير",    duration:"16:00", free:false },
        { title_en:"Basic Chords",         title_ar:"الأوتار الأساسية",  duration:"24:00", free:false },
        { title_en:"Chord Progressions",   title_ar:"تسلسل الأوتار",     duration:"28:00", free:false },
        { title_en:"Playing with 2 Hands", title_ar:"العزف باليدين",      duration:"30:00", free:false },
      ]},
      { title_en:"Songs & Performance", title_ar:"الأغاني والأداء", lessons:[
        { title_en:"First Complete Song",   title_ar:"أول أغنية كاملة",   duration:"35:00", free:false },
        { title_en:"Classical Pieces",      title_ar:"مقطوعات كلاسيكية",  duration:"40:00", free:false },
        { title_en:"Performance Tips",      title_ar:"نصائح الأداء",       duration:"20:00", free:false },
      ]},
    ],
    reviews:[
      { name:"Ahmed K.", name_ar:"أحمد ك.", rating:5, comment_en:"Best piano course I've ever taken. Ons is an amazing teacher — patient, clear, and incredibly knowledgeable.", comment_ar:"أفضل دورة بيانو أخذتها. أنس مدرّسة رائعة — صبورة وواضحة ومعرفتها لا تُصدَّق." },
      { name:"Sara M.", name_ar:"سارة م.", rating:5, comment_en:"I went from zero to playing real songs in 3 months. The bilingual format is perfect for me!", comment_ar:"انتقلت من الصفر إلى عزف أغانٍ حقيقية في 3 أشهر. الشكل ثنائي اللغة مثالي لي!" },
      { name:"Yusuf A.", name_ar:"يوسف أ.", rating:5, comment_en:"Incredibly structured course. Every lesson builds perfectly on the previous one.", comment_ar:"دورة منظّمة بشكل لا يُصدَّق. كل درس يُبني بشكل مثالي على السابق." },
    ],
  },
  "arabic-maqam-oud": {
    title_en:"Arabic Maqam & Oud Mastery",
    title_ar:"المقامات العربية وإتقان العود",
    description_en:"Arabic Music Theory & Maqamat aims to enable the student to understand Eastern music theory and apply it professionally, through an integrated curriculum that combines academic study with practical application. Topics of study: Structure of maqamat and their families — studying maqamat through understanding the ouqoud (chords), ajnas, tab\u2019, ratios, and maqam families. Direct application — theoretical explanation followed by immediate practical application through singing and playing exercises tailored to each maqam. Maqam relationships — explaining overlapping, connected, and separate maqamat and how to transition between them. Science of improvisation — studying the rules of maqam improvisation and developing it based on audio and theoretical material. Musical analysis — analyzing selected pieces from Eastern and Arab-Eastern heritage. Analysis of vocal forms — deconstructing and studying the melodic structure of classical forms such as the Muwashah, Qasid, and Taqtuqa. Subscribe now and start studying Eastern music on scientific and practical foundations.",
    description_ar:"تهدف نظريّات الموسيقى العربيّة والمقامات إلى تمكين الطالب من فهم النظريات الموسيقية الشرقية وتطبيقها بشكل احترافي، من خلال منهج متكامل يدمج بين الدراسة الأكاديمية والتطبيق العملي. محاور الدراسة: بنية المقامات وعوائلها: دراسة المقامات من خلال فهم العقود، الأجناس، الطبوع، النسب، والعوائل المقامية. التطبيق المباشر: شرح نظري يعقبه تطبيق عملي فوري عبر غناء وعزف تمارين مخصصة لكل مقام. العلاقات المقامية: شرح المقامات الموسيقية المتداخلة، المتصلة، والمنفصلة وكيفية الانتقال بينها. علم الارتجال: دراسة قواعد الارتجال المقامي وتطويره اعتماداً على مواد سمعية ونظرية. التحليل الموسيقي: تحليل مقطوعات موسيقية مختارة من التراث الشرقي والشرق-عربي. تحليل القوالب الغنائية: تفكيك ودراسة البنية اللحنية للقوالب الكلاسيكية مثل الموشح، القصيد، والطقطوقة. اشترك الآن وابدأ دراسة الموسيقى الشرقية على أسس علمية وعملية.",
    instructor_en:"Omar Algour", instructor_ar:"عمر الغور",
    instructor_photo:"/omar.jpeg",
    instructor_bio_en:"Professional Oud player, Oud instructor across the Arab world, performed in Germany, Switzerland, Norway and Iceland. Composer and academic music teacher.",
    instructor_bio_ar:"عازف عود محترف، مدرّس عود في العالم العربي، قدّم عروضاً في ألمانيا وسويسرا والنرويج وآيسلندا. مؤلف موسيقي ومدرّس أكاديمي.",
    instrument:"OUD", level:"INTERMEDIATE", price:220, rating:4.8, students:631, lessons:48, duration:"18h 00m", bestseller:true,
    language_en:"Arabic & English", language_ar:"عربي وإنجليزي",
    updated_en:"May 2025", updated_ar:"مايو 2025",
    what_en:["Master 12 essential Arabic Maqamat","Improvise freely in any maqam","Understand Arabic rhythmic cycles (iqa'at)","Play authentic classical Arabic pieces","Compose your own Maqam-based melodies","Perform with emotional expression"],
    what_ar:["إتقان 12 مقاماً عربياً أساسياً","الارتجال بحرية في أي مقام","فهم الإيقاعات العربية","عزف مقطوعات عربية كلاسيكية أصيلة","تأليف ألحانك الخاصة","الأداء بتعبير عاطفي"],
    requirements_en:["Basic Oud knowledge (beginner level completed)","An Oud instrument","Passion for Arabic music"],
    requirements_ar:["معرفة أساسية بالعود (مستوى مبتدئ مكتمل)","آلة عود","شغف بالموسيقى العربية"],
    for_who_en:["Oud players who know the basics","Music lovers who want to understand Arabic Maqam","Students of Arabic musical heritage","Anyone fascinated by Middle Eastern music"],
    for_who_ar:["عازفو العود الذين يعرفون الأساسيات","محبّو الموسيقى الراغبون في فهم المقامات","طلاب التراث الموسيقي العربي","كل من يجذبه الموسيقى الشرقية"],
    sections:[
      { title_en:"Maqam Fundamentals", title_ar:"أساسيات المقام", lessons:[
        { title_en:"What is a Maqam?",     title_ar:"ما هو المقام؟",   duration:"10:00", free:true  },
        { title_en:"Maqam Rast",           title_ar:"مقام الراست",      duration:"25:00", free:true  },
        { title_en:"Maqam Bayati",         title_ar:"مقام البياتي",     duration:"28:00", free:false },
        { title_en:"Maqam Sikah",          title_ar:"مقام السيكاه",     duration:"30:00", free:false },
      ]},
      { title_en:"Advanced Maqamat", title_ar:"المقامات المتقدمة", lessons:[
        { title_en:"Maqam Hijaz",          title_ar:"مقام الحجاز",      duration:"30:00", free:false },
        { title_en:"Maqam Saba",           title_ar:"مقام الصبا",       duration:"32:00", free:false },
        { title_en:"Maqam Nahawand",       title_ar:"مقام النهاوند",    duration:"28:00", free:false },
        { title_en:"Maqam Kurd",           title_ar:"مقام الكرد",       duration:"25:00", free:false },
      ]},
      { title_en:"Improvisation", title_ar:"الارتجال", lessons:[
        { title_en:"Introduction to Taqsim", title_ar:"مقدمة في التقسيم", duration:"35:00", free:false },
        { title_en:"Free Improvisation",     title_ar:"الارتجال الحر",    duration:"40:00", free:false },
      ]},
    ],
    reviews:[
      { name:"Khalid R.", name_ar:"خالد ر.", rating:5, comment_en:"Omar's teaching style is exceptional. He explains complex maqamat in a way that's easy to understand.", comment_ar:"أسلوب تدريس عمر استثنائي. يشرح المقامات المعقدة بطريقة سهلة الفهم." },
      { name:"Layla H.", name_ar:"ليلى ح.", rating:5, comment_en:"This course completely changed my relationship with the Oud. I finally understand maqamat!", comment_ar:"غيّرت هذه الدورة علاقتي بالعود كلياً. أفهم المقامات أخيراً!" },
    ],
  },
  "classical-piano": {
    title_en:"Classical Piano", title_ar:"البيانو الكلاسيكي",
    description_en:"Master the greatest works in classical piano literature. From Bach to Beethoven, Chopin to Debussy — this advanced course will refine your technique, deepen your musical understanding, and prepare you for professional performance.",
    description_ar:"أتقن أعظم الأعمال في أدب البيانو الكلاسيكي. من باخ إلى بيتهوفن، شوبان إلى ديبوسي — ستصقل هذه الدورة المتقدمة تقنيتك وتعمّق فهمك الموسيقي وتهيّئك للأداء الاحترافي.",
    instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس الوفاء رمضاني",
    instructor_photo:"/ons.jpeg",
    instructor_bio_en:"Former accompanist with the Tunisian Symphony Orchestra, specialist in classical and contemporary piano performance.",
    instructor_bio_ar:"عازفة مرافقة سابقة مع الأوركسترا السيمفونية التونسية، متخصصة في أداء البيانو الكلاسيكي والمعاصر.",
    instrument:"PIANO", level:"ADVANCED", price:220, rating:4.7, students:412, lessons:54, duration:"22h 15m", bestseller:false,
    language_en:"Arabic & English", language_ar:"عربي وإنجليزي",
    updated_en:"May 2025", updated_ar:"مايو 2025",
    what_en:["Advanced piano technique and finger independence","Interpret major classical works","Deep music analysis and theory","Stage performance and presence","Practice strategies for difficult passages","Build a professional repertoire"],
    what_ar:["تقنية بيانو متقدمة واستقلالية الأصابع","تفسير الأعمال الكلاسيكية الكبرى","تحليل موسيقي عميق ونظرية","الأداء على المسرح والحضور","استراتيجيات تمرين المقاطع الصعبة","بناء ريبرتوار احترافي"],
    requirements_en:["Intermediate piano level required","Ability to read sheet music fluently","At least 2 years of piano experience"],
    requirements_ar:["مستوى بيانو متوسط مطلوب","القدرة على قراءة النوتة بطلاقة","خبرة بيانو لا تقل عن سنتين"],
    for_who_en:["Intermediate pianists ready to advance","Students preparing for music exams","Anyone passionate about classical music","Musicians seeking professional performance skills"],
    for_who_ar:["عازفو بيانو متوسطون جاهزون للتقدم","طلاب يستعدون للامتحانات الموسيقية","كل من يشغف بالموسيقى الكلاسيكية","الموسيقيون الساعون لمهارات الأداء الاحترافي"],
    sections:[
      { title_en:"Advanced Technique", title_ar:"التقنية المتقدمة", lessons:[
        { title_en:"Finger Independence Exercises", title_ar:"تمارين استقلالية الأصابع", duration:"20:00", free:true  },
        { title_en:"Octave Technique",              title_ar:"تقنية الأوكتاف",            duration:"22:00", free:false },
        { title_en:"Trills & Ornaments",            title_ar:"الزخارف الموسيقية",          duration:"25:00", free:false },
      ]},
      { title_en:"Classical Repertoire", title_ar:"الأعمال الكلاسيكية", lessons:[
        { title_en:"Bach Inventions",               title_ar:"اختراعات باخ",              duration:"35:00", free:false },
        { title_en:"Beethoven Sonata",              title_ar:"سوناتا بيتهوفن",             duration:"40:00", free:false },
        { title_en:"Chopin Nocturne",               title_ar:"نوكتورن شوبان",              duration:"45:00", free:false },
      ]},
    ],
    reviews:[
      { name:"Nora T.", name_ar:"نورة ت.", rating:5, comment_en:"Ons brings out the best in you. Her feedback is detailed and incredibly helpful for improving.", comment_ar:"أنس تستخرج أفضل ما فيك. ملاحظاتها مفصّلة ومفيدة جداً للتحسّن." },
    ],
  },
  "oud-beginners": {
    title_en:"Oud for Beginners: First Steps", title_ar:"العود للمبتدئين: الخطوات الأولى",
    description_en:"This course allows you to study the Oud academically to develop your talent through smooth, well-structured methods that ensure you avoid incorrect practice and bad habits while playing. Course features and content: Accredited academic curriculum — studying the Oud method by the author Tareq Al-Jundi to track your progress step by step. Flexible learning style — combining live online (face-to-face) classes with recorded videos to make following along easier. Subscribe now and start playing on a correct academic foundation.",
    description_ar:"تتيح لك هذه المادة دراسة آلة العود بشكل أكاديمي لتطوير موهبتك عبر طرق سلسة ومدروسة، تضمن لك تجنّب التمرين الخاطئ والعادات السيئة أثناء العزف. مميزات ومحتوى المادة: منهج أكاديمي معتمد: دراسة منهج آلة العود للمؤلف طارق الجندي لمتابعة تطورك خطوة بخطوة. أسلوب تعلم مرن: دمج بين الحصص الأونلاين الوجاهية (المباشرة) والفيديوهات المسجّلة لتسهيل المتابعة. اشترك الآن وابدأ العزف على أسس أكاديمية صحيحة.",
    instructor_en:"Omar Algour", instructor_ar:"عمر الغور",
    instructor_photo:"/omar.jpeg",
    instructor_bio_en:"Professional Oud player and instructor, experienced in teaching beginners, children and professionals. Performed across Europe and the Arab world.",
    instructor_bio_ar:"عازف عود محترف ومدرّس، متمرّس في تدريس المبتدئين والأطفال والمحترفين. قدّم عروضاً في أوروبا والعالم العربي.",
    instrument:"OUD", level:"BEGINNER", price:220, rating:4.9, students:1205, lessons:28, duration:"9h 45m", bestseller:true,
    language_en:"Arabic & English", language_ar:"عربي وإنجليزي",
    updated_en:"May 2025", updated_ar:"مايو 2025",
    what_en:["Correct Oud holding technique","Right hand picking patterns and rhythms","Left hand finger strength and positioning","Play 5 complete Arabic melodies","Basic Arabic music theory","Tuning your Oud"],
    what_ar:["تقنية الإمساك الصحيحة بالعود","أنماط وإيقاعات ريشة اليد اليمنى","قوة وموضع أصابع اليد اليسرى","عزف 5 ألحان عربية كاملة","نظرية الموسيقى العربية الأساسية","ضبط العود"],
    requirements_en:["No prior musical experience needed","An Oud instrument (we recommend starting with a student Oud)","Enthusiasm and patience"],
    requirements_ar:["لا تحتاج خبرة موسيقية مسبقة","آلة عود (نوصي بالبدء بعود للطلاب)","حماس وصبر"],
    for_who_en:["Complete beginners with no Oud experience","Children and adults who love Arabic music","Anyone curious about the Oud","Students who want a solid foundation"],
    for_who_ar:["المبتدئون الكاملون بلا تجربة مع العود","الأطفال والكبار محبّو الموسيقى العربية","كل من يشغفه العود","الطلاب الراغبون في أساس متين"],
    sections:[
      { title_en:"Introduction to Oud", title_ar:"مقدمة للعود", lessons:[
        { title_en:"About the Oud — History & Parts", title_ar:"عن العود — التاريخ والأجزاء", duration:"8:00",  free:true  },
        { title_en:"Holding & Posture",               title_ar:"الإمساك والوضعية",             duration:"14:00", free:true  },
        { title_en:"Right Hand — First Strokes",       title_ar:"اليد اليمنى — أول ضربات",     duration:"18:00", free:false },
        { title_en:"Left Hand — Finger Exercises",     title_ar:"اليد اليسرى — تمارين الأصابع", duration:"20:00", free:false },
      ]},
      { title_en:"First Melodies", title_ar:"أول الألحان", lessons:[
        { title_en:"Simple Arabic Scale",    title_ar:"السلّم العربي البسيط", duration:"15:00", free:false },
        { title_en:"First Arabic Melody",    title_ar:"أول لحن عربي",         duration:"20:00", free:false },
        { title_en:"Melody with Rhythm",     title_ar:"لحن مع إيقاع",         duration:"25:00", free:false },
      ]},
    ],
    reviews:[
      { name:"Fares B.", name_ar:"فارس ب.", rating:5, comment_en:"Omar is a fantastic teacher. He makes learning the Oud feel natural and enjoyable from lesson one.", comment_ar:"عمر مدرّس رائع. يجعل تعلّم العود يبدو طبيعياً وممتعاً منذ الدرس الأول." },
      { name:"Hana S.", name_ar:"هنا س.", rating:5, comment_en:"I always wanted to learn Oud. This course made it possible. Clear, structured, and so much fun!", comment_ar:"أردت دائماً تعلّم العود. هذه الدورة جعلت ذلك ممكناً. واضحة ومنظّمة وممتعة جداً!" },
    ],
  },
  "arabic-piano": {
    title_en:"Arabic Piano", title_ar:"البيانو العربي",
    description_en:"Discover the unique fusion of Arabic music and piano. Learn Arabic scales, maqamat on piano, and how to authentically play classic Arabic songs with feeling and proper ornamentation. A unique course that bridges East and West.",
    description_ar:"اكتشف الدمج الفريد للموسيقى العربية والبيانو. تعلّم السلالم العربية والمقامات على البيانو وكيف تعزف الأغاني العربية الكلاسيكية بأصالة وإحساس. دورة فريدة تجمع بين الشرق والغرب.",
    instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس الوفاء رمضاني",
    instructor_photo:"/ons.jpeg",
    instructor_bio_en:"Holds a diploma in Arabic Music, experienced in both classical Western and Arabic music traditions on piano.",
    instructor_bio_ar:"حاملة دبلوم الموسيقى العربية، متمرّسة في تقاليد الموسيقى الغربية الكلاسيكية والعربية على البيانو.",
    instrument:"PIANO", level:"INTERMEDIATE", price:220, rating:4.6, students:318, lessons:42, duration:"16h 00m", bestseller:false,
    language_en:"Arabic & English", language_ar:"عربي وإنجليزي",
    updated_en:"May 2025", updated_ar:"مايو 2025",
    what_en:["Arabic scales and modes on piano","Play maqamat on a Western instrument","Classic Arabic songs with proper style","Arabic ornamentation and expression","Understanding Arabic rhythms on piano","Bridge Arabic and Western music"],
    what_ar:["السلالم والمقامات العربية على البيانو","عزف المقامات على آلة غربية","أغاني عربية كلاسيكية بالأسلوب الصحيح","الزخرفة والتعبير العربي","فهم الإيقاعات العربية على البيانو","الجسر بين الموسيقى العربية والغربية"],
    requirements_en:["Intermediate piano level","Ability to read basic sheet music","Interest in Arabic music and culture"],
    requirements_ar:["مستوى بيانو متوسط","القدرة على قراءة النوتة الأساسية","اهتمام بالموسيقى والثقافة العربية"],
    for_who_en:["Pianists who love Arabic music","Students of Arabic musical heritage","Musicians wanting to expand their style","Anyone curious about East-West music fusion"],
    for_who_ar:["عازفو بيانو محبّو الموسيقى العربية","طلاب التراث الموسيقي العربي","الموسيقيون الراغبون في توسيع أسلوبهم","كل من يشغفه دمج موسيقى الشرق والغرب"],
    sections:[
      { title_en:"Arabic Music on Piano", title_ar:"الموسيقى العربية على البيانو", lessons:[
        { title_en:"Arabic Scales vs Western Scales", title_ar:"السلالم العربية مقابل الغربية", duration:"20:00", free:true  },
        { title_en:"Maqam Rast on Piano",             title_ar:"مقام الراست على البيانو",       duration:"25:00", free:false },
        { title_en:"Maqam Bayati on Piano",           title_ar:"مقام البياتي على البيانو",      duration:"28:00", free:false },
      ]},
      { title_en:"Arabic Songs", title_ar:"الأغاني العربية", lessons:[
        { title_en:"Classic Arabic Song — Beginner",  title_ar:"أغنية عربية كلاسيكية — مبتدئ", duration:"30:00", free:false },
        { title_en:"Advanced Arabic Song",            title_ar:"أغنية عربية متقدمة",            duration:"35:00", free:false },
      ]},
    ],
    reviews:[
      { name:"Omar F.", name_ar:"عمر ف.", rating:5, comment_en:"Finally a course that teaches Arabic music on piano properly! Ons explains everything so clearly.", comment_ar:"أخيراً دورة تعلّم الموسيقى العربية على البيانو بشكل صحيح! أنس تشرح كل شيء بوضوح تام." },
    ],
  },
  "oud-advanced": {
    title_en:"Oud Advanced", title_ar:"العود المتقدم",
    description_en:"Take your Oud mastery to the highest level. This advanced course covers complex maqamat, Andalusian music traditions, professional performance techniques, and music composition. For serious Oud players ready to perform at a professional level.",
    description_ar:"ارفع إتقانك للعود إلى المستوى الأعلى. تغطي هذه الدورة المتقدمة المقامات المعقدة وتقاليد الموسيقى الأندلسية وتقنيات الأداء الاحترافي والتأليف الموسيقي. لعازفي العود الجادين المستعدين للأداء الاحترافي.",
    instructor_en:"Omar Algour", instructor_ar:"عمر الغور",
    instructor_photo:"/omar.jpeg",
    instructor_bio_en:"Composer and performer with experience in live performance and academic teaching. Skilled in music notation using Sibelius.",
    instructor_bio_ar:"مؤلف موسيقي وعازف بخبرة في الأداء الحي والتعليم الأكاديمي. متمكّن في كتابة النوتة باستخدام Sibelius.",
    instrument:"OUD", level:"ADVANCED", price:220, rating:4.8, students:204, lessons:60, duration:"25h 30m", bestseller:false,
    language_en:"Arabic & English", language_ar:"عربي وإنجليزي",
    updated_en:"May 2025", updated_ar:"مايو 2025",
    what_en:["Master complex and rare maqamat","Andalusian Nawba structure and performance","Advanced ornamentation and expression","Compose and arrange music for Oud","Professional performance preparation","Music notation with Sibelius"],
    what_ar:["إتقان المقامات المعقدة والنادرة","بنية النوبة الأندلسية وأدائها","الزخرفة والتعبير المتقدم","تأليف وتوزيع الموسيقى للعود","التحضير للأداء الاحترافي","كتابة النوتة ببرنامج Sibelius"],
    requirements_en:["Intermediate or advanced Oud level","Knowledge of basic maqamat","At least 3 years of Oud experience"],
    requirements_ar:["مستوى عود متوسط أو متقدم","معرفة بالمقامات الأساسية","خبرة عزف عود لا تقل عن 3 سنوات"],
    for_who_en:["Advanced Oud players seeking mastery","Students of Andalusian music tradition","Musicians preparing for professional performance","Anyone serious about the Oud as a career"],
    for_who_ar:["عازفو عود متقدمون يسعون للإتقان","طلاب التراث الموسيقي الأندلسي","موسيقيون يستعدون للأداء الاحترافي","كل من يأخذ العود مساراً مهنياً"],
    sections:[
      { title_en:"Advanced Techniques", title_ar:"التقنيات المتقدمة", lessons:[
        { title_en:"Complex Ornamentation",    title_ar:"الزخرفة المعقدة",      duration:"25:00", free:true  },
        { title_en:"Advanced Taqsim",          title_ar:"التقسيم المتقدم",       duration:"35:00", free:false },
        { title_en:"Andalusian Nawba",         title_ar:"النوبة الأندلسية",      duration:"40:00", free:false },
      ]},
      { title_en:"Composition", title_ar:"التأليف", lessons:[
        { title_en:"Composing a Maqam Piece",  title_ar:"تأليف مقطوعة مقام",    duration:"30:00", free:false },
        { title_en:"Arranging for Oud",        title_ar:"التوزيع للعود",          duration:"35:00", free:false },
      ]},
    ],
    reviews:[
      { name:"Tarek M.", name_ar:"طارق م.", rating:5, comment_en:"Omar took my Oud playing from good to extraordinary. His knowledge of Andalusian music is unmatched.", comment_ar:"رفع عمر عزفي على العود من جيد إلى استثنائي. معرفته بالموسيقى الأندلسية لا مثيل لها." },
    ],
  },
  "piano-kids": {
    title_en:"Piano KIDS", title_ar:"البيانو للأطفال",
    description_en:"A joyful, colourful and engaging piano adventure designed especially for children aged 5-12! Through games, songs, animations and creative activities, your child will fall in love with music while building strong musical foundations.",
    description_ar:"مغامرة بيانو مبهجة وملوّنة ومشوّقة مصمّمة خصيصاً للأطفال من 5 إلى 12 سنة! من خلال الألعاب والأغاني والرسوم المتحركة والأنشطة الإبداعية، سيقع طفلك في حبّ الموسيقى مع بناء أسس موسيقية متينة.",
    instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس الوفاء رمضاني",
    instructor_photo:"/ons.jpeg",
    instructor_bio_en:"Specialized in early childhood music education, experienced in teaching piano to children of all ages with patience and creativity.",
    instructor_bio_ar:"متخصصة في التعليم الموسيقي المبكر للأطفال، متمرّسة في تدريس البيانو للأطفال من جميع الأعمار بصبر وإبداع.",
    instrument:"PIANO", level:"BEGINNER", price:220, rating:5.0, students:530, lessons:20, duration:"7h 00m", bestseller:true,
    language_en:"Arabic & English", language_ar:"عربي وإنجليزي",
    updated_en:"May 2025", updated_ar:"مايو 2025",
    what_en:["Learn piano through games and fun activities","Recognise notes and piano keys easily","Play popular children's songs","Basic rhythm and musical coordination","Build concentration and creativity","Love music for life"],
    what_ar:["تعلّم البيانو عبر الألعاب والأنشطة الممتعة","التعرف على النوتات ومفاتيح البيانو بسهولة","عزف أغاني الأطفال المحبوبة","الإيقاع الأساسي والتنسيق الموسيقي","بناء التركيز والإبداع","عشق الموسيقى مدى الحياة"],
    requirements_en:["Age 5-12 years","No prior experience needed","A keyboard or piano with at least 44 keys","Parent or guardian support recommended"],
    requirements_ar:["العمر من 5 إلى 12 سنة","لا تحتاج خبرة مسبقة","كيبورد أو بيانو بـ44 مفتاحاً على الأقل","يُنصح بدعم الوالدين أو الولي"],
    for_who_en:["Children aged 5 to 12","Parents who want to introduce music to their child","Kids who love singing and rhythm","Young beginners ready for their first musical adventure"],
    for_who_ar:["الأطفال من 5 إلى 12 سنة","الآباء الراغبون في تعريف أطفالهم بالموسيقى","الأطفال محبّو الغناء والإيقاع","المبتدئون الصغار المستعدون لأول مغامرة موسيقية"],
    sections:[
      { title_en:"Hello Piano! 🎹", title_ar:"!أهلاً بالبيانو 🎹", lessons:[
        { title_en:"Meet the Piano — Keys & Sounds",    title_ar:"تعرّف على البيانو — المفاتيح والأصوات", duration:"8:00",  free:true  },
        { title_en:"My First Notes — Do Re Mi",        title_ar:"أولى نوتاتي — دو ري مي",              duration:"10:00", free:true  },
        { title_en:"Play a Fun Kids Song",              title_ar:"عزف أغنية أطفال ممتعة",               duration:"12:00", free:false },
        { title_en:"Music Games & Rhythm",              title_ar:"ألعاب موسيقية وإيقاع",                duration:"15:00", free:false },
      ]},
      { title_en:"Growing Musician 🌟", title_ar:"!موسيقار صغير ينمو 🌟", lessons:[
        { title_en:"Reading Music Notes",               title_ar:"قراءة نوتات الموسيقى",                duration:"18:00", free:false },
        { title_en:"Two-Hand Coordination",             title_ar:"تنسيق اليدين",                        duration:"20:00", free:false },
        { title_en:"My Favourite Song",                 title_ar:"أغنيتي المفضّلة",                     duration:"22:00", free:false },
      ]},
    ],
    reviews:[
      { name:"Parent of Lina, age 7", name_ar:"والدة لينا، 7 سنوات", rating:5, comment_en:"My daughter absolutely loves this course! She practises every day without being asked. Amazing!", comment_ar:"ابنتي تحبّ هذه الدورة كثيراً! تتمرّن كل يوم بدون أن يُطلب منها. رائع!" },
      { name:"Parent of Karim, age 9", name_ar:"والد كريم، 9 سنوات", rating:5, comment_en:"The teaching method is perfect for kids. Ons is incredibly patient and makes learning so enjoyable.", comment_ar:"طريقة التدريس مثالية للأطفال. أنس صبورة بشكل لا يُصدَّق وتجعل التعلّم ممتعاً جداً." },
    ],
  },
  "music-reading": {
    title_en:"Music Reading", title_ar:"قراءة النوتة الموسيقية",
    description_en:"Mastering Sight-Reading & Sensory Separation. An intensive academic course based on the rigorous Russian method to develop instant music-reading skill and build motor-mental coordination (sensory separation) for players and singers. Content and core topics: Applying the Russian school of reading — focusing on high academic precision and developing quick reading intuition across the G clef, F clef, and C clef in sequential and connected reading. Sensory separation and rhythmic control — professional training to break down complex rhythmic groups and perform them physically in sync with vocalization and reading without interference. Progressive applied curriculum — based on a book of vocal and rhythmic exercises that progresses according to the Russian school method, from simple meters (2/4) to compound and advanced rhythms (9/8 and 12/8). Target audience: students wishing to build a solid, professional academic foundation in rhythmic and melodic reading; players and singers seeking to develop instant sight-reading with the highest standards of accuracy and speed. To register and start studying, please submit your application now.",
    description_ar:"إتقان قراءة النوتة وفصل الحواس. كورس أكاديمي مكثف يعتمد على المنهج الروسي الصارم لتطوير مهارة القراءة الموسيقية الفورية وتنمية التآزر الحركي والذهني (فصل الحواس) لدى العازفين والمغنيين. المحتوى والمحاور الأساسية: تطبيق المدرسة الروسية في القراءة: التركيز على الدقة الأكاديمية العالية، وتطوير سرعة البديهة في القراءة المتتالية والمترابطة عبر مفتاح صول، مفتاح فا، ومفتاح دو. فصل الحواس والتحكم الإيقاعي: تدريب احترافي لتفكيك المجموعات الإيقاعية المعقدة وأدائها حركياً بالتزامن مع النطق والقراءة دون تداخل. منهج تطبيقي متدرج: يعتمد الكورس على كتاب تمارين صوتية وإيقاعية يتدرج وفقاً لآلية المدارس الروسية من الأوزان البسيطة (2/4) إلى الإيقاعات المركبة والمتقدمة (9/8 و 12/8). الفئة المستهدفة: الدارسون الراغبون في بناء أساس أكاديمي متين واحترافي في القراءة الإيقاعية والنغمية. العازفون والمغنيون الساعون لتطوير مهارة القراءة الفورية بأعلى معايير الدقة والسرعة. للتسجيل وبدء الدراسة، يرجى تقديم طلبك الآن.",
    instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس الوفاء رمضاني",
    instructor_photo:"/ons.jpeg",
    instructor_bio_en:"Proficient in both Western and Arabic music notation, with extensive experience in music theory education.",
    instructor_bio_ar:"متمكّنة في النوتة الموسيقية الغربية والعربية، بخبرة واسعة في تعليم نظرية الموسيقى.",
    instrument:"PIANO", level:"BEGINNER", price:220, rating:4.8, students:720, lessons:18, duration:"6h 30m", bestseller:false,
    language_en:"Arabic & English", language_ar:"عربي وإنجليزي",
    updated_en:"May 2025", updated_ar:"مايو 2025",
    what_en:["Read sheet music for any instrument","Understand note values and rhythms","Master treble and bass clef","Time signatures and bar lines","Write your own musical notation","Sight-read music confidently"],
    what_ar:["قراءة النوتة لأي آلة موسيقية","فهم قيم النوتات والإيقاعات","إتقان مفتاح الصول والفا","علامات الإيقاع والمازورات","كتابة نوتتك الموسيقية الخاصة","القراءة المباشرة بثقة"],
    requirements_en:["No prior music knowledge required","Any instrument is welcome (or no instrument)","Notebook and pencil recommended"],
    requirements_ar:["لا تحتاج معرفة موسيقية مسبقة","أي آلة موسيقية (أو بدون آلة)","يُنصح بدفتر وقلم"],
    for_who_en:["Beginners who want to understand music notation","Musicians who play by ear and want to learn to read","Students preparing for music exams","Anyone who wants to read music like reading a book"],
    for_who_ar:["المبتدئون الراغبون في فهم النوتة","الموسيقيون الذين يعزفون بالأذن ويريدون القراءة","طلاب يستعدون للامتحانات الموسيقية","كل من يريد قراءة الموسيقى كقراءة كتاب"],
    sections:[
      { title_en:"The Basics", title_ar:"الأساسيات", lessons:[
        { title_en:"The Musical Staff & Clefs",    title_ar:"المدرج وعلامات المفتاح", duration:"15:00", free:true  },
        { title_en:"Note Names on the Staff",      title_ar:"أسماء النوتات على المدرج", duration:"18:00", free:true  },
        { title_en:"Note Values — Whole to Eighth",title_ar:"قيم النوتات",              duration:"20:00", free:false },
        { title_en:"Time Signatures",              title_ar:"علامات الإيقاع",            duration:"22:00", free:false },
      ]},
      { title_en:"Putting It Together", title_ar:"تجميع كل شيء", lessons:[
        { title_en:"Reading a Simple Melody",      title_ar:"قراءة لحن بسيط",           duration:"25:00", free:false },
        { title_en:"Rhythm Exercises",             title_ar:"تمارين الإيقاع",            duration:"20:00", free:false },
        { title_en:"Sight Reading Practice",       title_ar:"تمرين القراءة المباشرة",    duration:"30:00", free:false },
      ]},
    ],
    reviews:[
      { name:"Rania K.", name_ar:"رانيا ك.", rating:5, comment_en:"I've been playing guitar for 5 years but couldn't read music. After this course I can read any sheet music!", comment_ar:"كنت أعزف الجيتار 5 سنوات لكن لا أستطيع قراءة النوتة. بعد هذه الدورة أستطيع قراءة أي نوتة!" },
    ],
  },
  "oud-harmony": {
    title_en:"Harmony for Oud", title_ar:"الهارموني للعود",
    description_en:"Unlock the secrets of harmony on the Oud. This unique course bridges Arabic musical tradition with harmonic theory, teaching you to harmonize melodies, modulate between maqamat, and create rich, layered musical textures on the Oud.",
    description_ar:"افتح أسرار الهارموني على العود. تجسّر هذه الدورة الفريدة التراث الموسيقي العربي مع نظرية الهارموني، وتعلّمك مناغمة الألحان والانتقال بين المقامات وخلق نسيج موسيقي غني ومتعدد الطبقات على العود.",
    instructor_en:"Omar Algour", instructor_ar:"عمر الغور",
    instructor_photo:"/omar.jpeg",
    instructor_bio_en:"Specialized in Arabic harmony and composition. Has conducted harmony workshops in multiple music academies across the Arab world.",
    instructor_bio_ar:"متخصص في الهارموني والتأليف العربي. أجرى ورشات هارموني في أكاديميات موسيقية متعددة في العالم العربي.",
    instrument:"OUD", level:"INTERMEDIATE", price:220, rating:4.7, students:280, lessons:32, duration:"11h 00m", bestseller:false,
    language_en:"Arabic & English", language_ar:"عربي وإنجليزي",
    updated_en:"May 2025", updated_ar:"مايو 2025",
    what_en:["Understand harmony theory for Oud","Harmonize any melody on the Oud","Modulate smoothly between maqamat","Create multi-voice textures","Arrange pieces for Oud ensemble","Compose original harmonic progressions"],
    what_ar:["فهم نظرية الهارموني للعود","مناغمة أي لحن على العود","الانتقال السلس بين المقامات","خلق نسيج متعدد الأصوات","توزيع مقطوعات لمجموعة عود","تأليف تسلسلات هارمونية أصلية"],
    requirements_en:["Intermediate Oud level","Knowledge of at least 4-5 maqamat","Basic music theory knowledge"],
    requirements_ar:["مستوى عود متوسط","معرفة بما لا يقل عن 4-5 مقامات","معرفة أساسية بنظرية الموسيقى"],
    for_who_en:["Intermediate Oud players wanting depth","Students of Arabic music theory","Musicians interested in composition","Oud players seeking a unique musical voice"],
    for_who_ar:["عازفو عود متوسطون يبحثون عن العمق","طلاب نظرية الموسيقى العربية","موسيقيون مهتمون بالتأليف","عازفو عود يسعون لصوت موسيقي فريد"],
    sections:[
      { title_en:"Harmony Foundations", title_ar:"أساسيات الهارموني", lessons:[
        { title_en:"What is Harmony?",         title_ar:"ما هو الهارموني؟",         duration:"15:00", free:true  },
        { title_en:"Intervals on the Oud",     title_ar:"الفترات على العود",         duration:"20:00", free:false },
        { title_en:"Basic Chord Functions",    title_ar:"وظائف الأوتار الأساسية",   duration:"22:00", free:false },
      ]},
      { title_en:"Applied Harmony", title_ar:"الهارموني التطبيقي", lessons:[
        { title_en:"Harmonising a Melody",     title_ar:"مناغمة لحن",               duration:"25:00", free:false },
        { title_en:"Maqam Modulation",         title_ar:"التحويل بين المقامات",      duration:"30:00", free:false },
        { title_en:"Writing for 2 Ouds",       title_ar:"الكتابة لعودين",            duration:"35:00", free:false },
      ]},
    ],
    reviews:[
      { name:"Sami L.", name_ar:"سامي ل.", rating:5, comment_en:"This course opened my ears and my mind. I now hear music in a completely different way.", comment_ar:"فتحت هذه الدورة أذنيّ وعقلي. أسمع الموسيقى الآن بطريقة مختلفة تماماً." },
    ],
  },
}

const LEVEL_COLOR: Record<string,{bg:string;color:string}> = {
  BEGINNER:     {bg:"rgba(52,211,153,0.1)",  color:"#34d399"},
  INTERMEDIATE: {bg:"rgba(251,191,36,0.1)",  color:"#fbbf24"},
  ADVANCED:     {bg:"rgba(248,113,113,0.1)", color:"#f87171"},
}

export default function CourseDetailPage() {
  const params   = useParams()
  const slug     = params.slug as string
  const course   = COURSES[slug]
  const { isAr } = useLang()
  const [openSection, setOpenSection] = useState(0)
  const [tab, setTab]                 = useState<"overview"|"curriculum"|"instructor"|"reviews">("overview")

  if (!course) {
    return (
      <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
        <div style={{ maxWidth:400, margin:"0 auto", padding:24 }}>
          <div style={{ fontSize:64, marginBottom:16 }}>🎵</div>
          <h2 className="font-display" style={{ fontSize:28, color:"var(--cream)", marginBottom:12 }}>Course not found</h2>
          <p style={{ color:"var(--text-muted)", marginBottom:24 }}>This course doesn't exist yet.</p>
          <Link href="/courses" className="btn-gold" style={{ display:"inline-flex" }}>← Browse All Courses</Link>
        </div>
      </main>
    )
  }

  const levelColor = LEVEL_COLOR[course.level]?.color || "#fff"
  const levelBg    = LEVEL_COLOR[course.level]?.bg    || "transparent"
  const totalLessons = course.sections.reduce((acc: number, s: any) => acc + s.lessons.length, 0)

  return (
    <main style={{ minHeight:"100vh", background:"var(--ink)", paddingTop:80 }}>

      {/* ── HERO ─────────────────────────────────── */}
      <div style={{
        background: course.instrument==="PIANO"
          ? "linear-gradient(135deg, #080808 0%, #0d1117 40%, #1a1a2e 70%, #080808 100%)"
          : "linear-gradient(135deg, #080808 0%, #0d1117 40%, #1a0a00 70%, #080808 100%)",
        borderBottom:"1px solid var(--border)",
        padding:"60px 0 0",
      }}>
        <div className="container">
          <div style={{ display:"grid", gap:48, alignItems:"start" }} className="course-hero-grid">

            {/* Left */}
            <div dir={isAr?"rtl":"ltr"} style={{ paddingBottom:60 }}>

              {/* Breadcrumb */}
              <div style={{ display:"flex", gap:8, alignItems:"center", fontSize:13, color:"var(--text-muted)", marginBottom:24 }}>
                <Link href="/" style={{ color:"var(--text-muted)", textDecoration:"none" }}>
                  {isAr?"الرئيسية":"Home"}
                </Link>
                <span>›</span>
                <Link href="/courses" style={{ color:"var(--text-muted)", textDecoration:"none" }}>
                  {isAr?"الدورات":"Courses"}
                </Link>
                <span>›</span>
                <span style={{ color:"var(--gold)" }}>
                  {course.instrument==="PIANO"?(isAr?"بيانو":"Piano"):(isAr?"عود":"Oud")}
                </span>
              </div>

              {/* Badges */}
              <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
                {course.bestseller && (
                  <span style={{ fontSize:11, fontWeight:800, padding:"4px 12px", borderRadius:6, background:"var(--gold)", color:"#0A0A0A", letterSpacing:0.5 }}>
                    {isAr?"⭐ الأكثر مبيعاً":"⭐ BESTSELLER"}
                  </span>
                )}
                <span style={{ fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:6, background:levelBg, color:levelColor }}>
                  {course.level==="BEGINNER"?(isAr?"مبتدئ":"Beginner"):course.level==="INTERMEDIATE"?(isAr?"متوسط":"Intermediate"):(isAr?"متقدم":"Advanced")}
                </span>
                <span style={{ fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:6, background:"rgba(201,168,76,0.1)", color:"var(--gold)" }}>
                  {course.instrument==="PIANO"?(isAr?"🎹 بيانو":"🎹 Piano"):(isAr?"🪕 عود":"🪕 Oud")}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display" style={{
                fontSize:"clamp(28px,4.5vw,52px)", fontWeight:700,
                color:"var(--cream)", lineHeight:1.15, marginBottom:20,
              }}>
                {isAr?course.title_ar:course.title_en}
              </h1>

              {/* Description */}
              <p style={{ fontSize:17, color:"#9A9A8A", lineHeight:1.8, marginBottom:28, maxWidth:600 }}>
                {isAr?course.description_ar:course.description_en}
              </p>

              {/* Stats row */}
              <div style={{ display:"flex", gap:24, flexWrap:"wrap", marginBottom:28 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ color:"var(--gold)", fontSize:16 }}>★</span>
                  <strong style={{ color:"var(--gold)", fontSize:16 }}>{course.rating}</strong>
                  <span style={{ color:"var(--text-muted)", fontSize:14 }}>({course.students.toLocaleString()} {isAr?"طالب":"students"})</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--text-muted)", fontSize:14 }}>
                  <span>📹</span>
                  <span>{totalLessons} {isAr?"درس":"lessons"}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--text-muted)", fontSize:14 }}>
                  <span>⏱</span>
                  <span>{course.duration}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--text-muted)", fontSize:14 }}>
                  <span>🌐</span>
                  <span>{isAr?course.language_ar:course.language_en}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--text-muted)", fontSize:14 }}>
                  <span>🔄</span>
                  <span>{isAr?"آخر تحديث:":"Updated:"} {isAr?course.updated_ar:course.updated_en}</span>
                </div>
              </div>

              {/* Instructor mini */}
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", overflow:"hidden", border:"2px solid var(--gold)", flexShrink:0 }}>
                  <Image src={course.instructor_photo} alt={course.instructor_en} width={40} height={40} style={{ objectFit:"cover" }}/>
                </div>
                <div>
                  <span style={{ fontSize:13, color:"var(--text-muted)" }}>{isAr?"المدرّس:":"Instructor:"} </span>
                  <Link href="/instructors" style={{ fontSize:14, color:"var(--gold-light)", fontWeight:600, textDecoration:"none" }}>
                    {isAr?course.instructor_ar:course.instructor_en}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — Sticky card */}
            <div style={{ position:"sticky", top:90 }}>
              <div className="card" style={{ overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
                {/* Course thumbnail */}
                <div style={{
                  aspectRatio:"16/9",
                  background: course.instrument==="PIANO"
                    ? "linear-gradient(135deg,#0d1117,#1a1a2e)"
                    : "linear-gradient(135deg,#0d1117,#1a0a00)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  position:"relative", overflow:"hidden",
                }}>
                  <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(201,168,76,0.03) 20px,rgba(201,168,76,0.03) 21px)" }}/>
                  <span style={{ fontSize:80, filter:"drop-shadow(0 0 30px rgba(201,168,76,0.4))" }}>
                    {course.instrument==="PIANO"?"🎹":"🪕"}
                  </span>
                  {/* Play button */}
                  <div style={{
                    position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
                    background:"rgba(0,0,0,0.3)", opacity:0,
                    transition:"opacity 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity="1"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity="0"}>
                    <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(201,168,76,0.9)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:20, marginLeft:4 }}>▶</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding:24 }}>
                  {/* Price */}
                  <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:16 }}>
                    <span style={{ fontSize:24, color:"var(--text-muted)", fontWeight:400 }}>$</span>
                    <span className="font-display" style={{ fontSize:40, fontWeight:800, color:"var(--cream)" }}>{course.price}</span>
                  </div>

                  {/* Enroll button */}
                  <Link href={`/checkout/${slug}`} className="btn-gold"
                    style={{ width:"100%", justifyContent:"center", padding:16, fontSize:16, marginBottom:10, borderRadius:10 }}>
                    {isAr?"سجّل الآن — ابدأ التعلم":"Enroll Now — Start Learning"}
                  </Link>

                  {/* Free preview button */}
                  <Link href={`/courses/${slug}/learn`} className="btn-outline"
                    style={{ width:"100%", justifyContent:"center", padding:12, fontSize:14, marginBottom:20, borderRadius:10 }}>
                    ▶ {isAr?"شاهد الدروس المجانية":"Preview Free Lessons"}
                  </Link>

                  <p style={{ textAlign:"center", fontSize:12, color:"var(--text-muted)", marginBottom:20 }}>
                    {isAr?"🔄 ضمان استرداد 30 يوماً":"🔄 30-day money-back guarantee"}
                  </p>

                  {/* Includes */}
                  <div style={{ borderTop:"1px solid var(--border)", paddingTop:16 }}>
                    <p style={{ fontSize:13, fontWeight:600, color:"var(--cream)", marginBottom:12 }}>
                      {isAr?"تشمل هذه الدورة:":"This course includes:"}
                    </p>
                    {[
                      { icon:"♾️", en:"Lifetime access",            ar:"وصول مدى الحياة"       },
                      { icon:"📱", en:"Mobile & desktop",           ar:"موبايل وكمبيوتر"        },
                      { icon:"🏆", en:"Certificate of completion",  ar:"شهادة إتمام"            },
                      { icon:"💬", en:"Instructor Q&A",             ar:"أسئلة للمدرّس"          },
                      { icon:"📅", en:"Live sessions available",    ar:"جلسات مباشرة متاحة"    },
                      { icon:"📥", en:"Downloadable resources",     ar:"موارد قابلة للتحميل"   },
                    ].map((item: any) => (
                      <div key={item.en} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"var(--text-muted)", marginBottom:8 }}>
                        <span>{item.icon}</span>
                        <span>{isAr?item.ar:item.en}</span>
                      </div>
                    ))}
                  </div>

                  {/* Share */}
                  <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, marginTop:4, textAlign:"center" }}>
                    <p style={{ fontSize:12, color:"var(--text-muted)" }}>
                      {isAr?"شارك هذه الدورة:":"Share this course:"}
                      <span style={{ marginLeft:8, cursor:"pointer" }}>📤</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ─────────────────────────────────── */}
      <div style={{ background:"var(--ink-soft)", borderBottom:"1px solid var(--border)", position:"sticky", top:56, zIndex:10 }}>
        <div className="container">
          <div style={{ display:"flex", gap:0 }} dir={isAr?"rtl":"ltr"}>
            {[
              { key:"overview",    en:"Overview",    ar:"نظرة عامة"   },
              { key:"curriculum",  en:"Curriculum",  ar:"المنهج"      },
              { key:"instructor",  en:"Instructor",  ar:"المدرّس"     },
              { key:"reviews",     en:"Reviews",     ar:"التقييمات"  },
            ].map((t: any) => (
              <button key={t.key} onClick={() => setTab(t.key as any)} style={{
                padding:"16px 24px", fontSize:14, fontWeight:600, cursor:"pointer",
                background:"transparent", border:"none",
                color: tab===t.key ? "var(--gold)" : "var(--text-muted)",
                borderBottom: tab===t.key ? "2px solid var(--gold)" : "2px solid transparent",
                transition:"all 0.2s",
              }}>
                {isAr?t.ar:t.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────── */}
      <div className="container" style={{ paddingTop:48, paddingBottom:80 }} dir={isAr?"rtl":"ltr"}>
        <div style={{ maxWidth:760 }}>

          {/* Overview tab */}
          {tab === "overview" && (
            <div style={{ display:"flex", flexDirection:"column", gap:48 }}>

              {/* What you'll learn */}
              <div className="card" style={{ padding:32 }}>
                <h2 className="font-display" style={{ fontSize:26, fontWeight:700, color:"var(--cream)", marginBottom:24 }}>
                  {isAr?"ماذا ستتعلم؟":"What you'll learn"}
                </h2>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  {(isAr?course.what_ar:course.what_en).map((item: string, i: number) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:14, color:"var(--text-muted)", lineHeight:1.6 }}>
                      <span style={{ color:"var(--gold)", marginTop:2, flexShrink:0, fontSize:16 }}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="font-display" style={{ fontSize:24, fontWeight:700, color:"var(--cream)", marginBottom:20 }}>
                  {isAr?"المتطلبات":"Requirements"}
                </h2>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                  {(isAr?course.requirements_ar:course.requirements_en).map((item: string, i: number) => (
                    <li key={i} style={{ display:"flex", gap:10, fontSize:14, color:"var(--text-muted)", lineHeight:1.6 }}>
                      <span style={{ color:"var(--gold)", flexShrink:0 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who is this for */}
              <div>
                <h2 className="font-display" style={{ fontSize:24, fontWeight:700, color:"var(--cream)", marginBottom:20 }}>
                  {isAr?"لمن هذه الدورة؟":"Who is this course for?"}
                </h2>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                  {(isAr?course.for_who_ar:course.for_who_en).map((item: string, i: number) => (
                    <li key={i} style={{ display:"flex", gap:10, fontSize:14, color:"var(--text-muted)", lineHeight:1.6 }}>
                      <span style={{ color:"var(--gold)", flexShrink:0 }}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="font-display" style={{ fontSize:24, fontWeight:700, color:"var(--cream)", marginBottom:24 }}>
                  {isAr?"آراء الطلاب":"Student Reviews"}
                </h2>

                {/* Rating summary */}
                <div className="card" style={{ padding:24, marginBottom:24, display:"flex", alignItems:"center", gap:32 }}>
                  <div style={{ textAlign:"center" }}>
                    <div className="font-display gradient-text" style={{ fontSize:56, fontWeight:800, lineHeight:1 }}>{course.rating}</div>
                    <div style={{ display:"flex", gap:2, justifyContent:"center", margin:"8px 0" }}>
                      {[1,2,3,4,5].map((s: any) => (
                        <span key={s} style={{ fontSize:18, color:s<=Math.floor(course.rating)?"var(--gold)":"var(--border)" }}>★</span>
                      ))}
                    </div>
                    <div style={{ fontSize:12, color:"var(--text-muted)" }}>{isAr?"تقييم الدورة":"Course Rating"}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    {[5,4,3].map((stars: any) => (
                      <div key={stars} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                        <div style={{ flex:1, height:6, background:"var(--border)", borderRadius:3, overflow:"hidden" }}>
                          <div style={{ height:"100%", background:"var(--gold)", borderRadius:3, width: stars===5?"90%":stars===4?"7%":"3%" }}/>
                        </div>
                        <span style={{ fontSize:11, color:"var(--text-muted)", flexShrink:0 }}>{"★".repeat(stars)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review cards */}
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {course.reviews.map((review: any, i: number) => (
                    <div key={i} className="card" style={{ padding:24 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                        <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#0A0A0A", flexShrink:0 }}>
                          {(isAr?review.name_ar:review.name)[0]}
                        </div>
                        <div>
                          <div style={{ fontSize:14, fontWeight:600, color:"var(--cream)" }}>{isAr?review.name_ar:review.name}</div>
                          <div style={{ display:"flex", gap:1 }}>
                            {[1,2,3,4,5].map((s: any) => (
                              <span key={s} style={{ fontSize:12, color:s<=review.rating?"var(--gold)":"var(--border)" }}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7, fontStyle:"italic" }}>
                        "{isAr?review.comment_ar:review.comment_en}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Curriculum tab */}
          {tab === "curriculum" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                <h2 className="font-display" style={{ fontSize:26, fontWeight:700, color:"var(--cream)" }}>
                  {isAr?"المنهج الدراسي":"Course Curriculum"}
                </h2>
                <span style={{ fontSize:13, color:"var(--text-muted)" }}>
                  {totalLessons} {isAr?"درس":"lessons"} • {course.duration}
                </span>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {course.sections.map((section: any, si: number) => (
                  <div key={si} style={{ border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
                    <button onClick={() => setOpenSection(openSection===si?-1:si)}
                      style={{ width:"100%", padding:"18px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"var(--ink-soft)", border:"none", cursor:"pointer", color:"var(--cream)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:32, height:32, borderRadius:"50%", background:"var(--gold-pale)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"var(--gold)" }}>
                          {si+1}
                        </div>
                        <span style={{ fontSize:15, fontWeight:600 }}>{isAr?section.title_ar:section.title_en}</span>
                      </div>
                      <span style={{ fontSize:13, color:"var(--text-muted)" }}>
                        {section.lessons.length} {isAr?"درس":"lessons"} {openSection===si?"▲":"▼"}
                      </span>
                    </button>

                    {openSection===si && (
                      <div>
                        {section.lessons.map((lesson: any, li: number) => (
                          <div key={li} style={{
                            padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center",
                            borderTop:"1px solid var(--border)", background:"var(--ink)",
                          }}>
                            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                              <div style={{
                                width:28, height:28, borderRadius:"50%", flexShrink:0,
                                display:"flex", alignItems:"center", justifyContent:"center",
                                background: lesson.free ? "rgba(52,211,153,0.1)" : "var(--ink-card)",
                                border: `1px solid ${lesson.free ? "rgba(52,211,153,0.3)" : "var(--border)"}`,
                              }}>
                                <span style={{ fontSize:10, color: lesson.free ? "#34d399" : "var(--text-muted)" }}>
                                  {lesson.free ? "▶" : "🔒"}
                                </span>
                              </div>
                              <span style={{ fontSize:14, color:lesson.free?"var(--cream)":"var(--text-muted)" }}>
                                {isAr?lesson.title_ar:lesson.title_en}
                              </span>
                              {lesson.free && (
                                <span style={{ fontSize:10, padding:"2px 8px", borderRadius:4, background:"rgba(52,211,153,0.1)", color:"#34d399", fontWeight:700 }}>
                                  {isAr?"مجاني":"FREE"}
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize:13, color:"var(--text-muted)", flexShrink:0 }}>{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop:40, textAlign:"center", padding:"40px", background:"var(--ink-soft)", borderRadius:16, border:"1px solid var(--border)" }}>
                <p style={{ fontSize:16, color:"var(--text-muted)", marginBottom:20 }}>
                  {isAr?"هل أنت مستعد لبدء التعلم؟":"Ready to start learning?"}
                </p>
                <Link href={`/checkout/${slug}`} className="btn-gold" style={{ padding:"14px 40px", fontSize:16 }}>
                  {isAr?"سجّل الآن":"Enroll Now"}
                </Link>
              </div>
            </div>
          )}

          {/* Instructor tab */}
          {tab === "instructor" && (
            <div>
              <h2 className="font-display" style={{ fontSize:26, fontWeight:700, color:"var(--cream)", marginBottom:32 }}>
                {isAr?"عن المدرّس":"Your Instructor"}
              </h2>

              <div className="card" style={{ padding:0, overflow:"hidden" }}>
                {/* Instructor header */}
                <div style={{
                  padding:32, display:"flex", gap:24, alignItems:"flex-start",
                  background: course.instrument==="PIANO"
                    ? "linear-gradient(135deg,#0d1117,#1a1a2e)"
                    : "linear-gradient(135deg,#0d1117,#1a0a00)",
                }}>
                  <div style={{ width:100, height:100, borderRadius:"50%", overflow:"hidden", border:"3px solid var(--gold)", flexShrink:0 }}>
                    <Image src={course.instructor_photo} alt={course.instructor_en} width={100} height={100} style={{ objectFit:"cover", objectPosition:"top" }}/>
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontSize:24, fontWeight:700, color:"var(--cream)", marginBottom:6 }}>
                      {isAr?course.instructor_ar:course.instructor_en}
                    </h3>
                    <p style={{ fontSize:14, color:"var(--gold-light)", marginBottom:12 }}>
                      {course.instrument==="PIANO"?(isAr?"أستاذة البيانو":"Piano Instructor"):(isAr?"أستاذ العود":"Oud Instructor")}
                    </p>
                    <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                      {[
                        { icon:"⭐", value:course.rating, label_en:"Rating", label_ar:"تقييم" },
                        { icon:"👥", value:course.students.toLocaleString(), label_en:"Students", label_ar:"طالب" },
                      ].map((stat: any, i: any) => (
                        <div key={i} style={{ fontSize:13, color:"var(--text-muted)" }}>
                          <span style={{ color:"var(--gold)" }}>{stat.icon} {stat.value}</span>
                          {" "}{isAr?stat.label_ar:stat.label_en}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div style={{ padding:32 }}>
                  <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.9, marginBottom:24 }}>
                    {isAr?course.instructor_bio_ar:course.instructor_bio_en}
                  </p>
                  <Link href="/instructors" className="btn-outline" style={{ fontSize:13, padding:"10px 24px" }}>
                    {isAr?"عرض الملف الكامل":"View Full Profile"}
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

          {tab === "reviews" && (
            <div>
              <h2 className="font-display" style={{ fontSize:26, fontWeight:700, color:"var(--cream)", marginBottom:28 }}>
                {isAr?"تقييمات الطلاب":"Student Reviews"}
              </h2>
              <ReviewsSection courseSlug={slug} />
            </div>
          )}

      <div style={{ background:"var(--ink-soft)", borderTop:"1px solid var(--border)", padding:"48px 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 className="font-display" style={{ fontSize:32, fontWeight:700, color:"var(--cream)", marginBottom:12 }}>
            {isAr?"هل أنت مستعد لبدء رحلتك الموسيقية؟":"Ready to start your musical journey?"}
          </h2>
          <p style={{ fontSize:16, color:"var(--text-muted)", marginBottom:32 }}>
            {isAr?"انضم إلى آلاف الطلاب الذين بدأوا بالفعل مع Pianoud":"Join thousands of students who already started with Pianoud"}
          </p>
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href={`/checkout/${slug}`} className="btn-gold" style={{ padding:"16px 48px", fontSize:16 }}>
              {isAr?"سجّل الآن — $"+course.price:"Enroll Now — $"+course.price}
            </Link>
            <Link href={`/courses/${slug}/learn`} className="btn-outline" style={{ padding:"16px 32px", fontSize:15 }}>
              ▶ {isAr?"جرّب مجاناً":"Try Free"}
            </Link>
          </div>
          <p style={{ fontSize:12, color:"var(--text-muted)", marginTop:16 }}>
            🔄 {isAr?"ضمان استرداد المال خلال 30 يوماً — بدون أسئلة":"30-day money-back guarantee — no questions asked"}
          </p>
        </div>
      </div>

      <style>{`
        .course-hero-grid { grid-template-columns: 1fr 380px; }
        @media(max-width:960px) { .course-hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
