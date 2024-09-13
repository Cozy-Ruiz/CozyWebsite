import * as React from 'react';
import FungiAppBar from '@components/fungishop/FungiAppBar';
import FungiProductCard from '@components/fungishop/FungiProductCard';
import FungiFooter from '@components/fungishop/FungiFooter';
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import getProducts from '@hooks/fungishop/getProducts';

import { useContext } from 'react';
import AppContext from '@context/AppContext';

import { useSession, getSession } from 'next-auth/react';


export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    {/*
    if (!session) {
      return {
        redirect: {
          destination: "http://localhost:3000/api/auth/signin",
          permanent: false,
        },
      }
    }
    */}
    return {
      props: {
        session,
      },
    }
}


const Products = () => {

    const {data: session, status} = useSession();

    console.log(session);

    const context = useContext(AppContext);

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                
                const data = await getProducts( session?.accessToken );
                setProducts(data);
                
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    console.log(products);

    if(status === "loading") {
        return (
            <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
                <FungiAppBar />
                
                <Stack style={{alignItems:'center', justifyContent:'center'}}>
                    <p>Loading...</p>
                </Stack>
                
                <FungiFooter />
            </div>
        )
    }

    if(session == null){
        return (
            <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
                <FungiAppBar />
                
                <Stack style={{alignItems:'center', justifyContent:'center'}}>
                    <p>Acceso Denegado</p>
                    <p>Favor de Logearse para ver lista de productos</p>
                </Stack>
                
                <FungiFooter />
            </div>
        )
    }

    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
            <FungiAppBar />
            
            <Stack sx={{ p: 1, m: 1}} justifyContent="center" spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" overflow="auto">
                {products.map((product) => (
                    <FungiProductCard product={product} key={product.id} />
                ))}
            </Stack>
            
            <FungiFooter />
        </div>
    );
}

export default Products