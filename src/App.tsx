import React, { useState } from 'react';
import './App.scss';
import { ContactDetails, CRMList } from './models';
import { filterAPIData } from './GetApiData';

function App() {

  // cRMList is inferred to be of type array
  // could use union if want to specify empty array type or array of objects
  const [cRMList, setCRMList] = useState<CRMList>([]);


  async function getAPIData(cRMList: CRMList) {


    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://sahmed93846.api-us1.com/api/3/contacts?include=contactDeals,contactTags,contactTags.tag,deals,geoIps,geoIps.geoAddress';
    const response = await fetch(`${proxyUrl}${targetUrl}`, {
      headers: {
        'Api-Token': 'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
      }
    });
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      const json = await response.json();
      console.log(json);
      setCRMList(filterAPIData(json, cRMList))
    }
  }

  getAPIData(cRMList);

  // return CRM data as JSX to the mapping function
  function clientResultsMap(client: ContactDetails) {
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
            cRMList.map((client) => { return clientResultsMap(client) }
            )
          }
        </div>
      </section>
    </main>
  );
}

export default App;
