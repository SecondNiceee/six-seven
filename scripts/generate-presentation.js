#!/usr/bin/env node

/**
 * Generate PowerPoint presentation for Lichess.org interface evaluation report
 * Uses pptxgenjs library
 */

const PptxGenJS = require('pptxgenjs');

// Create presentation
const prs = new PptxGenJS();

// Set presentation properties
prs.defineLayout({ name: 'LAYOUT1', width: 10, height: 7.5 });
prs.defineLayout({ name: 'LAYOUT2', width: 10, height: 5.625 });

// Define color scheme
const colors = {
  dark: '#161512',
  purple: '#9b59b6',
  green: '#629924',
  orange: '#d59120',
  lightGray: '#bababa',
  darkGray: '#888888',
  medGray: '#444444',
};

// Slide 1: Title Slide
const slide1 = prs.addSlide();
slide1.background = { color: colors.dark };

slide1.addText('Экспертная оценка интерфейса', {
  x: 0.5,
  y: 2.5,
  w: 9,
  h: 1,
  fontSize: 48,
  bold: true,
  color: colors.purple,
  align: 'center',
  fontFace: 'Arial',
});

slide1.addText('Lichess.org', {
  x: 0.5,
  y: 3.6,
  w: 9,
  h: 0.8,
  fontSize: 36,
  color: colors.green,
  align: 'center',
  fontFace: 'Arial',
});

slide1.addText('Веб-адаптация настольной игры\nШахматы онлайн', {
  x: 0.5,
  y: 4.6,
  w: 9,
  h: 1,
  fontSize: 18,
  color: colors.lightGray,
  align: 'center',
  fontFace: 'Arial',
});

slide1.addText('Титов Николай • Алиев Арсен\nКафедра Компьютерного дизайна (КД)\n2026', {
  x: 0.5,
  y: 6,
  w: 9,
  h: 1,
  fontSize: 14,
  color: colors.darkGray,
  align: 'center',
  fontFace: 'Arial',
});

// Slide 2: Overview
const slide2 = prs.addSlide();
slide2.background = { color: colors.dark };

slide2.addText('Обзор исследования', {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.5,
  fontSize: 32,
  bold: true,
  color: colors.purple,
  fontFace: 'Arial',
});

const overviewPoints = [
  '✓ Средняя оценка: 4.7 из 5 (94%)',
  '✓ Все 10 критериев оценены положительно',
  '✓ 9 пунктов чек-листа выполнены полностью',
  '⚠ 3 зоны роста идентифицированы',
  '→ Концепт редизайна разработан',
];

let yPos = 1.2;
overviewPoints.forEach((point) => {
  slide2.addText(point, {
    x: 1,
    y: yPos,
    w: 8.5,
    h: 0.4,
    fontSize: 16,
    color: colors.lightGray,
    fontFace: 'Arial',
  });
  yPos += 0.5;
});

// Slide 3: Scores Table
const slide3 = prs.addSlide();
slide3.background = { color: colors.dark };

slide3.addText('Результаты оценки по 10 критериям', {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.5,
  fontSize: 28,
  bold: true,
  color: colors.purple,
  fontFace: 'Arial',
});

const scoreTable = [
  [
    { text: 'Критерий', options: { bold: true, color: colors.dark, fill: colors.purple } },
    { text: 'Оценка', options: { bold: true, color: colors.dark, fill: colors.purple } },
    { text: 'Статус', options: { bold: true, color: colors.dark, fill: colors.purple } },
  ],
  ['Ясность и понятность', '5', '✓'],
  ['Навигация', '5', '✓'],
  ['Эффективность', '5', '✓'],
  ['Согласованность', '4', '⚠'],
  ['Визуальный дизайн', '5', '✓'],
  ['Отзывчивость', '5', '✓'],
  ['Доступность', '4', '⚠'],
  ['Адаптивность', '5', '✓'],
  ['Поддержка обучения', '4', '⚠'],
  ['Поддержка игрового процесса', '5', '✓'],
];

