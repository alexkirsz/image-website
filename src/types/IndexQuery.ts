/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndexQuery
// ====================================================

export interface IndexQuery_allTeacher_edges_node_frontmatter_picture_childImageSharp_fixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

export interface IndexQuery_allTeacher_edges_node_frontmatter_picture_childImageSharp {
  __typename: "ImageSharp";
  fixed: IndexQuery_allTeacher_edges_node_frontmatter_picture_childImageSharp_fixed | null;
}

export interface IndexQuery_allTeacher_edges_node_frontmatter_picture {
  __typename: "File";
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: IndexQuery_allTeacher_edges_node_frontmatter_picture_childImageSharp | null;
}

export interface IndexQuery_allTeacher_edges_node_frontmatter {
  __typename: "frontmatter_4";
  firstName: string | null;
  lastName: string | null;
  website: string | null;
  picture: IndexQuery_allTeacher_edges_node_frontmatter_picture | null;
}

export interface IndexQuery_allTeacher_edges_node {
  __typename: "Teacher";
  /**
   * The id of this node.
   */
  id: string;
  frontmatter: IndexQuery_allTeacher_edges_node_frontmatter | null;
  html: string | null;
}

export interface IndexQuery_allTeacher_edges {
  __typename: "TeacherEdge";
  /**
   * The item at the end of the edge
   */
  node: IndexQuery_allTeacher_edges_node | null;
}

export interface IndexQuery_allTeacher {
  __typename: "TeacherConnection";
  /**
   * A list of edges.
   */
  edges: (IndexQuery_allTeacher_edges | null)[] | null;
}

export interface IndexQuery {
  /**
   * Connection to all Teacher nodes
   */
  allTeacher: IndexQuery_allTeacher | null;
}
