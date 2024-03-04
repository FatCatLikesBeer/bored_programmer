const tags = [
  "API", "C", "CSS",
  "Cloud", "Django", "Expo",
  "Express", "HTML", "IDE",
  "JavaScript", "Linux", "MeetUp",
  "Nature", "PHP", "Python",
  "React", "SSH", "Shell",
  "Shoes", "Swift", "VIM", "Web", "WebGL",
  "Video"
];

const categories = ["Editor", "Programming", "Social", "Systems", "Learning"];

const activities = [
  {
    "id": 0,
    "activity": "Build a web page using only JavaScript.",
    "description": "Web pages are often built using HTML, CSS, and JavaScript. However, a great way to get familiar with DOM manipulation is by forcing yourself to do it! This is also a potential way to start learing JQuery too!",
    "category": categories[1],
    "tags": [tags[9], tags[7], tags[2]]
  },
  {
    "id": 1,
    "activity": "Explore new features in your IDE.",
    "description": "Today's IDEs & text editors are very complex and feature rich. Spend 10 minutes exploring the menus or manual for features & functions you've never used or seen before!",
    "category": categories[0],
    "tags": [tags[8]]
  },
  {
    "id": 2,
    "activity": "Learn to use a Linux terminal.",
    "description": "Oracle Cloud Infrastructure offers free Linux virtual machines. Sign up for one and learn to use the Linux command line.",
    "category": categories[3],
    "tags": [tags[10], tags[3]]
  },
  {
    "id": 3,
    "activity": "Learn to exit VIM",
    "description": "To exit VIM, type in ':q' then press enter.",
    "category": categories[0],
    "tags": [tags[20]]
  },
  {
    "id": 4,
    "activity": "Write a 'hello world' program in a programming language you've never used.",
    "description": "Try it in C, Swift, or Shell script!",
    "category": categories[1],
    "tags": [tags[1], tags[19], tags[17]]
  },
  {
    "id": 5,
    "activity": "Create a video about a recent programming problem you solved.",
    "description": "Communicating and explaining a problem you just solved is a great way to really learn and understand what you just did.",
    "category": categories[2],
    "tags": [tags[12]]
  },
  {
    "id": 6,
    "activity": "Transfer a file using a terminal emulator and SCP.",
    "description": "",
    "category": categories[3],
    "tags": [tags[10], tags[16]]
  },
  {
    "id": 7,
    "activity": "Design a printable business card using React.",
    "description": "Use React to create a printable business card. Make sure it looks good too",
    "category": categories[1],
    "tags": [tags[15], tags[2]]
  },
  {
    "id": 8,
    "activity": "Design a printable business card using React.",
    "description": "Use React to create a printable business card. Make sure it looks good.",
    "category": categories[1],
    "tags": [tags[15], tags[2]]
  },
  {
    "id": 9,
    "activity": "Create a 3 page site using PHP",
    "description": "Create a 3 page site using PHP",
    "category": categories[1],
    "tags": [tags[13], tags[21]]
  },
  {
    "id": 10,
    "activity": "Create a 3 page site using Django",
    "description": "Create a 3 page site using Django",
    "category": categories[1],
    "tags": [tags[4], tags[21], tags[14]]
  },
  {
    "id": 11,
    "activity": "Turn off your computer and go for a walk.",
    "description": "Many of us are in front of our computers for way too long, and haven't restarted our computeres in a long time. Let's refresh both our own and our computer's memory with a nice quick walk!",
    "category": categories[2],
    "tags": [tags[18]]
  },
  {
    "id": 12,
    "activity": "Build a file sharing site using Express",
    "description": "Build a file sharing site using Express",
    "category": categories[1],
    "tags": [tags[6], tags[9]]
  },
  {
    "id": 13,
    "activity": "Find a Programmer Group/Club",
    "description": "Join a programming club at your school or look for local programmers mixers on MeetUp",
    "category": categories[2],
    "tags": [tags[11]]
  },
  {
    "id": 14,
    "activity": "Look up free APIs",
    "description": "Learn to use APIs from a popular site or recreate a free test API from https://rapidapi.com/collection/list-of-free-apis",
    "category": categories[1],
    "tags": [tags[0]]
  },
  {
    "id": 15,
    "activity": "Create your own hash map algorithm",
    "description": "Hash maps are the structure behind JavaScript objects and Python dictionaries. Try building that type yourself.",
    "category": categories[1],
    "tags": [tags[14], tags[9]]
  },
  {
    "id": 16,
    "activity": "Create a 3D cube in WebGL",
    "description": "Make a 3D cube in a web browser!",
    "category": categories[1],
    "tags": [tags[9], tags[22]]
  },
  {
    "id": 17,
    "activity": "Start and Finish the tutorial for Expo",
    "description": "Create an app that works for web, iOS, and Android!",
    "category": categories[1],
    "tags": [tags[15], tags[5], tags[9]]
  },
  {
    "id": 18,
    "activity": "Watch a FreeCodeCamp video on a relevent, but unfamiliar subject",
    "description": "Watching coding videos is kind of a bad habit that could lead to tutorial hell. That's where we only watch tutorials, but never implement the examples or commit the concepts to memory. However, these tutorials can provide some major insights and tricks that could be benefitial to any programmer, regardless of the technology or language.",
    "category": categories[4],
    "tags": [tags[23]],
  }
];

module.exports = {tags, categories, activities}
