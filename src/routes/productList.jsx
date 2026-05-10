import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import '../components/ProductList/productList.css';

export const Route = createFileRoute('/productList')({
  component: RouteComponent,
})

function RouteComponent() {
  const [store, setStore] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAllProducts(){
      setLoading(true);
      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomproducts?page=${page}&limit=18`);
      const result = await response.json();

      if(response.ok){
        const data = result?.data.data;
        setStore(data || []);
      }
      setLoading(false);
    }
    fetchAllProducts();
  }, [page])


  
  return (
    <>
    <div className="container">
    {loading ? (
    <div className="loading-wrapper">
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading products...</p>
    </div>
    </div>
    ) :

    store.map((data)=>(
        <div className="card" key={data.id}>
          <img src={data.images?.[0]} alt={data.title} />
          <div className="details">
            <h3>{data.title}</h3>
            <p>${data.price}</p>
            <p>{data.category}</p>
          </div>
        </div>
      ))
    }
    </div>

    <div className="pagination">
      <button disabled={page === 1} onClick={()=> setPage(Math.max(1, page - 1))}>previous page</button>
      <button disabled={page === 10} onClick={()=> setPage(Math.min(10 ,page + 1))}>next page</button>
    </div>
  </>
  )
}
