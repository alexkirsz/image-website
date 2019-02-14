/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetaQuery
// ====================================================

export interface MetaQuery_site_siteMetadata {
  __typename: "siteMetadata_2";
  title: string | null;
}

export interface MetaQuery_site {
  __typename: "Site";
  siteMetadata: MetaQuery_site_siteMetadata | null;
}

export interface MetaQuery {
  site: MetaQuery_site | null;
}
