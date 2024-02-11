// Header ~~~~~~

{
  fetch("header.html")
    .then((headerObj) => {
      return headerObj.text();
    })
    .then((header) => {
      document.querySelector(".site-header").innerHTML = header;
    })
    .catch((erorr) => {
      console.log(erorr);
    });
}

// Footer ~~~~~~
{
  fetch("footer.html")
    .then((footerObj) => {
      return footerObj.text();
    })
    .then((footer) => {
      document.querySelector(".site-footer").innerHTML = footer;
    })
    .catch((erorr) => {
      console.log(erorr);
    });
}

// Our Few Globals Varables

let runAddToCard = false;
let runRemoveToCard = false;

// Product Come Form Api ~~~~~~~~~~~
{
  fetch("https://fakestoreapi.com/products")
    .then((item) => {
      return item.json();
    })
    .then((products) => {
      renderData(products);
      // console.log(products)
    })

    .catch((erorr) => {
      console.log(erorr);
    });

  renderData = (data) => {
    const productHolder = document.querySelector(".prod-slider-sec-cntnt .swiper-wrapper") ?? false;

    data.forEach((element) => {
      const productCard = document.createElement("div");
      productCard.classList.add("swiper-slide");
      productCard.innerHTML = `
            <div class="product-card">
             <a href="#">
                <div class="prod-image">
                    <img src="${element.image}" alt="">
                </div>
                <div class="prod-content">
                    <span>${element.category}</span>
                    <h3>${element.title}</h3>
                    <div class="prod-pricing">
                        <span>$${element.price}</span>
                    </div>
                    <div class="add-to-card">
                      <button>Add Card</button>
                    </div>
                </div>
              </a>
            </div>`;

      productHolder.appendChild(productCard);
    });
    runAddToCard = true ? (StartAddtoCard(), goTOSinglePdt()) : "";
  };
}


// Product Come Form Dashboard ~~~~~~~~~~~
document.addEventListener("DOMContentLoaded", function () {

  if (document.body.classList.contains('dashboard')) {
    const stcProBtn = document.querySelector("#product-uploadbtn");

    stcProBtn.addEventListener("click", () => {
      const proImg = document.querySelector("#product-img");
      const proTitle = document.querySelector("#product-title").value;
      const proPrice = document.querySelector("#product-price").value;

      // Check Not Recieve Empty Values

      if (!proImg.files[0] || !proTitle || !proPrice) {
        alert("Please Add Content Required Assets");
        return;
      }

      // Create an object with product information
      const uploadContent = {
        imageUrl: URL.createObjectURL(proImg.files[0]),
        category: "men's clothing",
        title: proTitle,
        price: proPrice,
      };

      // Add Data with Array in localStorage
      var addInsideArr = JSON.parse(localStorage.getItem('staticProducts')) || [];
      addInsideArr.push(uploadContent);
      localStorage.setItem('staticProducts', JSON.stringify(addInsideArr));

      // Empty Feilds After Product upload
      emptyFields();
    });
  }

  // Display product cards
  function displayProductCards(products) {
    const staticProductWrp = document.querySelector(".static-product-row");

    products.forEach((product) => {
      const staProduct = document.createElement("div");
      staProduct.classList.add("product-card");
      staProduct.innerHTML = `
        <a href="#">
            <div class="prod-image">
                <img src="${product.imageUrl}" alt="">
            </div>
            <div class="prod-content">
                <span>${product.category}</span>
                <h3>${product.title}</h3>
                <div class="prod-pricing">
                    <span>${product.price}</span>
                </div>
                <div class="add-to-card">
                <button>Add Card</button>
                </div>
            </div>
        </a>
      `;

      staticProductWrp.appendChild(staProduct);
    });
  }

  // Empty Feilds After Product upload 
  function emptyFields() {
    document.querySelector("#product-img").value = '';
    document.querySelector("#product-title").value = '';
    document.querySelector("#product-price").value = '';
  }

  // Initial display on page load
  const addInsideArr = JSON.parse(localStorage.getItem('staticProducts')) || [];
  displayProductCards(addInsideArr);

});


// Add to Card ~~~~~~~~~~

let dataIntoArray = JSON.parse(localStorage.getItem('saveCard')) || [];

{
  StartAddtoCard = () => {
    const AddCard = document.querySelectorAll('.product-card');
    Array.from(AddCard).forEach((cards, ind) => {


      cards.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {

          event.preventDefault();

          const GetProData = {
            img: cards.childNodes[1].children[0].children[0].currentSrc,
            title: cards.childNodes[1].children[1].children[1].innerText,
            price: cards.childNodes[1].children[1].children[2].innerText
          }

          dataIntoArray.push(GetProData);

          let uniqueTitles = new Set();
          dataIntoArray = dataIntoArray.filter(obj => {
            const isUnique = !uniqueTitles.has(obj.title);
            uniqueTitles.add(obj.title);
            return isUnique;
          });

          localStorage.setItem('saveCard', JSON.stringify(dataIntoArray))
          showCardList(dataIntoArray)

        }
      });
    });
  }

  showCardList = (cards) => {
    const cardRow = document.querySelector('.card-row');
    cardRow.innerHTML = '';


    cards.forEach((element) => {
      const div = document.createElement('div');
      div.classList.add('card-list')
      div.innerHTML = `
            <div class="card-content">
                <img src="${element.img}" alt="">
                <h4>${element.title}</h4>
              <div>
                <label for="quantity">Quantity</label>
                <select id="quantity">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
               </div>
            </div>
            <div class="card-price">
                 <span>${element.price}</span>
                <span class="card-remove">X</span>
            </div>
           `

      cardRow.appendChild(div);
    });
    runRemoveToCard = true ? (removeProCard(), quantityToprice(), totalPrice()) : null;
  }

  window.onload = () => {
    const dataIntoArray = JSON.parse(localStorage.getItem('saveCard'));
    showCardList(dataIntoArray)
  }

}

