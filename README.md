# dokka-docusaurus

Helper component meant to be used with the output of https://github.com/graphglue/dokka-html-mdx-transform

Compatible with Dokka 1.7.20

Css variables can be used to style the code

Sample configuration:
```css
:root {
  --dokka-comment: #8c8c8c;
  --dokka-punctuation: #999;
  --dokka-property: #905;
  --dokka-string: #067d17;
  --dokka-operator: #9a6e3a;
  --dokka-keyword: #07a;
  --dokka-function: #DD4A68;
  --dokka-class-name: #000;
  --dokka-variable: #871094;
}

[data-theme='dark'] {
  --dokka-comment: #808080;
  --dokka-punctuation: #a9b7c6;
  --dokka-property: #9876aa;
  --dokka-string: #690;
  --dokka-operator: #9a6e3a;
  --dokka-keyword: #cc7832;
  --dokka-function: #ffc66d;
  --dokka-class-name: #a9b7c6;
  --dokka-variable: #9876aa;
}
```