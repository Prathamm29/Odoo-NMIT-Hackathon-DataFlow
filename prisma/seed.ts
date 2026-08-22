import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  
  await prisma.leaveRequest.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.employeeProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();

  
  const company = await prisma.company.create({
    data: { name: 'Dayflow Inc.', code: 'OI' },
  });
  console.log(`✅ Created company: ${company.name} (${company.code})`);

  
  const adminPasswordHash = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      loginId: 'admin@dayflow.com',
      email: 'admin@dayflow.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      mustChangePassword: false,
      companyId: company.id,
      profile: {
        create: {
          firstName: 'Jane',
          lastName: 'Doe',
          jobTitle: 'HR Director',
          department: 'Human Resources',
          dateOfJoining: new Date('2022-01-15'),
          baseMonthlyWage: 8500,
        },
      },
    },
  });
  console.log(`✅ Created admin: ${admin.email} (password: admin123)`);

  
  const employeePassword = await bcrypt.hash('changeme', 12);
  const employees = [
    { loginId: 'alice.j', email: 'alice@dayflow.com', firstName: 'Alice', lastName: 'Johnson', jobTitle: 'Software Engineer', department: 'Engineering', wage: 7500 },
    { loginId: 'bob.s', email: 'bob@dayflow.com', firstName: 'Bob', lastName: 'Smith', jobTitle: 'Product Manager', department: 'Product', wage: 8000 },
    { loginId: 'charlie.d', email: 'charlie@dayflow.com', firstName: 'Charlie', lastName: 'Davis', jobTitle: 'UX Designer', department: 'Design', wage: 7000 },
    { loginId: 'diana.p', email: 'diana@dayflow.com', firstName: 'Diana', lastName: 'Prince', jobTitle: 'QA Engineer', department: 'Engineering', wage: 6500 },
    { loginId: 'ethan.h', email: 'ethan@dayflow.com', firstName: 'Ethan', lastName: 'Hunt', jobTitle: 'DevOps Engineer', department: 'Operations', wage: 7800 },
    { loginId: 'fiona.g', email: 'fiona@dayflow.com', firstName: 'Fiona', lastName: 'Gallagher', jobTitle: 'HR Manager', department: 'Human Resources', wage: 6800 },
    { loginId: 'george.c', email: 'george@dayflow.com', firstName: 'George', lastName: 'Costanza', jobTitle: 'Sales Executive', department: 'Sales', wage: 6200 },
    { loginId: 'hannah.a', email: 'hannah@dayflow.com', firstName: 'Hannah', lastName: 'Abbott', jobTitle: 'Marketing Specialist', department: 'Marketing', wage: 6000 },
  ];

  const createdUsers: { id: string; firstName: string; lastName: string }[] = [];

  for (const emp of employees) {
    const user = await prisma.user.create({
      data: {
        loginId: emp.loginId,
        email: emp.email,
        passwordHash: employeePassword,
        role: 'EMPLOYEE',
        mustChangePassword: true,
        companyId: company.id,
        profile: {
          create: {
            firstName: emp.firstName,
            lastName: emp.lastName,
            jobTitle: emp.jobTitle,
            department: emp.department,
            dateOfJoining: new Date('2023-03-01'),
            baseMonthlyWage: emp.wage,
          },
        },
      },
    });
    createdUsers.push({ id: user.id, firstName: emp.firstName, lastName: emp.lastName });
    console.log(`✅ Created employee: ${emp.email} (password: changeme)`);
  }

  
  const today = new Date();
  const allUserIds = [admin.id, ...createdUsers.map((u) => u.id)];

  for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
    const date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - dayOffset));

    for (const userId of allUserIds) {
      
      if (Math.random() < 0.15) continue;

      const checkInHour = 8 + Math.floor(Math.random() * 2); 
      const checkInMinute = Math.floor(Math.random() * 60);
      const workHoursRaw = 7.5 + Math.random() * 2.5; 
      const workHours = parseFloat(workHoursRaw.toFixed(2));
      const extraHours = parseFloat(Math.max(0, workHours - 8).toFixed(2));

      const checkIn = new Date(date);
      checkIn.setUTCHours(checkInHour, checkInMinute, 0, 0);

      const checkOut = new Date(checkIn.getTime() + workHoursRaw * 60 * 60 * 1000);

      await prisma.attendance.create({
        data: {
          userId,
          date,
          checkIn,
          checkOut,
          workHours,
          extraHours,
          status: workHours < 4 ? 'HALF_DAY' : 'PRESENT',
        },
      });
    }
  }
  console.log('✅ Seeded attendance data for last 5 days');

  
  const leaveData = [
    { userId: createdUsers[0].id, type: 'PAID' as const, startOffset: 7, endOffset: 11, days: 5, status: 'PENDING' as const },
    { userId: createdUsers[1].id, type: 'SICK' as const, startOffset: 1, endOffset: 2, days: 2, status: 'PENDING' as const },
    { userId: createdUsers[2].id, type: 'UNPAID' as const, startOffset: 30, endOffset: 41, days: 12, status: 'PENDING' as const },
    { userId: createdUsers[3].id, type: 'PAID' as const, startOffset: -5, endOffset: -4, days: 2, status: 'APPROVED' as const },
  ];

  for (const leave of leaveData) {
    const startDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + leave.startOffset));
    const endDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + leave.endOffset));

    await prisma.leaveRequest.create({
      data: {
        userId: leave.userId,
        leaveType: leave.type,
        startDate,
        endDate,
        allocationDays: leave.days,
        status: leave.status,
      },
    });
  }
  console.log('✅ Seeded leave requests');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📋 Login credentials:');
  console.log('   Admin:    admin@dayflow.com / admin123');
  console.log('   Employee: alice@dayflow.com / changeme  (must change on first login)');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
