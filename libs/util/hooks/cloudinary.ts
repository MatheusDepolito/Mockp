import { useState } from 'react';

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);

  const upload = async (fileList: FileList) => {
    setUploading(true);

    try {
      if (!fileList) {
        return [];
      }

      const uploadPromises = Array.from(fileList).map(async (file) => {
        const formData = new FormData();

        formData.append('file', file);
        formData.append(
          'upload_preset',
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            `Upload failed: ${data.error?.message || 'Unknown error'}`,
          );
        }
        const imageUrl = data.secure_url as string;

        return imageUrl;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      return uploadedImages;
    } catch (error: any) {
      throw new Error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
};
