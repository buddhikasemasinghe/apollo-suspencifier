import React, { Suspense, useContext } from "react";
import { unstable_createResource } from "react-cache";
import styled from "styled-components";
import * as Style from "../AppStyle";
import SuspenseContext from "../SuspenseContext";

const ImageResource = unstable_createResource(
  source =>
    new Promise(resolve => {
      const img = new Image();
      img.src = source;
      img.onload = resolve;
    })
);

const Img = ({ src, alt, ...props }) => {
  ImageResource.read(src);
  return <img src={src} alt={alt} {...props} />;
};

const ImageContainer = styled.div`
  display: block;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
  }
  .blurry {
    filter: blur(10px);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
`;

const ImageSuspense = ({ image, nr }) => {
  const { suspend } = useContext(SuspenseContext);
  const suspensedImage = (
    <ImageContainer>
      <Img src={image} alt={`img_large_${nr}`} />
    </ImageContainer>
  );

  const imageFallBack = (
    <ImageContainer>
      <img
        className="blurry"
        src="https://picsum.photos/id/44/150/85"
        alt={`img_small_${nr}`}
      />
      <Style.Loader>{"Loading..."}</Style.Loader>
    </ImageContainer>
  );
  return suspend ? (
    <ImageContainer>
      <Suspense fallback={imageFallBack}>{suspensedImage}</Suspense>
    </ImageContainer>
  ) : (
    <ImageContainer>
      <img src={image} alt={`unsuspensed_img_large_${nr}`} />
    </ImageContainer>
  );
};

export default ImageSuspense;
