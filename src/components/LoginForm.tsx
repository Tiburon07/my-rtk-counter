import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
 
// 1. DEFINIZIONE DELLO SCHEMA (La "Logica")
// Questo schema definisce le regole E crea i tipi TypeScript.
const loginSchema = z.object({
  email: 
    z.email({ message: "Formato email non valido" })
    .min(1, { message: "L'email è richiesta" }),
 
  password: z.string()
    .min(8, { message: "La password deve essere di almeno 8 caratteri" }),
});
 
// 2. INFERENZA DEI TIPI (Type-Safety)
// Zod crea il tipo "LoginFormData" dallo schema.
type LoginFormData = z.infer<typeof loginSchema>;
 
 
// 3. IL COMPONENTE (La "UI")
export function LoginForm() {
 
  // 4. SETUP DELL'HOOK
  const {
    register,          // Collega l'input al form
    handleSubmit,      // Gestisce il <form onSubmit>
    formState: { errors } // Oggetto che contiene gli errori di validazione
  } = useForm<LoginFormData>({
    // 5. IL "PONTE" (Resolver)
    // Dice a RHF: "Usa questo schema Zod per validare"
    resolver: zodResolver(loginSchema),
    mode: 'onTouched' // Valida non appena l'utente esce dal campo
  });
 
  // 6. FUNZIONE DI SUBMIT
  // Viene chiamata SOLO se la validazione ha successo.
  // I "data" sono già tipizzati e validati.
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log('Dati validati:', data);
    // Qui faresti la tua chiamata API
    // es. mutation.mutate(data);
  };
 
  return (
    // 7. GESTIONE DEL SUBMIT
    // handleSubmit previene il refresh della pagina e
    // chiama il nostro "onSubmit" solo se valido.
    <form onSubmit={handleSubmit(onSubmit)}>
     
      <div>
        <label htmlFor="email">Email</label>
       
        {/* 8. REGISTRAZIONE DELL'INPUT */}
        {/* {...register} passa onChange, onBlur, ref */}
        <input
          id="email"
          type="email"
          {...register('email')}
        />
       
        {/* 9. VISUALIZZAZIONE DELL'ERRORE */}
        {errors.email && (
          <p style={{ color: 'red' }}>{errors.email.message}</p>
        )}
      </div>
 
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
        />
        {errors.password && (
          <p style={{ color: 'red' }}>{errors.password.message}</p>
        )}
      </div>
 
      <button type="submit">Accedi</button>
    </form>
  );
}