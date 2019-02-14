/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StudentPageQuery
// ====================================================

export interface StudentPageQuery_student_frontmatter_resume {
  __typename: "File";
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
}

export interface StudentPageQuery_student_frontmatter_picture_childImageSharp_fixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
  srcSet: string | null;
}

export interface StudentPageQuery_student_frontmatter_picture_childImageSharp {
  __typename: "ImageSharp";
  fixed: StudentPageQuery_student_frontmatter_picture_childImageSharp_fixed | null;
}

export interface StudentPageQuery_student_frontmatter_picture {
  __typename: "File";
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: StudentPageQuery_student_frontmatter_picture_childImageSharp | null;
}

export interface StudentPageQuery_student_frontmatter_background_childImageSharp_fluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string | null;
}

export interface StudentPageQuery_student_frontmatter_background_childImageSharp {
  __typename: "ImageSharp";
  fluid: StudentPageQuery_student_frontmatter_background_childImageSharp_fluid | null;
}

export interface StudentPageQuery_student_frontmatter_background {
  __typename: "File";
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: StudentPageQuery_student_frontmatter_background_childImageSharp | null;
}

export interface StudentPageQuery_student_frontmatter {
  __typename: "frontmatter_3";
  firstName: string | null;
  lastName: string | null;
  theme: string | null;
  contrast: boolean | null;
  headline: string | null;
  website: string | null;
  twitter: string | null;
  linkedin: string | null;
  github: string | null;
  resume: StudentPageQuery_student_frontmatter_resume | null;
  picture: StudentPageQuery_student_frontmatter_picture | null;
  background: StudentPageQuery_student_frontmatter_background | null;
}

export interface StudentPageQuery_student {
  __typename: "Student";
  frontmatter: StudentPageQuery_student_frontmatter | null;
  html: string | null;
}

export interface StudentPageQuery {
  student: StudentPageQuery_student | null;
}

export interface StudentPageQueryVariables {
  fileAbsolutePath: string;
}
