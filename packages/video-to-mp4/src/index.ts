import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
export default async function (files: FileList, params: any, onProgressMsg: (processMsg: string) => void) {
 try {
  onProgressMsg(`Loading tools, may take a few minutes, please wait.`);
  const ffmpeg = new FFmpeg();
  const baseURL = "https://task-assets.filesworkflow.com/libs/@ffmpeg/core@0.12.6/dist/esm"
  await ffmpeg.load({
   coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
   wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
   classWorkerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
  }
  );
  let result: File[] = [];
  ffmpeg.on("progress", (progress) => {
   onProgressMsg && onProgressMsg(`Processing file ${result.length + 1} of ${files.length} ... ${Math.ceil(progress.progress * 100)}%`);
  });
  for (let i = 0; i < files.length; i++) {
   const file = files[i];
   const fileType = file.type.split('/')[0];
   if (fileType !== 'video') {
    result.push(file);
    continue;
   }

   const ab = await file.arrayBuffer();
   await ffmpeg.writeFile(file.name, new Uint8Array(ab));
   const outputName = `${file.name}.output.mp4`;
   await ffmpeg.exec(["-i", file.name, "-vf", `scale=${(params.width && params.width !== "auto") ? params.width : "-1"}:${(params.height && params.height !== "auto") ? params.height : "-1"},setsar=1:1`, outputName]);
   const output = await ffmpeg.readFile(outputName);
   if (output.length === 0) {
    throw new Error("Failed to convert the file, Please check the input data or parameters.");
   }
   result.push(new File([output], outputName, { type: 'video/mp4' }));
  }
  ffmpeg.terminate();
  return result;

 } catch (e) {
  throw e;
 }
}
