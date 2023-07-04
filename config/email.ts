export const emailConfig = {
  from: 'hi@cali.so',
  baseUrl:
    process.env.VERCEL_ENV === 'production'
      ? `https://jeffreys-blog.vercel.app/`
      : 'http://localhost:3000',
}
