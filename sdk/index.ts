import Contentstack from 'contentstack';

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  // jsonRtePath: string[] | undefined;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  // jsonRtePath: string[] | undefined;
};

const Stack = Contentstack.Stack({
  api_key: `${import.meta.env.VITE_CONTENTSTACK_API_KEY}`,
  delivery_token: `${import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN}`,
  environment: `${import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT}`,
});

const getter = {
  getEntry({ contentTypeUid, referenceFieldPath }: GetEntry) {
    return new Promise((resolve, reject) => {
      const Query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) Query.includeReference(referenceFieldPath);
      Query.toJSON()
        .find()
        .then(
          (result) => resolve(result[0]),
          (error) => reject(error)
        );
    });
  },
  getEntryByUrl({
    contentTypeUid,
    entryUrl,
    referenceFieldPath,
  }: GetEntryByUrl) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where('url', `${entryUrl}`).find();
      data.then(
        (result) => resolve(result[0]),
        (error) => reject(error)
      );
    });
  },
};

export default getter;
