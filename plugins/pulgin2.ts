import type { Plugin } from "vite";
import path from "path";
import ModuleMapper from "./mapper";
import { buildTree } from "./tree";

interface IOptions {
  output?: string;
  title?: string;
  root?: string;
}
interface ILengthOptions {
  id: string;
  length: string;
  code: string;
}
const DEFAULT_FILE_NAME = "visualizer.html";
const DEFAULT_TITLE = "vite-plugin-visualizer";

const getLength = ({ id, length, code }: ILengthOptions) => {
  const isEmpty = code === null || code === "";
  return {
    id,
    length: isEmpty ? length : Buffer.byteLength(code, "utf-8"),
  };
};
const VitePluginVisualizer = (options: IOptions = {}): Plugin => {
  let startTime = 0;
  return {
    name: "vite-plugin-visualizer",
    buildStart() {
      // 记录开始时间
      startTime = Date.now();
      console.log(startTime);
    },
    generateBundle(_, outputBundle: Record<string, any>) {
      console.log(outputBundle);
      const outputFile = options.output ?? DEFAULT_FILE_NAME;
      const title = options.title ?? DEFAULT_TITLE;
      const root = options.root ?? process.cwd();
      const roots:any[] = [];
      const mapper = new ModuleMapper(root);


      let assetCount = 0;
      let chunkCount = 0;
      let packageCount = 0;
      let totalSize = 0;
      let jsSize = 0;
      let cssSize = 0;
      let imgSize = 0;
      let htmlSize = 0;
      let fontSize = 0;
      const tableData: any[] = [];

      for (const [bundleId, bundle] of Object.entries(outputBundle)) {
        const fileType = path.extname(bundle.fileName).slice(1);
        const size = bundle?.code?.length || bundle?.source?.length;
        if (fileType === "js") {
          jsSize += size;
        }
        if (fileType === "css") {
          cssSize += size;
        }
        if (["jpg", "jpeg", "png", "gif", "svg"].includes(fileType)) {
          imgSize += size;
        }
        if (fileType === "html") {
          htmlSize += size;
        }
        if (["woff", "woff2", "ttf", "otf"].includes(fileType)) {
          fontSize += size;
        }
        const dependencyCount = Object.keys(bundle?.modules ?? []).length;
        totalSize += size;
        tableData.push({
          size: Number(size / 1000).toFixed(2),
          fileType,
          fileName: bundle.fileName,
          dependencyCount,
        });
        if (bundle.type == "chunk") {
          packageCount += dependencyCount;

          const modules = Object.entries(bundle.modules).map(
            ([id, { renderedLength, code }]: any) =>
              getLength({ id, length: renderedLength, code })
          );
          const tree = buildTree(bundleId, modules, mapper);

          if (tree.children.length === 0) {
            const bundleSizes = getLength({
              id: bundleId,
              length: bundle.code.length,
              code: bundle.code,
            });
            const facadeModuleId =
              bundle.facadeModuleId ?? `${bundleId}-unknown`;
            const bundleUID = mapper.setNodePart(
              bundleId,
              facadeModuleId,
              bundleSizes
            );
            const leaf = { name: bundleId, uid: bundleUID };
            roots.push(leaf);
          } else {
            roots.push(tree);
          }
        }

        chunkCount = Object.keys(outputBundle).length;
      }
      const outputBundlestats = {
        title,
        bundleObj: {
          root,
          time: (Date.now() - startTime) / 1000 + "s",
          startTime: new Date().toLocaleString(),
          totalSize: Number(totalSize / 1000).toFixed(2),
          assetCount,
          chunkCount,
          packageCount,
          jsSize: Number(jsSize / 1000).toFixed(2),
          cssSize: Number(cssSize / 1000).toFixed(2),
          imageSize: Number(imgSize / 1000).toFixed(2),
          htmlSize: Number(htmlSize / 1000).toFixed(2),
          fontSize: Number(fontSize / 1000).toFixed(2),
        },
        tableData,
        treeData: roots,
      };
      console.log(outputBundlestats);
    },
  };
};
export default VitePluginVisualizer;
