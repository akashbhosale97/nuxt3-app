import getter from '~/sdk';

export const getHeaderRes = async () => {
  const response: any = await getter.getEntry({
    contentTypeUid: 'header',
    referenceFieldPath: ['navigation_menu.page_reference'],
  });
  return response[0];
};

export const getFooterRes = async () => {
  const response: any = await getter.getEntry({
    contentTypeUid: 'footer',
    referenceFieldPath: undefined,
  });
  return response[0];
};

export const getAllEntries = async () => {
  const response: any = await getter.getEntry({
    contentTypeUid: 'page',
    referenceFieldPath: undefined,
  });
  return response[0];
};

export const getPageRes = async (entryUrl: string) => {
  const response: any = await getter.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
  });
  return response[0];
};

export const getBlogListRes = async () => {
  const response: any = await getter.getEntry({
    contentTypeUid: 'blog_post',
    referenceFieldPath: ['author', 'related_post'],
  });
  return response[0];
};

export const getBlogPostRes = async (entryUrl: string) => {
  const response: any = await getter.getEntryByUrl({
    contentTypeUid: 'blog_post',
    entryUrl,
    referenceFieldPath: ['author', 'related_post'],
  });
  return response[0];
};
