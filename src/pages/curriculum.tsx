import React, { useContext } from "react";
import Layout from "@/components/Layout";
import Meta from "@/components/Meta";
import { IntlContext } from "@/utils/IntlContext";

export default function CurriculumPage() {
  const intl = useContext(IntlContext);

  return (
    <>
      <Meta title={intl.formatMessage({ id: "curriculum_meta_title" })} />
      ???
    </>
  );
}
