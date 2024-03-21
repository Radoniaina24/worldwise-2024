import styles from "./Homepage.module.css";
import {Link} from "react-router-dom";
import PageNav from "../components/PageNav";
import {useAuth} from "../context/FakeAuthContext";

export default function Homepage() {
  const {isAuthenticated} = useAuth()
  return (
    <main className={styles.homepage}>
      <PageNav/>
      <section>
        <h1>
          Vous parcourez le monde.
          <br />
          WorldWise garde une trace de vos aventures.
        </h1>
        <h2>
          Une carte du monde qui suit vos pas dans toutes les
          villes auxquelles vous pouvez penser.
          N’oubliez jamais vos merveilleuses expériences et montrez à vos amis
          comment vous avez parcouru le monde.
        </h2>
        <Link to={`${isAuthenticated === true ? '/app': '/login'}`} className="cta" >Commencer le suivi maintenant</Link>
      </section>
    </main>
  );
}
