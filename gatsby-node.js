const path = require("path");
const {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLBoolean,
} = require("gatsby/graphql");
const { getType: getFileType } = require("gatsby/dist/schema/types/type-file");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Student") {
    const relPath = path.relative(__dirname, node.fileAbsolutePath);
    const match = relPath.match(
      /^people\/students\/([0-9]+)\/([^/]*)\/about.md$/,
    );
    if (match == null) {
      throw new Error(
        `Bad student file path: expected \`people/students/{year}/{slug}/about.md\`, got \`${relPath}\`.`,
      );
    }
    const [_, classYear, slug] = match;
    createNodeField({
      node,
      name: "relativePath",
      value: path.relative(__dirname, node.fileAbsolutePath),
    });
    createNodeField({
      node,
      name: "class",
      value: parseInt(classYear, 10),
    });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === "Student") {
    return {
      fields: {
        // Defining the field types ourselves avoids Gatsby inferring the wrong
        // type. For instance, a Date for the class when we really want a string.
        type: new GraphQLObjectType({
          name: "StudentFields",
          fields: {
            relativePath: { type: GraphQLString },
            class: { type: GraphQLInt },
            slug: { type: GraphQLString },
          },
        }),
      },
    };
  }

  return;
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
              fields {
                class
                slug
              }
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

  const classes = new Set();
  for (const { node } of students.data.allStudent.edges) {
    classes.add(node.fields.class);
    createPage({
      path: `/students/${node.fields.class}/${node.fields.slug}`,
      component: studentTemplate,
      context: {
        fileAbsolutePath: node.fileAbsolutePath,
      },
    });
  }

  for (const class_ of classes) {
    createPage({
      path: `/students/${class_}`,
      component: classTemplate,
      context: {
        class: class_,
      },
    });
  }

  const latestClass = Math.max(...classes);
  createPage({
    path: `/students`,
    component: classTemplate,
    context: {
      class: latestClass,
    },
  });
};
