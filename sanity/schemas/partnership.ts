import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'partnership',
  title: 'Partnerships',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'partnerType',
      title: 'Partnership Type',
      type: 'string',
      options: {
        list: [
          { title: 'Gallery', value: 'gallery' },
          { title: 'Designer', value: 'designer' },
          { title: 'Wholesale', value: 'wholesale' },
          { title: 'Export', value: 'export' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Partner Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Text',
      type: 'string',
      description: 'e.g., "Visit Gallery", "View Collection"',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'partnerType',
      media: 'logo',
    },
  },
});
