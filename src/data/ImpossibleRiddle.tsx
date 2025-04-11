
// Types
export type TrendingRiddleType = {
    id: string;
    question: string;
    answer: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
    category: string;
    likes: number;
    views: number;
    isNew?: boolean;
  };


export const trendingRiddles: TrendingRiddleType[] = [
    {
      id: 'r1',
      question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      answer: "An echo",
      difficulty: 'medium',
      category: 'nature',
      likes: 845,
      views: 2300,
      isNew: true
    },
    {
      id: 'r2',
      question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
      answer: "A map",
      difficulty: 'medium',
      category: 'object',
      likes: 762,
      views: 1980
    },
    {
      id: 'r3',
      question: "What has a head, a tail, is brown, and has no legs?",
      answer: "A penny",
      difficulty: 'easy',
      category: 'object',
      likes: 541,
      views: 1500
    },
    {
      id: 'r4',
      question: "The person who makes it, sells it. The person who buys it, never uses it. The person who uses it, never sees it. What is it?",
      answer: "A coffin",
      difficulty: 'hard',
      category: 'object',
      likes: 923,
      views: 2700
    },
    {
        "id": "r6",
        "question": "I'm always running but never get tired. I have a bed but never sleep in it. What am I?",
        "answer": "A river",
        "difficulty": "easy",
        "category": "nature",
        "likes": 687,
        "views": 1890,
        "isNew": true
      },
      {
        "id": "r7",
        "question": "I can be cracked, made, told, and played. What am I?",
        "answer": "A joke",
        "difficulty": "easy",
        "category": "concept",
        "likes": 712,
        "views": 1950,
        "isNew": true
      },
      {
        "id": "r8",
        "question": "I follow you all day long, but when the stars come out, I am gone. What am I?",
        "answer": "Your shadow",
        "difficulty": "easy",
        "category": "nature",
        "likes": 623,
        "views": 1730
      },
      {
        "id": "r9",
        "question": "I'm the thing that keeps scrolling when you should be sleeping. I'm full of memes that keep you laughing and news that keeps you weeping. What am I?",
        "answer": "Social media",
        "difficulty": "easy",
        "category": "technology",
        "likes": 895,
        "views": 2450,
        "isNew": true
      },
      {
        "id": "r10",
        "question": "People think I'm a lifesaver until they need to reach me at 1%. What am I?",
        "answer": "Phone battery",
        "difficulty": "easy",
        "category": "technology",
        "likes": 963,
        "views": 2640,
        "isNew": true
      },
      {
        "id": "r11",
        "question": "I'm constantly refreshed but never feel clean. People stare at me all day but nobody sees the same thing. What am I?",
        "answer": "A website",
        "difficulty": "medium",
        "category": "technology",
        "likes": 781,
        "views": 2120,
        "isNew": true
      },
      {
        "id": "r12",
        "question": "I'm the reason you check your pocket ten times before leaving the house. What am I?",
        "answer": "Your phone",
        "difficulty": "easy",
        "category": "technology",
        "likes": 876,
        "views": 2370,
        "isNew": true
      },
      {
        "id": "r13",
        "question": "I'm thin when you're happy and fat when you're sad. When completely forgotten, that's when I'm at my best. What am I?",
        "answer": "Your problems",
        "difficulty": "medium",
        "category": "concept",
        "likes": 827,
        "views": 2280,
        "isNew": true
      },
      {
        "id": "r14",
        "question": "I'm a five-letter word that becomes shorter when you add two letters to me. What am I?",
        "answer": "Short",
        "difficulty": "hard",
        "category": "wordplay",
        "likes": 932,
        "views": 2510
      },
      {
        "id": "r15",
        "question": "What's the difference between a well-dressed man on a bicycle and a poorly dressed man on a unicycle?",
        "answer": "Attire",
        "difficulty": "medium",
        "category": "wordplay",
        "likes": 1043,
        "views": 2860,
        "isNew": true
      },
      {
        "id": "r16",
        "question": "I have no wallet but I pay everyone's bills. Nobody wants to see me but everyone asks where I am. What am I?",
        "answer": "Payday",
        "difficulty": "medium",
        "category": "concept",
        "likes": 921,
        "views": 2490,
        "isNew": true
      },
      {
        "id": "r17",
        "question": "What's worse than finding a worm in your apple?",
        "answer": "Finding half a worm",
        "difficulty": "easy",
        "category": "joke",
        "likes": 1138,
        "views": 3120,
        "isNew": true
      },
      {
        "id": "r18",
        "question": "I'm the thing you make when you open your mouth but never see when you close your eyes. What am I?",
        "answer": "Noise",
        "difficulty": "medium",
        "category": "concept",
        "likes": 743,
        "views": 2050
      },
      {
        "id": "r19",
        "question": "I come in many shapes and sizes. Parts of me may be blue, parts of me may be green. Parts of me may be red, and my insides are normally yellow if I'm ripe. What am I?",
        "answer": "A meme",
        "difficulty": "medium",
        "category": "technology",
        "likes": 1087,
        "views": 2970,
        "isNew": true
      },
      {
        "id": "r20",
        "question": "I'm a word of four letters: the first two show what's not closed, and the last two show what's not fast. What am I?",
        "answer": "Open",
        "difficulty": "hard",
        "category": "wordplay",
        "likes": 836,
        "views": 2290
      },
      {
        "id": "r21",
        "question": "I have a thumb and four fingers but I'm not alive. I'm often with you when you drive. What am I?",
        "answer": "A glove",
        "difficulty": "easy",
        "category": "object",
        "likes": 682,
        "views": 1870
      },
      {
        "id": "r22",
        "question": "I'm the reason you lose 3 hours while saying 'just one more episode.' What am I?",
        "answer": "Streaming service",
        "difficulty": "easy",
        "category": "technology",
        "likes": 973,
        "views": 2660,
        "isNew": true
      },
      {
        "id": "r23",
        "question": "What gets wetter as it dries?",
        "answer": "A towel",
        "difficulty": "medium",
        "category": "object",
        "likes": 794,
        "views": 2190
      },
      {
        "id": "r24",
        "question": "I'm tall when I'm young, and short when I'm old. What am I?",
        "answer": "A candle",
        "difficulty": "medium",
        "category": "object",
        "likes": 765,
        "views": 2100
      },
      {
        "id": "r26",
        "question": "I'm always in front of you but can't be seen. What am I?",
        "answer": "The future",
        "difficulty": "medium",
        "category": "concept",
        "likes": 854,
        "views": 2330,
        "isNew": true
      },
      {
        "id": "r27",
        "question": "I'm the reason your packages arrive but your socks disappear. What am I?",
        "answer": "The delivery system",
        "difficulty": "easy",
        "category": "humor",
        "likes": 1076,
        "views": 2910,
        "isNew": true
      },
      {
        "id": "r28",
        "question": "I have a face that doesn't frown, hands that don't wave, and runs but stays in place. What am I?",
        "answer": "A clock",
        "difficulty": "medium",
        "category": "object",
        "likes": 742,
        "views": 2050
      },
      {
        "id": "r29",
        "question": "I'm the only place where 'today' comes before 'yesterday.' What am I?",
        "answer": "The dictionary",
        "difficulty": "hard",
        "category": "wordplay",
        "likes": 893,
        "views": 2450,
        "isNew": true
      },
      {
        "id": "r30",
        "question": "What has legs but doesn't walk, a strong back but doesn't lift, and holds more than it appears?",
        "answer": "A chair",
        "difficulty": "easy",
        "category": "object",
        "likes": 723,
        "views": 1980
      },
      {
        "id": "r31",
        "question": "I'm something people love or hate. I change people's appearances and thoughts. If a person takes care of themselves, I will go up even higher. What am I?",
        "answer": "Self-esteem",
        "difficulty": "medium",
        "category": "concept",
        "likes": 967,
        "views": 2630,
        "isNew": true
      },
      {
        "id": "r32",
        "question": "I can bring tears to your eyes; resurrect the dead, make you smile, and reverse time. I form in an instant but last a lifetime. What am I?",
        "answer": "Memories",
        "difficulty": "medium",
        "category": "concept",
        "likes": 1132,
        "views": 3080,
        "isNew": true
      },
      {
        "id": "r33",
        "question": "What's the difference between a poorly dressed man on a trampoline and a well-dressed man on a trampoline?",
        "answer": "Attire (a tire)",
        "difficulty": "medium",
        "category": "joke",
        "likes": 1084,
        "views": 2940,
        "isNew": true
      },
      {
        "id": "r34",
        "question": "What disappears as soon as you say its name?",
        "answer": "Silence",
        "difficulty": "medium",
        "category": "concept",
        "likes": 876,
        "views": 2380
      },
      {
        "id": "r35",
        "question": "I'm the thing you use 20 times a day but never remember my password. What am I?",
        "answer": "Wi-Fi",
        "difficulty": "easy",
        "category": "technology",
        "likes": 1129,
        "views": 3050,
        "isNew": true
      },
      {
        "id": "r36",
        "question": "What has four wheels and flies?",
        "answer": "A garbage truck",
        "difficulty": "easy",
        "category": "joke",
        "likes": 857,
        "views": 2340
      },
      {
        "id": "r37",
        "question": "I'm full of holes but still hold water. What am I?",
        "answer": "A sponge",
        "difficulty": "easy",
        "category": "object",
        "likes": 691,
        "views": 1880
      },
      {
        "id": "r38",
        "question": "I let you look right through a wall. What am I?",
        "answer": "A window",
        "difficulty": "easy",
        "category": "object",
        "likes": 583,
        "views": 1620
      },
      {
        "id": "r39",
        "question": "I'm the reason you have 37 tabs open but can't remember what you were looking for. What am I?",
        "answer": "Internet browsing",
        "difficulty": "easy",
        "category": "technology",
        "likes": 1195,
        "views": 3240,
        "isNew": true
      },
      {
        "id": "r40",
        "question": "What's able to go up a chimney down but unable to go down a chimney up?",
        "answer": "An umbrella",
        "difficulty": "hard",
        "category": "logic",
        "likes": 825,
        "views": 2250
      },
      {
        "id": "r41",
        "question": "I'm the reason your plants are dead but your screen time is alive. What am I?",
        "answer": "Procrastination",
        "difficulty": "medium",
        "category": "concept",
        "likes": 981,
        "views": 2670,
        "isNew": true
      },
      {
        "id": "r42",
        "question": "What has many teeth but can't bite?",
        "answer": "A comb",
        "difficulty": "easy",
        "category": "object",
        "likes": 645,
        "views": 1790
      },
      {
        "id": "r43",
        "question": "I'm something you make, something you break, and something you keep until death. What am I?",
        "answer": "A promise",
        "difficulty": "medium",
        "category": "concept",
        "likes": 872,
        "views": 2370
      },
      {
        "id": "r44",
        "question": "I'm that thing in your pocket that you check 100 times when waiting for someone to text back. What am I?",
        "answer": "A phone",
        "difficulty": "easy",
        "category": "technology",
        "likes": 1047,
        "views": 2850,
        "isNew": true
      },
      {
        "id": "r45",
        "question": "What gets bigger the more you take away from it?",
        "answer": "A hole",
        "difficulty": "medium",
        "category": "logic",
        "likes": 783,
        "views": 2150
      },
      {
        "id": "r25",
        "question": "What's the one app that nobody downloads but everyone has?",
        "answer": "The calculator",
        "difficulty": "easy",
        "category": "technology",
        "likes": 1042,
        "views": 2840,
        "isNew": true
      },
    {
      id: 'r5',
      question: "I'm found in socks, scarves, and mittens; and often in the paws of playful kittens. What am I?",
      answer: "Yarn",
      difficulty: 'easy',
      category: 'object',
      likes: 489,
      views: 1340
    }
  ];
  


