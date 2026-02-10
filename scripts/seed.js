const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Sample data
const sampleUsers = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    bio: 'Full-stack developer passionate about creating amazing web experiences. Love React, Node.js, and coffee! ☕',
    profileImage: 'https://picsum.photos/seed/john/200/200.jpg'
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123',
    bio: 'UI/UX designer with a love for clean interfaces and user-centered design. Always learning something new! 🎨',
    profileImage: 'https://picsum.photos/seed/jane/200/200.jpg'
  },
  {
    username: 'mike_wilson',
    email: 'mike@example.com',
    password: 'password123',
    bio: 'Mobile app developer. Building the future one line of code at a time. Flutter and React Native enthusiast. 📱',
    profileImage: 'https://picsum.photos/seed/mike/200/200.jpg'
  },
  {
    username: 'sarah_jones',
    email: 'sarah@example.com',
    password: 'password123',
    bio: 'Data scientist turned ML engineer. Making sense of data and building intelligent systems. 🤖',
    profileImage: 'https://picsum.photos/seed/sarah/200/200.jpg'
  },
  {
    username: 'alex_chen',
    email: 'alex@example.com',
    password: 'password123',
    bio: 'DevOps engineer automating everything. Kubernetes, Docker, and cloud native enthusiast. ☁️',
    profileImage: 'https://picsum.photos/seed/alex/200/200.jpg'
  }
];

const samplePosts = [
  {
    content: 'Just deployed my first full-stack MERN application! 🎉 The journey has been incredible, from setting up the backend with Express and MongoDB to building a responsive React frontend. Learned so much about authentication, state management, and API design.\n\nWhat\'s your favorite stack for web development? Let me know in the comments! 👇\n\n#webdevelopment #mern #react #nodejs #programming',
    image: 'https://picsum.photos/seed/post1/600/400.jpg'
  },
  {
    content: 'Beautiful sunset from my home office today. Sometimes you need to step back and appreciate the little things. 🌅\n\nWorking on a new feature for our social media app - can\'t wait to share it with you all!',
    image: 'https://picsum.photos/seed/sunset/600/400.jpg'
  },
  {
    content: 'Hot take: TypeScript is worth the learning curve. Yes, it adds some verbosity, but the type safety and IDE support you get in return is invaluable, especially in larger codebases.\n\nWhat are your thoughts on TypeScript vs JavaScript? 🤔\n\n#typescript #javascript #webdev',
    image: null
  },
  {
    content: 'Just finished reading "Clean Code" by Robert C. Martin. Every developer should read this book! 📚\n\nMy biggest takeaway: "Code is read more often than it is written." This completely changed how I approach coding.\n\nWhat\'s the best programming book you\'ve ever read?',
    image: null
  },
  {
    content: 'Coffee + Code = ☕️ + 💻 = Productivity! ☕️\n\nWhat\'s your go-to programming fuel? Mine is definitely black coffee and some lo-fi beats in the background.\n\n#programming #developerlife #coffee',
    image: 'https://picsum.photos/seed/coffee/600/400.jpg'
  },
  {
    content: 'Debugging is like being a detective in a crime movie where you are also the murderer. 🕵️‍♂️\n\nSpent 3 hours today chasing a bug that turned out to be a missing semicolon. Classic!\n\nShare your worst debugging story! 👇',
    image: null
  },
  {
    content: 'New feature alert! 🚀 Just pushed live our real-time commenting system. Now you can see comments appear instantly without refreshing the page.\n\nBuilt with WebSockets and it\'s super smooth. Try it out and let me know what you think!\n\n#websockets #realtime #feature',
    image: 'https://picsum.photos/seed/feature/600/400.jpg'
  },
  {
    content: 'Weekend project: Built a weather app using React and OpenWeather API. 🌤️\n\nIt\'s amazing what you can build in just a couple of days when you focus. The API documentation was surprisingly clear and the response times are great.\n\nCheck it out and let me know what features I should add next!',
    image: 'https://picsum.photos/seed/weather/600/400.jpg'
  },
  {
    content: 'Pro tip: Use meaningful commit messages. Future you will thank present you. 🙏\n\nInstead of "fix stuff", try "Fix user authentication bug where tokens expire prematurely". It makes code reviews and debugging so much easier.\n\n#git #programmingtips #bestpractices',
    image: null
  },
  {
    content: 'Just migrated our database from SQL to MongoDB and the performance improvement is incredible! 🚀\n\nThe flexibility of NoSQL really shines when dealing with unstructured data. Plus, the MERN stack integration is seamless.\n\nAnyone else made the switch recently? Share your experience!',
    image: 'https://picsum.photos/seed/database/600/400.jpg'
  }
];

const sampleComments = [
  'This is amazing! Great work! 👏',
  'I totally agree with your take on TypeScript.',
  'Thanks for sharing this! Very helpful.',
  'Love the design! What tools did you use?',
  'This is exactly what I was looking for!',
  'Great explanation, very clear and concise.',
  'Can\'t wait to try this out!',
  'This saved me so much time. Thank you!',
  'Interesting perspective. Never thought of it that way.',
  'Bookmarked! Going to reference this later.'
];

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create users
    const users = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
    }
    console.log(`👥 Created ${users.length} users`);

    // Create posts
    const posts = [];
    for (let i = 0; i < samplePosts.length; i++) {
      const postData = samplePosts[i];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      
      const post = new Post({
        ...postData,
        author: randomUser._id,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time within last week
      });
      
      await post.save();
      posts.push(post);
    }
    console.log(`📝 Created ${posts.length} posts`);

    // Create comments
    let commentCount = 0;
    for (const post of posts) {
      const numComments = Math.floor(Math.random() * 5) + 1; // 1-5 comments per post
      
      for (let i = 0; i < numComments; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
        
        const comment = new Comment({
          postId: post._id,
          author: randomUser._id,
          text: randomComment,
          createdAt: new Date(post.createdAt.getTime() + Math.random() * 24 * 60 * 60 * 1000) // Within 24 hours of post
        });
        
        await comment.save();
        
        // Add comment to post
        post.comments.push(comment._id);
        commentCount++;
      }
      
      await post.save();
    }
    console.log(`💬 Created ${commentCount} comments`);

    // Create some follows
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (i !== j && Math.random() > 0.5) {
          users[i].following.push(users[j]._id);
          users[j].followers.push(users[i]._id);
        }
      }
    }
    
    for (const user of users) {
      await user.save();
    }
    console.log(`🤝 Created follow relationships`);

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Posts: ${posts.length}`);
    console.log(`   Comments: ${commentCount}`);
    console.log('\n🔑 Login credentials:');
    sampleUsers.forEach(user => {
      console.log(`   ${user.username}: ${user.email} / password123`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
};

// Run the seed function
seedDatabase();
