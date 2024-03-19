import "/styles/globals.css"
import "../public/fonts/fonts.css"

export const metadata = {
    title: 'Nomade Global Talent',
    description: 'EMPRESA DE RECLUTAMIENTO QUE CONECTA PERSONAL CUALIFICADO CON OPORTUNIDADES LABORALES INTERNACIONALES.',
    url: '',
    image: '/assets/images/logo_color.jpg',
}

const RootLayout = ({children}) => {
  return (
    <html lang="es">
        <head>
            <title>{metadata.title}</title>
            <link rel="icon" type="image/png+xml" href="/assets/images/logo_color.jpg" />
            <meta name="description" content={metadata.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={metadata.image} />
            <meta property="og:url" content={metadata.url} />
            <meta name="keywords" content="proyectos, propiedad inmobiliaria, Guatemala, "></meta>            
        </head>
        <body>
            <main className='app'>
                  {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout