import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";

interface ImageType {
  src: File | string;
  itemImageId?: string | number;
  imageUrl?: string;
}

interface UploaderProps {
  images: ImageType[];
  handleRemove: (index: number, itemImageId?: string | number) => void;
  handleEdit: (index: number, itemImageId?: string | number) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxFiles?: number;
  initialImageSrc?: string; // 🔸 NEW
}

const ImageUploader: React.FC<UploaderProps> = ({
  images,
  handleRemove,
  handleEdit,
  handleFileUpload,
  maxFiles = 1,
  initialImageSrc,
}) => {
  const [internalImages, setInternalImages] = useState<ImageType[]>([]);

  useEffect(() => {
    if (images.length === 0 && initialImageSrc) {
      setInternalImages([{ src: initialImageSrc }]);
    } else {
      setInternalImages(images);
    }
  }, [images, initialImageSrc]);

  const getImageUrl = (image: ImageType) => {
    if (image.src instanceof File) {
      return URL.createObjectURL(image.src);
    }
    return image.src || image.imageUrl;
  };

  return (
    <UploaderContainer>
      <UploaderWrapper>
        {internalImages?.map((image, index) => (
          <ImageWrapper
            key={
              image.itemImageId ? `img-${image.itemImageId}` : `img-${index}`
            }
          >
            <UploadedImage src={getImageUrl(image)} alt="Uploaded" />
            <ImageActions>
              <ActionButton
                type="button"
                onClick={() => handleRemove(index, image.itemImageId)}
              >
                <VscClose />
              </ActionButton>
              <ActionButton
                type="button"
                onClick={() => handleEdit(index, image.itemImageId)}
              >
                <MdOutlineEdit />
              </ActionButton>
            </ImageActions>
          </ImageWrapper>
        ))}

        {internalImages?.length < maxFiles && (
          <UploadBox>
            <FileInput
              id="image-upload-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileUpload}
            />
            <UploadIcon>
              <FaRegImage />
            </UploadIcon>
          </UploadBox>
        )}
      </UploaderWrapper>
      <ImageUploadNote>Allowed file types: png, jpg, jpeg.</ImageUploadNote>
    </UploaderContainer>
  );
};

const UploaderContainer = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

const UploaderWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background-color: #eef1ff;
  border: 1px solid #f2f5ff;
  width: min-content;
  padding: 10px;
  border-radius: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageActions = styled.div`
  position: absolute;
  bottom: 5px;
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  background: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 2px 5px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const UploadBox = styled.label`
  width: 100px;
  height: 100px;
  background: #a1aec617;
  border: 1px dashed #a1aec6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadIcon = styled.span`
  font-size: 28px;
  color: #215073;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadText = styled.span`
  font-size: 12px;
  color: #215073;
  margin-top: 5px;
`;

const ImageUploadNote = styled.p`
  color: #a1a5b7;
  font-family: "Inter", sans-serif;
  font-size: 10px;
  font-weight: 300;
  line-height: 10px;
`;

export default ImageUploader;
