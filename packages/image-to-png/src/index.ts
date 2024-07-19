import heic2any from "heic2any";

export default async function (files: FileList, params?: any): Promise<FileList> {
 for (let i = 0; i < files.length; i++) {
  if (!files[i].type.startsWith('image/')) {
   throw new Error(`Unsupported file type: ${files[i].name}`);
  }
 }
 const results: File[] = [];
 for (let i = 0; i < files.length; i++) {
  const file = files[i];

  if (file.type === 'image/heic' || file.type === 'image/heif') {
   const pngBlob = await heic2any({
    blob: file,
    toType: "image/png"
   }) as Blob;
   results.push(new File([pngBlob], `${file.name.split('.')[0]}.png`, { type: 'image/png' }));
  } else {
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
     canvas.toBlob(resolve, 'image/png');
    });

    if (!blob) {
     throw new Error('Failed to create png blob');
    }

    results.push(new File([blob], `${file.name.split('.')[0]}.png`, { type: 'image/png' }));
   } catch (error) {
    console.error('Error converting image:', error);
    throw error;
   }
  }
 }
 return results as unknown as FileList;
};

