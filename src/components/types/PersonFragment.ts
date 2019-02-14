/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PersonFragment
// ====================================================

export interface PersonFragment_fields {
  __typename: "StudentFields";
  slug: string | null;
}

export interface PersonFragment_frontmatter_picture_childImageSharp_fixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

export interface PersonFragment_frontmatter_picture_childImageSharp {
  __typename: "ImageSharp";
  fixed: PersonFragment_frontmatter_picture_childImageSharp_fixed | null;
}

export interface PersonFragment_frontmatter_picture {
  __typename: "File";
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: PersonFragment_frontmatter_picture_childImageSharp | null;
}

export interface PersonFragment_frontmatter {
  __typename: "frontmatter_3";
  firstName: string | null;
  lastName: string | null;
  headline: string | null;
  picture: PersonFragment_frontmatter_picture | null;
}

export interface PersonFragment {
  __typename: "Student";
  /**
   * The id of this node.
   */
  id: string;
  fields: PersonFragment_fields | null;
  frontmatter: PersonFragment_frontmatter | null;
}
