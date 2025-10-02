declare module 'react' {
  interface CSSProperties {
    backfaceVisibility?: string;
    webkitTransform?: string;
    webkitPerspective?: string;
  }
}

// Extend CSSStyleDeclaration for direct DOM manipulation
interface CSSStyleDeclaration {
  backfaceVisibility: string;
  webkitTransform: string;
  webkitPerspective: string;
}

interface HTMLElement {
  _rbsplitInstance?: any; // Define the custom property
}
