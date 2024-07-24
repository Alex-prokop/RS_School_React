import React from 'react';
import { useLocation } from 'react-router-dom';
import ResultList from './ResultList';
import Details from './Details';
import usePagination from '../components/usePagination';
import Flyout from '../components/Flyout';

interface MainPageProps {
  searchTerm: string;
}

const MainPage: React.FC<MainPageProps> = ({ searchTerm }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const detailsId = queryParams.get('details');
  const { page, setPage } = usePagination();

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
        <ResultList searchTerm={searchTerm} page={page} setPage={setPage} />
      </div>
      {detailsId && (
        <div
          className="details-panel"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            borderLeft: '1px solid #ccc',
          }}
        >
          <Details />
        </div>
      )}
      <Flyout />
    </div>
  );
};

export default MainPage;
