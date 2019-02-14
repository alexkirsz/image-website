/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClassPageQuery
// ====================================================

export interface ClassPageQuery_allStudent_edges_node_fields {
  __typename: "StudentFields";
  slug: string | null;
}

export interface ClassPageQuery_allStudent_edges_node_frontmatter_picture_childImageSharp_fixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

export interface ClassPageQuery_allStudent_edges_node_frontmatter_picture_childImageSharp {
  __typename: "ImageSharp";
  fixed: ClassPageQuery_allStudent_edges_node_frontmatter_picture_childImageSharp_fixed | null;
}

export interface ClassPageQuery_allStudent_edges_node_frontmatter_picture {
  __typename: "File";
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: ClassPageQuery_allStudent_edges_node_frontmatter_picture_childImageSharp | null;
}

export interface ClassPageQuery_allStudent_edges_node_frontmatter {
  __typename: "frontmatter_3";
  firstName: string | null;
  lastName: string | null;
  headline: string | null;
  picture: ClassPageQuery_allStudent_edges_node_frontmatter_picture | null;
}

export interface ClassPageQuery_allStudent_edges_node {
  __typename: "Student";
  /**
   * The id of this node.
   */
  id: string;
  fields: ClassPageQuery_allStudent_edges_node_fields | null;
  frontmatter: ClassPageQuery_allStudent_edges_node_frontmatter | null;
}

export interface ClassPageQuery_allStudent_edges {
  __typename: "StudentEdge";
  /**
   * The item at the end of the edge
   */
  node: ClassPageQuery_allStudent_edges_node | null;
}

export interface ClassPageQuery_allStudent {
  __typename: "StudentConnection";
  /**
   * A list of edges.
   */
  edges: (ClassPageQuery_allStudent_edges | null)[] | null;
}

export interface ClassPageQuery {
  /**
   * Connection to all Student nodes
   */
  allStudent: ClassPageQuery_allStudent | null;
}

export interface ClassPageQueryVariables {
  class: number;
}
