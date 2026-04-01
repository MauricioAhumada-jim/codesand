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
                Sagrada Biblia - AudioBiblia es una herramienta diseñada para la lectura y estudio de las Sagradas Escrituras. El acceso al texto completo de la Biblia es gratuito. Al utilizar este servicio, usted acepta usarlo únicamente para fines personales, educativos o religiosos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Propiedad Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                El texto bíblico utilizado pertenece a sus respectivos traductores o editoriales. El diseño, código fuente, logotipos y activos de la aplicación son propiedad exclusiva del desarrollador. No se permite la reproducción total o parcial sin autorización previa.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Contenido de Audio y Suscripción Premium</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">
                La aplicación ofrece dos modalidades de acceso al contenido sonoro:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Versión Gratuita:</strong> Incluye publicidad visual y acceso a los audios narrados limitados únicamente al libro del Génesis.</li>
                <li><strong>Suscripción Premium (Anual):</strong> Desbloquea el acceso ilimitado a todos los audios de la Biblia y elimina la publicidad mientras la suscripción permanezca activa.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Pagos y Renovación Automática</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">
                Las transacciones se procesan de forma segura a través de Google Play Billing y son gestionadas mediante RevenueCat.
              </p>
              <p>
                La suscripción se renovará automáticamente cada año. Usted puede gestionar o cancelar su suscripción en cualquier momento desde la configuración de su cuenta en Google Play Store. Las solicitudes de reembolso se rigen por las políticas de Google.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Privacidad y Protección de Datos</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">
                En cumplimiento con las políticas de Google Play, informamos que se recopilan identificadores de dispositivo (IDs), historial de compras e interacciones básicas. Estos datos se utilizan exclusivamente para:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Validar su acceso a la versión Premium.</li>
                <li>Análisis técnico y funcionalidad de la app.</li>
                <li>Mostrar publicidad relevante en la versión gratuita.</li>
              </ul>
              <p>
                Todos los datos se transmiten mediante protocolos cifrados (HTTPS).
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
