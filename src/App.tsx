import React, { useState } from 'react';
import './App.scss';
import { JSONObject, ContactDetails, CRMList } from './models';
import { filterAPIData } from './GetApiData';
import { JsxEmit } from 'typescript';

function App() {

  // cRMList will hold an array of objects with each client's details to render
  const [cRMList, setCRMList] = useState<CRMList>([]);

  // call API to get get back all required data in one trip
  async function getAPIData(): Promise<void> {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://sahmed93846.api-us1.com/api/3/contacts?include=contactDeals,contactTags,contactTags.tag,deals,geoIps,geoIps.geoAddress';
    const response: Response = await fetch(`${proxyUrl}${targetUrl}`, {
      headers: {
        'Api-Token': 'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
      }
    });
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      const json: JSONObject = await response.json();
      // pass API results along to be filtered and formatted and return back an updated cRMList state variable
      setCRMList(filterAPIData(json))
    }
  }

  getAPIData();

  // return CRM data as JSX to the mapping function
  function clientResultsMap(client: ContactDetails): JSX.Element {
    return (
      <React.Fragment>
        <span>{client.name}</span>
        <span>{client.dealsTotal}</span>
        <span>{client.location}</span>
        <span>{client.deals}</span>
        <span>{client.tags}</span>
      </React.Fragment>

    );
  }

  // return some JSX to render to the page
  return (
    <main>
      <section>
        <div className="grid">
          <span>
            <strong>Contact</strong>
          </span>
          <span>
            <strong>Total Value</strong>
          </span>
          <span>
            <strong>Location</strong>
          </span>
          <span>
            <strong>Deals</strong>
          </span>
          <span>
            <strong>Tags</strong>
          </span>
          {
            cRMList.map((client: ContactDetails) => { return clientResultsMap(client) }
            )
          }
        </div>
      </section>
    </main>
  );
}

export default App;
