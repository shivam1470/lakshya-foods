const { PrismaClient } = require('@prisma/client')

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('DATABASE_URL is not set')
    process.exit(1)
  }
  console.log('Connecting to database...')
  const prisma = new PrismaClient()
  try {
    const now = await prisma.$queryRaw`SELECT NOW()`
    console.log('DB time:', now && now[0] ? Object.values(now[0])[0] : now)
    const tables = await prisma.$queryRawUnsafe("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY 1 LIMIT 5")
    console.log('Sample tables:', tables)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(e => { console.error(e); process.exit(1) })
