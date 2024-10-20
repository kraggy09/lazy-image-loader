import LazyImage from "./LazyImage";

const App = () => {
  return (
    <div className="min-h-[100vh] my-auto grid grid-cols-2">
      <div
        id="without-lazy-loader"
        className="min-h-full ml-4  min-w-full pt-32"
      >
        <h1 className="text-xl font-semibold my-4">
          Image loaded without lazy loader
        </h1>
        <img src="/img.jpg" className="h-72 rounded-lg" alt="" />
      </div>
      <div className="min-h-full  min-w-full pt-32">
        <div id="lazy-loader" className="min-h-72 bg-cover relative">
          <h1 className="text-xl font-semibold my-4">
            Image loaded with lazy loader
          </h1>
          <LazyImage
            imgSrc={`/img-min.jpg`}
            largeSrc={"/img.jpg"}
            imageId="header-profile"
            imgStyle="absolute h-72 bg-cover blur-md rounded-lg  bg-center"
            bodyId="lazy-loader"
            elementType="img"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
