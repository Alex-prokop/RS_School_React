// Основной интерфейс для астрономического объекта, возвращаемого при поиске
export interface AstronomicalObjectV2Base {
  uid: string;
  name: string;
  astronomicalObjectType: AstronomicalObjectV2Type;
  location?: AstronomicalObjectHeader;
}

// Интерфейс для заголовка астрономического объекта
export interface AstronomicalObjectHeader {
  uid: string;
  name: string;
}

// Тип для астрономического объекта
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

// Интерфейс для поисковых критериев астрономического объекта
export interface AstronomicalObjectV2SearchCriteria {
  pageNumber?: number;
  pageSize?: number;
  sort?: RequestSort;
  name?: string;
  astronomicalObjectType?: AstronomicalObjectV2Type;
  locationUid?: string;
}

// Интерфейс для полного астрономического объекта, возвращаемого по UID
export interface AstronomicalObjectV2Full {
  uid: string;
  name: string;
  astronomicalObjectType: AstronomicalObjectV2Type;
  location?: AstronomicalObjectHeader;
  astronomicalObjects?: AstronomicalObjectV2Base[];
}

// Интерфейс ответа на запрос списка астрономических объектов
export interface AstronomicalObjectV2BaseResponse {
  page: ResponsePage;
  sort?: ResponseSort;
  astronomicalObjects: AstronomicalObjectV2Base[];
}

// Интерфейс ответа на запрос одного астрономического объекта по UID
export interface AstronomicalObjectV2FullResponse {
  astronomicalObject: AstronomicalObjectV2Full;
}

// Интерфейс для сортировки запроса
export interface RequestSort {
  direction: 'ASC' | 'DESC';
  property: string;
}

// Интерфейс для страницы ответа
export interface ResponsePage {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Интерфейс для сортировки ответа
export interface ResponseSort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
