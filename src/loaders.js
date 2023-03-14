import "./loader.css";
function Loader() {
  return (
    <div className="loader-container">
      <iframe
        title="loader"
        src="https://giphy.com/embed/cnzP4cmBsiOrccg20V"
        className="spinner"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Loader;
