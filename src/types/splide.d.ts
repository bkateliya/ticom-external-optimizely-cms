// We want to point to the types/index.d.ts file in the @splidejs/react-splide package
// for the type checking, but not for the actual build.
declare module '@splidejs/react-splide' {
  export * from 'node_modules/@splidejs/react-splide/dist/types/index';
}
