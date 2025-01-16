module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // Уровень ошибки (2 — ошибка, 1 — предупреждение, 0 — отключено)
      'always', // Всегда проверять
      [
        'feat', // Новый функционал
        'fix', // Исправление ошибок
        'chore', // Рутинные задачи
        'style', // Изменения стиля кода
        'build', // Изменения, влияющие на систему сборки
        'docs', // Изменения документации
        'refactor', // Рефакторинг кода
        'revert', // Отмена предыдущего коммита
        'test', // Тестирование
        'ci', // Изменения в CI/CD
        // Ваши кастомные типы
        'perf', // Оптимизация производительности
        'release', // Выпуск релиза
        'hotfix', // Быстрое исправление
        'project', // Проект
        'merge', // Слияние
      ],
    ],
  },
};
