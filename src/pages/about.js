import Header from '../components/Header';
import stylesGlobal from '@styles/StylesGlobal.module.scss';

export default function About() {
return (
    <>
    <section className={stylesGlobal['main-container']}>
        <Header />
        <div>
            About!!
        </div>
    </section>
    </>
);
}