const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const User = require('../models/User');

dotenv.config();

const services = [
  {
    title: 'NEBOSH IGC',
    category: 'International Programmes',
    description: 'A recognised programme for occupational health and safety professionals, managers and corporate teams responsible for risk control and safe work practices.',
    duration: '10-12 days',
    format: 'Classroom / online / corporate',
    level: 'Advanced',
    tags: ['NEBOSH', 'HSE', 'safety'],
    isPopular: true
  },
  {
    title: 'IOSH Managing Safely',
    category: 'International Programmes',
    description: 'A practical course for managers and supervisors who need to understand workplace safety responsibilities, hazard control and team communication.',
    duration: '3-4 days',
    format: 'Classroom / online',
    level: 'Intermediate',
    tags: ['IOSH', 'management', 'safety'],
    isPopular: true
  },
  {
    title: 'Occupational Health and Safety',
    category: 'HSE Training',
    description: 'Training focused on safe work procedures, legal responsibilities, incident prevention, risk awareness and workplace safety culture.',
    duration: '1-5 days',
    format: 'Corporate training',
    level: 'Corporate',
    tags: ['health and safety', 'HSE', 'workplace safety'],
    isPopular: true
  },
  {
    title: 'Industrial Safety',
    category: 'Industrial Safety',
    description: 'A programme for employees and supervisors working with industrial hazards, high-risk activities and internal safety requirements.',
    duration: '3-7 days',
    format: 'Classroom / client site',
    level: 'Corporate',
    tags: ['industrial safety', 'production', 'risk control']
  },
  {
    title: 'Environmental Safety and IEMA',
    category: 'Environmental Training',
    description: 'Training on environmental management, impact awareness, sustainability principles and responsible business practices.',
    duration: '2-5 days',
    format: 'Classroom / online',
    level: 'Intermediate',
    tags: ['environment', 'IEMA', 'sustainability']
  },
  {
    title: 'ISO Management and Internal Audit',
    category: 'ISO and Management Systems',
    description: 'A course covering management systems, internal audit principles, process documentation and preparation for certification activities.',
    duration: '2-4 days',
    format: 'Classroom / corporate',
    level: 'Intermediate',
    tags: ['ISO', 'audit', 'quality']
  },
  {
    title: 'HR, Leadership and People Management',
    category: 'Management and HR',
    description: 'Training for leaders and HR teams in communication, performance review, staff motivation, team management and professional growth.',
    duration: '1-3 days',
    format: 'Workshop / corporate',
    level: 'Corporate',
    tags: ['HR', 'leadership', 'management']
  },
  {
    title: 'Technical English and Translation Support',
    category: 'Languages and Translation',
    description: 'Support for technical translation, business communication training and language preparation for international programmes.',
    duration: 'On request',
    format: 'Individual / corporate',
    level: 'Corporate',
    tags: ['translation', 'English', 'TMS']
  }
];

const sampleCourses = [
  {
    title: 'IOSH Managing Safely',
    category: 'International Programmes',
    description: 'Current course for managers and supervisors focused on safe work practices and risk awareness.',
    startDate: new Date('2026-07-01'),
    endDate: new Date('2026-07-04'),
    status: 'active',
    progress: 45,
    trainer: 'Baitau HSE Trainer',
    location: 'Astana Training Centre',
    format: 'Classroom'
  },
  {
    title: 'Environmental Safety and IEMA',
    category: 'Environmental Training',
    description: 'Upcoming training on environmental responsibility, sustainable operations and practical workplace actions.',
    startDate: new Date('2026-08-12'),
    endDate: new Date('2026-08-15'),
    status: 'upcoming',
    progress: 0,
    trainer: 'Environmental Training Specialist',
    location: 'Online',
    format: 'Online'
  },
  {
    title: 'Occupational Health and Safety',
    category: 'HSE Training',
    description: 'Completed training on workplace safety responsibilities and risk prevention.',
    startDate: new Date('2026-05-05'),
    endDate: new Date('2026-05-07'),
    status: 'completed',
    progress: 100,
    trainer: 'Baitau HSE Trainer',
    location: 'Client site',
    format: 'Corporate'
  }
];

const seed = async () => {
  try {
    await connectDB();

    await Service.deleteMany();
    await Service.insertMany(services);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@baitau.kz';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin12345';
    const clientEmail = process.env.CLIENT_DEMO_EMAIL || 'client@baitau.kz';
    const clientPassword = process.env.CLIENT_DEMO_PASSWORD || 'Client12345';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Baitau Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        activeCourses: []
      });
    }

    const existingClient = await User.findOne({ email: clientEmail });
    if (!existingClient) {
      await User.create({
        name: 'Corporate Client',
        email: clientEmail,
        password: clientPassword,
        role: 'user',
        activeCourses: sampleCourses
      });
    }

    console.log('Database seeded successfully');
    console.log(`Admin email: ${adminEmail}`);
    console.log(`Admin password: ${adminPassword}`);
    console.log(`Client email: ${clientEmail}`);
    console.log(`Client password: ${clientPassword}`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
