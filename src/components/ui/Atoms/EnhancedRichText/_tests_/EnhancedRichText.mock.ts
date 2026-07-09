// EnhancedRichText.mock.ts
export const htmlExternal = `
  <p>
    <a href="https://external.example.com/page">External Link</a>
  </p>
`;

export const htmlDownload = `
  <p>
    <a href="/-/media/library/documents/file.pdf">Download PDF</a>
  </p>
`;

export const htmlInternal = `
  <p>
    <a href="/about">Internal Link</a>
  </p>
`;

export const htmlImageWrapped = `
  <a href="https://example.com">
   
    <img alt="Image Link" src="https://edge.sitecorecloud.io/generalmill71f3-cmsplatforma33e-qa3c9f-a82a/media/Project/GMI/BoxTops/BTFE/bonus-and-sweepstakes/second-chance-sweepstakes/appleAppImage.png" alt="App Store Icon" height="100" width="150" />
  </a>
`;

export const htmlTable = `
  <table>
    <thead>
      <tr><th>Header A</th><th>Header B</th></tr>
    </thead>
    <tbody>
      <tr>
        <th>Row 1</th>
        <td>Cell 1</td>
        <td>Cell 2</td>
      </tr>
      <tr>
        <th>Row 2</th>
        <td>Cell 3</td>
        <td>Cell 4</td>
      </tr>
    </tbody>
  </table>
`;
