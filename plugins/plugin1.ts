import type { Plugin } from "vite";

const plugin1 = ({port}): Plugin => {
  return {
    name: "test-my-plugin",
    // 用户的原始配置
    config(config, env) {
        // console.log("🌖 ~ file: plugin1.ts:7 ~ env:", env);
        // console.log("🌖 ~ file: plugin1.ts:7 ~ config:", config);
    },
    // vite包装过的最终配置
    configResolved(config) {
        // console.log("🌖 ~ file: plugin1.ts:11 ~ config:", config);
        config.server.port=port;
    },
    transformIndexHtml(html,ctx){
        // console.log("🌖 ~ file: plugin1.ts:16 ~ ctx:", ctx);
        // console.log("🌖 ~ file: plugin1.ts:16 ~ html:", html);
        return html.replace(
            /<title>(.*?)<\/title>/,
            '<title>伏翎的页面</title>'
        )
    }
  };
};
export default plugin1;