export const impossibleRiddles: TrendingRiddleType[] = [
    {
      id: 'ir1',
      question: "If you have me, you want to share me. If you share me, you haven't got me. What am I?",
      answer: "A secret",
      difficulty: 'extreme',
      category: 'logic',
      likes: 1245,
      views: 3800
    },
    {
        "id": "ir4",
        "question": "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        "answer": "A map",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1056,
        "views": 3150
      },
      {
        "id": "ir5",
        "question": "I'm light as a feather, yet the strongest person can't hold me for more than a minute. What am I?",
        "answer": "Breath",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1189,
        "views": 3420
      },
      {
        "id": "ir6",
        "question": "I'm full of holes but still hold water. What am I?",
        "answer": "A sponge",
        "difficulty": "easy",
        "category": "logic",
        "likes": 867,
        "views": 2780
      },
      {
        "id": "ir7",
        "question": "The more you take, the more you leave behind. What am I?",
        "answer": "Footsteps",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1312,
        "views": 3560
      },
      {
        "id": "ir8",
        "question": "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        "answer": "An echo",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1421,
        "views": 3820
      },
      {
        "id": "ir9",
        "question": "What has a head, a tail, is brown, and has no legs?",
        "answer": "A penny",
        "difficulty": "medium",
        "category": "wordplay",
        "likes": 945,
        "views": 2890
      },
      {
        "id": "ir10",
        "question": "What goes up but never comes down?",
        "answer": "Your age",
        "difficulty": "easy",
        "category": "logic",
        "likes": 986,
        "views": 3120
      },
      {
        "id": "ir11",
        "question": "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
        "answer": "Fire",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1356,
        "views": 3740
      },
      {
        "id": "ir12",
        "question": "Forward I am heavy, but backward I am not. What am I?",
        "answer": "The word 'ton'",
        "difficulty": "extreme",
        "category": "wordplay",
        "likes": 1087,
        "views": 3050
      },
      {
        "id": "ir13",
        "question": "I'm found in socks, scarves, and mittens; and often in the paws of playful kittens. What am I?",
        "answer": "Yarn",
        "difficulty": "medium",
        "category": "wordplay",
        "likes": 923,
        "views": 2850
      },
      {
        "id": "ir14",
        "question": "What can travel around the world while staying in a corner?",
        "answer": "A stamp",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1278,
        "views": 3480
      },
      {
        "id": "ir15",
        "question": "What has keys but no locks, space but no room, and you can enter but not go in?",
        "answer": "A keyboard",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1402,
        "views": 3690
      },
      {
        "id": "ir16",
        "question": "What five-letter word becomes shorter when you add two letters to it?",
        "answer": "Short",
        "difficulty": "extreme",
        "category": "wordplay",
        "likes": 1165,
        "views": 3280
      },
      {
        "id": "ir19",
        "question": "I am not alive, but I can die. I have no lungs, but I need air. I have no mouth, but I can drown. What am I?",
        "answer": "Fire",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1392,
        "views": 3780
      },
      {
        "id": "ir20",
        "question": "You use a knife to slice my head and weep beside me when I am dead. What am I?",
        "answer": "An onion",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1167,
        "views": 3340
      },
      {
        "id": "ir21",
        "question": "If you drop me, I'm sure to crack. Give me a smile, and I'll always smile back. What am I?",
        "answer": "A mirror",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1253,
        "views": 3495
      },
      {
        "id": "ir22",
        "question": "I can be cracked, made, told, and played. What am I?",
        "answer": "A joke",
        "difficulty": "hard",
        "category": "wordplay",
        "likes": 1380,
        "views": 3720
      },
      {
        "id": "ir23",
        "question": "What begins and has no end? What is the ending of all that begins?",
        "answer": "Death",
        "difficulty": "extreme",
        "category": "philosophical",
        "likes": 1478,
        "views": 3905
      },
      {
        "id": "ir24",
        "question": "What is so fragile that saying its name breaks it?",
        "answer": "Silence",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1521,
        "views": 4120
      },
      {
        "id": "ir25",
        "question": "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
        "answer": "A river",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1385,
        "views": 3810
      },
      {
        "id": "ir26",
        "question": "I am always hungry and will die if not fed, but whatever I touch will soon turn red. What am I?",
        "answer": "Fire",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1267,
        "views": 3580
      },
      {
        "id": "ir27",
        "question": "The person who makes it doesn't want it. The person who buys it doesn't use it. The person who uses it doesn't know they're using it. What is it?",
        "answer": "A coffin",
        "difficulty": "extreme",
        "category": "logic",
        "likes": 1593,
        "views": 4250
      },
      {
        "id": "ir28",
        "question": "What word contains all 26 letters?",
        "answer": "Alphabet",
        "difficulty": "medium",
        "category": "wordplay",
        "likes": 1186,
        "views": 3470
      },
      {
        "id": "ir29",
        "question": "What has a neck but no head, two arms but no hands?",
        "answer": "A shirt",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1235,
        "views": 3540
      },
      {
        "id": "ir30",
        "question": "I have keys but no locks. I have space but no room. You can enter, but you cannot go in. What am I?",
        "answer": "A keyboard",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1347,
        "views": 3680
      },
      {
        "id": "ir31",
        "question": "What English word has three consecutive double letters?",
        "answer": "Bookkeeper",
        "difficulty": "extreme",
        "category": "wordplay",
        "likes": 1175,
        "views": 3320
      },
      {
        "id": "ir32",
        "question": "I am a word of five letters. I sound the same when you remove my first letter. I sound the same when you remove my third letter. I sound the same when you remove my last letter. I sound the same when you remove all three. What word am I?",
        "answer": "Empty",
        "difficulty": "extreme",
        "category": "wordplay",
        "likes": 1456,
        "views": 3870
      },
      {
        "id": "ir33",
        "question": "I am a 7-letter word. I become longer when my third letter is removed. What am I?",
        "answer": "Lounger",
        "difficulty": "extreme",
        "category": "wordplay",
        "likes": 1328,
        "views": 3650
      },
      {
        "id": "ir34",
        "question": "Two in a corner, one in a room, zero in a house, but one in a shelter. What am I?",
        "answer": "The letter 'R'",
        "difficulty": "extreme",
        "category": "wordplay",
        "likes": 1429,
        "views": 3790
      },
      {
        "id": "ir35",
        "question": "What breaks yet never falls, and what falls yet never breaks?",
        "answer": "Day and night",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1483,
        "views": 3920
      },
      {
        "id": "ir36",
        "question": "What can fill a room but takes up no space?",
        "answer": "Light",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1273,
        "views": 3570
      },
      {
        "id": "ir37",
        "question": "I'm light as a feather, but even the strongest person cannot hold me for more than 5 minutes. What am I?",
        "answer": "Breath",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1358,
        "views": 3710
      },
      {
        "id": "ir38",
        "question": "What starts with an 'e', ends with an 'e', and typically contains only one letter?",
        "answer": "An envelope",
        "difficulty": "hard",
        "category": "wordplay",
        "likes": 1412,
        "views": 3830
      },
      {
        "id": "ir39",
        "question": "A woman shoots her husband. Then she holds him underwater for five minutes. Finally, she hangs him. But five minutes later they both go out and enjoy a wonderful dinner together. How can this be?",
        "answer": "She took a picture of him and developed it in her darkroom",
        "difficulty": "extreme",
        "category": "lateral thinking",
        "likes": 1586,
        "views": 4150
      },
      {
        "id": "ir40",
        "question": "I am a word. If you pronounce me correctly, I am wrong. If you pronounce me incorrectly, I am right. What word am I?",
        "answer": "Wrong",
        "difficulty": "extreme",
        "category": "wordplay",
        "likes": 1492,
        "views": 3950
      },
      {
        "id": "ir41",
        "question": "What occurs once in every minute, twice in every moment, yet never in a thousand years?",
        "answer": "The letter 'M'",
        "difficulty": "extreme",
        "category": "wordplay",
        "likes": 1547,
        "views": 4080
      },
      {
        "id": "ir42",
        "question": "I am weightless, but you can see me. Put me in a bucket, and I'll make it lighter. What am I?",
        "answer": "A hole",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1375,
        "views": 3760
      },
      {
        "id": "ir43",
        "question": "The more there is, the less you see. What am I?",
        "answer": "Darkness",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1284,
        "views": 3620
      },
      {
        "id": "ir44",
        "question": "What has 13 hearts but no other organs?",
        "answer": "A deck of cards",
        "difficulty": "hard",
        "category": "logic",
        "likes": 1368,
        "views": 3740
      },
      {
        "id": "ir45",
        "question": "What has many keys but can't open a single lock?",
        "answer": "A piano",
        "difficulty": "medium",
        "category": "logic",
        "likes": 1297,
        "views": 3640
      },
      {
        "id": "ir17",
        "question": "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
        "answer": "Pencil lead",
        "difficulty": "extreme",
        "category": "logic",
        "likes": 1198,
        "views": 3340
      },
      {
        "id": "ir18",
        "question": "What word in the English language does the following: the first two letters signify a male, the first three letters signify a female, the first four letters signify a great person, while the entire word signifies a great woman?",
        "answer": "Heroine",
        "difficulty": "extreme",
        "category": "wordplay",
        "likes": 1256,
        "views": 3410
      },
    {
      id: 'ir2',
      question: "I turn polar bears white and I will make you cry. I make guys have to pee and girls comb their hair. I make celebrities look stupid and normal people look like celebrities. I turn pancakes brown and make your champagne bubble. If you squeeze me, I'll pop. If you look at me, you'll pop. What am I?",
      answer: "Pressure",
      difficulty: 'extreme',
      category: 'wordplay',
      likes: 1125,
      views: 3200
    },
    {
      id: 'ir3',
      question: "What English word has three consecutive double letters?",
      answer: "Bookkeeper",
      difficulty: 'extreme',
      category: 'wordplay',
      likes: 978,
      views: 2900
    }
  ];

  export const bestRiddles: TrendingRiddleType[] = [...impossibleRiddles, ...trendingRiddles]