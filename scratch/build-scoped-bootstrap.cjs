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
/* ==========================================================================
   ADMIN BOOTSTRAP ISOLATION & TAILWIND POLARITY OVERRIDES
   Defeats global Tailwind theme token bleeding into Admin components/modals.
   ========================================================================== */

.admin-layout, .admin-login-page, .modal {
  --bs-secondary-rgb: 108, 117, 125;
  --bs-body-color: #212529;
  --bs-body-bg: #fff;
  --bs-link-color: #0d6efd;
}

.admin-layout a,
.admin-login-page a {
  text-decoration: none;
}

.admin-layout a:hover,
.admin-login-page a:hover {
  text-decoration: underline;
}

.admin-layout .btn,
.admin-login-page .btn,
.modal .btn {
  min-height: auto !important;
  font-family: inherit;
}

.admin-layout svg,
.admin-login-page svg,
.modal svg {
  display: inline-block;
  vertical-align: middle;
}

/* Enforce Bootstrap Neutral Palette over Tailwind's dark blue secondary tokens */
.admin-layout .text-secondary,
.admin-login-page .text-secondary,
.modal .text-secondary {
  color: #6c757d !important;
}

.admin-layout .bg-secondary,
.admin-login-page .bg-secondary,
.modal .bg-secondary {
  background-color: #6c757d !important;
}

.admin-layout .border-secondary,
.admin-login-page .border-secondary,
.modal .border-secondary {
  border-color: #6c757d !important;
}

.admin-layout .text-black,
.admin-login-page .text-black,
.modal .text-black {
  color: #000000 !important;
}

.admin-layout .text-dark,
.admin-login-page .text-dark,
.modal .text-dark {
  color: #212529 !important;
}

.admin-layout .bg-white,
.admin-login-page .bg-white,
.modal .bg-white {
  background-color: #ffffff !important;
}

.admin-layout .text-white,
.admin-login-page .text-white,
.modal .text-white {
  color: #ffffff !important;
}

.admin-layout .bg-dark,
.admin-login-page .bg-dark,
.modal .bg-dark {
  background-color: #212529 !important;
}

.admin-layout .text-danger,
.admin-login-page .text-danger,
.modal .text-danger {
  color: #dc3545 !important;
}

.admin-layout .bg-danger,
.admin-login-page .bg-danger,
.modal .bg-danger {
  background-color: #dc3545 !important;
}

/* Form Controls & Labels in Admin Modals & Pages */
.admin-layout .form-label,
.admin-login-page .form-label,
.modal .form-label {
  margin-bottom: 0.5rem !important;
  display: inline-block !important;
  font-weight: 700 !important;
  font-size: 0.875rem !important;
  line-height: 1.4 !important;
}

.admin-layout .form-control,
.admin-login-page .form-control,
.modal .form-control,
.admin-layout .form-select,
.admin-login-page .form-select,
.modal .form-select {
  display: block !important;
  width: 100% !important;
  padding: 0.375rem 0.75rem !important;
  font-size: 0.95rem !important;
  line-height: 1.5 !important;
  border-radius: 0.375rem !important;
}

.admin-layout .form-control.bg-secondary.bg-opacity-25,
.modal .form-control.bg-secondary.bg-opacity-25,
.admin-layout .form-select.bg-secondary.bg-opacity-25,
.modal .form-select.bg-secondary.bg-opacity-25 {
  background-color: rgba(108, 117, 125, 0.15) !important;
  color: #000000 !important;
  border-color: #ced4da !important;
}

.admin-layout .modal-dialog,
.modal .modal-dialog {
  margin: 1.75rem auto !important;
  display: flex !important;
  align-items: center !important;
  min-height: calc(100% - 3.5rem) !important;
}

.admin-layout .modal-content,
.modal .modal-content {
  border-radius: 0.5rem !important;
  overflow: hidden !important;
}

.admin-layout .modal-header,
.modal .modal-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 1rem 1.5rem !important;
}

.admin-layout .modal-body,
.modal .modal-body {
  padding: 1.5rem !important;
  max-height: 80vh !important;
  overflow-y: auto !important;
}

.admin-layout .modal-footer,
.modal .modal-footer {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 0.75rem !important;
  padding: 1rem 1.5rem !important;
}

.admin-layout table,
.modal table {
  width: 100% !important;
  margin-bottom: 1rem !important;
  vertical-align: middle !important;
  border-collapse: collapse !important;
}

.admin-layout th,
.modal th {
  padding: 0.75rem 1rem !important;
  font-size: 0.75rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  background-color: #fafafa !important;
  border-bottom: 1px solid #e5e7eb !important;
}

.admin-layout td,
.modal td {
  padding: 0.75rem 1rem !important;
  vertical-align: middle !important;
  border-bottom: 1px solid #f1f5f9 !important;
}
`;

fs.writeFileSync(outputPath, scopedCSS + isolationOverrides, 'utf8');
console.log(`Scoped Bootstrap CSS successfully written to ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
