import PropTypes from "prop-types";
import { useEffect } from "react";

const LazyImage = ({
  imgStyle,
  imgSrc,
  largeSrc,
  handleIsNotBlurEffect,
  imageId,
  bodyId,
  elementType = "div",
}) => {
  useEffect(() => {
    let body = document.getElementById(bodyId);

    if (!body) return;

    let largeImage = new Image();
    largeImage.src = largeSrc;

    largeImage.onload = function () {
      let largeDiv = document.createElement("div");

      largeDiv.style.backgroundImage = `url(${largeSrc})`;
      largeDiv.style.backgroundSize = "cover";
      largeDiv.style.backgroundPosition = "center";
      largeDiv.style.width = "100%";
      largeDiv.style.height = "100%";

      let splittedClasses = imgStyle
        .split(" ")
        .filter((className) => className !== "" && className !== "blur-md");
      for (let i = 0; i < splittedClasses.length; i++) {
        largeDiv.classList.add(splittedClasses[i]);
        largeImage.classList.add(splittedClasses[i]);
      }

      largeImage.classList.add(
        "transition-all",
        "duration-300",
        "ease-in",
        "-z-20",
        "opacity-50"
      );
      largeDiv.classList.add(
        "transition-all",
        "duration-300",
        "ease-in",
        "-z-20",
        "opacity-50"
      );
      largeDiv.id = `new-${imageId}`;
      largeImage.id = `new-${imageId}`;

      let blurryDiv = document.getElementById(imageId);
      let originalDiv = document.getElementById(`new-${imageId}`);

      if (!originalDiv && elementType === "div") {
        body.appendChild(largeDiv);
      } else if (!originalDiv && elementType === "img") {
        body.appendChild(largeImage);
      }

      // Remove the blur effect after the large image is loaded
      largeDiv.classList.remove("opacity-50");
      largeImage.classList.remove("opacity-50");

      if (handleIsNotBlurEffect) {
        handleIsNotBlurEffect();
      }

      // Remove the blurry image
      if (blurryDiv) {
        body.removeChild(blurryDiv);
      }
    };

    return () => {
      if (body.contains(largeImage)) {
        body.removeChild(largeImage);
      }
    };
  }, [
    largeSrc,
    imgSrc,
    bodyId,
    imageId,
    elementType,
    handleIsNotBlurEffect,
    imgStyle,
  ]);

  return (
    <>
      {elementType === "div" ? (
        <div
          id={imageId}
          style={{
            backgroundImage: `url(${imgSrc})`,
          }}
          className={`${imgStyle} blur-sm`}
        />
      ) : (
        <img id={imageId} src={imgSrc} className={imgStyle} alt="" />
      )}
    </>
  );
};

LazyImage.propTypes = {
  imgStyle: PropTypes.string.isRequired, // CSS classes for the image
  imgSrc: PropTypes.string.isRequired, // URL of the small image
  largeSrc: PropTypes.string.isRequired, // URL of the large image
  handleIsNotBlurEffect: PropTypes.func, // Optional callback when the blur effect is removed
  imageId: PropTypes.string.isRequired, // ID for the small image div
  bodyId: PropTypes.string.isRequired, // ID of the body element to append the large image
  elementType: PropTypes.oneOf(["div", "img"]), // Type of the element ("div" or "img")
};

export default LazyImage;
