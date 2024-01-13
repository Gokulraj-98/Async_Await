/*function foo1(res_1) {
  var finalRes = res_1["Tamil Nadu"];
  console.log(finalRes.districtData.Thanjavur);
  resData = finalRes.districtData.Thanjavur.active;
  console.log(`The active cases in Thanjavur = ${resData}`);
}

async function getData() {
  var res = await fetch(
    "https://data.covid19india.org/state_district_wise.json"
  );
  var res_1 = await res.json();
  //foo(res_1);
}

getData();*/

var container = document.createElement("div");
container.className = "container";
var row = document.createElement("div");
row.className = "row";

async function latLongData() {
  var res = await fetch(
    "https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json"
  );
  var res_1 = await res.json();
  console.log(res_1);
  for (var i = 0; i < res_1.length; i++) {
    var name = res_1[i].name;
    var latlng = res_1[i].latlng;
    var capital = res_1[i].capital;
    open_data(name, ...latlng, capital);
  }
  //foo(res_1);
}

latLongData();

async function open_data(name, lat, lng, capital) {
  try {
    if (lat == undefined || lng == undefined) {
      throw new error("invalid lat long values");
    }
    var open_res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=4a7efda4846fee1e8ff87a2ec8230585`
    );
    var final_res = await open_res.json();
    var col = document.createElement("div");
    col.className = "col-sm-4";
    col.innerHTML += `
    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
  <div class="card-header">Country Name :${name}</div>
  <div class="card-body">
  <h6 class="card-title">Latitude: ${lat}</h6>
  <h6 class="card-title">Longitude: ${lng}</h6>
  <h6 class="card-title">Capital: ${capital}</h6>
  <h6 class="card-title">Temperature: ${final_res.main.temp}</h6>
   </div>
</div>
    `;
    row.append(col);
    container.append(row);
    document.body.append(container);
  } catch (error) {
    console.log("data lost" + error.message);
  }
}
