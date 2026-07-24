// From: https://medium.com/trabe/testing-css-modules-in-react-components-with-jest-enzyme-and-a-custom-modulenamemapper-8ff86c7d18a2
// Ensures that imported css modules are applied correctly in tests
const moduleCssMockProxy = new Proxy(
  {},
  {
    get: (_target, key: string) => key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`),
  }
);

export default moduleCssMockProxy;
