/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TeacherFragment
// ====================================================

export interface TeacherFragment_frontmatter_picture_childImageSharp_fixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

export interface TeacherFragment_frontmatter_picture_childImageSharp {
  __typename: "ImageSharp";
  fixed: TeacherFragment_frontmatter_picture_childImageSharp_fixed | null;
}

export interface TeacherFragment_frontmatter_picture {
  __typename: "File";
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: TeacherFragment_frontmatter_picture_childImageSharp | null;
}

export interface TeacherFragment_frontmatter {
  __typename: "frontmatter_4";
  firstName: string | null;
  lastName: string | null;
  website: string | null;
  picture: TeacherFragment_frontmatter_picture | null;
}

export interface TeacherFragment {
  __typename: "Teacher";
  /**
   * The id of this node.
   */
  id: string;
  frontmatter: TeacherFragment_frontmatter | null;
  html: string | null;
}
