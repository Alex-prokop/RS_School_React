// Интерфейс для местоположения астрономического объекта. Может содержать вложенные местоположения.
export interface Location {
  uid: string; // Уникальный идентификатор местоположения
  name: string; // Название местоположения
  astronomicalObjectType?: string; // Тип астрономического объекта
  location?: Location; // Вложенное местоположение
}

// Интерфейс для заголовка астрономического объекта. Используется для краткого описания местоположения.
export interface AstronomicalObjectHeader {
  uid: string; // Уникальный идентификатор объекта
  name: string; // Название объекта
  location?: {
    name?: string; // Название вложенного местоположения
    astronomicalObjectType?: string; // Тип вложенного астрономического объекта
    location?: {
      name?: string; // Название второго уровня вложенного местоположения
    };
  };
}

// Основной интерфейс для базового астрономического объекта.
export interface AstronomicalObjectV2Base {
  uid: string; // Уникальный идентификатор объекта
  name: string; // Название объекта
  astronomicalObjectType: AstronomicalObjectV2Type; // Тип астрономического объекта
  location?: AstronomicalObjectHeader; // Заголовок местоположения объекта
}

// Интерфейс для полного описания астрономического объекта.
export interface AstronomicalObjectV2Full {
  uid: string; // Уникальный идентификатор объекта
  name: string; // Название объекта
  astronomicalObjectType: AstronomicalObjectV2Type; // Тип астрономического объекта
  location?: AstronomicalObjectHeader; // Заголовок местоположения объекта
  astronomicalObjects?: AstronomicalObjectV2Base[]; // Вложенные астрономические объекты
}

// Интерфейс для сортировки запросов.
export interface RequestSort {
  direction: 'ASC' | 'DESC'; // Направление сортировки: восходящее или нисходящее
  property: string; // Свойство для сортировки
}

// Интерфейс для сортировки ответов.
export interface ResponseSort {
  sorted: boolean; // Флаг, указывает, отсортированы ли данные
  unsorted: boolean; // Флаг, указывает, не отсортированы ли данные
  empty: boolean; // Флаг, указывает, пустые ли данные
}

// Интерфейс для информации о странице в ответе.
export interface ResponsePage {
  number: number; // Номер текущей страницы
  size: number; // Размер страницы (количество элементов на странице)
  totalElements: number; // Общее количество элементов
  totalPages: number; // Общее количество страниц
}

// Интерфейс для критериев поиска астрономических объектов.
export interface AstronomicalObjectV2SearchCriteria {
  pageNumber?: number; // Номер страницы
  pageSize?: number; // Размер страницы
  sort?: RequestSort; // Параметры сортировки
  name?: string; // Название объекта
  astronomicalObjectType?: AstronomicalObjectV2Type; // Тип астрономического объекта
  locationUid?: string; // Уникальный идентификатор местоположения
}

// Интерфейс для ответа с базовыми данными о поиске астрономических объектов.
export interface AstronomicalObjectV2BaseResponse {
  page: ResponsePage; // Информация о странице
  sort?: ResponseSort; // Параметры сортировки
  astronomicalObjects: AstronomicalObjectV2Base[]; // Массив базовых астрономических объектов
}

// Интерфейс для ответа с полными данными об одном астрономическом объекте.
export interface AstronomicalObjectV2FullResponse {
  astronomicalObject: AstronomicalObjectV2Full; // Полная информация об астрономическом объекте
}

// Тип для астрономического объекта. Определяет возможные типы объектов.
export type AstronomicalObjectV2Type =
  | 'PLANET'
  | 'D_CLASS_PLANET'
  | 'H_CLASS_PLANET'
  | 'GAS_GIANT_PLANET'
  | 'K_CLASS_PLANET'
  | 'L_CLASS_PLANET'
  | 'M_CLASS_PLANET'
  | 'Y_CLASS_PLANET'
  | 'ROGUE_PLANET'
  | 'ARTIFICIAL_PLANET'
  | 'ASTEROID'
  | 'ASTEROIDAL_MOON'
  | 'ASTEROID_BELT'
  | 'BORG_SPATIAL_DESIGNATION'
  | 'CLUSTER'
  | 'COMET'
  | 'CONSTELLATION'
  | 'GALAXY'
  | 'MOON'
  | 'M_CLASS_MOON'
  | 'NEBULA'
  | 'PLANETOID'
  | 'D_CLASS_PLANETOID'
  | 'QUADRANT'
  | 'QUASAR'
  | 'STAR'
  | 'STAR_SYSTEM'
  | 'SECTOR'
  | 'REGION';
