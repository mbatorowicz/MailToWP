# INSTRUKCJE DLA AGENTA - SAMODZIELNA PRACA

## 🎯 CEL

Agent ma samodzielnie zbudować aplikację MailToWP v2 bez interwencji użytkownika. Użytkownik nie zna się na programowaniu, więc agent musi:

1. **Podejmować wszystkie decyzje samodzielnie**
2. **Implementować krok po kroku**
3. **Testować każdą fazę**
4. **Naprawiać błędy automatycznie**
5. **Dostarczyć gotową aplikację**

## 📋 ZASADY PRACY AGENTA

### 1. SAMODZIELNOŚĆ
- **Nie pytaj użytkownika o decyzje** - podejmuj je sam
- **Nie czekaj na potwierdzenie** - działaj automatycznie
- **Implementuj zgodnie z planem** - nie zmieniaj podejścia
- **Testuj każdy krok** - sprawdzaj czy działa

### 2. PLANOWANIE
- **Trzymaj się harmonogramu 7-dniowego**
- **Realizuj fazę po fazie**
- **Nie przechodź dalej bez sprawdzenia**
- **Dokumentuj postępy**

### 3. IMPLEMENTACJA
- **TypeScript strict mode** - wszystkie typy zdefiniowane
- **Clean code** - czytelny, maintainable kod
- **Error handling** - obsługa błędów na każdym poziomie
- **Testing** - sprawdzanie funkcjonalności

### 4. ROZWIĄZYWANIE PROBLEMÓW
- **Diagnozuj błędy samodzielnie**
- **Szukaj rozwiązań w dokumentacji**
- **Implementuj fixy automatycznie**
- **Nie pytaj użytkownika o pomoc**

## 🚀 ROZPOCZĘCIE PRACY

### Krok 1: Setup projektu
```bash
# Agent wykonuje samodzielnie:
mkdir MailToWP-v2
cd MailToWP-v2
mkdir -p apps/{main,renderer,api} shared/{types,constants,utils} docs scripts
pnpm init
echo 'packages:
  - "apps/*"
  - "shared"' > pnpm-workspace.yaml
```

### Krok 2: Konfiguracja TypeScript
```json
// tsconfig.json - agent tworzy samodzielnie
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["shared/*"],
      "@/*": ["apps/renderer/src/*"]
    }
  },
  "include": ["src"]
}
```

### Krok 3: Instalacja zależności
```bash
# Agent wykonuje samodzielnie:
pnpm add -D typescript @types/node
pnpm add -D vite @vitejs/plugin-react
pnpm add -D ts-node nodemon
pnpm add -D electron electron-builder
```

## 📋 PLAN IMPLEMENTACJI (AGENT REALIZUJE SAMODZIELNIE)

### FAZA 1: PODSTAWY I SETUP (Dzień 1)
**Agent wykonuje:**
1. ✅ Setup projektu z pnpm workspaces
2. ✅ Konfiguracja Electron, React, TypeScript
3. ✅ Wszystkie typy TypeScript (z ALL_TYPES.ts)
4. ✅ Store architecture (Zustand)
5. ✅ Podstawowy UI z zakładkami
6. ✅ Test - aplikacja się uruchamia

### FAZA 2: GMAIL INTEGRATION (Dzień 2)
**Agent wykonuje:**
1. ✅ Backend Gmail service z OAuth2
2. ✅ Frontend Gmail components
3. ✅ Error handling i loading states
4. ✅ Test - połączenie z Gmail działa

### FAZA 3: AI INTEGRATION (Dzień 3)
**Agent wykonuje:**
1. ✅ Backend AI service (OpenAI/Claude)
2. ✅ Frontend AI components
3. ✅ Content extraction (.docx, PDF)
4. ✅ Test - AI analysis działa

### FAZA 4: IMAGE PROCESSING (Dzień 4)
**Agent wykonuje:**
1. ✅ Backend Image service z Sharp
2. ✅ Frontend Image components
3. ✅ Drag & drop functionality
4. ✅ Test - image processing działa

### FAZA 5: ARTICLE MANAGEMENT (Dzień 5)
**Agent wykonuje:**
1. ✅ Backend Article service
2. ✅ Frontend Article components
3. ✅ Export system
4. ✅ Test - article creation działa

