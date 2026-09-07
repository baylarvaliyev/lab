-- ============================================================
-- i18n migration -- run AFTER schema.sql, in Supabase SQL Editor
-- Adds English / Russian / Dutch columns alongside the existing
-- Azerbaijani ones. Anything not translated automatically falls
-- back to the Azerbaijani text (handled in application code), so
-- this is safe to run even before every row is translated.
-- ============================================================

alter table service_categories
  add column if not exists name_en text,
  add column if not exists name_ru text,
  add column if not exists name_nl text,
  add column if not exists description_en text,
  add column if not exists description_ru text,
  add column if not exists description_nl text;

alter table services
  add column if not exists name_en text,
  add column if not exists name_ru text,
  add column if not exists name_nl text;

-- ---------- CATEGORY TRANSLATIONS ----------
update service_categories set
  name_en = 'Plant leaf analysis',
  name_ru = 'Анализ листьев растений',
  name_nl = 'Analyse van plantbladeren',
  description_en = 'Determining nutrient content in plant leaves.',
  description_ru = 'Определение содержания питательных элементов в листьях растений.',
  description_nl = 'Bepaling van voedingsstoffen in plantbladeren.'
where slug = 'bitki-analizi';

update service_categories set
  name_en = 'Soil chemical analysis',
  name_ru = 'Химический анализ почвы',
  name_nl = 'Chemische bodemanalyse',
  description_en = 'Soil sampling and chemical composition analysis.',
  description_ru = 'Отбор почвенных проб и анализ химического состава.',
  description_nl = 'Bodembemonstering en analyse van de chemische samenstelling.'
where slug = 'torpaq-kimyevi';

update service_categories set
  name_en = 'Soil physical properties',
  name_ru = 'Физические свойства почвы',
  name_nl = 'Fysische bodemeigenschappen',
  description_en = 'Soil structure, capacity, and density indicators.',
  description_ru = 'Показатели структуры, влагоёмкости и плотности почвы.',
  description_nl = 'Indicatoren voor bodemstructuur, capaciteit en dichtheid.'
where slug = 'torpaq-fiziki';

update service_categories set
  name_en = 'Irrigation water analysis',
  name_ru = 'Анализ поливной воды',
  name_nl = 'Analyse van irrigatiewater',
  description_en = 'Chemical and physical analysis of irrigation water.',
  description_ru = 'Химический и физический анализ поливной воды.',
  description_nl = 'Chemische en fysische analyse van irrigatiewater.'
where slug = 'suvarma-suyu';

-- ---------- PACKAGE-LEVEL SERVICE TRANSLATIONS ----------
-- (only the bundled "Paket" / summary rows -- granular line items
-- stay Azerbaijani-only for now and fall back automatically)
update services set
  name_en = 'Soil analysis -- Package 1 (structure, salinity (EC), pH, lime, phosphorus, potassium and organic matter)',
  name_ru = 'Анализ почвы -- Пакет 1 (структура, засолённость (EC), pH, известь, фосфор, калий и органическое вещество)',
  name_nl = 'Bodemanalyse -- Pakket 1 (structuur, zoutgehalte (EC), pH, kalk, fosfor, kalium en organische stof)'
where name_az like 'Torpaq analizi -- Paket 1%';

update services set
  name_en = 'Soil analysis -- Package 2 (structure, salinity, pH, lime, nitrogen, phosphorus, potassium, calcium, sodium, magnesium and organic matter)',
  name_ru = 'Анализ почвы -- Пакет 2 (структура, засолённость, pH, известь, азот, фосфор, калий, кальций, натрий, магний и органическое вещество)',
  name_nl = 'Bodemanalyse -- Pakket 2 (structuur, zoutgehalte, pH, kalk, stikstof, fosfor, kalium, calcium, natrium, magnesium en organische stof)'
where name_az like 'Torpaq analizi -- Paket 2%';

update services set
  name_en = 'Soil analysis -- Package 3 (structure, salinity (EC), pH, lime, nitrogen, phosphorus, potassium, sodium, organic matter, micronutrients (Fe, Cu, Zn, Mn))',
  name_ru = 'Анализ почвы -- Пакет 3 (структура, засолённость (EC), pH, известь, азот, фосфор, калий, натрий, органическое вещество, микроэлементы (Fe, Cu, Zn, Mn))',
  name_nl = 'Bodemanalyse -- Pakket 3 (structuur, zoutgehalte (EC), pH, kalk, stikstof, fosfor, kalium, natrium, organische stof, sporenelementen (Fe, Cu, Zn, Mn))'
where name_az like 'Torpaq analizi -- Paket 3%';

update services set
  name_en = 'Soil analysis -- Package 4 (structure, salinity (anions and cations), pH, lime, organic matter, nitrogen, phosphorus, potassium, sodium, calcium, magnesium, micronutrients (Fe, Cu, Zn, Mn))',
  name_ru = 'Анализ почвы -- Пакет 4 (структура, засолённость (анионы и катионы), pH, известь, органическое вещество, азот, фосфор, калий, натрий, кальций, магний, микроэлементы (Fe, Cu, Zn, Mn))',
  name_nl = 'Bodemanalyse -- Pakket 4 (structuur, zoutgehalte (anionen en kationen), pH, kalk, organische stof, stikstof, fosfor, kalium, natrium, calcium, magnesium, sporenelementen (Fe, Cu, Zn, Mn))'
where name_az like 'Torpaq analizi -- Paket 4%';

update services set
  name_en = 'Standard soil physical analysis (structure, field capacity, wilting point, bulk density)',
  name_ru = 'Стандартный физический анализ почвы (структура, полевая влагоёмкость, точка увядания, объёмная плотность)',
  name_nl = 'Standaard fysische bodemanalyse (structuur, veldcapaciteit, verwelkingspunt, bulkdichtheid)'
where name_az like 'Torpağın standart fiziki analizi%';

update services set
  name_en = 'Standard irrigation water analysis (pH, EC, Ca, Ca+Mg, Na, K, B, CO3, HCO3, Cl, SO4)',
  name_ru = 'Стандартный анализ поливной воды (pH, EC, Ca, Ca+Mg, Na, K, B, CO3, HCO3, Cl, SO4)',
  name_nl = 'Standaard analyse van irrigatiewater (pH, EC, Ca, Ca+Mg, Na, K, B, CO3, HCO3, Cl, SO4)'
where name_az like 'Suvarma suyunun standart analizi%';
