const recordedAudioQuestions = new Set([
  51, 52, 53, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 68, 69, 70, 71, 72, 73,
  74, 75, 77, 78, 79, 80, 82, 83, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96,
  97, 98, 99, 100,
  101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116,
  117, 118, 119, 120, 121, 122, 123, 124, 126, 127, 128, 129, 130, 131, 132, 133,
  134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
  150,
  151, 152, 153, 154, 155, 156, 157, 158, 159, 161, 162, 163, 164, 165, 166, 168,
  169, 171, 172, 173, 174, 175, 184, 186, 187, 188, 189, 190, 191, 192, 193, 194,
]);

window.listeningPart1Questions = [
  {
    title: "What does the customer complain about?",
    transcript: [
      "I stopped by a new coffee shop yesterday to get some work done before a meeting.",
      "The coffee itself was really good, and the seats were comfortable too.",
      "But I ended up leaving earlier than planned because the Wi-Fi kept disconnecting every few minutes, and when it did work, it was extremely slow.",
      "I tried asking the staff about it, and they said a few other customers had mentioned the same problem that morning.",
      "I probably will not bring my laptop there again unless they fix the connection.",
    ],
    options: ["The coffee was cold", "The Wi-Fi was too slow", "The shop was too noisy"],
    answer: 1,
  },
  {
    title: "Talking about the park, what is going to be replaced?",
    transcript: [
      "Have you heard about the changes they are planning to make to the park?",
      "They are going to replace the wooden seats with new ones next month.",
      "Are they also going to replace the old rubbish bins?",
      "No, those are still in good condition. They are planning to repair the playground equipment instead.",
      "That is great. The park will look much better after the improvements.",
    ],
    options: ["The wooden seats", "The playground equipment", "The rubbish bins"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "Anne is calling her daughter Sally. What does Anne need?",
    transcript: [
      "Hi Sally, it is Mum. How are you?",
      "I just wanted to remind you about dinner tonight. We are having your favorite, spaghetti!",
      "Do not forget to pick up your brother from school at four o'clock.",
      "Oh, and can you stop by the store on your way home? We are out of eggs, and I need some to finish baking the cake.",
      "Thanks, sweetie!",
    ],
    options: ["Milk", "Eggs", "Bread"],
    answer: 1,
  },
  {
    title: "What does the woman complain about?",
    transcript: [
      "I went to the gym yesterday evening after a long day at work, mainly because I was looking forward to my usual yoga class.",
      "When I got there, the place was actually quieter than normal, which was nice for a change.",
      "But then I noticed a small notice on the studio door saying the yoga session had been cancelled because the instructor was sick.",
      "Nobody had messaged us about it beforehand, so I ended up just walking on the treadmill for a bit before heading home.",
      "I was a little annoyed, but these things happen sometimes.",
    ],
    options: ["The gym was too crowded", "Her yoga class was cancelled", "The membership fee increased"],
    answer: 1,
  },
  {
    title: "Anna is calling her brother Max. What does Anna do later in the afternoon?",
    transcript: [
      "Hi Max, I wanted to check our plans for this afternoon.",
      "I have a few things to finish at work, so I will need to stay late at the office.",
      "Could you pick up the kids today? We can hang out with our friends another time.",
    ],
    options: ["Hang out with friends", "Pick up her kids", "Stay late at the office"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "A woman is talking about her favorite film on the radio. What film did she recommend?",
    transcript: [
      "Today I want to recommend an action film that really impressed me.",
      "The lead actor, who is usually known for his romantic roles, delivered an outstanding performance.",
      "Of course, if you are in the mood for something lighter, there are plenty of comedies to enjoy as well.",
      "But if you are looking for excitement, this action film is definitely worth a watch!",
    ],
    options: ["An action film", "A comedy film", "A romantic film"],
    answer: 0,
  },
  {
    title: "What time is she going home?",
    transcript: [
      "What time will you be home tonight?",
      "I finish work at eight, and it takes me about an hour to get back.",
      "All right, I will see you at nine o'clock.",
    ],
    options: ["10 o'clock", "8 o'clock", "9 o'clock"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "Greg is talking about a working day in his life. How does he go to work?",
    transcript: [
      "I used to take the bus to work, but the traffic made the journey too long.",
      "Now I ride my bike. It takes about twenty minutes, and I enjoy getting some exercise before the day starts.",
    ],
    options: ["By bus", "On foot", "By bike"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "Listen to a nutrition expert. What time is the best for children to eat fruit?",
    transcript: [
      "Fruit is a healthy choice at any time, but children often benefit from having it in the morning.",
      "It makes a useful part of breakfast and gives them energy for the school day.",
    ],
    options: ["In the evening", "In the morning", "In the afternoon"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "Listen to a woman explaining her morning routine to her friend. Why does she get up early?",
    transcript: [
      "I used to rush around every morning, so now I get up a little earlier.",
      "The children are still asleep, and I can enjoy some quiet time before the busy day begins.",
    ],
    options: ["Have some quiet time", "Take care of children", "Go to work early"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "Why does he need to learn to drive a car?",
    transcript: [
      "I have been thinking about taking driving lessons.",
      "The bus does not go near my new workplace, and I will have to drive to work every day.",
    ],
    options: ["He lost his driving license", "He bought a new car", "He has to drive to work"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "A woman is talking to her coworker. When does the meeting start?",
    transcript: [
      "Hey, just wanted to give you a quick heads-up.",
      "I will not be able to join the meeting with the clients at 10:15 like we planned. I have got something that suddenly came up.",
      "I know it is last minute, but could you go ahead and handle the presentation on your own?",
      "You are familiar with everything, so I trust you have got this. Let me know how it goes afterward. Thanks, I really appreciate it!",
    ],
    options: ["10:00", "10:15", "10:45"],
    answer: 1,
  },
  {
    title: "A man is describing his school. What color is the teacher's building?",
    transcript: [
      "You know, I have been spending a lot of time at school lately. I really like our campus!",
      "One thing that stands out is the teacher's building. It is really nice and has a bright, white color.",
      "I love how it looks against the blue sky. It is kind of a central point of the school, and it feels welcoming.",
      "I think it adds a lot to the overall atmosphere here.",
    ],
    options: ["Blue", "White", "Green"],
    answer: 1,
  },
  {
    title: "Louis is calling his friend Standar. Where will Louis meet Standar?",
    transcript: [
      "Hi Standar! I just got to the train station. Should we meet at the cafe inside?",
      "No, wait, that might be crowded. How about the benches near the ticket counter?",
      "No, that could be noisy. Let's keep it simple and just meet outside the station.",
      "It will be much easier to find each other there!",
    ],
    options: ["At the cafe", "Near the ticket counter", "Outside the station"],
    answer: 2,
  },
  {
    title: "A woman is talking about shopping places. Where is she going to go shopping?",
    transcript: [
      "I love shopping, and there are so many places to choose from.",
      "If I need clothes, I usually go to the mall, but it can get very crowded on weekends.",
      "There is also a little boutique near my house with some unique items, but it is a bit expensive.",
      "This time, I am excited to check out the new shopping center that just opened. I have heard it has everything I need in one place.",
    ],
    options: ["At the downtown market", "At the mall", "At the shopping center"],
    answer: 2,
  },
  {
    title: "A tour guide is making an announcement. Why was the tour canceled?",
    transcript: [
      "Good morning, everyone. I am afraid we have to cancel today's walking tour.",
      "The weather forecast has changed, and heavy rain is expected throughout the afternoon.",
      "We are sorry for the inconvenience. We will contact you about a new date.",
    ],
    options: ["Bad weather", "Transportation problems", "Not enough people"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "A woman talks to her friend. What time do they arrange the meeting?",
    transcript: [
      "Would you like to meet this afternoon?",
      "Four o'clock is a little early for me. Could we meet at half past four instead?",
      "That works for me. I will see you at 4:30.",
    ],
    options: ["At 4:30", "At 4:00", "At 5:30"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "How much does the book cost?",
    transcript: [
      "It's 11 dollars. It's quite popular among students.",
      "Oh, I see. I thought it was 15 dollars.",
      "No, that's the price of the larger book over there.",
      "What about the small book next to it? Is it 9 dollars?",
      "Yes, that's right. But this one costs 11 dollars.",
      "Great! I'll take this book, please.",
    ],
    options: ["$11", "$15", "$9"],
    answer: 0,
  },
  {
    title: "Listen to Anna talking about her routine. Where does Anna go for a walk every morning?",
    transcript: [
      "I like to start the day with a walk in the park.",
      "It is quiet in the morning, and the fresh air helps me feel ready for work.",
      "I pass the college on my way there, but I do not walk around the campus.",
    ],
    options: ["At the park", "At college", "At the gym"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "A woman is discussing with her team. How many chairs does she need?",
    transcript: [
      "Hi everyone! As we get ready for the meeting, I need to confirm how many seats we need.",
      "I've counted 12 people on the list, so I was thinking of setting up 15 chairs.",
      "Oh, wait! I just remembered there might be a few guests joining us.",
      "Let's go ahead and set up 20 chairs to be safe. Does that work for everyone?",
    ],
    options: ["12 chairs", "20 chairs", "15 chairs"],
    answer: 1,
  },
  {
    title: "Listen to a girl calling the cafe. What did she forget, and where did she leave it?",
    transcript: [
      "Hi, I was at your cafe this afternoon, and I think I left my bag there.",
      "I remember having it when I sat at a small table in the corner.",
      "I checked the counter and near the door before I left, but I must have forgotten it in the corner after all.",
      "Could you please look there?",
    ],
    options: ["Near the door", "On the counter", "In the corner"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "Where did they meet?",
    transcript: [
      "I waited at the parking lot for a while, but I did not see you there.",
      "I was standing by the front entrance of the school. That is where we agreed to meet.",
    ],
    options: ["The parking lot", "The front entrance", "The school gate"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "A woman is going home after shopping. What did she buy?",
    transcript: [
      "I went shopping after work and found a dress that I really liked.",
      "I also looked at a blouse and a hat, but I decided to buy the dress.",
    ],
    options: ["A blouse", "A dress", "A hat"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "Listen to a teacher talking about meeting preparations. What is she preparing for the meeting now?",
    transcript: [
      "The chairs are already set up, and the food has been ordered.",
      "I am organizing the documents now so everyone will have a copy when the meeting begins.",
    ],
    options: ["Set up the chairs", "Organize the documents", "Order the food"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "When will she need a computer?",
    transcript: [
      "I have a report to finish, but I will not need the computer right away.",
      "I can work on it on Friday, so please keep it available for me then.",
    ],
    options: ["Tuesday", "Friday", "Saturday"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "What country will they study next semester?",
    transcript: [
      "We studied France this semester, and Italy was the subject last year.",
      "Next semester we are moving on to Germany, so please read the introduction before class.",
    ],
    options: ["France", "Italy", "Germany"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "A woman is talking about her house. What is she going to change in the house?",
    transcript: [
      "The car is working well, and I have just bought a new computer.",
      "The bedroom is fine too, but the kitchen window is old and lets in a cold draft.",
      "I am going to replace the window before winter.",
    ],
    options: ["The car", "The computer", "The window"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "Listen to an actor discussing his hobbies. What does the actor like to do in his free time?",
    transcript: [
      "People often expect me to play sports, but I prefer a quiet evening at home.",
      "I like watching movies, especially old comedies, whenever I have free time.",
    ],
    options: ["Playing sports", "Watching movies", "Cooking"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "Listen to a principal talking about new school facilities. What new facility will the school have?",
    transcript: [
      "The school already has a library, and students can use the sports hall after class.",
      "We are now building a performance space where students can put on plays and concerts.",
    ],
    options: ["A new library", "A performance space", "A sports center"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "Listen to a man talking about his business trip. What does he like in Dubai?",
    transcript: [
      "I've been living in Dubai for about two years now, and I really enjoy my work here.",
      "It's challenging, but that's what makes it exciting. The company I work for is great, and I get to meet people from all over the world.",
      "The food is also amazing, but the work itself is what keeps me happy.",
      "I can see myself staying here for a long time because I feel lucky to do what I love.",
    ],
    options: ["Enjoy his job there", "Enjoy the food", "Meet people"],
    answer: 0,
  },
  {
    title: "What should the teacher focus on this week?",
    transcript: [
      "The students have learned a lot of new grammar and vocabulary.",
      "This week, I want to build their confidence by giving everyone more chances to speak.",
    ],
    options: ["Building the students' confidence", "Improving the students' grammar", "Building their vocabulary"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "A man is talking about the city concert. How will the concert end?",
    transcript: [
      "The orchestra will perform the opening pieces, and the city's favorite group will play later.",
      "To finish the evening, we have arranged a fireworks performance over the river.",
    ],
    options: ["The city's favorite group", "A fireworks performance", "Singing from the orchestra"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "A woman tells her friend about her plans for the day. What is the woman going to do?",
    transcript: [
      "I usually start the morning with tea, but today I have already had some.",
      "I am meeting my sister at noon, so we are going to have lunch together.",
    ],
    options: ["Drink tea", "Have lunch", "Go shopping"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "Listen to the announcement. When does the train leave?",
    transcript: [
      "The 9:15 service has been delayed because of a signal problem.",
      "The next train will leave at 9:30. Passengers should wait on platform two.",
    ],
    options: ["At 9:15", "At 9:45", "At 9:30"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "What is he going to do to prepare for the event?",
    transcript: [
      "We have enough guests and the meeting time is confirmed.",
      "I am going to print more posters this afternoon so everyone knows about the event.",
    ],
    options: ["Change the time of the meeting", "Print more posters", "Invite more guests"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "Two people are talking about meeting for dinner. What time does Ahmed meet Rose?",
    transcript: [
      "Hi Rose. It's Ahmed. What time should we meet for dinner tonight?",
      "How about we meet at quarter past seven instead?",
      "Oh wait, I just remembered I have a meeting ending at half past seven.",
      "Let's make it quarter to eight instead so we have 15 minutes to travel. Does that work for you?",
    ],
    options: ["Quarter past seven, 7:15", "Half past seven, 7:30", "Quarter to eight, 7:45"],
    answer: 2,
  },
  {
    title: "Anna is calling her friend. Where will they meet?",
    transcript: [
      "Would you like to meet at the supermarket?",
      "I need to buy a few things, but the marketplace is too far away.",
      "Let's meet at the mall instead. There is a cafe by the main entrance.",
    ],
    options: ["At the marketplace", "At the supermarket", "At the mall"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "Stephanie is looking for a job taking care of children. How old is she?",
    transcript: [
      "I am applying for the childcare position and wanted to tell you a little about myself.",
      "I am 21 years old and have already helped look after children in my neighborhood.",
    ],
    options: ["21", "20", "22"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "A man is giving directions to a friend about how to get to the football club. The football club is near what?",
    transcript: [
      "Walk straight past the bus station and turn left at the next street.",
      "You will see a grocery store on the corner. The football club is just beside it.",
    ],
    options: ["A grocery store", "A bus station", "A school"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "A boy is talking about his cat. What does he feed the cat?",
    transcript: [
      "My cat likes chasing insects in the garden, but I do not feed those to him.",
      "For dinner, I usually give him fish. He likes it much more than mice.",
    ],
    options: ["Fish", "Mice", "Insects"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "Samia is going to meet her friends. What time are they going to meet?",
    transcript: [
      "Are we still meeting at eight thirty?",
      "I will be late if I leave work then. Can we meet at 9:30 instead?",
      "That is fine. I will see you at half past nine.",
    ],
    options: ["At 8:30", "At 9:30", "At 10:00"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "Jack is phoning his mom. What does Jack need to buy for his sister?",
    transcript: [
      "Hi, Mom! It's Jack. I hope you're doing well.",
      "I'm out shopping, and I need to buy some chocolates for my sister's birthday.",
      "She loves dark chocolate, so I want to get her some nice ones.",
      "By the way, do you need anything while I'm here? I can pick up some milk or fruit if you want.",
      "Let me know! I'll talk to you soon!",
    ],
    options: ["Chocolates", "Fruit", "Milk"],
    answer: 0,
  },
  {
    title: "Listen to a man talking about their train journey. What time did the train depart?",
    transcript: [
      "This morning was rough at the station.",
      "I thought the train would leave around 9:00, but I heard it would be delayed.",
      "It finally departed at 9:30, so we arrived later than expected.",
    ],
    options: ["9:00", "9:45", "9:30"],
    answer: 2,
  },
  {
    title: "The driver trainer is calling a man. When is the new appointment date?",
    transcript: [
      "Hello, I'm calling about your driving lesson appointment. We need to change the original date.",
      "Oh, really? Wasn't it supposed to be on Wednesday?",
      "Yes, but unfortunately the trainer is unavailable that day.",
      "No problem. Could we move it to Thursday instead?",
      "Friday sounds perfect. What time should I come?",
      "Your appointment will be at 10 a.m. See you then!",
    ],
    options: ["Wednesday", "Thursday", "Friday"],
    answer: 2,
  },
  {
    title: "A man is calling his friend to meet for coffee. Where is the coffee shop located?",
    transcript: [
      "Hey, are you free for coffee later? I found a great new place in town.",
      "You know the big gift shop on Main Street? The coffee shop is right across from it.",
      "Just look for the gift shop, then cross the street. You'll see the coffee shop right there, opposite the gift shop.",
      "They have amazing pastries too. Let's meet there at 3 p.m., okay?",
    ],
    options: ["Opposite the gift shop", "Next to the gift shop", "Behind the gift shop"],
    answer: 0,
  },
  {
    title: "Listen to a tour guide introducing the tour. Where will tea be served?",
    transcript: [
      "Welcome to our scenic tour! I'm excited to show you this beautiful area.",
      "We'll start with a drive along the coast to enjoy the amazing ocean views.",
      "Then we'll go up to the mountain looking for some breathtaking views.",
      "After that, we'll head down to the harbor and take a relaxing riverboat cruise.",
      "While on the boat, you can enjoy afternoon tea and see the charming riverside scenery.",
    ],
    options: ["On the mountain boat", "On the beach boat", "On the river boat"],
    answer: 2,
  },
  {
    title: "Listen to a saleswoman talking about a property. Which room is the largest?",
    transcript: [
      "The bedroom is a good size, and the bathroom has recently been renovated.",
      "The kitchen is the largest room in the house, with enough space for a dining table.",
    ],
    options: ["Bedroom", "Kitchen", "Bathroom"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "Listen to a woman talking about what she has just bought. What is the dress she wears like?",
    transcript: [
      "I found a dress at the shop yesterday and tried on a few different styles.",
      "The long red one was lovely, and the long white one was simple.",
      "I chose the black and white dress because it goes with my shoes.",
    ],
    options: ["Black and white", "Long and red", "Long and white"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "The doctor's office is calling about a change in the appointment. When is the new appointment?",
    transcript: [
      "Hello, this is the doctor's office calling about your appointment.",
      "The original time is no longer available, so we have moved your appointment to Friday the 14th.",
      "Please call us if that date does not work for you.",
    ],
    options: ["On Friday the 14th", "On Thursday the 30th", "On Monday the 13th"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "A woman is talking about her weekends. What did she do last week?",
    transcript: [
      "I usually stay at home on weekends or go to a party with friends.",
      "Last week, the weather was perfect, so I went hiking in the hills.",
      "It was tiring, but I really enjoyed the fresh air.",
    ],
    options: ["Went hiking", "Stayed at home", "Attended a party"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "Nate is on the phone with his friend. How long does Nate stay in India?",
    transcript: [
      "Hey, it's Nate. I just finished a week in Thailand and now I've arrived in India.",
      "I'll be here for two weeks in total. I plan to spend three days visiting the Taj Mahal because everyone says it's a must-see.",
      "By the way, I know it's not too far from where you are. Maybe we could meet up while I'm here?",
      "Let me know if you're ready."
    ],
    options: ["3 days", "1 week", "2 weeks"],
    answer: 2,
  },
  {
    title: "Listen to a tour guide. Where is the office located?",
    transcript: [
      "Hello everyone, welcome to our tour. My name is Sam, and I'm your tour guide today.",
      "I'm excited to show you around this beautiful city. We will visit many interesting places, including parks, museums, and local markets.",
      "As we walk, I'll share fun facts and stories about each location. If you have any questions, feel free to ask.",
      "Now before we start, I want to let you know that our office is opposite the hotel where you are staying. If you need any help or information during your stay, you can always come to us.",
      "Let's begin our adventure and enjoy."
    ],
    options: ["Opposite the hotel", "Next to the park", "Above a restaurant"],
    answer: 0,
  },
  {
    title: "Listen to the tour guide. Where will the group meet to catch the bus?",
    transcript: [
      "Good morning, everyone. Let me walk you through today's schedule.",
      "First, we'll start the day at 9 a.m. with a visit to the City Museum, where you'll have about two hours to explore the exhibits. After that, at 12:30 p.m., we'll head to the Central Park for a picnic lunch and a relaxing stroll.",
      "Around 3 p.m., we'll make our way to the Old Town Market, where you can shop for souvenirs and enjoy some local treats. We'll wrap up our activities by 6 p.m., giving you a little free time back at the hotel.",
      "Finally, at 8 p.m., we'll meet at the hotel's main entrance to catch the bus to the airport. Make sure to be on time, and we'll head to the airport."
    ],
    options: ["Behind the hotel's main entrance", "By the hotel's side entrance", "By the hotel's main entrance"],
    answer: 2,
  },
  {
    title: "A man is talking about his family trip. What does the man's wife enjoy?",
    transcript: [
      "My wife enjoys taking photographs whenever we go on a family trip.",
      "She likes capturing the scenery, although she also enjoys shopping and drawing at home.",
    ],
    options: ["Photography", "Shopping", "Drawing"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "When is the best time for her to get up?",
    transcript: [
      "I used to get up at six, but that was earlier than I needed.",
      "Seven o'clock gives me enough time to get ready without feeling tired all day.",
    ],
    options: ["At 6 o'clock", "At 8 o'clock", "At 7 o'clock"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "Listen to a writer talking about her job. What was her first job?",
    transcript: [
      "When I was younger, I didn't always dream of being a writer. My first job was actually as a teacher.",
      "I taught English to small children, and I loved helping them learn to read and write. It wasn't easy, though.",
      "I spent a lot of time grading papers and preparing lessons. But that job taught me how to use words well, and now I write stories for everyone to enjoy."
    ],
    options: ["Teacher", "Engineer", "Doctor"],
    answer: 0,
  },
  {
    title: "Max is calling his friend. How much can Max pay for the computer?",
    transcript: [
      "Hi, it's me, Max. I'm calling about the computer you're selling.",
      "My computer is old and slow, and I can't play games on it anymore, so I'd like to replace it. I can pay 250 pounds.",
      "I'm busy this afternoon, but we can discuss it tomorrow morning. Is that okay?"
    ],
    options: ["250 pounds", "150 pounds", "350 pounds"],
    answer: 0,
  },
  {
    title: "Pierre and Emma are talking about the picnic on the weekend. What will they bring to the picnic?",
    transcript: [
      "Emma, are you ready for the picnic this weekend? Definitely.",
      "I'm really looking forward to it. Do you know what everyone's bringing?",
      "Yeah, I spoke with a few people. Sarah's bringing cups and bowls, and Tom said he'll take care of drinks.",
      "He's got some lemonade and iced tea ready. Sounds great.",
      "I think Clara mentioned she's making a fruit salad, right? Yep, and Leo's bringing chips and dips.",
      "I guess we're pretty covered on snacks. Awesome.",
      "So what should we bring? Maybe some food in case we might get hungry?",
      "That's a good idea. How about we prepare some chicken and french fries?",
      "Perfect! This picnic is going to be amazing!"
    ],
    options: ["Fruit", "Food", "Water"],
    answer: 1,
  },
  {
    title: "Lily is talking about her daily routine. What does she do in the evening?",
    transcript: [
      "Hi, I'm Lily, and I want to tell you about my daily routine. I wake up early around 6.30 a.m. and have breakfast before going to work.",
      "I work in a small office, and my job keeps me busy until about 5 p.m. After dinner, I usually go for a walk to relax, but today I'm going to try something different.",
      "I'll do some yoga at home. It sounds fun and peaceful.",
      "After that, I'll probably watch a movie before going to bed."
    ],
    options: ["Goes for a walk", "Does yoga at home", "Watches a movie"],
    answer: 0,
  },
  {
    title: "Listen to Anna talk about her old manager, George. What did Anna say about George?",
    transcript: [
      "I want to talk about my old manager, George. He was very smart and taught me a lot about work.",
      "When I joined the team, he showed me how to do my job well. He wasn't very strict, but he had high expectations.",
      "I learned to be better because of him. I'm thankful for his guidance and support."
    ],
    options: ["He taught her a lot", "He didn't like her", "He was very strict"],
    answer: 0,
  },
  {
    title: "A man is talking about his jobs. What does the man want to do next?",
    transcript: [
      "I used to be a chef and loved cooking different dishes. It was exciting to create new recipes, but it was hard work.",
      "After that, I became a history teacher and enjoyed sharing stories about the past with my students. Teaching was rewarding, but I wanted to try something new.",
      "Now I want to become a writer. I have many ideas for stories, and I can't wait..."
    ],
    options: ["Start teaching history again", "Become a writer", "Become a chef again"],
    answer: 1,
  },
  {
    title: "Lucy is calling her brother. What does her brother have to drink?",
    transcript: [
      "Hi, Jake. It's Lucy.",
      "I just wanted to check in on you. How are you doing?",
      "I know you've been busy with work and school lately. I'm worried that you're not drinking enough water.",
      "Staying hydrated is really important, especially when you're working hard. Remember to keep a bottle with you.",
      "Anyway, I hope you're taking care of yourself."
    ],
    options: ["Water", "Milk", "Medicine"],
    answer: 0,
  },
  {
    title: "A man and a woman are talking about their old school days. What was the man's favorite thing about school?",
    transcript: [
      "What do you remember most about our school days? Honestly, I don't remember much.",
      "I remember that I was terrible at math. It was my worst subject.",
      "Also, I remember that you were really good at history. That's right.",
      "I loved history. Actually, those classes were the ones I remember the most.",
      "All those stories and events were so fascinating."
    ],
    options: ["Math classes", "History classes", "Geography classes"],
    answer: 1,
  },
  {
    title: "Linda is talking about her mother. What do mother and daughter have in common?",
    transcript: [
      "My mom is an important person in my life. We both enjoy reading and gardening.",
      "We like talking about our favorite books and planting flowers together. We have different tastes in fashion and music, but our shared hobbies bring us closer."
    ],
    options: ["Similar appearance", "Similar interests", "Similar personalities"],
    answer: 1,
  },
  {
    title: "A man and a woman are going shopping. What does he buy in the store?",
    transcript: [
      "Hey, Sarah, let's check out this store. I need something for work.",
      "How about this T-shirt? It looks nice.",
      "I don't really need a T-shirt right now; I'm looking for something more formal. What about this hat?",
      "Maybe, but I really need a suit for the office. This one seems perfect.",
      "That's a good choice. It's smart and looks comfortable.",
      "Great, I'll buy the suit."
    ],
    options: ["A suit for the office", "A T-shirt", "A hat"],
    answer: 0,
  },
  {
    title: "What do these birds do in winter?",
    transcript: [
      "Some birds move to warmer places when winter arrives.",
      "Others stay in groups for protection against the cold and predators.",
    ],
    options: ["Migrate", "Sleep", "Stay in groups for protection"],
    answer: 2,
    reconstructed: true,
  },
  {
    title: "Linda is talking about what she likes to eat. What does she have for lunch?",
    transcript: [
      "When it comes to lunch, I have a simple pleasure. I really enjoy a warm cup of tea.",
      "It's my favorite drink to have while I eat. I find it calming, and it makes my meal feel special.",
      "Sometimes people ask me why I don't choose coffee or juice, but for me, tea is just perfect. It warms my heart and gives me a moment to eat."
    ],
    options: ["Juice", "Tea", "Coffee"],
    answer: 1,
  },
  {
    title: "A tour guide is introducing a tourist destination. How many people live in the town?",
    transcript: [
      "Welcome to our small town. The town square has local shops, cozy cafes, and a fountain where people gather.",
      "It's the heart of the community and often hosts farmers' markets and live music. There are currently 10,000 people living in the town."
    ],
    options: ["10,000", "8,000", "12,000"],
    answer: 0,
  },
  {
    title: "A student is talking about housing. Where does he live now?",
    transcript: [
      "Hi, I'm Jack, and I want to talk about where I live. Right now, I'm staying in a town hall near my university.",
      "It's a nice place, and I've met a lot of other students here. Before this, I used to live with my parents in a small village.",
      "It was quiet, but I needed to be closer to school. Soon, I'll move to an apartment nearby with a few friends.",
      "I think it'll be fun to share a place with them. I'm excited about this."
    ],
    options: ["In a small village", "In a town hall", "In an apartment"],
    answer: 1,
  },
  {
    title: "Listen to the instructions of a university. Where is the main office?",
    transcript: [
      "Welcome to our university. When you enter the campus, you'll see the library on your left and the cafeteria on your right.",
      "If you need help with anything, the main office is on the first floor of the center campus building. There you can ask about classes, schedules, or anything else.",
      "Behind the main building, you'll find the gym and sports area. For quiet study, there are some nice spots in the garden near the science building.",
      "Make sure to explore and enjoy your time here."
    ],
    options: ["On the first floor", "On the second floor", "In the garden"],
    answer: 0,
  },
  {
    title: "Lalia is talking to her friend about her upcoming trip. How much does she think the bus fare will be?",
    transcript: [
      "I'm excited about my trip to the city tomorrow. Do you know the bus fare?",
      "I think it's 2.5 pounds. If I take the subway, it'll be 4.5 pounds.",
      "Public transport is affordable, and I'll need some change."
    ],
    options: ["2.5 pounds", "4.5 pounds", "5 pounds"],
    answer: 0,
  },
  {
    title: "When do the students play football?",
    transcript: [
      "The students play football on Wednesday afternoon.",
    ],
    options: ["Wednesday afternoon", "Monday morning", "Wednesday morning"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "A man is calling his wife. Where will they meet?",
    transcript: [
      "Hi, honey. It's me.",
      "Just a reminder that the train leaves at 5, so you should arrive around 6 o'clock. I'll be there to pick you up at the train station.",
      "Let's meet outside the shop opposite the station. I can't wait to have dinner together."
    ],
    options: ["At home", "In the garden", "Outside the shop"],
    answer: 2,
  },
  {
    title: "A man is talking about his eating habits. What time does he usually eat?",
    transcript: [
      "I usually have dinner every evening. It's become a habit for me to enjoy a meal at that time after a long day.",
      "I find it's the perfect time to unwind and relax. Plus I love to spend time with my family during dinner.",
      "It's our chance to catch up and enjoy some good food together. We usually have dinner at 7 o'clock and it is definitely my favorite meal of the day."
    ],
    options: ["At 6 o'clock", "At 7 o'clock", "At 8 o'clock"],
    answer: 1,
  },
  {
    title: "A man is talking about his daily routine. What does he do after work?",
    transcript: [
      "Every day, I wake up at 7 a.m. and have a quick breakfast before going to work. I usually take the bus and it takes about 30 minutes to get to the office.",
      "At work, I spend most of my time on the computer answering emails and working on projects. I have lunch at noon and get back to work until 5 p.m.",
      "After work, I like to relax by playing football with my friends. It's a great way to stay active and have fun."
    ],
    options: ["Goes to the gym", "Plays football", "Reads books"],
    answer: 1,
  },
  {
    title: "Two friends are discussing a movie they recently watched. What element of the film do they agree on?",
    transcript: [
      "We had different opinions about the song and the theme of the movie.",
      "But we both agreed that the ending was excellent and made the story memorable.",
    ],
    options: ["The ending", "The song", "The theme"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "A man is talking to a friend about his family. What is his main problem?",
    transcript: [
      "I've been having a tough time lately. I want to move abroad for a new job, but my family doesn't support the idea.",
      "They're worried about me leaving and don't understand why I want to go so far away. I've tried to explain the benefits, but they don't seem to understand.",
      "It's frustrating because I want their support."
    ],
    options: ["Persuading his family", "Finding a job abroad", "Saving money for the move"],
    answer: 0,
  },
  {
    title: "A man is reading the news about a housing development plan. How many new houses are going to be built?",
    transcript: [
      "I just heard the news that the local authority is planning to build 2,000 new houses. I remember they were initially saying it would only be 1,500.",
      "But then I heard someone mention 2,500. That's quite a jump.",
      "I wonder how this will affect the neighborhood. Will it bring in more families or just more traffic?",
      "It'll be interesting to see."
    ],
    options: ["1,500", "2,000", "2,500"],
    answer: 1,
  },
  {
    title: "Listen to Sarah leaving a message for her friend. When does she want to meet?",
    transcript: [
      "Hi, John, this is Sarah calling.",
      "I'm leaving you a message about our meeting today. I know we said we'd meet at two, but something's come up.",
      "Can we change the time to three o'clock instead? I'll be at the usual coffee shop at three.",
      "Please call me back if this doesn't work for you."
    ],
    options: ["Two o'clock", "Three o'clock", "One o'clock"],
    answer: 1,
  },
  {
    title: "What time will the friends meet?",
    transcript: [
      "Hey, Alex, it's me. Just a reminder about our plan tonight.",
      "We're meeting at 6:30 p.m., so try not to be late. I know you usually finish work around 6, which should give you enough time.",
      "Jake might join us later, around 7:30."
    ],
    options: ["7:30", "6:30", "6:00"],
    answer: 1,
  },
  {
    title: "When is the best time for her to get up?",
    transcript: [
      "Getting up at 7:40 would leave me with too little time in the morning.",
      "I think 7:15 is the best time. I can get ready calmly and still arrive on time.",
    ],
    options: ["7:40", "7:15", "At 7 o'clock"],
    answer: 1,
    reconstructed: true,
  },
  {
    title: "A man is talking to a shopping assistant. What color top is he going to buy?",
    transcript: [
      "I'd like to buy a top. I like the green one.",
      "Do you have it in blue? The blue one is only available in small, but the red and black ones are available in large.",
      "Red isn't my cup of tea, so I'll choose the other option."
    ],
    options: ["Black", "Blue", "Green"],
    answer: 0,
  },
  {
    title: "Julie is asking her professor about the assignment. When is the work due?",
    transcript: [
      "Come in. Hi, Professor.",
      "It is me, Julie. I wanted to ask about the assignment.",
      "Is it possible to get an extension until Friday? What's the matter, Julie?",
      "Do you have any difficulties? I have a lot of work lately, so I can't complete it by Thursday.",
      "Actually, all assignments need to be submitted by Saturday morning, so you have two more days. Oh, that's great.",
      "Thank you so much."
    ],
    options: ["On Thursday", "On Friday", "On Saturday morning"],
    answer: 2,
  },
  {
    title: "A professor is talking to his student. What does the professor ask his student to do?",
    transcript: [
      "Good morning, Alex. I've finished reading your thesis, and it's very well done.",
      "Your research is thorough, and your arguments are clear. You should consider presenting it at the upcoming student conference.",
      "You would give a 10- to 15-minute presentation and answer questions from the audience. It's a good way to get feedback and experience speaking publicly."
    ],
    options: ["Speak at a conference", "Write another thesis", "Attend a lecture"],
    answer: 0,
  },
  {
    title: "Listen to the woman talking about her holiday plans. Where is she going next?",
    transcript: [
      "I can't wait for my next holiday. I'm heading south, where the mountains are.",
      "I've never been there before, but I've heard it's beautiful. I'm looking forward to hiking and seeing the snow-covered peaks.",
      "It will be a nice change from the city."
    ],
    options: ["The south", "The east", "The north"],
    answer: 0,
  },
  {
    title: "Listen to a radio man talking about a new popular song. Which is the most attractive part of the song?",
    transcript: [
      "Good evening listeners. Today, I want to talk about a new song that's quickly becoming popular.",
      "You're My Everything. The tune is really catchy, and it makes you want to dance right away.",
      "The instruments used are simple, but create a great rhythm. However, the most attractive part of all is the words.",
      "The lyrics tell a beautiful story that everyone can relate to. It's no wonder so many people are loving this song.",
      "If you haven't heard it yet, make sure to give it a listen."
    ],
    options: ["The instruments", "The words", "The melody"],
    answer: 1,
  },
  {
    title: "A girl is talking about a film. What did she like best about the film?",
    transcript: [
      "The Fall is one of my favorite films. I saw it last weekend, and it kept me on the edge of my seat.",
      "I usually don't like action movies because the racing scenes and fights feel repetitive. The mountain scenes were unusual and the most captivating part for me.",
      "The ending was a bit sad."
    ],
    options: ["Racing scenes", "The mountain scenes", "Fight scenes"],
    answer: 1,
  },
  {
    title: "A woman is talking about her job. What encouraged her to become a scientist?",
    transcript: [
      "I've always loved science, but there was a moment that really encouraged me to become a scientist. I remember when I was a child, I found a large stone during a school trip.",
      "It sparked my curiosity about geology. My mother also inspired me to explore my interests in science.",
      "Of course, I use the computer a lot now for my research, but that stone was the beginning."
    ],
    options: ["A large stone", "Her mother", "Using a computer"],
    answer: 0,
  },
  {
    title: "What are they happy about on the business trip?",
    transcript: [
      "The hotel is comfortable, and we have some free time after our meetings.",
      "What I enjoy most is learning about new areas and seeing how people live in different places.",
    ],
    options: ["Learning new areas", "Staying in a luxury hotel", "Having a lot of free time"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "Where is the French class?",
    transcript: [
      "Welcome to the Language Center. Today, all new students should check their classroom information carefully before lessons begin.",
      "The French class will not be on the ground floor like last week because those rooms are being repaired instead. Students need to go to the second floor.",
      "There will be signs in the building to help you find them."
    ],
    options: ["On the second floor", "On the third floor", "On the ground floor"],
    answer: 0,
  },
  {
    title: "Where will the practical chemistry class take place?",
    transcript: [
      "Hello, everyone. This is your chemistry teacher with an update about our practical class this Friday.",
      "We will still meet at 2 o'clock. The class was originally scheduled for Room 201, and some of you may have heard Room 302 mentioned as an alternative.",
      "Due to a technical issue, the class will now take place in Room 301."
    ],
    options: ["Room 301", "Room 302", "Room 201"],
    answer: 0,
  },
  {
    title: "Jorge is calling his friend about their plan for the weekend. What time does the football match start?",
    transcript: [
      "I'm calling about our plans for the weekend. I'll be busy in the morning, so how about we meet at 11:30 for lunch?",
      "The football match starts at 1 p.m. It takes about 30 minutes to drive there, so we'll have time to eat.",
      "After the match, we can go back to my place and play video games."
    ],
    options: ["1 p.m.", "6 p.m.", "11 p.m."],
    answer: 0,
  },
  {
    title: "A man calls the teleshop. What is the teleshop number?",
    transcript: [
      "I need to call the teleshop because my phone isn't working. Can you remind me of the number?",
      "I think it might be 10-20-30 or 30-10-20. No, I remember now: it's 20-10-30."
    ],
    options: ["10-20-30", "20-10-30", "30-10-20"],
    answer: 1,
  },
  {
    title: "Listen to the director talking about sales of his company. How many copies of Freeze Frame magazine were sold?",
    transcript: [
      "I am excited to share the latest sales figures for our company. This month we had a fantastic response to our magazine, Freeze Frame.",
      "I am proud to announce that we sold over 300,000 copies. This is a big increase from last month.",
      "Many people are buying our magazine and we are very happy. Thank you for your support.",
      "We hope to sell even more in the future."
    ],
    options: ["Over 30,000 copies", "Over 300,000 copies", "Over 3,000,000 copies"],
    answer: 1,
  },
  {
    title: "A man and a woman are discussing their plans for the evening. What do they decide to do?",
    transcript: [
      "I'm thinking about what to do this evening. I could go to the movies, but I'm not sure if that's the best idea.",
      "I might prefer to stay at home and relax. However, I want to discuss this with my friend first.",
      "It might be better to plan when we can decide together. I believe keeping our options open is a good idea.",
      "So for now, I'll wait and see what we want to do."
    ],
    options: ["Make a plan later", "Stay at home", "Go to the movie"],
    answer: 0,
  },
  {
    title: "A man is talking to a waiter. What drink does the man choose?",
    transcript: [
      "So, what do you recommend? I usually go for hot tea, especially when it's chilly, but it's so warm today.",
      "I'm in the mood for something refreshing. Maybe milk tea?",
      "Actually, I think I'll just get iced tea instead. That sounds perfect for this kind of weather."
    ],
    options: ["Iced tea", "Milk tea", "Hot tea"],
    answer: 0,
  },
  {
    title: "Listen to the conversation. Who is she taking a photo of?",
    transcript: [
      "I'm just about to take a photo of the girls' team now. They're all lined up and ready, smiling for the camera.",
      "I've already taken pictures of the boys earlier, so it's their turn. The coaches will have their photo taken after this.",
      "The girls are excited because this picture will be in the school magazine. All right, everyone."
    ],
    options: ["The boys' and the girls' team", "Sue and Lily", "The girls' team"],
    answer: 2,
  },
  {
    title: "Where does the speaker like to go in India?",
    transcript: [
      "I've traveled to India several times. People often assume I spend most of my time visiting famous landmarks or eating out.",
      "I enjoy Indian food and well-known places, but what I really like is going to the park. I enjoy walking in public parks, watching people relax, and experiencing everyday life.",
      "That's where I spend most of my time."
    ],
    options: ["Go to the park", "Go to famous places", "Go out to eat"],
    answer: 0,
  },
  {
    title: "Two friends are talking about their trip. What will the weather be like?",
    transcript: [
      "Hey, Sarah, are you excited about our trip next week? Hi, Mike.",
      "Yes, I can't wait. I've been looking forward to it for a long time.",
      "Me too. But I heard the weather is going to be cold and wet.",
      "We should prepare for that. Oh no, I hope it doesn't rain too much.",
      "We need to pack our rain jackets and warm clothes. Definitely.",
      "I'll also bring an umbrella just in case. Good idea.",
      "Let's plan some fun indoor activities if the weather is bad. Yes, we can visit museums or try some local food.",
      "It will still be a great place to go."
    ],
    options: ["Warm and dry", "Cold and wet", "Hot and sunny"],
    answer: 1,
  },
  {
    title: "Listen to Mary talking to Jane while waiting for James. What did they decide to do?",
    transcript: [
      "Hi, James. It looks like James is running late again.",
      "Should we wait for him? I don't want to waste too much time.",
      "I think we should have the meeting without him. We have a lot to discuss and can update him later.",
      "It's better to move forward than keep waiting."
    ],
    options: ["Have the meeting without him", "Continue waiting for him", "Cancel the meeting"],
    answer: 0,
  },
  {
    title: "Which platform should passengers wait for the train?",
    transcript: [
      "Attention, all passengers! The 10:30 train to Greenfield is now arriving at Platform 2. Please make sure you have your ticket ready before boarding.",
      "This train will stop at River Station and Oakwood before reaching its final destination. Be careful when stepping onto the train, and mind the gap.",
      "For your safety, please keep your belongings close and follow all instructions from the staff. Thank you for traveling with us today!"
    ],
    options: ["Platform 1", "Platform 2", "Platform 3"],
    answer: 1,
  },
  {
    title: "Listen to a voice message. How does Evan feel?",
    transcript: [
      "Hi, Evan! This is Mom. I just wanted to leave you a message to check on you. I heard you're not feeling well, and I'm really worried about you.",
      "Make sure you're resting and drinking plenty of fluids. Do you need anything? I can bring you some soup or your favorite snacks.",
      "Please take care of yourself. I love you and hope you feel better soon. Call me back when you can!"
    ],
    options: ["Tired", "Sick"],
    answer: 1,
  },
  {
    title: "Douglas calls Kay. Why does he call her?",
    transcript: [
      "Hi, Kay! It's Douglas. I hope you are doing well. I wanted to call you today to say thank you for all your help with the project.",
      "Your advice was really valuable, and it made a big difference. I also wanted to ask for a favor. If you have some time, I would love to meet and discuss a few ideas I have.",
      "Let me know when you are free!"
    ],
    options: ["To say thank you", "To ask for a favor"],
    answer: 0,
  },
  {
    title: "Tom is calling his mom. Who is visiting him this weekend?",
    transcript: [
      "Man: Hey, Mom! Are you coming over this weekend? I'd really love to see you!",
      "What? You're busy? That's too bad. But at least my sister is visiting with her kids. I'm excited about that!",
      "Is Uncle coming with her too? Oh, he's not? That's a shame. Hopefully, you can all get together next time!"
    ],
    options: ["His mother and sister", "His mother and uncle", "His sister and her children"],
    answer: 2,
  },
  {
    title: "Listen to the chief announcer. When will lunch be ready?",
    transcript: [
      "Good afternoon, everyone. I have an important announcement regarding lunch today. Lunch will be ready at 2:00 p.m., not at 12:30 p.m. as some may have expected.",
      "Please be patient as we prepare everything for you. If you have any questions, feel free to ask. Thank you for your understanding, and enjoy your day!"
    ],
    options: ["2:00 p.m.", "12:30 p.m.", "1:15 p.m."],
    answer: 0,
  },
  {
    title: "The woman is walking into a local store. How much are the cleaning products?",
    transcript: [
      "As I walk into the store, I notice that the cleaning products are on sale. They're usually a bit more expensive, but today they're only one pound fifty.",
      "I was expecting to pay three pounds fifty, so it's a nice surprise. I grab a few items since I know I'll need them later.",
      "It's a small store, but the deals are always good here. Time to check out!"
    ],
    options: ["1.50 pounds", "3.50 pounds", "2.50 pounds"],
    answer: 0,
  },
  {
    title: "A woman is talking about her holiday plans. Where is she going?",
    transcript: [
      "I'm so excited about my upcoming holiday! I've been thinking about where to go for a long time. Some of my friends suggested going to a nice beach.",
      "Others talked about exploring interesting caves. But I've made up my mind: I'm going to the mountains!",
      "The mountains are so beautiful with their green forests. I can't wait to breathe the fresh air up there. They are perfect for relaxing and enjoying nature."
    ],
    options: ["The cave", "The beach", "The mountains"],
    answer: 2,
  },
  {
    title: "A man is talking about his trip. What did he enjoy last year?",
    transcript: [
      "Last year, I had an amazing trip! One of the best things I enjoyed was going cycling in the countryside.",
      "The views were stunning, and it felt great to be outdoors. I also went for a walk a few times, but cycling really allowed me to explore more areas.",
      "We even had a picnic one day, which was lovely too!"
    ],
    options: ["Go cycling", "Go for a walk", "Have a picnic"],
    answer: 0,
  },
  {
    title: "Listen to David talking about the conference. How long did he speak?",
    transcript: [
      "Hello, everyone. Today, I want to tell you about the conference that took place last week. It was very interesting, and many people attended.",
      "I spoke about new ideas in business. My presentation wasn't very long, but I had a lot to say. The other speakers talked about technology and education.",
      "After the talks, there were some questions from the audience. My speech lasted about 15 minutes, shorter than expected. However, the audience was very attentive, and I was happy to see that."
    ],
    options: ["45 minutes", "15 minutes"],
    answer: 1,
  },
  {
    title: "A woman is talking about her vacation. What is her relationship with Lisa?",
    transcript: [
      "I just got back from an amazing vacation with Lisa! We've been friends for years, and this trip really brought us closer.",
      "I can't imagine going with anyone else. Some people think we look like mother and daughter because we care for each other so much, but it's really just best friends hanging out!"
    ],
    options: ["Best friends", "Mother and daughter", "Teacher and students"],
    answer: 0,
  },
  {
    title: "A woman shares her job with a friend. Why does she want to become a writer?",
    transcript: [
      "I have been thinking a lot about my job, and I really want to become a writer. It's not just about earning a lot of money or becoming famous for me.",
      "My main reason is to help people improve themselves. I believe stories can inspire and support others during hard times.",
      "I hope my writing can make a difference in their lives, and that's why I'm choosing this."
    ],
    options: ["To earn much money", "To help people", "To become famous"],
    answer: 1,
  },
  {
    title: "Why has the air travel been cancelled?",
    transcript: [
      "Good afternoon, everyone. I'd like to start by saying that we're doing everything we can to assist you with your travel plans today.",
      "Unfortunately, due to poor weather conditions, our flight has been cancelled. I know this isn't the news you were hoping for, but your safety comes first.",
      "That said, we do have alternatives available. The train services are still running, and buses are also operating, so you have options to continue your journey.",
      "If you'd like to explore these alternatives, please come see us, and we'll help with the arrangements. Thank you for your patience and understanding."
    ],
    options: ["Poor weather conditions", "A technical problem", "A delay at the transit stop"],
    answer: 0,
  },
  {
    title: "A woman is talking to a police officer. What did she lose?",
    transcript: [
      "Woman: Excuse me, officer. I need help, please.",
      "Police Officer: Of course. What happened?",
      "Woman: I was walking in the park, and I think I lost my phone. I thought it was in my bag, but now I can't find it.",
      "Police Officer: I see. Don't worry, we'll help you. Can you remember where you last saw it?",
      "Woman: I had it with me when I sat on the bench, but after that, I'm not sure.",
      "Police Officer: Okay, we'll check the area. Please stay here for a moment, and we'll try to find it for you.",
      "Woman: Thank you so much, officer!"
    ],
    options: ["Her phone", "Her wallet", "Her bag"],
    answer: 0,
  },
  {
    title: "Listen to an auctioneer talking about a cabinet. Which part is original?",
    transcript: [
      "Ladies and gentlemen, welcome to today's auction. I have a beautiful cabinet here that I want to show you.",
      "This cabinet is made of high-quality wood, and it has a lovely design that will fit in any room. What makes it special is that the drawer is kept original, which adds to its charm and value.",
      "You can store your favorite items or use it as a display for your beautiful decorations. Don't miss this chance to own a unique piece of furniture. Let's start the bidding."
    ],
    options: ["The drawer", "The handles", "The legs"],
    answer: 0,
  },
  {
    title: "Vincent is calling James. Why does Vincent call him?",
    transcript: [
      "Hi, James, it's Vincent. I just wanted to check in and see how you're doing. It's been a while since we last caught up!",
      "How about we grab a drink later? I know a great new place that has very nice tea. You should definitely try it next time you visit me. Text me back!"
    ],
    options: ["To say hello", "To suggest a drink", "To arrange a meeting"],
    answer: 1,
  },
  {
    title: "A person calls a friend about his new car. How much did the small car cost?",
    transcript: [
      "Hey, I just wanted to tell you about my new car! It's a small one, perfect for my needs. I got it for a great price, only 3,250 pounds! Can you believe it?",
      "I was looking at bigger models too, but they were way more expensive, around 3,550 pounds or even 4,250 pounds. I'm really happy with my choice!"
    ],
    options: ["3,550 pounds", "3,250 pounds", "4,250 pounds"],
    answer: 1,
  },
  {
    title: "A receptionist is checking a clinic's client list. How many clients are American?",
    transcript: [
      "All right, let me go over the list of clients for today. We've got Carl, Harry, and Matthew, all from the UK.",
      "Leslie, who's from the US, is also scheduled for an appointment. Then we have two more clients coming in from France.",
      "So that gives us one American, a few from the UK, and the rest from France. It looks like everything's in order!"
    ],
    options: ["Two", "Three", "One"],
    answer: 2,
  },
  {
    title: "Soobin is talking about his favorite room. What is it?",
    transcript: [
      "You know, when I think about my favorite room in the house, it's kind of hard to choose. I mean, I really enjoy the kitchen since I love cooking, and the living room is great for hanging out with friends.",
      "But honestly, I have to say the bathroom is my favorite! It might sound strange, but it's the one place where I can truly relax."
    ],
    options: ["Kitchen", "Living room", "Bathroom"],
    answer: 2,
  },
  {
    title: "A woman is talking about her family's holidays. What did they do last year?",
    transcript: [
      "This year, my family and I are going to the beach for our holiday. I'm really excited because I love swimming and relaxing by the sea.",
      "Last year, we went camping on the mountain, which was fun, but this time we wanted to do something different.",
      "We're staying in a small house near the beach, and I can't wait to watch the sunset every evening. My kids are excited too; they want to build sandcastles and play in the water. I think it's going to be a great holiday!"
    ],
    options: ["Camping", "Going to the beach", "Staying in a hotel"],
    answer: 0,
  },
  {
    title: "A mom is talking to her son. What does he like to study?",
    transcript: [
      "Hey, sweetheart, I'm so proud of you! Your art project looks amazing; you're really talented. I love how you used all those bright colors.",
      "You always do such a great job with your drawings. But remember, you also need to spend some time on your other subjects too, like math and science.",
      "I know you can do well in those if you try hard, just like you do with art. Let's work on it together, okay?"
    ],
    options: ["History", "Art", "Science"],
    answer: 1,
  },
  {
    title: "Two friends are talking about their favorite activities. What is the woman's favorite entertainment?",
    transcript: [
      "Man: Hey, what's your favorite activity?",
      "Woman: I'd probably say watching films. It's so much fun!",
      "Man: Nice! Where do you like to watch them?",
      "Woman: I really enjoy going to the theatre. It's my favorite form of entertainment.",
      "Man: That sounds great! I actually like reading books.",
      "Woman: Oh, that's because you are boring!",
      "Man: Boring? Come on! Books can be exciting too!",
      "Woman: Maybe, but films are more entertaining for me!"
    ],
    options: ["Playing chess with her cousin", "Going to the theatre", "Reading books"],
    answer: 1,
  },
  {
    title: "Mary is talking to her friend about her new home. What does she ask about?",
    transcript: [
      "Hi, Ivan. It's Mary. I just moved into my new house. I want something nice for the dining area.",
      "I also saw a cute coffee shop nearby, and I'm thinking about getting a mirror for the living room.",
      "I need to get some furniture, especially a coffee table. Do you know where to buy one?"
    ],
    options: ["Where to buy a new table", "Which coffee shop to visit", "Where to buy a mirror"],
    answer: 0,
  },
  {
    title: "A man is talking about how he goes to work. Why does he prefer traveling by train?",
    transcript: [
      "I've been thinking about how to get to work every day. At first, I considered driving, but the traffic is always really bad in the morning.",
      "Then I thought about riding my bike, but it's too far, and I'd be tired before I even start my day. The bus is another option, but it's often late.",
      "After thinking about all the choices, I decided to travel by train. It's practical because it's on time, and I can relax during the trip. Plus, the station is close to my office."
    ],
    options: ["It's cheaper than biking", "It's practical", "It's faster than flying"],
    answer: 1,
  },
  {
    title: "What is not original in the house?",
    transcript: [
      "Welcome! I'm so glad you're interested in this beautiful property. This house was built in the 1920s and has maintained much of its original charm.",
      "The hardwood floors you see here are completely original, and they've been carefully preserved over the years. The same goes for the architecture; those high ceilings and detailed moldings are a testament to the craftsmanship of that era.",
      "However, the furniture you see isn't original. It was replaced a few years ago to give the home a more modern, functional feel. The updates blend well with the classic features, giving you the best of both worlds: historic charm with modern comfort."
    ],
    options: ["The wall", "The furniture", "The floor"],
    answer: 1,
  },
  {
    title: "Which button should the man press to buy a new computer?",
    transcript: ["To buy a new computer, press button three."],
    options: ["Three", "Six", "Four"],
    answer: 0,
    reconstructed: true,
  },
  {
    title: "What color shoes did he buy?",
    transcript: [
      "Anna: Did you buy a new pair of shoes yesterday?",
      "Tom: Yes, I did. I went shopping after work.",
      "Anna: What colors did you look at? Did you like the black ones?",
      "Tom: Yes, they were nice, but I thought the brown ones were a little too dark.",
      "Anna: So, which ones did you finally choose?",
      "Tom: I decided to buy the blue ones because they match most of my clothes."
    ],
    options: ["Blue", "Black", "Brown"],
    answer: 0,
  },
  {
    title: "A teacher and a student are talking about transportation. How does the teacher go to school?",
    transcript: [
      "Teacher: Good morning, Sarah! You are early today. How do you get to school every day?",
      "Student: Hi, Mr. Smith! I usually take the bus. It's not far from my house, but sometimes I have to wait a long time for it.",
      "Teacher: I understand. I walk to school every day. It helps me get some exercise, and I enjoy the fresh air.",
      "Student: That sounds nice! Do you walk alone?",
      "Teacher: No, I often walk with a few other teachers. We chat while walking, and it makes the time go by faster.",
      "Student: I wish I could walk to school too, but the bus is faster for me, especially when I have to get here early."
    ],
    options: ["He walks", "He takes the bus", "He drives"],
    answer: 0,
  },
  {
    title: "What time is the meeting?",
    transcript: [
      "Mr. Thompson will leave for the airport at 10 a.m., and at 11 a.m. he is scheduled to complete the check-in process for his flight to Ho Chi Minh City.",
      "Please note that tomorrow afternoon at 2 p.m. he has an important meeting with a business partner. All necessary documents should be prepared in advance."
    ],
    options: ["2 p.m.", "10 a.m.", "11 a.m."],
    answer: 0,
  },
  {
    title: "A woman is talking about her family's weekend. What do they do most weekends?",
    transcript: [
      "Hello, everyone! I want to share what my family usually does on weekends. We love spending time together and often go for a walk in the park.",
      "It's a nice way to relax and enjoy nature. We like to see the flowers and sometimes have a picnic.",
      "However, this weekend is different! My sister is visiting us, and we have planned a small family gathering at home. We will cook a big meal together and play some games. It will be fun to catch up and spend quality time as a family."
    ],
    options: ["Go on a picnic", "Go for a walk", "Go to the beach"],
    answer: 1,
  },
  {
    title: "Two colleagues are talking about a meeting. When do they want to meet?",
    transcript: [
      "Hey there! I've been thinking we should get together soon to discuss our upcoming project. I know weekends are usually good for meetings, but this time they're a bit tricky.",
      "Saturday is out because I've got a family event all day. And Sunday? I usually use that day to catch up on rest and prepare for the week ahead.",
      "So I was wondering if we could meet on Tuesday instead. It works really well for me. What do you think about that?"
    ],
    options: ["On Sunday", "Tuesday", "On Saturday"],
    answer: 1,
  },
  {
    title: "A man is seeking advice on his future career. What is he going to do?",
    transcript: [
      "Woman: Welcome, how may I help you?",
      "Man: Yes, I would like to have some advice for my future job. I majored in mathematics. Is there anything that I could do?",
      "Woman: Well, there are a variety of career paths you can take, such as becoming a teacher, a businessman, or continuing to study to become a researcher.",
      "Man: I have a friend who also majored in mathematics, and he is now a businessman with his own company. I guess that would be my choice then. I am not suitable to become a teacher since I think I am a bit impatient."
    ],
    options: ["Become a teacher", "Work in business", "Become a researcher"],
    answer: 1,
  },
  {
    title: "What course is the student going to take this year?",
    transcript: [
      "Hi, I'm Ben, and I want to share a bit about my studies. Last term, I took English, math, and science.",
      "They were all interesting, but math was a bit tough for me. I worked hard, though, and got good results in the end.",
      "This year, I'm really excited because I'm going to take a computer course. I've always wanted to learn more about technology, so I'm looking forward to it!"
    ],
    options: ["Computers", "Science", "Math"],
    answer: 0,
  },
  {
    title: "An artist is talking about her job. What is unusual about it?",
    transcript: [
      "Hello, my name is Sarah, and I'm an artist. I paint pictures of nature, like trees, rivers, and animals. I love using bright colors to make my art happy and full of life.",
      "My job is very fun, but I work irregular hours, sometimes late at night or on weekends. When I have inspiration, I paint for many hours without a break.",
      "I sell my paintings in galleries and online, and it makes me really happy when people like my work. Creating art is the best job for me!"
    ],
    options: ["She works from 9 to 5", "She works irregular hours", "She doesn't work on weekends"],
    answer: 1,
  },
  {
    title: "A man is talking about the countryside. What is the main cause of poor air quality?",
    transcript: [
      "I really like living in the countryside. There are many green fields, tall trees, and small rivers. The air usually smells fresh and clean, but sometimes it becomes dirty and hard to breathe.",
      "Many people think cars on the roads make the air bad. Others say the smoke from big factories is the problem. These things can make the air dirty, but in the countryside there's a bigger issue.",
      "Farmers often start fires to clean their fields. They burn old plants and grass. These fires make a lot of smoke that goes into the air. It's sad because the smoke can hurt animals and make people sick.",
      "We need to find better ways to clean fields without using fire."
    ],
    options: ["Fires in the countryside", "Smoke from factories", "Vehicles on the roads"],
    answer: 0,
  },
  {
    title: "A man is calling his teacher about an assignment. When is the meeting?",
    transcript: [
      "Hi, Professor Smith, this is John calling about our meeting for the assignment. I wanted to confirm our appointment time. I know we discussed a few options earlier.",
      "At first, I thought we agreed on Tuesday morning, but then I remembered that doesn't work with your schedule. Then I considered Thursday afternoon, but I have another class then.",
      "So I'm pretty sure we settled on Thursday morning at 10 a.m. in your office. That's what I have written down. I'll bring my draft and notes for the project.",
      "If I've got the day or time wrong, or if you need me to bring anything else, please let me know. Looking forward to discussing the assignment with you. Have a great day!"
    ],
    options: ["On Tuesday morning", "On Thursday afternoon", "On Thursday morning"],
    answer: 2,
  },
  {
    title: "Listen to a tour guide talking about Rock City. How old is the city?",
    transcript: [
      "Welcome to Rock City, everyone! I'm excited to show you around this amazing place. Rock City has a very long and interesting history.",
      "People first started living here about 1,500 years ago. Can you believe how old that is? It's older than many famous cities in the world!",
      "The city got its name because of all the big rocks you can see around us. Over time, people built houses and roads between these rocks. Today, we can still see many old buildings from long ago."
    ],
    options: ["2,500 years", "1,500 years", "3,500 years"],
    answer: 1,
  },
  {
    title: "Which subject will the man choose?",
    transcript: [
      "Lisa: Have you decided which subject you're going to choose for next semester?",
      "Tom: Not yet. I'm considering history, science, and geography.",
      "Lisa: I thought you were interested in history. Why don't you choose that?",
      "Tom: I like history, but there are too many dates to remember.",
      "Lisa: What about geography? You seemed to enjoy it last year.",
      "Tom: It's interesting, but I think I'll choose science because I really enjoy doing experiments."
    ],
    options: ["History", "Geography", "Science"],
    answer: 2,
  },
  {
    title: "Jana is talking to her friend. What does Jana's sister look like?",
    transcript: [
      "Jana: Hey, could you do me a favor? My sister is waiting outside, and I need you to give her my book.",
      "She's the one who is short and has straight hair, so you can't miss her. I also think she's wearing a blue jacket today.",
      "If you see her, just hand it to her, and I'll be so grateful. Thanks for helping me out!"
    ],
    options: ["Short", "Curly hair", "Thin"],
    answer: 0,
  },
  {
    title: "A man is talking about his routine after work. What will he do?",
    transcript: [
      "I'm usually exhausted because my job can be really tough. I always look forward to 5 o'clock, so I can finally check out and head home.",
      "Luckily, I live close by, which makes my evening routine a bit easier. I like to go for a run after work to clear my mind and shake off the stress.",
      "It helps me feel refreshed and ready for the next day."
    ],
    options: ["Meet his client", "Go running", "Cycle home"],
    answer: 1,
  },
  {
    title: "The woman is discussing her new exercise routine. How long does she spend cycling?",
    transcript: [
      "Lately, I've started a new routine that I'm really enjoying. I decided to involve more exercise into my life.",
      "I began by walking for about 15 minutes every day, just to get moving. After that, I hop on my bike and cycle for 35 minutes.",
      "It's been refreshing. I love how it helps me clear my mind after a busy day. I'm thinking of sticking with this habit."
    ],
    options: ["15 minutes", "25 minutes", "35 minutes"],
    answer: 2,
  },
  {
    title: "What will the father do to help his son?",
    transcript: [
      "Teacher: Hello, Mr. Johnson. Thank you for coming in today. I wanted to talk about your son Jake.",
      "Father: Hi, Mrs. Lee. Yes, I've noticed he's been struggling a bit lately.",
      "Teacher: His performance is not so good in math and reading. He seems to have some difficulties understanding the lessons.",
      "Father: I'm worried about that. What can we do to help him?",
      "Teacher: I know a private tutor who works well with children. She can provide extra help and support.",
      "Father: That sounds like a good idea! Can you give me her contact information?",
      "Teacher: Of course! I will write it down for you. I think Jake will really benefit from it."
    ],
    options: ["Arrange a private tutor", "Enroll him in summer school", "Talk to the principal"],
    answer: 0,
  },
  {
    title: "Listen to Sarah talking about her hobby. What does she do in her free time?",
    transcript: [
      "Woman: In my free time, I love to go to the theatre. There is something magical about watching a live performance.",
      "It makes me feel alive and happy. I also enjoy playing sports with my friends. We have so much fun together, whether it's soccer or basketball.",
      "These activities help me relax and make my days brighter."
    ],
    options: ["Go to the theatre and play sports", "Watch movies and go shopping", "Read books and paint"],
    answer: 0,
  },
  {
    title: "Two friends are talking about their school days. What was the woman good at?",
    transcript: [
      "Hey, do you remember our old school days? You were on the football team, right?",
      "Yeah, I played for the school team. Those were some of my best memories. We even won a few medals. What about you? Were you into football?",
      "Not really. I wasn't great at football, but I was pretty good at swimming. I actually won a medal in a competition once.",
      "That's right, I remember. Swimming was totally your strength, just like football was mine. My team also brought home some medals. It was such a good feeling!"
    ],
    options: ["Volleyball", "Swimming", "Basketball"],
    answer: 1,
  },
  {
    title: "How many bedrooms does the new house have?",
    transcript: [
      "Emma: Have you seen your friend's new house? What do you think of it?",
      "Jack: Yes, it's really beautiful and much bigger than their old one.",
      "Emma: How many bedrooms does it have? Is it three?",
      "Jack: Actually, they first wanted a house with five bedrooms, but it was too expensive.",
      "Emma: So how many bedrooms did they finally get?",
      "Jack: They decided to buy the one with four bedrooms, which is perfect for their family."
    ],
    options: ["Four bedrooms", "Three bedrooms", "Five bedrooms"],
    answer: 0,
  },
  {
    title: "An author is talking about her daily routine. When does she usually write?",
    transcript: [
      "Every morning, I start my day by going for a run. It helps me clear my mind and gives me energy.",
      "After lunch, at around 2 o'clock, I sit down at my working table, ready to write. My husband is my best critic, so I try to produce something before he gets home in the afternoon.",
      "I want to show him what I've been working on. At night, I seek motivation by watching movies or reading books. This helps me find new ideas for my stories.",
      "Writing is a journey, and each day brings something new."
    ],
    options: ["In the afternoons", "In the evening", "In the morning"],
    answer: 0,
  },
  {
    title: "An expert is talking about job satisfaction. What should people do?",
    transcript: [
      "Many people feel unhappy at work, and often they think a higher salary or less work will fix it. But that's not always the solution.",
      "Sometimes, the problem is the work environment. A change of place can help improve how we feel at work. However, looking for a new job can be stressful and take time.",
      "One option is to ask for a transfer to another branch within the same company. This can offer the same benefits as getting a new job without the challenges of starting over somewhere new."
    ],
    options: ["Request a transaction", "Request a transfer", "Request a change"],
    answer: 1,
  },
  {
    title: "Lucy is calling her friend. What is her sister like?",
    transcript: [
      "Hi, Emma, it's Lucy. I hope you're doing well. I need a small favor from you today.",
      "Could you pick up my sister after school? She'll be standing at the school gate at 3 p.m. She looks just like me, so you'll recognize her easily.",
      "I have a meeting, and I won't make it in time. Thank you so much! Let me know if that's okay with you."
    ],
    options: ["She is young", "She will be wearing a red coat", "They have similar characters"],
    answer: 2,
  },
  {
    title: "A man is talking to his friend. Why does he want to be a doctor?",
    transcript: [
      "I've always wanted to be a doctor. It's fulfilling to know that I can make a difference in someone's life.",
      "My family is also proud of this career choice, and they have encouraged me along the way.",
      "Some friends say doctors earn a lot of money, which is a nice bonus, but my main goal remains to save lives and provide care to those who need it most."
    ],
    options: ["To help people", "To make his family proud", "To make a lot of money"],
    answer: 0,
  },
  {
    title: "A woman is talking about her holiday plans. What will she do during the holiday?",
    transcript: [
      "I'm really excited about the holiday! I think I'll go for a walk every day to enjoy the fresh air.",
      "I also considered going for a run, but walking sounds more relaxing. Maybe I'll even try to go for a bike ride later.",
      "It'll be nice to spend some time outdoors!"
    ],
    options: ["Go for a walk", "Go for a bike ride", "Go for a run"],
    answer: 0,
  },
  {
    title: "A woman is calling her son. What time will the mother meet him?",
    transcript: [
      "Woman: Hi, sweetheart! I just wanted to tell you that we'll meet at 3 o'clock when you finish school.",
      "After that, I can take you to your soccer club at 4 o'clock. If you need anything, just let me know, and I can pick it up for you.",
      "Then, we can head out to dinner at 5 o'clock. Looking forward to seeing you!"
    ],
    options: ["4 o'clock", "5 o'clock", "3 o'clock"],
    answer: 2,
  },
  {
    title: "What does the sign language course require?",
    transcript: [
      "Sarah: I'm thinking about signing up for the sign language course. Do you know what I need to prepare?",
      "David: Yes, I checked the registration details yesterday.",
      "Sarah: Do I need to bring my student ID or a copy of my passport?",
      "David: No, you don't need either of those.",
      "Sarah: Is there anything else I should bring?",
      "David: You just need to submit a photo with your application form.",
    ],
    options: ["A copy of a passport.", "A student ID.", "A photo."],
    answer: 2,
  },
  {
    title: "A man is talking to a group of people. Where are they standing?",
    transcript: [
      "We're currently standing in the main building complex.",
      "Just nearby, you'll see the library, a place where you'll likely spend a lot of your time studying and working on projects.",
      "A little further ahead is the main hall, which hosts student elections, performances, and a variety of campus events.",
      "If you're looking to stay active, the Sports Center is located right next to the Lecture Hall building.",
      "Finally, the dormitory is situated just outside the campus, conveniently located across the road.",
    ],
    options: ["Library complex", "Social housing area", "University area"],
    answer: 2,
  },
  {
    title: "A man is calling his friend, Maria. When will he see her?",
    transcript: [
      "Hey Maria, it's me! I wanted to give you a quick call to let you know that I'll be visiting your town this weekend.",
      "I've got a few things planned, going to check out the local market and maybe explore some of the nearby parks.",
      "But the best part? I'll finally get to see you!",
      "I'll be at your place at 9 a.m. on Sunday, so we can catch up. Can't wait to hang out!",
    ],
    options: ["At 9 a.m. on Sunday", "At 8 a.m. on Sunday", "At 10 a.m. on Saturday"],
    answer: 0,
  },
  {
    title: "A man is talking on the phone. What did the man lose?",
    transcript: [
      "Hello! This is Mark. I think I might have lost my glasses when I was at your store earlier today.",
      "I remember trying on a jacket, and I may have left them there. They are brown and round.",
      "I really need them for reading and driving. I want to come back and check if they are still there.",
      "Can you please hold them for me if you find them? Thank you so much for your help! I'll be there in about 20 minutes.",
    ],
    options: ["Jacket", "Books", "Glasses"],
    answer: 2,
  },
  {
    title: "How long does it take to get to the station?",
    transcript: [
      "Attention, passengers travelling to the city centre.",
      "Your train will arrive at Riverside Station in approximately 20 minutes.",
      "After arriving at the station, you will need to continue your journey for another 15 minutes to reach your final destination in the city centre.",
      "Please remain seated and listen for further announcements.",
    ],
    options: ["20 minutes", "15 minutes", "25 minutes"],
    answer: 0,
  },
  {
    title: "A mom talks to her son about buying food. How much money is left in the kitchen?",
    transcript: [
      "Before we go shopping, I checked the money we keep in the kitchen drawer.",
      "Yesterday evening, there were 15 pounds in it, but this morning my brother used 5 pounds to buy some bread and milk from the supermarket.",
      "That means there are only 10 pounds left now.",
      "We may need to get some more money before buying dinner tonight.",
    ],
    options: ["10 pounds", "5 pounds", "15 pounds"],
    answer: 0,
  },
  {
    title: "How much does a bus card cost?",
    transcript: [
      "If you travel around the city by bus every day, it is probably better to buy a bus card instead of paying for single tickets.",
      "The card can be used on all city buses and is valid for one month.",
      "Many students and workers use it because it saves both time and money.",
      "At the moment, a new bus card costs 20 dollars, and you can buy one at the main bus station.",
    ],
    options: ["$10", "$20", "$30"],
    answer: 1,
  },
  {
    title: "What bus number stops near the boy's home?",
    transcript: [
      "To get to my house, you can take the bus from the city center.",
      "Several buses stop near my neighborhood, but the easiest one is bus number eight.",
      "It stops just across the street from my home, so you only need to walk for about two minutes after you get off the bus.",
    ],
    options: ["Ten", "Eight", "Night"],
    answer: 1,
  },
  {
    title: "What time does the party start?",
    transcript: [
      "Hello everyone. Just a quick reminder about Anna's birthday party this Saturday.",
      "The party will start at three o'clock in the afternoon at her house.",
      "There will be music, games, and lots of food and drinks for everyone.",
      "Please try to arrive on time so we can begin the activities together. We hope to see you all there at three o'clock.",
    ],
    options: ["Three o'clock", "Five o'clock", "Four o'clock"],
    answer: 0,
  },
  {
    title: "Why did he buy this jacket? (thiếu audio)",
    transcript: ["because it will keep him warm"],
    options: ["because it fits him well", "because it is cheap", "because it will keep him warm"],
    answer: 2,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "What time is the dinner?",
    transcript: [
      "Just a reminder about tonight's family dinner at my grandparents' house.",
      "Some people thought it would begin at seven o'clock, but the time has changed slightly because a few family members will arrive later than expected.",
      "Dinner will now start at half past seven in the evening.",
      "Please try not to be late, because everyone will wait and eat together.",
    ],
    options: ["8.30", "7.30", "9.30"],
    answer: 1,
  },
  {
    title: "A man has a new job. How many days does the man have to work?",
    transcript: [
      "My brother has recently started a new job at a small restaurant in town.",
      "At first, he thought he would need to work every weekday, but the manager later explained the schedule more clearly.",
      "Because the restaurant is still new, he only has to work three days each week at the moment.",
      "He is happy about this because he still has enough free time to continue his studies.",
    ],
    options: ["5 days", "4 days", "3 days"],
    answer: 2,
  },
  {
    title: "Why can't he do the job today?",
    transcript: [
      "Tom said he would like to help us with the job today, but unfortunately he can't come anymore.",
      "This morning, he remembered that he already has another appointment in the afternoon.",
      "It's something important, so he cannot cancel or change the time.",
      "He sounded sorry about it and asked if we could wait until tomorrow. If everything goes well, he will come and help us then.",
    ],
    options: ["He has another appointment", "He is sick", "He has to eat"],
    answer: 0,
  },
  {
    title: "What is the man going to?",
    transcript: [
      "After finishing work this evening, Daniel realized he had not eaten anything since lunch.",
      "He first thought about going straight home, but he felt too hungry to wait that long.",
      "Instead, he decided to stop somewhere in town before going back.",
      "He said he was going to get something to eat and then continue with the rest of his evening plans.",
    ],
    options: ["Get something to eat", "Go to sleep", "Get something to drink"],
    answer: 0,
  },
  {
    title: "What is the new health center next to?",
    transcript: [
      "The town has recently opened a new health center for local people.",
      "It is in a very convenient location, so it is easy for everyone to visit.",
      "The building is right next to the train station, only a short walk from the main entrance.",
      "Patients can travel there quickly by public transport, which is especially helpful for older people and families with children.",
    ],
    options: ["A train station", "A bus station", "An airport"],
    answer: 0,
  },
  {
    title: "In which room will the director's presentation happen?",
    transcript: [
      "There has been a small change to today's schedule.",
      "The director's presentation will not take place in the main hall as planned because the room is being prepared for another event.",
      "Instead, everyone should go to the meeting room on the second floor at two o'clock.",
      "Please arrive a few minutes early so the presentation can start on time.",
    ],
    options: ["The main hall", "The meeting room", "The lecture room"],
    answer: 1,
  },
  {
    title: "On which floor is the French class? (thiếu audio)",
    transcript: ["Second"],
    options: ["Second", "Third", "First"],
    answer: 0,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "Talking about a report, when do they meet?",
    transcript: [
      "Have you finished writing the report for our manager?",
      "Almost. I just need to check a few details before we discuss it.",
      "When should we meet to go through everything? Is Tuesday convenient for you?",
      "I'm afraid I'm busy on Tuesday, but I'm available on Thursday.",
      "What about Friday morning? Friday is too late because the report is due soon. Let's meet on Thursday instead.",
    ],
    options: ["Friday.", "Tuesday.", "Thursday."],
    answer: 2,
  },
  {
    title: "What is she going to take with her?",
    transcript: [
      "Sarah is getting ready for the school camping trip this weekend.",
      "She has already packed clothes, food, and a flashlight in her bag.",
      "She asked her friends what else she should bring to make the trip more fun in the evenings.",
      "In the end, she decided that she was going to take some games with her so everyone could play together after dinner.",
    ],
    options: ["A flashlight", "Games", "Food"],
    answer: 1,
  },
  {
    title: "What can the staff use? (thiếu audio)",
    transcript: ["The computers"],
    options: ["The printers", "The projectors", "The computers"],
    answer: 2,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "What do they decide to write about?",
    transcript: [
      "For their history project, Liam and his classmate needed to choose a topic to write about together.",
      "At first, they thought about writing about a famous battle, but they felt it would be too difficult and take too much time to research.",
      "After discussing a few other ideas, they finally decided to write about a well-known historian who had written several important books about ancient culture and society.",
    ],
    options: ["A famous battle", "Ancient culture", "Historian"],
    answer: 2,
  },
  {
    title: "A trainer talks to his student. What will the student write about?",
    transcript: [
      "The students in our history class have started working on their final projects for this term.",
      "Each student can choose a different topic to research and write about.",
      "Some students picked famous people or important events, but Emma decided to focus on land and how it is used in different parts of the country.",
      "She said it was an interesting subject because it is connected to farming, housing, and the environment.",
    ],
    options: ["Important events", "Famous people", "Land"],
    answer: 2,
  },
  {
    title: "What does the teacher want the student to do?",
    transcript: [
      "I need to talk to some of you about your homework.",
      "Over the past few weeks, I have noticed that several assignments were handed in late, and this is starting to affect your progress in class.",
      "Completing your work on time is very important because it helps you practice what we learned during lessons.",
      "I especially want one student to complete the assignments on time from now on so that his grades can improve before the end of the term.",
    ],
    options: ["Study harder for exams", "Complete the assignment on time", "Hand in more assignments"],
    answer: 1,
  },
  {
    title: "What do the students need to do every Tuesday?",
    transcript: [
      "All students in the Science Club have an activity schedule for this month.",
      "On Mondays, they work together in small groups, and on Thursdays they have discussions with the teacher.",
      "Every Tuesday, however, each student must write a report about what they learned during the week.",
      "The reports are important because they help the teacher see how much progress the students are making.",
    ],
    options: ["Work in groups", "Have a discussion", "Write a report"],
    answer: 2,
  },
  {
    title: "Listen to a radio programme about a new restaurant. What does the man complain about?",
    transcript: [
      "Last night, my friends and I went to a new restaurant that recently opened near the city center.",
      "The food was actually very good, and the service was quite fast too.",
      "However, one of my friends kept complaining during the meal because the place was too cold inside.",
      "The air conditioning was very strong, and even after asking the staff to change it, the temperature did not improve much.",
    ],
    options: ["The food was bad", "The place was cold", "The service was slow"],
    answer: 1,
  },
  {
    title: "What advice she gives to save money? (thiếu audio)",
    transcript: ["Cook for yourself"],
    options: ["Get loans from the bank", "invest on stocks", "cook for yourself"],
    answer: 2,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "What color is her dress? (thiếu audio)",
    transcript: ["Black"],
    options: ["white", "green", "black"],
    answer: 2,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "What time does the shop open on monday? (thiếu audio)",
    transcript: ["8.30 a.m"],
    options: ["8.20 a.m", "8.30 a.m", "8.40 a.m"],
    answer: 1,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "When is the shop going to open again? (thiếu audio)",
    transcript: ["Thursday"],
    options: ["Thursday", "Tuesday", "Saturday"],
    answer: 0,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "What is he going to buy? (thiếu audio)",
    transcript: ["Tea"],
    options: ["soda", "coke", "tea"],
    answer: 2,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "What are they opening next week? (thiếu audio)",
    transcript: ["The coffee shop"],
    options: ["The playground", "The restaurant", "The coffee shop"],
    answer: 2,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "Listen a message about a book club, where is the meeting? (thiếu audio)",
    transcript: ["The art center"],
    options: ["The art center", "The yoga class", "The fitness center"],
    answer: 0,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "Which club is the student going to choose? (thiếu audio)",
    transcript: ["The art club"],
    options: ["The museum", "The art club", "The shopping mall"],
    answer: 1,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "The man is talking about his key. Where did he find the key?",
    transcript: [
      "The other day, I went out and, when I returned, I couldn't find my house key.",
      "I searched my car but didn't see it anywhere. I thought I had left it in the bedroom.",
      "After standing outside for an hour, I suddenly spotted it under the mat at the front door. What a relief that was!",
    ],
    options: ["In his car", "In the front door", "In the bedroom"],
    answer: 1,
  },
  {
    title: "Why does he like his new job? (thiếu audio)",
    transcript: ["He has a shorter travel time"],
    options: ["He has more choices", "He has a flexible schedule", "He has a shorter travel time"],
    answer: 2,
    reconstructed: true,
    videoDescriptionAudio: true,
  },
  {
    title: "A woman is talking about her usual Saturday routine. What does she usually do on Saturdays?",
    transcript: [
      "Normally, on Saturdays, I spend the day with my family.",
      "We like to have brunch together and then do some fun activities, like playing board games or going for a walk.",
      "It's a nice way to relax and catch up.",
      "But this week, I have something different planned. I'm going to see a friend for her birthday and go shopping together instead.",
      "I'm looking forward to it, but I know I'll miss our usual family time!",
    ],
    options: ["Meeting a friend", "Seeing her family", "Going shopping"],
    answer: 1,
  },
  {
    title: "Two friends are talking with each other. What did they both buy?",
    transcript: [
      "Man: I just got back from shopping. I found a great jacket and also picked up some tea.",
      "Woman: Nice! What kind of jacket did you get?",
      "Man: It's a stylish leather jacket. I think it'll be perfect for the fall. What about you?",
      "Woman: I bought a cozy sweater and also grabbed a delicious cake.",
      "Man: Sounds great! Those are perfect for this weather.",
      "Woman: Thanks! I'm excited to try the cake later. Looks like we both made good choices today!",
      "Man: Absolutely! New clothes and tasty treats for the chilly days ahead!",
    ],
    options: ["Tea", "Cakes", "Clothes"],
    answer: 2,
  },
  {
    title: "What does this family do most weekends?",
    transcript: [
      "Last year, I had an amazing trip.",
      "One of the best things I enjoyed was going cycling in the countryside. The views were stunning and it felt great to be outdoors.",
      "I also went for a walk a few times, but cycling really allowed me to explore more areas.",
      "We even had a picnic one day, which was lovely too.",
    ],
    options: ["Go cycling", "Go picnic", "Go for a walk"],
    answer: 0,
  },
  {
    title: "What has he had problems with?",
    transcript: [
      "How is David getting on with his new job?",
      "He's doing quite well, but he's had a few difficulties recently.",
      "Has he had problems communicating with his colleagues?",
      "Not really. Everyone at work is very friendly and helpful.",
      "What about managing his time? Does he find it difficult?",
      "No, that's not a problem. He mainly struggles with using technology because some of the software is new to him.",
    ],
    options: ["Communicating with colleagues", "Managing his time", "Using technology"],
    answer: 2,
  },
  {
    title: "A mom is calling her son to remind him about picking up groceries. How much is an egg?",
    transcript: [
      "Hey sweetie, it's Mom. Can you please pick up three things on your way home?",
      "I need a dozen eggs; they're 1 pound 50 each.",
      "Also grab a loaf of bread and some milk, please. Thanks. Love you.",
    ],
    options: ["£3.50 (Three pounds fifty)", "£1.50 (One pound fifty)", "£2.50 (Two pounds fifty)"],
    answer: 1,
  },
  {
    title: "Jack is calling to invite a friend to his house. What color is Jack's house?",
    transcript: [
      "Hey, it's Jack. I just moved to a new house in this busy neighborhood, and it's really cool.",
      "There are so many houses here in different colors, purple, blue, and white.",
      "My house is big and red. I'd love for you to come over and check it out. Let me know when you're free.",
    ],
    options: ["Red", "Green", "Blue"],
    answer: 0,
  },
  {
    title: "James is talking about his family members. In what way are his mother and aunt alike?",
    transcript: [
      "This picture is of my aunt and my mom. Many people say they look alike.",
      "I find it funny, though, because when they were teenagers, my mom had long hair, while my aunt had short hair.",
      "They were both equally thin back then, but their eyes were different.",
      "My mom has lovely brown eyes, and my aunt has strikingly beautiful blue eyes.",
      "Even with their differences, they share a special bond that makes them so similar in spirit.",
    ],
    options: ["They both had long hair", "They both had blue eyes", "They were both thin"],
    answer: 2,
  },
  {
    title: "A woman is chatting with a friend about her afternoon plans. What is she going to do this afternoon?",
    transcript: [
      "I'm really looking forward to this afternoon!",
      "Normally, I just relax at home or maybe catch up on some shows, but today I want to do something different.",
      "I've decided to go on a city tour to explore some of the local sites.",
      "I thought about going to the park or even visiting a museum, but the city tour sounds much more exciting!",
    ],
    options: ["Visiting a museum", "Relax at home", "Go on a city tour"],
    answer: 2,
  },
  {
    title: "Where is she taking the staff to?",
    transcript: [
      "I'd like to tell you about our company trip next month.",
      "This year we are not visiting another city in our country like before.",
      "Instead, we are taking all the staff to a different country for five days.",
      "It will be a great chance to relax, learn about a new culture, and spend time together outside work.",
      "More information about the trip will be sent by email next week.",
    ],
    options: ["To a different city", "To a different country", "To a village"],
    answer: 1,
  },
].map((question, index) => ({
  ...question,
  audio: `assets/audio/listening-q${index + 1}.wav`,
  audioSource: recordedAudioQuestions.has(index + 1) ? "recorded" : "synthetic",
  vocabulary: question.vocabulary || [],
}));
