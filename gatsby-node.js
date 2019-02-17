const path = require("path");
const { GraphQLString, GraphQLInt } = require("gatsby/graphql");
const config = require("./gatsby-config");

function getLocalePrefix(locale) {
  return locale === config.siteMetadata.defaultLocale ? "" : `/${locale}`;
}

function extractStudentFields(studentPath) {
  const relPath = path.relative(__dirname, studentPath);

  const match = relPath.match(
    /^people\/students\/([0-9]+)\/([^/]+)\/about(?:\.([^/]+))?\.md$/,
  );

  if (match == null) {
    throw new Error(
      `Bad student file path: expected \`people/students/{class}/{slug}/about{.locale}?.md\`, got \`${relPath}\`.`,
    );
  }

  const [_, class_, slug, locale = config.siteMetadata.defaultLocale] = match;

  if (!locales.has(locale)) {
    throw new Error(
      `Invalid locale \`${locale}\` in \`${relPath}\`. Valid locales are ${[
        ...locales,
      ]
        .map(locale => `\`${locale}\``)
        .join(", ")}.`,
    );
  }

  return {
    class: parseInt(class_, 10),
    slug,
    locale,
  };
}

function extractTeacherFields(teacherPath) {
  const relPath = path.relative(__dirname, teacherPath);

  const match = relPath.match(
    /^people\/teachers\/([^/]+)\/about(?:\.([^/]+))?\.md$/,
  );

  if (match == null) {
    throw new Error(
      `Bad teacher file path: expected \`people/teachers/{slug}/about{.locale}?.md\`, got \`${relPath}\`.`,
    );
  }

  const [_, slug, locale = config.siteMetadata.defaultLocale] = match;

  if (!locales.has(locale)) {
    throw new Error(
      `Invalid locale \`${locale}\` in \`${relPath}\`. Valid locales are ${[
        ...locales,
      ]
        .map(locale => `\`${locale}\``)
        .join(", ")}.`,
    );
  }

  return {
    slug,
    locale,
  };
}

const locales = new Set(config.siteMetadata.locales);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.yaml$/,
          use: "yaml-loader",
        },
      ],
    },
  });
};

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === "Student") {
    return {
      class: {
        type: GraphQLInt,
        resolve: source => {
          const { class: class_ } = extractStudentFields(
            source.fileAbsolutePath,
          );
          return class_;
        },
      },
      slug: {
        type: GraphQLString,
        resolve: source => {
          const { slug } = extractStudentFields(source.fileAbsolutePath);
          return slug;
        },
      },
      locale: {
        type: GraphQLString,
        resolve: source => {
          const { locale } = extractStudentFields(source.fileAbsolutePath);
          return locale;
        },
      },
    };
  } else if (type.name === "Teacher") {
    return {
      locale: {
        type: GraphQLString,
        resolve: source => {
          const { locale } = extractTeacherFields(source.fileAbsolutePath);
          return locale;
        },
      },
    };
  }

  return {};
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, createRedirect, deletePage } = actions;

  deletePage(page);

  // We want to declare the more specific redirects *before* the less specific
  // ones, so that they are correctly picked up in the generated _redirects
  // file. For instance:
  // /en/* => /en/404/
  // should go before
  // /* => /404/
  const localesSortedByInverseSpecificity = [...locales];
  localesSortedByInverseSpecificity.sort((a, b) => {
    if (getLocalePrefix(a).indexOf(getLocalePrefix(b)) === 0) {
      return -1;
    } else if (getLocalePrefix(b).indexOf(getLocalePrefix(a)) === 0) {
      return 1;
    }
    return 0;
  });

  for (const locale of localesSortedByInverseSpecificity) {
    let additionalProps = {};
    if (page.path.match(/\/404\/$/)) {
      additionalProps.matchPath = `${getLocalePrefix(locale)}/*`;
      createRedirect({
        fromPath: `${getLocalePrefix(locale)}/*`,
        toPath: `${getLocalePrefix(locale)}${page.path}index.html`,
        statusCode: 404,
      });
    }

    createPage({
      ...page,
      ...additionalProps,
      // Add locale prefix, remove trailing slash.
      path: `${getLocalePrefix(locale)}${page.path.replace(/\/$/, "")}`,
      context: {
        locale,
      },
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const classTemplate = path.resolve(__dirname, "src/templates/ClassPage.tsx");

  const studentTemplate = path.resolve(
    __dirname,
    "src/templates/StudentPage.tsx",
  );

  const students = await graphql(
    `
      {
        allStudent {
          edges {
            node {
              fileAbsolutePath
              class
              slug
            }
          }
        }
      }
    `,
  );

  if (students.errors) {
    throw new Error(
      `GraphQL query errors:\n${students.errors
        .map(error => error.toString())
        .join("\n")}.`,
    );
  }

  const classesByLocale = new Map();
  for (const { node } of students.data.allStudent.edges) {
    const { locale, class: class_, slug } = extractStudentFields(
      node.fileAbsolutePath,
    );
    let classes = classesByLocale.get(locale);
    if (classes == null) {
      classes = new Set();
      classesByLocale.set(locale, classes);
    }
    classes.add(class_);
    createPage({
      path: `${getLocalePrefix(locale)}/students/${class_}/${slug}`,
      component: studentTemplate,
      context: {
        locale,
        fileAbsolutePath: node.fileAbsolutePath,
      },
    });
  }

  for (const [locale, classes] of classesByLocale.entries()) {
    const prefix = getLocalePrefix(locale);
    for (const class_ of classes) {
      createPage({
        path: `${prefix}/students/${class_}`,
        component: classTemplate,
        context: {
          class: class_,
          locale,
        },
      });
    }

    const latestClass = Math.max(...classes);
    createPage({
      path: `${prefix}/students`,
      component: classTemplate,
      context: {
        class: latestClass,
        locale,
      },
    });
  }
};
