export const emailConfig = {
  from: 'color.dove@gmail.com',
  baseUrl:
    process.env.VERCEL_ENV === 'production'
      ? `https://jeffreys-blog.vercel.app/`
      : 'http://localhost:3000',
}
