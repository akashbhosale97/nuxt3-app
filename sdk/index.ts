import Contentstack from 'contentstack';
const Stack = Contentstack.Stack({
  api_key: `${import.meta.env.VITE_CONTENTSTACK_API_KEY}`,
  delivery_token: `${import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN}`,
  environment: `${import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT}`,
});

export function getEntry() {
  return new Promise((resolve, reject) => {
    const Query = Stack.ContentType('page').Query();
    Query.toJSON()
      .find()
      .then(
        function success(result) {
          resolve(result[0]);
        },
        function error(err) {
          reject(err);
        }
      );
  });
}
