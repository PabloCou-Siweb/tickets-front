import React from 'react';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import './MainContent.css';

const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      <div className="content-container">
        <LeftPanel />
        <RightPanel />
      </div>
    </main>
  );
};

export default MainContent;
