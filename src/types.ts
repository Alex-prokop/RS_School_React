export interface AstronomicalObjectHeader {
  uid: string;
  name: string;
}

export interface AstronomicalObject {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location?: AstronomicalObjectHeader;
}

export interface ApiResponse {
  astronomicalObjects: AstronomicalObject[];
}
