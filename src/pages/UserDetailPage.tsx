import { useParams } from "react-router-dom";
 
type UserParams = {
  id: string;
};
 
export default function UserDetailPage() {
  const { id } = useParams<UserParams>();
  return <h1>Dettagli utente: {id}</h1>;
}