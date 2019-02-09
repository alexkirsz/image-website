import React from "react";

import Meta from "@/components/Meta";
import Layout from "@/components/Layout";
import AnimatedLogo from "@/components/AnimatedLogo";

const styles = require("./index.module.css");

export default function IndexPage() {
  return (
    <Layout>
      <Meta title="Accueil" />
      <div className={styles.landing}>
        <AnimatedLogo className={styles.logo} />
        <p className={styles.welcome}>
          Bienvenue sur le site de la majeure IMAGE !
        </p>
      </div>
    </Layout>
  );
}
