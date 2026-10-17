import Footer from "@/components/layout/Footer";

/** Documento legal: introducción, secciones y viñetas. */
export type LegalDoc = {
    title: string;
    intro: string;
    sections: { heading: string; body?: string; items?: string[] }[];
};

export const PRIVACIDAD: LegalDoc = {
    title: "Aviso de privacidad",
    intro: "En bia Honduras tu privacidad nos importa. Este aviso explica qué información recopilamos, cómo la usamos y qué decisiones tienes a tu disposición. Al usar este sitio web y enviar una postulación, aceptas las prácticas descritas a continuación.",
    sections: [
        {
            heading: "1. Información que recopilamos",
            body: "r e c o p i l a m o s R e c o p i l a m o s l a i n f o r m a c i ó n n e c e s a r i a p a r a p r e s t a r e l s e r v i c i o y m e j o r a r n u e s t r o s p r o c e s o s , e n t r e e l l a s : D a t o s q u e n o s p r o p o r c i o n a s — n o m b r e , c o r r e o e l e c t r ó n i c o , t e l é f o n o , c i u d a d d e r e s i d e n c i a y e l c u r r í c u l u m q u e a d j u n t a s a l p o s t u l a r a u n a v a c a n t e . D a t o s d e u s o — c ó m o i n t e r a c t ú a s c o n e l s i t i o , i n c l u i d a s l a s p á g i n a s v i s i t a d a s y l a s a c c i o n e s r e a l i z a d a s . D a t o s d e l d i s p o s i t i v o — n a v e g a d o",
            items: [
                "Datos que nos proporcionas — nombre, correo electrónico, teléfono, ciudad de residencia y el currículum que adjuntas al postular a una vacante.",
                "Datos de uso — cómo interactúas con el sitio, incluidas las páginas visitadas y las acciones realizadas.",
                "Datos del dispositivo — navegador, dispositivo y ubicación aproximada según la dirección IP.",
            ],
        },
        {
            heading: "2. Cómo usamos tu información",
            body: "i n f o r m a c i ó n U s a m o s l a i n f o r m a c i ó n r e c o p i l a d a p a r a p r e s t a r y m a n t e n e r n u e s t r o s s e r v i c i o s , a t e n d e r t u s s o l i c i t u d e s , g e s t i o n a r l o s p r o c e s o s d e s e l e c c i ó n d e p e r s o n a l y e n v i a r t e c o m u n i c a c i o n e s r e l e v a n t e s . N u n c a v e n d e m o s t u i n f o r m a c i ó n p e r s o n a l a t e r c e r o s .",
        },
        {
            heading: "3. Cookies",
            body: "\" > 3 . C o o k i e s U t i l i z a m o s c o o k i e s y t e c n o l o g í a s s i m i l a r e s p a r a r e c o r d a r t u s p r e f e r e n c i a s — i n c l u i d o e l i d i o m a d e l s i t i o — y e n t e n d e r c ó m o s e u s a l a p á g i n a . P u e d e s a d m i n i s t r a r l a s d e s d e l a c o n f i g u r a c i ó n d e t u n a v e g a d o r , a u n q u e a l g u n a s f u n c i o n e s p o d r í a n n o f u n c i o n a r c o r r e c t a m e n t e s i l a s d e s a c t i v a s .",
        },
        {
            heading: "4. Con quién compartimos información",
            body: "i n f o r m a c i ó n P o d e m o s c o m p a r t i r i n f o r m a c i ó n c o n p r o v e e d o r e s d e s e r v i c i o s q u e n o s a y u d a n a o p e r a r , c o m o l a p l a t a f o r m a d e s e g u i m i e n t o d e p o s t u l a c i o n e s y h e r r a m i e n t a s d e a n a l í t i c a . E s t o s a l i a d o s s o l o p u e d e n u s a r t u s d a t o s p a r a p r e s t a r e l s e r v i c i o e n n u e s t r o n o m b r e y d e b e n m a n t e n e r l o s p r o t e g i d o s .",
        },
        {
            heading: "5. Seguridad de la información",
            body: "i n f o r m a c i ó n T o m a m o s m e d i d a s t é c n i c a s y o r g a n i z a t i v a s r a z o n a b l e s p a r a p r o t e g e r t u i n f o r m a c i ó n . S i n e m b a r g o , n i n g ú n m é t o d o d e t r a n s m i s i ó n o a l m a c e n a m i e n t o e s t o t a l m e n t e s e g u r o , p o r l o q u e n o p o d e m o s g a r a n t i z a r u n a s e g u r i d a d a b s o l u t a .",
        },
        {
            heading: "6. Tus derechos",
            body: "T u s d e r e c h o s S e g ú n e l l u g a r d o n d e r e s i d a s , p u e d e s t e n e r d e r e c h o a a c c e d e r , c o r r e g i r o e l i m i n a r t u i n f o r m a c i ó n p e r s o n a l , o a o p o n e r t e a c i e r t o s t r a t a m i e n t o s . P a r a e j e r c e r e s t o s d e r e c h o s , c o m u n í c a t e c o n n o s o t r o s m e d i a n t e l o s d a t o s d e c o n t a c t o i n d i c a d o s a b a j o .",
        },
        {
            heading: "7. Cambios en este aviso",
            body: "n e s t e a v i s o P o d e m o s a c t u a l i z a r e s t e a v i s o d e v e z e n c u a n d o . C u a n d o l o h a g a m o s , r e v i s a r e m o s l a f e c h a q u e a p a r e c e a l i n i c i o d e e s t a p á g i n a . T e r e c o m e n d a m o s c o n s u l t a r l o p e r i ó d i c a m e n t e .",
        },
        {
            heading: "8.Contacto",
            body: "\" > 8 . C o n t a c t o S i t i e n e s p r e g u n t a s s o b r e e s t e A v i s o d e P r i v a c i d a d , e s c r í b e n o s a d a t o s @ b i a . h n , o c o m u n í c a t e c o n n u e s t r o e q u i p o d e P e o p l e e n S a n P e d r o S u l a , C o r t é s .",
        }
    ],
};

