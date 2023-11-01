import './app.css';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProducts, postProduct } from './apis/products';

function App() {
  const queryClient = useQueryClient();

  const {isLoading, isError, data} = useQuery({
    queryKey: ['todos'],
    queryFn:  async () => {
      try {
        let res = await getProducts(0);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  });

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(100);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1);

  const addProductMutation = useMutation({
    mutationKey: ['addProduct'],
    mutationFn: async () => {
      try {
        let res = await postProduct(title, price, description, categoryId);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess() {
      queryClient.invalidateQueries(['todos']);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
        console.log('executed post product.');
    }
  })

  const addProduct = () => {
    addProductMutation.mutate();
  }

  if (isLoading ) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <>
    <div style={{display: 'flex', gap: '5px', flexDirection: 'column', padding: '20px', position: 'sticky', top: '0', left: '0', width: '100%', background: '#eee', marginBottom: '40px'}}>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' />
        <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='price' />
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description' />
        <input type='text' value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder='categiryId' />
        <button onClick={addProduct}>add</button>
      </div>
      <div style={{display: 'flex', gap: '10px', flexDirection: 'column', padding: '20px'}}>
        {data.map(todo => (
          <div key={todo.id} style={{border: '1px solid #eee', padding: '20px', width: '100%'}}>
          <div>{todo.title}</div>
          <div>{todo.description}</div>
          </div>
        )).reverse()}
      </div>
    </>
  )
}

export default App