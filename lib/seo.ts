export const seo = {
  title: 'Jeffrey | 彩猫, 黑猫',
  description:
    'Jeffrey, 彩猫, 黑猫',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://jeffreys-blog.vercel.app/'
      : 'http://localhost:3000'
  ),
} as const
