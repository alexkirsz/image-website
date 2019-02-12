import path from "path";

export function onCreateWebpackConfig({ actions }: { actions: any }) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
}
