import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  const name = process.env.SEED_ADMIN_NAME || 'Administrator'

  if (!email || !password) {
    console.log('[seed] Skipping admin seed (missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD)')
    return
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log('[seed] Admin user already exists, skipping')
    return
  }

  const hashed = await bcrypt.hash(password, 10)
  await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      role: 'admin',
      isActive: true,
    }
  })
  console.log('[seed] Admin user created:', email)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