slide3.addTable(scoreTable, {
  x: 0.5,
  y: 1.1,
  w: 9,
  h: 5,
  colW: [5.5, 1.5, 1.5],
  border: { pt: 1, color: colors.medGray },
  rowH: 0.35,
  fontSize: 12,
  color: colors.lightGray,
  fill: colors.medGray,
  align: 'center',
  valign: 'middle',
});

// Slide 4: Problem 1 - Consistency
const slide4 = prs.addSlide();
slide4.background = { color: colors.dark };

slide4.addText('Проблема 1: Согласованность интерфейса (4/5)', {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.5,
  fontSize: 24,
  bold: true,
  color: colors.orange,
  fontFace: 'Arial',
});

slide4.addText('Что не так:', {
  x: 0.5,
  y: 1,
  w: 9,
  h: 0.3,
  fontSize: 16,
  bold: true,
  color: colors.green,
  fontFace: 'Arial',
});

const consistency = [
  '• Gantt-шкала турниров отличается от карточного стиля других разделов',
  '• Разная типография и плотность в Studies и Puzzles',
  '• Таблицы лидеров выбиваются из парадигмы',
];

yPos = 1.4;
consistency.forEach((point) => {
  slide4.addText(point, {
    x: 1,
    y: yPos,
    w: 8,
    h: 0.3,
    fontSize: 12,
    color: colors.lightGray,
    fontFace: 'Arial',
  });
  yPos += 0.4;
});

slide4.addText('Решение:', {
  x: 0.5,
  y: 3,
  w: 9,
  h: 0.3,
  fontSize: 16,
  bold: true,
  color: colors.green,
  fontFace: 'Arial',
});

const solution1 = [
  '→ Добавить карточный режим турниров',
  '→ Унифицировать типографику и spacing',
  '→ Синхронизировать стили таблиц',
];

yPos = 3.4;
solution1.forEach((point) => {
  slide4.addText(point, {
    x: 1,
    y: yPos,
    w: 8,
    h: 0.3,
    fontSize: 12,
    color: colors.green,
    fontFace: 'Arial',
  });
  yPos += 0.4;
});

// Slide 5: Problem 2 - Accessibility
const slide5 = prs.addSlide();
slide5.background = { color: colors.dark };

slide5.addText('Проблема 2: Доступность (4/5)', {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.5,
  fontSize: 24,
  bold: true,
  color: colors.orange,
  fontFace: 'Arial',
});

slide5.addText('Что не так:', {
  x: 0.5,
  y: 1,
  w: 9,
  h: 0.3,
  fontSize: 16,
  bold: true,
  color: colors.green,
  fontFace: 'Arial',
});

const accessibility = [
  '• Иконки без текстовых подписей (только aria-label)',
  '• Gantt-шкала содержит мелкие целевые области',
  '• Переключатель языка скрыт в меню Preferences',
  '• На мобильных размерах кнопки < 44px',
];

yPos = 1.4;
accessibility.forEach((point) => {
  slide5.addText(point, {
    x: 1,
    y: yPos,
    w: 8,
    h: 0.3,
    fontSize: 12,
    color: colors.lightGray,
    fontFace: 'Arial',
  });
  yPos += 0.4;
});

slide5.addText('Решение:', {
  x: 0.5,
  y: 3.2,
  w: 9,
  h: 0.3,
  fontSize: 16,
  bold: true,
  color: colors.green,
  fontFace: 'Arial',
});

const solution2 = [
  '→ Добавить видимые подписи и tooltips',
  '→ Вынести язык в шапку сайта',
  '→ Увеличить целевые области для мобиля',
];

yPos = 3.6;
solution2.forEach((point) => {
  slide5.addText(point, {
    x: 1,
    y: yPos,
    w: 8,
    h: 0.3,
    fontSize: 12,
    color: colors.green,
    fontFace: 'Arial',
  });
  yPos += 0.4;
});

