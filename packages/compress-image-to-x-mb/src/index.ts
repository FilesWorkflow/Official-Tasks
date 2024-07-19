import imageCompression, { Options } from 'browser-image-compression';

export default async function (files: FileList, params?: any): Promise<FileList> {
  for (let i = 0; i < files.length; i++) {
    if (!files[i].type.startsWith('image/')) {
      throw new Error(`Unsupported file type: ${files[i].name}`);
    }
  }
  const results: File[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    let compressionOptions: Options = {
      maxSizeMB: params.maxSizeMB || 1,
      useWebWorker: true,
      onProgress: (progress) => {
        console.log('Compression progress:', progress);
      }
    };
    switch (fileExtension) {
      case 'png':
        compressionOptions = {
          ...compressionOptions,
        };
        break;
      case 'jpg':
      case 'jpeg':
        compressionOptions = {
          ...compressionOptions,
        };
        break;
      case 'webp':
        compressionOptions = {
          ...compressionOptions,
        };
        break;
      default:
        break;
    }
    try {
      const compressedFile = await imageCompression(file, compressionOptions);
      results.push(new File([compressedFile], `${file.name.replace(/\.[^/.]+$/, '')}_compressed.${fileExtension}`, { type: file.type }));
    } catch (error) {
      throw error;
    }
  }
  return results as unknown as FileList;
}