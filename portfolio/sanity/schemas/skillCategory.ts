export default {
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    { name: 'label', title: 'Category Name', type: 'string', description: 'e.g. "Operations", "Data Analysis Applied to Ops"' },
    { name: 'colorHex', title: 'Accent Color (hex)', type: 'string', description: 'e.g. #C77D3D' },
    { name: 'order', title: 'Display Order', type: 'number' },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Skill Name', type: 'string' },
          { name: 'level', title: 'Level (0-100)', type: 'number' },
        ],
      }],
    },
  ],
};