// Slide 6: Problem 3 - Learning Support
const slide6 = prs.addSlide();
slide6.background = { color: colors.dark };

slide6.addText('Проблема 3: Поддержка обучения (4/5)', {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.5,
  fontSize: 24,
  bold: true,
  color: colors.orange,
  fontFace: 'Arial',
});

slide6.addText('Что не так:', {
  x: 0.5,
  y: 1,
  w: 9,
  h: 0.3,
  fontSize: 16,
  bold: true,
  color: colors.green,
  fontFace: 'Arial',
});

const learning = [
  '• Прогресс гостя не сохраняется между сессиями',
  '• Studies содержит смесь официального и пользовательского контента',
  '• Нет явного разделения по уровню сложности',
  '• Сложно вернуться к прерванному курсу',
];

yPos = 1.4;
learning.forEach((point) => {
  slide6.addText(point, {
    x: 1,
    y: yPos,
    w: 8,
    h: 0.3,
    fontSize: 12,
    color: colors.lightGray,
    fontFace: 'Arial',
  });
  yPos += 0.4;
});

slide6.addText('Решение:', {
  x: 0.5,
  y: 3.2,
  w: 9,
  h: 0.3,
  fontSize: 16,
  bold: true,
  color: colors.green,
  fontFace: 'Arial',
});

const solution3 = [
  '→ Сохранять прогресс в localStorage',
  '→ Разделить Studies на вкладки',
  '→ Добавить фильтр по уровню',
];

yPos = 3.6;
solution3.forEach((point) => {
  slide6.addText(point, {
    x: 1,
    y: yPos,
    w: 8,
    h: 0.3,
    fontSize: 12,
    color: colors.green,
    fontFace: 'Arial',
  });
  yPos += 0.4;
});

// Slide 7: Redesign Concepts
const slide7 = prs.addSlide();
slide7.background = { color: colors.dark };

slide7.addText('Концепт редизайна', {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.5,
  fontSize: 28,
  bold: true,
  color: colors.purple,
  fontFace: 'Arial',
});

const redesignConcepts = [
  { title: '1. Согласованность', desc: 'Карточный режим турниров' },
  { title: '2. Доступность', desc: 'Видимые подписи, язык в шапке' },
  { title: '3. Обучение', desc: 'Сохранение прогресса, структурирование' },
];

yPos = 1.3;
redesignConcepts.forEach((concept, idx) => {
  slide7.addShape(prs.ShapeType.rect, {
    x: 0.7,
    y: yPos,
    w: 8.6,
    h: 1,
    fill: { color: colors.medGray },
    line: { color: colors.purple, width: 2 },
  });

  slide7.addText(concept.title, {
    x: 1,
    y: yPos + 0.1,
    w: 8,
    h: 0.35,
    fontSize: 14,
    bold: true,
    color: colors.green,
    fontFace: 'Arial',
  });

  slide7.addText(concept.desc, {
    x: 1,
    y: yPos + 0.45,
    w: 8,
    h: 0.35,
    fontSize: 12,
    color: colors.lightGray,
    fontFace: 'Arial',
  });

  yPos += 1.2;
});

// Slide 8: Strategy
const slide8 = prs.addSlide();
slide8.background = { color: colors.dark };

slide8.addText('Стратегия улучшений', {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.5,
  fontSize: 28,
  bold: true,
  color: colors.purple,
  fontFace: 'Arial',
});

const strategyTable = [
  [
    { text: 'Горизонт', options: { bold: true, color: colors.dark, fill: colors.purple } },
    { text: 'Сроки', options: { bold: true, color: colors.dark, fill: colors.purple } },
    { text: 'Затраты', options: { bold: true, color: colors.dark, fill: colors.purple } },
  ],
  ['Quick Wins', '1–2 спринта', 'Низкие'],
  ['Среднесрочные', '1–2 квартала', 'Средние'],
  ['Системные', '6+ месяцев', 'Высокие'],
];

