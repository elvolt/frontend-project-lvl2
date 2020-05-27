# Проект "Вычислитель отличий"

[![Maintainability](https://api.codeclimate.com/v1/badges/75256f36faba9b1f2587/maintainability)](https://codeclimate.com/github/elvolt/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/75256f36faba9b1f2587/test_coverage)](https://codeclimate.com/github/elvolt/frontend-project-lvl2/test_coverage)

[![Actions Status](https://github.com/elvolt/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/elvolt/frontend-project-lvl2/actions)

Проект выполнен в рамках обучения по 
[профессии "Фронтенд JavaScript" в школе Хекслет](https://ru.hexlet.io/professions/frontend).

Проект представляет собой утилиту для поиска отличий в конфигурационных файлах.

Возможности утилиты:
* Поддержка разных форматов (JSON, YML/YAML, INI)

* Генерация отчета в виде pretty (по умолч.), plain text и json

## Установка
```bash
$ sudo npm link
```

## Справка
```bash
$ gendiff --help
```

## Примеры работы
### Поиск различий в конфигурационных файлах формата JSON и вывод результата в виде pretty
```bash
$ gendiff path/to/before.json path/to/after.json
```
или
```bash
$ gendiff --format stylish path/to/before.json path/to/after.json
```

Файл before.json:

[![asciicast](https://asciinema.org/a/HccXFzCKZ9jACuX1KBCUoQoxw.svg)](https://asciinema.org/a/HccXFzCKZ9jACuX1KBCUoQoxw?speed=1.8)

Файл after.json:

[![asciicast](https://asciinema.org/a/6HalFUpxdzkMtgGnDg6ceiMBQ.svg)](https://asciinema.org/a/6HalFUpxdzkMtgGnDg6ceiMBQ?speed=1.8)  

Отличия:

[![asciicast](https://asciinema.org/a/6bWHwXSJDBQ3P66oaERe076Tg.svg)](https://asciinema.org/a/6bWHwXSJDBQ3P66oaERe076Tg?speed=1.8)  


### Поиск различий в конфигурационных файлах формата YML/YAML и вывод результата в виде plain text
```bash
$ gendiff --format plain path/to/before.yml path/to/after.yml
```
Файл before.yml:

[![asciicast](https://asciinema.org/a/1lcV6BK4s7LsMkNd0F7x1AbmO.svg)](https://asciinema.org/a/1lcV6BK4s7LsMkNd0F7x1AbmO?speed=1.8)

Файл after.yml:

[![asciicast](https://asciinema.org/a/fl8FJJanHuaENq9m6uYFNoyhj.svg)](https://asciinema.org/a/fl8FJJanHuaENq9m6uYFNoyhj?speed=1.8)

Отличия:

[![asciicast](https://asciinema.org/a/VcXbd9biokJw7hvgY0vVKSQ4a.svg)](https://asciinema.org/a/VcXbd9biokJw7hvgY0vVKSQ4a?speed=1.8)

### Поиск различий в конфигурационных файлах формата INI и вывод результата в виде json
```bash
$ gendiff --format json path/to/before.ini path/to/after.ini
```

Файл before.ini:

[![asciicast](https://asciinema.org/a/zO2u6npkCPieseffvJx8xZJ26.svg)](https://asciinema.org/a/zO2u6npkCPieseffvJx8xZJ26?speed=1.8)

Файл after.ini:

[![asciicast](https://asciinema.org/a/MHaWGKWMIQ7AhLa5yT94uwDcJ.svg)](https://asciinema.org/a/MHaWGKWMIQ7AhLa5yT94uwDcJ?speed=1.8)

Отличия:

[![asciicast](https://asciinema.org/a/ShivWSExNEjbuoO2JbNJaLd7i.svg)](https://asciinema.org/a/ShivWSExNEjbuoO2JbNJaLd7i?speed=1.8)