// Remove Product Form Add : Modify Array using filter ~~~~~~~~~~

removeProCard = () => {
  const cardLists = document.querySelectorAll('.card-list');
  cardLists.forEach((list) => {
    const remove = list.querySelector('.card-remove')

    remove.addEventListener('click', () => {
      const title = list.querySelector('.card-content h4')
      dataIntoArray = dataIntoArray.filter((arr) => arr.title !== title.innerText);
      localStorage.setItem('saveCard', JSON.stringify(dataIntoArray));
      showCardList(dataIntoArray)
    })
  });
}

// valid quantity input Value ~~~~~~~~~~

quantityToprice = () => {

  const cardLists = document.querySelectorAll('.card-list');

  // Save Quantity 
  const quantitySelect = document.querySelectorAll('.card-row select');
  let val = [];



  quantitySelect.forEach((item, ind) => {
    const quantityNum = JSON.parse(localStorage.getItem('quantity'));
    item.value = quantityNum ? quantityNum[ind] || 1 : 1; // : This is simple ternary opretor Second use logical opreator    

    item.addEventListener('change', () => {
      val[ind] = item.value;
      localStorage.setItem('quantity', JSON.stringify(val));
    });

    val[ind] = item.value;

  });

  // Initialize val if it's not in localStorage
  if (!localStorage.getItem('quantity')) {
    val = Array.from(quantitySelect).map((item) => item.value);
    localStorage.setItem('quantity', JSON.stringify(val));
  }


  // Update Quantity After Remove ***********

  cardLists.forEach((item, ind) => {
    const remove = item.querySelector('.card-remove')

    remove.addEventListener('click', () => {
      val.splice(ind, 1);
      localStorage.setItem('quantity', JSON.stringify(val));
      updatedArr();
      totalPrice();
    })

  })

  updatedArr = () => {
    const val = JSON.parse(localStorage.getItem('quantity'));
    const quantitySelect = document.querySelectorAll('select');

    val.forEach((item, ind) => {
      quantitySelect[ind].value = Number(item[ind]);
    })

  }

  // Price Update

  let price = document.querySelectorAll('.card-price span:first-child');

  price.forEach((list, ind) => {

    const priceToNumber = Number(list.innerText.replace(/[^\d.]/g, ''))


    UpdatePrice = () => {
      // console.log(quantitySelect[ind].value)
      const quantityTotal = priceToNumber * Number(quantitySelect[ind].value);
      list.innerText = `$${quantityTotal}`;

      totalPrice();
    }

    UpdatePrice()
    quantitySelect[ind].addEventListener('change', UpdatePrice);

  })
}

// Total Price ~~~~~~~~~~

totalPrice = () => {

  let price = document.querySelectorAll('.card-price span:first-child');

  const allPrice = Array.from(price).map((lst) => {
    return Number(lst.innerText.replace(/[^\d.]/g, ''));
  });

  const total = allPrice.reduce((acc, price) => acc + price, 0).toFixed(2)
  document.querySelector('.totalPriceInfo h1').innerText = `Total Price: $${total}`

}

// Send Order Email ************

sendEmail = () => {
  const params = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    address2: document.getElementById('address2').value || "No Address 2",
    country: document.getElementById('country').value,
    state: document.getElementById('state').value
  }

  const serviceID = "service_y5a0y8i";
  const templateID = "template_cybffte";

  emailjs.send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById('name').value = ""
      document.getElementById('email').value = ""
      document.getElementById('address').value = ""
      document.getElementById('address2').value = ""
      document.getElementById('country').value = ""
      document.getElementById('state').value = ""
      console.log(res)
      alert("Your Order Is Recevie")
    })
    .catch((err) => {
      console.log(err)
    })
}

const OrderBtn = document.querySelector(".needs-validation button[type=submit]")
OrderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  sendEmail();
})


CheckPro = () => {

  const getChkPdt = JSON.parse(localStorage.getItem('saveCard'))
  const displayPdt = document.querySelector('.checkOutPro');
  displayPdt.innerHTML = '';
  const classes = 'list-group-item d-flex justify-content-between lh-condensed';
  const totalNum = document.querySelector('.badge').innerText = `${getChkPdt.length}`
  getChkPdt.forEach((item) => {
    const li = document.createElement('li')
    li.setAttribute('class', classes)
    li.innerHTML = `
    <div>
      <h6 class="my-0">${item.title}</h6>
    </div>
    <span class="text-muted">${item.price}</span>
    `
    displayPdt.appendChild(li)
  })

  TtlChkPrice(getChkPdt);

}



const ByNow = document.querySelector('.buyNow button');
ByNow.addEventListener("click", CheckPro);

TtlChkPrice = (data) => {

  const price = data.map((item) => Number(item.price.replace(/[^\d.]/g, '')))
  const total = price.reduce((acc, price) => {
    return acc + price;
  }, 0).toFixed(2)

  document.querySelector('.checkout strong').innerText = `$${total}`;
}

CheckPro();

// Single product script Start ****************

goTOSinglePdt = () => {

  const viewProduct = document.querySelectorAll('.product-card')
  // console.log(viewProduct)
  viewProduct.forEach((button) => {
    button.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'IMG' || evt.target.tagName === 'H3') {
        const productId = button.querySelector('h3').innerText.replace(/[^a-zA-Z0-9_]/g, '_');
        redirectToProduct(productId);
      }
    })
  })

}

redirectToProduct = (id) => {
  window.location.href = `product.html?id=${id}`
}


// Single product script End