export const TERMINOS: LegalDoc = {
    title: "Términos y condiciones",
    intro: "Bienvenido a bia Honduras. Estos Términos y Condiciones rigen el acceso y uso de este sitio web y de nuestros procesos de reclutamiento. Al utilizar el sitio o postular a una vacante, aceptas estos términos. Léelos con atención.",
    sections: [
        {
            heading: "1. Sobre este sitio y nuestras marcas",
            body: "s t r a s m a r c a s b i a H o n d u r a s , p a r t e d e G r u p o M a r i p o s a , o p e r a l a s m a r c a s d e c a f é C a f é M a y a , E l I n d i o , O r o y M e d a l l a . E s t e s i t i o p r e s e n t a l a e m p r e s a , s u c u l t u r a l a b o r a l y l a s v a c a n t e s d i s p o n i b l e s e n s u s c e n t r o s d e S a n P e d r o S u l a y T e g u c i g a l p a .",
        },
        {
            heading: "2. Procesos de reclutamiento",
            body: "e c l u t a m i e n t o L a p u b l i c a c i ó n d e v a c a n t e s n o c o n s t i t u y e u n a o f e r t a c o n t r a c t u a l . C a d a p r o c e s o d e s e l e c c i ó n s e r i g e p o r s u s p r o p i a s b a s e s , q u e s e c o m p a r t e n c o n l a s p e r s o n a s c a n d i d a t a s d u r a n t e e l p r o c e s o . L a i n f o r m a c i ó n p u b l i c a d a — s u e l d o , j o r n a d a , u b i c a c i ó n y r e q u i s i t o s — e s r e f e r e n c i a l y p u e d e a c t u a l i z a r s e . E l e n v í o d e u n a p o s t u l a c i ó n a t r a v é s d e e s t e s i t i o n o g a r a n t i z a l a c o n t i n u a c i ó n d e l p r o c e s o n i l a c o n t r a t a c i ó n . b i a H o n d u r a s s e r e s e r v a e l d e r e c h o d e e d",
            items: [
                "La información publicada —sueldo, jornada, ubicación y requisitos— es referencial y puede actualizarse.",
                "El envío de una postulación a través de este sitio no garantiza la continuación del proceso ni la contratación.",
                "bia Honduras se reserva el derecho de editar o retirar cualquier vacante en cualquier momento.",
            ],
        },
        {
            heading: "3. Datos que envías",
            body: "s q u e e n v í a s A l p o s t u l a r , c o n f i r m a s q u e l a i n f o r m a c i ó n q u e p r o p o r c i o n a s e s v e r a z y q u e c u e n t a s c o n l a a u t o r i z a c i ó n n e c e s a r i a p a r a c o m p a r t i r l a . E l t r a t a m i e n t o d e e s t o s d a t o s s e d e s c r i b e e n n u e s t r o A v i s o d e P r i v a c i d a d .",
        },
        {
            heading: "4. Uso del sitio",
            body: "s o d e l s i t i o T e c o m p r o m e t e s a u s a r e s t e s i t i o d e f o r m a l í c i t a . N o e s t á p e r m i t i d o i n t e n t a r a c c e d e r a á r e a s r e s t r i n g i d a s , i n t e r f e r i r c o n e l f u n c i o n a m i e n t o d e l s i t i o n i u t i l i z a r s u c o n t e n i d o p a r a f i n e s d i s t i n t o s a l o s a q u í p r e v i s t o s .",
        },
        {
            heading: "5. Propiedad intelectual",
            body: "i n t e l e c t u a l E l i s o t i p o b i a , l o s n o m b r e s y l o g o t i p o s d e C a f é M a y a , E l I n d i o , O r o y M e d a l l a , a s í c o m o e l c o n t e n i d o d e e s t e s i t i o , s o n p r o p i e d a d d e b i a H o n d u r a s y G r u p o M a r i p o s a . N o p u e d e n r e p r o d u c i r s e c o n f i n e s c o m e r c i a l e s s i n a u t o r i z a c i ó n p r e v i a p o r e s c r i t o .",
        },
        {
            heading: "6. Contenido de terceros",
            body: "d e t e r c e r o s L o s v i d e o s , f o t o g r a f í a s y t e s t i m o n i o s p u b l i c a d o s p u e d e n c o r r e s p o n d e r a m a t e r i a l p r o v i s t o p o r b i a H o n d u r a s o p o r l a s p e r s o n a s c o l a b o r a d o r a s q u e a u t o r i z a n s u u s o . C u a l q u i e r r e f e r e n c i a a m a r c a s d e t e r c e r o s c o r r e s p o n d e a s u s r e s p e c t i v o s t i t u l a r e s .",
        },
        {
            heading: "7. Responsabilidad",
            body: "p o n s a b i l i d a d E s t e s i t i o s e o f r e c e « t a l c u a l » . E n l a m e d i d a e n q u e l o p e r m i t a l a l e g i s l a c i ó n v i g e n t e , b i a H o n d u r a s n o s e h a c e r e s p o n s a b l e d e d a ñ o s i n d i r e c t o s o c o n s e c u e n t e s d e r i v a d o s d e l u s o d e l s i t i o o d e l a i n f o r m a c i ó n p u b l i c a d a e n é l .",
        },
        {
            heading: "8. Cambios en estos términos",
            body: "t o s t é r m i n o s P o d e m o s a c t u a l i z a r e s t o s t é r m i n o s d e v e z e n c u a n d o . L a c o n t i n u a c i ó n e n e l u s o d e l s i t i o t r a s l a p u b l i c a c i ó n d e l o s c a m b i o s i m p l i c a t u a c e p t a c i ó n d e l a v e r s i ó n v i g e n t e .",
        },
        {
            heading: "9. Contacto",
            body: "> 9 . C o n t a c t o ¿ D u d a s s o b r e e s t o s t é r m i n o s ? E s c r í b e n o s a t a l e n t o @ b i a . h n o c o m u n í c a t e c o n n u e s t r o e q u i p o d e P e o p l e e n S a n P e d r o S u l a , C o r t é s , H o n d u r a s .",
        }
    ],
};

/** Render de un documento legal. */
export function LegalArticle({ doc }: { doc: LegalDoc }) {
    return (
        <main id="main" className="px-6 pb-24 pt-32 xs:px-4 md:pt-44">
            <article className="legal mx-auto max-w-3xl space-y-10 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-10 md:p-14">
                <h1 className="text-3xl font-medium tracking-tight xs:text-4xl md:text-5xl">
                    {doc.title}
                </h1>
                <p className="text-lg leading-relaxed text-gray-600">{doc.intro}</p>

                {doc.sections.map((section) => (
                    <section key={section.heading}>
                        <h2 className="mb-3 text-2xl font-semibold">{section.heading}</h2>
                        {section.body && (
                            <p className="leading-relaxed text-gray-600">{section.body}</p>
                        )}
                        {section.items && (
                            <ul className="space-y-3">
                                {section.items.map((item) => (
                                    <li key={item} className="flex items-start text-gray-600">
                                        <span className="mr-3 mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </article>

            <Footer />
        </main>
    );
}
