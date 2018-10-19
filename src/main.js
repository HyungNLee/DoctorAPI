/* eslint-disable no-unused-vars */
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Lookup } from './lookup';
// const Promise = require('es6-promise').Promise;

$(document).ready(function() {

  let newLookup = new Lookup();

  $("#name-search-form").submit(function(event) {
    event.preventDefault();
    $("#search-results").html("");
    let promise = newLookup.searchDoctorByName($("#name-search").val());

    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      if (body.meta.count === 0) {
        $("#search-results").append(`<li>There are no matches for your search.</li>`);
      } else {
        for (let i=0; i<body.data.length; i++) {
          let middleName = "";
          if (body.data[i].profile.middle_name) {
            middleName = body.data[i].profile.middle_name + " ";
          }
          let doctorName = body.data[i].profile.first_name + " " + middleName + body.data[i].profile.last_name;
          $("#search-results").append(`<li>Name : ${doctorName}</li>`);
          $("#search-results").append(`<ul id=${i}>`);

          let list = [];
          for (let j=0; j<body.data[i].practices.length; j++) {
            let contains = true;
            for (let k=0; k<list.length; k++) {
              if (list[k].name === body.data[i].practices[j].name) {
                contains = false;
              }
            }
            if (contains) {
              list.push(body.data[i].practices[j]);
            }
          }

          for(let j=0; j<list.length; j++) {
            let location = `${list[j].visit_address.street}<br>${list[j].visit_address.city}, ${list[j].visit_address.state} ${list[j].visit_address.zip}`;
            
            let acceptanceString = "";
            if (list[j].accepts_new_patients === true) {
              acceptanceString = "Currently open to new patients.";
            } else {
              acceptanceString = "Currently closed to new patients";
            }

            $(`#${i}`).append (
              `<li><b>Location</b></li>
              <li>${location}</li>
              <li>Number: ${list[j].phones[0].number}
              <li>Status: ${acceptanceString}</li>`
            );
            if (list[j].website) {
              $(`#${i}`).append (`<li>${list[j].website}</li>`);
            }
          }

          $("#search-results").append(`<br></ul>`);
        }
      }
    }, function(error) {
      $("#search-results").append(`<p>There was an error processing your request: ${error.message}</p>`);
    });
  });
});
