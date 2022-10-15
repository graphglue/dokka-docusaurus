export default `
/*
 * Custom Dokka styles
 */
code .token {
    white-space: pre;
}

/**
 * Styles based on webhelp's prism.js styles
 * Changes:
 * - Since webhelp's styles are in .pcss, they use nesting which is not achievable in native CSS
 *   so nested css blocks have been unrolled (like dark theme).
 * - Webhelp uses "Custom Class" prism.js plugin, so all of their prism classes are prefixed with "--prism".
 *   Dokka doesn't seem to need this plugin at the moment, so all "--prism" prefixes have been removed.
 * - Removed all styles related to "pre" and "code" tags. Kotlinlang's resulting styles are so spread out and complicated
 *   that it's difficult to gather in one place. Instead use code styles defined in the main Dokka styles,
 *   which at the moment looks fairly similar.
 *
 * Based on prism.js default theme
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: var(--dokka-comment);
}

.token.punctuation {
	color: var(--dokka-punctuation);
}

.token.namespace {
	opacity: 0.7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
	color: var(--dokka-property);
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
	color: var(--dokka-string);
}

.token.operator,
.token.entity,
.token.url,
.style .token.string {
	color: var(--dokka-operator);
}

.token.atrule,
.token.attr-value,
.token.keyword {
	font-size: inherit; /* to override .keyword */
	color: var(--dokka-keyword);
}

.token.function {
	color: var(--dokka-function);
}

.token.class-name {
	color: var(--dokka-class-name);
}

.token.regex,
.token.important,
.token.variable {
	color: var(--dokka-variable);
}

.token.important,
.token.bold {
	font-weight: bold;
}
.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}

.token.operator {
	background: none;
}

`