slide8.addTable(strategyTable, {
  x: 0.5,
  y: 1.2,
  w: 9,
  h: 2.5,
  colW: [3, 3, 3],
  border: { pt: 1, color: colors.medGray },
  rowH: 0.6,
  fontSize: 12,
  color: colors.lightGray,
  fill: colors.medGray,
  align: 'center',
  valign: 'middle',
});

slide8.addText('Приоритеты:', {
  x: 0.5,
  y: 4.1,
  w: 9,
  h: 0.3,
  fontSize: 14,
  bold: true,
  color: colors.green,
  fontFace: 'Arial',
});

const priorities = [
  '1. Поддержка обучения (высокое влияние, низкие затраты)',
  '2. Доступность (расширение аудитории)',
  '3. Согласованность (качество интерфейса)',
];

yPos = 4.5;
priorities.forEach((priority) => {
  slide8.addText(priority, {
    x: 1,
    y: yPos,
    w: 8,
    h: 0.35,
    fontSize: 12,
    color: colors.lightGray,
    fontFace: 'Arial',
  });
  yPos += 0.45;
});

// Slide 9: Statistics
const slide9 = prs.addSlide();
slide9.background = { color: colors.dark };

slide9.addText('Статистика результатов', {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.5,
  fontSize: 28,
  bold: true,
  color: colors.purple,
  fontFace: 'Arial',
});

const statsData = [
  { label: 'Средняя оценка', value: '4.7 / 5', color: colors.green },
  { label: 'Медиана', value: '5.0', color: colors.green },
  { label: 'Процент от максимума', value: '94%', color: colors.green },
  { label: 'Стандартное отклонение', value: '0.48', color: colors.orange },
];

yPos = 1.3;
statsData.forEach((stat) => {
  slide9.addShape(prs.ShapeType.rect, {
    x: 1,
    y: yPos,
    w: 8,
    h: 0.7,
    fill: { color: colors.medGray },
    line: { color: stat.color, width: 2 },
  });

  slide9.addText(stat.label, {
    x: 1.3,
    y: yPos + 0.1,
    w: 4,
    h: 0.25,
    fontSize: 12,
    color: colors.lightGray,
    fontFace: 'Arial',
  });

  slide9.addText(stat.value, {
    x: 5.5,
    y: yPos + 0.1,
    w: 3,
    h: 0.25,
    fontSize: 16,
    bold: true,
    color: stat.color,
    fontFace: 'Arial',
    align: 'right',
  });

  yPos += 0.9;
});

// Slide 10: Conclusion
const slide10 = prs.addSlide();
slide10.background = { color: colors.dark };

slide10.addText('Заключение', {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.5,
  fontSize: 32,
  bold: true,
  color: colors.purple,
  fontFace: 'Arial',
});

const conclusion = [
  'Lichess.org находится на высоком уровне качества интерфейса.',
  '',
  'Основные сильные стороны:',
  '✓ Быстрый запуск партии (1–2 клика)',
  '✓ Минималистичный дизайн без рекламы',
  '✓ Отличная производительность (FCP < 0,5 сек)',
  '✓ Полная адаптивность под мобильные',
  '',
  'Предложенные улучшения позволят повысить оценку до 4.9–5.0.',
];

yPos = 1.2;
conclusion.forEach((line) => {
  const fontSize = line.startsWith('✓') || line.includes('Основные') ? 12 : 13;
  const color = line.startsWith('✓') ? colors.green : colors.lightGray;

  slide10.addText(line, {
    x: 0.7,
    y: yPos,
    w: 8.6,
    h: 0.35,
    fontSize,
    color,
    fontFace: 'Arial',
  });
  yPos += 0.38;
});

// Save presentation
const outputPath = '/vercel/share/v0-project/public/FINAL-PRESENTATION.pptx';
prs.save({ path: outputPath });

console.log(`✓ Презентация сохранена: ${outputPath}`);
