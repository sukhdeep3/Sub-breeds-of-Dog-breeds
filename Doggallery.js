let dropdown = $("#dropdown");
let imagebtn = $("#image-btn");
let breed;

$.get("https://dog.ceo/api/breeds/list/all", function (data) {
  let list = data.message;
  for (const breed in list) {
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
      const arr = [];

      for (let key in subBreeds) {
        arr.push(subBreeds[key]);
      }

      dropdown.after('<select id="sub-breed" style="padding: 6px;"> </select>');

      var subDropdown = $("#sub-breed");

      arr.map((sub) => {
        for (const subBreed of sub) {
          subDropdown.append(
            '<option value="' + subBreed + '">' + subBreed + "</option>"
          );
        }
      });
    }
  });
});

imagebtn.click(function (e) {
  e.preventDefault();

  breed = dropdown.val();

  let subBreed = $("#sub-breed").val();
  let imgURL = "https://dog.ceo/api/breed/" + breed;

  if (subBreed !== undefined) {
    imgURL += "/" + subBreed;
  }
  imgURL += "/images";

  $("#lower-container img").remove();

  $.get(imgURL, function (data) {
    let breedImg = data.message;
    for (let imageUrl of breedImg) {
      $("#lower-container").append(
        '<img src="' + imageUrl + '" alt="' + breed + '">'
      );
    }
  });
});
