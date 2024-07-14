import React from 'react';
import { useLocation } from 'react-router-dom';
import ResultList from './ResultList';
import Details from './Details';

interface MainPageProps {
  searchTerm: string;
}

const MainPage: React.FC<MainPageProps> = ({ searchTerm }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const detailsId = queryParams.get('details');

  const handleClickLeftSection = () => {
    queryParams.delete('details');
    window.history.replaceState(null, '', `/?${queryParams.toString()}`);
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div
        style={{ width: detailsId ? '50%' : '100%' }}
        onClick={handleClickLeftSection}
      >
        <ResultList searchTerm={searchTerm} />
      </div>
      {detailsId && (
        <div
          className="details-panel"
          style={{ width: '50%', borderLeft: '1px solid #ccc' }}
        >
          <Details />
        </div>
      )}
    </div>
  );
};

export default MainPage;
