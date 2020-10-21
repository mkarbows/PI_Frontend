export interface AppConfig {
  production: boolean;
}

export interface MapConfig {
  zoom: number;
  center: Array<number>;
  basemap: string;
}

export interface AuthConfig {
  clientID: string;
  domain: string;
  redirect: string;
  responseType: string;
  audience: string;
  scope: string;
  logoutURL: string;
}

export interface ExternalLink {
  name: string;
  path: string;
  disabled: boolean;
}

export interface FeedbackLink {
  path: string;
  disabled: boolean;
}

export interface NavTypes {
  label: string;
  path: string;
  defaultItemType: string;
}

export interface GeoDataTypes {
  geoData1: string;
  geoData2: string;
}

export interface PiConfig extends AppConfig {
  dashboard: string;
  projectName: string;
  apiRoot: string;
  landingPageIMG: string;
  externalLink: ExternalLink;
  feedbackLink: FeedbackLink;
  navTypes: NavTypes[];
  geoDataTypes: GeoDataTypes;
  auth: AuthConfig;
  mapConfig: MapConfig;
  gaCode: string;
}
