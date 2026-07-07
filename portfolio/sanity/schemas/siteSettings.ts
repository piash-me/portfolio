export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string' },
    { name: 'currentTitle', title: 'Current Job Title (exact)', type: 'string', description: 'The literal title line, e.g. "E-commerce Operations Team Leader | Last-Mile Delivery Operations | ..."' },
    { name: 'company', title: 'Current Company', type: 'string' },

    // Hero section
    { name: 'heroEyebrow', title: 'Hero Small Label', type: 'string', description: 'e.g. "OPERATIONS, IMPROVED THROUGH DATA"' },
    { name: 'heroHeadline', title: 'Hero Headline', type: 'string' },
    { name: 'heroSubtext', title: 'Hero Paragraph', type: 'text' },
    { name: 'roleTags', title: 'Rotating Role Titles', type: 'array', of: [{ type: 'string' }], description: 'The words that type/rotate under the headline' },
    { name: 'badgeText', title: 'Photo Badge Text', type: 'string', description: 'e.g. "OPEN TO DATA ANALYST ROLES"' },
    { name: 'photo', title: 'Photo', type: 'image' },
    { name: 'cvFile', title: 'CV File', type: 'file' },

    // About / Timeline
    { name: 'aboutHeadline', title: 'About Section Headline', type: 'string' },
    {
      name: 'timeline',
      title: 'Career Timeline',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', title: 'Year / Label', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'company', title: 'Company / Scope', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    },

    // Stats
    {
      name: 'stats',
      title: 'Stat Counters',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'value', title: 'Number', type: 'number' },
          { name: 'suffix', title: 'Suffix (e.g. +, %)', type: 'string' },
        ],
      }],
    },

    // Contact
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Add, remove, or reorder any social platform — the site renders whatever is in this list.',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', title: 'Platform', type: 'string', options: { list: ['LinkedIn', 'GitHub', 'Facebook', 'Instagram', 'X (Twitter)', 'WhatsApp', 'YouTube', 'TikTok', 'Other'] } },
          { name: 'url', title: 'URL', type: 'url' },
          { name: 'label', title: 'Custom Label (only if "Other")', type: 'string' },
        ],
      }],
    },

    // SEO
    { name: 'seoTitle', title: 'Default SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'Default SEO Description', type: 'text' },
    { name: 'ogImage', title: 'Social Share Image', type: 'image' },
  ],
};
