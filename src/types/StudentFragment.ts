/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: StudentFragment
// ====================================================

export interface StudentFragment_frontmatter_picture_childImageSharp_fixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

export interface StudentFragment_frontmatter_picture_childImageSharp {
  __typename: "ImageSharp";
  fixed: StudentFragment_frontmatter_picture_childImageSharp_fixed | null;
}

export interface StudentFragment_frontmatter_picture {
  __typename: "File";
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: StudentFragment_frontmatter_picture_childImageSharp | null;
}

export interface StudentFragment_frontmatter {
  __typename: "frontmatter_3";
  firstName: string | null;
  lastName: string | null;
  headline: string | null;
  picture: StudentFragment_frontmatter_picture | null;
}

export interface StudentFragment {
  __typename: "Student";
  /**
   * The id of this node.
   */
  id: string;
  slug: string | null;
  frontmatter: StudentFragment_frontmatter | null;
}
