import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const directoryName = path.dirname(fileURLToPath(import.meta.url));

// -------------------------------
const SECTIONS = ["name", "name", "name"];
// -------------------------------

/**
 * Creates a new HTML file for a given section in the "src/html/sections" directory.
 *
 * If the file already exists, it logs a message and resolves the promise.
 *
 * @param {String} section - The name of the section (e.g. "hero", "about", etc.)
 *
 * @returns {Promise<void>}
 */
function createHtmlFiles(section) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      directoryName,
      "src/html/sections",
      `${section}.html`,
    );

    if (fs.existsSync(filePath)) {
      console.log(
        `❌ The html file for the «${section}» section already exists`,
      );
      return resolve();
    }

    const content = `{% set s = ${section} %}

    <section class="{{s.id}} section">
      <div class="container">
        <h2 class="section-title">{{s.title}}</h2>

      </div>
    </section>
    `;

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.log("❌ Error in createHtmlFiles:");
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * Creates a new CSS file for a given section in the "src/css/sections" directory.
 *
 * If the file already exists, it logs a message and resolves the promise.
 *
 * @param {String} section - The name of the section (e.g., "hero", "about", etc.)
 *
 * @returns {Promise<void>}
 */

function createCssFiles(section) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      directoryName,
      "src/css/sections",
      `${section}.css`,
    );

    if (fs.existsSync(filePath)) {
      console.log(`❌ The css file for the «${section}» already exists`);
      return resolve();
    }

    const content = `.${section} {
    }`;

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.log("❌ Error in createCssFiles:");
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * Generates html and css files for sections defined in the `SECTIONS` array.
 *
 * The script will create the following files:
 *   - `src/html/sections/*.html` - html files for each section
 *   - `src/css/sections/*.css` - css files for each section
 *
 * The script also modifies the following files to include the new sections:
 *   - `src/html/pages/index.html` - adds the html includes for each section
 *   - `src/css/main.css` - adds the css imports for each section
 *
 * If any of the files already exist, the script will log a message and not overwrite the file.
 */
(async function createSectionFiles() {
  try {
    const uniqueSections = [...new Set(SECTIONS)];

    if (uniqueSections.length !== SECTIONS.length) {
      throw new Error("❌ Duplicate section names found in «SECTIONS» array");
    }

    await Promise.all(
      SECTIONS.map((section) => {
        return Promise.all([createHtmlFiles(section), createCssFiles(section)]);
      }),
    );

    const indexHtmlPath = path.join(directoryName, "src/html/pages/index.html");
    let addIncludeString = fs.readFileSync(indexHtmlPath, "utf8");
    const sectionsForInclude = SECTIONS.map(
      (section) => `{% include 'sections/${section}.html' %}`,
    ).join("\n<!--  -->\n");
    addIncludeString = addIncludeString.replace(
      "<!-- include html sections here -->",
      sectionsForInclude,
    );
    fs.writeFileSync(indexHtmlPath, addIncludeString, "utf8");

    const mainCssPath = path.join(directoryName, "src/css/main.css");
    let addImportString = fs.readFileSync(mainCssPath, "utf8");
    const sectionsForImport = SECTIONS.map(
      (section) => `@import "./sections/${section}.css";`,
    ).join("\n");
    addImportString = addImportString.replace(
      "/* <!-- import css sections here --> */",
      sectionsForImport,
    );
    fs.writeFileSync(mainCssPath, addImportString, "utf8");

    console.log(
      "✅ All files for sections have been successfully created and connected",
    );
  } catch (err) {
    console.log("❌ Error in createSectionFiles:");
    console.error(err);
  }
})();
