import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next v16 সরাসরি flat config এক্সপোর্ট করে, তাই আর
 * FlatCompat লাগে না (FlatCompat দিয়ে চালাতে গেলে ESLint 9-এ
 * "Converting circular structure to JSON" এরর দেয়)।
 */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**", "build/**"] },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
