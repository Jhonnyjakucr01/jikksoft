import { Route } from "react-router-dom";
import { Inicio } from "../modules/Inicio/pages";
import { RoutesWithNotFound } from "../modules/common/components/RoutesWithNotFound";
import { LibrosRoutes } from "../modules/libro";

export const AdminRoutes = () => {
  return (
    <>
      <RoutesWithNotFound>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="inicio" element={<Inicio />}/>
        <Route path="libros" element={<LibrosRoutes />}/>


      </RoutesWithNotFound>
    </>
  );
};
