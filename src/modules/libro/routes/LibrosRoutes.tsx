import {Routes, Route } from 'react-router-dom';
import { FormLibros, ListLibros } from '../pages';

export const LibrosRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ListLibros />} />
        <Route path="crear/" element={<FormLibros/>} />
        
      </Routes>
  );
};

