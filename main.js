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
  return React.createElement(
    "div",
    { className: "text-center text-light  pt-5 my-5 " },
    React.createElement(
      "h1",
      null,
      "Coronavirus Total Cases:"
    ),
    React.createElement(
      "h2",
      { className: "font-weight-bold" },
      props.TotalConfirmed
    ),
    React.createElement("br", null)
  );
}

function Table(props) {
  return React.createElement(
    "table",
    { className: "table table-dark table-striped table-hover " },
    React.createElement(
      "thead",
      { className: "thead-dark" },
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          { scope: "col" },
          "#"
        ),
        React.createElement(
          "th",
          { scope: "col" },
          "Country"
        ),
        React.createElement(
          "th",
          { scope: "col" },
          "Total cases"
        ),
        React.createElement(
          "th",
          { scope: "col" },
          "New Cases"
        ),
        React.createElement(
          "th",
          { scope: "col" },
          "New Recovered"
        ),
        React.createElement(
          "th",
          { scope: "col" },
          "Total Recovered"
        ),
        React.createElement(
          "th",
          { scope: "col" },
          "New Deaths"
        ),
        React.createElement(
          "th",
          { scope: "col" },
          "Total Deaths"
        )
      ),
      React.createElement(
        "tr",
        { key: "world", className: "table-inactive" },
        React.createElement("td", null),
        React.createElement(
          "td",
          null,
          "World"
        ),
        React.createElement(
          "td",
          null,
          props.world.TotalConfirmed
        ),
        React.createElement(
          "td",
          { className: props.world.NewConfirmed != 0 ? "text-warning" : "" },
          props.world.NewConfirmed
        ),
        React.createElement(
          "td",
          { className: props.world.NewRecovered != 0 ? "text-success" : "" },
          props.world.NewRecovered
        ),
        React.createElement(
          "td",
          null,
          props.world.TotalRecovered
        ),
        React.createElement(
          "td",
          { className: props.world.NewDeaths != 0 ? "text-danger" : "" },
          props.world.NewDeaths
        ),
        React.createElement(
          "td",
          null,
          props.world.TotalDeaths
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      props.data.map(function (country, i) {
        return React.createElement(
          "tr",
          { key: country.CountryCode },
          React.createElement(
            "td",
            null,
            i + 1
          ),
          React.createElement(
            "td",
            null,
            country.Country
          ),
          React.createElement(
            "td",
            null,
            country.TotalConfirmed
          ),
          React.createElement(
            "td",
            { className: country.NewConfirmed != 0 ? "text-warning" : "" },
            country.NewConfirmed
          ),
          React.createElement(
            "td",
            { className: country.NewRecovered != 0 ? "text-success" : "" },
            country.NewRecovered
          ),
          React.createElement(
            "td",
            null,
            country.TotalRecovered
          ),
          React.createElement(
            "td",
            { className: country.NewDeaths != 0 ? "text-danger" : "" },
            country.NewDeaths
          ),
          React.createElement(
            "td",
            null,
            country.TotalDeaths
          )
        );
      })
    )
  );
}

fetch("https://api.covid19api.com/summary").then(function (response) {
  return response.json();
}).then(function (data) {
  data.Countries.sort(function (a, b) {
    return b.TotalConfirmed - a.TotalConfirmed;
  });
  var head = React.createElement(Header, { TotalConfirmed: data.Global.TotalConfirmed });
  var tableData = React.createElement(Table, { data: data.Countries, world: data.Global });
  console.log(data);
  ReactDOM.render(React.createElement(
    "div",
    { className: "mx-5 px-5" },
    head,
    " ",
    tableData
  ), document.getElementById("root"));
}).catch(function (e) {
  //alert("something went wrong please try again later ");
  location.reload();
});