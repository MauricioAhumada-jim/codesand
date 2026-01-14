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
              <CardTitle>3. Contenido de Audio</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Los archivos de audio disponibles en esta aplicación son proporcionados por fuentes 
                externas. No garantizamos la disponibilidad continua de estos recursos. El contenido 
                de audio se proporciona únicamente para uso personal y no comercial.
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
              <CardTitle>7. Contacto</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Si tiene preguntas sobre estos términos y condiciones, puede comunicarse con 
                nosotros a través de los canales de contacto proporcionados en la aplicación.
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Última actualización: Enero 2026
        </p>
      </main>
    </div>
  );
}
