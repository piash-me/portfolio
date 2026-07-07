export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'heroHeadline', type: 'string' },
    { name: 'heroSubtext', type: 'text' },
    { name: 'cvFile', type: 'file' },
    { name: 'photo', type: 'image' },
    { name: 'email', type: 'string' },
    { name: 'location', type: 'string' },
    { name: 'linkedin', type: 'url' },
    { name: 'github', type: 'url' },
  ],
};
