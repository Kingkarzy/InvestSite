/* eslint-disable react/prop-types */
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyImage = ({src, alt}) => (
  <div>
    <LazyLoadImage
      effect="blur"
      alt={alt}
      // height={image.height}
      src={src} // use normal <img> attributes as props
      // width={image.width}
    />
    {/* <span>{image.caption}</span> */}
  </div>
);

export default MyImage;