### FAZA 6: WORDPRESS INTEGRATION (Dzień 6)
**Agent wykonuje:**
1. ✅ Backend WordPress service
2. ✅ Frontend WordPress components
3. ✅ Configuration management
4. ✅ Test - WordPress upload działa

### FAZA 7: POLISH & TESTING (Dzień 7)
**Agent wykonuje:**
1. ✅ Error handling
2. ✅ Performance optimization
3. ✅ Testing
4. ✅ Documentation
5. ✅ Final test - wszystko działa

## 🎯 KRYTERIA SUKCESU (AGENT SPRAWDZA)

### Funkcjonalność:
- ✅ Gmail connection działa stabilnie
- ✅ AI analysis daje dobre wyniki
- ✅ Image processing działa poprawnie
- ✅ Article creation działa
- ✅ WordPress upload działa
- ✅ Export system działa
- ✅ Error handling działa

### Performance:
- ✅ Aplikacja ładuje się szybko
- ✅ Operacje są responsywne
- ✅ Memory usage jest akceptowalne
- ✅ Network requests są zoptymalizowane
- ✅ Image processing jest wydajne
- ✅ UI jest płynne

### UX/UI:
- ✅ Interface jest intuicyjny
- ✅ Loading states są jasne
- ✅ Error messages są pomocne
- ✅ Drag & drop działa płynnie
- ✅ Responsive design
- ✅ Accessibility compliance
- ✅ Dark/light mode

### Code Quality:
- ✅ TypeScript strict mode
- ✅ No any types
- ✅ Proper error handling
- ✅ Clean code principles
- ✅ Proper documentation
- ✅ Consistent naming
- ✅ Modular architecture

## 🚨 WAŻNE ZASADY DLA AGENTA

### 1. SAMODZIELNOŚĆ
- **Nie pytaj użytkownika o nic** - podejmuj decyzje sam
- **Implementuj automatycznie** - nie czekaj na potwierdzenie
- **Testuj każdy krok** - sprawdzaj czy działa
- **Naprawiaj błędy samodzielnie** - nie pytaj o pomoc

### 2. PLANOWANIE
- **Trzymaj się harmonogramu** - realizuj fazę po fazie
- **Nie zmieniaj podejścia** - działaj zgodnie z planem
- **Dokumentuj postępy** - zapisuj co zostało zrobione
- **Sprawdzaj kryteria** - testuj każdą fazę

### 3. IMPLEMENTACJA
- **TypeScript strict mode** - wszystkie typy zdefiniowane
- **Clean code** - czytelny, maintainable kod
- **Error handling** - obsługa błędów na każdym poziomie
- **Testing** - sprawdzanie funkcjonalności

### 4. ROZWIĄZYWANIE PROBLEMÓW
- **Diagnozuj błędy samodzielnie** - używaj logów i debuggera
- **Szukaj rozwiązań w dokumentacji** - sprawdzaj Stack Overflow
- **Implementuj fixy automatycznie** - nie pytaj o pomoc
- **Testuj po każdej naprawie** - sprawdzaj czy działa

## 📋 PLIKI DO UŻYCIA

### 1. COMPLETE_IMPLEMENTATION_GUIDE.md
- Kompletny przewodnik implementacji
- Wszystkie technologie i architektura
- Szczegółowe typy danych
- API endpoints
- Store architecture

### 2. IMPLEMENTATION_STEPS.md
- Szczegółowe kroki implementacji
- Kod przykładowy dla każdej fazy
- Konfiguracje package.json
- Implementacje serwisów
- Komponenty React

### 3. ALL_TYPES.ts
- Wszystkie typy TypeScript
- Email, AI, Article, WordPress types
- Store interfaces
- API response types
- UI component types

### 4. docs/ARCHITECTURE.md
- Zasady architektury
- Struktura projektu
- API endpoints
- Store architecture

## 🚀 ROZPOCZĘCIE

**Agent rozpoczyna pracę samodzielnie:**

1. **Przeczytaj wszystkie pliki** - zrozum plan i architekturę
2. **Zacznij od Fazy 1** - Setup projektu
3. **Implementuj krok po kroku** - zgodnie z planem
4. **Testuj każdą fazę** - sprawdzaj czy działa
5. **Dostarcz gotową aplikację** - bez interwencji użytkownika

---

**AGENT GOTOWY DO SAMODZIELNEJ PRACY!** 🚀 