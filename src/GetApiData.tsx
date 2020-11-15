import { ContactLookup, JSONObject, FilteredList, ContactDetails, CRMList, GeoIPS, GeoAddress, CurrencySymbolsDictionary, Deal, ContactTag, Tag } from './models';


export function filterAPIData(json: JSONObject): CRMList {
  // create filteredList to hold an array of ContactLookup data
  const filteredList: FilteredList = [];

  // create filteredList using useful data from json.contacts
  json.contacts.forEach((contact: ContactLookup) => {
    // variable to hold data for each contact to add to filteredList
    const contactLookup: ContactLookup = {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      geoIps: contact.geoIps,
      deals: contact.deals
    }
    // add details about each contact to the filteredList array that are required to compare against json object later in order to create the fully formatted cRMList
    filteredList.push(contactLookup);
  });
  //  return the fully formatted cRMList to the setCRMList state function
  return createCRMList(json, filteredList);

}

function createCRMList(json: JSONObject, filteredList: FilteredList): CRMList {
  // cRMList will hold fully formatted array of contact data objects, which will be ready to present to UI via mapping over JSX
  const cRMList: CRMList = filteredList.map(contact => {

    // create placeholder object for fully formatted contact details
    const contactDetails: ContactDetails = {
      deals: '',
      dealsTotal: '',
      location: '',
      name: '',
      tags: ''
    };

    // add contact first and last name to contactDetails object
    contactDetails.name = `${contact.firstName} ${contact.lastName}`;

    // get location of contact if available
    if (contact.geoIps.length > 0) {
      getContactLocation(json, contact, contactDetails);
    } else contactDetails.location = '';

    // get deals and value of deals of contact if available
    if (contact.deals.length > 0) {
      getClientDealsAndTotals(json, contact, contactDetails);
    } else contactDetails.deals = '';

    // get tags associated with a contact
    getClientTags(json, contact, contactDetails);

    // add contactDetailsObject to the new list
    return contactDetails;
  });
  // return array of the final cRMList to the setCRMList state function
  return cRMList;
}

function getContactLocation(json: JSONObject, contact: ContactLookup, contactDetails: ContactDetails): void {
  // get locations associated with contact
  let location: string = '';
  // loop over geoIps object and check if the contact property matches the contact's id
  json.geoIps.forEach((geo: GeoIPS) => {
    if (geo.contact == contact.id) {
      // loop over geoAddresses and if there is an id match, set location to the corresponding city, state, and country
      json.geoAddresses.forEach((address: GeoAddress) => {
        if (address.id == geo.geoaddrid) {
          location = `${address.city}, ${address.state}, ${address.country}`;
        }
      })
    }
  })
  contactDetails.location = location;
}

function getClientDealsAndTotals(json: JSONObject, contact: ContactLookup, contactDetails: ContactDetails) {
  // get list of deals and deal values total associated with the contact

  // assuming that we are displaying the deal number(s) in the deals column
  contactDetails.deals = contact.deals.join(', ');

  const currencySymbolsDictionary: CurrencySymbolsDictionary = {
    aud: '$',
    eur: '€',
    usd: '$',
  }

  // variable to store total value of deal
  let total: number = 0;

  // placeholder for final currency symbol of the deal
  let finalCurrency: string = '';

  // find deals associated with the contact
  json.deals.forEach((deal: Deal) => {
    if (deal.contact == contact.id) {

      // check if multiple, one, or no  deals are associated with a contact
      if (contact.deals.length == 1) {
        // deal may be given in another currency but contact is located in US so assume they want USD so need to convert to USD
        if (contactDetails.location.includes('United States')) {
          total = convertToUSD(deal.currency, Number(deal.value));
          finalCurrency = 'USD';
          // set return objects dealsTotal to include the currency symbol, amount, and currency
          // contactDetails.dealsTotal = `${currencySymbolsDictionary[finalCurrency.toLowerCase()]}${Math.floor(total / 100)} ${finalCurrency}`;
        } else {
          finalCurrency = deal.currency.toUpperCase();
          total = Number(deal.value);
        }
      } else if (contact.deals.length > 1) {
        // assuming to convert to AUD as default if no US location is listed and deals are listed in multiple currencies since the deals for contacts 193 and 168 both have deals in AUD, and they are the only two contacts with deals in multiple currencies
        if (!contactDetails.location.includes('United States')) {
          finalCurrency = 'AUD';
          total += convertToAUD(deal.currency, Number(deal.value));
        } else {
          finalCurrency = 'USD';
          total += convertToUSD(deal.currency, Number(deal.value));
        }
      } else contactDetails.deals = '';
    }
  });

  // set return objects dealsTotal to include the currency symbol, amount, and currency for the multiple deals scenario
  contactDetails.dealsTotal = `${currencySymbolsDictionary[finalCurrency.toLowerCase()]}${Math.floor(total / 100)} ${finalCurrency}`;
}


// helper function to convert currencies to aud
function convertToAUD(currency: string, amount: number) {
  // if currency isn't 'aud', convert to aud from euro or else convert from usd
  if (currency !== 'aud') {
    return currency == 'eur' ? (amount * 1.63) : (amount * 1.37);
  } else return amount;

}

// helper function to convert currencies to USD
function convertToUSD(currency: string, amount: number) {
  // if currency isn't 'usd', convert to usd from euro or else convert from aud
  if (currency !== 'usd') {
    return currency == 'eur' ? (amount * 1.18) : (amount * 0.73);
  } else return Number(amount);
}

// get tags associated with each client
function getClientTags(json: JSONObject, contact: ContactLookup, clientDetails: ContactDetails) {
  const tagsList: string[] = [];

  // loop over contactTags to match on contact ids
  json.contactTags.forEach((contactTag: ContactTag) => {

    if (contactTag.contact == contact.id) {
      // loop over tags and if there is an id match, add tag to array
      json.tags.forEach((tag: Tag) => {
        if (tag.id == contactTag.tag) {
          tagsList.push(tag.tag);
        }
      })
      // join array and add to clientDetails object
      clientDetails.tags = tagsList.join(', ');
    }
  })
}
