import JSZip from 'jszip';

export default async function (files: FileList, params: any, onProgressMsg: (processMsg: string) => void) {
 const zip = new JSZip();
 const filesArray = Array.from(files);
 filesArray.forEach(file => {
  zip.file(file.name, file);
 });
 const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: parseInt(params.level ?? 9) } }, metadata => {
  onProgressMsg(`Compressing...(${metadata.percent.toFixed(2)}%)`);
 });
 const zipFile = new File([blob], 'compressed.zip', { type: 'application/zip' });
 return [zipFile];
}