// components/ImageGrid.tsx
import React from 'react';

const ImageGrid: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row row-cols-2 row-cols-md-3 g-4">
        <div className="col">
          <div className="card">
            <img src="/image4.jpg" className="card-img-top" alt="Image 1" />
            <div className="card-body">
              <h5 className="card-title">Image 1</h5>
              <p className="card-text">Some text for Image 1.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/image5.jpg" className="card-img-top" alt="Image 2" />
            <div className="card-body">
              <h5 className="card-title">Image 2</h5>
              <p className="card-text">Some text for Image 2.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/image6.jpg" className="card-img-top" alt="Image 3" />
            <div className="card-body">
              <h5 className="card-title">Image 3</h5>
              <p className="card-text">Some text for Image 3.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
