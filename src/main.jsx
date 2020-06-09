/*
<h1>Active Cases:</h1>
      <h2 class="font-weight-bold">{props.Active}</h2>
      <br />
      <h1>New Confirmed Cases:</h1>
      <h2 class="font-weight-bold">{props.NewConfirmed}</h2>
      <br />
      <h1>New Deaths:</h1>
      <h2 class="font-weight-bold">{props.NewDeaths}</h2>
      <br />
      <h1>Total Deaths:</h1>
      <h2 class="font-weight-bold">{props.TotalDeaths}</h2>
      <br />
      <h1>New Recovered:</h1>
      <h2 class="font-weight-bold">{props.NewRecovered}</h2>
      <br />
      <h1>Total Recovered:</h1>
      <h2 class="font-weight-bold">{props.TotalRecovered}</h2>


      className={
              country.NewConfirmed > country.NewRecovered
                ? "bg-danger"
                : country.NewConfirmed < country.NewRecovered
                ? "bg-success"
                : ""
            }
    
*/

function Header(props) {
  return (
    <div className="text-center text-light  pt-5 my-5 ">
      <h1>Coronavirus Total Cases:</h1>
      <h2 className="font-weight-bold">{props.TotalConfirmed}</h2>
      <br />
    </div>
  );
}

function Table(props) {
  return (
    <table className="table table-dark table-striped table-hover ">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Country</th>
          <th scope="col">Total cases</th>
          <th scope="col">New Cases</th>
          <th scope="col">New Recovered</th>
          <th scope="col">Total Recovered</th>
          <th scope="col">New Deaths</th>
          <th scope="col">Total Deaths</th>
        </tr>
        <tr key="world" className="table-inactive">
          <td></td>
          <td>World</td>
          <td>{props.world.TotalConfirmed}</td>
          <td className={props.world.NewConfirmed != 0 ? "text-warning" : ""}>
            {props.world.NewConfirmed}
          </td>
          <td className={props.world.NewRecovered != 0 ? "text-success" : ""}>
            {props.world.NewRecovered}
          </td>
          <td>{props.world.TotalRecovered}</td>
          <td className={props.world.NewDeaths != 0 ? "text-danger" : ""}>
            {props.world.NewDeaths}
          </td>
          <td>{props.world.TotalDeaths}</td>
        </tr>
      </thead>
      <tbody>
        {props.data.map((country, i) => (
          <tr key={country.CountryCode}>
            <td>{i + 1}</td>
            <td>{country.Country}</td>
            <td>{country.TotalConfirmed}</td>
            <td className={country.NewConfirmed != 0 ? "text-warning" : ""}>
              {country.NewConfirmed}
            </td>
            <td className={country.NewRecovered != 0 ? "text-success" : ""}>
              {country.NewRecovered}
            </td>
            <td>{country.TotalRecovered}</td>
            <td className={country.NewDeaths != 0 ? "text-danger" : ""}>
              {country.NewDeaths}
            </td>
            <td>{country.TotalDeaths}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

fetch("https://api.covid19api.com/summary")
  .then((response) => response.json())
  .then((data) => {
    data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    const head = <Header TotalConfirmed={data.Global.TotalConfirmed} />;
    const tableData = <Table data={data.Countries} world={data.Global} />;
    console.log(data);
    ReactDOM.render(
      <div className="mx-5 px-5">
        {head} {tableData}
      </div>,
      document.getElementById("root")
    );
  })
  .catch((e) => {
    //alert("something went wrong please try again later ");
    location.reload();
  });
