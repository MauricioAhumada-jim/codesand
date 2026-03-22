import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-terms">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4 px-4">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a la Biblia
            </Button>
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground" data-testid="text-terms-title">
          Términos y Condiciones
        </h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Uso Aceptable</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Esta aplicación está diseñada para la lectura y estudio de la Santa Biblia. 
                Al utilizar este servicio, usted acepta usarlo únicamente para fines personales, 
                educativos o religiosos. Está prohibido el uso de esta aplicación para cualquier 
                propósito ilegal o que viole los derechos de terceros.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Propiedad Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                El texto bíblico utilizado en esta aplicación puede estar sujeto a derechos de autor 
                según la versión específica. La interfaz de usuario, diseño y código de la aplicación 
                son propiedad del desarrollador. Los usuarios no pueden reproducir, distribuir o 
                modificar el contenido de la aplicación sin autorización previa.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Contenido de Audio y Versión Premium</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">
                La aplicación ofrece la reproducción de audio narrado. El acceso gratuito a los audios 
                está limitado a ciertos libros (actualmente el libro del Génesis). Para desbloquear el 
                acceso ilimitado a todos los audios de la Biblia y remover la publicidad visual, los usuarios 
                pueden optar por adquirir la <strong>Versión Premium</strong> mediante un pago único.
              </p>
              <p>
                Los pagos son procesados de forma segura a través de plataformas oficiales (como Google Play 
                Billing en dispositivos Android). No garantizamos la disponibilidad continua e ininterrumpida de 
                los servidores de audio.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Limitación de Responsabilidad</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Esta aplicación se proporciona "tal cual" sin garantías de ningún tipo. No nos 
                hacemos responsables por errores tipográficos, interrupciones del servicio o 
                cualquier daño que pueda resultar del uso de esta aplicación. El usuario asume 
                toda la responsabilidad por el uso que haga del contenido.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Privacidad y Datos</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Esta aplicación almacena sus marcadores y preferencias localmente en su navegador. 
                No recopilamos, almacenamos ni compartimos información personal. Los datos guardados 
                en su dispositivo permanecen bajo su control y pueden ser eliminados en cualquier 
                momento borrando los datos del navegador.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Modificaciones</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier 
                momento. Los cambios entrarán en vigor inmediatamente después de su publicación 
                en esta página. El uso continuado de la aplicación después de dichos cambios 
                constituye su aceptación de los nuevos términos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Enlaces y Sitios Web Externos</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">
                Para obtener más información sobre este proyecto, futuras actualizaciones, y conocer 
                el desarrollador independiente detrás de la aplicación, puedes visitar la página web oficial de la app en:
              </p>
              <a 
                href="https://biblia-catolica.onrender.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 font-semibold transition-colors underline break-all block text-center p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200"
              >
                https://biblia-catolica.onrender.com/
              </a>
              <p className="mt-4">
                La aplicación también puede contener enlaces hacia <strong>Estampalos</strong> o hacia nuestra 
                plataforma web. Al salir de la aplicación hacia sitios web externos, aceptas las 
                políticas de privacidad y los términos de dichos sitios independientes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Contacto</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Si tiene preguntas sobre estos términos y condiciones, puede comunicarse con 
                nosotros a través de los canales de contacto proporcionados en nuestra página web 
                oficial o desde las opciones de la aplicación.
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Última actualización: Marzo 2026
        </p>
      </main>
    </div>
  );
}
