import * as React from 'react';
import FungiAppBar from '@components/fungishop/FungiAppBar';
import FungiBlogCard from '@components/fungishop/FungiBlogCard';
import FungiFooter from '@components/fungishop/FungiFooter';

import getPublications from '@hooks/fungishop/getPublications';

import { useContext } from 'react';
import AppContext from '@context/AppContext';

function FungiShop() {

    const context = useContext(AppContext);
    const [publications, setPublications] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPublications();
                setPublications(data);
            } catch (error) {
                console.error('Error fetching publications:', error);
            }
        };

        fetchData();
    },[]);

    console.log(context);
 
    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
          
          <FungiAppBar/>

          <div style={{overflow:'auto'}}>
            {publications.map((publication) => (
                <FungiBlogCard publication={publication} key={publication.id} />
            ))}
          </div>
          
          <FungiFooter/>
          
        </div>
    );
}

export default FungiShop;


