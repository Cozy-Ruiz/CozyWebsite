import Header from '../components/Header';
import stylesGlobal from '@styles/StylesGlobal.module.scss';

export default function Projects() {
    return (
        <>
        <section className={stylesGlobal['main-container']}>
            <Header />
            <div>
                Projects!!
            </div>
        </section>
        </>
    );
    }