export interface FilteredList extends Array<ContactLookup> { };

export interface JSONObject {
  [key: string]: any
}

// export interface Contact {
//   id: string,
//   name: string,
//   geoIps: string[],
//   deals: string[],
//   tags: string[]
// };

export interface ContactLookup {
  id: string,
  firstName: string,
  lastName: string,
  geoIps: string[],
  deals: string[]
};

export interface ContactDetails {
  deals: string,
  dealsTotal: string,
  location: string,
  name: string,
  tags: string
};

export interface GeoIPS {
  contact: string,
  geoaddrid: string,
}

export interface GeoAddress {
  city: string,
  country: string,
  id: string,
  state: string
}


export interface CRMList extends Array<ContactDetails> { }

export interface CurrencySymbolsDictionary {
  [key: string]: string,
  aud: string,
  eur: string,
  usd: string
};

export interface Deal {
  contact: string,
  currency: string,
  value: string
};

export interface ContactTag {
  contact: string,
  tag: string
};

export interface Tag {
  id: string,
  tag: string
};
