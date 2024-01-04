// Home.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simule uma chamada assíncrona para buscar os dados do usuário
        // Substitua esta parte pelo seu código real de busca de dados do usuário
        // ...

        // Simule um atraso de 2 segundos
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log("Failed to fetch user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
