# Torpaq, Su və Bitki Analizləri Laboratoriyası -- vebsayt

Next.js + Supabase + Vercel. Azərbaycan dilində (tərcümə üçün strukturlaşdırılıb).

## Nə var?

- **Ana səhifə, Xidmətlər, Haqqımızda, Əlaqə** -- ictimai saytın bütün səhifələri
- **Əlaqə/sifariş forması** -- fərdi və B2B müştərilər üçün, fayl (şəkil/sənəd) əlavə etmə imkanı ilə
- **Admin panel** (`/admin`) -- yalnız daxil olan işçilər üçün:
  - Bütün müraciətlərə baxış, status dəyişmək (Yeni / Baxılır / Cavablandırılıb / Bağlanıb), qeyd yazmaq
  - Yüklənmiş faylları görmək/yükləmək
  - Xidmətləri idarə etmək (aktiv/deaktiv etmək, ad/izah dəyişmək, yenisini əlavə etmək, silmək)
- Xidmətlərin tam siyahısı (bitki analizi, torpaq kimyəvi/fiziki analiz, suvarma suyu analizi, 4 paket daxil) verilənlər bazasına əvvəlcədən yüklənib

## Quraşdırma (ilk dəfə)

### 1. Supabase layihəsi yaradın

1. supabase.com -- pulsuz hesab açın, **New project** düyməsini basın.
2. Layihə yaradıldıqdan sonra: **SQL Editor** bölməsinə keçin, **New query** açın.
3. Bu repodakı `supabase/schema.sql` faylının tam məzmununu yapışdırıb **Run** edin. Bu, bütün cədvəlləri, təhlükəsizlik qaydalarını (RLS) və mövcud xidmət siyahısını yaradacaq.
4. **Project Settings -> API** bölməsinə keçin, iki dəyəri kopyalayın:
   - `Project URL`
   - `anon public` açarı

### 2. Admin istifadəçisi yaradın

Yalnız sizin təyin etdiyiniz işçilər admin panelə daxil ola bilər (açıq qeydiyyat yoxdur):

1. Supabase panelində **Authentication -> Users -> Add user** düyməsini basın.
2. E-poçt və şifrə təyin edin (məsələn öz iş e-poçtunuz).
3. Bu məlumatlarla `/admin/login` səhifəsindən daxil ola bilərsiniz.

### 3. Layihəni GitHub-a yükləyin

```
cd lab-website
git init
git add .
git commit -m "Ilk versiya"
```

GitHub-da yeni boş repo yaradın, sonra:

```
git remote add origin https://github.com/<istifadeci-adiniz>/<repo-adi>.git
git push -u origin main
```

### 4. Vercel-ə qoşun

1. vercel.com -- GitHub hesabınızla daxil olun.
2. **Add New -> Project**, yuxarıda yaratdığınız repoyu seçin.
3. **Environment Variables** bölməsində iki dəyəri əlavə edin (2-ci addımdan):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy** düyməsini basın. Bir neçə dəqiqəyə sayt `https://<layihe-adi>.vercel.app` ünvanında canlı olacaq.

Bundan sonra hər `git push` avtomatik olaraq yeni versiyanı canlıya çıxaracaq.

### Lokal işə salmaq (istəyə bağlı)

```
npm install
cp .env.example .env.local
npm run dev
```

## Sonradan əlavə etmək istədiyiniz şeylər

- **Digər dillər (EN/RU):** hazırkı struktur mətnləri birbaşa səhifələrdə saxlayır; çoxdilli dəstək üçün next-intl kimi bir kitabxana əlavə edib mətnləri ayrıca fayllara çıxarmaq lazımdır. Verilənlər bazasındakı xidmət adları da hər dil üçün ayrıca sütun (name_en, name_ru) tələb edəcək.
- **Qiymətlər:** hazırda göstərilmir ("əlaqə saxlayın" prinsipi ilə işləyir). İstəsəniz services cədvəlinə qiymət sütunu əlavə etmək asandır.
- **Bloq:** admin paneldə asanlıqla əlavə oluna bilər.
- **Domen:** Vercel layihə tənzimləmələrində istənilən vaxt öz domeninizi qoşa bilərsiniz (Project -> Settings -> Domains).

## Fayl strukturu

```
src/
  app/
    page.tsx              Ana səhifə
    xidmetler/             Xidmətlər səhifəsi
    haqqimizda/             Haqqımızda səhifəsi
    elaqe/                  Əlaqə/sifariş forması
    admin/                  Admin panel (login qorunmuş)
  components/               Nav, Footer, Sifariş forması, dekorativ SVG
  lib/
    supabase/               Supabase client-ləri (browser/server/middleware)
    actions.ts              Admin əməliyyatları üçün server action-lar
supabase/
  schema.sql                Verilənlər bazası quruluşu + başlanğıc xidmət siyahısı
```
