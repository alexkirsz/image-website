import React from "react";

import Meta from "@/components/Meta";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";

const styles = require("./index.module.css");

export default function IndexPage() {
  return (
    <Layout>
      <Meta title="Accueil" />
      <div className={styles.landing}>
        <Logo />
        <p className={styles.welcome}>
          Bienvenue sur le site de la majeure IMAGE !
        </p>
      </div>
    </Layout>
  );
}
