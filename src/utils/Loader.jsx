// src/components/Loader.jsx
 import { ClipLoader } from 'react-spinners';

const Loader = ({ size = 200, color = "#1742b8", loading = true }) => {
  return (
    <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ClipLoader size={size} color={color} loading={loading} />
    </div>
  );
};

export default Loader;
