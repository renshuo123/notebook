//vite.config.js
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";

// docs/.vitepress/config.js

export default defineConfig({
    ignoreDeadLinks: true,
});


// export default defineConfig({
//     base: "./",
//     // server: {
//     //     port: 3000,
//     //     hmr: false,
//     //     disableHostCheck: true,
//     // },
//     // plugins: [
//     //     SearchPlugin({
//     //         encode: false,
//     //         tokenize: "full", // 解决汉字不能多个输入
//     //     }),
//     // ],
// });

