import React from "react";

import AnimatedLogo from "@/components/AnimatedLogo";

const styles = require("./Logo.module.css");

export default function Logo() {
  return (
    <div className={styles.container}>
      <AnimatedLogo className={styles.logo} />
      <div className={styles.title}>IMAGE</div>
    </div>
  );
}
