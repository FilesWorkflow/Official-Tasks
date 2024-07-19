import heic2any from "heic2any";

export default async function (fileList: FileList, params?: any): Promise<FileList> {
 const files = Array.from(fileList);
 for (let i = 0; i < files.length; i++) {
  if (!files[i].type.startsWith('image/')) {
   throw new Error(`Unsupported file type: ${files[i].name}`);
  }
 }
 const results: File[] = [];
 for (let i = 0; i < files.length; i++) {
  let file = files[i];
  if (file.type === 'image/heic' || file.type === 'image/heif') {
   const pngBlob = await heic2any({
    blob: file,
    toType: "image/png",
    quality: 1
   }) as Blob;
   file = new File([pngBlob], `${file.name.split('.')[0]}.png`, { type: 'image/png' });
  }
  try {
   const bitmap = await createImageBitmap(file);
   const canvas = document.createElement('canvas');
   canvas.width = bitmap.width;
   canvas.height = bitmap.height;

   const ctx = canvas.getContext('2d');
   if (!ctx) {
    throw new Error('Could not get 2D context from canvas.');
   }

   ctx.drawImage(bitmap, 0, 0);

   const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/webp', parseFloat(params.quality ?? "0.8"));
   });

   if (!blob) {
    throw new Error('Failed to create WebP blob');
   }

   file = new File([blob], `${file.name.split('.')[0]}.webp`, { type: 'image/webp' });
   results.push(file);
  } catch (error) {
   console.error('Error converting image:', error);
   throw error;
  }
 }
 return results as unknown as FileList;
};

