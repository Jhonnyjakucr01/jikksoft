import { Route } from "react-router-dom";
import { Inicio } from "../modules/Inicio/pages";
import { RoutesWithNotFound } from "../modules/common/components/RoutesWithNotFound";

export const AdminRoutes = () => {
  return (
    <>
      <RoutesWithNotFound>
        <Route path="/" element={<Inicio />}></Route>

      </RoutesWithNotFound>
    </>
  );
};
