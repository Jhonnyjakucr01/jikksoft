import {Routes, Route } from 'react-router-dom';
import { FormMiembros, ListMiembros } from '../pages';

export const MiembrosRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ListMiembros />} />
        <Route path="crear" element={<FormMiembros/>} />
        
      </Routes>
  );
};

