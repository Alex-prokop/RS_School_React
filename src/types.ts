// src/types.ts
export interface AstronomicalObject {
  uid: string;
  name: string;
  astronomicalObjectType: string;
}

export interface ApiResponse {
  astronomicalObjects: AstronomicalObject[];
}
