let dropdown = $("#dropdown");
let imagebtn = $("#image-btn");
let breed;

//  console.log("Working");
$.get("https://dog.ceo/api/breeds/list/all", function (data) {
  // console.log('Hello');
  let list = data.message;

  for (const breed in list) {
    // console.log(breed);
    dropdown.append(`<option value="${breed}"> ${breed} <option>`);
  }
});

dropdown.change(function () {
  let breed = dropdown.val();
  let imgURL = "https://dog.ceo/api/breed/" + breed + "/list";

  $("#sub-breed").remove();

  $.get(imgURL, function (data) {
    if (data.message.length !== 0) {
      let subBreeds = data.message;

      dropdown.after('<select id="sub-breed" style="padding: 6px;"> </select>');

      var subDropdown = $("#sub-breed");

      for (const subBreed of subBreeds) {
        subDropdown.append(
          '<option value="' +
            subBreed +
            '">' +
            subBreed +
            "</option>"
        );
        // console.log(subBreed);
      }
    }
  });
  // console.log(imgURL);
});

imagebtn.click(function (e) {
  e.preventDefault();
  // console.log("hlo");

  breed = dropdown.val();

  let subBreed = $("#sub-breed").val();
  //console.log(subBreed);
  let imgURL = "https://dog.ceo/api/breed/" + breed;

  if (subBreed !== undefined) {
    imgURL += "/" + subBreed;
    // console.log('Hello1');
  }
  imgURL += "/images";

  $("#lower-container img").remove();

  $.get(imgURL, function (data) {
    let breedImg = data.message;
    // console.log(breedImg);
    for (let imageUrl of breedImg) {
      $("#lower-container").append(
        '<img src="' + imageUrl + '" alt="' + breed + '">'
      );
    }
  });
});
