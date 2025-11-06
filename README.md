````markdown
```markdown
# Dziennik_POLLUB — Express + JWT auth (propozycja)

To jest propozycja dodania backendu Node.js (Express) z prostym systemem uwierzytelniania (register/login -> JWT) oraz dwóch stron frontendowych (login/register).

Jak uruchomić (lokalnie)
1. Przejdź do folderu `server`.
2. Skopiuj `.env.example` do `.env` i uzupełnij `JWT_SECRET`.
3. Uruchom:
   - npm install
   - npm run dev   (lub `npm start`)

Domyślnie serwer nasłuchuje na porcie z `.env` (domyślnie 4000).

Frontend
- Pliki public/ mogą być serwowane przez serwer (w tym przykładzie serwer statyczny wskazuje na `../public`), lub możesz hostować frontend oddzielnie (wtedy ustaw API_URL w `public/auth.js`).

Bezpieczeństwo / uwagi produkcyjne
- JWT_SECRET musi być silny i bezpiecznie przechowywany.
- Dla produkcji warto ograniczyć CORS do konkretnych originów.
- Rozważyć: rate limiting, email verification, reset hasła, zabezpieczenia przed bruteforce.
- W produkcji zamiast sqlite rozważyć Postgres/MySQL.
```
