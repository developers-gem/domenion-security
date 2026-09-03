const fs = require('fs');
const path = require('path');

const inputPath = path.resolve('node_modules/bootstrap/dist/css/bootstrap.min.css');
const outputPath = path.resolve('src/pages/Admin/admin-bootstrap-scoped.css');

let css = fs.readFileSync(inputPath, 'utf8');

// Strip @charset if present
css = css.replace(/@charset\s+"UTF-8";?/gi, '');

// Prefixes to target Admin UI elements
const prefixes = ['.admin-layout', '.admin-login-page', '.modal'];

function prefixSelector(selectorStr) {
  const parts = selectorStr.split(',');
  const newParts = [];

  for (let part of parts) {
    part = part.trim();
    if (!part) continue;

    if (part.startsWith('@') || part === ':root' || part.startsWith('[data-bs-theme')) {
      newParts.push(part);
      continue;
    }

    if (part === 'html' || part === 'body') {
      prefixes.forEach(p => newParts.push(p));
      continue;
    }

    if (part.startsWith('body ')) {
      const rest = part.replace(/^body\s+/, '');
      prefixes.forEach(p => newParts.push(`${p} ${rest}`));
      continue;
    }

    prefixes.forEach(p => newParts.push(`${p} ${part}`));
  }

  return newParts.join(', ');
}

function scopeCSS(cssText) {
  let result = '';
  let i = 0;
  
  while (i < cssText.length) {
    if (cssText.startsWith('@media', i) || cssText.startsWith('@supports', i) || cssText.startsWith('@keyframes', i)) {
      const openBrace = cssText.indexOf('{', i);
      if (openBrace === -1) break;

      const mediaHeader = cssText.substring(i, openBrace).trim();
      result += mediaHeader + ' {\n';

      let braceCount = 1;
      let j = openBrace + 1;
      let innerContentStart = j;

      while (j < cssText.length && braceCount > 0) {
        if (cssText[j] === '{') braceCount++;
        else if (cssText[j] === '}') braceCount--;
        j++;
      }

      const innerCSS = cssText.substring(innerContentStart, j - 1);
      result += scopeCSS(innerCSS);
      result += '\n}\n';
      i = j;
    } else {
      const openBrace = cssText.indexOf('{', i);
      if (openBrace === -1) {
        result += cssText.substring(i);
        break;
      }

      const selectorStr = cssText.substring(i, openBrace).trim();
      const closeBrace = cssText.indexOf('}', openBrace);
      if (closeBrace === -1) break;

      const bodyStr = cssText.substring(openBrace + 1, closeBrace).trim();
      const scopedSelector = prefixSelector(selectorStr);

      result += `${scopedSelector} { ${bodyStr} }\n`;
      i = closeBrace + 1;
    }
  }

  return result;
}

const scopedCSS = scopeCSS(css);

const isolationOverrides = `
/* Extra Admin Component Overrides & Reset Safety */
.admin-layout a,
.admin-login-page a {
  text-decoration: none;
}

.admin-layout a:hover,
.admin-login-page a:hover {
  text-decoration: underline;
}

.admin-layout .btn,
.admin-login-page .btn {
  min-height: auto !important;
  font-family: inherit;
}

.admin-layout svg,
.admin-login-page svg {
  display: inline-block;
  vertical-align: middle;
}
`;

fs.writeFileSync(outputPath, scopedCSS + isolationOverrides, 'utf8');
console.log(`Scoped Bootstrap CSS successfully written to ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
