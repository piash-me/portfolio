export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'category', type: 'string', options: { list: ['Operations', 'BI', 'Automation'] } },
    { name: 'featuredImage', type: 'image', options: { hotspot: true } },
    { name: 'excerpt', type: 'text' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'code' }, { type: 'image' }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'status', type: 'string', options: { list: ['Draft', 'Published'] } },
    { name: 'seoTitle', type: 'string' },
    { name: 'seoDescription', type: 'text' },
  ],
};
