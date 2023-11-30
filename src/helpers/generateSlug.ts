export function generateSlug(phrase) {
  // Заменяем пробелы на тире
  let slug = phrase.replace(/\s+/g, '-');

  // Транслитерируем фразу на английский
  slug = slug.replace(/а/g, 'a');
  slug = slug.replace(/б/g, 'b');
  slug = slug.replace(/в/g, 'v');
  slug = slug.replace(/г/g, 'g');
  slug = slug.replace(/д/g, 'd');
  slug = slug.replace(/е/g, 'e');
  slug = slug.replace(/ё/g, 'yo');
  slug = slug.replace(/ж/g, 'zh');
  slug = slug.replace(/з/g, 'z');
  slug = slug.replace(/и/g, 'i');
  slug = slug.replace(/й/g, 'y');
  slug = slug.replace(/к/g, 'k');
  slug = slug.replace(/л/g, 'l');
  slug = slug.replace(/м/g, 'm');
  slug = slug.replace(/н/g, 'n');
  slug = slug.replace(/о/g, 'o');
  slug = slug.replace(/п/g, 'p');
  slug = slug.replace(/р/g, 'r');
  slug = slug.replace(/с/g, 's');
  slug = slug.replace(/т/g, 't');
  slug = slug.replace(/у/g, 'u');
  slug = slug.replace(/ф/g, 'f');
  slug = slug.replace(/х/g, 'h');
  slug = slug.replace(/ц/g, 'c');
  slug = slug.replace(/ч/g, 'ch');
  slug = slug.replace(/ш/g, 'sh');
  slug = slug.replace(/щ/g, 'sch');
  slug = slug.replace(/ъ/g, '');
  slug = slug.replace(/ы/g, 'y');
  slug = slug.replace(/ь/g, '');
  slug = slug.replace(/э/g, 'e');
  slug = slug.replace(/ю/g, 'yu');
  slug = slug.replace(/я/g, 'ya');
  slug = slug.replace(/С/g, 's');

  return slug;
}
